const app = {
	namespaced: true,
    state: {
		userInfo:{
			name:'金美兰花',
			accountType:4, // 企业主
		},
	},
	getters: { },
    mutations: {
		// 更新用户信息
		updateUserInfo(state,payload){
			state.userInfo=payload.userInfo;
		},
	},
    actions: {},
}

export default app;