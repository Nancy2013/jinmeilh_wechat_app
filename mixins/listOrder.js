import service from '@/service/index.js';
import {
	payTypes,
	orderTypes
} from '@/utils/dict.js'

const tempList = [{
		"id": 1,
		"orderType": 3,
		"orderCode": "4365748748394",
		"amount": 18888.00,
		"payAmount": 18888.00,
		"receiveName": "张三",
		"receivePhone": "13823234380",
		"receiveAddress": "江苏省南京市江宁区南京南站",
		"createdTime": "2023-7-12 10:10:54",
		"outOrderCode": "43654765867867",
		"detailsVO": [{
			"id": 2,
			"numOfPlant": 2,
			"productName": "佛缘系列",
			"price": 19.00,
			"num": 188,
			"orderId": 0,
			"goodsId": 0,
			"goodsQuantity": 0,
			"goodsPrice": 0,
			"productId": 0,
			"templateId": 0,
			"templateName": "佛缘系列",
			"batchId": 0,
			"batchName": "545465",
			"recordId": 0,
			"record": "35467658765",
			"idisCodes": [
				"00001",
				"00002",
				"00003",
				"00004",
			],
		}],
		status: 1,
	},
	{
		"id": 2,
		"orderType": 3,
		"orderCode": "4365748748394",
		"amount": 18888.00,
		"payAmount": 18888.00,
		"receiveName": "张三",
		"receivePhone": "13823234380",
		"receiveAddress": "江苏省南京市江宁区南京南站",
		"createdTime": "2023-7-12 10:10:54",
		"outOrderCode": "43654765867867",
		"detailsVO": [{
			"id": 2,
			"numOfPlant": 2,
			"productName": "佛缘系列",
			"price": 19.00,
			"num": 188,
			"orderId": 0,
			"goodsId": 0,
			"goodsQuantity": 0,
			"goodsPrice": 0,
			"productId": 0,
			"templateId": 0,
			"templateName": "佛缘系列",
			"batchId": 0,
			"batchName": "545465",
			"recordId": 0,
			"record": "35467658765",
			"idisCodes": [
				"00001",
				"00002",
				"00003",
				"00004",
			],
		}],
		status: 0,
	}
];
export default which => ({
	props: {},
	data() {
		return {
			loading: false,
			list: [],
			pageNum: 1,
			pageSize: 20,
			total: 0,
			baseKeys: [{
					label: '订单类型',
					key: 'orderType',
				},
				{
					label: '订单号',
					key: 'orderCode',
				},
				{
					label: '品种',
					key: 'productName',
				},
				{
					label: '指导价',
					key: 'price',
				},
				{
					label: '购买数量',
					key: 'num',
				},
				{
					label: '订单金额',
					key: 'amount',
				},
				{
					label: '株数',
					key: 'numOfPlant',
				},
				{
					label: '实付金额',
					key: 'payAmount',
				},
				{
					label: '收货人',
					key: 'receiveName',
				},
				{
					label: '联系电话',
					key: 'receivePhone',
				},
				{
					label: '收货地址',
					key: 'receiveAddress',
				},
				{
					label: '下单时间',
					key: 'createdTime',
				},
				{
					label: '关联出库单',
					key: 'outOrderCode',
				},
			],
			detailKeys: [{
					label: '流水号范围',
					key: 'record',
				},
				{
					label: '产品模版',
					key: 'templateName',
				},
				{
					label: '绑定批次',
					key: 'batchName',
				},
				{
					label: '出库码信息',
					key: 'idisCodes',
				},
			],
		};
	},
	watch: {
		search: {
			handler: function(newVal, oldVal) {
				this.query();
			},
			deep: true,
		}
	},
	computed: {},
	mounted() {
		this.init();
	},
	methods: {
		/**
		    处理切换tab事件
		    @param 
		    @return
		*/
		handleTabChange(index) {
			this.tabIndex = index
			const {
				value
			} = this.tabsOptions[index];
			this.$set(this.search, 'orderType', value);
			this.initPagination();
		},

		/**
		 * @description: 初始化分页
		 * @return {*}
		 */
		initPagination() {
			this.pageNum = 1;
		},

		// 点击详情
		handleActiveChange(value, id) {
			
		},

		/**
		 * 上拉加载
		 */
		scrolltolower() {
			this.pageNum++;
			this.query();
		},

		/**
		 * 渲染订单基础信息、详情
		 */
		renderList(flag, item) {
			const list = [];
			if (item) {
				this[`${flag}Keys`].forEach(info => {
					const {
						key,
						label
					} = info;
					list.push({
						key,
						label,
						value: item[`${key}`],
					});
				});
			}
			return list;
		},

		/**
		 * 查询
		 */
		query() {
			const {
				queryOrder
			} = service.order;
			const {
				pageNum,
				pageSize,
				search
			} = this;
			const params = {
				pageNum,
				pageSize,
				...search,
			}
			this.loading = true;
			queryOrder(params).then(res => {
				const {
					code,
					rows,
					total = 0
				} = res;
				if (code === 200) {
					let newList = rows.map(item => {
						const {
							orderType,
							detailsVO
						} = item;
						const detailId = detailsVO.id;
						return {
							...detailsVO[0],
							...item,
							orderType: orderTypes[orderType] || orderType,
							detailId,
						}
					});
					if (this.pageNum === 1) {
						this.list = newList;
					} else {
						this.list = this.list.concat(newList);
					}
					this.total = total;
				}
				this.loading = false;
			}).catch(e => {
				this.loading = false;
				console.error(e)
			})
		},

		/**
		 * 详情
		 */
		detail(id) {
			// TODO 显示加载状态
			const {
				detailOrder
			} = service.order;
			const params = {
				id,
			}
			detailOrder(params).then(res => {
				const {
					code,
					data
				} = res;
				if (code === 200) {
					const {
						detailVOList
					} = data;
					const detailInfo = {
						...data,
						...detailVOList[0],
					}
					const pos = this.list.findIndex(item => item.id === id);
					if (pos >= 0) {
						const current = this.list[pos];
						current.detailInfo = detailInfo;
						this.$set(this.list, pos, current);
					}
				}
			}).catch(e => {
				console.error(e)
			})
		},

		/**
		 * @description: list页面触底事件
		 * @param {*} 
		 * @return {*}
		 */
		handleScrolltolower() {
			this.pageNum++
			this.query()
		},
	},
})