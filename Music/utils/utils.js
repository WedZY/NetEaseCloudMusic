    export default({
      // 格式化时间
     formatSecond(Val){
       const timeVal= typeof Val
       if(timeVal==='number'||timeVal==='string'){
        Val=parseInt(Val)
        const minute=Math.floor(Val/60)
         Val = Val - minute * 60;
        return (("0" + minute).slice(-2) + ":" + ("0" + Val).slice(-2));
       }
     }
      
  })
