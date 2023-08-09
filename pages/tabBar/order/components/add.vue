<template>
	<view class="addPage">
		<view class="addOrder-wrap">
			<fc-form ref="formRef" :renderList="renderFormList" :formData="formData" @change="handleChange" @unifyEvent="handleClickScan"></fc-form>
			<scanResult :title="title" :list="idisCodes" @delete="handleDetele" required></scanResult>
			<view class="addOrder-submit">
				<button type="default" @click="handleSubmit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service/index.js';
	import {sendToJSON} from './../add/config.js'
	import {objAndProType} from '@/utils/dict.js'
	import Mix from '@/mixins';
	const { AddOrderCreaterMix } = Mix;
	export default {
		name: 'addPage',
		mixins: [AddOrderCreaterMix('add')],
		props: {
			isGroup: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				brandList: [],
			};
		},
		watch: {
			'formData.productId': function(newVal, oldVal) {
				// 动态更新指导价
				const current = this.brandList.filter(item=>item.value===newVal)[0];
				if(current){
					const goodsPrice = current.price;
					this.$set(this.formData, 'goodsPrice', goodsPrice);
				}
				this.reset();
			},
			'formData.recordId': function(newVal, oldVal) {
				this.idisCodes = [];
				this.resetCode();
			},
			'formData.goodsQuantity': function(newVal, oldVal) {
				this.resetCode();
			},
		},
		computed: {},
		mounted() {},
		methods: {
			/**
			 * 初始化
			 */
			init() {
				this.queryBrand();
				this.queryIndex();
			},

			/**
			 * 更新表单
			 */
            reset(){
				const {productId}=this.formData;
				this.templateList=[];
				this.batchList=[];
				this.formData=Object.assign({},{...this.formData,templateId:null,batchId:null})
				if(productId){
					this.queryProduce();
					this.queryBatch();
				}
			},
			
			/**
			 * 重置码
			 */
			resetCode(){
				const {goodsQuantity,recordId}=this.formData
				if(this.isGroup){
					this.idisCodes = [];
					if (parseInt(goodsQuantity)) {
						if (recordId) {
							this.queryCode();
						}
					} 
				}				
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
						this.brandList = rows.map(item =>{
							const {name,id,price}=item;
							return {
								label: name,
								value: id,
								price,
							}
						});
						this.refreshFromList('productId', 'options', this.brandList);
					}
				}).catch(e => {
					console.error(e);
				})
			},
		
			/**
			 * 查询码量
			 */
			queryCode() {
				const {goodsQuantity,recordId}=this.formData;
				const params={
					count:goodsQuantity?parseInt(goodsQuantity):0,
					segmentRecordId:recordId,
				};
				const {
					queryCode
				} = service.order;
				queryCode(params).then(res => {
					const {
						code,
						data
					} = res;
					if (code === 200) {
						this.idisCodes = data.map(item=>item.id);
					}
				}).catch(e => {
					console.error(e);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.addPage{
		background-color: #fff;
		.addOrder-submit {
			padding: 0 $spacing-lg $spacing-lg;
		
			button {
				border-radius: 0;
				border: none;
				background-color: $primary-color;
				color: #fff;
			}
		}
	}
	
</style>