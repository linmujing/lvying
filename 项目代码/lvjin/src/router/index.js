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
        {
          path: '/shoppingCart',
          component:resolve => require(['@/view/shopCart/shoppingCart'],resolve),
          meta:{
            title:'购物车',
          },
        },
        {
          path: '/submitOrder',
          component:resolve => require(['@/view/shopCart/submitOrder'],resolve),
          meta:{
            title:'提交订单',
          },
        },
        {
          path: '/shopMallIdex',
          component:resolve => require(['@/view/shopMall/shopMallIdex'],resolve),
          meta:{
            title:'首页',
          },
        },
        {
          path: '/industryDynamic',
          component:resolve => require(['@/view/shopMall/industryDynamic'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/industryDynamicList',
          component:resolve => require(['@/view/shopMall/industryDynamicList'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/industryDynamicDetail',
          component:resolve => require(['@/view/shopMall/industryDynamicDetail'],resolve),
          meta:{
            title:'',
          },
        },
        {
          path: '/videoCourse',
          component:resolve => require(['@/view/shopMall/videoCourse'],resolve),
          meta:{
            title:'',
          },
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
