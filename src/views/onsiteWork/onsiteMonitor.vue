<template>
	<!-- name: '现场监控' -->
	<div class="container-box">
		<div class="left-box">
			<!-- <el-input v-model="porjectName" placeholder="搜索" class="searchInput">
				<i class="el-icon-search el-input__icon" slot="suffix"> </i>
			</el-input> -->
			<el-select
				class="searchInput"
				v-model="projectNumber"
				filterable
				placeholder="请输入或选择项目"
				popper-class="projectPopClass"
				v-el-select-loadmore="loadmore"
				:remote-method="remoteMethod"
				remote
				@clear="handleProListClear"
				@change="getDeviceTreeData()"
			>
				<el-option
					v-for="item in projectList"
					:key="item.projectNumber"
					:value="item.projectNumber"
					:label="item.projectName"
				></el-option>
			</el-select>
			<div class="treeBox">
				<el-tree
					icon-class="el-icon-arrow-right"
					:data="treeList"
					:props="defaultProps"
					@node-click="handleNodeClick"
				>
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span v-show="node.childNodes.length === 0">
							<el-button type="text" @click="() => handleAppend(data, node)">
								+
							</el-button>
						</span>
					</span>
				</el-tree>
			</div>
		</div>
		<div class="right-box">
			<el-select
				v-model="boxNumber"
				class="boxInput"
				style="float: left; margin-bottom: 5px"
			>
				<el-option
					v-for="item in boxNumberList"
					:key="item"
					:value="item"
					:label="item + ' 格'"
				></el-option>
			</el-select>
			<div class="imgList">
				<div
					:class="'itemImg boxClass' + boxNumber"
					v-for="i in boxNumber"
					:key="i"
				>
					<!-- <div id="video-container" style="width: 600px; height: 600px"></div> -->

					<!-- <video
						id="myPlayer"
						controls
						playsInline
						webkit-playsinline
						width="100%"
						height="100%"
					></video> -->
					<!-- <img v-if="item.imgURL" :src="item.imgURL" class="video" />
					<video v-else :src="item.videoURL" autoplay loop controls></video>
					<i class="el-icon-circle-close" @click="handleClose(item)"></i> -->
					<i
						class="el-icon-circle-close"
						@click="handleClose()"
						v-show="videoList.length > 0"
						style="z-index: 99"
					></i>
					<i
						class="el-icon-full-screen"
						@click="dialogFormVisible = true"
						v-show="videoList.length > 0"
						style="z-index: 99"
					></i>
				</div>
			</div>
		</div>
		<el-dialog
			:visible="dialogFormVisible"
			:close-on-click-modal="false"
			:before-close="handleClosed"
			@opened="handleBig"
		>
			<div id="myPlayerBig"></div>
		</el-dialog>
	</div>
</template>

<script>
import { treeList, onsiteList, cameraList } from "./data";
import { getDeviceTree } from "@/api/onsiteWork";
import { getProjectNameList } from '@/api/public'
import axios from "axios";
import EZUIKit from 'ezuikit-js';
export default {
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
	components: {},
	data() {
		return {
			projectNumber: '',
			treeList: [],
			defaultProps: {
				children: "childrenList",
				label: "name",
			},
			onsiteList: [],
			projectList: [],
			proListQuery: {
				pageNo: 1,
				pageSize: 10,
				projectName: ''
			},
			videoList: [],
			accessToken: '',
			player: null,
			myPlayer: '',
			dialogFormVisible: false,
			playerBig: null,
			boxNumberList: [4, 9, 16],
			boxNumber: 9
		};
	},
	created() {
		this.onsiteList = onsiteList;
		this.getProjectNameListData()
		this.treeList = treeList
		this.getToken()
	},
	methods: {
		handleNodeClick(data) {
			if (data.deviceId) {
				console.warn(data.deviceId);
			}
		},
		async getDeviceTreeData() {
			this.treeList = []
			const { result } = await getDeviceTree({ projectNumber: this.projectNumber });
			this.treeList.push(result);
		},
		async getProjectNameListData(isLazy) {
			const { result } = await getProjectNameList(this.proListQuery)
			this.projectList = isLazy
				? [...this.projectList, ...result.list]
				: result.list;
			this.projectNumber = this.projectList.length > 0 ? this.projectList[0].projectNumber : '西D704001'
			// this.getDeviceTreeData();
		},
		loadmore() {
			this.proListQuery.pageNo++
			this.getProjectNameListData(true)
		},
		remoteMethod(query) {
			this.proListQuery = {
				pageNo: 1,
				pageSize: 10,
				projectName: query ? query : ''
			}
			this.getProjectNameListData()
		},
		handleProListClear() {
			this.proListQuery = {
				pageNo: 1,
				pageSize: 10,
				projectName: ''
			}
			this.getProjectNameListData()
		},
		handleAppend(data, node) {
			// if (this.videoList.length <= 9) {
			// 	this.onsiteList.map(item => {
			// 		if (item.id === data.id && this.videoList.length > 0) {
			// 			this.videoList.map(subItem => {
			// 				if (subItem.id === data.id) {
			// 					this.$message.error('请勿重复添加！')
			// 				}
			// 			})
			// 		}
			// 		if (item.id === data.id) {
			// 			this.videoList.push(item)
			// 			this.videoList = Array.from(new Set(this.videoList))
			// 		}
			// 	})
			// } else {
			// 	this.$message.error('最多添加9个摄像头！')
			// }
			if (this.videoList.length === 1) {
				this.$message.error('请勿重复添加！')
			} else {
				this.getLiveAddress()
			}
		},
		handleClose() {
			this.videoList = []
			this.player.stop()
			document.querySelector('.itemImg').removeChild(this.myPlayer)
		},
		handleClosed() {
			this.dialogFormVisible = false
			if (this.playerBig) {
				this.playerBig.stop()
			}
		},
		getToken() {
			axios.post('https://open.ys7.com/api/lapp/token/get?appKey=328111ffc644438e99b9a8a5f179207d&appSecret=990298213b44f0670c1eea96d1d95573')
				.then(({ data }) => {
					this.accessToken = data.data.accessToken
				})
		},
		getLiveAddress() {
			axios.post('https://open.ys7.com/api/lapp/v2/live/address/get?accessToken=' + this.accessToken + "&deviceSerial=D41227818&code=BFNPPS")
				.then(({ data }) => {
					let temp = { id: 'D41227818', url: data.data.url }
					this.videoList.push(temp)
					let myPlayer = document.createElement('div')
					document.querySelector('.itemImg').appendChild(myPlayer)
					myPlayer.id = 'myPlayer'
					myPlayer.style.width = '100%'
					myPlayer.style.height = '100%'
					myPlayer.style.overflow = 'hidden'
					myPlayer.allowfullscreen = 'allowfullscreen'
					this.myPlayer = myPlayer
					this.player = new EZUIKit.EZUIKitPlayer({
						autoplay: true,
						id: "myPlayer",
						accessToken: this.accessToken,
						url: this.videoList[0].url,
						fullScreenCallBack: data => console.log("全屏回调", data),
					});
				})
		},
		handleBig() {
			this.playerBig = new EZUIKit.EZUIKitPlayer({
				autoplay: true,
				id: "myPlayerBig",
				accessToken: this.accessToken,
				url: this.videoList[0].url,
				fullScreenCallBack: data => console.log("全屏回调", data),
			});
		},
	},
};
</script>

