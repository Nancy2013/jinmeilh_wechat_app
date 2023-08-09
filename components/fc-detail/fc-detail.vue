<template>
	<view class="detail">
		<view class="detail-wrap">
			<view class="detail-panels">
				<view class="detail-panels-title">{{ title }}</view>
				<view class="detail-panels-arrow">
					<img :src="arrowImg" @click="activeChange" :class="[ active ? 'arrowDown' : 'arrowUp' ]" />
				</view>
			</view>
			<view class="detail-collapse" v-if="active">
				<fc-cell-group :border="false" :renderList="renderList"></fc-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	import arrowImg from '@/components/images/fc-detail/arrow.png'
	export default {
		name: "fc-detail",
		props: {
			title: {
				type: String,
				default: ''
			},
			renderList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				active: false,
				arrowImg
			}
		},
		methods: {
			activeChange() {
				this.active = !this.active
				this.$emit('activeChange',this.active);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {}

	.detail-wrap {}

	.detail-panels {
		display: flex;
		align-items: center;
		padding: 30rpx 50rpx 30rpx 40rpx;
	}

	.detail-panels-title {
		padding: 0 20rpx 0 0;
		font-size: 30rpx;
	}

	.detail-panels-arrow {
		width: 40rpx;
		height: 40rpx;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.arrowDown {
		transform: rotate(180deg);
	}

	.arrowUp {
		transform: rotate(0deg);
	}

	.detail-collapse {
		margin: 0 20rpx 20rpx;
		padding: 10rpx 0;
		background: #F7F7F7;
		position: relative;
	}

	.detail-collapse::before {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-top: 20rpx solid transparent;
		border-right: 20rpx solid transparent;
		border-left: 20rpx solid transparent;
		border-bottom: 30rpx solid #F7F7F7;
		position: absolute;
		top: -40rpx;
		left: 40rpx;
	}
</style>