<template>
	<view class="detailPage">
			<view class="addOrder-wrap">
				<fc-form ref="formRef" :renderList="renderFormList" :formData="formData" @change="handleChange"
					@unifyEvent="handleClickScan"></fc-form>
				<scanResult :title="title" :list="idisCodes" @delete="handleDetele"></scanResult>
				<view class="addOrder-submit">
					<button type="default" @click="handleSubmit">提交</button>
				</view>
			</view>
	</view>
</template>

<script>
	import service from '@/service/index.js';
	import {
		sendToJSON
	} from './../add/config.js'
	import Mix from '@/mixins';
	import {getCurPage} from '@/utils/functions.js'
	const {
		AddOrderCreaterMix
	} = Mix;

	const tempDetail = {
		'id': 1,
		"payType": 1,
		"receiveName": "王",
		"receivePhone": "13600000000",
		"orderType": 3,
		"receiveAddress": "100号",
		"receiveProvince": 110000,
		"receiveCity": 110101,
		"details": {
			'id': 2,
			'orderId': 3,
			"payType": 1,
			"orderType": 3,
			"goodsPrice": 110000,
			"productId": 110000,
			"productName":'北京市',
			"templateId": 130000,
			"batchId": 140000,
			"goodsQuantity": 4,
			"payAmount": 440000,
			"numOfPlant": 1,
			"amount": 1,
			"receiveName": "王",
			"receivePhone": "13600000000",
			"address": {
				"province": {
					"code": 110000,
					"name": "北京市"
				},
				"city": {
					"code": 110101,
					"name": "东城区"
				},
				"address": "100号"
			},
			"recordId": 120000,
			"idisCodes": [
				"00001",
				"00002",
				"00003",
				"00004"
			]
		}
	}
	export default {
		name: 'detailPage',
		mixins: [AddOrderCreaterMix('edit')],
		props: {},
		data() {
			return {
				id:null,
			};
		},
		watch: {
			'formData.recordId': function(newVal, oldVal) {
				this.reset();
			},
		},
		computed: {},
		mounted() {},
		methods: {
			async init() {
				// TODO 请求两次
				const {id}=getCurPage();
				this.id=id;
				console.log('-----init----',this.id);
				if(this.id){
					await this.detail()
					this.queryProduce();
					this.queryBatch();
				}
				
				this.queryIndex();
			},
			/**
			 * 更新表单
			 */
			reset() {
				this.idisCodes = [];
			},

			/**
			 * 查询详情
			 */
			detail() {
				const {
					detailOrder
				} = service.order;
				const params = {
					id:this.id,
				}
				this.loading=true;
				return detailOrder(params).then(res => {
					const {
						code,
						data
					} = res;
					if (code === 200) {
						const {details}=data;
						const {idisCodes,id}=details;
						this.formData={
							...details,
							...tempDetail,
							detailId:id,
						}
						this.idisCodes=idisCodes;

					}
					// this.loading=false;
				}).catch(e => {
					this.loading=false;
					console.error(e)
				})
			},

			/**
			 * 获得地址
			 */
			setAddress() {
				const {receiveProvince,receiveCity,receiveDistrict,receiveAddress} = this.formData;
				const addressArr = [receiveProvince,receiveCity,receiveDistrict,receiveAddress];
				const address=addressArr.reduce((address,currentValue)=>{
					if(currentValue){
						address+=currentValue;
					}
					return address
				},'')
				return address;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.detailPage {
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