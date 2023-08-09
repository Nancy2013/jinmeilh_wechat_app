<template>
	<view class="list">
		<view class="tabs">
			<fc-tabs type="line" :options="tabsOptions" :value="tabIndex" @change="handleTabChange"></fc-tabs>
		</view>
		<view class="list-content">
			<fc-list @scrolltolower='scrolltolower' :count="total" :page="pageNum" :limit='pageSize' :key='tabIndex'>
				<view class="panel" v-for="item in list" :key="item.id">
					<fc-title title="线下零售单">
						<view slot='right'>
							<view class="send"  @click="goDetail(item.id)" v-if='item.status'>发货</view>
						</view>
					</fc-title>
					<fc-cell-group :border="false" :renderList="renderList('base',item)"></fc-cell-group>
					<fc-detail title="详情信息" :renderList="renderList('detail',item)" @activeChange='(value)=>handleActiveChange(value,item.id)' v-if='!item.status'></fc-detail>
				</view>
			</fc-list>
		</view>
	</view>
</template>

<script>
	import {orderType,orderStatus} from '@/utils/dict.js'
	import Mix from '@/mixins';
	const {
		ListOrderCreaterMix
	} = Mix;
	export default {
		name: "storeManegeList",
		mixins: [ListOrderCreaterMix('store')],
		data() {
			return {
				tabsOptions: [
					{ label: '全部', value: null },
					{ label: '已发货', value: 0 },
					{ label: '未发货', value: 1 },
					],
				tabIndex: 0,
				search:{
					status:null,
				},
			}
		},
		computed: {},
		mounted() {},
		methods: {
			init(){
				this.query();
			},
			
			goDetail(id){
				uni.navigateTo({
					url:`/pages/tabBar/order/add/index?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.list-content{
			position: absolute;
			top: 100rpx;
			bottom: 0;
			left: 0;
			right: 0;
			.panel{
				background: #fff;
				margin-bottom: 20rpx;
				padding-bottom:20rpx;
				.send{
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: $primary-color;
					width: 174rpx;
					height: 64rpx;
					line-height: 64rpx;
					border-radius:4rpx;
				}
			}
		}
	}
</style>