<style lang="scss" scoped>
	.container-box {
		background: transparent;
		@include flex;
		.left-box {
			width: 20%;
			height: 100%;
			background: rgba($color: #5d7dff, $alpha: 0.13);
			.el-input {
				width: 90%;
				margin: 10px 5%;
				height: 34px;
			}
			.treeBox {
				width: 90%;
				margin: 10px 5%;
				height: calc(100% - 125px);
				overflow-y: auto;
				// overflow-x: hidden;
				@include scrollbar;
				.el-tree {
					background: transparent;
					color: #fff;
				}
			}
		}
		.right-box {
			width: calc(80% - 10px);
			margin-left: 10px;
			height: 100%;
			background: rgba($color: #5d7dff, $alpha: 0.13);
			.imgList {
				width: 100%;
				height: calc(100% - 65px);
				overflow-y: auto;
				display: flex;
				flex-flow: wrap;
				justify-content: flex-start;
				align-content: baseline;
				@include scrollbar;
				// background: url(~@/assets/images/onsite/videoBg.png) no-repeat;
				// background-size: 100% 100%;
				.itemImg {
					padding: 10px;
					position: relative;
					cursor: pointer;
					background: #000;

					&.boxClass9 {
						width: 33%;
						height: 33%;
						margin: 0px 0.3% 0.2% 0px;
					}
					&.boxClass4 {
						width: 49%;
						height: 49%;
						margin: 0px 0.3% 0.2% 0px;
					}
					&.boxClass16 {
						width: 24.5%;
						height: 24.5%;
						margin: 0px 0.5% 0.3% 0px;
					}
					img,
					video {
						width: 100%;
						height: 100%;
					}
					.el-icon-circle-close {
						position: absolute;
						right: 1%;
						top: 1%;
						font-size: 1.8rem;
						display: none;
					}
					.el-icon-full-screen {
						position: absolute;
						right: 3%;
						bottom: 5%;
						font-size: 1.8rem;
						display: none;
					}
					&:hover {
						.el-icon-circle-close,
						.el-icon-full-screen {
							display: block;
						}
					}
				}
			}
		}
	}
	#myPlayerBig {
		width: 100%;
		height: 500px;
		overflow: hidden;
		@include scrollbar;
	}
	#myPlayer {
		@include scrollbar;
	}
</style>
<style>
	.searchInput .el-input__inner {
		height: 34px;
		background: transparent !important;
		color: #fff;
	}
	.searchInput .el-input__icon {
		line-height: 34px;
	}
	.boxInput .el-input__inner {
		height: 20px;
		background: transparent !important;
		color: #fff;
		width: 100px;
	}
	.boxInput .el-input__icon {
		line-height: 20px;
	}
	.el-tree-node:focus > .el-tree-node__content {
		background: transparent;
		color: #5aa1ff;
	}
	.el-tree-node:hover > .el-tree-node__content {
		background: transparent;
		color: #5aa1ff;
	}
	.el-tree-node__label {
		font-size: 1.1rem;
	}
	.custom-tree-node {
		width: 100%;
		text-align: left;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>