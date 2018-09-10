<template>
    <div class="bg_f5 padding_top_30 padding_bottom_80">
        <div class="shopping_cart_container box_center_1200">

            <div class="title">
                <span>我的购物车：共 {{cartDate.cartList.length}} 门课程</span>
            </div>

            <div class="list_box" v-if="cartDate.cartList.length">
                <!-- 购物车列表头部 -->
                <div class="list_header padding_left_14">
                    <Row>
                        <Col span="5">
                            <Checkbox v-model="cartDate.listState"  @click.prevent.native="setAllCheckboxChange">
                                <span class="padding_left_5">全选</span>
                            </Checkbox>
                        </Col>
                        <Col span="9"><span>课程名称</span></Col>
                        <Col span="4"><span class="block_center">单价（元）</span></Col>
                        <Col span="4"><span class="block_center" >数量</span></Col>
                        <Col span="2"><span  class="block_center">操作</span></Col>
                    </Row>
                </div>
                
                <!-- 购物车列表 -->
                <ul class="list_content" v-for="(items, index1) in cartDate.cartList" :key="items.id">
                    <li>
                        <div class="item_title padding_left_14">
                            <Checkbox  v-model="items.itemState" @click.prevent.native="checkboxChange(index1)" >
                                <span class="padding_left_5"> {{items.itemTitle}} </span>
                            </Checkbox>
                        </div>
                        <ul class="item_list">
                            <li class="padding_left_14" v-for="(item, index2) in items.items" :key="item.id">
                                <Row>
                                    <Col span="5">
                                        <Checkbox v-model="item.state" @click.prevent.native="checkboxChange(index1, index2)" > 
                                        </Checkbox>
                                        <span class="item_list_img">
                                            <img :src="item.imgSrc">
                                        </span>
                                    </Col>
                                    <Col span="9">
                                        <Row>
                                            <Col span="6"></Col>
                                            <Col span="18"><span class="item_list_describe">{{item.describe}}</span></Col>
                                        </Row>
                                    </Col>
                                    <Col span="4"><span  class="block_center">{{item.price}}</span></Col>
                                    <Col span="4">
                                        <div class="relative">
                                            <!-- 加减数量 -->
                                        <div class="number_add_reduce" >
                                            <span class="reduce"  @click="reduceNumber" onselectstart="return false" :data-index1="index1" :data-index2="index2"
                                            >-</span><b class="number_value">{{item.num}}</b><span class="add" @click="addNumber" onselectstart="return false" 
                                                :data-index1="index1" :data-index2="index2">+</span>
                                        </div> 
                                        </div>
                                        
                                    </Col>
                                    <!-- 删除单个 -->
                                    <Col span="2"><span class="item_list_delete block_center"><img src="../../assets/images/icon/cart_delete.png" alt="" @click="deleteItem(index1, index2)"></span></Col>
                                </Row>
                            </li>
                        </ul>
                        <div class="item_total padding_right_24">该机构小计： {{items.itemTotal}}</div>
                    </li>
                </ul>
                <!-- 其他操作 -->
                <div class="list_operate padding_left_14">
                    <Row>
                        <Col span="2">
                            <Checkbox v-model="cartDate.listState"  @click.prevent.native="setAllCheckboxChange">
                                <span class="padding_left_5" >全选</span>
                            </Checkbox>
                        </Col>
                        <Col span="10"><span class="pointer list_delete" @click="deleteAllItem" >删除所选课程</span></Col>
                        <Col span="9">
                            <div class="all_total">
                                <h4>合计：<b class="font_16"> {{cartDate.listTotal}} </b></h4>
                                <p>(若购买享有优惠，相应金额将在订单结算页面减扣)</p>
                            </div>
                        </Col>
                        <Col span="3"><span class="list_balance" :class="[cartDate.listTotal != 0 ?'active' :'']" @click="goBuy">去结算</span></Col>
                    </Row>
                </div>
            </div>

            <!-- 购物车为空 -->
            <div class="not_has_store" v-if="!cartDate.cartList.length">
                <img src="../../assets/images/image/cart_not.png" alt="">
            </div>

            <!-- 删除弹框 -->
            <Modal v-model="modelDate.deleteModelValue" width="480" footer-hide >
                <div style="height:140px;line-height:140px;font-size:16px;" >
                    <p>确定从购物车中删除所选课程吗？</p>
                </div>
                <div style="padding: 0 0 20px 200px; "> 
                    <Button shape="circle" type="success" size="large" @click="deleteModelOk">确定删除</Button>
                    <span style="width:40px;display:inline-block;"></span>
                    <Button shape="circle" style="background:#a5a5a5;color:#fff;"  size="large" @click="modelDate.deleteModelValue = false">取消</Button>
                </div>
            </Modal>

        </div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
        return {

            /*购物车数据*/
            cartDate:{
                //全部列表状态
                listState: false,
                //全部删除状态
                listDeleteState: false,
                //总价格
                listTotal: 0.00,
                //大列表
                cartList:[
                    {
                        index1: 0,
                        itemState: false,
                        itemTitle: '机构法院',
                        itemTotal: 0.00,
                        //小列表
                        items:[
                            {
                                index2: 0,
                                state: false,
                                price: '88.01',
                                num: 1,
                                describe: '暂无',
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            },
                            {
                                index2: 1,
                                state: false,
                                price: '101.01',
                                num: 1,
                                describe: '暂无',
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            }
                        ]
                    },
                    {
                        index1: 0,
                        itemState: false,
                        itemTitle: '机构法院',
                        itemTotal: 0.00,
                        //小列表
                        items:[
                            {
                                index2: 0,
                                state: false,
                                price: '88.01',
                                num: 1,
                                describe: '暂无',
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            },
                            {
                                index2: 1,
                                state: false,
                                price: '101.01',
                                num: 1,
                                describe: '暂无',
                                imgSrc: require('../../assets/images/image/cart_book.png')
                            }
                        ]
                    }
                ],
            },   

            /*删除提示弹框对象*/
            modelDate:{
                //弹框开关
                deleteModelValue:false,
                //删除类型  删除单个 = a  删除选中 = b
                deleteType: 'a',
                //下标
                index1:0,
                index2:0
            }
            
        }
        
    },
    methods: {

        /*加减小组件*/
        //加
        addNumber:function(e){

            // 获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 
            
            this.cartDate.cartList[index1].items[index2].num ++;

            //计算小计与合计
            this.calculatePrice();
        },
        //减
        reduceNumber:function(e){

            // 获取商品下标
            let index1 =  e.target.getAttribute("data-index1"), 
                index2 =  e.target.getAttribute("data-index2"); 

            if (this.cartDate.cartList[index1].items[index2].num<=1){

                this.$Message.warning('受不了啦，宝贝不能再减少啦')

                this.cartDate.cartList[index1].items[index2].num  = 1;

                return;

            }else {

                this.cartDate.cartList[index1].items[index2].num  -= 1

            }

            //计算小计与合计
            this.calculatePrice();

        },

        /*checkbox监听*/
        //商品选择 
        //@param index1 购物车大列表下标 
        //@param index2 购物车小列表下标
        checkboxChange(index1,index2){

            //监听商品是否选中 || 监听商家店里所有商品是否选中
            if(index2 != undefined){

                this.cartDate.cartList[index1].items[index2].state = !this.cartDate.cartList[index1].items[index2].state;

            }else{

                this.cartDate.cartList[index1].itemState = !this.cartDate.cartList[index1].itemState;

                for(let i = 0 ; i < this.cartDate.cartList[index1].items.length; i++ ){

                    this.cartDate.cartList[index1].items[i].state = this.cartDate.cartList[index1].itemState;

                }

            }

            //计算小计与合计
            this.calculatePrice();

        },
        //设置checkbox 全选或取消全选
        setAllCheckboxChange(){

            this.cartDate.listState = !this.cartDate.listState;

            // 获取全选大列表状态
            let isAll = this.cartDate.listState;

            let n = this.cartDate.cartList.length;
            
            for(let i = 0 ; i < n ; i++ ){

                this.cartDate.cartList[i].itemState = isAll;

                for(let x = 0 ; x < this.cartDate.cartList[i].items.length; x++ ){

                    this.cartDate.cartList[i].items[x].state = isAll;

                }
            }

            //计算小计与合计
            this.calculatePrice();

        },

        /*购物车数据计算*/    
        //计算小计与合计
        calculatePrice(){

            //获取商品个数
            let m = this.cartDate.cartList.length;

            //计算小计
            for(let x = 0 ; x < m ; x++){
  
                let n = this.cartDate.cartList[x].items.length;

                //重置小计
                this.cartDate.cartList[x].itemTotal = 0;

                for(let i = 0 ; i < n ; i++){
                    
                    let item = this.cartDate.cartList[x].items[i];

                    //判断是否选中
                    if(item.state){

                        this.cartDate.cartList[x].itemTotal += item.num * (item.price * 10000);

                    } 

                }

                this.cartDate.cartList[x].itemTotal = (this.cartDate.cartList[x].itemTotal / 10000).toFixed(2);

            }

            //重置合计
            this.cartDate.listTotal = 0;
            
            //计算合计
            for(let i = 0 ; i < m ; i++){
                
                let item = this.cartDate.cartList[i];

                //判断是否选中

                this.cartDate.listTotal += item.itemTotal *10000;


            }  

            this.cartDate.listTotal = (this.cartDate.listTotal / 10000).toFixed(2);

        },

        /*购物车数据删除操作*/
        //删除单个商品
        //@param index1 购物车大列表下标 
        //@param index2 购物车小列表下标
        deleteItem(index1,index2){
            
            this.modelDate.deleteModelValue = true;
            this.modelDate.index1 = index1;
            this.modelDate.index2 = index2;
            this.modelDate.deleteType = 'a';

        },  
        //删除所有选中的商品
        deleteAllItem(){

            this.modelDate.deleteModelValue = true;
            this.modelDate.deleteType = 'b';

        },
        //弹框确定
        deleteModelOk(){
            
            //a 为删除单个
            if(this.modelDate.deleteType == 'a'){

                // 获取商品下标
                let index1 = this.modelDate.index1,
                    index2 = this.modelDate.index2; 

                //删除当前商品
                this.cartDate.cartList[index1].items.splice(index2,1);

                //判断小列表是否还有商品,没有就删除
                if(this.cartDate.cartList[index1].items.length == 0){

                    this.cartDate.cartList.splice(index1,1);

                }

            }else{

                //获取商品个数
                let m = this.cartDate.cartList.length;

                //计算小计
                for(let x = 0 ; x < m ; x++){
    
                    let n = this.cartDate.cartList[x].items.length;

                    for(let i = 0 ; i < n ; i++){
                        
                        let item = this.cartDate.cartList[x].items[i];

                        //判断是否选中
                        if(item.state){

                            //删除当前商品
                            this.cartDate.cartList[x].items.splice(i,1);

                            return this.deleteModelOk();
                        } 

                    }

                    //判断小列表是否还有商品,没有就删除
                    if(this.cartDate.cartList[x].items.length == 0){

                        this.cartDate.cartList.splice(x,1);

                        return this.deleteModelOk();

                    }
                    
                }

            }

            this.modelDate.deleteModelValue = false;

            //计算小计与合计
            this.calculatePrice();

        },

        // 去结算页面
        goBuy(){

            // 去结算页面
            this.$router.push({ name: 'submitOrder', params: { type: true} })

        }
   

    }
}
</script>

