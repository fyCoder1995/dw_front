<template>
	<!-- name: '用户管理' -->
	<div class="container-box">
		<div class="search-box">
			<el-form :model="searchForm" label-width="90px">
				<el-form-item label="用户名称：">
					<el-input
						placeholder="请输入用户名称"
						clearable
						v-model="searchForm.userName"
					></el-input>
				</el-form-item>
				<el-form-item label="单位名称：" label-width="110px">
					<el-select
						v-model="searchForm.organName"
						placeholder="请选择单位名称"
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
				><i class="el-icon-plus"></i>添加用户</el-button
			>
		</div>
		<div class="table-box">
			<el-table ref="dataTable" :data="tabelData" border>
				<el-table-column
					label="用户账号"
					prop="loginNumber"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="用户姓名"
					prop="userName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="所属单位"
					prop="organName"
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
					label="角色名称"
					prop="roleName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="手机号码"
					prop="mobile"
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
				<el-form-item label="用户名称：" prop="userName" label-width="110px">
					<el-input
						v-model="addForm.userName"
						placeholder="请输入用户名称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="单位名称：" prop="unitId" label-width="110px">
					<el-select
						v-model="addForm.unitId"
						placeholder="请选择单位名称"
						clearable
						@change="
							addForm.deptId = '';
							getSysDepartmentsByUnitData(addForm.unitId);
						"
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="item.id"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="部门名称："
					v-show="addForm.unitId"
					prop="deptId"
					label-width="110px"
				>
					<el-select
						v-model="addForm.deptId"
						placeholder="请选择部门名称"
						clearable
					>
						<el-option
							v-for="item in deptsOption"
							:key="item.id"
							:value="item.id"
							:label="item.deptName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色名称：" prop="roleId" label-width="110px">
					<el-select
						v-model="addForm.roleId"
						placeholder="请选择角色名称"
						clearable
					>
						<el-option
							v-for="item in rolesOption"
							:key="item.roleId"
							:value="item.roleId"
							:label="item.roleName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="登录账号：" prop="loginNumber" label-width="110px">
					<el-input
						v-model="addForm.loginNumber"
						placeholder="请输入账号"
					></el-input>
				</el-form-item>
				<el-form-item label="登录密码：" prop="password" label-width="110px">
					<el-input
						v-model="addForm.password"
						placeholder="请输入登录密码"
						show-password
					></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="mobile" label-width="110px">
					<el-input
						v-model="addForm.mobile"
						placeholder="请输入手机号码"
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
				<el-form-item label="用户名称：" prop="userName" label-width="110px">
					<el-input
						v-model="editForm.userName"
						placeholder="请输入用户名称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="单位名称：" prop="unitId" label-width="110px">
					<el-select
						v-model="editForm.unitId"
						placeholder="请选择单位名称"
						clearable
						@change="
							editForm.deptId = '';
							getSysDepartmentsByUnitData(editForm.unitId);
						"
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="item.id"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="部门名称："
					v-show="editForm.unitId"
					prop="deptId"
					label-width="110px"
				>
					<el-select
						v-model="editForm.deptId"
						placeholder="请选择部门名称"
						clearable
					>
						<el-option
							v-for="item in deptsOption"
							:key="item.id"
							:value="item.id"
							:label="item.deptName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色名称：" prop="roleId" label-width="110px">
					<el-select
						v-model="editForm.roleId"
						placeholder="请选择角色名称"
						clearable
					>
						<el-option
							v-for="item in rolesOption"
							:key="item.roleId"
							:value="String(item.roleId)"
							:label="item.roleName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="登录账号：" prop="loginNumber" label-width="110px">
					<el-input
						v-model="editForm.loginNumber"
						placeholder="请输入账号"
					></el-input>
				</el-form-item>
				<el-form-item label="登录密码：" prop="password" label-width="110px">
					<el-input
						v-model="editForm.password"
						placeholder="请输入登录密码"
						show-password
					></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="mobile" label-width="110px">
					<el-input
						v-model="editForm.mobile"
						placeholder="请输入手机号码"
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
			@pagination="getUserListData"
		/>
	</div>
</template>

<script>
import { getAllOrgan, userList, findAllRoles, getSysDepartmentsByUnit, addUser, updateUser, deleteUsers } from '@/api/sysMange'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
	data() {
		return {
			searchForm: {},
			unitsOption: [],
			dialogAddFormVisible: false,
			tabelData: [],
			dialogEditFormVisible: false,
			total: 0,
			listQuery: {
				pageNo: 1,
				pageSize: 10
			},
			addForm: {
				deptId: ''
			},
			formRules: {
				userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
				unitId: [{ required: true, message: '请选择单位名称', trigger: 'change' }],
				deptId: [{ required: true, message: '请请选择部门名称', trigger: 'change' }],
				roleId: [{ required: true, message: '请选择角色名称', trigger: 'change' }],
				mobile: [{
					required: false,
					// pattern: /^1[3456789]\d{9}$/,
					// message: "请输入正确的手机号码",
					trigger: "blur",
				}],
				loginNumber: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
			},
			rolesOption: [],
			deptsOption: [],
			editForm: { deptId: '' },
		};
	},
	created() {
		this.getAllOrganData()
		this.getUserListData(this.listQuery)
		this.getFindAllRolesData()
		this.getSysDepartmentsByUnitData()
	},
	methods: {
		async getAllOrganData() {
			const { result } = await getAllOrgan()
			this.unitsOption = result
		},
		async getUserListData(params) {
			params = arguments[0] ? arguments[0] : {}
			const { result } = await userList(params)
			this.tabelData = result.list
			this.total = result.total
		},
		async getFindAllRolesData() {
			const { result } = await findAllRoles()
			this.rolesOption = result
		},
		async getSysDepartmentsByUnitData(unitId) {
			const { result } = await getSysDepartmentsByUnit({ 'unitId': unitId })
			this.deptsOption = result
		},
		handleSearch() {
			this.listQuery.pageNo = 1
			this.getUserListData({ ...this.searchForm, ...this.listQuery });
		},
		handleReset() {
			this.searchForm = {};
			this.handleSearch();
		},
		handleDelete(obj) {
			this.$confirm('确认删除该用户？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				await deleteUsers({ 'userIds': obj.userId })
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
			this.addForm = { deptId: '' }

			this.dialogEditFormVisible = false
			if (this.$refs.editFormRef) {
				this.$refs.editFormRef.resetFields();
			}
			this.editForm = { deptId: '' }
		},
		handleAdd() {
			this.$refs.addFormRef.validate(async valid => {
				if (valid) {
					await addUser(this.addForm)
					this.dialogAddFormVisible = false
					this.$message.success('新增用户成功')
					this.handleReset()
					this.handleClosed()
				}
			})
		},
		handleEdit() {
			this.$refs.editFormRef.validate(async valid => {
				if (valid) {
					let params = {
						userId: this.editForm.userId,
						userName: this.editForm.userName,
						unitId: this.editForm.unitId,
						deptId: this.editForm.deptId,
						roleId: this.editForm.roleId,
						loginNumber: this.editForm.loginNumber,
						password: this.editForm.password,
						mobile: this.editForm.mobile,
					}
					await updateUser(params)
					this.dialogEditFormVisible = false
					this.$message.success('编辑用户成功')
					this.handleReset()
					this.handleClosed()
				}
			})
		},
	},
};
</script>

<style lang="scss" scoped>
</style>