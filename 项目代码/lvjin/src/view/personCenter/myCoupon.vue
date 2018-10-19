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
                <div class="item_top">
                    <p>￥<b class="font_20 padding_left_5">{{items.couponValuePrice }}</b></p>
                    <p>使用条件：{{items.couponTitle }}</p>
                    <p>使用时间：{{dateFormat(item.couponStartTime)}} 至 {{dateFormat(item.couponEndTime)}}</p>
                    <div class="dashed_line"></div>
                </div>
                <div class="item_bottom">
                    <span>使用说明：</span>
                  {{item.couponDesc}}
                </div>
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
                couponValue: '1',
                // 优惠券切换index
                couponIndex: '',
                // 优惠券类型
                couponType:[
                    { text:'全部', value:'' },
                    { text:'可使用', value:'1' },
                    { text:'已使用', value:'2' },
                    { text:'已过期', value:'3' },
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
                ciCode: ''
            }

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
            this.getCouponData()

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

        /*优惠券数据*/
        // 获取优惠券列表
        getCouponData(){

            let param = this.$Qs.stringify({
                'pageNo': 1,
                'pageSize': 10 ,
                'ciCode': this.userData.ciCode ,
                'couponStatus': this.couponData.couponIndex,
                'couponForm': this.couponData.couponValue
                }) ;

            // this.$Spin.show();

            this.$api.getCouponList( param )

            .then( (res) => {

                console.log(res)

                if(res.data.code == 200){


                    let data = res.data.content.list ;

                    for(let i = 0 ; i < data.length; i++){

                        arr.push({

                        })

                    }

                    // 压入数据列表

                }else{

                    this.$Message.warning(res.data.message);

                }

                // this.$Spin.hide();

            })
            .catch((error) => {

                // this.$Spin.hide();
                console.log('发生错误！', error);

            });
        },
        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat:function(time) {
          var date=new Date(time);
          var year=date.getFullYear();
          /* 在日期格式中，月份是从0开始的，因此要加0
           * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
           * */
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          // var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          // var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          // var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day;
        },

    },
    mounted(){

        // 获取用户信息
        this.userData.ciCode = 12 ;//this.$store.state.userData.UserData.ciCode ;

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
