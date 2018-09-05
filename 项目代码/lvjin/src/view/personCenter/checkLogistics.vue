<template>
    <!-- 查看物流 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">
            
            <!-- 查看物流 -->
            <div class="check_logistics" >

                <!-- 查看物流标题 -->
                <div class="order_title"><span>查看物流</span></div>

                <div class="logistics_box">
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
            </div>


        </div>
        <div><Button type="success" size="large" shape="circle" @click="pageChange">查看页面</Button></div>
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
                    this.pageState = 'b';
                    this.logisticsData.orderStateText = '已关闭';
                    break; 
                case 'b': 
                    this.pageState = 'c'; 
                    
                    break;
                case 'c': 
                    this.pageState = 'a';
                    this.logisticsData.orderStateText = '待付款';
                    break;
           }


       }

    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 

    .check_logistics{
        height: 750px;
        background: #fff;
        
        .logistics_box{
            padding:30px 20px;
            font-size: 14px;

            // 物流信息
            .logistics_detail, .order_detail{
                border:1px solid @color_e6e6e6;
                height: 234px;
            }
            .logistics_detail{
                border-right:0;

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
                        width: 320px;
                    }
                }
            }

            //订单信息
            .order_detail{
                text-align: center;

                p{
                    line-height: 34px;
                }
            }
        }
        
    }

    
</style>
