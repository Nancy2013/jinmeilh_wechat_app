<template>
	<view class="addPage">
		<Enterprise v-if="show(roleFlagDict.enterprise)" :isGroup="isGroup==='true'"/>
		<Sale v-if="show(roleFlagDict.sale)"/>
		<StoreManage v-if="show(roleFlagDict.storeManage)" :isGroup="isGroup==='true'"/>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import service from '@/service/index.js';
	import Enterprise from './enterprise/index.vue';
	import Sale from './sale/index.vue';
	import StoreManage from './storeManage/index.vue';
	import {roleFlagDict} from '@/utils/dict.js';
	export default {
		name:'orderAdd',
		components:{
			Enterprise,
			Sale,
			StoreManage,
		},
		data() {
			return {
				roleFlagDict,
				isGroup:'',
			}
		},
		computed:{
			...mapState('app', ['userInfo']),
			show(){
				return function(val){
					const {roleFlag}=this.userInfo;
					return roleFlag===val;
				}
			},
		},
		onLoad: function (options) {
			const {isGroup}=options;
			this.isGroup=isGroup;
		},
		mounted() {
			console.log('-----orderAdd-----',service);
			this.setTitle();
		},
		methods: {
            /**
			 * 设置标题
			 */
			setTitle(){
				const titleMap={
					enterprise:'出库',
					sale:'新增订单',
					storeManage:'发货',
				};
				const {roleFlag}=this.userInfo;
				const title=titleMap[roleFlagDict[roleFlag]];
				uni.setNavigationBarTitle({title});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.addPage {
		padding-top:20rpx;
		background-color: $background-color;
	}
</style>
