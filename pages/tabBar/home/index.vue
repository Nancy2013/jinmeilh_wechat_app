<template>
	<view class="home">
		<view class="home-index">
			<fc-divider />
			<view class="home-margin home-flex">
				<view class="home-title">售卖数量</view>
				<view class="home-search">
					<fc-select placeholder="品种" type="search" mode="selector" :options="options"
						@change="(e) => selectChange(e, 'selector')" :value="productId" allowClear />
					<fc-select placeholder="时间" type="search" mode="date" fields="month"
						@change="(e) => selectChange(e, 'date')" :value="date" />
				</view>
			</view>
			<view class="home-cards">
				<view class="home-card" v-for="(item, index) in cardsArr" :key="index">
					<view class="home-card-count">{{ item.count }}</view>
					<view class="home-card-label">{{ item.label }}</view>
				</view>
			</view>
			<fc-divider />
			<view class="home-margin home-echarts">
				<view class="home-title">售卖品种对比</view>
				<view class="home-echarts-init">
					<l-echart ref="pieChart" @finished="interfaceProductRatio(year, month)"></l-echart>
				</view>
			</view>
			<fc-divider />
			<view class="home-margin home-echarts">
				<view class="home-nowrap">
					<view class="home-title">半年销量图</view>
					<view class="home-title-sub">(单位: 盆)</view>
				</view>
				<view class="home-echarts-init">
					<l-echart ref="linearChart" @finished="interfaceHalfYear(productId, year, month)"></l-echart>
				</view>
			</view>
			<fc-divider />
		</view>
		<fc-tabbar />
	</view>
</template>

