<template>
	<view class="cell">
		<view class="cell-wrap">
			<view class="cell-label">
				<view class="cell-label-span">{{ label }}</view>
			</view>
			<view class="cell-content">
				<view class="cell-content-span">{{ value }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fcCell",
		props: {
			label: {
				type: String,
				default: ""
			},
			value: {
				type: String | Number | Array | Object,
				default: null
			}
		}
	}
</script>

<style scoped lang="scss">
	.cell {
		padding: 0rpx 50rpx 0rpx 40rpx;
		margin: 30rpx 0;
	}
	.cell-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.cell-label {
		font-size: 30rpx;
		color: #969799;
	}
	.cell-content {
		font-size: 30rpx;
		color: #333333;
	}
</style>