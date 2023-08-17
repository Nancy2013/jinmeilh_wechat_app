<template>
	<div class="fc-tabbar">
		<u-tabbar class="fc-tabbar" height="148rpx" :list="tabbarList" @change="changeTab" :inactive-color="inactiveColor" :active-color="activeColor"
			v-model="current" :before-switch="beforeSwitch"></u-tabbar>
	</div>
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
				current: 1,
				tabbarList: [{
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
						pagePath: "/pages/tabBar/order/index",
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
		created() {
			let cacheMenus = uni.getStorageSync('menus');
			this.tabbarList = cacheMenus.map(item => {
				let obj = {};
				this.tabbarList.forEach(ele => {
					let { pagePath, iconPath, selectedIconPath } = ele
					if (ele.pagePath == item.url) obj = {
						pagePath,
						iconPath,
						selectedIconPath,
						customIcon: false,
						text: item.name
					}
				})
				return obj;
			})
		},
		methods: {
			changeTab(index) {
				let url = this.tabbarList[index].pagePath;
				uni.switchTab({
					url
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.fc-tabbar {
		position: absolute;
		left: -999999px;
	}
	
</style>