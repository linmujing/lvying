<template>
    <div class="bg_white">
      <!--banner-->
      <div>
        <Carousel  radius-dot v-model="value" autoplay loop>
          <CarouselItem v-for="(item,index) in banner" :key="index">
            <div class="carousel">
              <img :src="item.src" class="all_width block" style="max-height: 500px">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
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
                    <p class="color_666 margin_top_5">课程数：{{merchantInfo.productCount}}</p>
                    <p class="color_666 margin_top_5">用户数：{{merchantInfo.ciCount}}</p>
                  </div>
                </div>
                <!--购买量排行-->
                <div class="clearfix margin_top_30 margin_bottom_30">
                  <div class="float_left"><span class="title">购买量排行</span></div>
                  <div @click="anchorBtn(1)" class="float_right color_999 line_height_30px pointer">查看全部课程</div>
                </div>

                <ul class="list_unstyled ul_inline clearfix">
                  <li v-for="(item,index) in saleList" :key="index" class="listBox bg_white margin_bottom_30">
                    <div class="text_center relative">
                      <img :src="item.productProfileUrl" class="all_width" height="210" @click="jumpDetail(item.productCode)">
                      <div class="sort_box"></div>
                      <div class="sort_txt">{{index + 1}}</div>
                    </div>
                    <div class="margin_left_10 margin_right_10 margin_top_15">
                      <div class="font_18 text_ellipsis">{{item.productTitle}}</div>
                      <div class="color_666 text_ellipsis margin_top_10 clearfix">
                        <div class="float_left">{{item.createBy}}</div>
                        <div class="float_right">{{item.saleCount}}人听过</div>
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
                    <li v-for="(item,index) in sortName" :key="index" :class="sortIndex == index ? 'color_title' : ''" class="margin_right_30 pointer" @click="changeClass(index)">
                      <span>{{item.name}}</span>
                      <Icon v-if="item.state" type="ios-arrow-up"/>
                      <Icon v-else type="ios-arrow-down"/>
                    </li>
                  </ul>
                </div>

                <ul class="list_unstyled ul_inline clearfix">
                  <li v-for="item in productList" class="class_Box bg_white">
                    <div @click="jumpDetail(item.productCode)" class="text_center">
                      <img :src="item.productProfileUrl" class="all_width" height="210">
                    </div>
                    <div class="margin_left_10 margin_right_10 margin_top_10">
                      <div class="font_18 text_ellipsis">{{item.productTitle}}</div>
                      <div class="color_666 margin_top_5 clearfix">
                        <div class="float_left color_999 width_50 text_ellipsis" v-html="item.productDesc"></div>
                        <div class="float_right text_ellipsis">{{item.saleCount}}人购买过</div>
                      </div>
                      <div class="margin_top_10 clearfix">
                        <p class="pointer float_left">
                          <span class="font_20 color_title">￥{{item.productPrice}}</span>
                        </p>
                        <div class="float_right line_height_30px">{{item.createBy}}</div>
                      </div>
                      <div class="margin_top_5 clearfix">
                        <p class="pointer float_left">
                          <Icon type="ios-headset-outline" size="30"/>
                          <span class="font_16 color_666 vertical_middle" @click="jumpDetail(item.productCode)">试听</span>
                        </p>
                        <div class="float_right">
                          <Button type="success" shape="circle" class="bg_title" @click="goBuy(item.productCode)">立即购买</Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- 订单分页 -->
              <div class="margin_80">
                <Page :total="total" :current="current"   :page-size="pageSize"
                      @on-change="changeOrderPage" show-total show-elevator />
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
          value: 0,
          banner: JSON.parse(sessionStorage.getItem("Banner")),
          isCur: 0,
          //排序
          sort: true,
          sortName: [
            {name: '综合排序', state: true},
            {name: '销量', state: true},
            {name: '满意度', state: true},
            {name: '价格', state: true}
          ],
          sortIndex: 0,
          total: 0,
          current: 1,
          pageSize: 12,
          productList: [],
          saleList: [],
          merchantCode: this.$route.query.merchantCode,
          merchantInfo: {}
        }
        
    },
    mounted(){
      // console.log(this.$route.query.merchantCode)
      this.getProductList(1,10)
      this.getProductList(1,20)
      this.getMerchantInfo()
    },
    methods: {
      //首页切换
      anchorBtn(i){
        this.isCur = i;
      },
      jumpDetail(productCode){
        this.$router.push({
          path:'/videoCourseDetail',
          query: {
            productCode: productCode
          }
        })
      },
      // 获取商品列表
      getProductList(page,sort){
        this.$Spin.show()
        this.$api.getProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': 9, 'merchantCode': this.merchantCode, 'orderByStr': sort}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){

              this.productList = res.data.content.list
              this.total = res.data.content.count
              // 排行销量
              if(sort == 20){
                if(res.data.content.list.length > 3){
                  for(var i=0;i<3;i++){
                    this.saleList.push(res.data.content.list[i])
                  }
                }else {
                  this.saleList = res.data.content.list
                }
              }

            }else {

              this.$Message.warning(res.data.message);

            }
            this.$Spin.hide()
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      //获取商户详细信息
      getMerchantInfo(){
        this.$Spin.show()
        this.$api.getMerchantInfo( this.$Qs.stringify({'merchantCode': this.merchantCode}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){

              this.merchantInfo = res.data.content

            }else {

              this.$Message.warning(res.data.message);

            }
            this.$Spin.hide()
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      /**分页**/
      //@param value 返回当前页码
      changeOrderPage(value){
        this.sortIndex = 0
        this.getProductList(value,10)
      },
      //点击排序
      changeClass(index){
        if(this.sortIndex == index){
          this.sortName[index].state = !this.sortName[index].state
        }
        this.sortIndex = index
        var sortId
        switch (index) {
          case 0:
            this.sortName[index].state ? sortId = 10 : sortId = 11
            break
          case 1:
            this.sortName[index].state ? sortId = 20 : sortId = 21
            break
          case 2:
            this.sortName[index].state ? sortId = 30 : sortId = 31
            break
          case 3:
            this.sortName[index].state ? sortId = 40 : sortId = 41
            break
        }
        this.getProductList(1,sortId)
      },
      /** 数据 **/
      // 添加商品到购物车 MT
      addProductCart(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        let param = {
          ciCode:this.$store.state.userData.cicode,
          productCode: code,
          productCount:1
        }
        // 存储商品信息
        this.$store.commit('cart/addToCart', param);
        this.$store.dispatch('cart/addCartTo', param);
      },
      // 立即购买
      goBuy(code){
        if(this.$store.state.userData.cicode == null || this.$store.state.userData.cicode == "null"){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        // 页面跳转
        this.$router.push({
          path:'/submitOrder',
          query: {
            productCode: code
          }
        })
      }
    }
}
</script>
<style>
  /*修改分页样式*/
  .ivu-page-item{background: #F5F5F5;}
  .ivu-page-next, .ivu-page-prev{background: #F5F5F5;}
  .ivu-page-next:hover a,.ivu-page-prev:hover a,.ivu-page-item:hover a,.ivu-page-item-active a,.ivu-page-item-active:hover a{color: #00AA88;}
  .ivu-page-item:hover,.ivu-page-item-active {border-color: #00AA88;}
  .ivu-page-disabled a {color: #ccc !important;}
  .text_ellipsis,.text_ellipsis p{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
<style scoped lang='less'>
  .cur{color:#fff;background: #00AA88;}
  .cur:hover{color:#fff}
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
