<template>
	<view class="cell">
		<view class="cell-wrap" v-if="!Array.isArray(value)">
			<view class="cell-label">
				<view class="cell-label-span">{{ label }}</view>
			</view>
			<view class="cell-content">
				<view class="cell-content-span">{{ value }}</view>
			</view>
		</view>
		<view v-else>
			<view class="cell-label">
				<view class="cell-label-span">{{ label }}</view>
			</view>
			<view class="cell-content content-item" v-for="(item, index) in value" :key="index">
				<view class="cell-content-span">{{ item }}</view>
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
	.content-item {
		> .cell-content-span {
			    margin: 20rpx 0 0;
			    display: inline-block;
			    padding: 20rpx;
			    border-radius: 20rpx;
			    border: 1rpx solid #d8d8d8;
		}
	}
</style>