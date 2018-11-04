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
            <Button type="success" size="large" style="background:#00aa88;width:80px;border-radius:2px;" @click="getCouponData">搜索</Button>
        </div>

        <!-- 优惠券列表 -->
        <div class="coupon_list padding_left_20 padding_top_30" v-if="couponData.couponList.length > 0 ">
            <div class="coupon_item"  v-for="(items, index) in couponData.couponList" :key="index">
                <div class="item_top" :style="{background: returnType(items.couponStatus) }">
                    <p style="line-height:40px;height:50px;"><b class="font_22">￥{{items.couponInfo.couponValuePrice }}</b></p>
                    <p :title="items.couponInfo.couponTitle ">使用条件：{{items.couponInfo.couponTitle }}</p>
                    <p>使用时间：{{dateFormat(items.couponInfo.couponStartTime)}} - {{dateFormat(items.couponInfo.couponEndTime)}}</p>
                    <div class="dashed_line"></div>
                </div>
                <div class="item_bottom">
                    <span>使用说明：</span>
                  {{items.couponInfo.couponDesc}}
                </div>
            </div>
        </div>
        
        <!-- 订单分页 -->
        <div class="list_page">
        <Page :total="total" :current="page"   :page-size="pageSize"
                @on-change="changeOrderPage"   show-total show-elevator />
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
                couponValue: '1',
                // 优惠券切换index
                couponIndex: '',
                // 优惠券类型
                couponType:[
                    { text:'全部', value:'' },
                    { text:'可使用', value:'1' },
                    { text:'已使用', value:'2' },
                    { text:'已过期', value:'0' },
                ],
                // 平台
                platformItems:[{
                        value: '1',
                        label: '平台'
                    },
                    {
                        value: '2',
                        label: '机构'
                    },
                ],
                // 优惠券列表
                couponList:[

                ]
            },

            // 用户信息
            userData: {
                ciCode: this.$store.state.userData.cicode,
            },

            page: 1,
            total: 0,
            pageSize: 5,

        }

    },
    methods: {

        /**优惠券类型切换**/
        //@param index 获取当前点击的元素下标
        changeCouponType(index){

            if(index === 0){
              this.couponData.couponIndex = ''
            } else{
              this.couponData.couponIndex = index
            }
            this.page = 1;
            this.getCouponData()

        },

        /**分页**/
        //@param value 返回当前页码
        changeOrderPage(value){

          this.page = value;
          this.getCouponData()
        },
        /*优惠券数据*/
        // 获取优惠券列表
        getCouponData(){

            this.$Spin.show();

            let param = {
                'pageNo': this.page,
                'pageSize': this.pageSize,
                'ciCode': this.userData.ciCode ,
                'couponStatus': this.couponData.couponIndex,
                'couponForm': this.couponData.couponValue
                } ;

            // this.couponData.couponIndex != '' ? param.couponStatus = this.couponData.couponIndex : '';

            this.$api.getCouponList( this.$Qs.stringify(param) )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){

                    let data = res.data.content.list ;

                    this.couponData.couponList = data
                    this.total = res.data.content.count
                    console.log(data)
                }else{

                    this.$Message.warning(res.data.message);

                }

                this.$Spin.hide();

            })
            .catch((error) => {

                this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        // 返回优惠券类型
        // couponStatus (string, optional): 优惠券状态 0-未使用 1-已使用 2-已过期 3-使用中 ,
        // @param type string  优惠券类型参数
        // @return color string  优惠券类型对应的优惠券颜色
        returnType(type){

            let color = '' ;

            switch(type){
                case 0: color = '#0a8'; break;
                case 1: color = '#f09105'; break;
                case 2: color = '#f8cca4'; break;
                case 3: color = '#ccc'; break;

            }

            return color;
        },

        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat (time) {
          var date=new Date(time);
          var year=date.getFullYear();
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          // 拼接
          return year+"/"+month+"/"+day;
        },

    },
    mounted(){

        // 获取优惠券列表
        this.getCouponData();

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
                p{
                    height:30px;
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
