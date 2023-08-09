<template>
	<view class="add">
		<AddPage :renderFormList='renderFormList' @updateList='handleUpdate'/>
	</view>
</template>

<script>
	import {
		getAddOrderFormRenderList
	} from '../config.js'
	import AddPage from '../../components/add.vue'
	export default {
		name:'saleAdd',
		components:{
			AddPage,
		},
		data() {
			return {
				renderFormList: getAddOrderFormRenderList(),
			}
		},
		computed:{},
		mounted() {},
		methods: {
			handleUpdate(formList){
				this.renderFormList = Object.assign([], formList);
			},
		}
	}
</script>

<style lang="scss" scoped>
.add{}
</style>
