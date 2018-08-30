import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
  	{
      path: '/',
      meta:{
        title:'首页',
      },
      component:  resolve => require(['@/view/index/index'],resolve),
    },
    {
      path: '*',
      name: '404',
      meta:{
        title:'404',
      },
      component: resolve => require(['@/view/404'],resolve)
    }
  ]
})
router.beforeEach((to,form,next) =>{ 
  /*路由变化修改title*/ 
  if(to.meta.title){
    document.title=to.meta.title;
  } 
  next(); 
})
export default router
