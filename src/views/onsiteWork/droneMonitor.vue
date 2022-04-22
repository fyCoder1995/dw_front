<template>
	<!-- name: '无人机监控' -->
	<div class="container-box">
		<div class="top-box">
			<div
				:class="actNum === item.id ? 'itemClass actVideo' : 'itemClass'"
				v-for="item in droneList"
				:key="item.id"
				@click="
					currVideo = item.videoURL;
					actNum = item.id;
					currData = item.detail;
				"
			>
				<div class="videoClass">
					<img src="@/assets/images/onsite/dm-smallImg.png" alt="dm-smallImg" />
					<!-- <video :src="item.videoURL" :autoplay="false"></video> -->
				</div>
				<p>{{ item.name }}</p>
			</div>
		</div>
		<div class="bottom-box">
			<div class="bigVideo">
				<iframe :src="currVideo"></iframe>
				<p v-show="false">{{ currVideo }}</p>
				<!-- <video :src="currVideo" autoplay loop controls></video> -->
			</div>
			<div class="detailBox">
				<p><b>设备编号：</b>{{ currData.num }}</p>
				<p><b>当前项目：</b>{{ currData.curPro }}</p>
				<p><b>当前生产计划：</b>{{ currData.plan }}</p>
				<p><b>作业类型：</b>{{ currData.type }}</p>
				<p><b>当前班组：</b>{{ currData.group }}</p>
				<p><b>责任人：</b>{{ currData.person }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { droneList } from "./data";

export default {
	components: {},
	data() {
		return {
			currVideo:
				"mVlcPlayer://keyhand@show:rtmp://39.170.62.182:1935/live/livestream_1020230000000012",
			droneList: [],
			actNum: "2",
			currData: {
				num: '1d3e4g',
				curPro: '杭州至富阳城际铁路附属配套工程10kV电力管线永久回迁工程三号隧道范围PD',
				plan: '杭州至富阳城际铁路附属配套工程10kV电力管线永久回迁工程三号隧道范围（沿320国道村口路-金色年华养老公寓东侧）PD2020-11-016-QX 打水分线电缆移位、更换，电缆施工及拆搭头等。',
				type: '配电',
				group: '配网施工一队/房产小区',
				person: '王宁'
			},
		};
	},
	created() {
		this.droneList = droneList;
	},
	methods: {
	},
};
</script>

<style lang="scss" scoped>
	.container-box {
		.top-box {
			height: 180px;
			width: 100%;
			@include flex;
			padding-top: 10px;
			.itemClass {
				width: 116px;
				margin-left: 20px;
				height: 160px;
				opacity: 0.5;
				cursor: pointer;
				.videoClass {
					width: 116px;
					height: 116px;

					img {
						width: 100%;
						height: 100%;
						object-fit: fill;
						border-radius: 10px;
					}
				}
				p {
					height: 34px;
					line-height: 34px;
					font-size: 1.6rem;
				}
			}
			.actVideo {
				opacity: 1;
			}
		}
		.bottom-box {
			height: calc(100% - 260px);
			width: 100%;
			@include flex;
			.bigVideo {
				width: 50%;
				height: 100%;
				margin-left: 25%;
				iframe {
					width: 100%;
					height: 100%;
					object-fit: fill;
				}
			}
			.detailBox {
				width: 16%;
				height: 95%;
				text-align: left;
				margin-left: 1%;
				font-size: 1.4rem;
				p {
					margin-bottom: 15px;

					b {
						font-size: 1.6rem;
						font-weight: bolder;
					}
				}
			}
		}
	}
</style>