<template>
	<!-- name: '修改弹窗' -->
	<div class="popEditBox">
		<el-dialog
			:title="title + '警戒值设置'"
			:visible.sync="curDialogVisible"
			custom-class="popEditDialog"
			@closed="handleClosed()"
		>
			<el-input clearable v-model="curData"></el-input>
			<div slot="footer">
				<el-button @click="handleClosed">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { updatevalue } from '@/api/warnMange'
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		valueName: {
			type: String,
			default: ''
		},
		dialogVisible: {
			type: Boolean,
			default: false
		},
		editData: {
			type: String,
			default: ''
		}
	},
	watch: {
		dialogVisible: function () {
			this.curDialogVisible = this.dialogVisible
		},
		editData: function () {
			this.curData = this.editData
		}
	},
	components: {},
	data() {
		return {
			curDialogVisible: false,
			curData: ''
		};
	},
	methods: {
		handleClosed() {
			this.$emit('setShowEdit')
		},
		async handleEdit() {
			let params = {}
			params[`${this.valueName}`] = this.curData
			params.id = 1
			const { statusCode, message } = await updatevalue(params)
			if (statusCode === '200') {
				this.$message.success(message)
				this.$emit('setShowEdit')
			} else {
				this.$message.error(message)
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	.otherBox {
		h3 {
			height: 32px;
			border-left: 4px solid #408bc7;
			color: #408bc7;
			margin-bottom: 10px;
			line-height: 32px;
			padding-left: 10px;
		}
		p {
			margin-bottom: 20px;
			font-size: 14px;
		}
	}
</style>