<template>
	<view class="list">
		<view class="tabs">
			<fc-tabs type="line" :options="tabsOptions" :value="tabIndex" @change="handleTabChange"></fc-tabs>
		</view>
		<view class="list-content">
			<fc-list @scrollLower='scrollLower' :count="total" :page="pageNum" :limit='pageSize' :key='tabIndex'
				:loaded='loading' ref='listRef'>
				<view class="panel" v-for="item in list" :key="item.id">
					<fc-title title="线上零售单">
						<view slot='right'>
							<view class="send" @click="goDetail(item.id)" v-if='item.shipStatus'>发货</view>
						</view>
					</fc-title>
					<fc-cell-group :border="false" :renderList="renderList('base',item)"></fc-cell-group>
					<fc-detail title="详情信息" :renderList="renderList('detail',item)"
						@activeChange='(value)=>handleActiveChange(value,item.id)' v-if='!item.shipStatus'></fc-detail>
					<fc-divider />
				</view>
			</fc-list>
		</view>
	</view>
</template>

<script>
	import {
		orderTypes,
		orderStatus
	} from '@/utils/dict.js'
	import Mix from '@/mixins';
	const {
		ListOrderCreaterMix
	} = Mix;
	export default {
		name: "storeManegeList",
		mixins: [ListOrderCreaterMix('store')],
		data() {
			return {
				tabsOptions: [{
						label: '全部',
						value: null
					},
					{
						label: '已发货',
						value: 0
					},
					{
						label: '未发货',
						value: 1
					},
				],
				tabIndex: 0,
				search: {
					status: null,
					orderType: orderTypes.online,
				},
			}
		},
		computed: {},
		mounted() {},
		methods: {
			init() {
				this.initPagination();
				this.query();
			},
			/**
			    处理切换tab事件
			    @param 
			    @return
			*/
			handleTabChange(index) {
				this.tabIndex = index
				const {
					value
				} = this.tabsOptions[index];
				this.initPagination();
				this.$set(this.search, 'status', value);
			},
			/**
			 * 发货
			 * @param {Object} id 订单id
			 */
			goDetail(id) {
				uni.navigateTo({
					url: `/subPackages/order/add/index?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		.list-content {
			position: absolute;
			top: 100rpx;
			bottom: 0;
			left: 0;
			right: 0;
			.panel {
				background: #fff;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
				.send {
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: $primary-color;
					width: 174rpx;
					height: 64rpx;
					line-height: 64rpx;
					border-radius: 4rpx;
				}
			}
		}
	}
</style>