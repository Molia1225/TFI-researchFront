<template>
	<div class="header">
		<nav class="navbar navbar-fixed-top">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<!-- <button
						type="button"
						class="navbar-toggle collapsed nav-toggle-color"
						data-toggle="collapse"
						data-target="#navbar"
						aria-expanded="false"
					>
						<svg-icon
							icon-class="close"
							class="close-svg"
							v-show="isCollapsed"
						></svg-icon>
						<span
							class="icon-bar"
							v-show="!isCollapsed"
						></span>
						<span
							class="icon-bar"
							v-show="!isCollapsed"
						></span>
						<span
							class="icon-bar"
							v-show="!isCollapsed"
						></span>
					</button> -->
					<nuxt-link
						class="navbar-brand logo"
						to="/#"
					>
						<svg-icon
							icon-class="logo"
							style="width: 100%; height: 100%"
						/>
					</nuxt-link>
				</div>
				<!-- <div
					class="collapse navbar-collapse"
					id="navbar"
				>
					<ul class="nav navbar-nav navbar-right">
						<li>
							<a href="javascript:;">全部</a>
						</li>
						<li>
							<a href="javascript:;">宏观和策略</a>
						</li>
						<li>
							<a href="javascript:;">行业研究</a>
						</li>
						<li>
							<a href="javascript:;">公司研究</a>
						</li>
						<li>
							<a href="javascript:;">股票资本市场</a>
						</li>
						<li>
							<a href="javascript:;">美元债研究</a>
						</li>
						<li>
							<a href="javascript:;">苹果研究</a>
						</li>
					</ul>
				</div> -->
			</div>
		</nav>
	</div>
</template>

<script>
// import { ScrollTop } from '../assets/common'
import _ from 'lodash'
export default {
	data () {
		return {
			duration: 0,
			currentNav: '1',
			isCollapsed: false,
			scrollElement: 'home',
			navOptions: {
				index: 1,
				aboutUs: 2,
				taletRecuitment: 5,
				contactUs: 6,
			},
		}
	},
	mounted () {
		let _self = this;
		//小屏幕下的导航条折叠
		if ($(window).width() < 768) {
			//点击导航链接之后，把导航选项折叠起来
			$('#navbar a').click(function () {
				$('#navbar').collapse('hide')
				if (!$('.navbar-collapse').hasClass('in')) {
					_self.isCollapsed = false
				}
			})

			$('.navbar-toggle').click(function () {
				_self.isCollapsed = !$('.navbar-collapse').hasClass('in')
			})
		}
	},
	methods: {

	},
}
</script>

<style lang="less">
.header {
	height: 79px;
	.navbar {
		padding: 14px 0;
		background-color: #fff;
		box-shadow: 0px 0px 30px 0px rgba(33, 40, 50, 0.08);
		.nav {
			li {
				a:hover,
				a:focus,
				a:active {
					background-color: #fff;
					color: #212832;
				}
				&.active {
					a {
						color: @activeColor;
					}
				}
			}
		}
		.navbar-collapse.in {
			ul.navbar-nav {
				padding: 0 20px;
			}
			li {
				border-bottom: 1px solid #f1f3f7;
				a {
					padding: 3% 0;
				}
				&:last-child {
					border: none;
					a {
						padding-bottom: 1%;
					}
				}
			}
		}
	}
	.nav-toggle-color {
		.icon-bar {
			background-color: @activeColor;
		}
		.close-svg {
			width: 1.4rem;
			height: 1.4rem;
		}
	}
	.logo {
		width: 160px;
		height: 48px;
    padding:0;
		padding-left: 10px;
	}
}
@media screen and (max-width: 769px) {
	.header {
		height: 51px;
		.navbar {
			padding: 0;
		}
		.logo {
			width: 160px;
			height: 48px;
			padding: 9px;
		}
	}
}
</style>
