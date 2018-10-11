
export default{

    login:function(){
      console.log("我是公共方法");
    },
    
    // 检验是否为空
    // params val
    testEmpty: function(val) {
      
      if(val == null || val == undefined){

        val = "";
        
      }

      return val;

    }

  }
