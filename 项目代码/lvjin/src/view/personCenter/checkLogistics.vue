<template>
    <!-- 查看物流 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">
            
            <!-- 查看物流 -->
            <div class="check_logistics" >

                <!-- 查看物流标题 -->
                <div class="order_title"><span>查看物流</span></div>

                <!-- 带参数查看物流 -->
                <div class="logistics_box" v-if="pageState !='c'">
                    <Col :span="9">
                        <div class="logistics_detail">
                            <p class="title">物流信息</p>
                            <div class="item_box"><span>物流单号：</span><div>{{logisticsData.id}}</div></div>
                            <div class="item_box"><span>发货地址：</span><div>{{logisticsData.deliveryAddress}}</div></div>
                            <div class="item_box"><span>收货人：</span><div><b>{{logisticsData.person}}</b>  </div></div>
                            <div class="item_box"><span>收货地址：</span><div>{{logisticsData.collectAddress}}</div></div>
                        </div>
                    </Col>
                    <Col :span="15">
                        <div class="order_detail">
                            <div class="padding_top_30"><b>订单状态：</b>{{logisticsData.orderStateText}}</div>
                            <p class="padding_top_30">物流单号：{{logisticsData.id}}</p>
                            <p >物流：{{logisticsData.logisticCompany}}</p>
                            <p v-if="logisticsData.orderStateText == '待付款'">
                                <Button type="warning" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" >去付款</Button>
                                <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0">取消订单</Button>
                            </p>
                            <p v-if="logisticsData.orderStateText == '已关闭'">
                                <Button type="success" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0" >重新购买</Button>
                                <Button type="text" shape="circle" style="width:80px;height:26px;line-height:5px;padding:0">删除订单</Button>
                            </p>
                        </div>
                    </Col>
                </div>

                <!-- 普通查看物流 -->
                <div class="logistics_box" v-if="pageState =='c'">
                    <Col :span="11">
                        <div class="logistics_detail">
                            <p class="title">物流信息</p>
                            <div class="item_box"><span>物流单号：</span><div>{{logisticsData.id}}</div></div>
                            <div class="item_box"><span>发货地址：</span><div>{{logisticsData.deliveryAddress}}</div></div>
                            <div class="item_box"><span>收货人：</span><div><b>{{logisticsData.person}}</b>  </div></div>
                            <div class="item_box"><span>收货地址：</span><div>{{logisticsData.collectAddress}}</div></div>
                        </div>
                    </Col>
                    <Col :span="13">
                        <div class="store_list">
                            <div class="store_item">
                                <p class="img_box"><img src="../../assets/images/image/cart_book.png" alt=""></p>
                                <span>500 * 1</span>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>


        </div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /* 物流状态状态 */ 
            // a: 查看物流  b:查看物流中 
            pageState: 'a',

            /* 查看物流数据 */
            logisticsData:{
                id:'2018020141452',
                deliveryAddress:'湖南省长沙市芙蓉区芙蓉大道建设八一路口32号湖南省长沙市芙蓉区芙蓉大道建设八一路口32号',
                person:'666先生',
                collectAddress:'湖南省长沙市芙蓉区芙蓉大道建设八一路口33号湖南省长沙市芙蓉区芙蓉大道建设八一路口33号',
                logisticCompany:'圆通',
                orderState:'',
                orderStateText:'待付款',
            },

            
            
        }
        
    },
    methods: {
       pageChange(){

           switch(this.pageState){
                case 'a': 
                    this.pageState = 'a';
                    this.logisticsData.orderStateText = '待付款';
                    break; 
                case 'b': 
                    this.pageState = 'b'; 
                    this.logisticsData.orderStateText = '已关闭';
                    break;
                case 'c': 
                    this.pageState = 'c';
                    break;
           }


       }

    },
    mounted(){
        // 获取页面类型
        this.pageState = this.$route.params.state;

        // 监听页面变化
        this.pageChange();
    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 

    .check_logistics{
        height: 750px;
        background: #fff;
        
        // 带参数查看物流
        .logistics_box{
            padding:30px 20px;
            font-size: 14px;

            // 物流信息
            .logistics_detail, .order_detail{
                border:1px solid @color_e6e6e6;
                height: 234px;
            }
            .logistics_detail{

                .title{
                    height: 40px;
                    line-height: 40px;
                    padding-left:20px;
                    margin-bottom:15px;
                    background: #f5f5f5;
                    
                }
                .item_box{
                    padding: 5px 20px;
                    span{
                        display: inline-block;
                        vertical-align: top;
                    }
                    >div{
                        display: inline-block; 
                        width: 80%;
                    }
                }
            }

            //订单信息
            .order_detail{
                text-align: center;
                border-left:0;

                p{
                    line-height: 34px;
                }
            }
        }

        // 普通查看物流
        .store_list{

            .store_item{
                display: inline-block;
                width: 230px;
                padding-left: 50px;
               text-align: center;

                .img_box{
                    height: 160px;
                    border:1px solid @color_e6e6e6;

                    position: relative;

                    img{
                        display: block;
                        width:50%;
                        margin: auto auto;
                        position: absolute;
                        top:0;
                        bottom:0;
                        left:0;
                        right:0;
                    }
                }
                span{
                        line-height: 40px;
                }
            }
        }
        
    }

    
</style>
