<template>
	<view class="detailPage">
			<view class="addOrder-wrap">
				<fc-form ref="formRef" :renderList="renderFormList" :formData="formData" @change="handleChange"
					@unifyEvent="handleClickScan"></fc-form>
				<scanResult :title="title" :list="idisCodes" @delete="handleDetele" required></scanResult>
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
	} from '@/utils/config.js'
	import Mix from '@/mixins';
	import {getCurPage} from '@/utils/functions.js'
	const {
		AddOrderCreaterMix
	} = Mix;
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
				const {id}=getCurPage();
				this.id=id;
				if(this.id){
					await this.detail()
					await this.queryProduce();
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
				uni.showLoading({
					title: '加载中',
					mask:true,
				});
				return detailOrder(params).then(res => {
					const {
						code,
						data
					} = res;
					if (code === 200) {
						const {detailVOList}=data;
						const {idisCodes,id}=detailVOList[0];
						this.formData={
							...detailVOList[0],
							...data,
							detailId:id,
						}
					}
					uni.hideLoading()
				}).catch(e => {
					uni.hideLoading()
					console.error(e)
				})
			},

			/**
			 * 获得地址
			 */
			setAddress() {
				const {receiveProvince,receiveCity,receiveDistrict,receiveAddress} = this.formData;
				const addressArr = [receiveProvince,receiveCity,receiveDistrict,receiveAddress];
				const address=addressArr.filter(item=>item).map(item=>item);
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