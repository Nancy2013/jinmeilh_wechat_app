<template>
	<view class="list">
		<view class="" v-if="count>0" style="height: 100%;">
			<scroll-view scroll-y="true" lower-threshold="50" @scrolltolower="scrollLower" style="height: 100%;"
				v-if="type==='scroll'">
				<slot></slot>
				<view class="loadmore" v-if="showLoadmore">
					<u-loadmore :status="status" />
				</view>
			</scroll-view>
			<view class="" v-else>
				<slot></slot>
				<view class="loadmore" v-if="showLoadmore">
					<u-loadmore :status="status" />
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<fc-empty></fc-empty>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fc-list',
		props: {
			count: { // 数据总数
				type: Number,
				default: 0
			},
			page: {
				type: Number,
				default: 0
			},
			limit: {
				type: Number,
				default: 0
			},
			loaded: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'scroll'  // scroll:使用scroll-view  page:使用page onReachBottom
			},
		},
		components: {},
		data() {
			return {
				showLoadmore: false,
				status: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			}
		},
		computed: {},
		mounted() {},
		methods: {
			scrollLower() {
				console.log('------scrollLower-------')
				this.showLoadmore = true;
				const {
					page,
					limit,
					count
				} = this;
				if (page * limit >= count) {
					this.status = "noMore"
					return;
				} else {
					this.status = "loading"
					this.$emit('scrollLower')
				}
			},
			/**
			 * 重置状态
			 */
			reset() {
				this.showLoadmore = false;
				this.status = "loading";
			},
		},
	}
</script>

<style lang="scss" scoped>
	.list {
		height: 100%;

		.loadmore {
			padding-bottom: 30rpx;
		}
	}
</style>