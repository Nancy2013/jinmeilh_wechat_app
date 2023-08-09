<template>
	<view class="title">
		<view class="title-left">
			<slot name="left">
				<text class="title-left-text">{{ title }}</text>
			</slot>
		</view>
		<view class="title-right">
			<slot name="right">
				<text class="title-right-text">{{ subTitle }}</text>
			</slot>
		</view>
		
		<view class="title-border"></view>
	</view>
</template>

<script>
	export default {
		name:"fc-title",
		props: {
			title: String,
			subTitle: String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.title {
	position: relative;
	height: 120rpx;
	padding: 0 50rpx 0 40rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	.title-left-text {
		font-size: 40rpx;
		color: #333;
	}
	.title-right-text {
		font-size: 32rpx;
		color: $primary-color;
	}
	.title-border {
		position: absolute;
		bottom: 0;
		left: 56rpx;
		right: 56rpx;
		height: 1px;
		background-color: #EEEEEE;
	}
}
</style>