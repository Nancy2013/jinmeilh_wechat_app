const app = {
	namespaced: true,
    state: {
		userInfo:{
			name:'金美兰花',
			roleFlag:0,
		},
	},
	getters: { },
    mutations: {
		// 更新用户信息
		updateUserInfo(state,payload){
			console.log('-----updateUserInfo---',payload);
			state.userInfo=Object.assign({},state.userInfo,payload.userInfo);
		},
	},
    actions: {},
}

export default app;