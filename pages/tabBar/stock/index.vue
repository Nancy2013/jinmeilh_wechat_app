<template>
	<view class="stock">
		<view>
			<fc-divider />
			<fc-title title="出库记录" :subTitle="`剩余码量：${stockNum}`"></fc-title>
			<view class="stock-orderArray" v-for="(item, index) in orderArray" :key="index">
				<fc-cell-group :border="index != 0 ? true : false"
					:renderList="getRenderList(item, renderKeys)"></fc-cell-group>
				<fc-detail title="详情信息" :renderList="getRenderList(item.detailsVO[0], detailKeys)"
					v-if="item.detailsVO.length"></fc-detail>
			</view>
			<fc-divider />
		</view>
		<fc-tabbar />
	</view>
</template>

<script>
	import requestApi from '@/utils/request.js';
	export default {
		name: "stock",
		data() {
			return {
				stockNum: 0,
				orderArray: [],
				renderKeys: [{
						key: 'orderType',
						label: '出库单类型'
					},
					{
						key: 'outOrderCode',
						label: '出库单号'
					},
					{
						key: 'amount',
						label: '订单金额'
					},
					{
						key: 'payAmount',
						label: '实付金额'
					},
					{
						key: 'receiveName',
						label: '收货人'
					},
					{
						key: 'receivePhone',
						label: '联系电话'
					},
					{
						key: 'receiveAddress',
						label: '收货地址'
					},
					{
						key: 'createdTime',
						label: '出库时间'
					},
					{
						key: 'orderCode',
						label: '关联订单'
					}
				],
				detailKeys: [{
						key: 'numOfPlant',
						label: '株数'
					},
					{
						key: 'productName',
						label: '品种'
					},
					{
						key: 'price',
						label: '指导价'
					},
					{
						key: 'num',
						label: '购买数量'
					},
					{
						key: 'goodsQuantity',
						label: '数量'
					},
					{
						key: 'goodsPrice',
						label: '单价'
					},
					{
						key: 'record',
						label: '流水号范围'
					},
					{
						key: 'templateName',
						label: '产品模板'
					},
					{
						key: 'batchName',
						label: '绑定批次'
					},
					{
						key: 'idisCodes',
						label: '出库码信息'
					}
				]
			}
		},
		created() {
			this.interfaceStock();
		},
		methods: {
			convertOrderType(type) {
				let label = '';
				switch (type) {
					case 1:
						label = '线上订单';
						break;
					case 2:
						label = '团购订单';
						break;
					case 3:
						label = '零售订单';
						break;
					default:
						break;
				}
				return label;
			},
			getRenderList(enteries, keys) {
				let renderList = keys.map(item => {
					return {
						key: item.key,
						label: item.label,
						value: Object.is(item.key, 'orderType') ? this.convertOrderType(enteries[item.key]) :
							enteries[item.key],
						isLayout: item.isLayout
					}
				})
				return renderList;
			},
			/**
			 * 接口调用
			 */
			interfaceStock() {
				requestApi({
					url: "https://xi.cn88555.com/api/ecommerce/order/pageQueryForOffLine",
					method: "post",
					data: {
						roleFlag: 2,
						pageNum: 1,
						pageSize: 99999
					}
				}).then((res) => {
					if (res.code == 200) {
						this.stockNum = res.total;
						this.orderArray = res.rows;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.stock {}
</style>