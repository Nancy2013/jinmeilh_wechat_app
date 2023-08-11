let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
    BASE_URL = "https://xi.cn88555.com/api" // 开发环境
} else {
    BASE_URL = '/api' // 生产环境
}
const config = {
	base_url: BASE_URL,
}

export { config }