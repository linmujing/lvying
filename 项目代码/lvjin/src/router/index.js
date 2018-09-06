import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'


Vue.use(Router)
const router = new Router({
  
  routes: [
	  {path: '/', redirect: 'shopMallIdex'},
  	{
      path: '/',
      meta:{
        title:'律瀛教育网站',
      },
      component:  resolve => require(['@/view/shopMall/index'],resolve),
    },

    {
      path: '/',
      name:'Index',
      component: resolve => require(['@/view/shopMall/index'],resolve) ,
      children: [

        /**购物车模块**/ 
        {
          path: 'shoppingCart',
          component:resolve => require(['@/view/shopCart/shoppingCart'],resolve),
          meta:{
            title:'购物车',
          },
        },
        {
          path: 'submitOrder',
          component:resolve => require(['@/view/shopCart/submitOrder'],resolve),
          meta:{
            title:'提交订单',
          },
        },
        {
          path: 'shopGoPay',
          component:resolve => require(['@/view/shopCart/shopGoPay'],resolve),
          meta:{
            title:'去支付',
          },
        },

        /**个人中心模块**/
        {
          path: 'personCenter',
          component:resolve => require(['@/view/personCenter/personCenter'],resolve),
          meta:{
            title:'个人中心',
          },
          children: [
            {
              path: 'myOrder',
              component:resolve => require(['@/view/personCenter/myOrder'],resolve),
              meta:{
                title:'我的订单',
              },
            },{
              path: 'myCoupon',
              component:resolve => require(['@/view/personCenter/myCoupon'],resolve),
              meta:{
                title:'我的优惠券',
              },
            },
          ]
        }, 
        {
          path: 'refundMoney',
          component:resolve => require(['@/view/personCenter/refundMoney'],resolve),
          meta:{
            title:'退款',
          },
        },
        {
          path: 'checkLogistics',
          component:resolve => require(['@/view/personCenter/checkLogistics'],resolve),
          meta:{
            title:'查看物流',
          },
        },

        /**商城模块**/
        {
          path: '/shopMallIdex',
          name: 'shopMallIdex',
          component:resolve => require(['@/view/shopMall/shopMallIdex'],resolve),
          meta:{
            title:'首页',
          },
        },
        {
          path: '/industryDynamic',
          name: 'industryDynamic',
          component:resolve => require(['@/view/shopMall/industryDynamic'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/industryDynamicList',
          name: 'industryDynamicList',
          component:resolve => require(['@/view/shopMall/industryDynamicList'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/industryDynamicDetail',
          name: 'industryDynamicDetail',
          component:resolve => require(['@/view/shopMall/industryDynamicDetail'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/videoCourse',
          name: 'videoCourse',
          component:resolve => require(['@/view/shopMall/videoCourse'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/videoCourseList',
          name: 'videoCourseList',
          component:resolve => require(['@/view/shopMall/videoCourseList'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/videoCourseDetail',
          name: 'videoCourseDetail',
          component:resolve => require(['@/view/shopMall/videoCourseDetail'],resolve),
          meta:{
            title:'',
          },
        }
      ]
    },
    /**用户登录**/
    {
      path: '/user',
      name: 'user',
      meta:{
        title:'用户登录',
      },
      component:  resolve => require(['@/view/user/index'],resolve),
      children: [
       	{
          path: 'userLogin',
          name: 'userLogin',
          component:resolve => require(['@/view/user/userLogin'],resolve),
          meta:{
            title:'用户登录',
          }
        },
        {
          path: 'userRegister',
          name: 'userRegister',
          component:resolve => require(['@/view/user/userRegister'],resolve),
          meta:{
            title:'用户注册',
          }
        },
        {
          path: 'forgotPwd',
          name: 'forgotPwd',
          component:resolve => require(['@/view/user/forgotPwd'],resolve),
          meta:{
            title:'忘记密码',
          }
        },
        {
          path: 'forgotPwdStep',
          name: 'forgotPwdStep',
          component:resolve => require(['@/view/user/forgotPwdStep'],resolve),
          meta:{
            title:'忘记密码',
          }
        }
      ]
    },
    /**提供商**/
    {
      path: '/supplier',
      name: '/supplier',
      meta:{
        title:'提供商登录',
      },
      component:  resolve => require(['@/view/supplier/index'],resolve),
      children: [
       	{
          path: 'supplierLogin',
           name: 'supplierLogin',
          component:resolve => require(['@/view/supplier/supplierLogin'],resolve),
          meta:{
            title:'提供商登录',
          }
        },
        {
          path: 'supplierRegister',
          name: 'supplierRegister',
          component:resolve => require(['@/view/supplier/supplierRegister'],resolve),
          meta:{
            title:'提供商注册',
          }
        },
        {
          path: 'approver',
          name: 'approver',
          component:resolve => require(['@/view/supplier/approver'],resolve),
          meta:{
            title:'提供商认证审核',
          }
        },
        {
          path: 'approverStatus',
          name: 'approverStatus',
          component:resolve => require(['@/view/supplier/approverStatus'],resolve),
          meta:{
            title:'提供商认证状态',
          }
        }
      ]
    },
    {
      path: '*',
      name: '404',
      meta:{
        title:'404',
      },
      component: resolve => require(['@/view/404'],resolve)
    }
  ],
mode: 'history'
})

router.beforeEach((to,form,next) =>{ 
  /*路由变化修改title*/ 
  if(to.meta.title){
    document.title=to.meta.title;
  } 
  next(); 
})
export default router
