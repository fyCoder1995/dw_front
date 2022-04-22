<template>
	<!-- name: '部门管理' -->
	<div class="container-box">
		<div class="search-box">
			<el-form :model="searchForm" label-width="90px">
				<el-form-item label="单位名称：" label-width="110px">
					<el-select
						v-model="searchForm.organName"
						placeholder="请选择单位名称"
						filterable
						clearable
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="item.organName"
							:label="item.organName"
						></el-option>
					</el-select>
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
		<div class="operate-box">
			<el-button type="primary" @click="dialogAddFormVisible = true"
				><i class="el-icon-plus"></i>添加部门</el-button
			>
		</div>
		<div class="table-box">
			<el-table ref="dataTable" :data="tabelData" border>
				<el-table-column
					label="部门名称"
					prop="deptName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="单位名称"
					prop="organName"
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
									editForm = Object.assign({}, scope.row);
									dialogEditFormVisible = true;
								"
								>编辑</el-button
							>
							<span class="lineClass">|</span>
							<el-button
								type="text"
								@click.native.prevent="handleDelete(scope.row)"
								class="delbtnClass"
								>删除
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			title="新增"
			:visible.sync="dialogAddFormVisible"
			custom-class="addFormDialog"
			:close-on-click-modal="false"
		>
			<el-form :model="addForm" :rules="formRules" ref="addFormRef">
				<el-form-item label="单位名称：" prop="unitId" label-width="110px">
					<el-select
						v-model="addForm.unitId"
						placeholder="请选择单位名称"
						clearable
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="item.id"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门名称：" prop="deptName" label-width="110px">
					<el-input
						v-model="addForm.deptName"
						placeholder="请输入部门名称"
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
			title="编辑"
			:visible.sync="dialogEditFormVisible"
			custom-class="editFormDialog"
			:close-on-click-modal="false"
		>
			<el-form :model="editForm" :rules="formRules" ref="editFormRef">
				<el-form-item label="单位名称：" prop="unitId" label-width="110px">
					<el-select
						v-model="editForm.unitId"
						placeholder="请选择单位名称"
						clearable
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="item.id"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门名称：" prop="deptName" label-width="110px">
					<el-input
						v-model="editForm.deptName"
						placeholder="请输入部门名称"
						clearable
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="handleClosed">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</div>
		</el-dialog>
		<Pagination
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.pageNo"
			:limit.sync="listQuery.pageSize"
			@pagination="getSysDepartmentListPageData"
		/>
	</div>
</template>

<script>
import { getAllOrgan, getSysDepartmentList, getSysDepartmentListPage, insertDept, updateDepartment, deleteDepartment } from '@/api/sysMange'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			searchForm: {},
			unitsOption: [],
			deptsOption: [],
			dialogAddFormVisible: false,
			tabelData: [],
			dialogEditFormVisible: false,
			total: 0,
			listQuery: {
				pageNo: 1,
				pageSize: 10
			},
			addForm: {},
			formRules: {
				deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
				unitId: [{ required: true, message: '请选择单位名称', trigger: 'change' }],
			},
			editForm: {},
		};
	},
	created() {
		this.getAllOrganData()
		this.getSysDepartmentListData()
		this.getSysDepartmentListPageData(this.listQuery)
	},
	methods: {
		async getAllOrganData() {
			const { result } = await getAllOrgan()
			this.unitsOption = result
		},
		async getSysDepartmentListData() {
			const { result } = await getSysDepartmentList()
			this.deptsOption = result
		},
		async getSysDepartmentListPageData(params) {
			params = arguments[0] ? arguments[0] : {}
			const { result } = await getSysDepartmentListPage(params)
			this.tabelData = result.list
			this.total = result.total
		},
		handleSearch() {
			this.listQuery.pageNo = 1
			this.getSysDepartmentListPageData({ ...this.searchForm, ...this.listQuery });
		},
		handleReset() {
			this.searchForm = {};
			this.handleSearch();
		},
		handleDelete(obj) {
			this.$confirm('确认删除该部门？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				await deleteDepartment({ 'id': obj.id })
				this.$message.success('删除成功')
				this.handleReset()
			}).catch(() => {
				this.$message.info('已取消删除')
			})
		},
		handleClosed() {
			this.dialogAddFormVisible = false
			if (this.$refs.addFormRef) {
				this.$refs.addFormRef.resetFields();
			}
			this.addForm = {}

			this.dialogEditFormVisible = false
			if (this.$refs.editFormRef) {
				this.$refs.editFormRef.resetFields();
			}
			this.editForm = {}
		},
		handleAdd() {
			this.$refs.addFormRef.validate(async valid => {
				if (valid) {
					await insertDept(this.addForm)
					this.dialogAddFormVisible = false
					this.$message.success('新增部门成功')
					this.handleReset()
					this.handleClosed()
				}
			})
		},
		handleEdit() {
			this.$refs.editFormRef.validate(async valid => {
				if (valid) {
					let params = {
						id: this.editForm.id,
						deptName: this.editForm.deptName,
						unitId: this.editForm.unitId
					}
					await updateDepartment(params)
					this.dialogEditFormVisible = false
					this.$message.success('编辑部门成功')
					this.handleReset()
					this.handleClosed()
				}
			})
		}
	},
};
</script>

<style lang="scss" scoped>
</style>