<template>
	<view class="listPage">
		<view>
			<Enterprise v-if="show(roleFlagDict.enterprise)" ref='child'/>
			<Sale v-if="show(roleFlagDict.sale)" ref='child'/>
			<StoreManage v-if="show(roleFlagDict.storeManage)" ref='child'/>
		</view>
		<fc-tabbar />
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex';
	import service from '@/service/index.js';
	import Enterprise from './enterprise/index.vue';
	import Sale from './sale/index.vue';
	import StoreManage from './storeManage/index.vue';
	import {roleFlagDict} from '@/utils/dict.js';
	import Mix from '@/mixins';
	const { GetChildCreaterMix } = Mix;
	export default {
		name:'orderList',
		mixins: [GetChildCreaterMix('page')],
		components:{
			Enterprise,
			Sale,
			StoreManage,
		},
		data() {
			return {
				roleFlagDict,
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
		mounted() {},
		onLoad(options) {
			console.log('--list---onLoad----',options);
			this.update();
		},
		onShow(){
			console.log('-----onShow----');
			this.$nextTick(()=>{
				this.init();
			})
		},
		methods: {
			...mapMutations('app',['updateUserInfo']),
			/**
			 * 更新用户信息
			 */
			update(){
				const roleFlag=uni.getStorageSync('roleFlag')||this.userInfo.roleFlag;
				const userInfo={
					...this.userInfo,
					roleFlag:parseInt(roleFlag),
				}
				this.updateUserInfo({userInfo});
			},
		},
		onReachBottom(){
			console.log('---onReachBottom---');
			this.getReachBottom();
		},
	}
</script>

<style lang="scss" scoped>
.listPage{
	padding-bottom: 148rpx;
	padding-top:1rpx;
	background-color: $background-color;
}
</style>
