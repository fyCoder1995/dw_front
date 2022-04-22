<template>
	<!-- name: '' -->
	<div class="nav-box">
		<el-button
			type="menu"
			v-for="item in permission_routes"
			:key="item.path"
			@click="handleClick(item)"
			:class="
				$route.path.indexOf(item.meta.activeMenu) !== -1 ? 'topMenuAct' : ''
			"
			>{{ item.meta.title }}</el-button
		>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	components: {},
	data() {
		return {
		};
	},
	computed: {
		...mapGetters(['permission_routes'])
	},
	created() {
		this.init()
	},
	methods: {
		handleClick(item) {
			this.$router.push(item.path)
			if (item.children) {
				this.$emit('setNavItem', true, item.children)
			} else {
				this.$emit('setNavItem', false, [])
			}
		},
		init() {
			for (let item of this.permission_routes) {
				if (this.$route.path.indexOf(item.path) === 0) {
					this.handleClick(item)
				}
			}
		}
	},
};
</script>

<style lang="scss" scoped>
	.nav-box {
		width: 62%;
		display: flex;

		.el-button {
			margin-right: 10px;
		}
		.el-button + .el-button {
			margin-left: 0px;
		}
	}
</style>