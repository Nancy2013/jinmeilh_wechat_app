<template>
	<view class="add">
		<DetailPage :renderFormList='renderFormList' @updateList='handleUpdate'/>
	</view>
</template>

<script>
	import {
		getAddOrderFormRenderList
	} from '@/utils/config.js'
	import DetailPage from '../components/detail.vue'
	export default {
		name: 'storeManageAdd',
		props: {},
		components: {
			DetailPage,
		},
		data() {
			return {
				renderFormList: getAddOrderFormRenderList(),
			}
		},
		computed: {},
		mounted() {
			this.formatFormList();
		},
		methods: {
			handleUpdate(formList) {
				console.log('-----handleUpdate------', formList);
				this.renderFormList = Object.assign([], formList);
			},
			formatFormList() {
				const cellKeys={
					'productId':'productName',
					'goodsPrice':'',
					'goodsQuantity':'',
					'payAmount':'',
					'numOfPlant':'',
					'amount':'',
					'receiveName':'',
					'receivePhone':'',
					'address':'receiveAddress',
				};
				const {renderFormList} = this;
				Object.keys(cellKeys).forEach(key=>{
					const current = renderFormList.filter(item=>item.key ===key)[0];
					if(current){
						current.type='cell';
						current.required=false;
						if(cellKeys[key]){
							current.key=cellKeys[key];
						}
					}
				})
				this.renderFormList = Object.assign([], renderFormList);
				console.log('--------formatFormList--------',this.renderFormList);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.add{}
</style>