<template>
	<div id="app-wrapper" class="app-wrapper">
		<header>
			<Headerlogo />
			<Handernav @setNavItem="setNavItem" />
			<Notice />
			<el-button
				class="loginOutClass"
				type="menu"
				@click.prevent="handleLogout()"
				>退出登录</el-button
			>
		</header>
		<div class="main-container">
			<Nav-item :isShow="navItemShow" :itemList="naveItemList" />
			<App-main :style="navItemShow ? '' : 'margin-top:20px'" />
		</div>
	</div>
</template>

<script>
import Headerlogo from "./components/Headerlogo";
import Handernav from "./components/Headernav";
import NavItem from "./components/NavItem";
import Notice from "./components/Notice";
import AppMain from "./components/AppMain";
import { mapState, mapGetters } from "vuex";
export default {
	components: { Headerlogo, Handernav, NavItem, AppMain, Notice },
	computed: { ...mapState(["active"]), ...mapGetters(["permission_routes"]) },
	data() {
		return {
			navItemShow: false,
			naveItemList: [],
		};
	},
	created() { },
	mounted() { },
	watch: {
		$route(to, from) {
			if (
				to.path === "/views/onsiteWork/onsiteMonitor" ||
				to.path === "/views/onsiteWork/droneMonitor"
			) {
				this.setNavItem(true, this.permission_routes[2].children);
			}
		},
	},
	methods: {
		async handleLogout() {
			const { message } = await this.$store.dispatch("user/logout");
			this.$message.success(message);
			this.$router.push(`/login`);
		},
		setNavItem(show, list) {
			this.navItemShow = show;
			this.naveItemList = list;
		},
	},
};
</script>

<style lang="scss" scoped>
	.app-wrapper {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: url(~@/assets/images/bg.jpg) no-repeat;
		background-size: 100% 100%;
		header {
			width: 100%;
			height: 80px;
			background-color: rgba($color: #5d7dff, $alpha: 0.13);
			@include flex-row-bet;
			padding-right: 20px;
		}
		.main-container {
			width: 100%;
			height: calc(100vh - 100px);
			margin-bottom: 20px;
			overflow: hidden;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>
