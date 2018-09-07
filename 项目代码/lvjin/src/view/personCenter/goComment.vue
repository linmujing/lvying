<template>
    <!-- 发表评价 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">

            <!-- 发表评价 -->
            <div class="go_comment" >

                <!-- 发表评价标题 -->
                <div class="order_title"><span>发表评价</span></div>

                <!-- 评价头部 -->
                <div class="comment_header padding_left_20 padding_top_40">
                    <span class="img_box img_middle_center"><img src="../../assets/images/image/cart_book.png" alt=""></span>
                    <span class="comment_type" :class=" [commentData.typeValue == items.value ? 'color_f09105':'' ]"  v-for="(items, index) in commentData.typeList" :key="index"   
                        @click="commentData.typeValue = items.value" >{{items.text}}</span>
                </div>

                <!-- 评价内容 -->
                <div class="comment_remark padding_left_20 padding_top_20 padding_right_20">

                    <Input v-model="commentData.commentRemark" type="textarea" style="width:100%;" placeholder="宝贝满足你的期待吗？" :rows="15"  />
                    <div class="remark_img"><span class=""><img src="../../assets/images/icon/img_up.png" alt=""></span></div>

                </div>

                <!-- 店铺评分 -->
                <div class="comment_grade padding_left_20 padding_top_40">
                    <p class="font_16">店铺评分</p>
                    <div class="padding_left_10 padding_top_20">
                        <span class="padding_right_10" >描述相符</span> <Rate clearable v-model="commentData.gradeValue1" /> 
                    </div>
                    <div class="padding_left_10 padding_top_20">
                        <span class="padding_right_10">帮助程度</span> <Rate clearable v-model="commentData.gradeValue2" /> 
                    </div>
                </div>

                <div class="padding_left_20 padding_top_40 padding_bottom_40">
                     <Button type="success" size="large" shape="circle" style=";width:100px;"  @click="commentData.modelValue = true" >发布</Button>
                </div>
                
                <!-- 发布操作弹框 -->
                <Modal v-model="commentData.modelValue" width="480" footer-hide >
                    <p slot="header" style="background:#f8f8f8;">
                        <span class="font_14" style="font-weight:400;">提示</span>
                    </p>
                    <div class="font_16 padding_top_30 padding_bottom_40 padding_left_10" >评价成功</div>
                    <div style="padding: 30px 0 20px 200px; "> 
                        <Button shape="circle" type="success" size="large"  style="background:#00aa88;width:80px;" @click="commentData.modelValue = false">确定</Button>
                        <span style="display:inline-block;width:50px;"></span>
                        <Button shape="circle" type="success" size="large" style="background:#a5a5a5;width:80px;" @click="$router.go(-1)">返回</Button>
                    </div>
                </Modal>
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

            /* 发表评价商品数据 */
            commentData:{
                // 评价类型值
                typeValue:'',
                // 评价类型
                typeList:[
                    {text: '好评', value: '1'},
                    {text: '中评', value: '2'},
                    {text: '差评', value: '3'},
                ],
                // 评价
                commentRemark:'',
                // 评分
                gradeValue1:0,
                gradeValue2:0,

                // 发布弹框
                modelValue: false
            },

        }
        
    },
    methods: {

    }
}
</script>

<style>
     .ivu-modal .ivu-modal-header {
        border-bottom:0;
        padding: 0 16px;
        height:30px;
        line-height: 40px;
        background: #f8f8f8;
    }  
    .ivu-modal .ivu-modal-content{
        border-radius: 0;
    }
    .ivu-modal-close .ivu-icon-ios-close{
        top:-5px;
    } 
    .ivu-icon-ios-close:before{
        content: "\F178";
    }

</style>

<style scoped lang='less'>

    //引入订单共用less文件
    @import '../shopCart/shopCart.less'; 

    .go_comment{
       background: #fff; 
    }

    // 评价头部
    .comment_header{
        height: 150px;

        span{
            display: inline-block;
        }
        .img_box{
            width: 100px;
            height: 90px;
            border: 1px solid @color_e6e6e6;
            vertical-align: middle;
        }
        .comment_type{
            margin-left: 70px;
            cursor: pointer;
        }
    }

    // 评价内容
    .comment_remark{
        position: relative;

        .remark_img{
            position: absolute;
            bottom: 10px;
            left: 40px;
            img{
                width: 40px;
                cursor: pointer;
            }
            
        }
    }
    
</style>
