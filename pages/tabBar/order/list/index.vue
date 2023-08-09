<template>
	<view class="listPage">
		<Enterprise v-if="show(accountTypeDict.enterprise)"/>
		<Sale v-if="show(accountTypeDict.sale)"/>
		<StoreManage v-if="show(accountTypeDict.storeManage)"/>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import service from '@/service/index.js';
	import Enterprise from './enterprise/index.vue';
	import Sale from './sale/index.vue';
	import StoreManage from './storeManage/index.vue';
	import {accountTypeDict} from '@/utils/dict.js';
	export default {
		name:'orderList',
		components:{
			Enterprise,
			Sale,
			StoreManage,
		},
		data() {
			return {
				accountTypeDict,
			}
		},
		computed:{
			...mapState('app', ['userInfo']),
			show(){
				return function(val){
					const {accountType}=this.userInfo;
					return accountType===val;
				}
			},
		},
		mounted() {},
		onLoad(option) {
		    console.info('------onLoad------',option)
		},
		onShow(){
			console.log('-----onShow----');
		},
		methods: {
			refresh(){
				console.log('----refresh----');
			},
		}
	}
</script>

<style lang="scss" scoped>
.listPage{
	padding-top:1rpx;
	background-color: $background-color;
}
</style>
