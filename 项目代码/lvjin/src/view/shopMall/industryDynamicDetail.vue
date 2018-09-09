<template>
  <div>
    <NavBar :nowIndex="typeId" :showItem='false'></NavBar>
    <div class="box_center_1200 detailBox">
      <Row class="margin_top_30">
        <Col span="12">
          <div class="width_600px height_400px border"></div>
        </Col>
        <Col span="12" class="padding_20">
          <div class="font_20 font_weight_bold text_ellipsis">行业动态管控-知识产权许可使用合同起草</div>
          <div class="color_999 twoline_ellipsis margin_top_20">帮助拥有知识产权的企业起草和完善知识产权许可使用合同帮助拥有知识产权的企业起草和完善知识产权许可使用合同</div>
          <div class="clearfix margin_top_30">
            <div class="float_left">
              <Rate show-text allow-half disabled v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
              </Rate>
            </div>
            <div class="float_left color_999 line_height_30px margin_left_30">1234人看过</div>
          </div>
          <div class="margin_top_20">
            <span v-for="item in 3" class="tag">标签</span>
          </div>
          <div class="margin_top_30">
            <span class="color_title font_20">￥500.00</span>
            <div class="inline_block relative">
              <del class="color_999 font_20 padding_left_20">￥800.00</del>
              <div v-if="detailId != 3" class="tooltip">
                <div class="triangle"></div>
                <div class="tooltip_txt">特价仅剩4天6小时35分钟</div>
              </div>
            </div>
          </div>
          <div class="margin_top_50">
            <Button size="large" type="warning" shape="circle">加入购物车</Button>
            <Button size="large" type="success" shape="circle" class="margin_left_10 bg_title">立即购买</Button>
          </div>
        </Col>
      </Row>
      <!--简介-->
      <div id="detail1" class="margin_top_50">
        <Affix>
          <div class="bg_f5 clearfix border_e6">
            <a href="#detail1" @click="anchorBtn(0)" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">简介</a>
            <a href="#detail2" @click="anchorBtn(1)" :class="{cur:isCur == 1}" class="inline_block padding_20_15">全程动态管控系统</a>
            <a href="#detail3" @click="anchorBtn(2)" :class="{cur:isCur == 2}" class="inline_block padding_20_15 width_150px">评价</a>
          </div>
        </Affix>
        <div class="padding_20 margin_bottom_20">
          <Row class="margin_top_10">
            <Col span="2" class="font_weight_bold">适应企业</Col>
            <Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>
          </Row>
          <Row class="margin_top_20">
            <Col span="2" class="font_weight_bold">内容介绍</Col>
            <Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>
          </Row>
        </div>
      </div>
      <!--全程动态管控系统-->
      <div id="detail2">
        <div class="font_weight_bold bg_f5 border_e6 padding_15">全程动态管控系统</div>
        <div class="">
          <div class="margin_left_20 margin_top_30 margin_bottom_30 font_18">
            <div class="inline_block" v-for="(item,index) in 3" @click="classBtn(index)">
              <span class="pointer" :class="{color_title: classCur == index}">项目启动文件</span>
              <Icon v-show="index != 2" type="ios-arrow-round-forward" size="30"/>
            </div>
          </div>

          <div v-for="item in 3" class="margin_15 border_bottom_e6 padding_bottom_10">
            <p class="font_18">1.1.1专项服务合同</p>
            <div class="margin_left_30 margin_top_10 clearfix">
              <span>视频音频详细讲解详细讲解</span>
              <div class="float_right">
                <Button v-if="detailId == 1 || detailId == 2" size="small" shape="circle" class="bg_a5 color_fff">查看详情</Button>
                <Button v-if="detailId == 1 || detailId == 2" size="small" type="success" shape="circle" class="bg_title">立即购买</Button>
                <Button v-if="detailId == 3" size="small" shape="circle" class="button_title">视频</Button>
                <Button v-if="detailId == 3" size="small" shape="circle" class="button_title">音频</Button>
                <Button v-if="detailId == 3" size="small" shape="circle" class="button_title">文字</Button>
                <Button v-if="detailId == 3" size="small" type="success" shape="circle" class="bg_title width_60px">预览</Button>
                <Button v-if="detailId == 3" size="small" type="success" shape="circle" class="bg_title width_60px">下载</Button>
              </div>
            </div>
          </div>

        </div>
        <div class="text_center padding_top_20 padding_bottom_30">
        	<span class="pointer">查看更多》</span>
        </div>
      </div>
      <!--评价-->
      <div id="detail3" class="margin_top_20">
        <div class="font_weight_bold bg_f5 border_e6 padding_15">评价（4）</div>
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
          //星星评分
          valueCustomText: 3.8,
          isCur: 0,
          isActive: 0,
          classCur: 0,
          //类型id
          typeId: this.$route.query.typeId,
          detailId: this.$route.query.twoPage,
        }

    },
    methods: {
    	//详情
			anchorBtn(i){
				this.isCur = i;
			},
      //课程
      classBtn(i){
        this.classCur = i;
      },
			//评价
			evaluateBtn(i){
				this.isActive = i;
			}
    },
    mounted(){
      console.log(this.$route.query.twoPage)
    }
}
</script>
<style>

</style>
<style scoped lang='less'>
  .detailBox{
    .width_60px{width: 60px;}
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
  }
</style>
