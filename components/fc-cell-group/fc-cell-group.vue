<template>
	<view class="cell-group">
		<view class="cell-border" v-if="border"></view>
		<view class="cell-wrap" v-for="(cellItem, cellKey) in renderList" :key="cellItem.key">
			<fc-cell :label="cellItem.label" :value="cellItem.value"></fc-cell>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fc-cell-group",
		props: {
			border: {
				type: Boolean,
				default: true
			},
			renderList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch:{
			renderList(newVal,oldVal){},
		},
	}
</script>

<style lang="scss" scoped>
	.cell-border {
		margin: 0 50rpx 40rpx;
		height: 2rpx;
		background: #EEEEEE;
	}
</style>