import service from '@/service/index.js';
import {
	payTypes,
	orderTypes
} from '@/utils/dict.js'
import {
	sendToJSON
} from '@/pages/tabBar/order/add/config.js'
import {getQuery} from '@/utils/functions.js'
const DEFAULT_PARAMS={ // 默认查询列表参数
	pageNum:1,
	pageSize:99999,
}
export default which => ({
	props: {
		renderFormList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			loading:false,
			formData: {
				payType: payTypes.offline, // 线下支付
				orderType: this.isGroup ? orderTypes.group : orderTypes.retail,
				goodsPrice: 99,
			},
			idisCodes: [],
			indexList: [],
			templateList: [],
			batchList: [],
		};
	},
	watch: {
		amount(newVal, oldVal) {
			this.$set(this.formData, 'amount', newVal);
		},
	},
	computed: {
		title() {
			const {
				isGroup
			} = this;
			const title = isGroup ? '码量明细' : '已扫码号';
			return title;
		},
		amount() {
			// 订单金额
			const {
				goodsPrice,
				goodsQuantity
			} = this.formData;
			let amount = 0;
			if (goodsPrice && goodsQuantity) {
				amount = parseInt(goodsPrice) * parseInt(goodsQuantity);
			}

			return amount;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		/**
		    处理表单改变事件
		    @param 
		    @return
		*/
		handleChange(formData) {
			console.log(formData)
			this.formData = formData
		},

		/**
		    扫码
		    @param 点击的表单项
		    @return
		*/
		handleClickScan(type, formItem, formKey) {
			const {
				goodsQuantity = 0,
				recordId
			} = this.formData;
			const {
				idisCodes
			} = this;
			if (!parseInt(goodsQuantity)) {
				uni.$u.toast('请先输入购买数量');
				return;
			}
			if (!recordId) {
				uni.$u.toast('请先选择流水号段');
				return;
			}
			if (idisCodes.length >= parseInt(goodsQuantity)) {
				uni.$u.toast('码量已超出购买数量');
				return;
			}
			// 允许从相机和相册扫码 TODO
			const that = this;
			uni.scanCode({
				success: function(res) {
					const {result}=res;
					console.log('条码：' , res);
					console.log('条码内容：' , res.result);
					const {code}=getQuery(result);
					console.log('-------handleClickScan-------',code);
					const {idisCodes}=that;
					if(idisCodes.includes(code)){
						uni.$u.toast('码号已存在');
						return;
					}
					if(code){
						that.checkCode(code);
					}
				}
			});
		},

		/**
		    点击已扫码号删除按钮事件
		    @param 
		    @return
		*/
		handleDetele(code, index) {
			const {
				idisCodes
			} = this;
			idisCodes.splice(index, 1);
		},
		/**
		    提交 新增 | 发货
		    @param 
		    @return
		*/
		handleSubmit() {
			this.$refs.formRef.validate().then(data => {
				const {
					validate
				} = this;

				// 校验
				if (!this.validate(data)) {
					return;
				}

				const {
					idisCodes
				} = this;
				const params = {
					...sendToJSON(data, [...idisCodes]),
				};
				console.log('----Submit-----', params);
				const {
					order
				} = service;
				uni.navigateBack({
					delta: 1,
					success: () => {
					     let page = getCurrentPages().pop();  //跳转页面成功之后
						 if (!page) {
					          return;
						 } else {
							 console.log('----navigateBack----success--');
					        page.onLoad({refresh:true});// page自带options对象.
					     }
				}});
				// order[`${which}Order`](params).then(res=>{
				// 	const {code}=res;
				// 	if(code===200){
				// 		const {id}=this.formData;
				// 		uni.$u.toast('操作成功');
				// 		 setTimeout(() => {
				// 		    uni.navigateBack({
				// 				delta: 1,
				// 				success: () => {
				// 					console.log('----navigateBack----success--');
				// 				     let page = getCurrentPages().pop();  //跳转页面成功之后
				// 					 if (!page) {
				// 				          return;
				// 					 } else {
				// 				        page.onLoad(page.options);// page自带options对象.
				// 				     }
				// 				}});
				// 		 }, 500)
				// 	}
				// }).catch(e=>{
				// 	console.error(e);
				// });

			}).catch(e => {
				console.error(e);
			});
		},

		validate(data) {
			const {
				idisCodes
			} = this;
			const {
				goodsQuantity
			} = data;
			if (idisCodes.length ===0) {
				uni.$u.toast('码号不能为空');
				return false;
			}
			if (idisCodes.length !== parseInt(goodsQuantity)) {
				uni.$u.toast('购买数量与已扫码数量不一致');
				return false;
			}
			return true;
		},

		/**
		 * 更新表单数据
		 * @param {Object} key 更新的key
		 * @param {Object} props 更新propsData字段
		 * @param {Object} value 值
		 */
		refreshFromList(key, props, value) {

			const {
				renderFormList
			} = this;

			const current = renderFormList.filter(item => item.key === key)[0];
			if (current) {
				current.propsData[props] = value;
				this.$emit('updateList', renderFormList)
			}

		},

		/**
		 * 查询流水段号
		 */
		queryIndex() {
			const params = {
				...DEFAULT_PARAMS,
			};
			const {
				queryIndex
			} = service.order;
			queryIndex(params).then(res => {
				const {
					code,
					rows
				} = res;
				if (code === 200) {
					this.indexList = rows.map(item => {
						const {indexStart,indexEnd}=item;
						return {
							label: `${indexStart}~${indexEnd}`,
							value: item.id,
						}
					});
					this.refreshFromList('recordId', 'options', this.indexList);
				}
			}).catch(e => {
				console.error(e);
			})
		},

		/**
		 * 查询产品模版
		 */
		queryProduce() {
			const {
				productId
			} = this.formData;
			const params = {
				...DEFAULT_PARAMS,
				boId:productId,
			};
			const {
				queryProduce
			} = service.order;
			queryProduce(params).then(res => {
				const {
					code,
					rows
				} = res;
				if (code === 200) {
					this.templateList = rows.map(item => ({
						label: item.name,
						value: item.id,
					}));
					this.refreshFromList('templateId', 'options', this.templateList);
				}
			}).catch(e => {
				console.error(e);
			})
		},

		/**
		 * 查询批次
		 */
		queryBatch() {
			const {
				productId,
			} = this.formData;
			const params = {
				...DEFAULT_PARAMS,
				boId:productId,
			};
			const {
				queryBatch
			} = service.order;
			queryBatch(params).then(res => {
				const {
					code,
					rows
				} = res;
				if (code === 200) {
					this.batchList = rows.map(item => ({
						label: item.batchNo,
						value: item.id,
					}));
					this.refreshFromList('batchId', 'options', this.batchList);
				}
			}).catch(e => {
				console.error(e);
			})
		},

		/**
		 * 校验码
		 * @param {Object} code 码
		 */
		checkCode(idisCode) {
			const {recordId}=this.formData;
			const params = {
				recordId,
				idisCode,
			}
			const {
				checkCode
			} = service.order;
			checkCode(params).then(res => {
				const {
					code,
					data
				} = res;
				if (code === 200) {
					this.idisCodes.push(data);
				}
			}).catch(e => {
				console.error(e)
			});
		},

	}
})