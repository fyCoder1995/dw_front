<template>
	<!-- name: '告警管理' -->
	<div class="container-box">
		<div class="left-box">
			<el-select
				v-model="projectId"
				filterable
				popper-class="projectPopClass"
				@change="
					connectionSocket();
					getEnAlarmOrdinaryData();
					getEnAlarmCommonlyData();
					getEnAlarmSeriousData();
					getCrossPageData();
				"
				v-el-select-loadmore="loadmore"
				:remote-method="remoteMethod"
				remote
				@clear="handleProListClear"
			>
				<el-option
					v-for="item in projectList"
					:key="item.projectNumber"
					:value="item.projectNumber"
					:label="item.projectName"
				></el-option>
			</el-select>
			<el-carousel arrow="never" :interval="5000">
				<el-carousel-item
					v-for="(item, index) in enDataObjList"
					:key="index"
					class="appraiseBox"
				>
					<h4>环境综合风险评价</h4>
					<div class="itemTopLeftClass">
						<p>
							<span class="titleClass">温度</span>
							<span
								:class="
									item.temperature.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.temperature.value }}℃</span
							>
						</p>
						<p>
							<span class="titleClass">湿度</span>
							<span
								:class="
									item.humidity.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.humidity.value }}%RH</span
							>
						</p>
						<p>
							<span class="titleClass">风速</span>
							<span
								:class="
									item.windPower.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.windPower.value }}m/s</span
							>
						</p>
						<p>
							<span class="titleClass">风向</span
							><span class="numberClass">{{ item.windDirection.value }}</span>
						</p>
					</div>
					<div class="itemTopRightClass">
						<p>
							<span class="titleClass">含氧量</span>
							<span
								:class="
									item.oxygenContent.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.oxygenContent.value }}%</span
							>
						</p>
						<p>
							<span class="titleClass">PM2.5</span>
							<span
								:class="
									item.pm2d5.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.pm2d5.value }}μg/m³</span
							>
						</p>
						<p>
							<span class="titleClass">PM10</span>
							<span
								:class="
									item.pm10.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.pm10.value }}μg/m³</span
							>
						</p>
					</div>
					<div class="itemBottomLeftClass">
						<p>
							<span class="titleClass">一氧化碳</span>
							<span
								:class="
									item.carbonMonoxide.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.carbonMonoxide.value }}ppm</span
							>
						</p>
						<p>
							<span class="titleClass">六氟化硫</span>
							<span
								:class="
									item.sulfurHexafluoride.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.sulfurHexafluoride.value }}ppm</span
							>
						</p>
						<p>
							<span class="titleClass">硫化氢</span>
							<span
								:class="
									item.hydrogenSulfide.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.hydrogenSulfide.value }}ppm</span
							>
						</p>
					</div>
					<div class="itemBottomRightClass">
						<p>
							<span class="titleClass">二氧化硫</span>
							<span
								:class="
									item.sulfurDioxide.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.sulfurDioxide.value }}ppm</span
							>
						</p>
						<p>
							<span class="titleClass">二氧化氮</span>
							<span
								:class="
									item.nitrogenDioxide.state === '0'
										? 'numberClass'
										: 'numberClass redWarn'
								"
								>{{ item.nitrogenDioxide.value }}ppm</span
							>
						</p>
					</div>
					<div class="ringBox">优</div>
				</el-carousel-item>
			</el-carousel>

			<div class="bottomBox">
				<p class="titleBox">
					<span class="titleClass">环境告警记录</span>
					<span class="numberClass"
						>&nbsp;严重&nbsp;<span class="red" v-show="envRedTotal > 0">{{
							envRedTotal
						}}</span
						>条</span
					>
					<span class="numberClass" v-show="envYellowTotal > 0"
						>&nbsp;一般&nbsp;<span class="red">{{ envYellowTotal }}</span
						>条</span
					>
					<span class="numberClass" v-show="envWhiteTotal > 0"
						>&nbsp;普通&nbsp;<span class="red">{{ envWhiteTotal }}</span
						>条</span
					>
				</p>
				<div class="listBox envRedListBox" v-show="envRedList.length > 0">
					<ul>
						<li v-for="(item, index) in envRedList" :key="index">
							<img src="@/assets/images/warnMange/red.png" alt="bell" />
							<span>{{ item.warningTime }} {{ item.warningInfo }}</span>
						</li>
					</ul>
				</div>
				<div class="listBox envYellowListBox" v-show="envYellowList.length > 0">
					<ul>
						<li v-for="(item, index) in envYellowList" :key="index">
							<img src="@/assets/images/warnMange/yellow.png" alt="bell" />
							{{ item.warningTime }} {{ item.warningInfo }}
						</li>
					</ul>
				</div>
				<div class="listBox envWhiteListBox" v-show="envWhiteList.length > 0">
					<ul>
						<li v-for="(item, index) in envWhiteList" :key="index">
							<img src="@/assets/images/warnMange/white.png" alt="bell" />
							{{ item.warningTime }} {{ item.warningInfo }}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="main-box">
			<div class="top-box">
				<p class="place-box">
					<span
						class="jumpBtnClass"
						@click="
							$router.push({
								path: '/views/prodPlan',
								query: { projectId: projectId },
							})
						"
						>当前项目生产计划管控</span
					>
					<img src="@/assets/images/placeIcon.png" alt="placeIcon" />
					<span>{{ weatherObj.province }} {{ weatherObj.city }}</span>
					<span>项目编号：{{ projectId }}</span>
				</p>
				<div class="weather-box">
					<h3 class="titleClass">作业现场天气</h3>
					<p class="todayWeather">
						<span class="weatherWord"
							>{{ weatherObj.today.daytemp }}℃
							{{ weatherObj.today.dayweather }}</span
						>
						<span class="weatcherWarn">
							<span>恶劣天气预警</span>
							<span>无</span>
						</span>
					</p>
					<p class="weatherWordSmall">
						{{ weatherObj.today.daytemp }}/{{ weatherObj.today.nighttemp }}℃
					</p>
					<!-- <h3>未来24小时天气</h3> -->
					<h3>未来8天天气</h3>
					<div class="weatherList">
						<ul>
							<li v-for="(item, index) in weatherObj.list" :key="index">
								<span>{{ item.time }}</span>
								<img
									:src="
										require('@/assets/images/weather/' + item.icon + '.png')
									"
									:alt="item.icon"
								/>
							</li>
						</ul>
					</div>
				</div>
				<div class="setting-box">
					<h3>警戒值设置</h3>
					<div class="listBox">
						<p>
							<span>温度</span><span>{{ warnValueObj.temperature }}℃</span
							><span
								@click="
									handleEdit('温度', 'temperature', warnValueObj.temperature)
								"
								>修改</span
							>
						</p>
						<p>
							<span>含氧量</span><span>{{ warnValueObj.oxygenContent }}%</span
							><span
								@click="
									handleEdit(
										'含氧量',
										'oxygenContent',
										warnValueObj.oxygenContent
									)
								"
								>修改</span
							>
						</p>
						<p>
							<span>一氧化碳</span><span>{{ warnValueObj.carbonMonoxide }}</span
							><span
								@click="
									handleEdit(
										'一氧化碳',
										'carbonMonoxide',
										warnValueObj.carbonMonoxide
									)
								"
								>修改</span
							>
						</p>
						<p>
							<span>硫化氢</span><span>{{ warnValueObj.hydrogenSulfide }}</span
							><span
								@click="
									handleEdit(
										'硫化氢',
										'hydrogenSulfide',
										warnValueObj.hydrogenSulfide
									)
								"
								>修改</span
							>
						</p>
						<p>
							<span>湿度</span><span>{{ warnValueObj.humidity }}%</span
							><span
								@click="handleEdit('湿度', 'humidity', warnValueObj.humidity)"
								>修改</span
							>
						</p>
						<p>
							<span>PM2.5</span><span>{{ warnValueObj.pm2d5 }}</span
							><span @click="handleEdit('PM2.5', 'pm2d5', warnValueObj.pm2d5)"
								>修改</span
							>
						</p>
						<p>
							<span>PM10</span><span>{{ warnValueObj.pm10 }}</span
							><span @click="handleEdit('PM10', 'pm10', warnValueObj.pm10)"
								>修改</span
							>
						</p>
						<p>
							<span>六氟化硫</span
							><span>{{ warnValueObj.sulfurHexafluoride }}</span
							><span
								@click="
									handleEdit(
										'六氟化硫',
										'sulfurHexafluoride',
										warnValueObj.sulfurHexafluoride
									)
								"
								>修改</span
							>
						</p>
						<p>
							<span>风力</span><span>{{ warnValueObj.windPower }}级</span
							><span
								@click="handleEdit('风力', 'windPower', warnValueObj.windPower)"
								>修改</span
							>
						</p>
						<p>
							<span>二氧化硫</span><span>{{ warnValueObj.sulfurDioxide }}</span
							><span
								@click="
									handleEdit(
										'二氧化硫',
										'sulfurDioxide',
										warnValueObj.sulfurDioxide
									)
								"
								>修改</span
							>
						</p>
						<p>
							<span>二氧化氮</span><span>{{ warnValueObj.carbonMonoxide }}</span
							><span
								@click="
									handleEdit(
										'二氧化氮',
										'carbonMonoxide',
										warnValueObj.carbonMonoxide
									)
								"
								>修改</span
							>
						</p>
					</div>
				</div>
			</div>
			<div class="bottom-box">
				<div class="itemClass">
					<p class="titleBox">
						<span class="titleClass">未佩戴安全帽警告</span>
						<span class="numberClass"
							><span class="red">{{ warnImgList.length }}</span
							>条</span
						>
					</p>
					<div class="listBox">
						<ul>
							<li v-for="item in warnImgList" :key="item.id">
								<!-- <img :src="require(item.fileUrl)" :alt="item.id" /> -->
								<img :src="item.fileUrl" :alt="item.id" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="right-box">
			<div class="itemClass">
				<p class="titleBox">
					<span class="titleClass">电子围栏告警</span>
					<span class="numberClass"
						><span class="red">{{ crossTotal }}</span
						>条</span
					>
				</p>
				<div class="listBox crossListBox">
					<ul>
						<li v-for="(item, index) in crossList" :key="index">
							<img src="@/assets/images/warnMange/white.png" alt="white" />
							{{ item.alarmTime }} {{ item.ialm }} {{ item.imove }}
							{{ item.ilowBat }} {{ item.ilay }} {{ item.userName }}
						</li>
					</ul>
				</div>
			</div>
			<div class="itemClass">
				<p class="titleBox">
					<span class="titleClass">作业人员生命体征告警</span>
					<span class="numberClass" v-show="signRedTotal > 0"
						>&nbsp;严重&nbsp;<span class="red">{{ signRedTotal }}</span
						>条</span
					>
					<span class="numberClass" v-show="signYellowTotal > 0"
						>&nbsp;一般&nbsp;<span class="red">{{ signYellowTotal }}</span
						>条</span
					>
					<span class="numberClass" v-show="signWhiteTotal > 0"
						>&nbsp;普通&nbsp;<span class="red">{{ signWhiteTotal }}</span
						>条</span
					>
				</p>
				<div class="listBox signRedListBox" signsRedList>
					<ul>
						<li v-for="(item, index) in signsRedList" :key="index">
							<img src="@/assets/images/warnMange/red.png" alt="red" />
							{{ item.warningTime }} {{ item.warningInfo }} 人员：{{
								item.userName
							}}
						</li>
					</ul>
				</div>
				<div
					class="listBox signYellowListBox"
					v-show="signsYellowList.length > 0"
				>
					<ul>
						<li v-for="(item, index) in signsYellowList" :key="index">
							<img src="@/assets/images/warnMange/yellow.png" alt="yellow" />
							{{ item.warningTime }} {{ item.warningInfo }}人员：{{
								item.userName
							}}
						</li>
					</ul>
				</div>
				<div
					class="listBox signWhiteListBox"
					v-show="signsWhiteList.length > 0"
				>
					<ul>
						<li v-for="(item, index) in signsWhiteList" :key="index">
							<img src="@/assets/images/warnMange/white.png" alt="white" />
							{{ item.warningTime }} {{ item.warningInfo }}人员：{{
								item.userName
							}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<pop-edit
			:dialogVisible="showEdit"
			:editData="editData"
			:title="editTitle"
			:valueName="valueName"
			@setShowEdit="setShowEdit"
		/>
	</div>
</template>

<script>
import { signsDict } from "@/utlis/const";
import { getvalue, getEnData, getProjectEnviron, getCrossPage, selectStUploadFileList, getEnAlarmOrdinary, getEnAlarmCommonly, getEnAlarmSerious, getBraceletAlarmOrdinary, getBraceletAlarmCommonly, getBraceletAlarmSerious } from "@/api/warnMange";
import { warnImgList } from "./data";
import PopEdit from "./components/popEdit.vue";
import axios from "axios";
import { getUserId } from "@/utlis/auth";

export default {
	components: {
		PopEdit,
	},
	directives: {
		'el-select-loadmore': {
			bind(el, binding) {
				const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
				SELECTWRAP_DOM.addEventListener('scroll', function () {
					const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
					if (condition) {
						binding.value();
					}
				});
			}
		}
	},
	data() {
		return {

			showEdit: false,
			editData: "",
			editTitle: "",
			crossList: [],

			warnImgList: [],
			weatherObj: {
				today: {},
				list: [],
			},
			warnValueObj: {},
			valueName: "",
			signsRedList: [],
			signRedListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			signRedTotal: 0,
			signsYellowList: [],
			signYellowListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			signYellowTotal: 0,
			signsWhiteList: [],
			signWhiteListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			signWhiteTotal: 0,
			socket: "",
			enDataObjList: [],
			enDataObj: {
				temperature: {},
				humidity: {},
				windPower: {},
				windDirection: {},
				oxygenContent: {},
				pm2d5: {},
				pm10: {},
				hydrogenSulfide: {},
				sulfurDioxide: {},
				nitrogenDioxide: {},
				carbonMonoxide: {},
				sulfurHexafluoride: {},
			},
			projectId: "",
			projectList: [],
			proListQuery: {
				pageNo: 1,
				pageSize: 10,
				deviceType: 3,
				projectName: this.$route.query.projectName ? this.$route.query.projectName : '杭州至富阳城际铁路附属配套工程10kV电力管线永久回迁工程三号隧道范围PD'
			},
			deviceNumber: '',
			envRedList: [],
			envRedListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			envRedTotal: 0,
			envYellowList: [],
			envYellowListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			envYellowTotal: 0,
			envWhiteList: [],
			envWhiteListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			envWhiteTotal: 0,
			crossListQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			crossTotal: 0,
		};
	},
	created() {
		this.getWeatherData();
		this.selectStUploadFileListData()
		this.getProjectEnvironData();
		this.getvalueData()

	},
	methods: {
		async getBraceletAlarmOrdinaryData(isLazy) {
			const { result } = await getBraceletAlarmOrdinary({ ...this.signWhiteListQuery, ...{ 'projectNumber': this.projectId } });
			this.signsWhiteList = isLazy
				? [...this.signsWhiteList, ...result.list]
				: result.list;
			this.signWhiteTotal = result.total;
		},
		async getBraceletAlarmCommonlyData(isLazy) {
			const { result } = await getBraceletAlarmCommonly({ ...this.signYellowListQuery, ...{ 'projectNumber': this.projectId } });
			this.signsYellowList = isLazy
				? [...this.signsYellowList, ...result.list]
				: result.list;
			this.signYellowTotal = result.total;
		},
		async getBraceletAlarmSeriousData(isLazy) {
			const { result } = await getBraceletAlarmSerious({ ...this.signRedListQuery, ...{ 'projectNumber': this.projectId } });
			this.signsRedList = isLazy
				? [...this.signsRedList, ...result.list]
				: result.list;
			this.signRedTotal = result.total;
		},
		async getvalueData() {
			const { result } = await getvalue({ id: "1" });
			this.warnValueObj = result;
		},
		setShowEdit() {
			this.showEdit = false;
			this.getvalueData();
		},
		handleEdit(name, valueName, val) {
			this.showEdit = true;
			this.editTitle = name;
			this.editData = val;
			this.valueName = valueName;
		},
		getWeatherData() {
			axios
				.get(
					"https://restapi.amap.com/v3/weather/weatherInfo?key=70ecd83d2d48557968cbbbf9cd1552a6&city=330100&extensions=all&output=JSON"
				)
				.then(({ data }) => {
					this.weatherObj.province = data.forecasts[0].province;
					this.weatherObj.city = data.forecasts[0].city;
					this.weatherObj.today = data.forecasts[0].casts[0];
					data.forecasts[0].casts.map((item) => {
						let temp = {};
						temp.time = item.date;
						temp.icon = item.dayweather;
						this.weatherObj.list.push(temp);
					});
					this.weatherObj.list = [...this.weatherObj.list, ...[{ time: '2022-01-29', icon: '小雨' }, { time: '2022-01-30', icon: '小雨-中雨' }, { time: '2022-01-31', icon: '多云' }, { time: '2022-02-01', icon: '小雨' }]]
				})
				.catch((err) => {
					console.warn(err);
				});
		},
		connectionSocket() {
			let _this = this;
			this.socket = new WebSocket(
				"ws://47.93.240.247:8090/imserver/" + getUserId()
			);
			this.socket.onopen = function () {
				_this.socket.send("open the socket");
				_this.getEnDataFuc();
			};
		},
		getEnDataFuc() {
			let _this = this;
			getEnData({
				projectNumber: _this.projectId,
				userId: getUserId(),
			}).then(res => {
				_this.enDataObjList = res.result
				_this.socket.onmessage = function (msg) {
					if (msg.data !== '连接成功' && JSON.parse(msg.data).messageType === '2') {
						_this.enDataObj = JSON.parse(msg.data);
						_this.enDataObjList = _this.enDataObjList.map(item => {
							if (item.equipmentNumber === _this.enDataObj.equipmentNumber) {
								item = _this.enDataObj
							}
							return item
						})
					}
				};
			})

		},
		getProjectEnvironData(isLazy) {
			getProjectEnviron(this.proListQuery).then((res) => {
				this.projectList = isLazy
					? [...this.projectList, ...res.result.list]
					: res.result.list;

				if (this.projectList.length > 0 && this.projectList[0].environDevice && this.projectList[0].environDevice.length > 0) {
					this.deviceNumber = this.projectList[0].environDevice[0].deviceNumber
				}
				this.$nextTick(() => {
					if (this.projectList.length > 0) {
						this.projectId = this.projectList[0].projectNumber;
					}
					if (!isLazy) {
						this.connectionSocket();
						this.getEnAlarmOrdinaryData()
						this.getEnAlarmCommonlyData()
						this.getEnAlarmSeriousData()
						this.getCrossPageData()
						this.getBraceletAlarmCommonlyData();
						this.getBraceletAlarmOrdinaryData()
						this.getBraceletAlarmSeriousData()
					}
				})
			});
		},

		async getEnAlarmOrdinaryData(isLazy) {
			const { result } = await getEnAlarmOrdinary({ ...this.envWhiteListQuery, ...{ 'projectNumber': this.projectId } })
			this.envWhiteList = isLazy
				? [...this.envWhiteList, ...result.list]
				: result.list;
			this.envWhiteTotal = result.total
		},

		async getEnAlarmCommonlyData(isLazy) {
			const { result } = await getEnAlarmCommonly({ ...this.envYellowListQuery, ...{ 'projectNumber': this.projectId } })
			this.envYellowList = isLazy
				? [...this.envYellowList, ...result.list]
				: result.list;
			this.envYellowTotal = result.total
		},

		async getEnAlarmSeriousData(isLazy) {
			const { result } = await getEnAlarmSerious({ ...this.envRedListQuery, ...{ 'projectNumber': this.projectId } })
			this.envRedList = isLazy
				? [...this.envRedList, ...result.list]
				: result.list;
			this.envRedTotal = result.total
		},

		async getCrossPageData(isLazy) {
			const { result } = await getCrossPage({ ...this.crossListQuery, ...{ 'projectNumber': this.projectId } })
			this.crossList = isLazy
				? [...this.crossList, ...result.list]
				: result.list;
			this.crossTotal = result.total
		},
		loadmore() {
			this.proListQuery.pageNo++
			this.getProjectEnvironData(true)
		},
		remoteMethod(query) {
			this.proListQuery = {
				pageNo: 1,
				pageSize: 10,
				deviceType: 3,
				projectName: query
			}
			this.getProjectEnvironData()
		},
		handleProListClear() {
			this.proListQuery = {
				pageNo: 1,
				pageSize: 10,
				deviceType: 3,
				projectName: ''
			}
			this.getProjectEnvironData()
		},
		async selectStUploadFileListData() {
			const { result } = await selectStUploadFileList({})
			this.warnImgList = result
		}
	},
	destroyed() {
		this.socket.close()
	},
	mounted() {
		let envWhiteListDom = document.querySelector(".envWhiteListBox");
		let envWhiteIsScroll = true;
		envWhiteListDom.addEventListener("scroll", (v) => {
			const envWhiteScrollDistance =
				envWhiteListDom.scrollHeight - envWhiteListDom.scrollTop < envWhiteListDom.clientHeight;
			if (!envWhiteScrollDistance && this.envWhiteTotal > 10 && envWhiteIsScroll) {
				if (this.envWhiteListQuery.pageNo >= Math.ceil(this.envWhiteTotal / 10)) {
					this.$message.warning("没有更多数据了");
					envWhiteIsScroll = false;
				}
				if (this.envWhiteListQuery.pageNo < Math.ceil(this.envWhiteTotal / 10)) {
					this.envWhiteListQuery.pageNo++;
					this.getEnAlarmOrdinaryData(true);
					envWhiteIsScroll = true;
				}
			}
		});

		let envYellowListDom = document.querySelector(".envYellowListBox");
		let envYellowIsScroll = true;
		envYellowListDom.addEventListener("scroll", (v) => {
			const envYellowScrollDistance =
				envYellowListDom.scrollHeight - envYellowListDom.scrollTop < envYellowListDom.clientHeight;
			if (!envYellowScrollDistance && this.envYellowTotal > 10 && envYellowIsScroll) {
				if (this.envYellowListQuery.pageNo >= Math.ceil(this.envYellowTotal / 10)) {
					this.$message.warning("没有更多数据了");
					envYellowIsScroll = false;
				}
				if (this.envYellowListQuery.pageNo < Math.ceil(this.envYellowTotal / 10)) {
					this.envYellowListQuery.pageNo++;
					this.getEnAlarmCommonlyData(true);
					envYellowIsScroll = true;
				}
			}
		});

		let envRedListDom = document.querySelector(".envRedListBox");
		let envRedIsScroll = true;
		envRedListDom.addEventListener("scroll", (v) => {
			const envRedScrollDistance =
				envRedListDom.scrollHeight - envRedListDom.scrollTop < envRedListDom.clientHeight;
			if (!envRedScrollDistance && this.envRedTotal > 10 && envRedIsScroll) {
				if (this.envRedListQuery.pageNo >= Math.ceil(this.envRedTotal / 10)) {
					this.$message.warning("没有更多数据了");
					envRedIsScroll = false;
				}
				if (this.envRedListQuery.pageNo < Math.ceil(this.envRedTotal / 10)) {
					this.envRedListQuery.pageNo++;
					this.getEnAlarmSeriousData(true);
					envRedIsScroll = true;
				}
			}
		});


		let crossListDom = document.querySelector(".crossListBox");
		let crossIsScroll = true;
		crossListDom.addEventListener("scroll", (v) => {
			const monScrollDistance =
				crossListDom.scrollHeight - crossListDom.scrollTop < crossListDom.clientHeight;
			if (!monScrollDistance && this.crossTotal > 10 && crossIsScroll) {
				if (this.crossListQuery.pageNo >= Math.ceil(this.crossTotal / 10)) {
					this.$message.warning("没有更多数据了");
					crossIsScroll = false;
				}
				if (this.crossListQuery.pageNo < Math.ceil(this.crossTotal / 10)) {
					this.crossListQuery.pageNo++;
					this.getCrossPageData(true);
					crossIsScroll = true;
				}
			}
		});

		let signWhiteListDom = document.querySelector(".signWhiteListBox");
		let signWhiteIsScroll = true;
		signWhiteListDom.addEventListener("scroll", (v) => {
			const signWhiteScrollDistance =
				signWhiteListDom.scrollHeight - signWhiteListDom.scrollTop < signWhiteListDom.clientHeight;
			if (!signWhiteScrollDistance && this.signWhiteTotal > 10 && signWhiteIsScroll) {
				if (this.signWhiteListQuery.pageNo >= Math.ceil(this.signWhiteTotal / 10)) {
					this.$message.warning("没有更多数据了");
					signWhiteIsScroll = false;
				}
				if (this.signWhiteListQuery.pageNo < Math.ceil(this.signWhiteTotal / 10)) {
					this.signWhiteListQuery.pageNo++;
					this.getBraceletAlarmOrdinaryData(true);
					signWhiteIsScroll = true;
				}
			}
		});

		let signYellowListDom = document.querySelector(".signYellowListBox");
		let signYellowIsScroll = true;
		signYellowListDom.addEventListener("scroll", (v) => {
			const signYellowScrollDistance =
				signYellowListDom.scrollHeight - signYellowListDom.scrollTop < signYellowListDom.clientHeight;
			if (!signYellowScrollDistance && this.signYellowTotal > 10 && signYellowIsScroll) {
				if (this.signYellowListQuery.pageNo >= Math.ceil(this.signYellowTotal / 10)) {
					this.$message.warning("没有更多数据了");
					signYellowIsScroll = false;
				}
				if (this.signYellowListQuery.pageNo < Math.ceil(this.signYellowTotal / 10)) {
					this.signYellowListQuery.pageNo++;
					this.getBraceletAlarmCommonlyData(true);
					signYellowIsScroll = true;
				}
			}
		});

		let signRedListDom = document.querySelector(".signRedListBox");
		let signRedIsScroll = true;
		signRedListDom.addEventListener("scroll", (v) => {
			const signRedScrollDistance =
				signRedListDom.scrollHeight - signRedListDom.scrollTop < signRedListDom.clientHeight;
			if (!signRedScrollDistance && this.signRedTotal > 10 && signRedIsScroll) {
				if (this.signRedListQuery.pageNo >= Math.ceil(this.signRedTotal / 10)) {
					this.$message.warning("没有更多数据了");
					signRedIsScroll = false;
				}
				if (this.signRedListQuery.pageNo < Math.ceil(this.signRedTotal / 10)) {
					this.signRedListQuery.pageNo++;
					this.getBraceletAlarmSeriousData(true);
					signRedIsScroll = true;
				}
			}
		});


	},
};
</script>

<style lang="scss" scoped>
	.container-box {
		background-color: transparent !important;
		@include flex-row-left;
		.left-box {
			width: calc(30% - 10px);
			height: 100%;
			margin-right: 10px;
			.el-select {
				width: 100%;
				margin-bottom: 10px;
			}
			.el-carousel {
				height: calc(72% - 110px);
				width: 100%;
				position: relative;
				margin-bottom: 10px;
			}

			.appraiseBox {
				height: 100%;
				width: 100%;
				h4 {
					font-size: 1.6rem;
					color: #5aa1ff;
					position: absolute;
					top: 10px;
					left: 20px;
				}
				.itemTopLeftClass {
					background: rgba($color: #5d7dff, $alpha: 0.13);
					width: calc(50% - 5px);
					height: calc(50% - 5px);
					position: absolute;
					top: 0px;
					left: 0px;
					@include flex-col;
					padding-top: 30px;
					font-size: 1.6rem;
					p {
						width: 93%;
						text-align: left;
						margin: 0px 5% 10px 2%;
						.titleClass {
							width: 50px;
							text-align: right;
							display: inline-block;
						}
						.numberClass {
							font-weight: bolder;
							color: #00ffb1;
							margin-left: 10px;
						}
					}
					&::before {
						content: "";
						width: 170px;
						height: 170px;
						background: #001754;
						position: absolute;
						bottom: -90px;
						right: -90px;
						border-radius: 170px 170px 170px 170px;
					}
				}
				.itemTopRightClass {
					background: rgba($color: #5d7dff, $alpha: 0.13);
					width: calc(50% - 5px);
					height: calc(50% - 5px);
					position: absolute;
					left: calc(50% + 5px);
					top: 0px;
					@include flex-col;
					font-size: 1.4rem;
					p {
						width: 80%;
						text-align: left;
						margin: 0px 0% 5px 20%;
						.titleClass {
							width: 70px;
							text-align: right;
							display: inline-block;
						}
						.numberClass {
							font-weight: bolder;
							color: #00ffb1;
							margin-left: 10px;
						}
					}
					&::before {
						content: "";
						width: 170px;
						height: 170px;
						background: #001754;
						position: absolute;
						bottom: -90px;
						left: -90px;
						border-radius: 170px 170px 170px 170px;
					}
				}
				.itemBottomLeftClass {
					background: rgba($color: #5d7dff, $alpha: 0.13);
					width: calc(50% - 5px);
					height: calc(50% - 5px);
					position: absolute;
					top: calc(50% + 5px);
					@include flex-col;
					padding-top: 40px;
					font-size: 1.4rem;
					p {
						width: 80%;
						text-align: left;
						margin: 0px 20% 10px 0%;
						.titleClass {
							width: 70px;
							text-align: right;
							display: inline-block;
						}
						.numberClass {
							font-weight: bolder;
							color: #00ffb1;
							margin-left: 10px;
						}
					}
					&::before {
						content: "";
						width: 170px;
						height: 170px;
						background: #001754;
						position: absolute;
						top: -90px;
						right: -90px;
						border-radius: 170px 170px 170px 170px;
					}
				}
				.itemBottomRightClass {
					background: rgba($color: #5d7dff, $alpha: 0.13);
					width: calc(50% - 5px);
					height: calc(50% - 5px);
					position: absolute;
					top: calc(50% + 5px);
					left: calc(50% + 5px);
					@include flex-col;
					padding-top: 40px;
					font-size: 1.4rem;
					p {
						width: 80%;
						text-align: left;
						margin: 0px 0% 10px 20%;
						.titleClass {
							width: 70px;
							text-align: right;
							display: inline-block;
						}
						.numberClass {
							font-weight: bolder;
							color: #00ffb1;
							margin-left: 10px;
						}
					}
					&::before {
						content: "";
						width: 170px;
						height: 170px;
						background: #001754;
						position: absolute;
						top: -90px;
						left: -90px;
						border-radius: 170px 170px 170px 170px;
					}
				}
				.ringBox {
					height: 160px;
					width: 160px;
					position: absolute;
					top: calc(50% - 80px);
					left: calc(50% - 80px);
					background: url(~@/assets/images/warnRing.png) no-repeat;
					background-size: 100% 100%;
					text-align: center;
					line-height: 160px;
					color: #00ffb1;
					font-size: 3.6rem;
				}
			}
			.bottomBox {
				height: calc(20% + 110px);
				overflow: auto;
				@include scrollbar;
				background-color: rgba($color: #5d7dff, $alpha: 0.13);
				padding-bottom: 30px;
				.titleBox {
					height: 50px;
					line-height: 50px;
					padding: 0px 10px;
					@include flex-bet;
					.titleClass {
						font-size: 1.6rem;
						color: #5aa1ff;
					}
					.numberClass {
						@include flex;
						font-size: 1.2rem;
						span {
							margin-right: 5px;
							font-weight: bolder;
						}
						.red {
							color: #ff4326;
						}
						.yellow {
							color: #ffb219;
						}
						.white {
							color: #ffffff;
						}
					}
				}
				.listBox {
					height: 45%;
					margin: 5px 10px;
					overflow: auto;
					@include scrollbar;
					padding-left: 10%;
					img {
						margin-right: 5px;
					}

					&.envWhiteListBox {
						color: #ffffff;
						border-bottom: 1px solid #ffffff;
						img {
							width: 15px !important;
							height: 14px !important;
						}
					}
					&.envRedListBox {
						color: #ff4326;
						border-bottom: 1px solid #ff4326;
						li{
							margin-left: 2px;
						}
					}
					&.envYellowListBox {
						color: #ffb219;
						border-bottom: 1px solid #ff4326;
					}
					ul {
						height: 100%;
						li {
							height: 28px;
							line-height: 28px;
							font-size: 1.1rem;
							// color: #ff6851;
							overflow: hidden;
							text-overflow: ellipsis;
							text-align: left;
							display: flex;
							justify-content: flex-start;
							margin-left: 10px;
						}
					}
				}
			}
		}
		.main-box {
			width: calc(45% + 10px);
			height: 100%;
			.top-box {
				height: 63%;
				width: 100%;
				.place-box {
					height: 40px;
					line-height: 40px;
					margin-bottom: 10px;
					@include flex-row-left;
					span {
						margin-left: 10px;
						font-size: 1.6rem;
					}
				}
				.weather-box {
					width: 100%;
					background: rgba($color: #5d7dff, $alpha: 0.13);
					height: 49%;
					padding: 0px 10px 10px 10px;
					display: flex;
					flex-flow: column;
					justify-content: space-around;
					.titleClass {
						width: 100%;
						height: 30px;
						line-height: 30px;
						font-size: 1.6rem;
						color: #5aa1ff;
						text-align: left;
					}
					.todayWeather {
						width: 100%;
						@include flex-row-bet;
						.weatherWord {
							font-size: 4.4rem;
							color: #00ffb1;
						}
						.weatcherWarn {
							display: inline-block;
							background: #5d83c6;
							border-radius: 4px;
							width: 200px;
							height: 60px;
							@include flex-col;
							span {
								display: inline-block;
								width: 100%;
								text-align: center;
								height: 30px;
								line-height: 30px;
								font-size: 1.6rem;
								&:last-child {
									color: #ff2e0e;
								}
							}
						}
					}
					.weatherWordSmall {
						width: 100%;
						text-align: left;
						font-size: 1.6rem;
						color: #00ffb1;
					}
					h3 {
						font-size: 2rem;
						text-align: left;
						width: 100%;
					}
					.weatherList {
						width: 100%;
						overflow: hidden;
						ul {
							overflow-x: auto;
							overflow-y: hidden;
							@include flex-row-left;
							height: 60px;
							li {
								height: 100%;
								@include flex-col-top;
								margin-left: 17px;
								img {
									width: 40px;
									height: 40px;
								}
								span {
									font-size: 1.2rem;
								}
							}
						}
					}
				}
				.setting-box {
					margin-top: 10px;
					width: 100%;
					height: 36.8%;
					background: rgba($color: #5d7dff, $alpha: 0.13);
					padding: 0px 10px 10px 10px;
					display: flex;
					flex-flow: column;
					justify-content: space-around;
					h3 {
						color: #5aa1ff;
						font-size: 1.6rem;
						width: 100%;
						text-align: left;
						height: 30px;
						line-height: 30px;
					}
					.listBox {
						width: 100%;
						display: flex;
						justify-content: flex-start;
						flex-flow: wrap;
						@include scrollbar;
						p {
							width: 25%;
							height: 30px;
							line-height: 30px;
							font-size: 1.4rem;
							text-align: left;
							@include flex;
							span {
								&:first-child {
									width: 70px;
									text-align: right;
								}
								&:nth-child(2) {
									margin-left: 5px;
									min-width: 60px;
									color: #ff6851;
								}
								&:last-child {
									color: #ff7c19;
									cursor: pointer;
								}
							}
						}
					}
				}
			}
			.bottom-box {
				height: 38%;
				margin-top: 10px;
				width: 100%;
				background: rgba($color: #5d7dff, $alpha: 0.13);
				.itemClass {
					width: 100%;
					height: 100%;
					font-size: 1.6rem;
					text-align: left;
					.titleBox {
						height: 30px;
						line-height: 30px;
						padding: 0px 20px;
						@include flex-bet;
						.titleClass {
							color: #5aa1ff;
						}
						.numberClass {
							.red {
								color: #ff4326;
								font-size: 1.8rem;
								font-weight: bolder;
							}
						}
					}
					.listBox {
						height: calc(100% - 50px);
						margin-bottom: 10px;
						overflow: hidden;
						width: 100%;
						ul {
							height: 100%;
							overflow-x: auto;
							overflow-y: hidden;
							@include flex-row-left;
							@include scrollbar;
							li {
								margin-top: 5px;
								height: 100%;
								margin: 0px 5px 0px 20px;
								color: #ff6851;
								min-width: 200px;
								img {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}
			}
		}
		.right-box {
			width: calc(30% - 10px);
			margin-left: 10px;
			margin-top: 50px;
			height: calc(100% - 50px);
			background: rgba($color: #5d7dff, $alpha: 0.13);
			.itemClass {
				width: 100%;
				height: 33%;
				font-size: 1.6rem;
				text-align: left;
				overflow: auto;
				@include scrollbar;
				&:last-child {
					background: rgba($color: #7b95ff, $alpha: 0.2);
				}
				.titleBox {
					height: 30px;
					line-height: 30px;
					padding: 0px 20px;
					@include flex-bet;
					.titleClass {
						color: #5aa1ff;
						font-size: 1.4rem;
					}
					.numberClass {
						font-size: 1.2rem;
						.red {
							color: #ff4326;
							font-size: 1.2rem;
							font-weight: bolder;
						}
					}
				}
				.listBox {
					height: 33%;
					overflow: auto;
					@include scrollbar;
					margin: 5px 10px;
					img {
						margin-right: 10px;
					}
					&.crossListBox {
						height: 80%;
					}
					&.signRedListBox {
						color: #ff4b30;
						border-bottom: 1px solid #ff4b30;
					}
					&.signYellowListBox {
						color: #ffb219;
						border-bottom: 1px solid #ffb219;
					}
					&.signWhiteListBox {
						color: #ffffff;
						border-bottom: 1px solid #ffffff;
					}
					ul {
						// height: 100%;
						li {
							margin-top: 5px;
							height: 28px;
							line-height: 28px;
							font-size: 1.1rem;
							padding: 0px 5px 0px 20px;
							// color: #ff6851;
							// background-color: rgba($color: #ff0000, $alpha: 0.05);
							overflow: hidden;
							text-overflow: ellipsis;
							display: flex;
							align-items: center;
						}
					}
				}
				&:last-child {
					height: calc(69% - 20px);
					margin-top: 10px;
				}
				&:first-child {
					margin-bottom: 10px;
				}
			}
		}
	}
	.redWarn {
		color: #ff6851 !important;
	}
	.jumpBtnClass {
		padding: 0px 10px;
		height: 34px;
		line-height: 34px;
		background: #1890ff;
		border-radius: 4px;
		margin-right: 10px;
		cursor: pointer;
	}
</style>
<style>
	.left-box .el-select .el-input__inner {
		background: transparent;
		color: #fff;
	}
	.el-carousel__container {
		height: 100% !important;
	}
</style>