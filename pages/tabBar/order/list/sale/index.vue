<template>
	<view class="list">
		<ListPage/>
	</view>
</template>

<script>
	import ListPage from '../../components/list.vue'
	export default {
		name:'saleList',
		components:{
			ListPage,
		},
		data() {
			return {
				
			}
		},
		computed:{},
		mounted() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
.list{
	margin-top: 20rpx;
	background: #fff;
}
</style>
