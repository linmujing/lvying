<template>
    <!-- 我的评论 -->
    <div class="order_box padding_bottom_30">

        <!-- 评论标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的评论</span>
        </div>

        <!-- 评论类型切换 -->
        <div class="comment_type padding_left_20  padding_top_30">
            <Input v-model="commentValue" size="large" placeholder="请输入关键字" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" @click="getProductCommentList(1)">搜索</Button>
        </div>

         <!-- 评论列表 -->
        <div class="list_box padding_left_20 padding_right_20 padding_top_30">
            <div class="header padding_left_20">
                <Col :span="10"><span class="" style="text-align: left; ">评论</span></Col>
                <Col :span="4"><span>单号</span></Col>
                <Col :span="10"><span>商品信息</span></Col>
            </div>
            <ul class="list">
                <li class="padding_left_20" v-for="(items, index) in commentData.commentList" :key="index" >
                    <Col :span="10">
                        <div class="table_block">
                            <p class="td_block" style="text-align:left;position:relative;">
                                 <Tooltip placement="top-start" >
                                     <p  class="pointer text_hover_color" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:300px;" >{{items.commentDesc}}</p>
                                    <div slot="content" style="white-space: normal;">
                                        {{items.commentDesc}}
                                    </div>
                                </Tooltip>

                                <span style="position:absolute;bottom:6px;left:0;font-size:10px;">{{items.createDate}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="4">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.orderCode}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="10">
                        <div class="table_block">
                            <p class="td_block">
                                <span :data-productCode="items.productCode">{{items.productName}}</span>
                            </p>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 分页 -->
            <div class="list_page" v-if="total > 5 ">
                <Page :total="total" :current="page"   :page-size="pageSize"
                    @on-change="changeOrderPage" size="small" show-total show-elevator />
            </div>
        </div>

        <!-- 没有评论 -->
        <div class="order_has_not color_ccc" v-if="commentData.commentList.length == 0 ">
            暂无评论
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*评论对象*/
            commentData:{
                // 评论列表
                commentList:[]
            },
            page: 1,
            ciCode: this.$store.state.userData.cicode,
            total: 0,
            pageSize: 5,
            // 搜索值
            commentValue: '',

        }

    },
    mounted(){
      this.getProductCommentList(this.page)
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
          if(arr.length > 1  || arr == '4'){
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

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.page = value;
            this.getProductCommentList(value)
        },
        // 获取评论列表
        getProductCommentList(page){

            this.$Spin.show();
          // 获取产品分类列表
          this.$api.getProductCommentList( this.$Qs.stringify({'pageNo': page, 'pageSize': this.pageSize, 'orderCode': '', 'ciCode': this.ciCode, 'productScore': '', 'searchKey': this.commentValue}) )

            .then( (res) => {
              console.log(res);
                this.$Spin.hide();
              if(res.data.code == 200){
                var result = res.data.content
                this.commentData.commentList = result.list
                this.total = result.count
              }else {
                this.$Message.warning(res.data.message);
              }
            })
            .catch((error) => {
              console.log('发生错误！', error);
            });
        },
    }
}
</script>


<style scoped lang='less'>

    //引入评论共用less文件
    @import '../shopCart/shopCart.less';

    // 评论类型
    .comment_type{
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

    // 评论列表
    .list_box{

        // 头部
        .header{
            background: @color_fafafa;
            text-align: center;
            height: 50px;
            line-height: 50px;

            span{
                display: block;

            }

        }
        // 列表
        .list{
            li{
                height: 90px;
                border-bottom:1px solid @color_e6e6e6;
                .table_block{
                    height: 90px;
                    width:100%;
                    text-align: center;
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
