<template>
	<!-- name: '数据驾驶舱' -->
	<div class="container-box">
		<div class="left-box">
			<div class="btnTabClass">
				<div
					:class="activeName === 1 ? 'buttonBox topMenuAct' : 'buttonBox'"
					@click="activeName = 1"
				>
					<span>生命体征告警</span>
				</div>
				<div
					:class="activeName === 2 ? 'buttonBox topMenuAct' : 'buttonBox'"
					@click="activeName = 2"
				>
					<span>行为告警</span>
				</div>
				<div
					:class="activeName === 3 ? 'buttonBox topMenuAct' : 'buttonBox'"
					@click="activeName = 3"
				>
					<span>环境告警</span>
				</div>
			</div>
			<div class="planeBox">
				<div
					class="circleBox"
					v-for="item in braceletsWarningCount"
					:key="item.type"
					v-show="activeName === 1"
				>
					<div class="titleClass">{{ item.type }}</div>
					<div class="numberClass">
						<span>{{ item.count }}</span> 次
					</div>
				</div>
				<div
					class="circleBox"
					v-for="item in behaviorWarningCount"
					:key="item.type"
					v-show="activeName === 2"
				>
					<div class="titleClass">{{ item.type }}</div>
					<div class="numberClass">
						<span>{{ item.count }}</span> 次
					</div>
				</div>

				<div
					class="circleBox"
					v-for="item in environmentWarningCount"
					:key="item.type"
					v-show="activeName === 3"
				>
					<div class="titleClass">{{ item.type }}</div>
					<div class="numberClass">
						<span>{{ item.count }}</span> 次
					</div>
				</div>
			</div>
		</div>
		<div class="right-box">
			<div class="top-box">
				<div class="map-box">
					<div class="mapClass" id="mapId"></div>
					<div class="mapCover">
						<div class="itemNumber">
							<span>现场人数</span>
							<span class="green">{{ mapDataList.onSiteAmount }}</span>
						</div>
						<div class="itemNumber">
							<span>正在工作</span>
							<span class="green">{{ mapDataList.onWorkAmount }}</span>
						</div>
						<div class="itemNumber">
							<span>影响户数</span>
							<span class="green">{{ mapDataList.affectedAmount }}</span>
						</div>
						<div class="itemNumber">
							<span>重要用户</span>
							<span class="green">{{ mapDataList.importantAmount }}</span>
						</div>
						<div class="itemNumber">
							<span>外包班组数</span>
							<span class="green">{{ mapDataList.outsourcedAmount }}</span>
						</div>
					</div>
					<div class="mapMark">
						<p>
							<img src="@/assets/images/waitMark.png" alt="waitMark" />待开工
						</p>
						<p>
							<img src="@/assets/images/startMark.png" alt="startMark" />已开工
						</p>
					</div>
					<div class="title-box">当周生产计划列表（精简）</div>
				</div>
				<div class="ringChart-box">
					<h4>计划工作统计</h4>
					<div id="ringChart"></div>
					<div class="totalBox">计划作业总数<span>30</span></div>
				</div>
			</div>
			<div class="bottom-box">
				<div class="planListClass">
					<div v-for="(item, index) in planList" :key="index" class="planItem">
						<h3>{{ item.projectName }}</h3>
						<div class="listClass">
							<ul>
								<li
									v-for="(subItem, subIndex) in item.productionPlanVOList"
									:key="subIndex"
								>
									<h4>
										{{ subIndex + 1 }}.{{ subItem.workTeam }} (<span
											class="overflowBox"
											:title="subItem.workContent"
											>{{ subItem.workContent }}</span
										>)
									</h4>
									<p>
										<span>{{ subItem.workType }}</span
										><span>{{ subItem.planStartTime }}</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getApexrest } from "@/api/public";
