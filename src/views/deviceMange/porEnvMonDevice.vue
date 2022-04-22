<template>
	<!-- name: '便携式环境监测设备' -->
	<div class="container-box">
		<div class="search-box">
			<el-form :model="searchForm" label-width="90px">
				<el-form-item label="设备名称：">
					<el-input
						placeholder="请输入设备名称"
						clearable
						v-model="searchForm.deviceName"
					></el-input>
				</el-form-item>
				<el-form-item label="单位名称：" label-width="110px">
					<el-select
						v-model="searchForm.organizationId"
						placeholder="请选择单位名称"
						popper-class="projectPopClass"
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
				<el-form-item label="项目名称：" label-width="110px">
					<el-select
						v-model="searchForm.projectName"
						filterable
						placeholder="请输入或选择项目"
						clearable
						popper-class="projectPopClass"
						v-el-select-loadmore="loadmore"
						:remote-method="remoteMethod"
						remote
						@clear="handleProListClear"
					>
						<el-option
							v-for="item in projectList"
							:key="item.projectNumber"
							:value="item.projectName"
							:label="item.projectName"
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
				><i class="el-icon-plus"></i>添加设备</el-button
			>
		</div>
		<div class="table-box">
			<p class="batchDelClass">
				已选择<span>{{ selectTotal }}</span
				>项
				<el-button type="text" @click="handleDelete">清空</el-button>
			</p>
			<el-table
				ref="dataTable"
				:data="tabelData"
				border
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"> </el-table-column>

				<el-table-column
					label="项目名称"
					prop="projectName"
					header-align="center"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					label="设备名称"
					prop="deviceName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="用户名称"
					prop="userName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="所属单位"
					prop="organizationName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="所属部门"
					prop="epartmentName"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="单位电话"
					prop="phone"
					header-align="center"
					align="center"
				></el-table-column>
				<el-table-column
					label="设备编号"
					prop="deviceNumber"
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
									getSysDepartmentsByUnitData(editForm.organizationId);
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
				<el-form-item
					label="项目名称："
					prop="projectNumber"
					label-width="110px"
				>
					<el-select
						v-model="addForm.projectName"
						filterable
						placeholder="请输入或选择项目"
						clearable
						v-el-select-loadmore="loadmore"
						@change="handleProjectChange"
						:remote-method="remoteMethod"
						remote
						@clear="handleProListClear"
					>
						<el-option
							v-for="item in projectList"
							:key="item.projectNumber"
							:value="{ id: item.projectNumber, name: item.projectName }"
							:label="item.projectName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备名称：" prop="deviceName" label-width="110px">
					<el-input
						v-model="addForm.deviceName"
						placeholder="请输入设备名称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item
					label="单位名称："
					prop="organizationId"
					label-width="110px"
				>
					<el-select
						v-model="addForm.organizationName"
						value-key="id"
						placeholder="请选择单位名称"
						clearable
						@change="handleOrganChange"
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="{ id: item.id, name: item.organName }"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="部门名称："
					v-show="addForm.organizationId"
					prop="epartmentId"
					label-width="110px"
				>
					<el-select
						v-model="addForm.epartmentName"
						placeholder="请选择部门名称"
						clearable
						@change="handleDeptChange"
						value-key="id"
					>
						<el-option
							v-for="item in deptsOption"
							:key="item.id"
							:value="{ id: item.id, name: item.deptName }"
							:label="item.deptName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="用户名称："
					v-show="addForm.organizationId && addForm.epartmentId"
					prop="userId"
					label-width="110px"
				>
					<el-select
						v-model="addForm.userName"
						placeholder="请选择用户名称"
						clearable
						@change="handleUserChange"
						value-key="id"
					>
						<el-option
							v-for="item in usersOption"
							:key="item.id"
							:value="{ id: item.userId, name: item.userName }"
							:label="item.userName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="设备编号："
					prop="deviceNumber"
					label-width="110px"
				>
					<el-input
						v-model="addForm.deviceNumber"
						placeholder="请输入设备编号"
					></el-input>
				</el-form-item>
				<el-form-item label="单位电话：" prop="phone" label-width="110px">
					<el-input
						v-model="addForm.phone"
						placeholder="请输入单位电话"
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
				<el-form-item
					label="项目名称："
					prop="projectNumber"
					label-width="110px"
				>
					<el-select
						v-model="editForm.projectName"
						filterable
						placeholder="请输入或选择项目"
						clearable
						v-el-select-loadmore="loadmore"
						@change="handleProjectChangeEdit"
						:remote-method="remoteMethod"
						remote
						@clear="handleProListClear"
					>
						<el-option
							v-for="item in projectList"
							:key="item.projectNumber"
							:value="{ id: item.projectNumber, name: item.projectName }"
							:label="item.projectName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="设备名称：" prop="deviceName" label-width="110px">
					<el-input
						v-model="editForm.deviceName"
						placeholder="请输入设备名称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item
					label="单位名称："
					prop="organizationId"
					label-width="110px"
				>
					<el-select
						v-model="editForm.organizationName"
						placeholder="请选择单位名称"
						clearable
						@change="handleOrganChangeEdit"
						value-key="id"
					>
						<el-option
							v-for="item in unitsOption"
							:key="item.id"
							:value="{ id: item.id, name: item.organName }"
							:label="item.organName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="部门名称："
					v-show="editForm.organizationId"
					prop="epartmentId"
					label-width="110px"
					value-key="id"
				>
					<el-select
						v-model="editForm.epartmentName"
						placeholder="请选择部门名称"
						clearable
						@change="handleDeptChangeEdit"
					>
						<el-option
							v-for="item in deptsOption"
							:key="item.id"
							:value="{ id: item.id, name: item.deptName }"
							:label="item.deptName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="用户名称："
					v-show="editForm.organizationId && editForm.epartmentId"
					prop="userId"
					label-width="110px"
				>
					<el-select
						v-model="editForm.userName"
						placeholder="请选择用户名称"
						clearable
						@change="handleUserChangeEdit"
						value-key="id"
					>
						<el-option
							v-for="item in usersOption"
							:key="item.id"
							:value="{ id: item.userId, name: item.userName }"
							:label="item.userName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="设备编号："
					prop="deviceNumber"
					label-width="110px"
				>
					<el-input
						v-model="editForm.deviceNumber"
						placeholder="请输入设备编号"
					></el-input>
				</el-form-item>
				<el-form-item label="单位电话：" prop="phone" label-width="110px">
					<el-input
						v-model="editForm.phone"
						placeholder="请输入单位电话"
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
			@pagination="getgetDeviceData"
		/>
	</div>
