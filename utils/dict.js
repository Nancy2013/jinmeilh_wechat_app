/**
 * 账户类型
 */
export const accountTypeDict = {
	/**
	 * 游客
	 */
	tourist: 1,
	/**
	 * 企业主
	 */
	enterprise: 2,
	/**
	 * 销售
	 */
	sale: 3,
	/**
	 * 库管
	 */
	storeManage: 4,
	2:'enterprise',
	3:'sale',
	4:'storeManage',
}

/**
 * 支付类型
 */
export const payTypes={
	'wechat':0, // 微信支付
	'offline':1, // 线下
};

/**
 * 订单类型
 */
export const orderTypes={
	'online':1, // 线上
	'group':2, // 团购
	'retail':3, // 零售
	1:'线上零售单',
	2:'线下团购单',
	3:'线下零售单'
};

/**
 * 订单状态
 */
export const orderStatus={
	0:'等待付款',
	1:'等待发货',
	2:'待收货',
	3:'已完成',
	4:'售后',
	5:'已取消',
	6:'入库中',
};
/**
 * 对象和产品的数据类型
 */
export const objAndProType = {
	object: 0,
	product: 1
}