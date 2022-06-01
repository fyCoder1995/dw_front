import request from '@/utlis/request'

// 生命体征（手环）列表 分页
export function getApexrest(data) {
  return request({
    url: '/services/getApexrest',
    method: 'post',
    data
  })
}

// 获取历史消息数据
export function historyMessage(params) {
  return request({
    url: '/message/historyMessage',
    method: 'get',
    params
  })
}

// 点击已读
export function readMessage(params) {
  return request({
    url: '/message/readMessage',
    method: 'get',
    params
  })
}

// 项目列表（下拉）
export function getProjectNameList(params) {
  return request({
    url: '/control/getProjectNameList',
    method: 'get',
    params
  })
}

// 查询所有菜单路由
export function getUserRouters(params) {
  return request({
    url: '/menu/getUserRouters',
    method: 'get',
    params
  })
}

