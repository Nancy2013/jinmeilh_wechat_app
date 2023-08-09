const http = (config) => {
	const header={Authorization:'24dbcfc8-9be9-469d-b99f-cd3001935b50'};
	return new Promise((resolve, reject) => {
		const options = {
			url: config.url,
			method: config.method || 'GET',
			data: config.data || {},
			header: {...header,...config.header} || header,
			success: res => {
				if (res.statusCode === 200) {
					
					if(res.data.code === 200) {
						resolve(res.data)
					} else {
						reject(res.data)
					}
				} else {
					reject()
				}
			},
			fail: err => {
				reject(err)
			}
		}
		uni.request(options)
	})
}

export default function(config) {
	return http(config).catch(err => {
		if (err.statusCode === 404) {
			uni.showToast({
				title: "请求资源不存在",
				icon: "none"
			})
		} else if (err.statusCode === 500) {
			uni.showToast({
				title: "服务器内部错误",
				icon: "none"
			})
		} else {
			if(err.msg) {
				uni.showToast({
					title: err.msg,
					icon: "none"
				})
			} else {
				uni.showToast({
					title: `网络请求失败${err.errMsg ? '('+err.errMsg+')' : '' }`,
					icon: "none"
				})
			}
		} 
	})
}
