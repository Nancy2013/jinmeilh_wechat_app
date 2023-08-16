<template>
	<view class="listPage">
		<view class="add">
			<view class="title">添加订单</view>
			<view class="operate btn">
				<view class="retail child-box" @click="goAdd(false)">
					<view class="type">				
						<image class="image-bg" :src="bg_retail"></image>
						<image class="image-icon" :src="add_retail"></image>
						零售订单</view>
					<view class="des">爆款推荐</view>
				</view>
				<view class="group child-box" v-if='isEnterprise' @click="goAdd(true)">
					<view class="type">
						<image class="image-bg" :src="bg_group"></image>
						<image class="image-icon" :src="add_group"></image>
						团购订单
						</view>
					<view class="des">特价拼团</view>
				</view>
			</view>
		</view>
		<fc-divider />
		<view class="history">
			<view class="operate">
				<view class="title">历史订单</view>
				<view class="right">
					<fc-select placeholder="品种" type="search" :options='brandList' :value='search.productId' @change='handleCategoryChange' allowClear/>
					<fc-picker placeholder="时间" type="search" mode="time" @change='handleTimeChange' :params='timeParams' :value='timeVal' allowClear/>
				</view>
			</view>
			<view class='card' v-if='isEnterprise'>
				<fc-tabs  type="card" :options="tabsOptions" :value="tabIndex" @change="handleTabChange"></fc-tabs>
			</view>
			<view class="list-content">
				<fc-list @scrollLower='scrollLower' :count="total" :page="pageNum" :limit='pageSize' :key='tabIndex'
					:loaded='loading' ref='listRef' type="page">
					<view class="panel" v-for="item in list" :key="item.id">
						<fc-cell-group :border="false" :renderList="renderList('base',item)"></fc-cell-group>
						<fc-detail class="border" title="详情信息" :renderList="renderList('detail',item)" @activeChange='(value)=>handleActiveChange(value,item.id)'></fc-detail>
					</view>
				</fc-list>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service/index.js';
	import {orderTypes,objAndProType} from '@/utils/dict.js'
	import Mix from '@/mixins';
	import add_retail from '@/images/main/order/add_retail.png';
	import add_group from '@/images/main/order/add_group.png';
	import bg_retail from '@/images/main/order/bg_retail.png';
	import bg_group from '@/images/main/order/bg_group.png';
	const {
		ListOrderCreaterMix
	} = Mix;
	export default {
		name:'listPage',
		mixins: [ListOrderCreaterMix('enterprise')],
		props:{
			isEnterprise:{
				type:Boolean,
				default:false,
			},
		},
		data() {
			return {
				tabsOptions: [
					{ label: '线上零售单', value: 1 },
					{ label: '线下零售单', value: 3 },
					{ label: '线下团购单', value: 2 },
				],
				tabIndex: 0,
				search:{
					productId:null,
					orderType:this.isEnterprise?orderTypes.online:orderTypes.retail, // 销售默认查询线下零售单
					year:null,
					month:null,
				},
				brandList:[],
				add_retail,
				add_group,
				bg_retail,
				bg_group,
				timeParams:{
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				timeVal:null,
			}
		},
		computed:{},
		watch:{
			timeVal(newVal,oldVal){
				const {search}=this;
				if(newVal){
					const {year,month}=newVal;
					search.year=year;
					search.month=month;
				}else{
					search.year='';
					search.month='';
				}
				this.search=Object.assign({},search);
			},
		},
		mounted() {},
		methods: {
			goAdd(isGroup){
				console.log('----isGroup----',isGroup);
				uni.navigateTo({
					url:`/subPackages/order/add/index?isGroup=${isGroup}`
				})
			},
			init(){
				this.queryBrand();
				this.initPagination();
				this.query();
			},
			/**
			 * 品种
			 * @param {Object} value 值
			 */
			handleCategoryChange(value){
				this.$set(this.search,'productId',value===-1?null:value);
				console.log('-----handleCategoryChange------',this.search);
			},
			/**
			 * 时间
			 * @param {Object} value
			 */
			handleTimeChange(value){
				this.timeVal=value;
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
				this.$set(this.search, 'orderType', value);
				this.initPagination();
			},
			/**
			 * 查询品类
			 */
			queryBrand() {
				const {
					queryBrand
				} = service.order;
				const params={
					pageNum:1,
					pageSize:99999,
					dataType: objAndProType.product, // 产品
				}
				queryBrand(params).then(res => {
					const {
						code,
						rows
					} = res;
					if (code === 200) {
						const {brandList}=this;
						this.brandList =rows.map(item => ({
							label: item.name,
							value: item.id,
						})) ;
					}
				}).catch(e => {
					console.error(e);
				})
			},
			getReachBottom(){
				this.$refs.listRef.scrollLower();
			},
		},
		
	}
</script>

<style lang="scss" scoped>
.listPage{
	.add,.history{
		padding:30rpx;
	}
	.history{
		padding-bottom:20rpx;
		background: #fff;
	}
	.title{
		font-size:40rpx ;
		color:$title-color;
		font-weight: 500;
		margin-top:10rpx;
		margin-bottom:32rpx;
	}
	.operate{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		&.btn{
			margin-bottom: 0;
			font-size: 36rpx;
			.child-box{
				width:334rpx;
				height:210rpx;
				&.retail,&.group{
					padding-top:46rpx;
					padding-left:46rpx;
					position: relative;
					z-index: 0;
					.image-icon{
						width: 60rpx;
						height: 60rpx;
						vertical-align: middle;
						margin-right: 16rpx;
					}
				}
				&.retail{	
					.des{
						color: #815B2B;
					}
				}
				&.group{
					.des{
						color: #293F78;
					}
				}
				.type{
					font-size: 36rpx;
					font-weight: 500;
				}
				.des{
					font-size: 28rpx;
			
					position: absolute;
					bottom: 26rpx;
				}
			}
		}
		.right{
			display: inline-flex;
		}
	}
	.card{
		margin-bottom: 46rpx;
	}
	.panel{
		padding-top:10rpx;
		padding-bottom:20rpx;
		margin-bottom: 20rpx;
		background-color: #F8F8F8;
		.border{
			border-top:1px solid $border-color;
		}
	}
}
</style>
