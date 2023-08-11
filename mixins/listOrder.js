import service from '@/service/index.js';
import {
	payTypes,
	orderTypes
} from '@/utils/dict.js'
import { mapState } from 'vuex';
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
	computed: {
		...mapState('app', ['userInfo']),
	},
	mounted() {},
	methods: {

		/**
		 * @description: 初始化分页
		 * @return {*}
		 */
		initPagination() {
			this.pageNum = 1;
			this.list=[];
			this.$refs.listRef.reset();
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
			const {roleFlag}=this.userInfo;
			const {
				queryOrder
			} = service.order;
			const {
				pageNum,
				pageSize,
				search,
			} = this;
			const params = {
				pageNum,
				pageSize,
				roleFlag:parseInt(roleFlag),
				...search,
			}
			this.loading = true;
			uni.showLoading({
				title: '加载中',
				mask:true,
			});
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
				uni.hideLoading()
			}).catch(e => {
				this.loading = false;
				uni.hideLoading()
				console.error(e)
			})
		},

		/**
		 * @description: list页面触底事件
		 * @param {*} 
		 * @return {*}
		 */
		scrollLower() {
			this.pageNum++
			this.query()
		},
	},
})