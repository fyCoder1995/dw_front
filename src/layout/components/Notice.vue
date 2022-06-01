<template>
	<!-- name: '通知' -->
	<el-popover placement="bottom" trigger="click">
		<div class="contentBox">
			<ul class="ulBox" v-if="contentList.length > 0">
				<li
					v-for="(item, index) in contentList"
					:key="index"
					@click="
						readMessageData(item.messageId);
						$router.push({
							path: '/views/warnMange',
						});
					"
				>
					{{ item.messageContent }}&nbsp;{{ item.messageSendTime }}
				</li>
			</ul>
			<span v-else>暂无数据</span>
		</div>
		<div class="noticeBox" slot="reference">
			<img src="@/assets/images/bell.png" alt="bell" />
			<span class="numberBox">{{ total }}</span>
		</div>
	</el-popover>
</template>

<script>
import { getUserId } from "@/utlis/auth";
import { historyMessage, readMessage } from "@/api/public";

export default {
	components: {},
	data() {
		return {
			socket: null,
			listQuery: {
				pageNo: 1,
				pageSize: 10,
			},
			total: 0,
			contentList: []
		};
	},
	created() {
		this.connectionSocket()
	},
	methods: {
		connectionSocket() {
			const _this = this
			this.socket = new WebSocket(
				"ws://47.93.240.247:8090/imserver/" + getUserId()
			);
			this.socket.onopen = function () {
				_this.socket.send("open the socket");
				_this.socket.onmessage = function (msg) {
					if (msg.data === '连接成功' || JSON.parse(msg.data).messageType === '1') {
						_this.historyMessageData()
					}
				}
			};
		},
		historyMessageData(isLazy) {
			historyMessage({ ...this.listQuery, ...{ userId: getUserId() } }).then(res => {
				this.total = res.result.total
				this.contentList = isLazy
					? [...this.contentList, ...res.result.list]
					: res.result.list;
			})
		},
		readMessageData(messageId) {
			const { result } = readMessage({ messageId })
			this.historyMessageData()
		}
	},
	mounted() {
		let listDom = document.querySelector(".contentBox");
		let isScroll = true;

		listDom.addEventListener("scroll", (v) => {
			const scrollDistance =
				listDom.scrollHeight - listDom.scrollTop < listDom.clientHeight;
			if (!scrollDistance && this.total > 10 && isScroll) {
				if (this.listQuery.pageNo >= Math.ceil(this.total / 10)) {
					this.$message.warning("没有更多数据了");
					isScroll = false;
				}
				if (this.listQuery.pageNo < Math.ceil(this.total / 10)) {
					this.listQuery.pageNo++;
					this.historyMessageData(true);
					isScroll = true;
				}
			}
		});


	}
};
</script>

<style lang="scss" scoped>
	.noticeBox {
		position: absolute;
		right: 12%;
		top: 30px;
		cursor: pointer;
		.numberBox {
			background: #ff4b30;
			width: 18px;
			height: 18px;
			border-radius: 50%;
			display: inline-block;
			position: absolute;
			right: -8px;
			top: -3px;
		}
	}
	.contentBox {
		overflow-y: auto;
		max-height: 200px;
		ul {
			li {
				font-size: 14px;
				height: 24px;
				line-height: 24px;
				cursor: pointer;
				&:hover {
					color: #ff4b30;
				}
			}
		}
	}
</style>