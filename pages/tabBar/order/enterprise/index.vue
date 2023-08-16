<template>
	<view class="list">
		<ListPage isEnterprise ref='child'/>
	</view>
</template>

<script>
	import ListPage from '../components/list.vue';
	import Mix from '@/mixins';
	const { GetChildCreaterMix } = Mix;
	export default {
		name:'enterpriseList',
		mixins: [GetChildCreaterMix('list')],
		components:{
			ListPage,
		},
		data() {
			return {}
		},
		computed:{},
		mounted() {},
		methods: {},
		
	}
</script>

<style lang="scss" scoped>
.list{
	margin-top: 20rpx;
	background: #fff;
}
</style>
