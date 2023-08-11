<template>
	<u-tabbar :list="tabbarList" @change="changeTab" :inactive-color="inactiveColor"
		:active-color="activeColor"></u-tabbar>
</template>

<script>
	export default {
		name: "fcTabbar",
		props: {
			inactiveColor: {
				type: String,
				default: '#A1A1A1'
			},
			activeColor: {
				type: String,
				default: '#B6955F'
			}
		},
		data() {
			return {
				tabbarList: [
					{
						pagePath: "/pages/tabBar/home/index",
						iconPath: "/static/tabbar/home.png",
						selectedIconPath: "/static/tabbar/homeSelect.png",
						customIcon: false,
						text: "主页"
					},
					{
						pagePath: "/pages/tabBar/stock/index",
						iconPath: "/static/tabbar/stock.png",
						selectedIconPath: "/static/tabbar/stockSelect.png",
						customIcon: false,
						text: "库存"
					},
					{
						pagePath: "/pages/tabBar/order/list/index",
						iconPath: "/static/tabbar/order.png",
						selectedIconPath: "/static/tabbar/orderSelect.png",
						customIcon: false,
						text: "订单"
					},
					{
						pagePath: "/pages/tabBar/mine/index",
						iconPath: "/static/tabbar/mine.png",
						selectedIconPath: "/static/tabbar/mineSelect.png",
						customIcon: false,
						text: "我的"
					}
				]
			}
		},
		methods: {
			changeTab(index) {
				let url = this.tabbarList[index].pagePath;
				uni.switchTab({ url });
			}
		}
	}
</script>