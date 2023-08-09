<template>
	<view class="divider"></view>
</template>

<script>
	export default {
		name: "fcDivider",
		props: {
			height: {
				type: Number,
				default: 10
			}
		}
	}
</script>

<style scoped lang="scss">
	.divider {
		background: #F7F8FA;
		padding: 10rpx;
	}
</style>