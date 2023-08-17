<template>
	<view class="login">
		<view class="login-prompt">
			<view class="login-prompt-title">欢迎回来!</view>
			<view class="login-prompt-label">请输入您的账号和密码</view>
		</view>
		<view class="login-form">
			<view class="login-form-input">
				<img class="form-input-static" :src="accountImg" />
				<input placeholder="请输入账号名称" type="text" v-model="userName" maxlength="11" />
			</view>
			<view class="login-form-input">
				<img class="form-input-static" :src="passwordImg" />
				<input placeholder="请输入账号密码" v-model="password" :password="openPassword" maxlength="16" />
				<img v-if="openPassword" :class="['form-input-absolute', 'input-img-noVisible']" :src="noVisibleImg"
					@click="changeOpenPassword" />
				<img v-else :class="['form-input-absolute', 'input-img-visible']" :src="visibleImg"
					@click="changeOpenPassword" />
			</view>
		</view>
		<view class="login-btn">
			<view class="login-btn-primary" @click="interfaceLogin">
				<span>登录</span>
			</view>
		</view>
	</view>
</template>

<script>
	import visibleImg from '@/static/noLayouts/login/visible.png';
	import noVisibleImg from '@/static/noLayouts/login/noVisible.png';
	import passwordImg from '@/static/noLayouts/login/password.png';
	import accountImg from '@/static/noLayouts/login/account.png';
	import requestApi from '@/utils/request.js';
	import {
		config
	} from '@/config.js'
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				visibleImg,
				noVisibleImg,
				passwordImg,
				accountImg,
				openPassword: true,
				type: 'text',
				userName: '',
				password: ''
			}
		},
		computed: {
			...mapState('app', ['userInfo']),
		},
		methods: {
			...mapMutations('app', ['updateUserInfo']),
			changeOpenPassword() {
				this.openPassword = !this.openPassword;
			},
			convertPage(url) {
				uni.switchTab({
					url
				})
			},
			interfaceLogin() {
				let {
					userName,
					password
				} = this;
				requestApi({
					url: config.base_url + '/base/login',
					method: 'post',
					data: {
						userName,
						password
					}
				}).then((res) => {
					if (res.code == 200) {
						const {
							name,
							avatar
						} = res.data; // 存储登录名与头像
						const userInfo = {
							...this.userInfo,
							name,
							avatar,
						};
						this.interfaceMenus(res.data.token, userInfo);
						uni.setStorageSync('token', res.data.token);
					}
				})
			},
			interfaceMenus(Authorization, userInfo) {
				requestApi({
					url: config.base_url + '/base/menu/current/user/menu',
					method: 'get',
					header: {
						Authorization,
						App_id: 4
					}
				}).then((res) => {
					let menus = res.data.filter(v => v.parentId != 0);
					let roleFlag = res.data.find(v => v.parentId == 0).url.split('=')[1];
					this.updateUserInfo({
						userInfo: Object.assign({}, userInfo, {
							roleFlag: Number(roleFlag)
						})
					});
					uni.setStorageSync('menus', menus);
					this.convertPage(menus[0].url);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {}

	.login-prompt {
		margin: 40rpx;

		&-title {
			font-size: 36rpx;
			color: #1D1C25;
			font-weight: 600;
			padding: 0 0 10rpx;
		}

		&-label {
			font-size: 32rpx;
			color: #798692;
			font-weight: 400;
			padding: 0 0 10rpx;
		}
	}

	.login-form {
		margin: 80rpx 64rpx;

		&-input {
			height: 100rpx;
			
			border-radius: 100rpx;
			opacity: 1;
			border: 2rpx solid #C7D1DB;
			margin: 0 0 52rpx;
			display: flex;
			align-items: center;
			position: relative;
			background: #FFFFFF;

			.form-input-static {
				width: 40rpx;
				height: 40rpx;
				margin: 0 0 0 20rpx;
			}

			>input {
				padding: 0 32rpx 0 20rpx;
				flex: 1;
				font-size: 24rpx;
			}

			.form-input-absolute {
				z-index: 9;
				position: absolute;
				right: 40rpx;
				width: 48rpx;
			}

			.input-img-visible, .input-img-noVisible {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}

	.login-btn {
		margin: 144rpx 40rpx 0;
		height: 110rpx;
		background: #B6955F;
		border-radius: 100rpx;
		opacity: 1;

		&-primary {
			line-height: 110rpx;
			text-align: center;
			font-size: 32rpx;
			color: #FFFFFF;

			&:active {
				opacity: 0.6;
			}
		}
	}
</style>