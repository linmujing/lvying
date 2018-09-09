<template>
  <div>
    <!--导航栏-->
    <div class="nav">
      <ul class="list_unstyled ul_inline clearfix font_18 navbar box_center_1200">
        <li class="pointer" v-for="(item,index) in navDataModel" :key="index" @click='tabClick(index)'>
          <a href="javascript:void(0)" class="color_fff listItem">{{item}}</a>
        </li>
      </ul>
    </div>
    <div class="box_center_1200 detailBox">
      <Row class="margin_top_30">
        <Col span="12">
          <div class="width_600px height_400px border"></div>
        </Col>
        <Col span="12" class="padding_20">
          <div class="font_20 font_weight_bold text_ellipsis">常见民事纠纷裁判思路与规则起草</div>
          <div class="color_999 twoline_ellipsis margin_top_20">帮助拥有知识产权的企业起草和完善知识产权许可使用合同帮助拥有知识产权的企业起草和完善知识产权许可使用合同</div>
          <div class="clearfix margin_top_30">
            <div class="float_left">
              <Rate show-text allow-half disabled v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
              </Rate>
            </div>
            <div class="float_left color_999 line_height_30px margin_left_30">1234人看过</div>
          </div>
          <div class="margin_top_30">
            <p><span class="color_title font_20">￥500.00</span></p>
          </div>
          <div class="margin_top_50">
            <Button size="large" type="warning" shape="circle">加入购物车</Button>
            <Button size="large" type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
          </div>
        </Col>
      </Row>
      <Row class="margin_top_50">
      	<Col span="18">
      		<!--商品详情-->
          <div id="detail1" class="">
            <Affix>
              <div class="bg_f5 clearfix border_e6">
                <a href="#detail1" @click="anchorBtn(0)" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">商品详情</a>
                <a href="#detail2" @click="anchorBtn(1)" :class="{cur:isCur == 1}" class="inline_block padding_20_15 width_150px">商品评价</a>
              </div>
            </Affix>
            <!--商品详情-->
		        <div class="padding_20 margin_bottom_20">
		          <Row class="margin_top_10">
		            <Col span="8" class="">开 本：16开</Col>
		            <Col span="8" class="">纸 张：胶版纸</Col>
		            <Col span="8" class="">包 装：平装-胶订</Col>
		          </Row>
		          <Row class="margin_top_10">
                <Col span="8" class="">是否套装：是</Col>
                <Col span="8" class="">国际标准书号ISBN：25271564</Col>
		          </Row>
		          <Row class="margin_top_10">
		            <Col>所属分类：图书>考试>司法考试图书>法律>法律考试>司法考试</Col>
		          </Row>
              <Row class="margin_top_20">
                <Col span="2" class="">内容简介：</Col>
		            <Col span="22">生活处处总关法——在当今这个物质生活和精神生活都飞速发展的社会里，法律是不容回避的问题。*、吃饭、旅游、看病、 结婚、育儿、养老、上班、开店、买房、装修、拆迁等等，无处不涉及法律。法律已经成为了我们生活中不能缺少的“伴侣”。也正是有了法律的存在，有法律给我们做后盾，我们才能胸有成竹地去维护法律赋予我们的权利。但是，这要以我们“懂法、 知法”作为前提。如果我们不懂法，当我们的权益受到侵犯时，就会或许选择沉默、或许选择激进的方法解决，但最终受伤害的还是我们自己。</Col>
		          </Row>
              <div class="margin_top_30">
                <p>目&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</p>
                <p class="padding_left_20 margin_top_10">第一章日常消费法律知识——天天315</p>
              </div>
              <div class="text_right margin_top_20">
                <Button size="small">显示全部信息</Button>
              </div>
		        </div>
		      </div>
		      <!--评价-->
		      <div class="margin_top_50">
		        <div id="detail2" class="font_weight_bold bg_f5 border_e6 padding_15">评价（4）</div>
		        <div class="padding_15">
		        	<span>评分：</span>
		        	<Rate show-text allow-half disabled v-model="valueCustomText">
				        <span style="color: #f5a623">{{ valueCustomText }}</span>
				      </Rate>
		        </div>
		        <!--<div class="bg_f5 border_e6 padding_10_15">-->
		        	<!--<ul class="list_unstyled ul_inline clearfix color_666">-->
		        		<!--<li @click="evaluateBtn(0)" :class="{active:isActive == 0}" class="pointer margin_right_20">全部（4）</li>-->
		        		<!--<li @click="evaluateBtn(1)" :class="{active:isActive == 1}" class="pointer margin_right_20">好评（4）</li>-->
		        		<!--<li @click="evaluateBtn(2)" :class="{active:isActive == 2}" class="pointer margin_right_20">中评（4）</li>-->
		        		<!--<li @click="evaluateBtn(3)" :class="{active:isActive == 3}" class="pointer ">差评（4）</li>-->
		        	<!--</ul>-->
		        <!--</div>-->
		        <div class="margin_bottom_20">
			    		<Row v-for="(item,index) in 3" :key="index" class="padding_15 line">
			            <Col span="3">
			            	<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
			            	<span class="float_right width_100px text_ellipsis line_height_32px">12345623131</span>
			            </Col>
			            <Col span="20" offset="1">
			            	<div class="clearfix">
			            		<div class="float_left">
				            		<Rate allow-half disabled v-model="valueCustomText"></Rate>
				            	</div>
				            	<div class="float_right color_999 line_height_30px">2018-08-24 15:14</div>
			            	</div>
			            	<div class="margin_top_10 text_justify">
			            		合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买合同全面，值得够买
			            	</div>
			            </Col>
			          </Row>
			    	</div>
		        <div class="text_center padding_top_20 padding_bottom_30">
		        	<span class="pointer">查看更多》</span>
		        </div>
		      </div>
      	</Col>
      	<Col span="6">
      		<div class="margin_left_30">
      			<div class="bg_f5 clearfix padding_15">
      				<div class="float_left bg_white">
      					<img src="../../assets/images/image/falv.png"/>
      				</div>
      				<div class="float_left margin_left_20 margin_top_15">
      					<p class="font_18 font_weight_bold">法律援助</p>
      					<p class="color_666 margin_top_5">课程数：8</p>
      					<p class="color_666 margin_top_5">用户数：210</p>
      				</div>
      			</div>
      			<!--热门课程-->
      			<div>
      				<div class="margin_top_30 margin_bottom_30"><span class="title">猜你喜欢</span></div>
      				<ul class="list_unstyled ul_inline clearfix">
				        <li v-for="item in 3" class="listBox bg_white margin_bottom_30">
                  <div class="text_center">
                    <img src="../../assets/images/image/cart_book.png" height="280">
                  </div>
                  <div class="font_18 text_ellipsis margin_top_20">常见民事纠纷裁判思路与规则</div>
                  <div class="color_666 text_ellipsis margin_top_10 clearfix">
                    <div class="float_left">法院大讲堂</div>
                    <div class="float_right">1234人购买过</div>
                  </div>
                  <div class="margin_top_15 clearfix">
                    <p class="pointer float_left">
                      <span class="font_20 color_title">￥500.00</span>
                    </p>
                    <div class="float_right margin_left_20">
                      <Button type="success" shape="circle" class="bg_title">立即购买</Button>
                    </div>
                  </div>
				        </li>
			      	</ul>
      			</div>
      		</div>
      	</Col>
      </Row>
    </div>
	</div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
    components : {
      NavBar,
    },
    data() {
        return {
          valueCustomText: 3.8,
          isCur: 0,
          isActive: 0,
          navDataModel: ['行业动态管控','法律动态管控','视频课程','音频课程'],
        }
        
    },
    methods: {
    	//详情
			anchorBtn(i){
				this.isCur = i;
			},
			//评价
			evaluateBtn(i){
				this.isActive = i;
			},
      // 导航鼠标点击
      tabClick(index){
        switch(index){
          case 0:
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: 0
              }
            })
            break;
          case 1:
            this.$router.push({
              path:'/industryDynamic',
              query: {
                typeId: 1
              }
            })
            break;
          case 2:
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: 2
              }
            })
            break;
          case 3:
            this.$router.push({
              path:'videoCourse',
              query: {
                typeId: 3
              }
            })
            break;
        }
      },

    }
}
</script>
<style scoped lang='less'>
  .detailBox{
    .width_40px{width: 40px;}
    .width_100px{width: 100px;}
    .width_150px{width: 150px;}
    .width_600px{width: 600px;}
    .height_400px{height: 400px;}
    .border{border:1px solid #999999;}
    .tag{color: #00AA88;padding-right: 20px}
    .padding_20_15{padding: 10px 20px;text-align: center;float: left;font-size: 16px;}
    .padding_10_15{padding: 10px 15px;}
    .cur{color:#fff;background: #00AA88;}
    .active{color: #f09105;}
    .border_e6{border:1px solid #e6e6e6;}
    .border_bottom_e6{border-bottom: 1px solid #e6e6e6;}
    .bg_a5{background: #A5A5A5;border: 1px solid #A5A5A5;}
    .line{border-bottom: 1px dashed #EDEDED;}
    .classTitle{padding: 20px 15px;}
    .listBox{
      width: 100%;height: 450px;border: 1px solid #e6e6e6;box-sizing: border-box;padding: 20px 10px;
      .height_190px{height: 190px;}
      .list_item{padding: 20px 10px;}
    }
    .title{color: #00AA88;font-size: 18px;border-left: 3px solid #00AA88; padding-left: 10px;}
  }
  .nav {
    background: #00AA88;
    height: 67px;
    .navbar>li{
      width: 180px;text-align: center;
      >a{width:100%;line-height: 67px;display: inline-block;}
      .listItem:hover{background: #f09105}
    }
  }
</style>
