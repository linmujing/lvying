<template>
    <!-- 发表评价 -->
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="box_center_1200">

            <!-- 发表评价 -->
            <div class="go_comment" >

                <!-- 发表评价标题 -->
                <div class="order_title"><span>发表评价</span><i class="text_hover_color padding_right_20 float_right" @click="$router.go(-1)">返回</i></div>

                <div v-for="(item, index) in commentData.list" :key="index">
                    <!-- 评价头部 -->
                    <div class="comment_header padding_left_20 padding_top_40">
                        <span class="img_box img_middle_center">
                            <img :src="product.imgsrc" alt="" style="height:100%;">
                        </span>
                        <span style="line-height:30px">{{product.name}}</span>
                        <!-- <span class="comment_type" :class=" [commentData.typeValue == items.value ? 'color_f09105':'' ]"  v-for="(items, index) in commentData.typeList" :key="index"   
                            @click="commentData.typeValue = items.value" >{{items.text}}</span> -->
                    </div>

                    <!-- 评价内容 -->
                    <div class="comment_remark padding_left_20 padding_top_20 padding_right_20">

                        <Input v-model="item.commentRemark" type="textarea" style="width:100%;" placeholder="宝贝满足你的期待吗？" :rows="15"  />
                        <div class="remark_img">

                            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" >
                                <template>
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="1073741824"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                :action="BASE_URL"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" v-model="visible">
                                <img :src="imgsrc" v-if="visible" style="width: 100%">
                            </Modal>

                        </div>

                    </div>

                    <!-- 店铺评分 -->
                    <div class="comment_grade padding_left_20 padding_top_40">
                        <p class="font_16">商品评分</p>
                        <div class="padding_left_10 padding_top_20">
                            <span class="padding_right_10" >描述相符</span> <Rate clearable v-model="item.gradeValue1" /> 
                        </div>
                        <div class="padding_left_10 padding_top_20">
                            <span class="padding_right_10">帮助程度</span> <Rate clearable v-model="item.gradeValue2" /> 
                        </div>
                    </div>
                </div>
                

                <div class="padding_left_20 padding_top_40 padding_bottom_40">
                     <Button type="success" size="large" shape="circle" style=";width:100px;"  @click="goCommentData" >发布</Button>
                </div>
                
                <!-- 发布操作弹框 -->
                <Modal v-model="commentData.modelValue" width="480" footer-hide >
                    <p slot="header" style="background:#f8f8f8;">
                        <span class="font_14" style="font-weight:400;">提示</span>
                    </p>
                    <div class="font_16 padding_top_30 padding_bottom_40 padding_left_10" >评价成功</div>
                    <div style="padding: 30px 0 20px 200px; "> 
                        <Button shape="circle" type="success" size="large"  style="background:#00aa88;width:80px;" @click="$router.go(-1)">确定</Button>
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

                list:[{
                    imgsrc: this.$route.query.productProfileUrl ,
                    name: this.$route.query.productName,
                    // 评价
                    commentRemark:'',
                    // 评分
                    gradeValue1: 5,
                    gradeValue2: 5,
                }],

                // 发布弹框
                modelValue: false,
                
            },

            // 图片上传
            imgsrc:'',
            imglist: [],
            visible: false,
            uploadList: [],
            BASE_URL: this.GLOBAL.BASE_URL,

            // 商品信息
            product:{}

        }
        
    },
    methods: {
        
        /** 图片上传 **/
        // 图片展示
        handleView (url) {
            this.imgsrc = url;
            this.visible = true;
        },
        // 图片移除
        handleRemove (file) {
            this.uploadList.splice(this.uploadList.indexOf(file), 1);
        },
        handleSuccess (res, file) {

            console.log(res)

            this.$Spin.hide();

            if(res.code == 200){

                file.url = res.content ;
                file.name = ' ';

                this.uploadList.push({ 'url': res.content, 'name': ''})

            }else{
                this.$Message.warning({ content: '图片上传失败，请重新上传'  })
            }

        },
        handleFormatError (file) {
            this.$Spin.hide();
            this.$Message.warning({  content: '图片格式只能为jpg、png、gif'  });
        },
        handleMaxSize (file) {
            this.$Spin.hide();
            this.$Message.warning({ content: '上传图片过大，最大不能超过10M'  });
        },
        
        // 开始上传
        handleBeforeUpload () {

            this.$Spin.show();

            let check = this.uploadList.length < 3;

            if (!check) {
               this.$Message.warning({ content: '最多只能上传3张图片！'  });
               this.$Spin.hide();
               return ;
            }

            return check;

        },

        // 评论
        goCommentData(){

            let urlStr = '';
            for(let item of this.uploadList){ urlStr += urlStr == '' ? item.url : ',' + item.url }

            this.$Spin.show()
              
            let param = this.$Qs.stringify({ 
                'ciCode': this.$store.state.userData.cicode , 
                'productCode': this.$route.query.productCode, 
                'orderCode': this.$route.query.orderCode,
                'commentPicUrl': urlStr,
                'commentDesc': this.commentData.list[0].commentRemark,
                'helpConsist': this.commentData.list[0].gradeValue1,
                'desConsist': this.commentData.list[0].gradeValue2,
                }) ;

            this.$api.addComment( param )

            .then( (res) => {

                console.log(res)

                this.$Spin.hide()

                if(res.data.code == 200){

                    this.commentData.modelValue = true;
                   
                }else{

                    this.$Message.warning(res.data.message);

                }

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });  
        },

        // 获取产品详情
        getProduct(){

            let param = {'productCode': this.$route.query.productCode}

            this.$api.getProductInfo(  this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content , arr = [];

                    this.product = {
                        productCode: data.productCode,
                        price: data.productPrice,
                        num:  cartNun,
                        name: data.productName,
                        describe: data.productDesc,
                        imgSrc: data.productProfileUrl
                    }
                    
                    this.$toast.clear();

                }else{

                    this.$toast.clear()
                    this.$toast(res.data.message);  
                    
                }
                

            })
            .catch((error) => {

                this.$toast.clear();
                console.log('发生错误！', error);

            });
        }
    },
    mounted(){
         
        this.getProduct();

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

    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
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
        .comment_type{
            margin-left: 70px;
            cursor: pointer;
        }
        .img_box{
            width: 100px;
            height: 100px;
            border: 1px solid @color_e6e6e6;
            vertical-align: top;
            margin-right:20px;
            overflow: hidden;
        }
    }

    // 评价内容
    .comment_remark{
        position: relative;

        .remark_img{
            width: 100%;
            position: absolute;
            bottom: 10px;
            left: 40px;

            .img_content{
                display: inline-block;
                width: 100px;
                height: 100px;
                border: 1px solid @color_e6e6e6;
                margin-right:20px;
                overflow: hidden;
            }

            .upload_btn{
                width: 40px;
                cursor: pointer;
            }
            
        }
    }
    
</style>
