<template>
	<div class="logo-box">
		<div class="logoClass">
			<img src="@/assets/images/logo.png" alt="logo" />
			<span>浙江大有</span>
		</div>
		<h3>新型配电作业远程安全管控辅助平台</h3>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
		};
	},
	created() { },
	methods: {},
};
</script>

<style lang="scss" scoped>
	.logo-box {
		color: #fff;
		height: 100%;
		@include flex;
		width: 25%;
		margin-left: 20px;
		.logoClass {
			font-size: 1.8rem;
			@include flex;
			width: 37%;
			margin-right: 20px;
			img {
				margin-right: 5px;
			}
		}
		h3 {
			width: 55%;
			font-size: 2rem;
			text-align: left;
			color: #3CB7FF;
		}
	}
</style>