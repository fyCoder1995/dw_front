import request from '@/utlis/request'

// 计划工作统计 （饼图）
export function productionPlanStatistics() {
  return request({
    url: '/control/productionPlanStatistics',
    method: 'get',
  })
}

// 当周生产计划列表
export function getProductionPlanListThatDay(data) {
  return request({
    url: '/control/getProductionPlanListThatDay',
    method: 'post',
    data
  })
}

// 待开工和已开工项目人数统计
export function projectPeopleStatistics() {
  return request({
    url: '/control/projectPeopleStatistics',
    method: 'get'
  })
}

// 待开工和已开工项目信息
export function getProjectListByType() {
  return request({
    url: '/control/getProjectListByType',
    method: 'get'
  })
}

// 告警数据
export function getWarningCount() {
  return request({
    url: '/home/getWarningCount',
    method: 'get'
  })
}
