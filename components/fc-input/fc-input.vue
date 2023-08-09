<template>
	<input :maxlength="maxlength" v-model="innerValue" :class="['input', isError ? 'input-error' : '']" :type="inputType" :placeholder="placeholder" placeholder-class="input-placeholder" @input="handleInput" @focus="handleFocus">
</template>

<script>
	import { filterNum, filterFloat } from '@/utils/filters.js'
	export default {
		name:"fcInput",
		props: {
			value: {
				type: String | Number
			},
			placeholder: {
				type: String
			},
			inputType: {
				type: String,   // 'text' | 'number',
				default: 'text'
			},
			maxlength: {
				type: Number,
				default: -1
			},
			isError: {
				type: Boolean,
				default: false
			},
			decimalLen: {
			    type: Number | String,
			    default: 2
			},
		},
		mounted() {
			this.innerValue = this.value
		},
		data() {
			return {
				innerValue: ""
			};
		},
		methods: {
			/**
			    处理输入框输入事件
			    @param 
			    @return
			*/
			handleInput(event) {
				let value = event.target.value
				if (this.inputType === 'number') {
					value = filterNum(value)
				}
				if (this.inputType === 'float') {
				    value = filterFloat(value, this.decimalLen)
					console.log('-------handleInput------',this.inputType,value);
				}
				this.innerValue=value;
				this.$emit('change', value)
			},
			/**
			    输入框获取焦点事件
			    @param 
			    @return
			*/
			handleFocus() {
				this.$emit('focus')
			}
		},
		watch: {
			value(newValue) {
				this.innerValue = newValue
			}
		}
	}
</script>

<style lang="scss">
.input {
	width: 100%;
	height: 80rpx;
	padding: 0 20rpx;
	font-size: 32rpx;
	border: none;
	outline: none;
	color: #222;
	background-color: #F7F7F7;
}

.input-placeholder {
	font-size: 30rpx;
	color: #969799;
}
.input-error, .input-placeholder-error {
	.input-placeholder {
		color: $error-color;
	}
}
</style>