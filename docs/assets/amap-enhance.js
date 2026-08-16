/* global AMap, places, routes, selected, userLocation, startPlace, transport, timeline, byId, orderPlaces */
(function(){
  const config=window.CAIGE_AMAP_CONFIG||{};
  const shell=document.getElementById('amapShell');
  const canvas=document.getElementById('amapMap');
  const board=document.getElementById('mapSegments');
  const status=document.getElementById('amapStatus');
  const setupNote=document.getElementById('amapSetupNote');
  if(!shell||!canvas)return;

  if(!config.key||!config.securityJsCode){
    if(setupNote)setupNote.innerHTML='<b>高德实景地图等待一次配置</b>管理员填写 Web 端 JS API Key 和安全密钥后，这里会自动切换为高德底图，并显示全部站点和分段时间。当前继续使用本站路线示意。';
    return;
  }

  window._AMapSecurityConfig={securityJsCode:config.securityJsCode};
  const script=document.createElement('script');
  script.src=`https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(config.key)}&plugin=AMap.PlaceSearch,AMap.Geocoder,AMap.Driving,AMap.Walking,AMap.Riding,AMap.Transfer,AMap.Geolocation`;
  script.async=true;
  script.onerror=()=>{if(setupNote)setupNote.innerHTML='<b class="amap-error">高德地图没有载入</b>请检查 Key、安全密钥和高德控制台中的允许域名。';};
  script.onload=init;
  document.head.appendChild(script);

  let map,currentIds=[],accurateStart=null,activeMode='smart',renderToken=0;
  let overlays=[],routeOverlays=[];
  const pointCache=readCache();
  const routeCache=new Map();
  const baseDrawMap=window.drawMap;
  const baseBuildPlan=window.buildPlan;
  const baseStartPoint=window.startPoint;

  function readCache(){try{return JSON.parse(localStorage.getItem('caige-amap-poi-v2')||'{}')}catch{return {}}}
  function saveCache(){try{localStorage.setItem('caige-amap-poi-v2',JSON.stringify(pointCache))}catch{}}
  function lngLat(location){if(!location)return null;return{lng:Number(location.lng??location[0]),lat:Number(location.lat??location[1])}}
  function pointArray(p){return[p.lng,p.lat]}
  function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
  function minutes(seconds){return Math.max(1,Math.round(Number(seconds||0)/60))}
  function distanceKm(a,b){const r=6371,t=x=>x*Math.PI/180,dLat=t(b.lat-a.lat),dLng=t(b.lng-a.lng),q=Math.sin(dLat/2)**2+Math.cos(t(a.lat))*Math.cos(t(b.lat))*Math.sin(dLng/2)**2;return 2*r*Math.asin(Math.sqrt(q))}

  function init(){
    map=new AMap.Map(canvas,{zoom:12,center:[120.3826,36.0671],viewMode:'2D',mapStyle:'amap://styles/light',showLabel:true,resizeEnable:true});
    shell.classList.add('ready');
    if(setupNote)setupNote.remove();
    document.querySelectorAll('.amap-mode').forEach(button=>button.addEventListener('click',()=>{
      document.querySelectorAll('.amap-mode').forEach(item=>item.classList.remove('active'));
      button.classList.add('active');activeMode=button.dataset.mode;redrawCurrent();
    }));
    window.drawMap=function(ids){currentIds=[...ids];if(typeof baseDrawMap==='function')baseDrawMap(ids);renderMap(ids,false)};
    window.startPoint=function(){return accurateStart||baseStartPoint()};
    window.buildPlan=function(){baseBuildPlan();if(selected.length)renderPlannerMap()};
    startPlace.addEventListener('input',debounce(async()=>{accurateStart=null;await resolveTypedStart();window.buildPlan()},550));
    document.getElementById('locate')?.addEventListener('click',()=>setTimeout(async()=>{if(userLocation){accurateStart=await convertGps({...userLocation,name:'我的当前位置'});window.buildPlan()}},800));
    const first=routes[0]?.ids||[];currentIds=[...first];renderMap(first,false);
  }

  function debounce(fn,wait){let timer;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),wait)}}
  async function resolveTypedStart(){
    const text=startPlace.value.trim();if(!text)return;
    const exact=places.find(p=>p.name===text||p.name.includes(text));
    if(exact){const p=await resolvePlace(exact);accurateStart={...p,name:exact.name,id:`start-${exact.id}`};return}
    accurateStart=await searchPoint(text,'typed-start');
    if(accurateStart)accurateStart.name=text;
  }
  function convertGps(p){return new Promise(resolve=>AMap.convertFrom([p.lng,p.lat],'gps',(status,result)=>{const loc=status==='complete'&&result.locations?.[0];resolve(loc?{...lngLat(loc),name:p.name,id:p.id||'gps-start'}:p)}))}
  function searchPoint(keyword,key){
    if(pointCache[key])return Promise.resolve({...pointCache[key],id:key,name:keyword});
    return new Promise(resolve=>{
      const search=new AMap.PlaceSearch({city:'青岛',citylimit:true,pageSize:8,extensions:'base'});
      search.search(`${keyword} 青岛`,(state,result)=>{
        const pois=state==='complete'?result.poiList?.pois||[]:[];
        const normalized=keyword.replace(/[·\s]/g,'');
        const poi=pois.find(x=>String(x.name).replace(/[·\s]/g,'').includes(normalized))||pois[0];
        if(!poi?.location){resolve(null);return}
        const value={...lngLat(poi.location),name:poi.name,id:key,poiId:poi.id||''};pointCache[key]=value;saveCache();resolve(value);
      });
    });
  }
  async function resolvePlace(place){
    const cached=pointCache[place.id];if(cached){Object.assign(place,{lng:cached.lng,lat:cached.lat});return{...cached,name:place.name,id:place.id}}
    const searched=await searchPoint(place.name,place.id);
    if(searched){Object.assign(place,{lng:searched.lng,lat:searched.lat});return{...searched,name:place.name,id:place.id}}
    const converted=await convertGps(place);Object.assign(place,{lng:converted.lng,lat:converted.lat});return{...converted,name:place.name,id:place.id};
  }

  async function renderMap(ids,includeStart){
    const token=++renderToken;setStatus('正在核对景点位置…');
    const points=(await Promise.all(ids.map(id=>resolvePlace(byId(id))))).filter(Boolean);if(token!==renderToken)return;
    let start=null;if(includeStart){if(!accurateStart)await resolveTypedStart();start=accurateStart||baseStartPoint();if(start&&!accurateStart&&userLocation)start=await convertGps(start)}
    clearOverlays();drawMarkers(points,start);drawFallback(points,start);renderSegmentBoard(points,start);
    setStatus('全部地点已标注，正在计算各段交通时间…');
    await calculateSegments(points,start,token);if(token===renderToken)setStatus('路线已按高德地点校准。点击上方交通方式可切换线路。');
  }
  function renderPlannerMap(){const start=window.startPoint(),ordered=orderPlaces(selected.map(byId).filter(Boolean),start);currentIds=ordered.map(p=>p.id);renderMap(currentIds,true)}
  function redrawCurrent(){if(selected.length)renderPlannerMap();else renderMap(currentIds,false)}
  function setStatus(text){if(status)status.textContent=text}
  function clearOverlays(){if(overlays.length)map.remove(overlays);if(routeOverlays.length)map.remove(routeOverlays);overlays=[];routeOverlays=[];board.innerHTML=''}
  function drawMarkers(points,start){
    const all=start?[start,...points]:points;
    all.forEach((p,index)=>{
      const isStart=!!start&&index===0,label=isStart?'起':String(start?index:index+1);
      const marker=new AMap.Marker({position:pointArray(p),anchor:'bottom-center',content:`<div class="amap-marker ${isStart?'start':''}"><span>${label}</span></div>`,zIndex:120});
      const name=new AMap.Marker({position:pointArray(p),anchor:'top-center',offset:new AMap.Pixel(0,7),content:`<div class="amap-marker-name">${escapeHtml(p.name)}</div>`,zIndex:119});
      overlays.push(marker,name);
    });
    map.add(overlays);map.setFitView(overlays,false,[75,55,130,55],14);
  }
  function drawFallback(points,start){const seq=start?[start,...points]:points;if(seq.length<2)return;const line=new AMap.Polyline({path:seq.map(pointArray),strokeColor:'#08788a',strokeWeight:5,strokeOpacity:.7,strokeStyle:'dashed',showDir:true,zIndex:50});routeOverlays.push(line);map.add(line)}
  function renderSegmentBoard(points,start){
    const seq=start?[start,...points]:points;if(seq.length<2)return;
    board.innerHTML=seq.slice(1).map((p,i)=>`<article class="segment-card" data-segment="${i}"><header><b>${i+1}</b><span>${escapeHtml(seq[i].name)} → ${escapeHtml(p.name)}</span></header><div class="segment-times"><span data-time="walk"><small>步行</small><strong>计算中</strong></span><span data-time="bus"><small>公交</small><strong>计算中</strong></span><span data-time="car"><small>驾车</small><strong>计算中</strong></span><span data-time="ride"><small>自行车</small><strong>计算中</strong></span><span data-time="ebike"><small>电动车</small><strong>估算中</strong></span></div></article>`).join('');
  }

  async function calculateSegments(points,start,token){
    const seq=start?[start,...points]:points;if(seq.length<2)return;
    clearRoutesOnly();
    for(let i=0;i<seq.length-1;i++){
      for(const mode of ['walk','bus','car','ride']){
        if(token!==renderToken)return;
        const result=await getRoute(mode,seq[i],seq[i+1]);updateTime(i,mode,result);
        if(mode==='ride'&&result)updateTime(i,'ebike',{duration:Math.max(1,Math.round(result.duration*.72)),estimated:true});
        if(shouldDraw(mode,seq[i],seq[i+1])&&result?.path?.length)drawRoute(result,i);
        await delay(420);
      }
    }
    if(routeOverlays.length)map.setFitView([...overlays,...routeOverlays],false,[85,60,150,60],15);
  }
  function shouldDraw(mode,a,b){if(activeMode==='smart')return mode===(distanceKm(a,b)<1.5?'walk':distanceKm(a,b)<10?'bus':'car');return mode===activeMode}
  function clearRoutesOnly(){if(routeOverlays.length)map.remove(routeOverlays);routeOverlays=[]}
  function drawRoute(result,index){
    const line=new AMap.Polyline({path:result.path.map(pointArray),strokeColor:'#08788a',strokeWeight:7,strokeOpacity:.9,showDir:true,lineJoin:'round',zIndex:70});
    routeOverlays.push(line);map.add(line);
    const mid=result.path[Math.floor(result.path.length/2)];
    if(mid){const label=new AMap.Marker({position:pointArray(mid),anchor:'center',content:`<div class="route-time-label">${result.duration} 分</div>`,zIndex:100});routeOverlays.push(label);map.add(label)}
  }
  function updateTime(index,mode,result){
    const cell=board.querySelector(`[data-segment="${index}"] [data-time="${mode}"] strong`);if(cell)cell.textContent=result?`${result.duration} 分`:'暂无';
    const timelineRow=timeline.children[index]?.querySelector('.travel-row');if(!timelineRow||!result)return;
    const labels={walk:'步行',bus:'公交',car:'驾车',ride:'自行车',ebike:'电动车'};let target=timelineRow.querySelector(`[data-amap-mode="${mode}"]`);if(!target){target=document.createElement('span');target.dataset.amapMode=mode;timelineRow.appendChild(target)}target.className=result.estimated?'estimate':'official';target.textContent=`${labels[mode]} ${result.duration} 分${result.estimated?'（估）':''}`;
  }
  async function getRoute(mode,from,to){
    const key=`${from.id||from.name}:${to.id||to.name}:${mode}`;if(routeCache.has(key))return routeCache.get(key);
    const result=await searchRoute(mode,from,to);routeCache.set(key,result);return result;
  }
  function searchRoute(mode,from,to){return new Promise(resolve=>{
    const options=mode==='bus'?{city:'青岛市',cityd:'青岛市',policy:AMap.TransferPolicy?.LEAST_TIME??0,extensions:'all'}:{extensions:'all'};
    const Ctor={walk:AMap.Walking,bus:AMap.Transfer,car:AMap.Driving,ride:AMap.Riding}[mode];if(!Ctor){resolve(null);return}
    const service=new Ctor(options);service.search(pointArray(from),pointArray(to),(state,data)=>{
      if(state!=='complete'){resolve(null);return}
      try{resolve(extractRoute(mode,data))}catch{resolve(null)}
    });
  })}
  function extractRoute(mode,data){
    const route=mode==='bus'?data.plans?.[0]:data.routes?.[0];if(!route)return null;
    let path=[];
    if(mode==='bus'){
      for(const segment of route.segments||[]){
        for(const step of segment.walking?.steps||[])path.push(...(step.path||[]));
        for(const line of segment.bus?.buslines||[])path.push(...(line.path||[]));
        if(segment.railway?.path)path.push(...segment.railway.path);
      }
    }else if(mode==='ride')for(const ride of route.rides||route.steps||[])path.push(...(ride.path||[]));
    else for(const step of route.steps||[])path.push(...(step.path||[]));
    return{duration:minutes(route.time||route.duration),distance:Number(route.distance||0),path:path.map(lngLat).filter(Boolean)};
  }
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
})();
