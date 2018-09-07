<template>
    <!-- 退款 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">
            
            <!-- 退款 -->
            <div class="refund_money" v-if="pageState == 'a'">

                <!-- 退款标题 -->
                <div class="order_title"><span>退款</span></div>

                

            </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /* 退款商品数据 */
            storeData:{
                list:[{
                    imgSrc: require("../../assets/images/image/cart_book.png"),
                    title: '法律书籍',
                    detail: '详情信息详情信息详情信息详情信息详情信息详情信息详情信息',
                }]
            },

        }
        
    },
    methods: {


    }
}
</script>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 



    
</style>