<style>
    /* iview Model样式修改 */
    .ivu-modal .ivu-modal-content{
        border-radius: 0;
    }

</style>

<style scoped lang='less'>

    //引入购物车共用less文件
    @import './shopCart.less'; 


    /**容器**/ 
    .shopping_cart_container{
        background:#fff;

        //购物车标题
        .title{
            height:74px;
            padding-left:30px;
            font-size: 14px;
            span{
                display: inline-block;
                padding-top: 36px;
            }
        }

        // 购物车盒子
        .list_box{
            margin: 0 16px;
            padding-bottom:80px;
            
            // 头部
            .list_header{
                background: #fafafa;
                height: 50px;
                line-height: 50px;
                
                *{
                    color: @color_666;
                }
            }

            // 购物车列表
            .list_content{
                padding-top:10px;

                .item_title{
                    height: 40px;
                    line-height: 40px;
                }
                .item_list>li{
                    line-height: 140px;
                    border:1px solid @color_e6e6e6;
                    border-bottom:0;
                }
                .item_list_img{
                    display: inline-block;
                    text-align: center;
                    width:100px;
                }
                .item_list_img img{
                    vertical-align: middle;
                    height: 100px;

                }
                .item_list_delete img{
                    vertical-align: middle;
                    width: 26px;
                    cursor: pointer;
                }
                .item_total{
                    height:60px;
                    line-height: 60px;
                    text-align: right;
                    border:1px solid @color_e6e6e6;
                    background:#fafafa;
                }
                *{
                    color: @color_333;
                }
            }

            // 购物车列表操作
            .list_operate{
                height: 70px;
                line-height: 70px;
                margin-top:46px;
                background: #fafafa;

                .list_delete{
                    font-size: 16px;
                }
                .all_total{
                    text-align: right;
                    line-height: 22px;
                    padding-top:16px;

                    b{
                        color: #f09105;
                    }
                    p{
                        font-size: 10px;
                    }
                }
                .list_balance{
                    background: @color_cccccc;
                    font-size: 20px;
                    width:136px;
                    position: absolute;
                    right:0;
                    top:0;
                    text-align: center;
                    font-weight: 700;
                    cursor: pointer;
                }
                .list_balance.active{
                    background: #f09105;
                    color: #fff;
                }
            }
        }

        // 没有商品
        .not_has_store{
            height: 500px;
            padding-top:50px;
            text-align: center;
        }

    }
    
</style>