import {
	productionPlanStatistics,
	getProductionPlanListThatDay,
	projectPeopleStatistics,
	getProjectListByType,
	getWarningCount
} from "@/api/dataCockpit";
import { signsDict, envDict } from "@/utlis/const";
import { ringChartList } from './data'
export default {
	components: {},
	data() {
		return {
			signsList: [],
			planList: [],
			map: null,
			waitMarkerList: [
				{ lng: 120.2, lat: 30.2 },
				{ lng: 120.23, lat: 30.23 },
				{ lng: 120.26, lat: 30.16 },
				{ lng: 120.1, lat: 30.19 },
			],
			startMarkerList: [
				{ lng: 120.15, lat: 30.25 },
				{ lng: 120.3, lat: 30.2 },
				{ lng: 120.1, lat: 30.26 },
			],
			signListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			planListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			planTotal: 0,
			signTotal: 0,
			ringTotal: 0,
			mapDataList: {},
			activeName: 1,
			braceletsWarningCount: [],
			environmentWarningCount: [],
			behaviorWarningCount: [],
			ringChartList: [],
			timer: null,
		};
	},
	created() {
		this.ringChartList = ringChartList
		this.getApexrestData();
		this.getRingData();
		this.getProductionPlanListThatDayData();
		this.projectPeopleStatisticsData();
		this.getWarningCountData()
	},
	methods: {
		async getApexrestData(isLazy) {
			const { result } = await getApexrest(this.signListQuery);
			result.list.map((item) => {
				signsDict.filter((i) => {
					if (item.type === Object.keys(i)[0]) {
						item.type = Object.values(i)[0];
					}
				});
			});
			this.signsList = isLazy
				? [...this.signsList, ...result.list]
				: result.list;
			this.signTotal = result.total;
		},
		mapLoad() {
			this.map = new T.Map("mapId");
			this.map.centerAndZoom(new T.LngLat(120.4, 30.39), 11);
			this.map.enableScrollWheelZoom();
			this.map.enableDoubleClickZoom();
			var imageURL =
				"http://t0.tianditu.gov.cn/img_w/wmts?" +
				"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
				"&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3db61b85eb15e6fc58aa96f6f270466b";
			var lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
			this.map.addLayer(lay);
			let that = this;
			setTimeout(function () {
				that.map.checkResize();
			}, 100);
		},
		setWaitMark() {
			if (this.waitMarkerList) {
				for (let i of this.waitMarkerList) {
					let waitIcon = new T.Icon({
						iconUrl: require("@/assets/images/waitMark.png"),
						iconSize: new T.Point(44, 52),
						iconAnchor: new T.Point(11, 26),
					});
					let waitMarker = new T.Marker(new T.LngLat(i.longitude, i.latitude), {
						icon: waitIcon,
					});
					waitMarker.markerType = "wait";
					this.map.addOverLay(waitMarker);
					this.handleMarkerClick(waitMarker, i.projectName);
				}
			}
		},
		setStartMark() {
			if (this.startMarkerList) {
				for (let i of this.startMarkerList) {
					let startIcon = new T.Icon({
						iconUrl: require("@/assets/images/startMark.png"),
						iconSize: new T.Point(44, 52),
						iconAnchor: new T.Point(11, 26),
					});
					let startMarker = new T.Marker(
						new T.LngLat(i.longitude, i.latitude),
						{ icon: startIcon }
					);
					startMarker.markerType = "wait";
					this.map.addOverLay(startMarker);
					this.handleMarkerClick(startMarker, i.projectName);
				}
			}
		},
		drawRingChart() {
			let planRingChart = this.$echarts.init(
				document.getElementById("ringChart")
			);
			let _this = this;

			let option = {
				color: ["#67E0E3", "#37A2DA", "#32C5E9", "#FEDA5C", "#9FE6B8"],
				legend: {
					bottom: "0%",
					left: "center",
					orient: "vertical",
					icon: "circle",
					textStyle: {
						color: "#fff",
						fontSize: 15,
					},
					formatter: function (name) {
						for (var i = 0; i < _this.ringChartList.length; i++) {
							var target;
							if (_this.ringChartList[i].name === name) {
								target = _this.ringChartList[i].value;
							}
						}
						return name + "数量    " + target;
					},
				},
				tooltip: {
					show: true,
				},
				title: {
					text: ["{value|" + _this.ringTotal + "}", "{name| 工作总数}"].join(
						"\n"
					),
					top: "23%",
					left: "47%",
					textAlign: "center",
					width: "50%",
					textStyle: {
						color: "#fff",
						fontSize: 16,
						rich: {
							value: {
								fontSize: 24,
								fontWeight: "bolder",
								width: 100,
								aglin: "center",
							},
						},
					},
				},
				series: [
					{
						type: "pie",
						center: ["50%", "30%"],
						radius: ["35%", "60%"],
						avoidLabelOverlap: true,
						selectedMode: "single",
						labelLine: { show: false },
						label: {
							show: false,
							position: "center",
							formatter: function (params) {
								return "{number|" + params.value + "}\n\n" + "工作总数";
							},
							color: "#fff",
							fontSize: 16,
							rich: {
								number: {
									fontSize: 24,
									fontWeight: "bolder",
									width: 100,
									aglin: "center",
								},
							},
						},
						emphasis: {
							label: {
								show: false,
							},
						},
						data: _this.ringChartList,

					},
				],
			};
			planRingChart.setOption(option);

			window.onresize = function () {
				planRingChart.resize();
			};
		},
		handleMarkerClick(marker, projectName) {
			let infoPop = new T.InfoWindow();
			let sContent =
				"<div class='waitInfo'><div class='title'>" +
				projectName +
				"</div></div>";
			infoPop.setContent(sContent);
			marker.addEventListener("mousemove", function () {
				marker.openInfoWindow(infoPop);
			});
			marker.addEventListener("mouseout", function () {
				marker.closeInfoWindow(infoPop);
			});
		},
		async getRingData() {
			const { result } = await productionPlanStatistics();
			this.ringChartList[0].value = result.openedWork;
			this.ringChartList[1].value = result.onSiteWork;
			this.ringChartList[2].value = result.endWork;
			this.ringChartList[3].value = result.cancelWork;
			this.ringChartList[4].value = result.gapWork;
			this.ringTotal = result.totalWork;
			this.drawRingChart();
		},
		async getProductionPlanListThatDayData(isLazy) {
			const { result } = await getProductionPlanListThatDay(this.planListQuery);
			this.planList = result;
			this.planList = isLazy ? [...this.planList, ...result.list] : result.list;
			this.planTotal = result.total;
		},
		async projectPeopleStatisticsData() {
			const { result } = await projectPeopleStatistics();
			this.mapDataList = result;
		},
		getProjectListByTypeData() {
			getProjectListByType().then((res) => {
				if (res.result) {
					this.startMarkerList = res.result.onWork;
					this.waitMarkerList = res.result.unWork;
					this.setStartMark();
					this.setWaitMark();
				}
			});
		},
		async getWarningCountData() {
			const { result } = await getWarningCount()

			result.braceletsWarningCount.map(item => {
				signsDict.filter((i) => {
					if (item.type === Object.keys(i)[0]) {
						item.type = Object.values(i)[0];
					}
				});
			})
			this.braceletsWarningCount = result.braceletsWarningCount
			result.environmentWarningCount.map(item => {
				envDict.filter((i) => {
					if (item.type === Object.keys(i)[0]) {
						item.type = Object.values(i)[0];
					}
				});
			})
			this.environmentWarningCount = result.environmentWarningCount
			this.behaviorWarningCount = result.behaviorWarningCount
		}
	},
	mounted() {
		this.mapLoad();
		this.getProjectListByTypeData();
		let planListDom = document.querySelector(".planListClass");
		let isPlanScroll = true;
		planListDom.addEventListener("scroll", (v) => {
			const scrollDistance =
				planListDom.scrollHeight - planListDom.scrollTop <
				planListDom.clientHeight;
			if (!scrollDistance && this.planTotal > 10 && isPlanScroll) {
				if (this.planListQuery.pageNo >= Math.ceil(this.signsTotal / 10)) {
					this.$message.warning("当周生产计划列表没有更多数据了");
					isPlanScroll = false;
				}
				if (this.planListQuery.pageNo < Math.ceil(this.planTotal / 10)) {
					this.planListQuery.pageNo++;
					this.getProductionPlanListThatDayData(true);
					isPlanScroll = true;
				}
			}
		});
		this.timer = setInterval(() => {
			if (this.activeName >= 3) {
				this.activeName = 1
			} else {
				this.activeName++
			}
		}, 10000)
	},
	destroyed() {
		clearInterval(this.timer);
		this.timer = null
	}
};
</script>

