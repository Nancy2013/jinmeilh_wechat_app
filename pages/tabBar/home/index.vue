<template>
	<view class="home">
		<fc-divider />
		<view class="home-margin home-flex">
			<view class="home-title">售卖数量</view>
			<view class="home-search">
				<fc-select placeholder="品种" type="search" />
				<fc-select placeholder="时间" type="search" />
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
				<l-echart ref="pieChart" @finished="pieInit"></l-echart>
			</view>
		</view>
		<fc-divider />
		<view class="home-margin home-echarts">
			<view class="home-nowrap">
				<view class="home-title">半年销量图</view>
				<view class="home-title-sub">(单位: 盆)</view>
			</view>
			<view class="home-echarts-init">
				<l-echart ref="linearChart" @finished="linearInit"></l-echart>
			</view>
		</view>
		<fc-divider />
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
	export default {
		components: {},
		data() {
			return {
				cardsArr: [{
						count: 1200,
						label: '总数量'
					},
					{
						count: 1200,
						label: '总金额'
					},
					{
						count: 1200,
						label: '本月数量'
					},
					{
						count: 1200,
						label: '上月数量'
					}
				],
				// 南丁格尔图
				pieOption: {
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
							return `${name}  25%`
						},
						textStyle: {
							color: '#333',
							fontSize: 12,
							// fontWeight: 'bold'
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
								// fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1035,
								name: '佛缘系列'
							},
							{
								value: 735,
								name: '亲子系列'
							},
							{
								value: 580,
								name: '寿辰系列'
							},
							{
								value: 480,
								name: '婚嫁系列'
							},
							{
								value: 400,
								name: '乔迁系列'
							},
							{
								value: 300,
								name: '伴手礼系列'
							}
						]
					}]
				},
				// 折线图
				linearOption: {

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
						data: [150, 230, 224, 218, 135, 147, 260, 350, 340, 200],
						type: 'line',
						symbol: 'none',
						lineStyle: {
							color: '#5470C6',
							width: 3
						},
					}]
				}
			}
		},
		onLoad() {},
		methods: {
			async pieInit() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.pieChart.init(echarts);
				chart.setOption(this.pieOption)
			},
			async linearInit() {
				const chart = await this.$refs.linearChart.init(echarts);
				chart.setOption(this.linearOption)
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