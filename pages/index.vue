<template>
	<div class="home">
		<div class="search-group">
			<div class="wrap">
				<form class="form-inline">
					<div class="flex-row">
						<div
							class="form-group"
							style="width:41%;"
						>
							<label class="hidden-xs">关键字</label>
							<select
								class="form-control hidden-xs"
								style="margin-right:10px;"
								v-model="category"
							>
								<option value="">全部</option>
								<option value="title">标题</option>
								<option value="summary">摘要</option>
							</select>
							<input
								style="min-width:240px"
								class="form-control"
								placeholder="请输入关键字"
								v-model="keyword"
							>
						</div>
						<div
							class="form-group hidden-xs"
							style="width:37%;"
						>
							<label>研报日期</label>
							<el-date-picker
								v-model="dateRange"
								type="daterange"
								range-separator="至"
								value-format="yyyy-MM-dd"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							>
							</el-date-picker>
						</div>
						<div
							class="form-group search-btn"
							style="width:16.5%;"
						>
							<span
								class="trangle hidden-xs"
								:class="toggleInput?'up':'down'"
								@click="toggleInput=!toggleInput"
							></span>
							<button
								class="btn btn-warning"
								@click="formSearch"
							>查询</button>
						</div>
					</div>
					<div
						class="flex-row hidden-xs"
						style="margin-top:20px;"
						v-if="toggleInput"
					>
						<div
							class="form-group"
							style="width:41%;"
						>
							<label>研报类型</label>
							<select
								class="form-control"
								style="width:326px;"
								v-model="searchParams.category"
							>
								<option value="">全部</option>
								<option value="1">行业报告 Industry Research Report</option>
								<option value="2">公司报告 Equity Research Report</option>
								<option value="3">
									策略报告 Strategy Research Report
								</option>
								<option value="4">
									宏观报告 Economic Research Report
								</option>
								<option value="5">
									市场综述 Weekly Equity Focus 
								</option>
								<option value="6">
									基金研究 Fund Research Report
								</option>
								<option value="7">
									其他报告 Other Report
								</option>
							</select>
						</div>
						<div
							class="form-group"
							style="width:37%;"
							v-if="toggleInput"
						>
							<label>评级</label>
							<select
								style="width:352px;"
								class="form-control"
								v-model="searchParams.initiation"
							>
								<option value="">全部</option>
								<option value="1">买入 Buy</option>
								<option value="2">增持 Accumulate</option>
								<option value="3">持有 Neutral</option>
								<option value="4">卖出 Sell</option>
								<option value="5">强于大市 Outperform</option>
								<option value="6">中性 Neutral</option>
								<option value="7">弱于大市 Underperform</option>
								<option value="8">未上市 Not listed</option>
								<option value="9">未有评级 Not rated</option>
							</select>
						</div>
						<div style="width:16.5%;"></div>
					</div>
				</form>
			</div>
		</div>
		<div class="section">
			<div class="container">
				<div
					class="sec-block"
					v-for="item in newsList"
					:key="item.id"
				>
					<div class="h1-title">
						<span @click="$router.push('/detail?id='+item.id)">
							{{item.cTitle}} {{item.eTitle}}
						</span>
					</div>
					<div
						class="content"
						v-html="item.summary"
					>
					</div>
					<div class="tag-group">
						<div class="date">
							<svg-icon icon-class="date"></svg-icon>
							<span class="date-txt">{{item.releaseDate}}</span>
						</div>
						<div
							class="label-txt"
							v-if="item.cCompany"
						>
							<svg-icon icon-class="label"></svg-icon>
							<span>{{item.cCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.cIndustry}}</span>
						</div>
						<div
							class="user"
							v-if="item.cResearcher"
						>
							<svg-icon icon-class="user"></svg-icon>
							<span>{{item.cResearcher}}</span>
						</div>
						<div
							class="tag-options"
							v-if="item.initiation"
						>
							<span class="tag-item">{{tagObj[item.initiation].substr(0,1)}}</span>
							<span :style="{color:tagColor[item.initiation]}">{{tagObj[item.initiation]}}</span>
						</div>
					</div>
				</div>
				<div class="pagination-box">
					<el-pagination
						background
						class="visible-xs"
						:pager-count="5"
						layout="prev, pager, next"
						:page-size="pagination.pageSize"
						@current-change="currentChange"
						:current-page="pagination.page"
						:total="pagination.total"
					>
					</el-pagination>
					<el-pagination
						background
						:pager-count="5"
						class="hidden-xs"
						:current-page="pagination.page"
						layout="total,prev, pager, next,jumper"
						:total="pagination.total"
						:page-size="pagination.pageSize"
						@current-change="currentChange"
					>
					</el-pagination>
				</div>
			</div>
		</div>
		<div class="declaration">
			<div class="switch-lang">
				<span
					:class="currentLang=='CN'&&'active'"
					@click="currentLang='CN' "
				>CN</span>
				<span
					:class="currentLang=='EN'&&'active'"
					@click="currentLang='EN'"
				>EN</span>
			</div>
			<p v-if="currentLang=='CN'">
				本出版物在香港由天风国际资产管理有限公司（“天风国际资管”）发布。天风国际资管是受香港证券及期货事务监察委员会监管（中央编号：ASF056）并在其核准下开展《证券及期货条例》（第571章）内的受规管业务，包括第4类（就证券提供意见），第5类（就期货合约提供意见），以及第9类（提供资产管理服务）。<br />
				本文所包含的资料均为天风国际资管从相信为准确的来源搜集。天风国际资管对有关报告所引致之任何损失或亏损概不负责。本报告所载的资料只供参考用途，并没有法律约束力，亦不构成投资建议、邀约、购入、出售任何产品。投资涉及风险，有可能损失投资本金。你应咨询专业人士，就本身的投资经验、财务状况、个人目标及风险取向，以提供投资意见。<br />
				天风国际资管或其雇员 可能持有本文所述有关的投资产品。此外，天风国际资管或任何附属公司随时可能替向报告内容所述及的公司提供服务、招揽或业务往来。以上数据为天风国际资管拥有并受版权及知识产权法保护。除非事先得到天风国际资管明确书面批准，否则不应复制、散播或发布。<br />
				有关投资的一般风险，请参阅本公司网页<a href="https://www.tfisec.com/zh_CN/risk">《风险披露声明》</a>。
			</p>
			<p v-if="currentLang=='EN'">
				This publication is distributed in Hong Kong by TFI Asset Management Limited (“TFIAM”), which is regulated by the Securities and Futures Commission of Hong Kong (“SFC”) and is licensed for the
				conduct of Regulated Activity Type 4 (Advising on Securities), Type 5 (Advising on Futures Contracts), and Type 9 (Asset Management) of Part V of the Securities and Futures Ordinance (Cap.
				571) (“SFO”) with Central Entity ASF056.<br />
				Information contained herein is based on sources that TFIAM believed to be accurate. TFIAM does not bear responsibility for any loss occasioned by reliance placed upon the contents hereof. The
				information is for informative purposes only and is not intended to or create/induce the creation of any binding legal relations. The information provided do not constitute investment advice,
				solicitation, purchase or sell any investment product(s). Investments are subject to investment risks including possible loss of the principal amount invested. You should consult your
				Financial Advisor for investment advice based on your investment experience, financial situation, any of your particular needs and risk preference.<br />
				TFIAM and/or its representatives may have positions/ interests in relevant investment products. TFIAM and/or its affiliates may from time to time provide services for, or solicit services or
				other business from, any company mentioned in this report. The above information is owned by TFIAM and protected by copyright and intellectual property Laws. It may not be reproduced,
				distributed or published for any purpose without prior written consent from TFIAM.<br />
				For general risks relevant to investment activities, please refer to <a href="https://www.tfisec.com/en_US/risk">the Risk Disclosures Statement</a>.
			</p>
		</div>
	</div>
