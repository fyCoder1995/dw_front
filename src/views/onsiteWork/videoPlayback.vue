<template>
	<!-- name: '录像回放' -->
	<div class="container-box">
		<div class="search-box">
			<el-form :model="searchForm" label-width="110px">
				<el-form-item label="录像时间：">
					<el-date-picker
						v-model="searchForm.time"
						type="datetime"
						placeholder="选择日期时间"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="项目名称：" label-width="110px">
					<el-input
						placeholder="请输入项目名称"
						clearable
						v-model="searchForm.userName"
					></el-input>
				</el-form-item>
				<el-form-item label="违规行为：" label-width="110px">
					<el-input
						placeholder="请输入违规行为"
						clearable
						v-model="searchForm.userName"
					></el-input>
				</el-form-item>
				<el-form-item label="工作地点：" label-width="110px">
					<el-input
						placeholder="请输入工作地点"
						clearable
						v-model="searchForm.userName"
					></el-input>
				</el-form-item>
				<el-form-item label="部门名称：" label-width="110px">
					<el-select
						v-model="searchForm.deptName"
						placeholder="请选择部门名称"
						filterable
						clearable
					>
						<el-option
							v-for="item in deptsOption"
							:key="item.id"
							:value="item.deptName"
							:label="item.deptName"
						></el-option>
					</el-select>
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
		<div class="table-box">
			<el-select
				v-model="searchForm.deptName"
				placeholder="排序"
				class="sortClass"
				popper-class="sortPopperClass"
			>
				<el-option key="1" value="1" label="按时间"></el-option>
				<el-option key="2" value="2" label="优先展示违规视频"></el-option>
			</el-select>
			<el-table ref="dataTable" :data="playbackList" border>
				<el-table-column
					label="时间"
					prop="time"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="项目"
					prop="proName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="部门"
					prop="deptName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="地点"
					prop="place"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="违规行为"
					prop="behavior"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="操作"
					width="160px"
					header-align="center"
					align="center"
				>
					<template slot-scope="scope" class="buttonListBox">
						<div class="buttonListBox">
							<el-button
								type="text"
								@click.native.prevent="
									dialogPlayBlackVisible = true;
									playBlackId = scope.row.id;
								"
								>查看回放</el-button
							>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			title="查看回放"
			:visible.sync="dialogPlayBlackVisible"
			custom-class="addFormDialog"
			:close-on-click-modal="false"
		>
			<div slot="footer">
				<el-button @click="handleClosed">取 消</el-button>
				<el-button type="primary">确 定</el-button>
			</div>
		</el-dialog>
		<Pagination
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.pageNo"
			:limit.sync="listQuery.pageSize"
			@pagination="getData"
		/>
	</div>
</template>

<script>
import { playbackList } from './data'
import { getSysDepartmentsByUnit } from '@/api/sysMange'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			searchForm: {},
			playbackList: [],
			dialogPlayBlackVisible: false,
			total: 0,
			listQuery: {
				pageNo: 1,
				pageSize: 20
			},
			deptsOption: [],
			playBlackId: ''
		};
	},
	created() {
		this.playbackList = playbackList
		this.total = this.playbackList.length
		this.getSysDepartmentsByUnitData()
	},
	methods: {
		getData() {
			this.playbackList = playbackList
		},
		async getSysDepartmentsByUnitData(unitId) {
			const { result } = await getSysDepartmentsByUnit({ 'unitId': unitId })
			this.deptsOption = result
		},
		handleSearch() {
		},
		handleReset() {
			this.searchForm = {};
		},
		handleClosed() {
		},
	},
};
</script>

<style lang="scss" scoped>
	.container-box {
		.search-box {
			margin-bottom: 20px;
			.el-form-item {
				margin-bottom: 10px;
			}
		}
		.table-box {
			.sortClass {
				float: right;
				margin-bottom: 10px;
				height: 34px;
			}
		}
	}
</style>
<style>
	.sortClass .el-input__inner::placeholder {
		color: #ffff;
	}
  .sortClass .el-input__inner{
		color: #ffff;

  }
	.sortClass .el-input__inner {
		background: transparent;
		border: none;
		width: 100px;
	}
	.sortPopperClass {
		background-color: #2c4783;
		border: none;
		color: #fff;
	}
	.sortPopperClass .el-select-dropdown__item {
		color: #fff;
	}
	.sortPopperClass .el-select-dropdown__item.hover,
	.sortPopperClass .el-select-dropdown__item:hover {
		background: transparent;
	}
	.sortPopperClass .popper__arrow {
		display: none;
	}
	.sortPopperClass[x-placement^="bottom"] {
		margin-top: 0px;
	}
</style>