<template>
	<view :class="['tabs', 'tabs-' + type]">
		<view :id="'tab-' + tabKey" :class="['tab-item', value === tabKey ? 'tab-item-active' : '']" v-for="(tabItem, tabKey) in options" :key="tabKey" @click="handleClickTab(tabItem, tabKey)">
			<text>{{ tabItem.label }}</text>
		</view>
		<view v-if="type !== 'card'" id="tabs-slide" :class="['tabs-slide', showSlide ? 'tabs-slide-show' : '']" :style="'transform: translateX(' + slideX + 'px' + ');'">
			<image :src="tabIcon" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { isEmpty } from '@/utils/common.js'
	import tabIcon from '@/components/images/fc-tabs/tabs-icon.png'
	export default {
		name:"fc-tabs",
		props: {
			value: {
				type: String | Number,
				default: ""
			},
			options: {
				type: Array,
				default: ()=> { return [] }
			},
			type: {
				type: String,  // card || line
				default: 'line'
			}
		},
		mounted() {
			if(this.type !== 'card') {
				if(!isEmpty(this.value)) {
					Promise.all([this.getTabDetail(`#tab-${this.value}`), this.getSlideDetail()]).then((res)=> {
						const [tabDetail, slideDetail] = res
						this.slideX = tabDetail.left + (tabDetail.width - slideDetail.width) / 2
						setTimeout(()=> {
							this.showSlide = true
						}, 10)
					})
				} else {
					this.getSlideDetail()
				}
			}
			
		},
		data() {
			return {
				tabIcon: tabIcon,
				slideX: 0,
				slideWidth: 0,
				showSlide: false
			};
		},
		methods: {
			/**
			    获取tab项位置信息
			    @param { String } id 节点id
			    @return
			*/
			getTabDetail(id) {
				return new Promise((resolve, reject)=> {
					uni.createSelectorQuery().in(this).select(`${id}`).boundingClientRect(data => {
						resolve(data) 
					}).exec();
				})
			},
			
			/**
			    获取滑块位置信息
			    @param
			    @return
			*/
			getSlideDetail() {
				return new Promise((resolve, reject)=> {
					uni.createSelectorQuery().in(this).select(`#tabs-slide`).boundingClientRect(data => {
						this.slideWidth = data.width
						resolve(data)
					}).exec();
				})
			},
			
			/**
			    处理点击tab事件
			    @param { Object } tabItem tab项
				@param { Number } tabKey tab项下标
			    @return
			*/
			handleClickTab(tabItem, tabKey) {
				if(this.type !== 'card') {
					this.getTabDetail(`#tab-${tabKey}`).then((data)=> {
						this.slideX = data.left + (data.width - this.slideWidth) / 2
					})
				}
				
				this.$emit('change', tabKey)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 92rpx;
	padding-bottom: 8rpx;
}
.tab-item {
	padding: 0 48rpx;
	font-size: 32rpx;
	line-height: 44rpx;
	color: $info-color;
	transition: color .15s;
}

.tab-item-active {
	font-size: 36rpx;
	color: #222222;
}

.tabs-slide {
	position: absolute;
	bottom: 4rpx;
	left: 0;
	margin-top: 10rpx;
	transition: opacity .15s;
	opacity: 0;
	image {
		width: 44rpx;
		height: 11rpx;
	}
}

.tabs-slide-show {
	opacity: 1;
	transition: transform .15s;
}

.tabs-card {
	width: 100%;
	height: 64rpx;
	padding-bottom: 0;
	.tab-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 0;
		font-size: 28rpx;
		border-left: 1px solid #ECECEC;
		color: #A9ABAD;
		background-color: rgba(217, 217, 217, .28);
		transition: all .15s;
	}
	.tab-item:first-child {
		border-left: none;
	}
	.tab-item-active {
		background-color: $primary-color;
		color: #fff;
	}
}
</style>