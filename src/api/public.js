import request from '@/utlis/request'

// 生命体征（手环）列表 分页
export function getApexrest(data) {
  return request({
    url: '/services/getApexrest',
    method: 'post',
    data
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


