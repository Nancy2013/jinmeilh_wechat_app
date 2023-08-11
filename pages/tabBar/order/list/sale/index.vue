<template>
	<view class="list">
		<ListPage ref='child'/>
	</view>
</template>

<script>
	import ListPage from '../../components/list.vue'
	import Mix from '@/mixins';
	const { GetChildCreaterMix } = Mix;
	export default {
		name:'saleList',
		mixins: [GetChildCreaterMix('list')],
		components:{
			ListPage,
		},
		data() {
			return {
				
			}
		},
		computed:{},
		mounted() {},
		methods: {
			init(){
				const {child}=this.$refs
				if(child){
					const init=child.init;
					init();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.list{
	margin-top: 20rpx;
	background: #fff;
}
</style>
