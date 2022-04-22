
<template>
	<!--分页组件-->
	<div class="pagination-container">
		<transition name="fade-transform" mode="out-in">
			<el-pagination
				layout="total, prev, pager, next,sizes"
				:current-page.sync="currentPage"
				:page-size.sync="size"
				:page-sizes="sizes"
				:total="total"
				v-bind="$attrs"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		total: {
			required: true,
			type: Number
		},
		page: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 10
		},
		sizes: {
			type: Array,
			default() {
				return [10, 20, 30, 50]
			}
		},
		layout: {
			type: String,
			default: 'pager,slot'
		},
	},
	data() {
		return {
			goPage: 1, //跳转页数
			startPage: 1, //首页
		}
	},
	computed: {
		currentPage: {
			get() {
				return this.page
			},
			set(val) {
				this.goPage = val
				this.$emit('update:page', val)
			}
		},
		size: {
			get() {
				return this.limit
			},
			set(val) {
				this.$emit('update:limit', val)
			}
		},
		endPage: {
			get() {
				return Math.ceil(this.total / this.limit)
			}
		},
		jumpPage() {
			if (this.goPage > this.endPage) {
				return this.endPage
			}

			if (isNaN(this.goPage) || this.goPage <= 0) {
				this.goPage = 1
				return this.goPage
			}

			return this.goPage
		}
	},
	methods: {
		handleSizeChange(val) {
			this.$emit('pagination', { pageNo: this.currentPage, pageSize: val })
		},
		handleCurrentChange(val) {
			this.$emit('pagination', { pageNo: val, pageSize: this.size })
		},
		toFirstPage() {
			this.currentPage = 1
			this.handleCurrentChange(this.currentPage)
		},
		toEndPage() {
			this.currentPage = this.endPage
			this.handleCurrentChange(this.currentPage)
		},
		toGoPage() {
			this.currentPage = this.jumpPage
			this.handleCurrentChange(this.currentPage)
		}
	}
}
</script>

<style lang="scss" scoped>
	.pagination-container {
		margin-top: 10px;
		@include flex-row-right;
		margin-right: 20px;
	}
</style>
<style>
	.el-pagination {
		color: #fff;
	}
	.el-pagination .el-pagination__total {
		color: #fff;
		font-size: 1.4rem !important;
	}
	.el-pagination .btn-prev,
	.el-pagination button:disabled {
		background-color: transparent;
		font-size: 1.4rem !important;
	}
	.el-pagination .btn-prev,
	.el-pagination .btn-next {
		background-color: transparent;
		color: #fff;
	}
	.el-pagination .el-pager li {
		width: 24px;
		min-width: 24px;
		height: 24px;
		line-height: 24px;
		border-radius: 4px;
		padding: 0;
		background: transparent;
		border: 1px solid #1890ff;
		font-size: 1.4rem !important;
		margin-right: 5px;
	}
	.el-pagination .el-pagination__sizes,
	.el-pagination .el-select,
	.el-pagination .el-input--mini .el-input__inner {
		height: 24px !important;
		line-height: 24px !important;
		color: #fff;
		background-color: transparent;
		font-size: 1.4rem;
	}
	.el-pagination .el-pager li.active + li {
		border-left: 1px solid #1890ff;
	}
</style>
