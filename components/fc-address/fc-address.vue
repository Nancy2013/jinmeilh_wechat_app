<template>
	<view :class="['address', isError ? 'address-error' : '']">
		<!-- <picker :range="options" :range-key="rangeKey" :value="value" @change="handleChange">
			<view class="address-area">
				<view class="address-area-item">
					<input value="" class="address-area-item-content text_ellipsis" type="text" disabled placeholder="省">
					<image class="address-down" :src="rightImg" mode=""></image>
				</view>
				<view class="address-area-space"><view class="address-area-space-line"></view></view>
				<view class="address-area-item">
					<input value="" class="address-area-item-content text_ellipsis" type="text" disabled placeholder="市">
					<image class="address-down" :src="rightImg" mode=""></image>
				</view>
				<view class="address-area-space"><view class="address-area-space-line"></view></view>
				<view class="address-area-item">
					<input value="" class="address-area-item-content text_ellipsis" type="text" disabled placeholder="区/县">
					<image class="address-down" :src="rightImg" mode=""></image>
				</view>
			</view>
		</picker> -->
		<view class="address-area" @click="handleShow">
			<view class="address-area-item">
				<input :value="province.name" class="address-area-item-content text_ellipsis input" placeholder-class="address-placeholder" type="text" disabled placeholder="省">
				<image class="address-down" :src="rightImg" mode=""></image>
			</view>
			<view class="address-area-space"><view class="address-area-space-line"></view></view>
			<view class="address-area-item">
				<input :value="city.name" class="address-area-item-content text_ellipsis input" placeholder-class="address-placeholder" type="text" disabled placeholder="市">
				<image class="address-down" :src="rightImg" mode=""></image>
			</view>
			<view class="address-area-space"><view class="address-area-space-line"></view></view>
			<view class="address-area-item">
				<input  :value="district.name" class="address-area-item-content text_ellipsis input" placeholder-class="address-placeholder" type="text" disabled placeholder="区/县">
				<image class="address-down" :src="rightImg" mode=""></image>
			</view>
		</view>
		<fc-textarea v-model="innerValue.address" :placeholder="placeholder" :isError="isError" :maxlength="maxlength" @change="handleTextareaChange" @focus="handleFocus"></fc-textarea>
		<u-select v-model="isShow" mode="mutil-column-auto" :list="options" child-name="cities" label-name="name" :value-name="valueName" @confirm="handleConfirm" :default-value='defaultValue'></u-select>
	</view>
</template>

<script>
	import rightImg from '@/components/images/fc-select/right.png'
	import { isEmpty } from '../../utils/common.js'
	import requestApi from "@/utils/request.js"
	export default {
		name:"fc-address",
		props: {
			placeholder: String,
			maxlength: String | Number,
			value: {
				type: Object,
				default: ()=> { return {} }
			},
			isError: {
				type: Boolean,
				default: false
			},
			valueName:{
				type:String,
				default:'id',
			},
		},
		data() {
			return {
				rightImg: rightImg,
				isShow: false,
				options: [],
				innerValue: {},
			};
		},
		computed: {
			province(){
				if(this.value){
					const {province={}}=this.value;
					return province;
				}
				
				return {};
			},
			city(){
				if(this.value){
					const {city={}}=this.value;
					return city;
				}
				
				return {};
			},
			district(){
				if(this.value){
					const {district={}}=this.value;
					return district;
				}
				
				return {};
			},
			defaultValue(){
				// TODO优化
				const defaultValue=[];
				const {options}=this;
				if(this.value){
					const {province,city,district}=this.value;
					if(province){
						const provinceIndex=options.findIndex(item=>item.id===province.code);
						if(provinceIndex>=0){
							defaultValue.push(provinceIndex);
							const province=options[provinceIndex];
							const {cities}=province;
							const cityIndex=cities&&cities.findIndex(item=>item.id===city.code);
							if(cityIndex>=0){
								defaultValue.push(cityIndex);
								const city=cities[cityIndex];
								const districtIndex=city.cities&&city.cities.findIndex(item=>item.id===city.code);
								if(districtIndex){
									defaultValue.push(cityIndex);
								}
							}
						}
					};
					console.log('------defaultValue------',defaultValue);
					return defaultValue;
				}
			},
		},
		
		mounted() {
			this.innerValue = { ...this.value }
			requestApi({
				url: "https://op.cn88555.com/api/node/geo/getAddressTree"
			}).then((res)=> {
				if(Array.isArray(res.data)) {
					this.options = res.data
				}
			})
		},
		
		methods: {
			/**
			    处理详细地址改变事件
			    @param { String } value 地址输入的值
			    @return
			*/
			handleTextareaChange(value) {
				const innerValue = { ...this.value }
				innerValue.address = value
				this.$emit('change', innerValue)
			},
			/**
			    处理选择区域改变事件
			    @param { Array } value 选择区域的值
			    @return
			*/
			handleConfirm(value) {
				const keyList = ["province", "city", "district"], innerValue = {...this.value}
				for(let i = 0; i < value.length; i++) {
					innerValue[keyList[i]] = {
						code:value[i].value,
						name:value[i].label,
					}
				}
				this.$emit('change', innerValue)
			},
			
			/**
			    显示区域选择弹框
			    @param
			    @return
			*/
			handleShow() {
				this.isShow = true
				this.$emit('focus')
			},
			/**
			    地址文本框获取焦点时触发
			    @param
			    @return
			*/
			handleFocus() {
				this.$emit('focus')
			},
		},
		watch: {
			value(newValue) {
				this.innerValue = newValue
			}
		}
	}
</script>

<style lang="scss" scoped>
.address-area {
	display: flex;
	flex-direction: row;
	height: 70rpx;
	margin-bottom: 24rpx;
}

.address-area-item {
	position: relative;
	width: 180rpx;
	height: 100%;
	border-radius: 8rpx;
	background-color: $uni-bg-color-grey;
}

.address-area-item .address-down {
	position: absolute;
	right: 20rpx;
	top: 0;
	bottom: 0;
	width: 12rpx;
	height: 20rpx;
	margin: auto 0;
	transform: rotate(90deg);
}

.address-area-item-content {
	position: absolute;
	left: 16rpx;
	height: 42rpx;
	line-height: 42rpx;
	right: 44rpx;
	top: 0;
	bottom: 0;
	margin: auto 0;
}

.address-area-space {
	position: relative;
	flex: 1;
	height: 100%;
}
.address-area-space-line {
	position: absolute;
	left: 12rpx;
	right: 12rpx;
	top: 0;
	bottom: 0;
	height: 3rpx;
	margin: auto;
	background-color: rgba(34, 34, 34, .5);
}
.address-error {
	.address-placeholder {
		color: $error-color;
	}
}
</style>