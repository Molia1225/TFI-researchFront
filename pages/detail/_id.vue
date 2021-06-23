<!--
 * @Autor: XinWei
 * @Date: 2021-04-15 15:05:15
 * @LastEditors: XinWei
 * @LastEditTime: 2021-06-08 16:47:10
 * @Description: 研报详情页
-->
<template>
	<div class='article-detail'>
		<div class="container">
			<div class="h1-title">
				<p>{{detailInfo.cTitle}}</p>
				<p style="font-size:26px;margin-top:8px;">{{detailInfo.eTitle}}</p>
			</div>
			<div class="tag-group">
				<div class="date">
					<svg-icon icon-class="date"></svg-icon>
					<span class="date-txt">{{detailInfo.releaseDate}}</span>
				</div>
				<div class="label-txt" v-if="detailInfo.cCompany">
					<svg-icon icon-class="label"></svg-icon>
					<span>{{detailInfo.cCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{detailInfo.cIndustry}}</span>
				</div>
				<div class="user" v-if="detailInfo.cResearcher">
					<svg-icon icon-class="user"></svg-icon>
					<span>{{detailInfo.cResearcher}}</span>
				</div>
				<div
					class="tag-options"
					v-if="detailInfo.initiation"
				>
					<span class="tag-item">{{detailInfo.initiation&&tagObj[detailInfo.initiation].substr(0,1)}}</span>
					<span :style="{color:tagColor[detailInfo.initiation]}">{{tagObj[detailInfo.initiation]}}</span>
				</div>
			</div>
			<div class="abstract">
				摘要/Abstract
			</div>
			<div class="abstract-content well well-lg">
				{{detailInfo.summary}}
			</div>
			<div class="article-title">
				正文/Body
			</div>
			<div
				class="article-content"
				v-html="detailInfo.content"
			>
			</div>
			<div class="file-title">试读结束，请下载以阅读更多详细内容</div>
			<div
				class="file-content well"
				@click="dialogVisible=true"
			>
				<svg-icon icon-class="pdf"></svg-icon> {{detailInfo.annexUrl}}
			</div>
			<div class="exceptions well">
        <div class="switch-lang">
          <span :class="currentLang=='CN'&&'active'" @click="currentLang='CN' ">CN</span>
          <span :class="currentLang=='EN'&&'active'" @click="currentLang='EN'">EN</span>
        </div>
				<div class="title">免责声明/Disclaimer</div>
				<div class="content" v-if="currentLang=='CN'">
          <p class="p-title">分析师声明</p>
          <p>本出版物署名分析师在此声明：本报告所表述的所有观点均准确地反映了分析师对目标证券和发行人的个人看法。分析师所得报酬的任何部分不曾与，不与，也将不会与本报告中的具体投资建议或观点有直接或间接联系。分析师所得报酬的任何部分也不与天风证券股份有限公司（“天风证券”）或其下属公司开展的任何投资银行业务有联系。</p>
          <p class="p-title">一般声明</p>
          <p>本出版物内出现的名词“天风集团”意指天风证券股份有限公司及其全球范围内的附属公司和分支公司，包括天风国际资产管理有限公司。本出版物及其内含的所有材料是由天风集团以及（如适用）在第一页或本出版物其他地方注明了的工作人员所属的一个或多个天风集团旗下公司准备的。</p>
          <p>本出版物的所有内容均属机密，仅供天风集团的客户使用，天风集团不因收件人仅仅收到本出版物而视其为天风集团的客户。本出版物中的信息均来源自我们认为可靠的来源，但天风集团对这些信息的准确性及完整性不作任何保证。本出版物中的信息、意见等均仅供天风集团的客户参考，不构成所述证券买卖的出价或征价邀请或要约。该等信息、意见并未考虑到获取本出版物人员的具体投资目的、财务状况以及特定需求，在任何时候均不构成对任何人的个人推荐。天风集团的客户应当对本出版物中的信息和意见进行独立评估，并应同时考虑各自的投资目的、财务状况和特定需求，必要时就法律、商业、财务、税收等方面咨询专业和财务顾问的意见。对依据或者使用本出版物所造成的一切后果，天风集团不承担任何法律责任。如果向任何接收人提供本出版物，本出版物的提供仅基于接收人有能力独立判断投资风险,能对自己投资决策有独立判断能力，并能根据自己对潜在投资带来的机会和风险、市场因素和其他投资考虑因素的独立判断来做出投资决策。</p>
          <p>本出版物所载的意见、评估及预测仅为本出版物发布之时的意见、评估及预测。该等意见、评估及预测无需通知即可随时更改。除另有说明外，所引用的任何业绩数据都代表过往的表现。过往的表现亦不应作为日后表现的可靠预示。在不同时期，天风集团可能会发出与本出版物所载意见、评估及预测不一致的研究报告。本出版物中不含任何关于预测收益一定可以实现的表达或保证。在分析当中有决定收益的相关假设。这些假设的改变可能对本出版物预测的收益产生重大影响。</p>
          <p>天风集团的销售人员、交易人员以及其他专业人士可能会依据不同假设和标准、采用不同的分析方法而口头或书面发表与本出版物意见及建议不一致的市场评论和/或交易观点，并且得出与本出版物意见及建议不一致的结论。天风集团没有将此意见及建议向出版物所有接收者进行更新的义务。天风集团的资产管理部门、自营部门以及其他投资业务部门可能独立做出与本出版物中的意见或建议不一致的投资决策。</p>
          <p class="p-title">特别声明</p>
          <p>天风集团对于在研究业务当中可能产生的利益冲突有着完备的辨识和管理章程。天风集团的分析师以及其他参与本研究出版物撰写和宣传的员工有着独立于天风集团投资银行业务线的管理体系。投资银行、自营交易以及研究业务各自之间有着信息壁垒，确保任何机密以及/或者价格敏感信息被妥善处置。</p>
          <p>本出版物中所示分析师及/或支援人员、以及天风集团的销售人员、交易人员以及其他专业人士可能不时与我们的客户讨论各种交易策略，其中提及的交易策略可能会涉及对本出版物讨论的股票证券市场价格产生短期影响的助动因素或事件。这些影响可能与分析师对股票的预期价格产生抵触。但是任何此类的交易策略不同于也不会影响分析师对股票的基本评级。</p>
          <p>在适用法律许可的情况下，天风集团可能会持有本出版物中提及公司所发行的证券并进行交易，也可能为这些公司提供或争取提供投资银行、财务顾问和金融产品等各种金融服务。因此，天风集团的客户应当考虑到天风集团及/或其相关人员可能存在影响本出版物及其中表达的观点客观性的潜在利益冲突，天风集团的客户在作出决策时，包括但不限于在作出投资决策时，请勿依赖本出版物中的意见。</p>
          <p>
            <strong>香港</strong>：
            本出版物在香港由天风国际资产管理有限公司（中央编号：ASF056）发布。天风国际资产管理有限公司是受香港证券及期货事务监察委员会监管并在其核准下开展《证券及期货条例》（第571章）内的第4类受规管活动（就证券提供意见）、第5类受规管活动（就期货合约提供意见）和第9类受规管活动（提供资产管理）。香港地区读者有任何关于本出版物的疑义可以直接咨询本公司香港销售代表。
          </p>
          <p>
            <strong>新加坡</strong>：
            本出版物在新加坡由天风国际资产管理有限公司发布。本出版物仅意欲向新加坡的机构投资者（如新加坡法例第289章《证券及期货法》所定义）发布。本出版物的收件人不应该向机构投资者之外的人传播本出版物。
          </p>
          <p>
            <strong>美利坚合众国</strong>：
            本出版物在美国由天风国际资产管理有限公司根据《1934年美国证券交易法》第15a-6条发布，并且只能向“主要美国机构投资者”（如第15a-6条所定义）发布。天风国际资产管理有限公司不是美国注册经纪交易商。
          </p>
          <p>本出版物首页所列的分析师不是在美国金融业监管局（FINRA）注册或取得资格的研究分析师，不受FINRA第2711条关于与研究对象公司沟通、公开露面以及研究分析师交易证券有关的限制。</p>
          <p>
            <strong>其他司法管辖地区</strong>：
            研究出版物在其他司法管辖地区下的发布可能会受限于当地适用之法规，但在合规于特定司法管辖下的法律法规后会变得可行。本研究出版物不针对或旨在分发于任何属于或位于任何分布，出版，供应或使用此类研究出版物属违法之地区，州，国家或其他司法管辖区的公民或居民的任何个人或实体。
          </p>
          <p class="p-title">
            评级定义
          </p>
          <table>
            <tr><td colspan="4">投资评级</td></tr>
            <tr>
              <td>类别</td>
              <td>说明</td>
              <td>评级</td>
              <td>体系</td>
            </tr>
            <tr>
              <td rowspan="4">股票投资评级</td>
              <td rowspan="4">在报告发布日期后的6个月内，相对同期该股票的司法管辖区之指数的涨跌幅</td>
              <td>买入</td>
              <td>预期股价相对收益20%以上</td>
            </tr>
            <tr>
              <td>增持</td>
              <td>预期股价相对收益10%到20%</td>
            </tr>
            <tr>
              <td>中立</td>
              <td>预期股价相对收益-10%到10%</td>
            </tr>
            <tr>
              <td>持有</td>
              <td>预期股价相对收益-10%</td>
            </tr>
            <tr>
              <td rowspan="3">行业投资评级</td>
              <td rowspan="3">在报告发布日期后的6个月内，相对同期该行业的司法管辖区之指数的涨跌幅</td>
              <td>强于大市</td>
              <td>预期行业指数涨幅5%以上</td>
            </tr>
            <tr>
              <td>中性</td>
              <td>预期行业指数涨幅 -5%到5%</td>
            </tr>
            <tr>
              <td>弱于大市</td>
              <td>预期行业指数涨幅 -5%以下</td>
            </tr>
          </table>
          <table style="margin:10px 0;width:77.68%;">
            <thead>
              <tr>
                <th>管辖区</th>
                <th>用于定义评级的指数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>中国大陆</td>
                <td>沪深300指数</td>
              </tr>
              <tr>
                <td>中国-香港</td>
                <td>恒生指数</td>
              </tr>
              <tr>
                <td>中国-澳门</td>
                <td>恒生指数</td>
              </tr>
              <tr>
                <td>美国</td>
                <td>标准普尔500指数</td>
              </tr>
            </tbody>
          </table>
          <p>本出版物版权归天风集团所有。任何未经天风集团书面允许的发布、复制、出版以及引用均属未授权行为。</p>
        </div>
				<div class="content" v-else>
          <p class="p-title">Analyst Statement </p>
          <p>Each research analyst identified in this publication certifies that all of the views expressed in this publication by such analyst accurately reflect the personal views of each such analyst about the subject securities and issuers. In addition, each research analyst identified in this publication certifies that no part of the analyst’s compensation was, is or will be, directly or indirectly related to the specific investment recommendations or views expressed in this publication, nor is it tied to any specific investment banking transactions performed by Tianfeng Securities Co., Ltd or any other affiliates and subsidiaries globally.</p>
          <p class="p-title">General Disclosures</p>
          <p>The term "TF Group" used in this publication refers to Tianfeng Securities Co., Ltd. and its affiliates and subsidiaries globally, including TFI Asset Management Limited (CE No.: ASF056). This publication and all materials contained in it has been prepared by the TF Group and, if applicable, with the contributions of one or more TF Group entities whose employees are specified on page 1 or identified elsewhere in the publication.</p>
          <p>The contents contained in this publication is confidential and only for the use of clients of TF Group. TF Group will not deem a recipient as its client by reason only of their receiving this publication. Information herein has been obtained from sources believed to be reliable, but TF Group does not warrant its accuracy or completeness. The information and opinions contained herein are provided for TF Group clients’ reference only and should not be construed as an offer to buy or sell or the solicitation of an offer to buy or sell the securities mentioned. The information and opinions contained herein do not take into account the particular investment objectives, financial situation, or needs of any recipient. Under no circumstances shall the information contained herein or the opinions expressed herein constitute a personal recommendation to anyone. TF Group clients are advised to make their own independent evaluation of the information contained in this publication, consider their own individual investment objectives, financial situation and particular needs and consult their own professional and financial advisers as to the legal, business, financial, tax and other aspects if necessary. TF Group shall not be liable in any manner whatsoever for any consequences of any reliance thereon or usage thereof. To the extent this material is provided to any recipient, this material is provided solely on the basis that the recipient has the capability to independently evaluate investment risk and is exercising independent judgment in evaluating investment decisions in that its investment decisions will be based on its own independent assessment of the opportunities and risks presented by a potential investment, market factors and other investment considerations.</p>
          <p>Opinions, speculations and predictions contained in this publication reflect opinions held, and speculations and predictions made, at the time of publication. Such opinions, speculations and predictions are subject to change and may be amended without any notification. Unless stated otherwise, any performance data quoted represents past performance.  Past performance shall not be considered as a reliable indication of future performance. At different periods, TF Group may release publications which are inconsistent with the opinions, speculations and predictions contained herein.  No representation or warranty is made that any returns indicated will be achieved. Certain assumptions may have been made in the analysis which has resulted in any returns detailed herein. Changes to the assumptions may have a material impact on any returns detailed.</p>
          <p>TF Group’s salespeople, traders, and other professionals may provide oral or written market commentary and/or trading ideas that may be inconsistent with, and reach different conclusions from, the recommendations and opinions presented in this publication. Such ideas or recommendations reflect the different assumptions, views and analytical methods of the persons who prepared them, and TF Group is under no obligation to ensure that such other trading ideas or recommendations are brought to the attention of any recipient of this publication. TF Group’s asset management area, proprietary trading desks and other investing businesses may make investment decisions that are inconsistent with the recommendations or opinions expressed in this publication.</p>
          <p class="p-title">Special Disclosures</p>
          <p>TF Group has procedures in place to identify and manage any potential conflicts of interest that arise in connection with its research business. TF Group’s analysts and other employees who are involved in the preparation and dissemination of research publications operate and have a management reporting line independent of TF Group’s Investment Banking business. Information barrier procedures are in place between the Investment Banking, proprietary trading, and research businesses to ensure that any confidential and/or price sensitive information is handled in an appropriate manner.</p>
          <p>The analysts and/or Research Support named in the publications, as well as TF Group’s salespeople, traders, and other professionals, may have, from time to time, discussed with our clients, including TF Group’s salespeople, traders, and other professionals, or may discuss in the publications, trading strategies that reference catalysts or events that may have a near-term impact on the market price of the equity securities discussed in the publications, which impact may be directionally counter to the analysts’ published price target expectations for such stocks. Any such trading strategies are distinct from and do not affect the analysts’ fundamental equity rating for such stocks as described herein.</p>
          <p>To the extent permitted by applicable laws, TF Group may have positions in, and may effect transactions in securities of companies mentioned herein and may also perform or seek to perform investment banking, financial consulting, financial products and various financial services for those companies. Therefore, TF Group’s clients should be aware that TF Group and/or its associated person(s) may have a conflict of interest that could affect the objectivity of this publication and the opinions expressed herein. TF Group’s clients are advised not to rely on the opinions contained in this publication when making any decision, including without limitation any investment decision.</p>
          <p>
            <strong>Hong Kong</strong>：
            This publication is distributed in Hong Kong by TFI Asset Management Limited, which is regulated by the Securities and Futures Commission of Hong Kong (“SFC”) and is licensed for the conduct of Regulated Activity Type 4 (Advising on Securities), Type 5 (Advising on Futures Contracts), and Type 9 (Asset Management) of Part V of the Securities and Futures Ordinance (Cap. 571) (“SFO”).  Queries concerning this publication from readers in Hong Kong should be directed to our Hong Kong sales representatives. 
          </p>
          <p>
            <strong>Singapore</strong>：
            This publication is distributed in Singapore by TFI Asset Management Limited. It is only intended for, and may be distributed only to, institutional investors in Singapore (as defined in the Securities and Futures Act, Chapter 289 of Singapore). Recipients of this publication should not further distribute this publication to any person that is not an institutional investor.
          </p>
          <p>
            <strong>United States of America</strong>：
            This publication is distributed in the United States by TFI Asset Management Limited pursuant to Rule 15a-6 under the United States Securities Exchange Act of 1934.  Distribution is restricted to "Major U.S. Institutional Investors" only (as defined in Rule 15a-6.  TFI Asset Management Limited is not a U,S, registered broker-dealer.
          </p>
          <p>The analyst(s) listed on the first page of this publication is (are) not registered or qualified as a research analyst with the Financial Industry Regulatory Authority (FINRA) and are not subject to U.S. FINRA Rule 2711 restrictions on communications with companies that are the subject of this research report; public appearances; and trading securities by a research analyst. </p>
          <p>
            <strong>Other Jurisdictions</strong>：
            The distribution of research publications in other jurisdictions may be restricted by law and such reports will be made available in other jurisdictions pursuant to the applicable laws and regulations in those particular jurisdictions.   The research publications are not directed to, or intended for distribution to or use by, any person or entity that is a citizen or resident of or located in any locality, state, country or other jurisdictions where such distribution, publication, availability or use would be contrary to law or regulation.
          </p>
          <p class="p-title">
            Ratings Definitions
          </p>
          <table>
            <tr><td colspan="4">Investment Ratings</td></tr>
            <tr>
              <td>Category</td>
              <td>Description</td>
              <td>Ratings</td>
              <td>System</td>
            </tr>
            <tr>
              <td rowspan="4">Stock investment ratings</td>
              <td rowspan="4">within 6 months from the report issuance date, increase or decrease relative to the Index of the jurisdiction of the Stock in the same period</td>
              <td>Buy</td>
              <td>Stock investment ratings	within 6 months from the report issuance date, increase or decrease relative to the Index of the jurisdiction of the Stock in the same period	Buy	Expected relative return over stock price above 20%</td>
            </tr>
            <tr>
              <td>Accumulate</td>
              <td>Accumulate	Expected relative return over stock price between 10% and 20%</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>Expected relative return over stock price between -10% and 10%</td>
            </tr>
            <tr>
              <td>Sell</td>
              <td>Expected relative return over stock price below -10%</td>
            </tr>
            <tr>
              <td rowspan="3">Industry investment ratings</td>
              <td rowspan="3">within 6 months from the report issuance date, increase or decrease relative to the Index of the jurisdiction of the Industry in the same period</td>
              <td>Outperform</td>
              <td>Industry investment ratings	within 6 months from the report issuance date, increase or decrease relative to the Index of the jurisdiction of the Industry in the same period	Outperform	Expected increase of industry index over 5%</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>Neutral	Expected increase of industry index between -5% and 5%</td>
            </tr>
            <tr>
              <td>Underperform</td>
              <td>		Underperform	Expected increase of industry index below -5%</td>
            </tr>
          </table>
          <table style="margin:10px 0;width:77.68%;">
            <thead>
              <tr>
                <th>Jurisdictions </th>
                <th>Jurisdictions Index Used for Ratings Definitions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>China Mainland</td>
                <td>CSI 300 Index</td>
              </tr>
              <tr>
                <td>China-Hong Kong</td>
                <td>China-Hong Kong	Hang Seng Index</td>
              </tr>
              <tr>
                <td>China-Marco</td>
                <td>Hang Seng Index</td>
              </tr>
              <tr>
                <td>USA</td>
                <td>Standard & Poor’s 500 Index</td>
              </tr>
            </tbody>
          </table>
          <p>Copyright of the publications belong to TF Group. Any form of unauthorized distribution, reproduction, publication, release or quotation is prohibited without TF Group’s written permission.</p>
        </div>
			</div>
		</div>
		<el-dialog
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			:width="clientWidth>768?'920px':'80%'"
			center
		>
			<template v-if="errorValidate">
				<div
					class="dialog-title hidden-xs"
					slot="title"
				>验证失败</div>
				<div
					class="dialog-m-title visible-xs"
					slot="title"
				>验证失败</div>
				<div class="error-content hidden-xs">
					<p>您填写的邮箱地址暂未开通研报下载权限，请重新输入，或联系对口销售或邮至<span style="color:#ED8500;">equity@tfisec.com</span></p>
					<p>Invaild email address,please enter again. If you need to access the English reports, please contact our sales team or email <span style="color:#ED8500;">equity@tfisec.com</span></p>
				</div>
				<div class="m-error-content visible-xs">
					<p>您填写的邮箱地址暂未开通研报下载权限，请重新输入，或联系对口销售或邮至<span style="color:#ED8500;">equity@tfisec.com</span></p>
					<p>Invaild email address,please enter again. If you need to access the English reports, please contact our sales team or email <span style="color:#ED8500;">equity@tfisec.com</span></p>
				</div>
			</template>
			<template v-else>
				<div
					class="dialog-title hidden-xs"
					slot="title"
				>研报权限验证</div>
				<div
					class="dialog-m-title visible-xs"
					slot="title"
				>研报权限验证</div>
				<div class="form-content hidden-xs">
					<div class="form-title">
						<p>请填写您在机构股票部登记的公司邮箱</p>
						<p>Please fill your company email registered in TFI Institutional Equity Department</p>
					</div>
					<div class="text-area">
						<el-input
							type="textarea"
							:rows="3"
							maxlength="100"
							style="font-size:20px;"
							placeholder="请填写您在机构股票部登记的公司邮箱,Please fill your company email registered in TFI Institutional Equity Department"
							v-model="downloadParams.email"
						>
						</el-input>
					</div>
					<div class="radio-item">
						<div class="radio">
							<el-checkbox v-model="downloadParams.send"></el-checkbox>
						</div>
						<div class="caption">
							<p style="font-size:20px">同时将研报全文发送至该邮箱地址</p>
							<p style="font-size:16px;">Sent reports to the email address above</p>
						</div>
					</div>
					<div class="radio-item">
						<div class="radio">
							<el-checkbox v-model="radio"></el-checkbox>
						</div>
						<div class="caption">
							<p style="font-size:20px">本人已阅读并知晓天风国际证券免责条款</p>
							<p style="font-size:16px;">I have read and accept the TFI Excepctions Terms and Disclosures.</p>
						</div>
					</div>
				</div>
				<div class="m-form-content visible-xs">
					<div class="form-title">
						<p>请填写您在机构股票部登记的公司邮箱</p>
						<p>Please fill your company email registered in TFI Institutional Equity Department</p>
					</div>
					<div class="text-area">
						<el-input
							type="textarea"
							:rows="3"
							placeholder="请填写您在机构股票部登记的公司邮箱,Please fill your company email registered in TFI Institutional Equity Department"
							v-model="downloadParams.email"
						>
						</el-input>
					</div>
					<div class="radio-item">
						<div class="radio">
							<!-- <el-radio
								v-model="downloadParams.send"
								label='1'
                @click="downloadParams.send=downloadParams.send==1?'0':'1'"
							>
							</el-radio> -->
							<el-checkbox v-model="downloadParams.send"></el-checkbox>
						</div>
						<div class="caption">
							<p style="font-size:12px">同时将研报全文发送至该邮箱地址</p>
							<p style="font-size:11px;">Sent reports to the email address above</p>
						</div>
					</div>
					<div class="radio-item">
						<div class="radio">
							<el-checkbox v-model="radio"></el-checkbox>
						</div>
						<div class="caption">
							<p style="font-size:12px">本人已阅读并知晓天风国际证券免责条款</p>
							<p style="font-size:11px;">I have read and accept the TFI Excepctions Terms and Disclosures.</p>
						</div>
					</div>
				</div>
			</template>
			<div
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					type="primary"
					:style="clientWidth>768?'width:100%;height:60px;font-size:20px;':'width:100%;'"
					@click="submitDownload"
				>确认/Confirm</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { request } from '../../assets/utils'
import axios from 'axios'
export default {
	components: {},
	data () {
		return {
			dialogVisible: false,
			clientWidth: 0,
			detailInfo: {},
      currentLang:'CN',
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
			downloadParams: {
				email: '',
				reportId: this.$route.query.id,
				send: false,
			},
			radio: '',
			emailReg: /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/,
			errorValidate: false
		};
	},
	mounted () {
		if (window) {
			this.clientWidth = document.body.clientWidth;
		}
		this.getDetail()
	},

	methods: {
		async getDetail () {
			let options = {
				url: '/api/reports/view',
				method: 'get',
				data: { id: this.$route.query.id }
			}
			try {
				this.detailInfo = await request(options);
        if(this.detailInfo.cCompany){
          this.detailInfo.cCompany = JSON.parse(this.detailInfo.cCompany).join(' ')
        }
        if(this.detailInfo.cIndustry){
          this.detailInfo.cIndustry = this.detailInfo.cIndustry.substring(0,this.detailInfo.cIndustry.lastIndexOf('&'));
        }
			} catch (error) {
				console.log(error)
			}
		},
		validate () {
			return new Promise((resolve, reject) => {
				if (!this.downloadParams.email) {
					this.$message({
						message: '请先填写邮箱',
						type: 'warning'
					});
					return
				}
				if (!this.emailReg.test(this.downloadParams.email)) {
					this.$message({
						message: '邮箱格式错误',
						type: 'error'
					});
					return
				}
				if (!this.radio) {
					this.$message({
						message: '请先勾选天风国际证券免责条款',
						type: 'warning'
					});
					return
				}
				resolve()
			})
		},
		async submitDownload () {
			if (this.errorValidate) {
				this.dialogVisible = false;
				this.downloadParams.email = ''
				this.radio = false
				this.downloadParams.send = false
				setTimeout(() => { this.errorValidate = false }, 1000)
			} else {
				this.validate().then(async res => {
					console.log(this.downloadParams)
					let options = {
						url: '/api/reports/checkPower?email=' + this.downloadParams.email,
						method: 'get',
					}
					try {
						let data = (await request(options));
						let send = this.downloadParams.send ? '1' : '0'
						if (data) {
							this.dialogVisible = false
							let downloadUrl = `${G_ENV.baseUrl}/api/reports/download?email=${this.downloadParams.email}&reportId=${this.$route.query.id}&send=${send}`
              location.href=downloadUrl
						} else {
							this.errorValidate = true
						}
					} catch (error) {

					}
				})
			}
		}
	},
}
</script>
<style lang='less' scoped>
.article-detail {
	color: #161616;
	padding: 50px 0;
	.h1-title {
		font-size: 30px;
	}
	@media (min-width: 768px) {
		.tag-group > div {
			margin: 10px 30px 10px 0;
			/deep/.el-dialog__close.el-icon {
				font-size: 30px;
			}
		}
	}
	@media (max-width: 768px) {
		.tag-group > div {
			margin: 10px 20px 10px 0;
		}
		/deep/.el-dialog__close.el-icon {
			font-size: 20px;
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
			margin-top: 8px;
			.tag-item {
				display: inline-block;
				padding: 2px;
				border: 2px solid #979797;
				font-size: 12px;
				transform: scale(0.75);
			}
			.tag-buy {
				color: #fe325e;
			}
		}
	}
	.abstract,
	.article-title,
	.file-title {
		font-size: 20px;
		margin-top: 80px;
		font-weight: 600;
	}
	.abstract-content,
	.file-content,
	.exceptions {
		margin-top: 10px;
		border: none;
		box-shadow: none;
		background-color: #f9f9f9;
	}
	.abstract-content {
		line-height: 1.5;
	}
	.article-content {
		margin-top: 10px;
		/deep/p {
			line-height: 1.5;
		}
		/deep/img {
			max-width: 100%;
			height: auto;
		}
	}
	.file-content {
		cursor: pointer;
	}
	.exceptions {
		background-color: #fdf2e5;
    position:relative;
    .switch-lang{
      position: absolute;
      display:flex;
      width:120px;
      height:28px;
      right:30px;
      top:30px;
      color:#161616;
      
      span:first-child{
        border-right:none;
      }
      span:last-child{
        border-left:none;
      }
      span{
        display: inline-block;
        width:58px;
        height:27px;
        text-align: center;
        line-height: 28px;
        border:1px solid #161616;
        cursor: pointer;
      }
      span.active{
        background-color: #ED8500;
        color:#fff;
        border:1px solid #ED8500;
      }
    }
		.title {
			font-size: 20px;
			margin-bottom: 20px;
			font-weight: 600;
		}
		.content {
			max-height:300px;
			overflow: auto;
			font-size: 14px;
			line-height: 1.5;
      .p-title{
        font-weight: 600;
        margin-top:5px;
      }
      p{
        margin-bottom: 5px;
      }
      table{
        td,th{
          border:1px solid #ccc;
          padding:5px;
        }
        th{
          font-weight: 600;
        }
      }
		}
	}
	.dialog-title {
		font-size: 30px;
		font-weight: 600;
		margin-top: 5%;
	}
	.dialog-m-title {
		font-size: 18px;
		font-weight: 600;
	}
	.dialog-footer {
		padding: 0 10%;
		margin-bottom: 5%;
	}
	.form-content,
	.m-form-content {
		padding: 0 10%;
	}
	.form-title {
		font-size: 20px;
		p {
			line-height: 1.4;
			color: #161616;
		}
		p:last-child {
			font-size: 18px;
		}
	}
	.text-area {
		margin-top: 5%;
	}
	.radio-item {
		display: flex;
		margin-top: 30px;
	}
	.caption {
		line-height: 1.4;
		color: #161616;
		margin-left: 15px;
	}
	.radio {
		transform: scale(1.8);
		margin: 20px 10px 0 -23px;
		/deep/.el-radio__label {
			opacity: 0;
		}
	}

	.m-form-content {
		padding: 0;
		.form-title {
			font-size: 14px;
			P:last-child {
				font-size: 11px;
			}
		}
		.text-area {
			font-size: 12px;
		}
		.radio-item {
			margin-top: 15px;
			.radio {
				transform: scale(1.1);
				margin: 5px -10px 0 -19px;
			}
			.caption {
				width: 100%;
			}
		}
	}
	.error-content,
	.m-error-content {
		padding: 0 10%;
		font-size: 20px;
		p {
			line-height: 1.5;
		}
		p:last-child {
			margin-top: 15px;
			font-size: 16px;
		}
	}
	.m-error-content {
		font-size: 14px;
	}
}
</style>