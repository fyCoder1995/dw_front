import request from '@/utlis/request'
// 单位下拉
export function getAllOrgan() {
  return request({
    url: '/organization/getAllOrgan',
    method: 'get'
  })
}

// 部门下拉
export function getSysDepartmentList() {
  return request({
    url: '/sysDepartment/getSysDepartmentList',
    method: 'get'
  })
}

// 角色下拉
export function findAllRoles() {
  return request({
    url: '/role/findAllRoles',
    method: 'get'
  })
}

// 用户列表
export function userList(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data
  })
}

// 用户新增
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

// 用户编辑
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

// 用户删除/批量删除
export function deleteUsers(params) {
  return request({
    url: '/user/deleteUsers',
    method: 'get',
    params
  })
}

// 角色列表
export function roleList(data) {
  return request({
    url: '/role/roleList',
    method: 'post',
    data
  })
}

// 角色新增
export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

// 角色编辑
export function updateRole(data) {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data
  })
}

// 角色删除
export function deleteRoles(params) {
  return request({
    url: '/role/deleteRoles',
    method: 'get',
    params
  })
}

// 菜单

// 单位列表
export function getOrganizationListPage(data) {
  return request({
    url: '/organization/getOrganizationListPage',
    method: 'post',
    data
  })
}

// 单位新增
export function insertOrganization(data) {
  return request({
    url: '/organization/insertOrganization',
    method: 'post',
    data
  })
}

// 单位编辑
export function updateSysOrganization(data) {
  return request({
    url: '/organization/updateSysOrganization',
    method: 'post',
    data
  })
}

// 单位删除
export function deleteSysOrganization(params) {
  return request({
    url: '/organization/deleteSysOrganization',
    method: 'get',
    params
  })
}

// 部门列表
export function getSysDepartmentListPage(data) {
  return request({
    url: '/sysDepartment/getSysDepartmentListPage',
    method: 'post',
    data
  })
}

// 部门新增
export function insertDept(data) {
  return request({
    url: '/sysDepartment/insert',
    method: 'post',
    data
  })
}

// 部门编辑
export function updateDepartment(data) {
  return request({
    url: '/sysDepartment/updateDepartment',
    method: 'post',
    data
  })
}

// 部门删除
export function deleteDepartment(params) {
  return request({
    url: '/sysDepartment/deleteDepartment',
    method: 'get',
    params
  })
}

// 根据单位下拉
export function getSysDepartmentsByUnit(params) {
  return request({
    url: '/sysDepartment/getSysDepartmentsByUnit',
    method: 'get',
    params
  })
}