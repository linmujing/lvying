<template>
    <!-- 我的订单 -->
    <div class="order_box">

        <!-- 订单标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的订单</span>
        </div>

        <!-- 订单搜索 -->
        <div class="order_search padding_left_20 padding_top_20">
            <Input v-model="orderData.orderSearchValue" size="large" placeholder="商品名称/退换货单号" style="width:200px;padding-right:10px;" />
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>
        </div>

        <!-- 订单类型切换 -->
        <ul class="order_type padding_left_20 padding_top_20">
            <li :class="[orderData.orderTypeIndex == index ? 'active' : '' ]" v-for="(items, index) in orderData.orderType" :key="index"   
             @click="changeOrderType(index)"  ></li>
        </ul>

        <!-- 订单list -->
        <div class="order_list_box padding_left_20 padding_top_20 padding_right_20">

            <!-- 订单list 头部 -->
            <div class="order_list_header">

            </div>

            <!-- 订单list列表 -->
            <ul>
                <li class=""></li>
            </ul>

        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            
             /* 订单数据对象 */
            orderData:{
                // 订单查询值
                orderSearchValue:'',
                // 订单类型下标
                orderTypeIndex: 0,
                // 订单类型
                orderType:[
                    { text: '', value: ''}
                ],


            }


            
        }
        
    },
    methods: {

        /**订单类型切换**/
        changeOrderType(index){

            this.orderData.orderTypeIndex = index;

        }

        

    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../../shopCart/shopCart.less'; 

    // 页面title
    .order_title{
        height: 48px;
        line-height: 48px;
        background: @color_fafafa;

        span{
            display: inline-block;
            width: 122px;
            text-align: center;
        }
    }





    
</style>
