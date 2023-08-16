<template>
	<view class="minePage">
		<view class="content">
			<view class="avatar">
				<u-avatar :src="userInfo.avatar||avatar" size='164'></u-avatar>
			</view>
			<view class="text">{{userInfo.name||''}}</view>
		</view>
		<view class="footer">
			<button type="default" @click="logout">退出登录</button>
		</view>
		<fc-tabbar />
	</view>
</template>

<script>
	import service from '@/service/index.js';
	import {
		mapState
	} from 'vuex';
	import avatar from '@/images/main/mine/avatar.png';
	export default {
		name: 'mine',
		components: {},
		data() {
			return {
				avatar,
			}
		},
		computed: {
			...mapState('app', ['userInfo']),
		},
		mounted() {},
		methods: {
			/**
			 * 退出登录
			 */
			logout() {
				const {
					logout
				} = service.app;
				logout().then(res => {
					const {
						code
					} = res;
					if (code === 200) {
						uni.clearStorage();
						uni.$u.toast('已退出登录');
						uni.redirectTo({
							url: `/pages/noLayouts/login/index`
						})
					}
				}).catch(e => {
					console.error(e)
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.minePage {
		position: relative;
		height: 100vh;
		.content {
			padding-top: 40rpx;
			background: #fff;
			text-align: center;
			border-top:20rpx solid $background-color;
			.text {
				margin-top: 18rpx;
				font-size: 32rpx;
				color: #333333;
				font-weight: 400;
			}
		}

		.footer {
			width: 100%;
			position: absolute;
			background-color: $background-color;
			bottom: calc(constant(safe-area-inset-bottom) + 50px);
			bottom: calc(env(safe-area-inset-bottom) + 50px); /* 兼容 iPhone X 及以上设备 */
			padding: 32rpx;
			background-color: $background-color;
			button {
				border-radius: 0;
				border: none;
				background-color: $primary-color;
				color: #fff;
			}
		}
	}
</style>
