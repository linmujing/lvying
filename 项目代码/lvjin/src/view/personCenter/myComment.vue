<template>
    <!-- 我的评论 -->
    <div class="order_box padding_bottom_30">

        <!-- 评论标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的评论</span>
        </div>

        <!-- 评论类型切换 -->
        <div class="comment_type padding_left_20 padding_top_30">
            <Input v-model="commentValue" size="large" placeholder="请输入关键字" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" @click="getProductCommentList(1)">搜索</Button>
        </div>

         <!-- 评论列表 -->
        <div class="list_box padding_left_20 padding_top_30">
            <div class="header">
                <Col :span="10"><span style="text-align: left; padding-left:70px; ">评论</span></Col>
                <Col :span="4"><span>评价人</span></Col>
                <Col :span="10"><span>商品信息</span></Col>
            </div>
            <ul class="list">
                <li class="padding_left_20" v-for="(items, index) in commentData.commentList" :key="index" >
                    <Col :span="10">
                        <div class="table_block">
                            <p class="td_block" style="text-align:left;">
                                <span>{{items.commentDesc}}</span> <br>
                                <span>{{items.createDate}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="4">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.ciName}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="10">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.productName}}</span>
                            </p>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 订单分页 -->
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
                commentList:[
                    // {
                    //     content: '法律顾问',
                    //     time: '2018.08.01-2018.08.31',
                    //     type:'退货退款',
                    //     title:'法律顾问书籍'
                    // }
                ]
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
