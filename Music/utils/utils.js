    export default({
      // 格式化时间
     formatSecond(Val){
       const timeVal= typeof Val
       if(timeVal==='number'||timeVal==='string'){
         console.log(Val);
         Val=parseInt(Val)
          console.log(Val);
         const minute=Math.floor(Val/60)
          Val = Val - minute * 60;
        // return ;
         console.log(("0" + minute).slice(-2) + ":" + ("0" + Val).slice(-2));
       }
     }
      
  })
