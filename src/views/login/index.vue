<template>
	<!-- name: '登录' -->
	<div class="login_container">
		<h3>新型配电作业远程安全管控辅助平台</h3>

		<el-form
			:model="loginForm"
			:rules="loginRules"
			ref="loginFormRef"
			class="form_box"
		>
			<el-form-item class="username_box" prop="username">
				<el-input
					v-model="loginForm.username"
					placeholder="请输入账号名"
					clearable
					prefix-icon="el-icon-user"
				></el-input>
			</el-form-item>
			<el-form-item class="password_box" prop="password">
				<el-input
					placeholder="请输入密码"
					v-model="loginForm.password"
					show-password
					clearable
					prefix-icon="el-icon-lock"
				></el-input>
			</el-form-item>
			<el-form-item class="identify_box" prop="identify">
				<el-input
					placeholder="请输入验证码"
					v-model="loginForm.identify"
					@change="handleChange"
					clearable
				></el-input>
			</el-form-item>
			<div @click="refreshCode">
				<Identifycode :identifyCode="identifyCode" />
			</div>
			<el-form-item class="bottons_box">
				<button class="btn_right" @click.prevent="handleLogin">登录</button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import Identifycode from "@/components/Identifycode";
import { removeSessionStorage } from "@/utlis/auth";
export default {
	components: {
		Identifycode,
	},
	data() {
		const validateIdentifycode = (rule, value, callback) => {
			if (this.identifyCode !== value) {
				this.$message({
					message: "请输入正确的验证码",
					duration: 3000,
					type: "error",
					offset: 450,
				});
				this.loginForm.identify = "";
				this.refreshCode();
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				grant_type: "password",
				username: "admin",
				password: "000000",
			},
			identifyCode: "1234",
			identifyCodes: "1234567890",
			loginRules: {
				username: [
					{ required: true, message: "请输入正确账号名", trigger: "blur" },
				],
				password: [
					{ required: true, message: "请输入正确密码", trigger: "blur" },
				],
				identify: [
					{ required: true, message: "请输入正确验证码", trigger: "blur" },
					{
						required: true,
						validator: validateIdentifycode,
						trigger: "blur",
					},
				],
			},
		};
	},
	created() {
		removeSessionStorage();
	},
	mounted() {
		this.refreshCode();
	},
	methods: {
		handleLogin() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (valid) {
					await this.$store
						.dispatch("user/login", this.loginForm)
						.then((res) => {
							if (!res.message) {
								this.getUserInfo();
								this.$message.success("登录成功！");
								this.$router.push("/views/dataCockpit");
							} else {
								this.$message.error(res.message);
								this.refreshCode();
								this.handleChange();
							}
						});
				}
			});
		},
		async getUserInfo() {
			await this.$store.dispatch("user/getInfo", this.loginForm.username).then((res) => {
				this.$router.push("/views/dataCockpit");
			});
		},
		handleReset() {
			this.loginForm = {};
		},
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		makeCode(o, l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode +=
					this.identifyCodes[this.randomNum(0, o.length - 1)];
			}
		},
		refreshCode() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		handleChange() {
			if (this.identifyCode !== this.loginForm.identify) {
				this.loginForm.identify = "";
				this.refreshCode();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
	.login_container {
		height: 100%;
		width: 100%;
		background: center top / cover no-repeat url("~@/assets/images/login/bg.jpg");
		@include flex-col;
		h3 {
			font-size: 3.6rem;
			color: #fff;
			width: 370px;
			text-align: center;
			margin-bottom: 75px;
		}
		.form_box {
			width: 370px;
			height: 315px;
			border-radius: 8px;
			.username_box,
			.password_box,
			.identify_box {
				@include flex;
				border: 1px solid #ffffff;
				height: 42px;
				border-radius: 4px;
				padding: 8px 0;
				margin-bottom: 25px;
			}
			.identify_box {
				width: 220px;
				float: left;
				margin-right: 15px;
			}
			.bottons_box {
				clear: both;
				background-color: unset;
				border: none;
				height: auto;
				@include flex-row-around;
				button {
					background-color: transparent;
					border: none;
					width: 164px;
					height: 57px;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					color: #fff;
					font-size: 1.8rem;
					padding-bottom: 10px;
					cursor: pointer;
					&:hover {
						color: #696969;
					}
				}
				.btn_right {
					width: 370px;
					height: 42px;
					line-height: 42px;
					border: 1px solid #1890ff;
					color: #1890ff;
					border-radius: 4px;
					font-size: 1.6rem;
				}
			}
		}
	}
</style>
<style>
	.form_box .el-input__inner {
		width: 100%;
		line-height: 22px;
		background-color: transparent;
		font-size: 1.6rem;
		border: none;
		outline: medium;
		height: 32px;
		color: #fff;
	}
	.form_box .el-form-item__content {
		width: 100%;
	}
	.form_box .el-input__inner::-webkit-input-placeholder {
		color: #c0c4cc;
	}
	.form_box .el-input__inner::-moz-input-placeholder {
		color: #c0c4cc;
	}
	.form_box .el-input__inner::-ms-input-placeholder {
		color: #c0c4cc;
	}
</style>