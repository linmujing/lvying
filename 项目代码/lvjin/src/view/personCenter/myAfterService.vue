<template>
    <!-- 我的售后服务 -->
    <div class="order_box padding_bottom_30">

        <!-- 售后服务标题    -->
        <div class="order_title font_16 border_bottom_1">
            <span>我的售后服务</span>
        </div>

        <!-- 售后服务类型切换 -->
        <div>
            <ul class="service_type padding_left_20 padding_top_30">
                <li :class="[serviceData.serviceIndex == index ? 'active' : '' ]"  v-for="(items, index) in serviceData.serviceType" :key="index"
                @click="changeServiceType(index)"  >{{items.text}}</li>
            </ul>
            <!--<Input v-model="serviceData.serviceValue" size="large" placeholder="请输入关键字" style="width:200px;padding-right:10px;" />-->
            <!--<Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" >搜索</Button>-->
        </div>

         <!-- 售后服务列表 -->
        <div class="list_box padding_left_20 padding_top_30">
            <div class="header">
                <Col :span="6"><span >商品信息</span></Col>
                <Col :span="5"><span>金额</span></Col>
                <Col :span="5"><span>申请类型</span></Col>
                <Col :span="5"><span>换货状态</span></Col>
                <!--<Col :span="3"><span>操作</span></Col>-->
            </div>
            <ul class="list">
                <li  v-for="(items, index) in serviceData.serviceList" :key="index" >
                    <Col :span="6">
                        <div class="table_block">
                            <p class="td_block">
                                <span :title="items.productName">{{items.productName}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span>{{items.productPrice}}</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span>换货</span>
                            </p>
                        </div>
                    </Col>
                    <Col :span="5">
                        <div class="table_block">
                            <p class="td_block">
                                <span v-if="items.isExchange==1">申请换货中</span>
                                <span v-if="items.isExchange==2">同意换货</span>
                            </p>
                        </div>
                    </Col>
                    <!--<Col :span="3">-->
                        <!--<div class="table_block">-->
                            <!--<p class="td_block">-->
                                <!--<span>查看</span>-->
                            <!--</p>-->
                        <!--</div>-->
                    <!--</Col>-->
                </li>
            </ul>

            <!-- 订单分页 -->
            <div class="list_page" v-if="serviceData.serviceList.length > 5 ">
                <Page :total="serviceData.pageData.total" :current="serviceData.pageData.current"   :page-size="serviceData.pageData.pageSize"
                    @on-change="changeOrderPage" size="small" show-total show-elevator />
            </div>
        </div>

        <!-- 没有售后服务 -->
        <div class="order_has_not color_ccc" v-if="serviceData.serviceList.length == 0 ">
            暂无售后服务
        </div>

    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*售后服务对象*/
            serviceData:{
                // 搜索值
                serviceValue: '',
                // 售后服务切换index
                serviceIndex: 0,
                // 售后服务类型
                serviceType:[
                    // { text:'未换货', value:'0' },
                    { text:'申请换货', value:'0' },
                    { text:'换货成功', value:'1' },
                ],
                // 售后服务列表
                serviceList:[
                    // {
                    //     time: '2018.08.01-2018.08.31',
                    //     type:'退货退款',
                    //     title:'法律顾问书籍',
                    //     price:'100.00',
                    //     state:'',
                    //     stateText:'退款退货中',
                    // }
                ],
                // 分页
                pageData:{
                    total: 7,
                    pageSize: 5,
                    current: 1
                }
            },
            ciCode: this.$store.state.userData.cicode,

        }

    },
    mounted(){
      this.getOrderProductList(1)
    },
    methods: {

        /**售后服务类型切换**/
        //@param index 获取当前点击的元素下标
        changeServiceType(index){
            console.log(index)
            this.serviceData.serviceIndex = index;
            this.getOrderProductList(1)

        },

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

            this.serviceData.pageData.current = value;
            this.getOrderProductList(value)
        },
        // 获取售后列表
        getOrderProductList(page){
          // 获取产品分类列表
          var isExchange = this.serviceData.serviceIndex+1
          this.$api.getOrderProductList( this.$Qs.stringify({'pageNo': page, 'pageSize': this.serviceData.pageData.pageSize, 'ciCode': this.ciCode , 'isExchange': isExchange}) )

            .then( (res) => {
              console.log(res);
              if(res.data.code == 200){
                var result = res.data.content
                this.serviceData.serviceList = result.list
                this.serviceData.pageData.total = result.count
              }else {
                this.$Message.warning(res.data.message);
              }
            })
            .catch((error) => {
              this.$Message.warning('加载失败,请刷新重试!');
              console.log('发生错误！', error);
            });
        },
    }
}
</script>


<style scoped lang='less'>

    //引入售后服务共用less文件
    @import '../shopCart/shopCart.less';

    // 售后服务类型
    .service_type{
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

    // 售后服务列表
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
