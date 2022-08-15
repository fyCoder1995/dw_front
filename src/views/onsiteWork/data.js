// 树列表
export const treeList = [{
  name: '浙江大有实业有限公司',
  childrenList: [{
    name: '配电工程分公司',
    id: '1',
    childrenList: [{
      name: '单兵1',
      id: '1-1'
    }, {
      name: '单兵2',
      id: '1-2'
    }],
  },
    // {
    //   name: '配电工程分公司',
    //   id: '1-2',
    //   childrenList: [{
    //     name: '单兵1',
    //     id: '1-2-1'
    //   }, {
    //     name: '单兵2',
    //     id: '1-2-2'
    //   }, {
    //     name: '单兵3',
    //     id: '1-2-3'
    //   }, {
    //     name: '单兵4',
    //     id: '1-2-4'
    //   }, {
    //     name: '单兵5',
    //     id: '1-2-5'
    //   }, {
    //     name: '单兵6',
    //     id: '1-2-6'
    //   }, {
    //     name: '单兵7',
    //     id: '1-2-7'
    //   }, {
    //     name: '单兵8',
    //     id: '1-2-8'
    //   }, {
    //     name: '单兵9',
    //     id: '1-2-9'
    //   }],
    // }
  ]
}]

// 现场监控列表
export const onsiteList = [
  { id: '1-1', videoURL: 'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4' },
  { id: '1-2-1', videoURL: 'http://47.93.240.247:8080/ftp/video/onsiteVideo2.mp4' },
  { id: '1-2-2', imgURL: require('@/assets/images/onsite/onsiteVideo1.jpeg') },
  { id: '1-2-3', imgURL: require('@/assets/images/onsite/onsiteVideo2.png') },
  { id: '1-2-4', imgURL: require('@/assets/images/onsite/onsiteVideo3.png') },
  { id: '1-2-5', imgURL: require('@/assets/images/onsite/onsiteVideo4.jpeg') },
  { id: '1-2-6', imgURL: require('@/assets/images/onsite/onsiteVideo5.jpg') },
  { id: '1-2-7', imgURL: require('@/assets/images/onsite/onsiteVideo6.jpg') },
  { id: '1-2-8', imgURL: require('@/assets/images/onsite/onsiteVideo7.jpg') },
  { id: '1-2-9', imgURL: require('@/assets/images/onsite/onsiteVideo8.png') },
  { id: '11', imgURL: require('@/assets/images/onsite/onsiteVideo8.png') },
]

// 现场监控九个摄像头
export const cameraList = [
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo2.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4',
  'http://47.93.240.247:8080/ftp/video/onsiteVideo1.mp4'
]

// 无人机列表
export const droneList = [
  {
    id: '1', name: '无人机1', videoURL: 'mVlcPlayer://keyhand@show:rtmp://39.170.62.182:1935/live/livestream_1020230000000012',
    detail: {
      num: '001',
      curPro: '杭州绕城高速西湖服务区新设杆上施工变工程',
      plan: '观潮路工程10KV电力架空线迁改（御道分线14#-16#工程新装十字横担2付，新放架空线至御道分线10#杆、19#杆',
      type: '配电',
      group: '试验队',
      person: '周亮'
    }
  },
  {
    id: '2', name: '无人机2', videoURL: 'mVlcPlayer://keyhand@show:rtmp://39.170.62.182:1935/live/livestream_1020230000000013',
    detail: {
      num: '002',
      curPro: '杭州绕城高速西湖服务区新设杆上施工变工程',
      plan: '观潮路工程10KV电力架空线迁改（御道分线14#-16#工程新装十字横担2付，新放架空线至御道分线10#杆、19#杆',
      type: '配电',
      group: '试验队',
      person: '周亮'
    }
  }
  // {
  //   id: '2', name: '无人机2', videoURL: 'http://47.93.240.247:8080/ftp/video/droneVideo2.mp4',
  //   detail: {
  //     num: '002',
  //     curPro: '杭州绕城高速西湖服务区新设杆上施工变工程',
  //     plan: '观潮路工程10KV电力架空线迁改（御道分线14#-16#工程新装十字横担2付，新放架空线至御道分线10#杆、19#杆',
  //     type: '配电',
  //     group: '试验队',
  //     person: '周亮'
  //   }
  // },
  // {
  //   id: '3', name: '无人机3', videoURL: 'http://47.93.240.247:8080/ftp/video/droneVideo3.mp4',
  //   detail: {
  //     num: '003',
  //     curPro: '杭州绕城高速西湖服务区新设杆上施工变工程',
  //     plan: '观潮路工程10KV电力架空线迁改（御道分线14#-16#工程新装十字横担2付，新放架空线至御道分线10#杆、19#杆',
  //     type: '配电',
  //     group: '试验队',
  //     person: '周亮'
  //   }
  // },
]

export const playbackList = [
  { time: '2021.10.03', proName: '地铁7号线城站站-江城路站区间电力管线…', deptName: '项目部，研发部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.10.02', proName: '拱墅区基础设施建中心临丁路', deptName: '移动基站安装部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.28', proName: '地下空间雷达站农寓分线400KVA', deptName: '实施部门', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.24', proName: '地铁6号线横河港桥10kV电力迁改工程', deptName: '空开安装实施', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.21', proName: '西广站新设T接箱工程', deptName: '轨道实施', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.18', proName: '背街小巷之开元路西段，将军路，柳营路…', deptName: '实施部门', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.12', proName: '滨江分公司2021年用电信息采集终端…', deptName: '电焊部门', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '2021年西湖供电分公司西溪供电所第二…', deptName: '测试部门3-2', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '杭州滨江2021年10kV长镇6277线……', deptName: '安监部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '钱塘新区运河二通道桥土建管线迁改工程', deptName: '工程部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '益乐新村北区乐村站网架优化配套通信工程', deptName: '项目部，研发部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '华润新鸿基房地产公司变配电工程', deptName: '项目部，研发部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '杭州水务原水有限公司大毛坞-仁和大道供…', deptName: '项目部，研发部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
  { time: '2021.09.03', proName: '葛洲坝中国府小区国府环网室配套通信工程', deptName: '项目部，研发部', place: '杭州市 江干区 ##街道 ##路', behavior: '未佩戴头盔' },
]