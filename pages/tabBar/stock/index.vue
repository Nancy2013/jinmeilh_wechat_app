<template>
	<view class="stock">
		<fc-divider />
		<fc-title title="出库记录" subTitle="剩余码量：234278"></fc-title>
		<fc-cell-group :border="false" :renderList="renderList"></fc-cell-group>
		<fc-detail title="详情信息" :renderList="renderList"></fc-detail>
		<fc-cell-group :renderList="renderList"></fc-cell-group>
		<fc-divider />
		<view class="stock-divide"></view>
	</view>
</template>

<script>
	export default {
		name: "stock",
		data() {
			return {
                renderList: [
					{
						key: 1,
						label: '出库单类型',
						value: '零售出库单'
					},
					{
						key: 2,
						label: '出库单号',
						value: '34438543980'
					},
					{
						key: 3,
						label: '品种',
						value: '佛缘系列'
					},
					{
						key: 4,
						label: '指导价',
						value: '19.00'
					},
					{
						key: 5,
						label: '购买数量',
						value: '118'
					},
					{
						key: 6,
						label: '订单金额',
						value: '18888.00'
					},
					{
						key: 7,
						label: '株数',
						value: '100'
					},
					{
						key: 8,
						label: '实付金额',
						value: '183988.00'
					},
					{
						key: 9,
						label: '收货人',
						value: '张云'
					},
					{
						key: 10,
						label: '联系电话',
						value: '1493782741'
					},
					{
						key: 11,
						label: '收货地址',
						value: '南京市江宁区南京南28路12-02'
					},
					{
						key: 12,
						label: '出库时间',
						value: '2027-07-19 10:00:00'
					},
					{
						key: 13,
						label: '关联订单',
						value: '436728873466489'
					}
				]
			}
		},
		methods: {
			/**
			 * 
			 */
		}
	}
</script>

<style lang="scss" scoped>
	.stock {
		
	}
</style>