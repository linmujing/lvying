<template>
    <!-- 我的优惠券 -->
    <div class="order_box">

        <!-- 优惠券标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的优惠券</span>
        </div>

        <!-- 优惠券类型切换 -->
        <div>
            <ul class="coupon_type padding_left_20 padding_top_30">
                <li :class="[couponData.couponIndex == index ? 'active' : '' ]" v-for="(items, index) in couponData.couponType" :key="index"   
                @click="changeCouponType(index)"  >{{items.text}}</li>
            </ul>
            <Select v-model="couponData.couponValue" style="width:200px" size="large">
                <Option v-for="item in couponData.platformItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>
        </div>

        <!-- 优惠券列表 -->
        <div class="coupon_list padding_left_20 padding_top_30" v-if="couponData.couponList.length > 0 ">
            <div class="coupon_item"  v-for="(items, index) in couponData.couponList" :key="index">
                <div class="item_top">
                    <p>￥<b class="font_20 padding_left_5">{{items.price}}</b></p>
                    <p>使用条件：{{items.content}}</p>
                    <p>使用时间：{{items.time}}</p>
                    <div class="dashed_line"></div>
                </div>
                <div class="item_bottom">
                    <span>使用说明：</span>
                    请在券面所示有效期内使用，
                    逾期失效用券应满足券面所示使用范围、
                    满减金额。通用券可全平台通用，机构/讲
                    师券仅限指定机构名下课程使用，课程券
                    仅限指定课程使用
                </div>
            </div>
        </div>

        <!-- 使用说明 -->
        <div class="coupon_explain padding_left_20 padding_top_30 padding_bottom_30"  v-if="couponData.couponList.length > 0 ">
            <p class="font_16" style="color:#000">优惠券使用说明</p>
            <div>
                请在券面所示有效期内使用，逾期失效<br>
                用券应满足券面所示使用范围、满减金额。通用券可全平台通用，机构/讲师券仅限指定机构名下课程使用，课程券仅限指定课程使用<br>
                如您的订单在用券后24小时内未最终支付，则订单失效，优惠券自动返还。您也可以去往“我的订单”手工删除待支付订单，以收回优惠券<br>
                如您的订单在用券后发生退款，优惠券不予以返还<br>
                一笔订单只能使用一张平台优惠券。平台券无法叠加使用；平台券可与机构发布的优惠券叠加使用；课程券与同一课程的折扣无法叠加使用<br>
                在个别特殊促销活动中，优惠券无法与其他优惠（如拼团、秒杀等）叠加使用。请以具体的活动规则为准
            </div>
        </div>

        <!-- 没有优惠券 -->
        <div class="order_has_not color_ccc" v-if="couponData.couponList.length == 0 ">
            暂无可用的优惠券
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*优惠券对象*/
            couponData:{
                // 搜索值
                couponValue: '',
                // 优惠券切换index
                couponIndex: '',
                // 优惠券类型
                couponType:[
                    { text:'全部', value:'0' },
                    { text:'可使用', value:'1' },
                    { text:'已使用', value:'2' },
                    { text:'已过期', value:'3' },
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
                // 优惠券列表
                couponList:[
                    {
                        price: '3',
                        content: '满100减3',
                        time: '2018.08.01-2018.08.31',
                        state:'1',
                        platform:''
                    },{
                        price: '5',
                        content: '满200减5',
                        time: '2018.08.01-2018.08.31',
                        state:'2',
                        platform:''
                    },{
                        price: '20',
                        content: '满1000减20',
                        time: '2018.08.01-2018.08.31',
                        state:'3',
                        platform:''
                    },{
                        price: '3',
                        content: '满100减3',
                        time: '2018.08.01-2018.08.31',
                        state:'1',
                        platform:''
                    },
                ] 
            }

        }
        
    },
    methods: {

        /**优惠券类型切换**/
        //@param index 获取当前点击的元素下标
        changeCouponType(index){

            this.couponData.couponIndex = index;

        },


        //监听优惠券数量添加滚动事件
        lisionOrderScroll(){

            //当页面优惠券商品数量大于5条时，就给列表添加滚动
            let n = 0;
            let data = this.orderData.orderList;

            for(let i = 0 ; i < data.length ; i++ ){
                for(let k = 0 ; k < data[i].items.length; k++ ){
                    n++;
                }
            }

            if(n > 5){
                return true;
            }
        },

        /**优惠券功能弹框**/
        // 确定
        //@param index 获取当前点击的元素下标
        openModel(index){

            if( this.orderData.orderList[index].payStateText == "待付款" ){

                this.orderModelData.modelState = 0;

            }else{

                this.orderModelData.modelState = 1;

            }

            this.orderModelData.modelValue = true;

        },
        // 关闭
        closeModel(){

            this.orderModelData.modelValue = false;

        }
    }
}
</script>


<style scoped lang='less'>

    //引入优惠券共用less文件
    @import '../shopCart/shopCart.less'; 

    // 优惠券类型
    .coupon_type{
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

    // 优惠券列表
    .coupon_list{
        .coupon_item{
            display:inline-block;
            width: 248px;
            margin: 0 20px 20px 0;

            .item_top{
                padding:20px 12px;
                height:135px;
                background: @color_00aa88;
                color:#fff;
                line-height: 30px;
                position: relative;

                .dashed_line{
                    border-bottom:2px dotted @color_00aa88;
                    position: absolute;
                    bottom: -2px;
                    left:0;
                    width:100%;
                }
            }
            .item_bottom{
                height:180px;
                padding:15px 12px;
                background: #f9f9f9;
                line-height: 25px;
                text-align: justify;
            }
        }
    }

    // 优惠券说明
    .coupon_explain{
        p{
            line-height: 50px;
        }
        div{
            line-height: 30px;
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
