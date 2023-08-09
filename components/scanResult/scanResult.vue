<template>
	<view class="scanResult">
		<view class="scanResult-title">
			<text class="scanResult-title-text">{{title}}</text>
			<text v-if="required" class="required">*</text>
		</view>
		<view class="scanResult-list">
			<view class="scanResult-item" v-for="(codeItem, codeKey) in list" :key="codeKey">
				<text>{{ codeItem }}</text>
				<view class="scanResult-item-delete" @click="handleDelete(codeItem, codeKey)">
					<image :src="closeImg" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import closeImg from '@/components/images/scanResult/close.png'
	export default {
		name: "scanResult",
		props: {
			title: {
				type: String,
				default: ""
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			required: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				closeImg: closeImg
			};
		},
		methods: {
			/**
			 点击删除按钮时触发
			 @param { String } codeItem 码
			 @param { Number } codeKey 下标
			 @return
			*/
			handleDelete(codeItem, codeKey) {
				this.$emit("delete", codeItem, codeKey)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scanResult {
		padding: 0 30rpx;
	}

	.scanResult-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 96rpx;

		.scanResult-title-text {
			font-size: 32rpx;
		}
		.required{
			color: $uni-color-error;
		}
	}

	.scanResult-list {
		margin-top: 8rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.scanResult-item {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			flex:1;
			height: 100rpx;
			margin-bottom: 32rpx;
			border: 1px solid #E1E1E1;
			font-size: 32rpx;
			color: #969799;

			.scanResult-item-delete {
				position: absolute;
				padding: 4rpx;
				right: -12rpx;
				top: -16rpx;
			}

			image {
				display: block;
				width: 28rpx;
				height: 30rpx;
			}
		}
	}
</style>
