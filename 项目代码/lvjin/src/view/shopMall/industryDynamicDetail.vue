<template>
  <div>
    <NavBar :showItem='false'></NavBar>
    <div class="box_center_1200 detailBox">
      <Row class="margin_top_30">
        <Col span="12">
          <div class="width_600px height_400px border">
            <img :src="dataDetail.productProfileUrl" class="all_width all_height">
          </div>
        </Col>
        <Col span="12" class="padding_20">
          <div class="font_20 font_weight_bold text_ellipsis">{{dataDetail.productTitle}}</div>
          <div class="color_999 twoline_ellipsis margin_top_20" v-html="dataDetail.productDesc"></div>
          <div class="clearfix margin_top_30">
            <div class="float_left">
              <Rate show-text allow-half disabled v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
              </Rate>
            </div>
            <div class="float_left color_999 line_height_30px margin_left_30">{{dataDetail.saleCount}}人看过</div>
          </div>
          <!--<div class="margin_top_20">-->
            <!--<span v-for="item in 3" class="tag">标签</span>-->
          <!--</div>-->
          <div class="margin_top_30">
            <span class="color_title font_20">￥{{dataDetail.productPrice}}</span>
            <div class="inline_block relative">
              <del class="color_999 font_20 padding_left_20">￥{{dataDetail.productOrgPrice}}</del>
              <!--<div v-if="detailId != 3" class="tooltip">-->
                <!--<div class="triangle"></div>-->
                <!--<div class="tooltip_txt">特价仅剩4天6小时35分钟</div>-->
              <!--</div>-->
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
        <div class="font_weight_bold bg_f5 border_e6 padding_15">评价（{{total}}）</div>
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
	    		<Row v-for="(item,index) in evaluateList" :key="index" class="padding_15 line">
	            <Col span="4">
                <div class="float_left">
                  <Avatar v-if="item.customerInfo.ciProfileUrl === '' || item.customerInfo.ciProfileUrl === null" icon="ios-person" />
                  <Avatar v-else :src="item.customerInfo.ciProfileUrl"/>
                </div>
                <div class="float_left width_100px text_ellipsis line_height_32px margin_left_10">{{item.customerInfo.ciName}}</div>
	            </Col>
	            <Col span="19" offset="1">
	            	<div class="clearfix">
	            		<div class="float_left">
                    <Rate allow-half disabled v-model="item.productScore == null ? 0 : item.productScore"></Rate>
		            	</div>
		            	<div class="float_right color_999 line_height_30px">{{item.createDate}}</div>
	            	</div>
                <div class="margin_top_10 text_justify" v-html="item.commentDesc"></div>
	            </Col>
	          </Row>
	    	</div>
        <div class="text_center padding_top_20 padding_bottom_30">
          <span class="pointer" @click="seeMore">查看更多》</span>
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
          classCur: 0,
          isCur: 0,
          isActive: 0,
          // 产品详情数据
          dataDetail:{},
          productCode: '',
          // 评价列表
          evaluateList: [],
          total: 0,
          pageSize: 3
        }

    },
    mounted(){
      this.productCode = this.$route.query.productCode
      this.getProductInfo(this.productCode)
      this.getEvaluateList(this.pageSize,  this.productCode)
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
			},
      // 查看产品详情
      getProductInfo(productCode){
        // 查看产品详情
        this.$api.getProductInfo( this.$Qs.stringify({'productCode': productCode}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){

              this.dataDetail = res.data.content
              //商品评分
              res.data.content.productScore == null ? this.valueCustomText = 0 : this.valueCustomText = res.data.content.productScore

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 获取评价列表
      getEvaluateList(pageSize, productCode){
        let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': pageSize, 'productCode': productCode});
        this.$api.getProductCommentList( params )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){
              this.evaluateList = res.data.content.list
              this.total = res.data.content.count

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 查看更多
      seeMore(){
        if(this.pageSize >= this.total){
          this.$Message.warning('已经没有更多了');
          return
        }
        this.pageSize += 3
        this.getEvaluateList(this.pageSize, this.productCode)
      }
    }
}
</script>
<style>
  .text_ellipsis,.text_ellipsis p{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
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
