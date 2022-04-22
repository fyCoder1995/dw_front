// 手环定位离岗告警
export const leaveList = [
  { time: '15:31:01', name: '工作负责人离岗', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '工作负责人离岗', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '外来人员闯入', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '未佩戴安全帽', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '未佩戴安全帽', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '未佩戴安全帽', userName: '章北海', place: '1#2#02' },
]

// 未来24小时天气
export const weatherList = [
  { time: '10:00', icon: 'sun' },
  { time: '11:00', icon: 'rain' },
  { time: '12:00', icon: 'cloud' },
  { time: '13:00', icon: 'cloud' },
  { time: '14:00', icon: 'rain' },
  { time: '15:00', icon: 'sun' },
  { time: '16:00', icon: 'sun' },
  { time: '17:00', icon: 'sun' },
  { time: '18:00', icon: 'sun' },
  { time: '19:00', icon: 'sun' },
  { time: '20:00', icon: 'sun' },
  { time: '21:00', icon: 'sun' },
  { time: '22:00', icon: 'sun' },
  { time: '23:00', icon: 'sun' },
  { time: '00:00', icon: 'sun' },
  { time: '1:00', icon: 'sun' },
  { time: '2:00', icon: 'sun' },
  { time: '3:00', icon: 'sun' },
  { time: '4:00', icon: 'sun' },
  { time: '5:00', icon: 'rain' },
  { time: '6:00', icon: 'rain' },
  { time: '7:00', icon: 'rain' },
  { time: '8:00', icon: 'cloud' },
  { time: '9:00', icon: 'cloud' },
]

// 电子围栏越界监测
export const monitoringList = [
  { time: '08:03:01', name: '电子围栏被移动', place: '1#2#02' },
  { time: '09:31:23', name: '电子围栏被遮挡', place: '1#2#02' },
  { time: '15:31:01', name: '电子围栏倾倒', place: '1#2#02' },
  { time: '15:31:01', name: '外来人员违规闯入', place: '1#2#02' },
  { time: '15:31:01', name: '外来人员违规闯入', place: '1#2#02' },
  { time: '15:31:01', name: '外来人员违规闯入', place: '1#2#02' },
  { time: '15:31:01', name: '外来人员违规闯入', place: '1#2#02' },
]


// 作业人员生命体征告警数据
export const signsList = [
  { time: '15:31:01', name: '心率异常', status: '过高', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '血压异常', status: '过低', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '体温异常', status: '过高', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '体温异常', status: '过高', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '心率异常', status: '过高', userName: '章北海', place: '1#2#02' },
  { time: '15:31:01', name: '心率异常', status: '过高', userName: '章北海', place: '1#2#02' },
]

// 为佩戴安全帽告警
export const warnImgList = [
  { id: '1', imgURL: require('@/assets/images/warnImg1.jpg') },
  { id: '2', imgURL: require('@/assets/images/warnImg2.jpg') },
  { id: '3', imgURL: require('@/assets/images/warnImg3.jpg') },
  { id: '4', imgURL: require('@/assets/images/warnImg4.png') },
  // { id: '5', imgURL: require('@/assets/images/warnImg5.png') },
  // { id: '6', imgURL: require('@/assets/images/warnImg6.png') },
  { id: '7', imgURL: require('@/assets/images/warnImg7.png') },
  { id: '8', imgURL: require('@/assets/images/warnImg8.png') }
]