<template>
	<div v-show="isShow" class="navItem-Box">
		<h6
			v-for="item in itemList"
			:key="item.path"
			v-show="!item.hidden"
			@click="handleClick(item)"
			:class="$route.path.indexOf(item.path) !== -1 ? 'isAct' : ''"
		>
			{{ item.meta.title }}
		</h6>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		itemList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {

		};
	},
	created() { },
	methods: {
		handleClick(item) {
			this.$router.push(item.path)
		}
	},
};
</script>

<style lang="scss" scoped>
	.navItem-Box {
		width: 100%;
		height: 55px;
		line-height: 55px;
		@include flex;
		h6 {
			color: #fff;
			font-size: 1.8rem;
			margin: 0px 30px;
			cursor: pointer;
		}
		.isAct {
			color: #5aa1ff;
		}
	}
</style>