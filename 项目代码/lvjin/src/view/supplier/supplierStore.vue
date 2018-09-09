<template>
    <div class="bg_white">
    <Banner></Banner>
    <div class="box_center_1200">
      <div class="margin_top_20 margin_bottom_30">
        <div class="bg_f5 clearfix">
          <a @click="anchorBtn(0)" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">首页</a>
          <a @click="anchorBtn(1)" :class="{cur:isCur == 1}" class="inline_block padding_20_15 width_150px">课程</a>
        </div>
        <div class="margin_top_20">
          <Row>
            <Col span="6">
              <div class="margin_right_30">

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
                <!--购买量排行-->
                <div class="clearfix margin_top_30 margin_bottom_30">
                  <div class="float_left"><span class="title">购买量排行</span></div>
                  <div @click="anchorBtn(1)" class="float_right color_999 line_height_30px pointer">查看全部课程</div>
                </div>

                <ul class="list_unstyled ul_inline clearfix">
                  <li v-for="(item,index) in 3" class="listBox bg_white margin_bottom_30">
                    <div class="text_center relative">
                      <img src="../../assets/images/image/cart_book.png" height="210" class="all_width">
                      <div class="sort_box"></div>
                      <div class="sort_txt">{{index + 1}}</div>
                    </div>
                    <div class="margin_left_10 margin_right_10 margin_top_15">
                      <div class="font_18 text_ellipsis">常见民事纠纷裁判思路与规则</div>
                      <div class="color_666 text_ellipsis margin_top_10 clearfix">
                        <div class="float_left">法院大讲堂</div>
                        <div class="float_right">1234人听过</div>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
            </Col>
            <Col span="18">

              <div>
                <div v-if="isCur == 0" class="class_title"><span class="title">课程列表</span></div>

                <!--排序-->
                <div v-if="isCur == 1" class="padding_15 bg_f5">
                  <ul class="list_unstyled ul_inline clearfix">
                    <li class="color_title margin_right_30 pointer">
                      <span>综合排序</span>
                      <Icon v-if="sort" type="ios-arrow-up" />
                      <Icon v-else type="ios-arrow-down" />
                    </li>
                    <li class="margin_right_30 pointer">
                      <span>销量</span>
                      <Icon v-if="sale" type="ios-arrow-up" />
                      <Icon v-else type="ios-arrow-down" />
                    </li>
                    <li class="margin_right_30 pointer">
                      <span>满意度</span>
                      <Icon v-if="satisfaction" type="ios-arrow-up" />
                      <Icon v-else type="ios-arrow-down" />
                    </li>
                    <li class="pointer">
                      <span>价格</span>
                      <Icon v-if="price" type="ios-arrow-up" />
                      <Icon v-else type="ios-arrow-down" />
                    </li>
                  </ul>
                </div>

                <ul class="list_unstyled ul_inline clearfix">
                  <li v-for="item in 9" class="class_Box bg_white">
                    <div class="text_center">
                      <img src="../../assets/images/image/cart_book.png" height="210">
                    </div>
                    <div class="margin_left_10 margin_right_10 margin_top_10">
                      <div class="font_18 text_ellipsis">常见民事纠纷裁判思路与规则</div>
                      <div class="color_666 text_ellipsis margin_top_5 clearfix">
                        <div class="float_left color_999">立二拆四案辩护人</div>
                        <div class="float_right">1234人购买过</div>
                      </div>
                      <div class="margin_top_10 clearfix">
                        <p class="pointer float_left">
                          <span class="font_20 color_title">￥500.00</span>
                        </p>
                        <div class="float_right line_height_30px">盈科律师事务所</div>
                      </div>
                      <div class="margin_top_5 clearfix">
                        <p class="pointer float_left">
                          <Icon type="ios-headset-outline" size="30"/>
                          <span class="font_16 color_666 vertical_middle">试听</span>
                        </p>
                        <div class="float_right">
                          <Button type="success" shape="circle" class="bg_title">立即购买</Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!--分页-->
              <div class="margin_80">
                <Page :total="100" prev-text="上一页" next-text="下一页" />
              </div>

            </Col>
          </Row>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import Banner from '../../components/Banner.vue'
export default {
    components : {
      Banner
    },
    data() {
        return {
          isCur: 0,
          //排序
          sort: true,
          sale: false,
          satisfaction: false,
          price: false,
        }
        
    },
    methods: {
      //首页切换
      anchorBtn(i){
        this.isCur = i;
      },
    }
}
</script>

<style scoped lang='less'>
  .cur{color:#fff;background: #00AA88;}
  .width_150px{width: 150px;}
  .padding_20_15{padding: 10px 20px;text-align: center;float: left;font-size: 16px;}
  .title{color: #00AA88;font-size: 18px;border-left: 3px solid #00AA88; padding-left: 10px;}
  .listBox{
    width: 100%;height: 300px;border: 1px solid #e6e6e6;box-sizing: border-box;
    .height_190px{height: 190px;}
    .list_item{padding: 20px 10px;}
  }
  .margin_80{padding: 80px;text-align: center}
  /*课程列表*/
  .class_title{margin: 0 12px}
  .class_Box{
    width: 276px;
    height: 370px;
    margin: 30px 12px 0 12px;
    border: 1px solid #e6e6e6;
  }
  /*三角形排行*/
  .sort_box{
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    border-top: 25px solid #f09105;
    border-left: 35px solid #f09105;
    border-right: 35px solid transparent;
    border-bottom: 25px solid transparent;
  }
  .sort_txt{
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 7px;
    transform:rotate(-30deg);
    -ms-transform:rotate(-30deg); 	/* IE 9 */
    -moz-transform:rotate(-30deg); 	/* Firefox */
    -webkit-transform:rotate(-30deg); /* Safari 和 Chrome */
    -o-transform:rotate(-30deg); 	/* Opera */
  }
</style>
