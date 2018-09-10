<template>
    <!-- 我的评论 -->
    <div class="order_box padding_bottom_30">

        <!-- 评论标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的评论</span>
            <span><a href="https://www.baidu.com/?id=100">百度</a></span>
        </div>

        <!-- 评论类型切换 -->
        <div>
            <ul class="comment_type padding_left_20 padding_top_30">
                <li :class="[commentData.commentIndex == index ? 'active' : '' ]"  v-for="(items, index) in commentData.commentType" :key="index"   
                @click="changecommentType(index)"  >{{items.text}}</li>
            </ul>
            <Input v-model="commentData.commentValue" size="large" placeholder="请输入关键字" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>
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
                                <span>{{items.content}}</span> <br>
                                <span>{{items.time}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="4">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.type}}</span> 
                            </p>
                        </div>
                    </Col>
                    <Col :span="10">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.title}}</span>
                            </p>
                        </div>
                    </Col>
                </li>
            </ul>

            <!-- 订单分页 -->
            <div class="list_page" v-if="commentData.commentList.length > 5 ">
                <Page :total="commentData.pageData.total" :current="commentData.pageData.current"   :page-size="commentData.pageData.pageSize"  
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
                // 搜索值
                commentValue: '',
                // 评论切换index
                commentIndex: '',
                // 评论类型
                commentType:[
                    { text:'全部', value:'0' },
                    { text:'好评', value:'1' },
                    { text:'中评', value:'2' },
                    { text:'差评', value:'3' },
                ],
                // 平台
                platformItems:[{
                        value: '平台1',
                        label: '平台1'
                    }, 
                    {
                        value: '平台2',
                        label: '平台2'
                    }, 
                ],
                // 评论列表
                commentList:[
                    {
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },{
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },{
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },{
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },{
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },{
                        content: '法律顾问',
                        time: '2018.08.01-2018.08.31',
                        type:'退货退款',
                        title:'法律顾问书籍'
                    },
                ],
                // 分页
                pageData:{
                    total: 7,
                    pageSize: 5,
                    current: 1
                } 
            }

        }
        
    },
    methods: {

        /**评论类型切换**/
        //@param index 获取当前点击的元素下标
        changecommentType(index){

            this.commentData.commentIndex = index;

        },

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.commentData.pageData.current = value;

        },
        //监听评论数量添加滚动事件
        lisionOrderScroll(){

            //当页面评论商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.commentData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].items.length; k++ ){
                    n++;
                }
            }

            if(n > 5){
                return true;
            }
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
