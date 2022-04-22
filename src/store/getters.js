const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  permission_routes: state => state.permission.routes,
  permission_acitions: state => state.permission.action
}

export default getters