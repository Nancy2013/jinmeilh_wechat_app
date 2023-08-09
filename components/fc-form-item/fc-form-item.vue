<template>
	<view :class="['form-item', 'form-item-' + type, isError ? 'form-item-status-error' : '']">
		<view class="form-item-wrap">
			<view class="form-item-label">
				{{label}}
				<text v-if="required" class="form-item-required">*</text>
			</view>
			<view class="form-item-content">
				<fc-input :value="value" :isError="isError" v-if="type === 'input'" :placeholder="propsData.placeholder"
					:maxlength="propsData.maxlength" :inputType="propsData.inputType" @change="handleChange" @focus="handleFocus"></fc-input>
				<fc-select :value="value" :isError="isError" type="form" v-if="type === 'select'" :placeholder="propsData.placeholder"
					:options="propsData.options" :rangeKey="propsData.rangeKey" @change="handleChange" @focus="clearValidate"></fc-select>
				<fc-textarea :value="value" :isError="isError" v-if="type === 'textarea'" :placeholder="propsData.placeholder"
					:maxlength="propsData.maxlength" @change="handleChange" @focus="handleFocus"></fc-textarea>
				<fc-address :value="value" :isError="isError" v-if="type === 'address'" :placeholder="propsData.placeholder"
					:maxlength="propsData.maxlength" @change="handleChange" @focus="clearValidate"></fc-address>
				<view class="form-item-content-cell" v-if="type === 'cell'">
					<input :placeholder="propsData.placeholder" placeholder-style="font-size: 30rpx; color: #969799;"
						disabled :value="value"></input>
					<view v-if="propsData.suffixIcon" @click="handleClickSuffixIcon" class="suffixIcon">
						<image :src="propsData.suffixIcon" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view :class="['form-item-errorMessage', isError && errorMessage ? 'form-item-errorMessag-show' : '']">
			{{ errorMessage }}
		</view>
	</view>
</template>

<script>
	import { isEmpty } from '../../utils/common.js'
	export default {
		name: "fcformItem",
		props: {
			type: {
				type: String,
				default: ""
			},
			formItemKey: {
				type: String,
				default: ""
			},
			value: {
				type: String | Number | Array | Object,
				default: null
			},
			label: {
				type: String,
				default: ""
			},
			required: {
				type: Boolean,
				default: false
			},
			validFnc: {
				type: Function,
				default: ()=> { }
			},
			propsData: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				innerValue: "",
				isError: false,
				errorMessage: ""
			};
		},
		mounted() {
			console.log(this.formItemKey)
		},
		methods: {
			/**
			    处理表单项内容改变事件
			    @param 
			    @return
			*/
			handleChange(event) {
				this.$emit('change', event)
			},

			/**
			    点击尾部图标时触发
			    @param 
			    @return
			*/
			handleClickSuffixIcon() {
				this.$emit('unifyEvent', {
					type: 'clickSuffixIcon'
				})
			},
			
			/**
			    输入框获取焦点事件
			    @param 
			    @return
			*/
			handleFocus() {
				this.clearValidate()
			},
			/**
			    移除表单校验结果
			    @param 
			    @return
			*/
			
			clearValidate() {
				this.isError = false
				setTimeout(()=> {
					this.errorMessage = ""
				}, 150)
			},

			/**
			    对单个表单进行校验
			    @param 
			    @return
			*/
			validate() {
				const { value, required, isHide, validFnc } = this
				if (isHide) {
					return Promise.resolve()
				}
				if (required) {
					if (isEmpty(value)) {
						this.isError = true
						return Promise.reject(this.formItemKey)
					} else {
						console.log(validFnc)
						if (validFnc && typeof validFnc === 'function') {
							const validateResult = validFnc(value)
							if (validateResult) {
								this.isError = true
								this.errorMessage = validateResult
								return Promise.reject(this.formItemKey)
							}
						}
					}
				} else {
					if (validFnc && typeof validFnc === 'function' && !isEmpty(value)) {
						const validateResult = validFnc(value)
						if (validateResult) {
							this.isError = true
							this.errorMessage = this.propsData.errorMessage
							return Promise.reject(this.formItemKey)
						}
					}
				}
				console.log(222)
				return Promise.resolve()
				

			}
		}
	}
</script>

<style scoped lang="scss">
	.form-item {
		padding: 0 30rpx;
	}

	.form-item-required {
		color: $uni-color-error;
	}

	.form-item-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		transition: border-color .15s;
	}

	.form-item-input .form-item-wrap,
	.form-item-textarea .form-item-wrap,
	.form-item-address .form-item-wrap {
		flex-direction: column;
		align-items: flex-start;
		padding: 30rpx 0 28rpx;
	}

	.form-item-label {
		font-size: 32rpx;
		line-height: 36rpx;
		color: #000;
	}

	.form-item-input .form-item-label,
	.form-item-textarea .form-item-label,
	.form-item-address .form-item-label {
		margin-bottom: 28rpx;
	}

	.form-item-content {
		flex: 1;
	}

	.form-item-input .form-item-content,
	.form-item-textarea .form-item-content,
	.form-item-address .form-item-content {
		width: 100%;
	}

	.form-item-content-cell {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;

		input {
			flex: 1;
			padding-right: 20rpx;
			line-height: 100rpx;
			text-align: right;
		}

		view {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
		}

		image {
			width: 26rpx;
			height: 24rpx;
		}
		.suffixIcon{
			padding-left: 20rpx;
		}
	}

	.form-item-errorMessage {
		height: 0;
		color: $error-color;
		transform: rotateX(90deg);
		transition: transform .15s;
		transform-origin: 0% 0%;
	}

	.form-item-errorMessag-show {
		height: 32rpx;
		line-height: 32rpx;
		font-size: 24rpx;
		transform: rotateX(0deg);
	}

	.form-item-status-error {
		.form-item-wrap {
			border-color: $error-color;
		}

	}
</style>
