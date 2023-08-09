import request from'@/utils/request.js'
import {formatData} from './utils.js'


export default {
	// 查询-企业主
	// queryEnterprise:(params)=>request(formatData({url:'/order/pageQuery',method:'POST',data:params,})), // /order/pageQuery
	// 查询
	queryOrder:(params)=>request(formatData({url:'/order/pageQueryForOffLine',method:'POST',data:params,})), // /order/pageQueryForOffLine
	// 详情
	detailOrder:(params)=>request(formatData({url:'/order/detail',method:'',data:params,})),
	// 编辑
	editOrder:(params)=>request(formatData({url:'/order/edit',method:'POST',data:params,})),
	// 新增
	addOrder:(params)=>request(formatData({url:'/order/add',method:'POST',data:params,})),
	// 查询品牌
	queryBrand:(params)=>request(formatData({url:'/businessObject/pageQueryProduct',method:'POST',data:params,system:'node'})),
	// 查询流水号段
	queryIndex:(params)=>request(formatData({url:'/code/seg/record',method:'POST',data:params,system:'node'})),
	// 查询产品模版
	queryProduce:(params)=>request(formatData({url:'/businessObjectTemplate/list',method:'POST',data:params,system:'node'})),
	// 查询批次
	queryBatch:(params)=>request(formatData({url:'/businessBatchObject/pageQuery',method:'POST',data:params,system:'node'})),
	// 校验码
	checkCode:(params)=>request(formatData({url:'/order/checkScanCode',method:'POST',data:params,})),
	// 获取码量
	queryCode:(params)=>request(formatData({url:'/code/seg/listCodeByCount',method:'POST',data:params,system:'node'})),
};