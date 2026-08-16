(function(){
  const title=document.getElementById('plannerMapTitle');
  const observer=new MutationObserver(()=>{
    const count=Number(document.getElementById('selectedCount')?.textContent||0);
    if(title)title.textContent=count?`已选择 ${count} 个地点，地图正按顺序更新`:'先从下方选择想去的地点';
  });
  const count=document.getElementById('selectedCount');
  if(count)observer.observe(count,{childList:true,characterData:true,subtree:true});
  setTimeout(()=>{if(typeof buildPlan==='function')buildPlan()},0);
})();