</template>

<script>
import { getAllOrgan, getSysDepartmentsByUnit } from '@/api/sysMange'
import { getDevice, insertDevice, updateDevice, deleteDevice, getUserListAll } from '@/api/deviceMange'
import { getProjectNameList } from '@/api/public'
import Pagination from '@/components/Pagination'
export default {
	components: { Pagination },
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
			searchForm: {},
			unitsOption: [],
			dialogAddFormVisible: false,
			tabelData: [],
			dialogEditFormVisible: false,
			total: 0,
			listQuery: {
				pageNo: 1,
				pageSize: 10,
				type: 3,
			},
			addForm: {
				type: 3,
				epartmentName: '',
				epartmentId: '',
				userId: '',
				userName: '',
				projectNumber: '',
				projectName: '',
				organizationId: ''
			},
			formRules: {
				projectNumber: [{ required: true, message: '请输入或选择项目', trigger: 'change' }],
				deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
				organizationId: [{ required: false, message: '请选择单位名称', trigger: 'change' }],
				epartmentId: [{ required: false, message: '请请选择部门名称', trigger: 'change' }],
				userId: [{ required: false, message: '请请选择用户名称', trigger: 'change' }],
				phone: [{
					required: false,
					// pattern: /^1[3456789]\d{9}$/,
					// message: "请输入正确的手机号码",
					trigger: "blur",
				}],
				deviceNumber: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
			},
			deptsOption: [],
			usersOption: [],
			editForm: {
				type: 3,
				epartmentName: '',
				epartmentId: '',
				userId: '',
				userName: '',
				projectNumber: '',
				projectName: '',
				organizationId: ''
			},
			selectTotal: 0,
			userIds: '',
			projectList: [],
			proListQuery: {
				pageNo: 1,
				pageSize: 10,
				projectName: ''
			},
		};
	},
	created() {
		this.getAllOrganData()
		this.getgetDeviceData(this.listQuery)
		this.getProjectNameListData()
	},
	methods: {
		async getAllOrganData() {
			const { result } = await getAllOrgan()
			this.unitsOption = result
		},
		async getgetDeviceData(params) {
			params = arguments[0] ? arguments[0] : {}
			const { result } = await getDevice(params)
			this.tabelData = result.list
			this.total = result.total
		},
		async getSysDepartmentsByUnitData(unitId) {
			const { result } = await getSysDepartmentsByUnit({ 'unitId': unitId })
			this.deptsOption = result
		},
		async getUserListAllData(deptId, organId) {
			const { result } = await getUserListAll({ 'deptId': deptId, 'organId': organId })
			this.usersOption = result
		},
		handleSearch() {
			this.listQuery.pageNo = 1
			this.getgetDeviceData({ ...this.searchForm, ...this.listQuery });
		},
		handleReset() {
			this.searchForm = {};
			this.handleSearch();
		},
		handleDelete(obj) {
			this.$confirm('确认删除该设备？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				let params = obj.id ? obj.id : this.userIds
				await deleteDevice({ 'userIds': params })
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
			this.addForm = {
				type: 3
			}
			this.dialogEditFormVisible = false
			if (this.$refs.editFormRef) {
				this.$refs.editFormRef.resetFields();
			}
			this.editForm = {
				type: 3
			}
		},
		handleAdd() {
			this.$refs.addFormRef.validate(async valid => {
				if (valid) {
					const { statusCode, message } = await insertDevice(this.addForm)
					if (statusCode === '200') {
						this.dialogAddFormVisible = false
						this.$message.success('新增设备成功')
						this.handleReset()
						this.handleClosed()
					} else {
						this.$message.error(message)
					}
				}
			})
		},
		handleEdit() {
			this.$refs.editFormRef.validate(async valid => {
				if (valid) {
					let params = {
						type: 3,
						id: this.editForm.id,
						deviceName: this.editForm.deviceName,
						organizationId: this.editForm.organizationId,
						epartmentId: this.editForm.epartmentId,
						deviceNumber: this.editForm.deviceNumber,
						phone: this.editForm.phone,
						userId: this.editForm.userId,
						userName: this.editForm.userName,
						projectNumber: this.editForm.projectNumber,
						projectName: this.editForm.projectName,

					}
					const { statusCode, message } = await updateDevice(params)
					if (statusCode === '200') {
						this.dialogEditFormVisible = false
						this.$message.success('编辑设备成功')
						this.handleReset()
						this.handleClosed()
					} else {
						this.$message.error(message)
					}
				}
			})
		},
		handleSelectionChange(val) {
			this.selectTotal = val.length
			this.userIds = val.map(item => {
				return item.id
			}).join(',')
		},
		handleOrganChange(obj) {
			this.addForm.organizationId = obj.id
			this.addForm.organizationName = obj.name
			this.addForm.epartmentId = '';
			this.addForm.epartmentName = '';
			this.getSysDepartmentsByUnitData(this.addForm.organizationId);
		},
		handleDeptChange(obj) {
			this.addForm.epartmentId = obj.id
			this.addForm.epartmentName = obj.name
			this.getUserListAllData(this.addForm.epartmentId, this.addForm.organizationId);
		},
		handleUserChange(obj) {
			this.addForm.userId = obj.id
			this.addForm.userName = obj.name
		},
		handleProjectChange(obj) {
			this.addForm.projectNumber = obj.id
			this.addForm.projectName = obj.name
		},
		handleProjectChangeEdit(obj) {
			this.editForm.projectNumber = obj.id
			this.editForm.projectName = obj.name
		},
		handleOrganChangeEdit(obj) {
			this.editForm.organizationId = obj.id
			this.editForm.organizationName = obj.name
			this.editForm.epartmentId = '';
			this.editForm.epartmentName = '';
			this.getSysDepartmentsByUnitData(this.editForm.organizationId);
		},
		handleDeptChangeEdit(obj) {
			this.editForm.epartmentId = obj.id
			this.editForm.epartmentName = obj.name
			this.editForm.userId = ''
			this.editForm.userName = ''
			this.getUserListAllData(this.editForm.epartmentId, this.editForm.organizationId);
		},
		handleUserChangeEdit(obj) {
			this.editForm.userId = obj.id
			this.editForm.userName = obj.name
		},
		async getProjectNameListData(isLazy) {
			const { result } = await getProjectNameList(this.proListQuery)
			this.projectList = isLazy
				? [...this.projectList, ...result.list]
				: result.list;
		},
		loadmore() {
			this.proListQuery.pageNo++
			this.getProjectNameListData(true)
		},
		remoteMethod(query) {
			this.proListQuery = {
				pageNo: 1,
				pageSize: 10,
				projectName: query
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
		}
	},
};
</script>

<style lang="scss" scoped>
	.operate-box {
		margin-bottom: 0px;
		margin-top: 15px !important;
	}
	.batchDelClass {
		font-size: 1.6rem;
		height: 45px;
		line-height: 45px;
		color: #fff;
		text-align: left;
		span {
			margin: 0px 10px;
			color: #ff7c19;
		}
		.el-button {
			color: #ff7c19;
			font-size: 1.6rem;
		}
	}
	.btn {
		margin-top: 20px;
	}
</style>