</template>

<script>
// import { ScrollTop } from '../assets/common'
import { request } from '../assets/utils'

export default {
	data () {
		return {
			dateRange: '',
			documentWidth: 0,
			newsList: [],
			category: '',
			toggleInput: false,
			keyword: '',
			pagination: {
				total: 0,
				pageSize: 10,
				page: 1
			},
			tagObj: {
				1: '买入',
				2: '增持',
				3: '持有',
				4: '卖出',
				5: '强于大市',
				6: '中性',
				7: '弱于大市',
				8: '未上市',
				9: '未有评级',
			},
			tagColor: {
				1: '#FE325E',
				2: '#ED8500',
				3: '#979797',
				4: '#1ED489',
				5: '#FE325E',
				6: '#979797',
				7: '#1ED489',
				8: '#979797',
				9: '#979797',
			},
			currentLang: 'CN',
			searchParams: {
				category: '',
				endDate: '',
				initiation: '',
				pageNum: '',
				researcher: '',
				startDate: '',
				summary: '',
				title: '',
			}
		}
	},
	mounted () {
		this.getList()
	},
	methods: {
		formSearch (e) {
			e.preventDefault();
			this.searchParams.startDate = this.dateRange && this.dateRange[0] || ''
			this.searchParams.endDate = this.dateRange && this.dateRange[1] || ''
			this.searchParams.title = ''
			this.searchParams.keyword = ''
			this.searchParams.summary = ''
			this.pagination.page = 1
			if (this.category) {
				this.searchParams[this.category] = this.keyword
			} else {
				this.searchParams.keyword = this.keyword
			}
			this.getList()
			console.log(this.searchParams)

		},
		currentChange (page) {
			console.log(page, 'page----')
			this.searchParams.pageNum = page
			this.getList()
		},
		async getList () {
			let options = {
				url: '/api/reports/list',
				method: 'get',
				data: this.searchParams
			}
			try {
				let data = await request(options);
				this.pagination.total = data.total
				this.newsList = data.list;
				this.newsList.forEach(item => {
					if (item.cCompany) {
						item.cCompany = JSON.parse(item.cCompany).join(' ')
					}
					if (item.cIndustry) {
						item.cIndustry = item.cIndustry.substring(0,item.cIndustry.lastIndexOf('&'));
					}
				})
				console.log(data, '获取列表')
			} catch (error) {
				console.log(error)
			}
		}
	},
}
</script>

