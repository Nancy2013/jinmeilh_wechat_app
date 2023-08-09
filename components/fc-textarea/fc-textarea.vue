<template>
	<textarea v-model="innerValue" :class="['textarea', isError ? 'textarea-error' : '']" :maxlength="maxlength"  :placeholder="placeholder" placeholder-class="textarea-placeholder" @input="handleInput" @focus="handleFocus" />
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
			maxlength: {
				type: Number,
				default: -1
			},
			isError: {
				type: Boolean,
				default: false
			}
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
				this.$emit('change', event.target.value)
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
.textarea {
	width: 100%;
	height: 160rpx;
	padding: 20rpx;
	font-size: 32rpx;
	border: none;
	outline: none;
	color: #222;
	background-color: #F7F7F7;
}

.textarea-placeholder {
	font-size: 30rpx;
	color: #969799;
}

.textarea-error {
	color: $error-color;
	.textarea-placeholder {
		color: $error-color;
	}
}
</style>