<style lang="scss" scoped>
	.container-box {
		background-color: transparent !important;
		@include flex-row-left;
		.left-box {
			width: calc(27% - 10px);
			height: 100%;
			margin-right: 10px;
		}
		.right-box {
			width: calc(73% + 10px);
			height: 100%;
			.top-box {
				height: calc(60% + 70px);
				width: 100%;
				@include flex;
				.map-box {
					height: 100%;
					width: calc(75% - 10px);
					margin-right: 10px;
					position: relative;
					.mapCover {
						position: absolute;
						bottom: 70px;
						width: 100%;
						height: 60px;
						@include flex-bet;
						background-color: rgba($color: #fff, $alpha: 0.13);
						z-index: 999;
						.itemNumber {
							width: 20%;
							height: 100%;
							@include flex-col-center;
							font-size: 1.4rem;
							.green {
								color: #00ffb1;
								font-size: 1.8rem;
							}
						}
					}
					.mapMark {
						position: absolute;
						top: 10px;
						left: 35px;
						z-index: 999;
						img {
							width: 14px;
							height: 16px;
							margin-right: 10px;
						}
						p {
							@include flex;
							margin-top: 15px;
						}
					}
					.mapClass {
						height: calc(100% - 60px);
						width: 100%;
						background: #fff;
					}
					.title-box {
						height: 50px;
						margin-top: 10px;
						width: 100%;
						background: rgba($color: #5d7dff, $alpha: 0.13);
						color: #4696ff;
						font-size: 1.8rem;
						line-height: 50px;
						padding-left: 20px;
						text-align: left;
					}
				}
				.ringChart-box {
					width: 25%;
					height: 100%;
					background: rgba($color: #5d7dff, $alpha: 0.13);
					h4 {
						width: 100%;
						height: 50px;
						line-height: 50px;
						font-size: 1.8rem;
						color: #5aa1ff;
						margin-left: 20px;
						text-align: left;
					}
					#ringChart {
						width: 100%;
						height: calc(100% - 140px);
					}
					.totalBox {
						width: calc(100% - 40px);
						margin: 20px;
						height: 50px;
						line-height: 50px;
						border-top: 1px solid #44a8ff;
						font-size: 2rem;
						span {
							margin-left: 20px;
							font-weight: bolder;
						}
					}
				}
			}
			.bottom-box {
				height: calc(40% - 80px);
				margin-top: 10px;
				width: 100%;
				overflow: auto;
				.planListClass {
					width: 100%;
					height: 100%;
					overflow-x: scroll;
					@include flex-row-left;
					@include scrollbar;
					.planItem {
						width: 300px;
						height: 100%;
						background-color: rgba($color: #5d7dff, $alpha: 0.13);
						margin-left: 10px;
						white-space: nowrap;
						h3 {
							font-size: 1.6rem;
							padding: 5px;
							background-color: #0b55a9;
							height: 80px;
							white-space: normal;
						}
						.listClass {
							height: calc(100% - 80px);
							overflow: auto;
							ul {
								li {
									width: 100%;
									padding: 10px 10px 0px 10px;
									h4 {
										font-size: 1.4rem;
										text-align: left;
										@include flex;
										.overflowBox {
											width: 50%;
											display: inline-block;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;
											cursor: pointer;
										}
									}
									p {
										@include flex-bet;
										span {
											font-size: 1.2rem;
											padding: 0px 10px;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.btnTabClass {
		@include flex-row-around;
		.buttonBox {
			height: 48px;
			line-height: 48px;
			background: transparent;
			width: 120px;
			min-width: 33%;
			display: inline-block;
			transform: skew(30deg);
			transform-origin: 0 0;
			border: none;
			color: #fff;
			padding: 0;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			span {
				display: inline-block;
				transform-origin: 0 0;
				transform: skew(-30deg);
				position: relative;
				width: 100%;
				left: 15px;
			}

			&:first-child {
				transform: skew(0deg);
				position: relative;
				margin-right: -15px !important;
				& > * {
					transform: skew(0deg) !important;
					left: -10px;
				}
				&::before {
					position: absolute;
					transform: skewX(30deg) !important;
					transform-origin: 0 100%;
					width: 100%;
					height: 100%;
					content: "";
					background-color: #061b59;
				}
			}
			&:last-child {
				transform: skew(0deg);
				position: relative;
				margin-left: -15px !important;
				span {
					transform: skew(0deg) !important;
					left: 15px !important;
				}
				&::before {
					position: absolute;
					transform: skewX(30deg) !important;
					transform-origin: 0 100%;
					width: 100%;
					height: 100%;
					content: "";
					left: 30px;
					background-color: #061b59;
				}
			}
			&:nth-child(2) {
				left: -13px;
				background-color: #061b59;
			}
		}
		.buttonBox:first-child.topMenuAct {
			background-color: transparent;
			border: none;
			border-left: 1px solid #376cff;
			color: #236bfa;
			&::before {
				border: 1px solid #376cff;
				background-color: #212241;
			}
		}
		.buttonBox:nth-child(2).topMenuAct {
			background-color: transparent;
			border: none;
			border: 1px solid #376cff;
			color: #236bfa;
			background-color: #212241;
			&::before {
				border: 1px solid #376cff;
			}
		}
		.buttonBox:last-child.topMenuAct {
			background-color: transparent;
			border: none;
			border-right: 1px solid #376cff;
			color: #236bfa;
			&::before {
				border: 1px solid #376cff;
				background-color: #212241;
			}
		}
	}
	.planeBox {
		display: flex;
		flex-wrap: wrap;
		margin: 20px 0px;
		overflow-y: auto;
		height: calc(100% - 88px);
		@include scrollbar;
		.circleBox {
			width: 50%;
			.titleClass {
				color: #3cb7ff;
				font-size: 1.6rem;
			}
			.numberClass {
				background: url(~@/assets/images/dataCockpit/warnBg.png) no-repeat;
				width: 100%;
				line-height: 160px;
				text-align: center;
				background-position: center;
				@include flex;
				span {
					color: #ff6f00;
					font-size: 2.8rem;
					margin-right: 5px;
				}
			}
		}
	}
</style>
<style>
	.tdt-infowindow-content-wrapper,
	.tdt-infowindow-tip {
		width: 278px;
		height: 95px;
		border-radius: 10px;
		background: #4a5157;
		color: #fff;
		font-size: 1.6rem;
		z-index: 99;
	}
	.tdt-infowindow-close-button {
		display: none;
	}
</style>