<style lang="less" scoped>
// @import url('~/assets/less/custom.less');
.home {
	padding-bottom: 30px;
	.bg-img(@name) {
		background: url('../assets/images/@{name}') no-repeat;
		background-size: 100% 100%;
	}
	.search-group {
		background-color: #f9f9f9;
		padding: 40px 0;
		overflow: hidden;
		.wrap {
			margin: auto;
			max-width: 1200px;
			padding: 0 30px;
		}
		.flex-row {
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
		}
		.form-group {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			/deep/.el-date-editor .el-range-separator {
				width: 10%;
			}
			.form-control {
				border: 1px solid #dcdfe6;
				box-shadow: none;
				&:focus {
					box-shadow: none;
				}
			}
			label {
				width: 85px;
			}
			input,
			select {
				height: 40px;
			}
		}
		.search-btn {
			text-align: right;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
		}
		.btn-warning {
			background-color: #ed8500;
			border: none;
			height: 40px;
			width: 120px;
			&:focus {
				border: none;
				outline: none;
			}
		}
		.trangle {
			position: relative;
			display: inline-block;
			width: 40px;
			height: 40px;
			background-color: #fff;
			border: 1px solid #e5e5e5;
			vertical-align: middle;
			cursor: pointer;
			&::before {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				content: '';
			}
			&.down::before {
				.triangle-down(7.5px,#ED8500);
			}
			&.up {
				&::before {
					.triangle-up(7.5px,#ED8500);
				}
			}
		}
	}
	.section {
		color: #161616;
		.h1-title {
			font-size: 24px;
			font-weight: 600;
			margin-bottom: 20px;
			span {
				cursor: pointer;
			}
		}
		.sec-block {
			padding: 30px 0;
			border-bottom: 1px solid #e5e5e5;
		}
		.content {
			color: #161616;
			font-size: 16px;
			height: 88px;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
			-webkit-line-clamp: 4;
			line-height: 1.4;
		}
		@media (min-width: 768px) {
			.tag-group > div {
				margin: 10px 30px 10px 0;
			}
		}
		@media (max-width: 768px) {
			.tag-group > div {
				margin: 10px 20px 10px 0;
			}
		}
		.tag-group {
			display: flex;
			flex-wrap: wrap;
			margin-top: 17px;
			color: #8e8e8e;
			& > div {
				min-width: 140px;
				font-size: 14px;
				// margin: 10px 20px 10px 0;
			}

			.date {
				.date-txt {
					vertical-align: bottom;
				}
			}
			.label-txt {
				color: #ed8500;
				span {
					vertical-align: text-top;
				}
			}
			.user {
				span {
					vertical-align: text-top;
				}
			}
			.tag-options {
				.tag-item {
					display: inline-block;
					padding: 2px;
					border: 2px solid #979797;
					font-size: 12px;
					transform: scale(0.75);
				}
			}
		}
	}
	.pagination-box {
		text-align: right;
		margin: 20px 0;
	}
	.declaration {
		background-color: #fdf2e5;
		position: relative;
		padding: 30px;
		padding-top: 70px;
		margin: auto;
		max-width: 1200px;
		a {
			color: #ed8500;
		}
		.switch-lang {
			position: absolute;
			display: flex;
			width: 120px;
			height: 28px;
			right: 30px;
			top: 30px;
			color: #161616;

			span:first-child {
				border-right: none;
			}
			span:last-child {
				border-left: none;
			}
			span {
				display: inline-block;
				width: 58px;
				height: 27px;
				text-align: center;
				line-height: 28px;
				border: 1px solid #161616;
				cursor: pointer;
			}
			span.active {
				background-color: #ed8500;
				color: #fff;
				border: 1px solid #ed8500;
			}
		}
		.title {
			font-size: 20px;
			margin-bottom: 20px;
			font-weight: 600;
		}
		p {
			line-height: 1.5;
		}
	}
}
</style>
