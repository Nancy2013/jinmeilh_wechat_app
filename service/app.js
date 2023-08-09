import request from'@/utils/request.js'
import {formatData} from './utils.js'


export default {
	// 登录
	login:(params)=>request(formatData({url:'',method:'POST',data:params,})),
	// 退出
	logout:(params)=>request(formatData({url:'/logout',method:'',data:params,system:'base'})),
	// 获取地区列表
	queryAreaList:(params)=>request(formatData({url:'/geo/area/list',method:'',data:params,system:'base'})),
};