<template>
    <!-- 退款 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">
            
            <!-- 退款 -->
            <div class="refund_money" v-if="pageState == 'a'">

                <!-- 退款标题 -->
                <div class="order_title"><span>退款</span></div>

                <!-- 退款商品列表 -->
                <ul class="store_list padding_left_20 padding_top_20" >
                    <li v-for="(items, index) in storeData.list" :key="index">
                        <Row>
                            <Col span="6"> <span class="block_center img_box"><img :src="items.imgSrc" alt=""></span> </Col>
                            <Col span="16"> 
                                <div class="padding_top_40 book_detail"> 
                                    <p class="font_16"> {{items.title}} </p>
                                    <div class="padding_top_10"> {{items.detail}} </div>
                                </div>
                            </Col>
                        </Row>
                    </li>
                </ul>

                <!-- 退款说明 -->
                <div class="padding_top_30 padding_left_20">
                   <div class="input_box">
                        <span >退款原因：</span> 
                        <RadioGroup v-model="refundData.Reason" >
                                <Radio label="0">
                                    <span>多拍/拍错/不想要</span>
                                </Radio>
                                <Radio label="1">
                                    <span>缺货</span>
                                </Radio>
                        </RadioGroup>
                   </div>
                   <div class="input_box">
                        <span >退款金额：</span> 
                        <i>{{refundData.Money}}</i>
                   </div>
                   <div class="input_box relative">
                        <span  style="vertical-align:top;">退款说明：</span> 
                        <Input v-model="refundData.Explain" type="textarea" style="width:500px;" :rows="6"  />
                   </div>
                    <div class="input_box">
                        <span style="width:80px;"></span>
                        <Button type="success" size="large" shape="circle" style=";width:100px;" >提交</Button>
                   </div>
                </div>

            </div>

            <!-- 退款处理中 -->
            <div class="refund_money" v-if="pageState == 'b'">

                <!-- 退款标题 -->
                <div class="order_title"><span>退款处理中</span></div>

                <!-- 退款金额 -->
                <div style="border-bottom:1px solid #e6e6e6;line-height:30px;margin:20px;">
                    <p>退款金额：{{refundDataHandle.Money}}</p>
                    <p>退款微信：{{refundDataHandle.wechat}}</p>
                </div>

                <!-- 退款商品列表 -->
                <ul class="store_list padding_left_20 padding_top_20" >
                    <li v-for="(items, index) in storeData.list" :key="index">
                        <Row>
                            <Col span="6"> <span class="block_center img_box"><img :src="items.imgSrc" alt=""></span> </Col>
                            <Col span="16"> 
                                <div class="padding_top_40 book_detail"> 
                                    <p class="font_16"> {{items.title}} </p>
                                    <div class="padding_top_10"> {{items.detail}} </div>
                                </div>
                            </Col>
                        </Row>
                    </li>
                </ul>
                <div style="height:200px;line-height:300px;font-size:18px;text-align:center;">商家处理中......</div>
            </div>

            <!-- 退款成功 -->
            <div class="refund_money" v-if="pageState == 'c'" style="height:500px;padding-top:1px;" >

                <!-- 退款日期 -->
                <div style="border-bottom:1px solid #e6e6e6;line-height:30px;margin:20px;">
                    <b>退款成功</b>
                    <p>{{refundDataSuccess.date}}</p>
                </div>

                <!-- 退款金额 -->
                <div style="border-bottom:1px solid #e6e6e6;line-height:30px;margin:20px;">
                    <p>退款金额：{{refundDataSuccess.Money}}</p>
                    <p>退款微信：{{refundDataSuccess.wechat}}</p>
                </div>

                <!-- 退款商品列表 -->
                <ul class="store_list padding_left_20 padding_top_20" >
                    <li v-for="(items, index) in storeData.list" :key="index">
                        <Row>
                            <Col span="6"> <span class="block_center img_box"><img :src="items.imgSrc" alt=""></span> </Col>
                            <Col span="16"> 
                                <div class="padding_top_40 book_detail"> 
                                    <p class="font_16"> {{items.title}} </p>
                                    <div class="padding_top_10"> {{items.detail}} </div>
                                </div>
                            </Col>
                        </Row>
                    </li>
                </ul>
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

            /* 退款状态 */ 
            // a: 退款  b:退款中  c:退款成功
            pageState: 'c',

            /* 退款商品数据 */
            storeData:{
                list:[{
                    imgSrc: require("../../assets/images/image/cart_book.png"),
                    title: '法律书籍',
                    detail: '详情信息详情信息详情信息详情信息详情信息详情信息详情信息',
                }]
            },

            /*退款说明*/
            refundData:{
                // 退款原因
                Reason: '',
                // 退款金额
                Money: 0.00,
                // 退款说明
                Explain: '',
            },

            /*退款处理中*/
            refundDataHandle:{
                Money: 0,
                wechat: '666'
            },

            /*退款成功*/
            refundDataSuccess:{
                Money: 0,
                wechat: '666',
                date: '2018-12-01 12:00:00'
            }
            
        }
        
    },
    methods: {
       pageChange(){

           switch(this.pageState){
                case 'a': this.pageState = 'b'; break; 
                case 'b': this.pageState = 'c'; break;
                case 'c': this.pageState = 'a'; break;
           }
           console.log()

       }

    },
    mounted(){
        // 获取页面类型
        this.pageState = this.$route.params.state;


    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 


    .refund_money{
        min-height: 780px;
        background:#fff;

        // 退款商品列表
        .store_list{
            li{

                .img_box{
                    width: 270px;
                    height: 200px;
                    padding:20px 0;
                    text-align: center;
                    border:1px solid @color_e6e6e6;
                    img{
                        height:160px;
                    }
                }
                .book_detail{
                    height: 200px;
                }
            }
        }

        // 退款说明
        .input_box{
            padding-top:30px;
            span{
                display: inline-block;
                position:relative;
                top:2px;
                margin-right:10px;
            }
        }
    }
    
</style>
