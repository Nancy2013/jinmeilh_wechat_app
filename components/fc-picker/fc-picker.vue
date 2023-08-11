<template>
	<view class="fc-picker">
		<view :class="['select-' + type,  isError ? 'select-error' : '']" @click="handleShowPicker" >
			<text :class="['select-text', innerText ? '' : 'select-text-placeholder']">{{ innerText ? innerText : placeholder}}</text>
			<view class="">
				<image v-if="allowClear&&innerText" class="select-icon close" :src="closeImg" mode="" @click.stop="clear"></image>
				<image v-if="type === 'form'" class="select-icon" :src="rightImg" mode=""></image>
				<image v-else-if="type === 'search'" :class="['select-icon', isShow ? 'select-icon-show' : '']" :src="downImg" mode=""></image>
			</view>
		</view>
		<u-picker v-model="isShow" :mode="mode" :default-time="defaultTime" :params="params" @confirm="handleChange" @cancel="handleCancel"></u-picker>
	</view>
	
</template>

<script>
	import rightImg from '@/components/images/fc-select/right.png'
	import downImg from '@/components/images/fc-select/down.png'
	import { isEmpty } from '../../utils/common.js'
	import closeImg from '@/components/images/scanResult/close.png'
	export default {
		name:"fc-picker",
		props: {
			value: {
				type: Object,
				default:()=>{},
			},
			placeholder: {
				type: String
			},
			options: {
				type: Array,
				default: ()=> { return [] }
			},
			rangeKey: {
				type: String,
				default: "label"
			},
			valueKey: {
				type: String,
				default: "value"
			},
			isError: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,   // form || search
				default: 'form'
			},
			mode:{
				type: String,
				default: "time"
			},
			params:{
				type:Object,
				default:()=>{},
			},
			allowClear: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				isShow: false,
				rightImg: rightImg,
				downImg: downImg,
				closeImg,
			};
		},
		computed: {
			innerText() {
				const {defaultTime}=this;
				return defaultTime;
			},
			defaultTime(){
				const {value,params}=this;
				if(value){
					const lineKeys=['year','month','day'];
					const showKeys=Object.keys(params).filter(key=>params[key]);
					const defaultTime=showKeys.reduce((pre,cur,index)=>{
						if(cur){
							let concat='';
							if(index!==0){
								concat=lineKeys.includes(cur)?'-':':';
								if(cur==='hour'){
									concat=' '; // 小时：为空格
								}
							}
							pre+=concat+value[cur];
						}
						return pre;
					},'');
					return defaultTime;
				}
				return ''
			},
		},
		mounted(){},
		methods: {
			/**
			    value改变时触发
			    @param { Object } event 事件参数
			    @return
			*/
			handleChange(value) {
				console.log('-----handleChange-----',value);
				this.isShow = false;
				this.$emit('change', value)
			},
			
			/**
			    取消选择时触发
			    @param
			    @return
			*/
			handleCancel() {
				this.isShow = false
			},
			/**
			    picker显示时触发
			    @param { Object } event 事件参数
			    @return
			*/
			handleShowPicker() {
				this.isShow = true
				this.$emit('focus')
			},
			/**
			 * 清除
			 */
			clear(){
				this.$emit('change',null)
			},
		}
	}
</script>

<style scoped lang="scss">
.select-form {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	height: 100rpx;
	.select-text {
		font-size: 32rpx;
	}
	.select-text-placeholder {
		font-size: 30rpx;
		color: #969799;
	}
	.select-icon {
		margin-left: $spacing-xs;
		width: 12rpx;
		height: 20rpx;
	}
}

.select-search {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 250rpx;
	height: 64rpx;
	padding: 0 18rpx 0 24rpx;
	border-radius: 4rpx;
	border: 1px solid #D9D9D9;
	box-shadow: 0 4rpx 0 0 rgba(0,0,0,0.02);
	.select-text-placeholder {
		color: rgba(0, 0, 0, .85);
	}
	.select-icon {
		width: 20rpx;
		height: 23rpx;
		transition: transform .15s;
		&.close{
			width: 23rpx;
			margin:0 10rpx;
		}
	}
	.select-icon-show {
		transform: rotate(180deg);
	}
}

.select-error {
	.select-text-placeholder {
		color: $error-color;
	}
}
</style>