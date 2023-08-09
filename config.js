let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
    BASE_URL = {
		base:"http://192.168.110.129:8090",
		node:"http://192.168.110.129:8081",
		ecommerce:"http://192.168.110.129:8066",
	} // 开发环境
} else {
    BASE_URL = '' // 生产环境
}
const config = {
	base_url: BASE_URL,
}

export { config }