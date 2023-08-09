import {config} from '@/config.js'
const {base_url}=config

/**
  * @Description:格式化数据
  * @param 请求参数
  * @return 格式化参数
  */
export const formatData=({url,method,data,system='ecommerce'})=>{
	console.log('-----utils-----',config);
	const http=base_url[system]?base_url[system]:base_url;
	return {
		url:`${http}/${system}${url}`,
		method,
		data,
	}
};