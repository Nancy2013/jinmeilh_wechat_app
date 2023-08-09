/**
 * 获取当前路由参数
 */
export function getCurPage(){
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let curRoute = routes[routes.length - 1].route //获取当前页面路由
    let curParams = routes[routes.length - 1].options; //获取路由参数
	
	return curParams;
}

/**
 * 获取url query 参数
 * @param {Object} str url
 */
export const getQuery = (urlStr) => {
		if(urlStr){
			const url = decodeURIComponent(urlStr); // 处理特殊字符
			const str = url.substr(url.indexOf('?') + 1);	// str为？之后的参数部分字符串
			// arr每个元素都是完整的参数键值
			const arr = str.split('&')
			// result为存储参数键值的集合
			const result = {}
			for (let i = 0; i < arr.length; i++) {
			    // item的两个元素分别为参数名和参数值
			    const item = arr[i].split('=')
			    result[item[0]] = item[1]
			}
			console.log('------getQuery------',result);
			return result
		}
		
		return null;
}