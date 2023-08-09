<template>
	<view class="add">
		<AddPage :renderFormList='renderFormList' @updateList='handleUpdate' :isGroup='isGroup'/>
	</view>
</template>

<script>
	import {
		getAddOrderFormRenderList
	} from '../config.js'
	import AddPage from '../../components/add.vue'
	export default {
		name:'enterpriseAdd',
		props: {
			isGroup: {
				type: Boolean,
				default: false,
			},
		},
		components:{
			AddPage,
		},
		data() {
			return {
				renderFormList: getAddOrderFormRenderList(),
			}
		},
		computed:{},
		mounted() {
			this.formatFormList();
		},
		methods: {
			handleUpdate(formList){
				this.renderFormList = Object.assign([], formList);
			},
			formatFormList(){
				const {renderFormList,isGroup}=this;
				if(isGroup){
					// 零售订单
					const scan = renderFormList.filter(item => item.key === 'scan')[0];
					scan.isHide=true;
					this.renderFormList = Object.assign([], renderFormList);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.add{}
</style>
