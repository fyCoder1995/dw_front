<template>
	<!-- name: '生产计划管控' -->
	<div class="container-box">
		<div class="search-box">
			<el-form :model="searchForm" label-width="90px">
				<el-form-item label="项目名称：">
					<el-input
						placeholder="请输入项目名称"
						clearable
						v-model="searchForm.projectName"
					></el-input>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" @click="handleSearch"
						><i class="el-icon-search"></i> 查询</el-button
					>
					<el-button @click="handleReset">
						<i class="el-icon-refresh" /> 重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div class="operate-box">
			<span class="spanClass">项目列表</span>
			<!-- <el-button type="primary" @click="dialogAddFormVisible = true"
				><i class="el-icon-plus"></i>添加项目</el-button
			> -->
			<el-button type="primary" @click="handleDownload">模版下载</el-button>
			<el-button type="primary" @click="$refs.fileRef.click()"
				>模版导入
				<input
					ref="fileRef"
					type="file"
					style="font-size: 100px"
					multiple
					@change="handleUpload($event)"
				/>
			</el-button>
		</div>
		<div class="content-Box">
			<div class="right-Box">
				<div class="listBox">
					<p
						:class="actNum === index ? 'actClass' : ''"
						v-for="(item, index) in projectList"
						:key="index"
						@click="
							actNum = index;
							getProjectDetail(item.id);
						"
					>
						<span>{{ item.projectName }}</span
						><span>{{ item.projectStatus }}</span>
					</p>
				</div>
			</div>
			<div class="left-Box">
				<h3 class="nameClass" :title="projectDetailData.projectName">
					{{ projectDetailData.projectName }}
				</h3>
				<div class="detailBox">
					<p><span>项目编号：</span>{{ projectDetailData.projectNumber }}</p>
					<p>
						<span>项目主业/客户编码：</span>{{ projectDetailData.customerCode }}
					</p>
					<p><span>承揽单位：</span>{{ projectDetailData.undertakUnit }}</p>
					<p><span>工程大类：</span>{{ projectDetailData.mainCategory }}</p>
					<p><span>工程子类：</span>{{ projectDetailData.subclass }}</p>
					<p><span>流程类型：</span>{{ projectDetailData.processType }}</p>
					<p><span>项目类型：</span>{{ projectDetailData.projectType }}</p>
					<p><span>电压等级：</span>{{ projectDetailData.voltageLevel }}</p>
					<p><span>客户名称：</span>{{ projectDetailData.clientName }}</p>
					<p><span>项目状态：</span>{{ projectDetailData.projectStatus }}</p>
					<div class="pentagonBox">
						<div class="centerClass">
							<img src="@/assets/images/prodPlan/link0.png" alt="link0" />
						</div>
						<div
							class="linkBox link1"
							@click="
								$router.push({
									path: '/views/warnMange',
									query: {
										projectName: projectDetailData.projectName,
									},
								})
							"
						>
							<span>环境监测告警</span>
							<img src="@/assets/images/prodPlan/link1.png" alt="link1" />
						</div>
						<div
							class="linkBox link2"
							@click="
								$router.push({
									path: '/views/warnMange',
									query: {
										projectName: projectDetailData.projectName,
									},
								})
							"
						>
							<img src="@/assets/images/prodPlan/link2.png" alt="link2" />
							<span>生命体征告警</span>
						</div>
						<div
							class="linkBox link3"
							@click="
								$router.push({
									path: '/views/onsiteWork/droneMonitor',
								})
							"
						>
							<img src="@/assets/images/prodPlan/link3.png" alt="link3" />
							<span>无人机视频监控</span>
						</div>
						<div
							class="linkBox link4"
							@click="
								$router.push({
									path: '/views/onsiteWork/onsiteMonitor',
								})
							"
						>
							<img src="@/assets/images/prodPlan/link4.png" alt="link4" />

							<span>单兵视频监控</span>
						</div>
						<div
							class="linkBox link5"
							@click="
								$router.push({
									path: '/views/warnMange',
									query: {
										projectName: projectDetailData.projectName,
									},
								})
							"
						>
							<img src="@/assets/images/prodPlan/link5.png" alt="link5" />
							<span>电子围栏告警</span>
						</div>
					</div>
				</div>
				<h3 class="titleClass">生产计划列表</h3>
				<div class="listBox">
					<div
						class="itemBox"
						v-for="item in projectDetailData.productionPlanVOList"
						:key="item.id"
					>
						<p class="contentClass">
							{{ item.workContent }}
						</p>
						<p class="placeClass">
							<span
								><img src="@/assets/images/placeIcon.png" alt="placeIcon" />{{
									item.workPlace
								}}</span
							>
							<span
								style="
									margin-left: 10px;
									color: #f67300;
									display: flex;
									align-items: center;
								"
								>{{ item.workState }}</span
							>
							<span
								style="margin-left: 30px; color: #6dc0ff"
								v-show="item.type === 1"
								>配电&nbsp;<img
									src="@/assets/images/prodPlan/pdIcon.png"
									alt="pwIcon"
							/></span>
							<span
								style="
									margin-left: 30px;
									color: #ffeb36;
									display: flex;
									align-items: center;
								"
								v-show="item.type === 0"
								>带电&nbsp;<img
									src="@/assets/images/prodPlan/ddIcon.png"
									alt="gdIcon"
							/></span>
						</p>
						<p class="otherClass">
							<span
								>{{ item.workLeader }}/{{ item.workTeam }}/{{
									item.projectType
								}}</span
							>
							<span>{{ item.planStartTime }}</span>
							<span
								@click="
									dialogDetailFormVisible = true;
									workDetailObj = item;
								"
								>详情</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>
		<el-dialog
			title="新增项目"
			:visible.sync="dialogAddFormVisible"
			custom-class="addFormDialog"
			:close-on-click-modal="false"
		>
			<el-form :model="addForm" :rules="formRules" ref="addFormRef">
				<el-form-item label="项目名称：" prop="projectName" label-width="110px">
					<el-input
						v-model="addForm.projectName"
						placeholder="请输入项目名称"
						clearable
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="handleClosed">取 消</el-button>
				<el-button type="primary" @click="handleAdd">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog
			title="项目详情"
			:visible.sync="dialogDetailFormVisible"
			custom-class="detailFormDialog"
			:close-on-click-modal="false"
		>
			<p>
				<span>作业状态：</span><span>{{ workDetailObj.workState }}</span>
			</p>
			<p>
				<span>计划开始时间：</span
				><span>{{ workDetailObj.planStartTime }}</span>
			</p>
			<p>
				<span>计划结束时间：</span><span>{{ workDetailObj.planEndTime }}</span>
			</p>
			<p>
				<span>作业开始时间：</span
				><span>{{ workDetailObj.workStartTime }}</span>
			</p>
			<p>
				<span>作业单位：</span><span>{{ workDetailObj.workUnit }}</span>
			</p>
			<p>
				<span>作业班组：</span><span>{{ workDetailObj.workTeam }}</span>
			</p>
			<p>
				<span>作业地点：</span><span>{{ workDetailObj.workPlace }}</span>
			</p>
			<p>
				<span>工作负责人：</span><span>{{ workDetailObj.workLeader }}</span>
			</p>
			<p>
				<span>工作负责人联系电话：</span
				><span>{{ workDetailObj.contactNumber }}</span>
			</p>
			<p>
				<span>作业类型：</span><span>{{ workDetailObj.workType }}</span>
			</p>
			<p>
				<span>分公司：</span><span>{{ workDetailObj.branchCompany }}</span>
			</p>
			<p>
				<span>工程类型：</span><span>{{ workDetailObj.projectType }}</span>
			</p>
			<p>
				<span>计划类型：</span><span>{{ workDetailObj.planType }}</span>
			</p>
			<p>
				<span>工作类型：</span><span>{{ workDetailObj.jobType }}</span>
			</p>
			<p>
				<span>是否停电作业：</span
				><span v-show="workDetailObj.workFlg !== 'null'">{{
					workDetailObj.workFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>变电站及主线路名称：</span
				><span>{{ workDetailObj.substationLine }}</span>
			</p>
			<p>
				<span>工作内容：</span><span>{{ workDetailObj.workContent }}</span>
			</p>
			<p>
				<span>电压等级：</span><span>{{ workDetailObj.voltageLevel }}</span>
			</p>
			<p>
				<span>停电设备范围：</span
				><span>{{ workDetailObj.equipmentRange }}</span>
			</p>
			<p>
				<span>是否变电所配合：</span
				><span v-show="workDetailObj.coordinateFlg !== 'null'">{{
					workDetailObj.coordinateFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>计划停电时间：</span
				><span>{{ workDetailObj.outageStartTime }}</span>
			</p>
			<p>
				<span>计划停电结束时间：</span
				><span>{{ workDetailObj.outageEndTime }}</span>
			</p>
			<p>
				<span>停电用户数：</span><span>{{ workDetailObj.userAmount }}</span>
			</p>
			<p>
				<span>重要停电用户清单：</span
				><span>{{ workDetailObj.importantUsers }}</span>
			</p>
			<p>
				<span>是否不停电作业示范区：</span
				><span v-show="workDetailObj.areaFlg !== 'null'">{{
					workDetailObj.areaFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>是否现场完工：</span
				><span v-show="workDetailObj.completeFlg !== 'null'">{{
					workDetailObj.completeFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>线路属性：</span><span>{{ workDetailObj.lineAttributes }}</span>
			</p>
			<p><span>风险等级：</span><span></span></p>
			<p>
				<span>到岗到位人员（联系电话）：</span
				><span>{{ workDetailObj.placePersonPhone }}</span>
			</p>
			<p>
				<span>业主单位人数：</span><span>{{ workDetailObj.mainBusiness }}</span>
			</p>
			<p>
				<span>外包单位人数：</span
				><span>{{ workDetailObj.outsourcePeoples }}</span>
			</p>
			<p>
				<span>产业人员人数：</span
				><span>{{ workDetailObj.industryPeoples }}</span>
			</p>
			<p>
				<span>现场人数：</span><span>{{ workDetailObj.sitePeoples }}</span>
			</p>
			<p>
				<span>识别人数：</span><span>{{ workDetailObj.identityPeoples }}</span>
			</p>
			<p>
				<span>分包单位：</span><span>{{ workDetailObj.subcontractor }}</span>
			</p>
			<p>
				<span>是否需要到岗到位：</span
				><span v-show="workDetailObj.placeFlg !== 'null'">{{
					workDetailObj.placeFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>备注：</span><span>{{ workDetailObj.remark }}</span>
			</p>
			<p>
				<span>是否专业分包：</span
				><span v-show="workDetailObj.subcontractFlg !== 'null'">{{
					workDetailObj.subcontractFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>风险评定标准：</span
				><span>{{ workDetailObj.riskRatingStandard }}</span>
			</p>
			<p>
				<span>是否带电工作：</span
				><span v-show="workDetailObj.electricityFlg !== 'null'">{{
					workDetailObj.electricityFlg ? "是" : "否"
				}}</span>
			</p>
			<p>
				<span>主业单位作业人数：</span
				><span>{{ workDetailObj.mainBusiness }}</span>
			</p>
			<p>
				<span>外包单位作业人数：</span
				><span>{{ workDetailObj.outsourcePeoples }}</span>
			</p>
			<p>
				<span>产业单位作业人数：</span
				><span>{{ workDetailObj.industryPeoples }}</span>
			</p>
			<p>
				<span>现场人数：</span><span>{{ workDetailObj.sitePeoples }}</span>
			</p>
			<p>
				<span>专业管理部门：</span
				><span>{{ workDetailObj.professionalDepartment }}</span>
			</p>
			<p>
				<span>建管单位：</span><span>{{ workDetailObj.buildUnit }}</span>
			</p>
			<p>
				<span>电网风险等级：</span
				><span>{{ workDetailObj.gridRiskLevel }}</span>
			</p>
			<p>
				<span>分包单位：</span><span>{{ workDetailObj.subcontractor }}</span>
			</p>
			<div class="detailImgBox">
				<span>列队照片</span>
				<div class="imgListBox">
					<h3>工作许可信息</h3>
					<div class="imgBox">
						现场许可照片：
						<ul v-if="workDetailObj.workPermitRecord">
							<li
								v-for="(item, index) in workDetailObj.workPermitRecord
									.siteLicense"
								:key="index"
							>
								<img :src="item" alt="" />
							</li>
						</ul>
					</div>
					<div class="imgBox">
						安置布置措施：
						<ul v-if="workDetailObj.workPermitRecord">
							<li
								v-for="(item, index) in workDetailObj.workPermitRecord
									.ancuoLayout"
								:key="index"
							>
								<img :src="item" alt="" />
							</li>
						</ul>
					</div>
				</div>
				<div class="imgListBox">
					<h3>站班会信息</h3>
					<div class="imgBox">
						站班会照片：
						<ul v-if="workDetailObj.workMeetRecord">
							<li
								v-for="(item, index) in workDetailObj.workMeetRecord
									.standingMeeting"
								:key="index"
							>
								<img :src="item" alt="" />
							</li>
						</ul>
					</div>
				</div>
				<div class="imgListBox" v-if="workDetailObj.strutsLogList">
					<h3>状态变更信息</h3>
					<div
						class="pBoxClass"
						v-for="(item, index) in workDetailObj.strutsLogList"
						:key="index"
					>
						<p>变更人：{{ item.updatePerson }}</p>
						<p>变更时间：{{ item.updateTime }}</p>
						<p>变更动作：{{ item.updateAction }}</p>
						<p>gps：{{ item.gps }}</p>
						<p>备注：</p>
					</div>
				</div>
			</div>

			<div slot="footer">
				<el-button type="primary" @click="dialogDetailFormVisible = false"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {
	getProjectListPage,
	insertProject,
	outputRightProtectionData,
	insertProjectData,
	getProject,
} from "@/api/prodPlan";
export default {
	components: {},
	data() {
		return {
			listQuery: {
				pageNo: 1,
				pageSize: 20,
			},
			projectList: [],
			total: 0,
			actNum: 0,
			dialogAddFormVisible: false,
			dialogDetailFormVisible: false,
			addForm: {},
			formRules: {
				projectName: [
					{ required: true, message: "请输入项目名称", trigger: "blur" },
				],
			},
			projectDetailData: {},
			workDetailObj: {},
			searchForm: {},
		};
	},
	created() {
		if (this.$route.query.projectId) {
			this.listQuery.projectNumber = this.$route.query.projectId;
		}
		this.getProjectListPageData(this.listQuery);
	},
	methods: {
		async getProjectListPageData(params, isLazy) {
			params = arguments[0] ? arguments[0] : {};
			const { result } = await getProjectListPage(params);
			this.projectList = isLazy
				? [...this.projectList, ...result.list]
				: result.list;
			this.total = result.total;
			this.getProjectDetail(this.projectList[0].id);
		},
		async getProjectDetail(id) {
			const { result } = await getProject({ id });
			this.projectDetailData = result;
			this.listQuery = {
				pageNo: 1,
				pageSize: 20,
			};
		},
		handleClosed() {
			this.dialogAddFormVisible = false;
			if (this.$refs.addFormRef) {
				this.$refs.addFormRef.resetFields();
			}
			this.addForm = {};
		},
		handleAdd() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (valid) {
					await insertProject(this.addForm);
					this.dialogAddFormVisible = false;
					this.$message.success("新增项目成功");
					this.listQuery = {
						pageNo: 1,
						pageSize: 20,
					};
					this.getProjectListPageData(this.listQuery);
					this.handleClosed();
				}
			});
		},
		async handleDownload() {
			const result = await outputRightProtectionData();
			let alink = document.createElement("a");
			alink.download = "项目模版.xls";
			alink.style.display = "none";
			alink.href = URL.createObjectURL(result);
			document.body.appendChild(alink);
			alink.click();
			URL.revokeObjectURL(alink.href);
			document.body.removeChild(alink);
		},
		handleUpload(event) {
			let files = event.target.files;
			let formData = new window.FormData();
			for (let item of files) {
				formData.append("file", item);
			}
			insertProjectData(formData).then((res) => {
				if (res.statusCode === "200") {
					this.$message.success("项目导入成功");
					this.getProjectListPageData(this.listQuery);
				}
			});
		},
		handleSearch() {
			this.listQuery.pageNo = 1;
			this.getProjectListPageData({ ...this.searchForm, ...this.listQuery });
		},
		handleReset() {
			this.searchForm = {};
			this.handleSearch();
		},
	},
	mounted() {
		let listDom = document.querySelector(".listBox");
		let isScroll = true;
		listDom.addEventListener("scroll", (v) => {
			const scrollDistance =
				listDom.scrollHeight - listDom.scrollTop < listDom.clientHeight;
			if (!scrollDistance && this.total > 20 && isScroll) {
				if (this.listQuery.pageNo >= Math.ceil(this.total / 20)) {
					this.$message.warning("没有更多数据了");
					isScroll = false;
				}
				if (this.listQuery.pageNo < Math.ceil(this.total / 20)) {
					this.listQuery.pageNo++;
					this.getProjectListPageData(this.listQuery, true);
					isScroll = true;
				}
			}
		});
	},
};
</script>

<style lang="scss" scoped>
	.container-box {
		padding-top: 10px;
		.search-box {
			padding-top: 0px;
			margin-bottom: 15px;
			.el-form-item {
				margin-bottom: 10px;
				margin-right: 10px;
			}
		}
		.operate-box {
			margin-top: 0px;
			margin-bottom: 10px;
			.spanClass {
				font-size: 1.8rem;
				color: #5aa1ff;
				margin-right: 20px;
			}
		}
		.content-Box {
			width: calc(100% - 40px);
			height: calc(100% - 84px);
			margin: 0px 20px;
			@include flex;
			.right-Box {
				height: 100%;
				width: 50%;
				overflow: hidden;
				.listBox {
					width: 100%;
					height: 100%;
					overflow-y: auto;
					@include scrollbar;
					p {
						font-size: 1.4rem;
						color: #ffffff;
						height: 50px;
						line-height: 50px;
						width: calc(100% - 10px);
						background-color: rgba($color: #ffffff, $alpha: 0.15);
						margin-bottom: 10px;
						cursor: pointer;
						margin-right: 10px;
						span {
							height: 100%;
							display: inline-block;
							line-height: 50px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							padding: 0 10px;
							&:first-child {
								width: 80%;
								text-align: center;
							}
							&:last-child {
								width: 20%;
								text-align: center;
							}
						}
					}
					.actClass {
						color: #5aa1ff;
						width: 100%;
						margin-right: 0px;
					}
				}
			}
			.left-Box {
				height: 100%;
				width: 50%;
				overflow: auto;
				background-color: rgba($color: #ffffff, $alpha: 0.15);
				@include scrollbar;
				.nameClass {
					height: 40px;
					line-height: 40px;
					width: 100%;
					text-align: center;
					font-size: 1.8rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					padding: 0 10px;
				}
				.detailBox {
					width: 100%;
					padding: 10px 20px 10px 20px;
					font-size: 1.4rem;
					line-height: 24px;
					position: relative;
					p {
						width: 100%;
						text-align: left;
					}
					.pentagonBox {
						position: absolute;
						width: 180px;
						height: 180px;
						right: 10%;
						top: 20%;
						.centerClass {
							position: relative;
							width: 86px;
							height: 86px;
							left: calc(50% - 43px);
							top: calc(50% - 43px);
							img {
								width: 100%;
								height: 100%;
							}
						}
						.linkBox {
							@include flex-col;
							cursor: pointer;
						}
						.link1 {
							position: absolute;
							top: -40px;
							width: 100%;
							span {
								margin-bottom: -10px;
								font-size: 1.2rem;
							}
						}
						.link2 {
							position: absolute;
							top: 5px;
							right: -35px;
							width: 50%;
							span {
								margin-top: -30px;
								font-size: 1.2rem;
							}
						}
						.link3 {
							position: absolute;
							top: 0px;
							left: -30px;
							width: 50%;
							span {
								margin-top: -40px;
								font-size: 1.2rem;
							}
						}
						.link4 {
							position: absolute;
							bottom: -40px;
							right: -10px;
							width: 50%;
							span {
								margin-top: -40px;
								font-size: 1.2rem;
							}
						}
						.link5 {
							position: absolute;
							bottom: -40px;
							left: -5px;
							width: 50%;
							span {
								margin-top: -30px;
								font-size: 1.2rem;
							}
						}
					}
				}
				.titleClass {
					height: 40px;
					line-height: 40px;
					width: 100%;
					text-align: left;
					font-size: 1.6rem;
					padding-left: 20px;
				}
				.listBox {
					height: calc(100% - 340px);
					width: 100%;
					padding: 10px 20px 10px 20px;
					.itemBox {
						background: rgba($color: #002055, $alpha: 0.2);
						padding: 10px;
						margin-bottom: 10px;
						.contentClass {
							text-align: left;
							margin-bottom: 10px;
						}
						.placeClass {
							text-align: left;
							@include flex-row-left;
							span {
								&:first-child {
									@include flex-row-left;
								}
							}
							img {
								width: 11px;
								height: 13px;
								margin-right: 10px;
							}
						}
						.otherClass {
							margin-top: 10px;
							text-align: left;
							@include flex-bet;
							span {
								&:last-child {
									color: #1890ff;
									cursor: pointer;
								}
							}
						}
					}
				}
			}
		}
		.detailFormDialog {
			p {
				text-align: left;
				line-height: 36px;
				border-bottom: 1px solid #e5e5e5;
				span {
					font-size: 1.6rem;
					color: #525252;
					&:first-child {
						color: #898989;
					}
				}
			}
			.detailImgBox {
				text-align: left;
				span {
					font-size: 2rem;
					height: 50px;
					line-height: 50px;
					background: #f0f0f0;
					width: 100%;
					display: inline-block;
				}
				.imgListBox {
					margin: 10px 20px;
					h3 {
						color: #000;
						font-weight: bolder;
						font-size: 1.8rem;
					}
					.imgBox {
						@include flex-row-left;
						ul {
							margin: 10px;
							@include flex-row-left;
							width: 80%;
							overflow-x: auto;
							li {
								margin-left: 10px;
							}
						}
					}
					img {
						width: 98px;
						height: 98px;
					}
					.pBoxClass {
						margin-bottom: 20px;
						font-size: 1.6rem;
						text-align: left;
						p {
							border-bottom: 1px solid #f0f0f0;
						}
					}
				}
			}
		}
		.el-button {
			position: relative;
			input {
				width: 125px;
				height: 34px;
				cursor: pointer;
				position: absolute;
				top: 0px;
				left: 0px;
				opacity: 0;
				font-size: 50px;
			}
		}
	}
</style>
<style>
	.detailFormDialog .el-dialog__body {
		height: 500px;
		overflow: auto;
	}
</style>