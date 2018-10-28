<template>
    <!-- 我的课程 -->
    <div class="order_box padding_bottom_30">

        <!-- 课程标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的课程</span>
        </div>

         <!-- 课程列表 -->
        <div class="list_box padding_left_20 padding_top_30">
            <ul class="list">
                <li  v-for="(items, index) in courseList" :key="index"  @click="goDetail(items.productCode,items.type)">
                    <Col :span="8">
                        <div class="item">
                            <p class="item_img">
                                <img :src="items.imgSrc" alt="">
                            </p>
                            <div class="item_content">
                                <p class="title text_ellipsis" :title="items.title">{{items.title}}</p>
                                <Row>
                                    <Col :span="12">
                                        <div class="text_left text_ellipsis">{{items.source}} &nbsp;</div>
                                    </Col>
                                    <Col :span="12">
                                        <div class="text_right">
                                            <Button type="success" shape="circle" size="small"  style="background:#00aa88;width:80px;" >查看详情</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 订单分页 -->
            <div class="list_page" v-if="pageData.total > 5">
                <Page :total="pageData.total" :current="pageData.current"   :page-size="pageData.pageSize"
                    @on-change="changeOrderPage"  show-total show-elevator />
            </div>
        </div>

        <!-- 没有课程 -->
        <div class="order_has_not color_ccc" v-if="courseList.length == 0 ">
            暂无课程
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            // 课程列表
            courseList:[],

            // 分页
            pageData:{
                total: 0,
                pageSize: 5,
                current: 1
            },

            // 课程列表
            courseList1:[],

        }

    },
    methods: {

        /*点击打开详情*/
        //@param code 商品编号
        //@param attr 商品属性1-实物，2-音频 3-视频 4-文档 包含多个使用逗号链接
        goDetail(code, attr){
            console.log(attr)
          var arr = attr;
          if(attr.indexOf(',') != -1){ attr = attr.split(',') }
          // 包含多个跳转到动态管控详情页
          if(arr.length > 1 || arr == '4'){
            this.$router.push({
              path:'/industryDynamicDetail',
              query: {
                productCode: code,
                // hasBuy 购买后跳转过去的状态
                hasBuy: 1
              }
            })
          }else {
            // 1-实物，2-音频 3-视频
            switch (attr) {
              case '1':
                this.$router.push({
                  path:'/bookDetail',
                  query: {
                    productCode: code
                  }
                })
                break
              case '2':
                this.$router.push({
                  path:'/videoCourseDetail',
                  query: {
                    productCode: code,
                    // typeId 单独只有音频或视频时需传的参数 typeId：4-音频 3-视频
                    typeId: 4,
                    hasBuy: 1
                  }
                })
                break
              case '3':
                this.$router.push({
                  path:'/videoCourseDetail',
                  query: {
                    productCode: code,
                    typeId: 3,
                    hasBuy: 1
                  }
                })
                break
            }
          }

        },

        // 获取我的课程
        getMyCourse(){

            let pageNo = this.pageData.current;
            let pageSize = 6;
            let ciCode = this.$store.state.userData.cicode;
            let param = this.$Qs.stringify({pageNo,pageSize,ciCode})

            this.$Spin.show();

            this.$api.getmyCourseList(param).then((res)=>{

                console.log(res);

                if(res.data.code == 200){

                    let  data = res.data.content.list, arr= [], codeStr = '';
                    this.pageData.total = res.data.content.count;

                    for(let item of data){
                        arr.push({
                            title: item.productName,
                            type: '0',
                            productCode: item.productCode,
                            source: item.merchantNm,
                            imgSrc: item.productProfileUrl,
                        })
                        codeStr += codeStr = '' ? item.productCode : ',' + item.productCode;
                    }

                    this.courseList = arr;
                    console.log(arr)
                    // 获取多个产品数据
                    this.getProductCartData(codeStr);

                    this.$Spin.hide();

                }else{

                    this.$Spin.hide();
                    this.$Message.warning(res.data.message);

                }
            })
              .catch((error) => {
                this.$Message.warning('加载失败,请刷新重试!');
                console.log('发生错误！', error);
              });
        },
        // 获取多个产品数据
        getProductCartData(productCode){        

            this.$api.getProductShowCase( this.$Qs.stringify({ 'productCode': productCode }) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let Data = res.data.content ;

                    for(let lists of Data){
                        for(let items of this.courseList){
                            if(lists.productCode == items.productCode){
                                items.type = lists.productProperty ;
                            }
                        }
                    }

                }else{

                    this.$Message.warning(res.data.message);

                }

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });

        },
        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.pageData.current = value;
            this.getMyCourse();

        },

    },
    mounted(){

        // 获取我的课程
        this.getMyCourse();

    }
}
</script>


<style scoped lang='less'>

    //引入课程共用less文件
    @import '../shopCart/shopCart.less';

    // 课程类型
    .course_type{
        display: inline-block;
        margin-right:50px;

        >li{
            display: inline-block;
            height: 38px;
            line-height: 38px;
            width: 80px;
            text-align: center;
            cursor: pointer;

            &:hover, &.active{
                background: @color_00aa88;
                color:#fff;
            }

        }
    }

    // 课程列表
    .list_box{

        // 列表
        .list{
            li{
                height: 300px;
                width:300px;
                border:1px solid @color_e6e6e6;
                overflow: hidden;
                cursor: pointer;
                display: inline-block;
                margin-bottom: 20px;
                margin-right: 20px;

                .item{
                    width: 300px;

                }
                .item_img{
                    width:100%;
                    height:210px;


                    img{
                        width:100%;
                        height: 100%;
                    }
                }
                .item_content{
                    padding:5px 15px;

                    .title{
                        line-height: 40px;
                        font-size: 16px;
                        font-weight:700;
                    }
                }
            }
        }

        // 订单分页
        .list_page{
            float: right;
            padding-right:20px;
            padding-top:30px;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }


    // order为空判断
    .order_has_not{
        padding:250px 0 300px 0;
        text-align: center;
        img{
            width: 260px;
        }
    }
    // order滚动设置
    .order_scroll{
        height: 450px;
        width: 100%;
        overflow-y: scroll;
    }


</style>
