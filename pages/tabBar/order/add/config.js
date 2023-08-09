import scanIcon from '@/images/main/order/scan.png'
import { validPhone,validSpecialKey } from '@/utils/reg'
/**
	获取新增订单表单渲染列表
	@param {String} link 链接
	@return {String} 链接后参数数据
*/
export const getAddOrderFormRenderList = ()=> {
	return [
		{
			label: "品种",
			key: "productId",
			type: "select",
			required: true,
			propsData: {
				placeholder: "请选择品种",
				options: [],
				rangeKey: "label"
			}
		},
		{
			label: "指导价",
			key: "goodsPrice",
			type: "cell"
		},
		{
			label: "购买数量",
			key: "goodsQuantity",
			type: "input",
			required: true,
			propsData: {
				placeholder: "请输入购买数量",
				inputType: 'number',
			},
			validFnc: (value)=> {}
		},
		{
			label: "订单金额",
			key: "amount",
			type: "cell",
			propsData: {
				placeholder: "输入购买数量后自动计算",
			}
		},
		{
			label: "株数",
			key: "numOfPlant",
			type: "input",
			propsData: {
				placeholder: "请输入兰花株数",
				inputType: 'number',
			}
		},
		{
			label: "实付金额",
			key: "payAmount",
			type: "input",
			required: true,
			propsData: {
				placeholder: "请输入实付金额",
				inputType: 'float',
				decimalLen:2,
			}
		},
		{
			label: "买家姓名",
			key: "receiveName",
			type: "input",
			required: true,
			propsData: {
				placeholder: "请输入收货人名称"
			},
			validFnc: (value)=>{
				if(!validSpecialKey(value)){
					return '买家姓名不能包含特殊字符';
				}
			},
		},
		{
			label: "联系电话",
			key: "receivePhone",
			type: "input",
			required: true,
			propsData: {
				placeholder: "请输入联系电话",
				inputType: 'number',
				maxlength: 11,
			},
			validFnc: (value)=>{
				if(!validPhone(value)){
					return '请输入正确格式联系电话';
				}
			},
			
		},
		{
			label: "收货地址",
			key: "address",
			type: "address",
			required: true,
			propsData: {
				placeholder: "请输入详细地址",
				options: [],
			}
		},
		{
			label: "流水号段",
			key: "recordId",
			type: "select",
			required: true,
			propsData: {
				placeholder: "PC端生成的流水段号",
				options: [],
				rangeKey: "label"
			}
		},
		{
			label: "绑定产品",
			key: "templateId",
			type: "select",
			required: true,
			propsData: {
				placeholder: "PC端编辑的产品信息",
				options: [],
				rangeKey: "label"
			}
		},
		{
			label: "绑定批次",
			key: "batchId",
			type: "select",
			required: true,
			propsData: {
				placeholder: " PC端编辑的批次信息",
				options: [],
				rangeKey: "label"
			}
		},
		{
			label: "扫码出库",
			key: "scan",
			type: "cell",
			propsData: {
				placeholder: "请扫描出库码",
				suffixIcon: scanIcon,
			},
			isHide:false,
		},
	]
}
/**
  * @Description:获得地址
  * @param 地址
  * @return 格式化地址
  */
const getAddress=(address)=>{
	// 收货地址
	if(address){
		const {province,city,district={}}=address;
		const newAddress={
			receiveAddress:address.address,
			receiveProvince:province.code,
			receiveCity:city.code,
			receiveDistrict:district.code || city.code,
		}
		
		return newAddress
	}
	
	return ''
}

/**
  * @Description: 界面对象数据转换成接口JSON结构
  * @param 表单数据
  * @return 
  */
export const sendToJSON=(formData,idisCodes)=>{
	
	
	// 基本信息
	
	// 订单ID | 发起客户ID | 支付方式 | 收货人姓名 | 收货人电话 | 订单类型
	const {id,consumerId,payType,receiveName,receivePhone,orderType,payAmount}=formData;
	// 地址
	const address=getAddress(formData.address);
	const base={
		id,
		consumerId,
		payType,
		receiveName,
		receivePhone,
		orderType,
		payAmount:payAmount?parseFloat(payAmount):'',
		...address,
	};
	
	// 详细信息
	
	// 购买数量 | 株数 | 实付金额 
	const {goodsQuantity,numOfPlant,detailId}=formData
	const details={
		...formData.details,
		...formData,
		details:null,
		id:detailId,
		idisCodes,
		goodsQuantity:goodsQuantity?parseInt(goodsQuantity):'',
		numOfPlant:numOfPlant?parseInt(numOfPlant):'',
	};
	const jsonData={
		...base,
		details:[details],
	}
	return jsonData;
};