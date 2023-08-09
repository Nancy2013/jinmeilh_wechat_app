<template>
	<view class="form">
		<view class="formItem-wrap" :id="'formItem-' + formItem.key" v-for="(formItem, formKey) in renderList"
			:key="formItem.key">
			<fc-form-item v-if='!formItem.isHide' :ref="'formItem-' + formItem.key" :formItemKey="formItem.key" :type="formItem.type"
				:label="formItem.label" :required="formItem.required" :validFnc="formItem.validFnc"
				:value="formData[formItem.key]" :propsData="formItem.propsData"
				@change="handleChange($event, formItem, formKey)"
				@unifyEvent="handleUnifyEvent($event, formItem, formKey)" ></fc-form-item>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fc-form",
		props: {
			formData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			renderList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		mounted() {},
		methods: {
			/**
			    处理表单项内容改变事件
			    @param { Object } event 事件参数
			    @param { Object } formItem 渲染表单的对象
			    @param { Number } formKey 表单下标
			    @return
			*/
			handleChange(event, formItem, formKey) {
				const {
					key
				} = formItem, innerFormData = {
					...this.formData
				}
				innerFormData[key] = event
				this.$emit('change', innerFormData, formItem, formKey)
			},

			/**
			    处理自定义事件
			    @param { Object } event 事件参数
				@param { Object } formItem 渲染表单的对象
				@param { Number } formKey 表单下标
			    @return
			*/
			handleUnifyEvent(event, formItem, formKey) {
				this.$emit('unifyEvent', event, formItem, formKey)
			},
			/**
			    对整个表单进行校验
			    @param 
			    @return
			*/
			validate() {
				return new Promise((resolve, reject) => {
					const PromiseList = []
					let isError = false,
						errorKeyList = []
					for (let i = 0; i < this.renderList.length; i++) {
						const renderItem = this.renderList[i]
						PromiseList.push(this.$refs[`formItem-${renderItem.key}`][0].validate())
					}
					Promise.all(PromiseList).then(() => {
						resolve(this.formData)
					}).catch((err) => {
						this.scrollToNode(`formItem-${err}`)
						reject(err)
					})
				})

			},

			/**
			    滚动至某个节点
			    @param { String } id 节点id
			    @return
			*/
			scrollToNode(id) {
				const getNodeScrollTop = () => {
					return new Promise((resolve, reject)=> {
						uni.createSelectorQuery().selectViewport().scrollOffset(res => {
							return resolve(res.scrollTop)
						}).exec();
					})
					
				}

				const getNodeTop = () => {
					return new Promise((resolve, reject)=> {
						uni.createSelectorQuery().in(this).select(`#${id}`).boundingClientRect(data => {
							return resolve(data.top)
						}).exec();
					})
					
				}
				Promise.all([getNodeScrollTop(), getNodeTop()]).then((res)=> {
					const [scrollTop, top] = res
					uni.pageScrollTo({
						scrollTop: scrollTop + top,
						duration: 30
					});
				})
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
