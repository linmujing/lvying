<template>
  <div>
    <!--导航栏-->
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
          <div class="color_999 twoline_ellipsis margin_top_20">{{dataDetail.productKeyWord}}</div>
          <div class="clearfix margin_top_30">
            <div class="float_left">
              <Rate show-text allow-half disabled v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
              </Rate>
            </div>
            <div class="float_left color_999 line_height_30px margin_left_30">{{dataDetail.saleCount}}人看过</div>
          </div>
          <div class="margin_top_30">
            <p><span class="color_title font_20">￥{{dataDetail.productPrice}}</span></p>
          </div>
          <div class="margin_top_10">
            <Dropdown v-show="cuponList.length > 0" trigger="custom" :visible="visible" placement="bottom-start" @on-click="selectCoupon">
              <a href="javascript:void(0)" @click="handleOpen">
                <Tag color="orange">优惠</Tag>
                <Icon type="ios-arrow-down" color="#fa8c16"></Icon>
              </a>
              <DropdownMenu slot="list" style="padding: 5px 10px 0 10px">
                <DropdownItem v-for="(item,index) in cuponList" :key="index" :name="item.couponCode+','+item.couponForm" v-if="item.couponCount>0" style="background: #FFF3E5;margin-bottom: 10px;">
                  <Row style="width: 300px;">
                    <Col span="16" class="color_F5320D font_12" style="border-right: 2px dashed #EBDFD1">
                      <div class="font_16 font_weight_bold">{{item.couponTitle}}</div>
                      <div class="margin_top_5">{{item.couponDesc}}</div>
                      <div class="margin_top_5">有效期{{dateFormat(item.couponStartTime)}} 至 {{dateFormat(item.couponEndTime)}}</div>
                    </Col>
                    <Col span="8">
                      <div class="color_F5320D font_20 text_center margin_left_10" style="line-height: 60px">立即领取</div>
                    </Col>
                  </Row>
                </DropdownItem>
                <div style="text-align: right;margin:10px;">
                  <Button type="success" size="small" ghost @click="handleClose">关闭</Button>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="margin_top_40">
            <Button size="large" type="warning" shape="circle" @click="addProductCart(dataDetail.productCode)">加入购物车</Button>
            <Button size="large" type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(dataDetail.productCode)">立即购买</Button>
          </div>
        </Col>
      </Row>
      <Row class="margin_top_50">
      	<Col span="18">
      		<!--商品详情-->
          <div>
            <Affix>
              <div class="bg_f5 clearfix border_e6">
                <a @click="anchorBtn(0)" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">商品详情</a>
                <a @click="anchorBtn(1)" :class="{cur:isCur == 1}" class="inline_block padding_20_15 width_150px">商品评价</a>
              </div>
            </Affix>
            <!--商品详情-->
		        <div v-show="isCur == 0" class="padding_20 margin_bottom_20 classImg" v-html="dataDetail.productSpecification"></div>
            <!--<div class="margin_top_30">-->
              <!--<p>目&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</p>-->
              <!--<p class="padding_left_20 margin_top_10">第一章日常消费法律知识——天天315</p>-->
            <!--</div>-->
            <!--<div class="text_right margin_top_20">-->
              <!--<Button size="small">显示全部信息</Button>-->
            <!--</div>-->
		      </div>
		      <!--评价-->
		      <div v-show="isCur == 0 || isCur == 1" class="margin_top_50">
		        <div id="detail2" class="font_weight_bold bg_f5 border_e6 padding_15">评价（{{total}}）</div>
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
      	</Col>
      	<Col span="6">
      		<div class="margin_left_30">
      			<div @click="toSupplierStore(dataDetail.merchantCode)" class="bg_f5 clearfix padding_15 pointer">
      				<div class="float_left bg_white">
                <img v-if="merchantInfo.merchantProfileUrl  == '' || merchantInfo.merchantProfileUrl  == null" src="../../assets/images/image/falv.png"/>
                <img v-else :src="merchantInfo.merchantProfileUrl" width="100"/>
      				</div>
      				<div class="float_left margin_left_20 margin_top_15" style="width: 120px">
      					<p class="font_18 font_weight_bold">法律援助</p>
                <p class="color_666 margin_top_5 text_ellipsis">课程数：{{merchantInfo.productCount}}</p>
                <p class="color_666 margin_top_5 text_ellipsis">用户数：{{merchantInfo.ciCount}}</p>
      				</div>
      			</div>
      			<!--热门课程-->
      			<div>
      				<div class="margin_top_30 margin_bottom_30"><span class="title">猜你喜欢</span></div>
      				<ul class="list_unstyled ul_inline clearfix">
				        <li v-for="(item, index) in recommendList" :key="index" class="listBox bg_white margin_bottom_30">
                  <div @click="jumpDetail(item.productCode)" class="text_center">
                    <img :src="item.productProfileUrl" class="all_width" height="280">
                  </div>
                  <div class="font_18 text_ellipsis margin_top_20">{{item.productTitle}}</div>
                  <div class="color_666 text_ellipsis margin_top_10 clearfix">
                    <div class="float_left">{{item.productKeyWord}}</div>
                    <div class="float_right">{{item.saleCount}}人购买过</div>
                  </div>
                  <div class="margin_top_15 clearfix">
                    <p class="pointer float_left">
                      <span class="font_20 color_title">￥{{item.productPrice}}</span>
                    </p>
                    <div class="float_right margin_left_20">
                      <Button type="success" shape="circle" class="bg_title" @click="goBuy(item.productCode)">立即购买</Button>
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
          //星星评分
          valueCustomText: 3.8,
          classCur: 0,
          isCur: 0,
          isActive: 0,
          // 产品详情数据
          dataDetail:{},
          productCode: '',
          merchantCode: '',
          // 评价列表
          evaluateList: [],
          total: 0,
          pageSize: 3,
          // 推荐产品
          recommendList: [],
          merchantInfo: {},
          visible: false,
          cuponList: []
        }

    },
    watch: {
      //监听参数变化
      $route(){
        this.productCode = this.$route.query.productCode
      },
      productCode() {
        this.productCode = this.$route.query.productCode
        this.getProductInfo(this.productCode)
        this.getEvaluateList(this.pageSize,  this.productCode)
      },
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
			//评价
			evaluateBtn(i){
				this.isActive = i;
			},
      handleOpen () {
        this.visible = true;
      },
      handleClose () {
        this.visible = false;
      },
      // 选择优惠券
      selectCoupon(couponCode){
        var arr = couponCode.split(",")
        var ciCode = this.$store.state.userData.cicode
        if(ciCode == null || ciCode == "null" || ciCode == undefined){
          this.$Message.warning('您还没有登录，请登录后再尝试！');
          return ;
        }
        let params = this.$Qs.stringify({'ciCode': ciCode, 'couponCode': arr[0], 'couponForm': arr[1]});
        this.$api.addCoupont( params )

          .then( (res) => {
            // console.log(res);
            if(res.data.code == 200){
              this.$Message.success('领取成功');
              // 刷新优惠券列表
              this.getProductCoupon(this.productCode,this.merchantCode)
            }else{
              this.$Message.warning(res.data.message);
            }
          })
          .catch((error) => {
            this.$Message.warning('领取失败');
            console.log('发生错误！', error);
          });
      },
      // 获取优惠券列表
      getProductCoupon(productCode, merchantCode){
        let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': 100, 'productCode': productCode, 'merchantCode': merchantCode});
        this.$api.getProductCoupon( params )

          .then( (res) => {
            // console.log(res);
            if(res.data.code == 200){
              var arr = res.data.content.list
              var list = []
              for(var i=0;i<arr.length;i++){
                if(arr[i].couponEffectiveType == 1){
                  list.push(arr[i])
                }
              }
              this.cuponList = list
            }else if (res.data.code == 500){
              this.$Message.warning(res.data.message);
            }
          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 查看产品详情
      getProductInfo(productCode){
        this.$Spin.show()
        this.$api.getProductInfo( this.$Qs.stringify({'productCode': productCode}) )

          .then( (res) => {
            // console.log(res);
            if(res.data.code == 200){
              this.$Spin.hide()
              var result = res.data.content
              this.dataDetail = result
              this.merchantCode = result.merchantCode
                //获取推荐产品
              // this.getProductShowCase('P121212121213,P121212121212,P121212121211,P121212121214') //测试
              if(!result.productRecommendCode == '' || !result.productRecommendCode == null){
                this.getProductShowCase(result.productRecommendCode)
              }
              //获取优惠券列表
              this.getProductCoupon(this.productCode, result.merchantCode)
              //商品评分
              result.productScore == null ? this.valueCustomText = 0 : this.valueCustomText = result.productScore

            }else {
              this.$Spin.hide()
              this.$Message.warning(res.data.message);

            }
          })
          .catch((error) => {
            this.$Spin.hide()
            console.log('发生错误！', error);
          });
      },
      // 获取评价列表
      getEvaluateList(pageSize, productCode){
        let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': pageSize, 'productCode': productCode});
        this.$api.getProductCommentList( params )

          .then( (res) => {
            // console.log(res);
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
      },
      // 获取推荐列表或猜你喜欢
      getProductShowCase(productCode){
        // 查看产品详情
        this.$api.getProductShowCase( this.$Qs.stringify({'productCode': productCode}) )

          .then( (res) => {
            // console.log(res);
            if(res.data.code == 200){

              if(res.data.content.length > 3){
                for(var i=0;i<3;i++){
                  this.recommendList.push(res.data.content[i])
                }
              }else {
                this.recommendList = res.data.content
              }

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      //获取商户详细信息
      getMerchantInfo(code){
        this.$Spin.show()
        this.$api.getMerchantInfo( this.$Qs.stringify({'merchantCode': code}) )

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
      // 跳到详情
      jumpDetail(productCode){
        this.$router.push({
          path:'/bookDetail',
          query: {
            productCode: productCode
          }
        })
      },
      // 跳到提供商店铺
      toSupplierStore(code){
        this.$router.push({
          path:'/supplier/supplierStore',
          query: {
            merchantCode: code
          }
        })
      },
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      dateFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        // var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day;
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
  .text_ellipsis,.text_ellipsis p{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .twoline_ellipsis, .twoline_ellipsis p{
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: off*/
    -webkit-box-orient: vertical;
    /* autoprefixer: on*/
    white-space: normal;
  }
</style>
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
      >span{width:100%;line-height: 67px;display: inline-block;}
      .listItem:hover{background: #f09105}
    }
  }
</style>
