<template>
	<div>
		<!-- 日期 -->
		<template v-if="mode == 'date'">
			<picker :value="getIndex" @change="(e) => handleChange(e, 'date')" @cancel="handleCancel" :mode="mode"
				:fields="fields">
				<view :class="['select-' + type,  isError ? 'select-error' : '']" @click="handleShowPicker">
					<text
						:class="['select-text', innerText ? '' : 'select-text-placeholder']">{{ innerText ? innerText : placeholder}}</text>
					<image v-if="type === 'form'" class="select-icon" :src="rightImg" mode=""></image>
					<image v-else-if="type === 'search'" :class="['select-icon', isShow ? 'select-icon-show' : '']"
						:src="downImg" mode=""></image>
				</view>
			</picker>
		</template>
		<!-- 选择器 -->
		<template v-if="mode == 'selector'">
			<picker :range="options" :range-key="rangeKey" :value="getIndex"
				@change="(e) => handleChange(e, 'selector')" @cancel="handleCancel" :mode="mode" :fields="fields">
				<view :class="['select-' + type,  isError ? 'select-error' : '']" @click="handleShowPicker">
					<text
						:class="['select-text', innerText ? '' : 'select-text-placeholder']">{{ innerText ? innerText : placeholder}}</text>
					<image v-if="type === 'form'" class="select-icon" :src="rightImg" mode=""></image>
					<image v-else-if="type === 'search'" :class="['select-icon', isShow ? 'select-icon-show' : '']"
						:src="downImg" mode=""></image>
				</view>
			</picker>
		</template>
	</div>


</template>

<script>
	import rightImg from '@/components/images/fc-select/right.png'
	import downImg from '@/components/images/fc-select/down.png'
	import {
		isEmpty
	} from '../../utils/common.js'
	export default {
		name: "fc-select",
		props: {
			mode: {
				type: String,
				default: "selector"
			},
			fields: {
				type: String,
				default: undefined
			},
			value: {
				type: String | Number
			},
			placeholder: {
				type: String
			},
			options: {
				type: Array,
				default: () => {
					return []
				}
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
				type: String, // form || search
				default: 'form'
			}
		},
		data() {
			return {
				isShow: false,
				rightImg: rightImg,
				downImg: downImg
			};
		},
		computed: {
			innerText() {
				if (isEmpty(this.value) || !Array.isArray(this.options)) {
					return ""
				} else {
					const {
						getCurrent
					} = this
					return getCurrent ? getCurrent.label || "" : "";
				}
			},
			getCurrent() {
				const {
					value,
					options
				} = this;
				if (options) {
					const current = options.filter(item => item.value === value)[0];
					if (current) {
						return current;
					}
				}
				return {}
			},
			getIndex() {
				const {
					value,
					options
				} = this;
				if (options) {
					const index = options.findIndex(item => item.value === value);
					if (index > -1) {
						return index;
					}
				}
				return 0
			},
		},
		methods: {
			/**
			    value改变时触发
			    @param { Object } event 事件参数
			    @return
			*/
			handleChange(event, mode) {
				this.isShow = false
				const {
					options,
					valueKey
				} = this;
				switch (mode) {
					case 'date':
						this.$emit('change', event.detail.value);
						break;
					case 'selector':
						const index = event.target.value;
						const current = options[index];
						const value = current[valueKey];
						this.$emit('change', value);
						break;
					default:
						break;
				}
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
			}
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
		width: 200rpx;
		height: 64rpx;
		padding: 0 18rpx 0 24rpx;
		border-radius: 4rpx;
		border: 1px solid #D9D9D9;
		box-shadow: 0 4rpx 0 0 rgba(0, 0, 0, 0.02);

		.select-text-placeholder {
			color: rgba(0, 0, 0, .85);
		}

		.select-icon {
			width: 20rpx;
			height: 23rpx;
			transition: transform .15s;
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