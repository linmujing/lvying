<template>
  <div>
    <NavBar :nowIndex="nowIndex" :showNav="false"></NavBar>
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
            <div class="float_left color_999 line_height_30px margin_left_30 text_ellipsis">{{dataDetail.lookCount}}人看过</div>
          </div>
          <!--<div class="margin_top_20">-->
            <!--<span v-for="item in 3" class="tag">标签</span>-->
          <!--</div>-->
          <div v-if="hasBuy == 0">
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
            <div class="margin_top_10">
              <Dropdown v-show="cuponList.length > 0" trigger="custom" :visible="visible" placement="bottom-start" @on-click="selectCoupon">
                <a href="javascript:void(0)" @click="handleOpen">
                  <Tag color="orange">优惠</Tag>
                  <Icon type="ios-arrow-down" color="#fa8c16"></Icon>
                </a>
                <DropdownMenu slot="list" style="padding: 5px 10px 0 10px;max-height: 260px;overflow-y: scroll">
                  <div style="text-align: right;margin:10px;">
                    <Button type="success" size="small" ghost @click="handleClose">关闭</Button>
                  </div>
                  <DropdownItem v-for="(item,index) in cuponList" :key="index" :name="item.couponCode+','+item.couponForm" v-if="item.couponCount>0" style="background: #FFF3E5;margin-bottom: 10px;">
                    <Row style="width: 300px;">
                      <Col span="16" class="color_F5320D font_12" style="border-right: 2px dashed #EBDFD1">
                        <div class="font_16 font_weight_bold text_ellipsis">{{item.couponTitle}}</div>
                        <div class="margin_top_5 twoline_ellipsis">{{item.couponDesc}}</div>
                        <div class="margin_top_5 text_ellipsis">有效期{{dateFormat(item.couponStartTime)}} 至 {{dateFormat(item.couponEndTime)}}</div>
                      </Col>
                      <Col span="8">
                        <div class="color_F5320D font_20 text_center margin_left_10" style="line-height: 60px">立即领取</div>
                      </Col>
                    </Row>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="margin_top_40" >
              <Button size="large" type="warning" shape="circle" @click="addProductCart(dataDetail.productCode)">加入购物车</Button>
              <Button size="large" type="success" shape="circle" class="margin_left_10 bg_title" @click="goBuy(dataDetail.productCode)">立即购买</Button>
            </div>
          </div>
        </Col>
      </Row>
      <!--简介-->
      <div class="margin_top_50">
        <Affix>
          <div class="bg_f5 clearfix border_e6">
            <a @click="anchorBtn(0)" :class="{cur:isCur == 0}" class="inline_block padding_20_15 width_150px">简介</a>
            <a @click="anchorBtn(1)" :class="{cur:isCur == 1}" class="inline_block padding_20_15">全程动态管控系统</a>
            <a @click="anchorBtn(2)" :class="{cur:isCur == 2}" class="inline_block padding_20_15 width_150px">评价</a>
          </div>
        </Affix>
        <div v-show="isCur == 0" class="padding_20 classImg" v-html="dataDetail.productDesc">
          <!--<Row class="margin_top_10">-->
            <!--<Col span="2" class="font_weight_bold">适应企业</Col>-->
            <!--<Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>-->
          <!--</Row>-->
          <!--<Row class="margin_top_20">-->
            <!--<Col span="2" class="font_weight_bold">内容介绍</Col>-->
            <!--<Col span="22" class="line_height_25px">课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</Col>-->
          <!--</Row>-->
        </div>
      </div>
      <!--全程动态管控系统-->
      <div v-show="isCur == 0 || isCur == 1">
        <div class="font_weight_bold bg_f5 border_e6 padding_15 margin_top_20">全程动态管控系统</div>
        <div class="">
          <div class="margin_left_20 margin_top_30 margin_bottom_30 font_18">
            <div class="inline_block" v-for="(item,index) in sectionNav" @click="classBtn(index,item.sectionIndex)">
              <span class="pointer" :class="{color_title: classCur == index}">{{item.sectionName}}</span>
              <Icon v-show="index != (sectionNav.length-1) " type="ios-arrow-round-forward" size="30"/>
            </div>
          </div>

          <div v-if="sectionList.length > 0">
            <div v-for="(item, index) in sectionList" :key="index" class="margin_15 border_bottom_e6 padding_bottom_10">
              <!--<p class="font_18">{{item.sectionIndex}}</p>-->
              <div class="margin_left_30 margin_top_10 clearfix">
                <span>{{item.sectionName}}</span>
                <div class="float_right">
                  <div v-show="detailId === 1">
                    <Button size="small" shape="circle" class="bg_a5 color_fff" style="color: #fff" @click="detailId = 2">查看详情</Button>
                    <Button v-if="hasBuy == 0" size="small" type="success" shape="circle" class="bg_title" @click="goBuy(dataDetail.productCode)">立即购买</Button>
                  </div>
                  <div v-show="detailId === 2">
                    <Button @click="playerVideo(index,item)" size="small" type="success" ghost shape="circle" class="button_title">视频</Button>
                    <Button @click="playerAudio(item)" size="small" type="success" ghost shape="circle" class="button_title">音频</Button>
                    <Button @click="openTxt(item)" size="small" type="success" ghost shape="circle" class="button_title">文字</Button>
                    <Button v-show="parseInt(item.docStatus) === 0" @click="downloadDoc(item.docUrl)" size="small" type="success" shape="circle" class="bg_title width_60px">预览</Button>
                    <Button v-show="parseInt(item.docStatus) === 0" @click="downloadDoc(item.docUrl)" size="small" type="success" shape="circle" class="bg_title width_60px">下载</Button>
                  </div>
                </div>
              </div>
            </div>
            <div class="text_center padding_top_20 padding_bottom_30">
              <span class="pointer" @click="seeMore(1)">查看更多》</span>
            </div>
          </div>
          <div v-else class="text_center">
            暂无数据
          </div>

        </div>
      </div>
      <!--评价-->
      <div v-show="isCur == 0 || isCur == 2" class="margin_top_20">
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
        <div v-if="evaluateList.length>0" class="text_center padding_top_20 padding_bottom_30">
          <span class="pointer" @click="seeMore(2)">查看更多》</span>
        </div>
      </div>
    </div>
    <div v-if="dataStates">
      <!--音频-->
      <div v-show="showAudio">
        <Audio ref="myAudio" :audioParams="audioData" :imgUrl="dataDetail.productProfileUrl"></Audio>
      </div>
      <!--视频弹窗-->
      <Modal
        title="观看视频"
        v-model="videoModel"
        :footer-hide="true"
        width="70%"
        :mask-closable="false">
        <div v-show="videoModel">
          <Video ref="myVideo" :videoParams="videoData" :imgUrl="dataDetail.productProfileUrl" :activeIndex="curIndex"></Video>
        </div>
      </Modal>
    </div>
    <!--文字弹窗-->
    <Modal
      v-model="txtModel"
      :footer-hide="true"
      width="70%"
      :mask-closable="false">
      <div>
        <div v-html="txtUrl"></div>
      </div>
    </Modal>
	</div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