<script>
	import requestApi from '@/utils/request.js'
	import { config } from '@/config.js'
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js'
	export default {
		components: {},
		data() {
			return {
				productId: '',
				date: null,
				year: '',
				month: '',
				options: [],
				cardsArr: [{
						key: 'totalSale',
						count: 0,
						label: '总数量'
					},
					{
						key: 'totalSaleMoney',
						count: 0,
						label: '总金额'
					},
					{
						key: 'thisMonthSale',
						count: 0,
						label: '本月数量'
					},
					{
						key: 'lastMonthSale',
						count: 0,
						label: '上月数量'
					}
				]
			}
		},
		created() {
			this.interfaceProduct();
			this.getAllInterface();
		},
		methods: {
			selectChange(e, mode) {
				switch (mode) {
					case 'date':
					    console.log('date', e);
					    this.date = e;
						this.year = e.split('-')[0];
						this.month = e.split('-')[1];
						this.getAllInterface();
						break;
					case 'selector':
						this.productId = e;
						this.getAllInterface();
						break;
				}
			},
			// 饼图配置
			configPieOptions(arr) {
				return {
					tooltip: {
						show: false,
					},
					color: ['#5488FF', '#78C6ED', '#EE845A', '#F5CB8A', '#75C9A5', '#BDB3FA'],
					legend: {
						type: 'scroll',
						top: 'center',
						orient: 'vertical',
						itemHeight: 10,
						itemWidth: 10,
						itemGap: 18,
						left: 10,
						padding: 5,
						icon: 'circle',
						formatter: (name) => {
							for (let i = 0; i < arr.length; i++) {
								if (arr[i].productName == name) {
									return `${name}  ${arr[i].ratio}`;
									break;
								}
								continue;
							}
						},
						textStyle: {
							color: '#333',
							fontSize: 12
						}
					},
					series: [{
						name: '售卖品种对比',
						type: 'pie',
						radius: ['40%', '90%'],
						center: ['65%', '50%'],
						roseType: 'radius',
						avoidLabelOverlap: true,
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								formatter: '{d}%\n\n{b}',
								fontSize: 16,
							}
						},
						labelLine: {
							show: false
						},
						data: arr.map(item => ({
							value: item.quantity,
							name: item.productName
						}))
					}]
				}
			},
			// 折线图配置
			configLineOptions(arr) {
				return {
					tooltip: {
						show: true,
						trigger: 'axis'
					},
					grid: {
						left: 30,
						right: 10,
						top: 30,
						bottom: 10
					},
					xAxis: {
						show: false,
						type: 'category'
					},
					yAxis: {
						type: 'value',
						splitNumber: 5,
						splitLine: {
							show: true,
							lineStyle: {
								width: 1,
								type: 'dotted',
								color: '#d8d8d8',
								dashOffset: 5
							}
						}
					},
					series: [{
						data: arr,
						type: 'line',
						symbol: 'none',
						lineStyle: {
							color: '#5470C6',
							width: 3
						},
					}]
				}
			},
			async pieInit(arr) {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.pieChart.init(echarts);
				chart.setOption(this.configPieOptions(arr))
			},
			async linearInit(arr) {
				const chart = await this.$refs.linearChart.init(echarts);
				chart.setOption(this.configLineOptions(arr))
			},
			getAllInterface() {
				let {
					productId,
					year,
					month
				} = this
				this.interfaceHalfYear(productId, year, month);
				this.interfaceSalesYear(productId, year, month);
				this.interfaceProductRatio(year, month);
				this.interfaceSalesRatio(year, month);
				this.interfaceSales(year, month);
				this.interfaceSalesPerson(productId, year, month);
			},
			/**
			 * 接口调用
			 */
			// 半年销量图
			interfaceHalfYear(productId, year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/half/year',
					method: "GET",
					data: {
						productId,
						year,
						month
					}
				}).then((res) => {
					this.linearInit(res.data.map(item => item.quantity))
				})
			},
			// 半年销量图-销售人员
			interfaceSalesYear(productId, year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/sales/half/year',
					method: "GET",
					data: {
						productId,
						year,
						month
					}
				}).then((res) => {
					console.log('半年销量图-销售人员', res)
				})
			},
			// 售卖品种占比
			interfaceProductRatio(year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/product/ratio',
					method: "GET",
					data: {
						year,
						month
					}
				}).then((res) => {
					this.pieInit(res.data)
				})
			},
			// 售卖品种占比-销售员
			interfaceSalesRatio(year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/sales/product/ratio',
					method: "GET",
					data: {
						year,
						month
					}
				}).then((res) => {
					console.log('售卖品种占比-销售员', res)
				})
			},
			// 统计售卖数量 - 库管、企业主
			interfaceSales(year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/sales',
					method: "GET",
					data: {
						year,
						month
					}
				}).then((res) => {
					this.cardsArr = this.cardsArr.map(item => Object.assign({}, item, {
						count: res.data[item.key] ? res.data[item.key] : 0
					}))
				})
			},
			// 统计售卖数量 - 销售
			interfaceSalesPerson(productId, year, month) {
				requestApi({
					url: config.base_url + '/ecommerce/order/static/sales/person',
					method: "GET",
					data: {
						productId,
						year,
						month
					}
				}).then((res) => {
					console.og('统计售卖数量 - 销售', res)
				})
			},
			// 产品分页查询
			interfaceProduct() {
				requestApi({
					url:  config.base_url + '/node/businessObject/pageQueryProduct',
					method: "post",
					data: {
						pageSize: 100,
						pageNum: 1,
						dataType: 1
					}
				}).then((res) => {
					this.options = res.rows.map(item => ({
						label: item.name,
						value: item.id
					}))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {}

	.home-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.home-margin {
		margin: 40rpx;
	}

	.home-title {
		color: #333;
		font-weight: 600;
		font-size: 40rpx;
	}

	.home-search {
		display: inline-flex;

		>fc-select {
			margin: 0 0 0 10rpx;
		}
	}

	.home-cards {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 40rpx;
	}

	.home-card {
		padding: 10rpx;
		text-align: center;

		&-count {
			font-size: 40rpx;
			font-weight: 600;
			color: #815B2B;
			padding: 0 0 10rpx 0;
		}

		&-label {
			font-weight: 400;
			color: #222222;
		}
	}

	.home-nowrap {
		display: inline-flex;
		align-items: center;
	}

	.home-echarts-init {
		width: 100%;
		height: 500rpx;
	}

	.home-title-sub {
		margin: 0 0 0 20rpx;
		color: #84818A;
	}
</style>