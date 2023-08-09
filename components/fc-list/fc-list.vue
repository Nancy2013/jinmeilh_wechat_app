<template>
	<view class="list">
		<scroll-view scroll-y="true" lower-threshold="30" @scrolltolower="scrollLower">
			<slot></slot>
			<view class="loadmore">
				<u-loadmore :status="status" />
			</view>
		</scroll-view>
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
		},
		components: {},
		data() {
			return {
				status: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			}
		},
		computed: {},
		mounted() {},
		methods: {
			scrollLower() {
				console.log('------scrollLower-------')
				const {page,limit,count}=this;
				if (page*limit >= count) {
					this.status = "noMore"
					return;
				} else {
					this.status = "loading"
					this.$emit('scrollLower')
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.list{
		height: 100%;
		overflow-y: auto;
		.loadmore{
			// margin:50rpx 0;
		}
	}
</style>