import Video from '../../components/Video.vue'
import Audio from '../../components/Audio.vue'
export default {
    components : {
      NavBar,
      Video,
      Audio
    },
    data() {
        return {
          typeId: parseInt(this.$route.query.typeId),
          nowIndex: this.$route.query.typeId-1,
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
          // 课程目录
          productSection: [],
          detailId: 1,
          visible: false,
          cuponList: [],
          videoModel: false,
          txtModel: false,
          videoData: [],
          audioData: {},
          showAudio: false,
          txtUrl: '',
          // 已经购买
          hasBuy: 0,
          sectionNav: [],
          sectionList: [],
          sectionSize: 6,
          sectionCont: 0,
          sectionIndex: 0,
          dataStates: false,
          curIndex: 0
        }

    },
    mounted(){
      if(!this.$route.query.hasBuy == ''){
        this.hasBuy = 1
      }
      this.productCode = this.$route.query.productCode
      // this.productCode = 'P154036432807121'
      this.getProductInfo(this.productCode)
      this.getEvaluateList(this.pageSize,  this.productCode)
    },
    methods: {
    	//详情
			anchorBtn(i){
				this.isCur = i;
			},
      //课程
      classBtn(i,sIndex){
        this.classCur = i;
        this.sectionIndex = sIndex
        this.getSectionIndex(sIndex)
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
      // 查看视频
      playerVideo(index, item){
        if(!parseInt(item.videoStatus) == 0 && !parseInt(item.videoStatus) == 1){
          this.$Message.warning('对不起，您需要购买后才能观看！');
          return ;
        }
        if(item.videoUrl == ''){
          this.$Message.warning('对不起，当前没有播放源！');
          return ;
        }
        this.videoModel = true
        this.showAudio = false
        this.curIndex = index
        this.$refs.myVideo.clickPlayerPlay();
      },
      // 收听音频
      playerAudio(item){
        if(!parseInt(item.voiceStatus) == 0 && !parseInt(item.voiceStatus) == 1){
          this.$Message.warning('对不起，您需要购买后才能收听！');
          return ;
        }
        if(item.voiceUrl == ''){
          this.$Message.warning('对不起，当前没有播放源！');
          return ;
        }
        this.audioData = item
        this.showAudio = true
        this.videoModel = false
        this.$refs.myAudio.startPlay();
      },
      // 查看文字
      openTxt(item){
        if(item.txtUrl === ''){
          this.$Message.warning('对不起，暂无数据！');
          return ;
        }
			  this.txtUrl = item.txtUrl
        this.txtModel = true
      },
      // 下载文件
      downloadDoc(doc){
        window.open(doc)
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
            console.log(res);
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
            console.log(res);
            if(res.data.code == 200){
              var arr = res.data.content.list
              // var list = []
              // for(var i=0;i<arr.length;i++){
              //   if(arr[i].couponEffectiveType == 1){
              //     list.push(arr[i])
              //   }
              // }
              this.cuponList = arr
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
        // 查看产品详情
        this.$api.getProductInfo( this.$Qs.stringify({'productCode': productCode}) )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){
              this.$Spin.hide()
              var result = res.data.content
              this.dataDetail = result
              this.merchantCode = result.merchantCode
              //获取优惠券列表
              this.getProductCoupon(this.productCode, result.merchantCode)
              //商品评分
              result.productScore == null ? this.valueCustomText = 0 : this.valueCustomText = result.productScore
              // 动态管控列表
              this.sectionNav = result.productSectionIndexList
              if(result.productSectionIndexList.length > 0){
                this.sectionIndex = result.productSectionIndexList[0].sectionIndex
              }
              this.videoData = result.productSectionList
              if(result.productSectionList.length>0){
                this.audioData = result.productSectionList[0]
              }
              this.dataStates = true
              console.log(this.audioData)
              // 动态管控课程目录
              this.sectionList = result.productSectionList
              // 课程目录
              this.productSection = result.productSection

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
      // 获取动态管控列表
      getSectionIndex(sectionIndex){
        let params = this.$Qs.stringify({'pageNo': 1, 'pageSize': this.sectionSize,'productSectionIndex': sectionIndex, 'productSection': this.productSection});
        this.$api.getProductCommentList( params )

          .then( (res) => {
            console.log(res);
            if(res.data.code == 200){
              var result = res.data.content
              var arr = []
              for (var i = 0; i < result.list.length; i++) {
                arr.push(result.list[i].productInfo.productSectionList)
              }
              this.sectionList = arr
              this.sectionCont = result.count
              console.log(arr)

            }else if (res.data.code == 500){

              this.$Message.warning(res.data.message);

            }

          })
          .catch((error) => {
            console.log('发生错误！', error);
          });
      },
      // 查看更多
      seeMore(type){
			  if(type == 1){
          if(this.sectionSize >= this.sectionCont){
            this.$Message.warning('已经没有更多了');
            return
          }
          this.sectionSize += 6
          this.getSectionIndex()
        }else {
          if(this.pageSize >= this.total){
            this.$Message.warning('已经没有更多了');
            return
          }
          this.pageSize += 3
          this.getEvaluateList(this.pageSize, this.productCode)
        }

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
