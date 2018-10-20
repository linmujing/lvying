<template>
    <!-- 查看物流 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">
            
            <!-- 查看物流 -->
            <div class="check_logistics" >

                <!-- 查看物流标题 -->
                <div class="order_title"><span>查看物流</span><i class="text_hover_color padding_right_20 float_right" @click="$router.go(-1)">返回</i></div>

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
                                <p class="img_box"><img :src="productUrl" alt=""></p>
                                <span>￥{{productPrice}} * {{productNum}}</span>
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
                id:'',
                deliveryAddress:'',
                person:'',
                collectAddress:'',
                logisticCompany:'',
            },   
            
            // 商品信息 orderCode, trackNo, productProfileUrl, productPirce, productNun
            productUrl: this.$route.query.productProfileUrl,
            productPrice: this.$route.query.productPirce,
            productNum: this.$route.query.productNun
            
        }
        
    },
    methods: {

        // 查看物流
        checkLogistics(){

            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 
                'orderCode': this.$route.query.orderCode,
                'trackNo': this.$route.query.trackNo,
                }) ;

            this.$api.getOrderTrack( param )

            .then( (res) => {

                console.log(res)

                this.$Spin.hide()

                if(res.data.code == 200){

                    this.logisticsData = {
                        id: res.data.content.trackNo ,
                        deliveryAddress: res.data.content.sendAddressId ,
                        person: res.data.content.signName ,
                        collectAddress: res.data.content.signAddressId ,
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

    },
    mounted(){

        this.checkLogistics();

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
