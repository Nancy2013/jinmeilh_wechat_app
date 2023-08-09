/**
 * @author sudong.duan
 * Date: 21-12-16
 * desc: 公共方法
 */

/**
 *判断是否为空
 *@param {String}a 变量
 *@return 是否为空
 */
const isEmpty = function (a) {
	if (a === undefined || a === 'undefined' || a === null || a === 'null' || a === '' || JSON.stringify(a) === '{}' || JSON.stringify(a) === '[]') {
		return true
	}
	return false
}


/**
 节流函数
 @param {Function} callback 回调函数
 @return
 */
const throttleFnc = function (callback) {
	let isLimit = false
	return function () {
		if (!isLimit) {
			isLimit = true
			callback.call(this, function () {
				isLimit = false
			}, ...arguments)
		}
	}
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 @return
 */
function debounce(func, wait, immediate) {
	let timer;
	return function () {
		let context = this,
			args = arguments;

		if (timer) clearTimeout(timer);
		if (immediate) {
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timer = setTimeout(() => {
				func.apply(context, args)
			}, wait)
		}
	}
}


/**
	获取链接参数
	@param {String} link 链接
	@return {String} 链接后参数数据
*/
const getLinkQuery = (link) => {
	var queryString = link.split('?')[1];
	if (queryString) {
		const queryData = {}
		queryString = queryString.split('&');
		for (var item of queryString) {
			item = item.split('=');
			queryData[item[0]] = item[1];
		}
		return queryData
	} else {
		return {}
	}
}


export {
	isEmpty,
	throttleFnc,
	debounce,
	getLinkQuery
}