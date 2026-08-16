const places=[
['qingdao-station','青岛站','城市漫游','从海边火车站进入老城，行李多可先寄存。',120.3124,36.0649,20,'基本平坦','全年'],
['zhanqiao','栈桥','海景','青岛经典海岸地标，清晨和傍晚更从容。',120.3069,36.0611,50,'平坦，临海风大','全年'],
['yin-yu-lane','银鱼巷','美食街','旧里院、新店铺与青岛小吃交织的慢巷。',120.3188,36.0689,45,'轻微坡度','全年'],
['zhongshan-road','中山路·上街里','城市漫游','百年街区、里院与城市烟火集中在一起。',120.3225,36.0731,70,'局部缓坡','全年'],
['catholic-church','圣弥厄尔教堂','博物馆','老城天际线的重要建筑，周边适合步行。',120.3197,36.0696,40,'入口周边缓坡','全年'],
['christ-church','青岛基督教堂','博物馆','钟楼与山城街景很有辨识度。',120.3282,36.0706,35,'前往教堂有上坡','全年'],
['signal-hill','信号山公园','公园','从高处看红瓦、绿树与海岸线。',120.3350,36.0684,60,'连续上坡与台阶','春秋'],
['governor-house','德国总督楼旧址博物馆','博物馆','建筑、城市史与山海环境结合得完整。',120.3400,36.0668,75,'入口周边有坡','全年'],
['navy-museum','中国人民解放军海军博物馆','博物馆','室内外展陈丰富，旺季需预留安检时间。',120.3215,36.0525,120,'馆区较大','全年'],
['xiaoqingdao','小青岛公园','海景','岛、灯塔与青岛湾组成安静的海岸画面。',120.3186,36.0486,55,'少量台阶','春夏秋'],
['qinyu-road','琴屿路','海景','贴着海走的一段慢路，适合傍晚。',120.3280,36.0512,45,'基本平坦','春夏秋'],
['luxun-park','鲁迅公园','公园','礁石、松树与海浪组成老青岛海边记忆。',120.3356,36.0538,45,'局部台阶','全年'],
['underwater-world','青岛海底世界','亲子游乐','适合亲子和雨天，暑期建议提前购票。',120.3428,36.0560,130,'室内为主','全年'],
['xiaoyushan','小鱼山公园','公园','小巧的登高点，近看汇泉湾与老城屋顶。',120.3436,36.0596,50,'连续台阶','春秋'],
['first-beach','第一海水浴场','海景','青岛经典海滩，下海以现场开放为准。',120.3523,36.0579,65,'沙地较费力','夏'],
['zhanshan-temple','湛山寺','博物馆','城市山林中的安静人文停留点。',120.3845,36.0628,60,'有台阶与缓坡','全年'],
['badaguan','八大关','城市漫游','建筑、林荫路和四季植物组成大范围街区。',120.3667,36.0528,120,'缓坡较多','全年'],
['second-beach','第二海水浴场','海景','八大关旁的小海湾，夏日人流较多。',120.3619,36.0478,55,'沙地与台阶','夏'],
['taipingjiao','太平角公园','公园','较安静的海角，雨后和大浪天远离礁石。',120.3787,36.0487,50,'局部下坡','春夏秋'],
['may-fourth','五四广场','城市漫游','浮山湾城市地标，夜间灯光氛围更突出。',120.3848,36.0627,50,'广场平坦','全年'],
['olympic-sailing','奥帆中心·情人坝','海景','帆船港、海湾与城市天际线连成一线。',120.3965,36.0590,80,'步行距离较长','全年'],
['mixc','青岛万象城','购物','市中心大型商业体，适合作为天气备选。',120.3809,36.0679,120,'室内平坦','全年'],
['taidong','台东步行街','美食街','夜间小吃、餐饮和购物密集的老牌商圈。',120.3508,36.0798,100,'基本平坦','全年'],
['beer-museum','青岛啤酒博物馆','博物馆','从工业遗产和酿造工艺认识青岛啤酒文化。',120.3529,36.0850,100,'室内为主','全年'],
['zhongshan-park','中山公园','公园','春日赏花与城市休闲的经典公园。',120.3510,36.0640,80,'园内缓坡','春秋'],
['polar-ocean','青岛极地海洋公园','亲子游乐','海洋主题场馆，适合亲子和天气不稳时。',120.4418,36.0617,210,'室内外结合','全年'],
['xiaomai-island','小麦岛公园','公园','环岛草地和海景适合日落前后散步。',120.4650,36.0606,90,'环岛步行','春夏秋'],
['yanerdao','燕儿岛山公园','公园','沿海木栈道有上下坡，视野开阔。',120.4145,36.0602,75,'连续上下坡','春夏秋'],
['stone-oldman','石老人海水浴场','海景','东部开阔海滩，风浪大时遵从现场管理。',120.4894,36.0864,90,'沙地较费力','夏'],
['qingdao-museum','青岛市博物馆','博物馆','综合了解青岛历史与地方文化的室内场馆。',120.4687,36.1033,120,'室内平坦','全年'],
['lion-mall','金狮广场','购物','崂山区大型商场，适合东部行程补给休息。',120.4719,36.1048,100,'室内平坦','全年'],
['fushan-forest','浮山森林公园','公园','城市中的山体绿道，入口多，提前确认线路。',120.4310,36.1040,150,'长坡与台阶','春秋'],
['laoshan-yangkou','崂山仰口游览区','海景','山海同框的代表性游览区，天气影响明显。',120.6666,36.2253,300,'长距离上坡','春夏秋'],
['laoshan-taiqing','崂山太清游览区','海景','临海山路与人文景观结合，交通需留足时间。',120.6695,36.1478,300,'台阶与山路','春夏秋'],
['science-museum','青岛科技馆','亲子游乐','以海洋、科学与人为主题的大型综合科技馆，适合安排半天。',120.2868,36.2408,240,'馆内平坦，展厅较大','全年'],
['fangte','青岛方特梦幻王国','亲子游乐','大型主题乐园，建议单独安排大半天至一天。',120.2809,36.2403,420,'园区步行量大','春夏秋'],
['wildlife','青岛森林野生动物世界','亲子游乐','西海岸亲子场馆，市区往返交通时间较长。',120.0846,35.9885,300,'园区有坡','春夏秋'],
['golden-beach','金沙滩','海景','西海岸开阔沙滩，暑期与啤酒节期间关注人流。',120.2407,35.9594,120,'沙地较费力','夏'],
['tangdao-bay','唐岛湾滨海公园','公园','适合骑行和长距离滨海散步的西海岸公园。',120.1945,35.9558,150,'路线较长','春夏秋'],
['lijiang-night','李村夜市','美食街','北部城区夜间美食和逛街集中地。',120.4216,36.1624,100,'基本平坦','全年'],
['licun-mall','李村商圈','购物','商场、步行街与餐饮集中，地铁到达方便。',120.4215,36.1613,150,'基本平坦','全年'],
['mix-sea-market','浮山所海鲜市集','美食街','传统市场与海鲜消费场景，购买前确认价格。',120.3940,36.0734,80,'市场通道湿滑风险','夏'],
['city-memory','青岛城市展览馆','博物馆','以城市发展和规划为主题的室内参观。',120.4638,36.0999,80,'室内平坦','全年']
].map(([id,name,category,summary,lng,lat,duration,slope,season])=>({id,name,category,summary,lng,lat,duration,slope,season}));

const bookingInfo={
  'navy-museum':{level:'required',label:'需要实名预约',note:'免费参观，建议尽早通过官方平台预约，并携带预约证件。',url:'https://www.hjbwg.com/',action:'前往官方预约'},
  'science-museum':{level:'check',label:'目前散客免预约',note:'2026年5月29日起试行散客免预约，专题活动或团队可能另有要求，出发前请核对。',url:'https://www.qdkjg.com.cn/',action:'查看官方通知'},
  'qingdao-museum':{level:'check',label:'建议提前取票',note:'免费开放且有人数限制，可通过官方微信公众号或授权渠道获取电子票。',url:'https://www.qingdaomuseum.cn/',action:'查看参观指南'},
  'beer-museum':{level:'ticket',label:'建议提前购票',note:'实行实名预约购票，旺季和特色体验票建议提前选择时段。',url:'https://www.tsingtaomuseum.com/',action:'官方预约购票'},
  'underwater-world':{level:'ticket',label:'建议提前购票',note:'暑期与节假日客流较大，提前购票可减少现场等待。',url:'https://www.qdhdworld.com/',action:'官方在线购票'}
};

const routes=[
{id:'old-city',name:'老城寻踪',sub:'从青岛站走进红瓦老城',art:'old',ids:['qingdao-station','yin-yu-lane','zhongshan-road','catholic-church','christ-church','signal-hill','governor-house'],tag:'半日 · 人文 · 有坡',season:'春秋最佳，冬季晴天也适合',travel:'步行为主，信号山段有连续上坡',pace:'建议 5 至 6 小时',description:'这条路线把青岛站、里院街巷、宗教建筑和山城视角连在一起。景点集中，步行效率高，但最后两站坡度明显，带老人或推车时可在教堂附近改乘出租车。'},
{id:'coast',name:'沿海漫步',sub:'从小青岛一路走到八大关',art:'coast',ids:['navy-museum','xiaoqingdao','qinyu-road','luxun-park','first-beach','badaguan','taipingjiao'],tag:'一日 · 海景 · 长距离',season:'4 至 6 月、9 至 10 月',travel:'长距离步行，途中可用公交缩短体力段',pace:'建议 8 至 10 小时',description:'海军博物馆之后一路贴着海岸向东，礁石、松林、沙滩和建筑街区不断变化。全程步行量较大，适合体力较好的游客；夏季建议早出发，并把正午留给室内或午餐。'},
{id:'first',name:'第一次来青岛',sub:'经典老城与浮山湾组合',art:'first',ids:['zhanqiao','catholic-church','signal-hill','badaguan','may-fourth','olympic-sailing'],tag:'一日 · 经典 · 全年龄',season:'全年，春秋体验最稳定',travel:'老城步行，跨片区使用地铁或出租车',pace:'建议完整一天',description:'第一次到青岛可以用这一条认识城市的两张面孔：上午看老城红瓦与海湾，下午穿过八大关，傍晚进入浮山湾。老城与东部相距较远，不建议全程步行。'},
{id:'family',name:'带爸妈轻松游',sub:'少爬坡，多休息，交通从容',art:'family',ids:['qingdao-museum','may-fourth','olympic-sailing','mixc'],tag:'一日 · 轻松 · 室内外',season:'全年，炎热和寒冷天气都可调整',travel:'地铁与出租车为主，减少连续步行',pace:'建议 7 至 8 小时',description:'这条路线优先考虑座椅、卫生间、室内休息和交通便利度。上午从博物馆开始，下午进入五四广场和奥帆中心，最后在万象城用餐休息，整体坡度较小。'},
{id:'mountain',name:'山海之间',sub:'把最好天气留给崂山',art:'mountain',ids:['laoshan-taiqing','laoshan-yangkou'],tag:'一日 · 山海 · 挑战',season:'4 至 6 月、9 至 11 月',travel:'两个游览区距离较远，建议自驾或包车',pace:'建议早出发，留足一天',description:'太清与仰口分别展现崂山的人文海岸和山海高处。两个游览区并不相邻，公共交通换乘耗时较长；若不自驾，建议根据天气和体力二选一，体验反而更完整。'},
{id:'rain',name:'雨天也能玩',sub:'把风雨留在场馆窗外',art:'rain',ids:['underwater-world','governor-house','beer-museum'],tag:'一日 · 室内 · 亲子',season:'全年，雨雪天优先',travel:'场馆之间建议打车或地铁加步行',pace:'建议 7 至 8 小时',description:'选择三个室内占比高、内容差异明显的场馆，避免雨天在城市两端反复奔波。海底世界适合亲子，总督楼适合建筑与历史爱好者，啤酒博物馆适合作为下午或傍晚收尾。'},
{id:'food',name:'老城逛吃',sub:'街巷、市场与青岛味道',art:'food',ids:['yin-yu-lane','zhongshan-road','taidong','beer-museum'],tag:'半日 · 美食 · 烟火',season:'全年，傍晚开始更有氛围',travel:'前半段步行，前往台东可乘地铁',pace:'建议 5 至 6 小时',description:'从老城小巷与里院开始，逐渐进入台东的夜间烟火。不要把每一站都当成正餐，适合多人分食、少量多样；啤酒博物馆需要留出完整参观时间。'},
{id:'night',name:'浮山湾夜色',sub:'从日落走到灯光亮起',art:'night',ids:['yanerdao','olympic-sailing','may-fourth','mixc'],tag:'半日 · 夜景 · 轻松',season:'春夏秋更适合海边停留',travel:'海岸步行，返程地铁方便',pace:'建议日落前 2 小时开始',description:'从燕儿岛山的木栈道走向奥帆中心，再到五四广场看城市灯光。路线方向顺畅，适合下午晚些时候开始；大风或路面湿滑时可跳过燕儿岛山段。'},
{id:'museum',name:'博物馆的一天',sub:'从海军史到城市与啤酒',art:'museum',ids:['navy-museum','governor-house','beer-museum'],tag:'一日 · 人文 · 需预约',season:'全年，周一需特别核对闭馆',travel:'第一段步行加打车，后段建议地铁',pace:'建议完整一天',description:'从海军史、城市建筑史到工业文化，三个场馆的主题不重复。海军博物馆需要提前实名预约，其他场馆也建议先确认开放与票务，避免临时调整打乱整天节奏。'},
{id:'shopping',name:'青岛城市生活',sub:'市场、商圈与夜间美食',art:'shopping',ids:['mix-sea-market','mixc','taidong','lijiang-night'],tag:'一日 · 购物 · 美食',season:'全年，适合作为天气备选',travel:'地铁串联效率较高',pace:'建议下午至夜间',description:'这不是传统景点打卡，而是体验青岛人的市场、商场与夜生活。几个片区跨度较大，建议只在每处选择一个重点，并利用地铁移动，避免把时间耗在路上。'}
];

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const routeGrid=$('#routeGrid'),routeDetail=$('#routeDetail'),mapTitle=$('#mapTitle'),mapSummary=$('#mapSummary'),filters=$('#filters'),placeGrid=$('#placeGrid'),morePlaces=$('#morePlaces'),selectedCount=$('#selectedCount'),routeMap=$('#routeMap'),startPlace=$('#startPlace'),travelDate=$('#travelDate'),startTime=$('#startTime'),transport=$('#transport'),pace=$('#pace'),timeline=$('#timeline'),planTitle=$('#planTitle'),planTotal=$('#planTotal'),saveShare=$('#saveShare'),openFirstNav=$('#openFirstNav'),planWeather=$('#planWeather'),heroWeather=$('#heroWeather'),weatherPanel=$('#weatherPanel'),placeNames=$('#placeNames'),clearSelection=$('#clearSelection'),locate=$('#locate'),shareStatus=$('#shareStatus'),planner=$('#planner');
let selected=[],activeCategory='全部',showAll=false,userLocation=null,weatherCache=null;
const byId=id=>places.find(p=>p.id===id);
const hav=(a,b)=>{const r=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLng=toRad(b.lng-a.lng),q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;return 2*r*Math.asin(Math.sqrt(q))};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const timeAdd=(base,min)=>{const [h,m]=base.split(':').map(Number),d=new Date(2000,0,1,h,m+min);return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`};

function renderRoutes(){routeGrid.innerHTML=routes.map((r,i)=>`<button class="route-tab" data-route="${r.id}" type="button" aria-pressed="false"><span>${String(i+1).padStart(2,'0')}</span><strong>${r.name}</strong><small>${r.ids.length} 站 · ${r.tag.split(' · ')[0]}</small></button>`).join('');$$('.route-tab').forEach(button=>button.onclick=()=>previewRoute(button.dataset.route));previewRoute(routes[0].id)}
function applyRoute(id){selected=[...routes.find(r=>r.id===id).ids];renderPlaces();buildPlan();location.hash='planner';}
function routeDistance(route){const pts=route.ids.map(byId).filter(Boolean);return pts.slice(1).reduce((sum,p,i)=>sum+hav(pts[i],p),0)}
function routeImage(art){return ['old','rain','food','museum'].includes(art)?'route-oldcity.webp':['coast','night'].includes(art)?'route-coast.webp':'hero-qingdao.webp'}
function bookingMarkup(place){const info=bookingInfo[place.id];if(!info)return'';return `<div class="booking booking-${info.level}"><div><b>${info.label}</b><span>${info.note}</span></div><a href="${info.url}" target="_blank" rel="noreferrer">${info.action}</a></div>`}
function renderRouteDetail(route){const stops=route.ids.map(byId).filter(Boolean),distance=routeDistance(route),bookings=stops.filter(p=>bookingInfo[p.id]),images=[routeImage(route.art),'route-coast.webp','route-oldcity.webp'].filter((item,index,array)=>array.indexOf(item)===index);routeDetail.innerHTML=`<div class="route-story"><div class="route-story-copy"><div class="route-kicker">${route.tag}</div><h3>${route.name}</h3><p class="route-lead">${route.description}</p><dl class="route-facts"><div><dt>大致距离</dt><dd>${distance<10?distance.toFixed(1):Math.round(distance)} 公里</dd></div><div><dt>建议时长</dt><dd>${route.pace}</dd></div><div><dt>交通建议</dt><dd>${route.travel}</dd></div><div><dt>适合季节</dt><dd>${route.season}</dd></div></dl><button class="button primary route-plan" type="button" data-use="${route.id}">用这条路线开始规划</button></div><div class="route-gallery">${images.map((image,i)=>`<figure class="route-photo photo-${i+1}"><img src="images/${image}" alt="${esc(route.name)}实景参考" loading="lazy"><figcaption>${i===0?route.sub:'青岛沿途实景参考'}</figcaption></figure>`).join('')}</div></div><div class="route-stops"><h4>沿途顺序与注意事项</h4><ol>${stops.map((p,i)=>`<li><span>${i+1}</span><div><h5>${p.name}</h5><p>${p.summary} ${p.slope}，建议停留约 ${p.duration} 分钟。</p>${bookingMarkup(p)}</div></li>`).join('')}</ol>${bookings.length?`<p class="booking-footnote">本路线包含 ${bookings.length} 个需要提前关注预约或票务的地点。预约规则可能临时调整，请以官方页面当天信息为准。</p>`:''}</div>`;routeDetail.querySelector('[data-use]').onclick=()=>applyRoute(route.id)}
function previewRoute(id){const route=routes.find(r=>r.id===id);$$('.route-tab').forEach(button=>{const active=button.dataset.route===id;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});mapTitle.textContent=route.name;mapSummary.textContent=route.sub;drawMap(route.ids);renderRouteDetail(route)}

function renderFilters(){const cats=['全部','海景','博物馆','公园','亲子游乐','美食街','购物','城市漫游'];filters.innerHTML=cats.map(c=>`<button class="filter ${c===activeCategory?'active':''}" data-cat="${c}">${c}</button>`).join('');$$('[data-cat]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;showAll=false;renderFilters();renderPlaces()});}
function renderPlaces(){let list=activeCategory==='全部'?places:places.filter(p=>p.category===activeCategory);const visible=showAll?list:list.slice(0,12);placeGrid.innerHTML=visible.map(p=>{const info=bookingInfo[p.id];return `<article class="place-card ${selected.includes(p.id)?'selected':''}"><button class="place-select" data-place="${p.id}" type="button"><div class="place-top"><span>${p.category} · ${p.season}</span><i class="check">${selected.includes(p.id)?'✓':'+'}</i></div><div><h3>${p.name}</h3><p>${p.summary}</p></div><div class="place-foot"><span>建议 ${p.duration} 分钟</span><span>${p.slope}</span></div></button>${info?`<div class="place-booking booking-${info.level}"><span>${info.label}</span><a href="${info.url}" target="_blank" rel="noreferrer">${info.action}</a></div>`:''}</article>`}).join('');morePlaces.hidden=list.length<=12;morePlaces.textContent=showAll?'收起地点':'显示更多地点';$$('[data-place]').forEach(b=>b.onclick=()=>togglePlace(b.dataset.place));selectedCount.textContent=selected.length;}
function togglePlace(id){selected=selected.includes(id)?selected.filter(x=>x!==id):[...selected,id];renderPlaces();buildPlan()}

function project(p){const bounds={minLng:120.05,maxLng:120.70,minLat:35.94,maxLat:36.26};return{x:80+(p.lng-bounds.minLng)/(bounds.maxLng-bounds.minLng)*840,y:535-(p.lat-bounds.minLat)/(bounds.maxLat-bounds.minLat)*455}}
function drawMap(ids){const pts=ids.map(byId).filter(Boolean),lines=[];for(let x=80;x<=920;x+=120)lines.push(`<line class="map-grid" x1="${x}" y1="55" x2="${x}" y2="535"/>`);for(let y=55;y<=535;y+=80)lines.push(`<line class="map-grid" x1="80" y1="${y}" x2="920" y2="${y}"/>`);const coast=`<path class="map-coast" d="M60 500 C180 480 205 402 300 430 S420 515 535 427 S700 344 770 250 S875 150 950 70 L1000 0 L1000 600 L0 600 Z"/>`;const path=pts.length?`<polyline class="map-route" points="${pts.map(p=>{const q=project(p);return `${q.x},${q.y}`}).join(' ')}"/>`:'';const nodes=pts.map((p,i)=>{const q=project(p),anchor=q.x>760?'end':'start',dx=q.x>760?-16:16;return `<g><circle class="map-node" cx="${q.x}" cy="${q.y}" r="14"/><text class="map-number" x="${q.x}" y="${q.y+1}">${i+1}</text><text class="map-label" x="${q.x+dx}" y="${q.y-18}" text-anchor="${anchor}">${esc(p.name)}</text></g>`}).join('');routeMap.innerHTML=lines.join('')+coast+path+nodes;}

function startPoint(){const text=startPlace.value.trim(),matched=places.find(p=>p.name===text||p.name.includes(text));return userLocation||matched||{lat:36.0649,lng:120.3124,name:text||'青岛站'}}
function orderPlaces(items,start){const left=[...items],out=[];let cur=start;while(left.length){left.sort((a,b)=>hav(cur,a)-hav(cur,b));cur=left.shift();out.push(cur)}return out}
function travel(distance,mode){if(mode==='walk')return{label:'步行',min:Math.round(distance/4.2*60)};if(mode==='bus')return{label:'公交',min:Math.round(10+distance/18*60)};if(mode==='car')return{label:'打车',min:Math.round(6+distance/28*60)};return distance<1.3?{label:'步行',min:Math.round(distance/4.2*60)}:distance<10?{label:'公交',min:Math.round(10+distance/18*60)}:{label:'打车',min:Math.round(6+distance/30*60)}}
function amap(from,to,mode='walk'){const m=mode==='bus'?'bus':mode==='car'?'car':'walk';const fromParam=from&&from.lng?`${from.lng},${from.lat},${encodeURIComponent(from.name||'出发点')}`:'';return `https://uri.amap.com/navigation?from=${fromParam}&to=${to.lng},${to.lat},${encodeURIComponent(to.name)}&mode=${m}&policy=0&src=caige-qingdao`}
function buildPlan(){
  selectedCount.textContent=selected.length;
  if(!selected.length){timeline.innerHTML='';planTitle.textContent='先从地点库勾选想去的地方';planTotal.textContent='0 小时';saveShare.disabled=true;openFirstNav.setAttribute('aria-disabled','true');drawMap([]);return}
  const start=startPoint(),items=orderPlaces(selected.map(byId).filter(Boolean),start),paceFactor=pace.value==='slow'?1.25:pace.value==='fast'?.82:1;
  let cursor=startTime.value||'09:00',total=0,prev=start;
  timeline.innerHTML=items.map((p,i)=>{
    const d=hav(prev,p),t=travel(d,transport.value),stay=Math.round(p.duration*paceFactor),arrival=timeAdd(cursor,t.min),leave=timeAdd(arrival,stay),walk=Math.max(3,Math.round(d/4.2*60)),bus=Math.round(10+d/18*60),car=Math.round(6+d/28*60),url=amap(prev,p,t.label==='公交'?'bus':t.label==='打车'?'car':'walk'),info=bookingInfo[p.id];
    total+=t.min+stay;cursor=leave;
    const booking=info?`<div class="timeline-booking booking-${info.level}"><b>${info.label}</b><span>${info.note}</span><a href="${info.url}" target="_blank" rel="noreferrer">${info.action}</a></div>`:'';
    const html=`<li><span class="timeline-num">${i+1}</span><div><span class="time">${arrival} 到达 · ${leave} 离开</span><h4>${p.name}</h4><p>${p.summary}<br>路况提示：${p.slope}。</p>${booking}<div class="travel-row"><span>步行约 ${walk} 分</span><span>公交约 ${bus} 分</span><span>打车约 ${car} 分</span></div><a class="nav-link" href="${url}" target="_blank" rel="noreferrer">打开这一段高德导航 →</a></div></li>`;
    prev=p;return html
  }).join('');
  planTitle.textContent=`${items.length} 站 · ${start.name||startPlace.value||'青岛站'}出发`;
  planTotal.textContent=total>=600?`约 ${Math.ceil(total/540)} 天`:`约 ${(total/60).toFixed(1)} 小时`;
  saveShare.disabled=false;openFirstNav.removeAttribute('aria-disabled');openFirstNav.href=amap(start,items[0],transport.value==='bus'?'bus':transport.value==='car'?'car':'walk');drawMap(items.map(p=>p.id));renderDayWeather()
}

async function fetchWeather(){try{const today=new Date(),end=new Date(today);end.setDate(end.getDate()+15);const fmt=d=>d.toISOString().slice(0,10),weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=36.0671&longitude=120.3826&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,snowfall_sum&timezone=Asia%2FShanghai&start_date=${fmt(today)}&end_date=${fmt(end)}`,airUrl='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=36.0671&longitude=120.3826&current=us_aqi,pm2_5&timezone=Asia%2FShanghai';const [weather,air]=await Promise.all([fetch(weatherUrl).then(r=>r.json()),fetch(airUrl).then(r=>r.json()).catch(()=>null)]);weatherCache={...weather,air:air?.current||null};renderWeather();renderDayWeather()}catch{heroWeather.innerHTML='<span>青岛天气</span><strong>暂未读取</strong><small>出发前请查看官方预警</small>';weatherPanel.innerHTML='<div><strong>天气服务暂不可用</strong><p>不影响路线与高德导航使用。</p></div>'}}
const weatherText=c=>c===0?'晴':c<=3?'多云':c<=48?'有雾':c<=67?'有雨':c<=77?'有雪':c<=82?'阵雨':c<=86?'阵雪':'雷雨';
function renderWeather(){if(!weatherCache)return;const c=weatherCache.current,d=weatherCache.daily,air=weatherCache.air;heroWeather.innerHTML=`<span>青岛现在</span><strong>${Math.round(c.temperature_2m)}° · ${weatherText(c.weather_code)}</strong><small>体感 ${Math.round(c.apparent_temperature)}° · 风速 ${Math.round(c.wind_speed_10m)} km/h${air?` · AQI ${Math.round(air.us_aqi)}`:''}</small>`;const uv=d.uv_index_max[0],rain=d.precipitation_sum[0],snow=d.snowfall_sum[0],road=snow>0?'可能积雪结冰':rain>=15?'低洼处可能积水':rain>1?'路面湿滑':'路面正常',aqi=air?air.us_aqi:null;weatherPanel.innerHTML=`<div><span>今天建议</span><strong>${rain>8||snow>1?'调整户外段':'正常游玩'}</strong><p>${rain>8?'降雨较明显，减少礁石和山路。':snow>0?'关注积雪结冰，鞋底需防滑。':'普通天气按计划走即可。'}</p></div><div><span>最高 / 最低</span><strong>${Math.round(d.temperature_2m_max[0])}° / ${Math.round(d.temperature_2m_min[0])}°</strong></div><div><span>体感温度</span><strong>${Math.round(c.apparent_temperature)}°</strong></div><div><span>紫外线</span><strong>${uv>=6?'较强':uv>=3?'中等':'较弱'}</strong></div><div><span>路面情况</span><strong>${road}</strong></div><div><span>空气质量</span><strong>${aqi==null?'暂缺':aqi<=50?'优':aqi<=100?'良':'需留意'}${aqi==null?'':` · ${Math.round(aqi)}`}</strong></div><div><span>穿衣提示</span><strong>${c.apparent_temperature<8?'保暖防风':c.apparent_temperature>25?'轻薄防晒':'薄外套'}</strong></div>`}
function renderDayWeather(){if(!weatherCache||!selected.length){planWeather.innerHTML='';return}const date=travelDate.value,index=weatherCache.daily.time.indexOf(date);if(index<0){planWeather.innerHTML='<div class="day-weather">该日期超出免费天气预报范围。路线仍可保存，临近出发时再查看天气。</div>';return}const d=weatherCache.daily,code=d.weather_code[index],rain=d.precipitation_sum[index],snow=d.snowfall_sum[index],uv=d.uv_index_max[index],extreme=code>=95||rain>=25||snow>=5;planWeather.innerHTML=`<div class="day-weather ${extreme?'warning':''}"><b>${date} · ${weatherText(code)} · ${Math.round(d.temperature_2m_min[index])}° 至 ${Math.round(d.temperature_2m_max[index])}°</b><br>${extreme?'可能出现明显风雨雪或雷暴，建议提前或延后户外行程。':rain>5?'带伞并减少礁石、木栈道和连续山路。':'天气不会明显妨碍体验，可照常游玩。'} 紫外线${uv>=6?'较强，注意防晒':'不高'}${snow>0?'，可能有积雪或结冰':''}。</div>`}

function share(){const data={p:selected,d:travelDate.value,t:startTime.value,s:startPlace.value,m:transport.value,v:pace.value};const encoded=btoa(unescape(encodeURIComponent(JSON.stringify(data))));const url=`${location.origin}${location.pathname}#trip=${encoded}`;navigator.clipboard?.writeText(url).then(()=>shareStatus.textContent='专属链接已复制，可直接发给亲友。').catch(()=>{prompt('复制下面的专属链接',url)});history.replaceState(null,'',`#trip=${encoded}`)}
function restore(){const match=location.hash.match(/^#trip=(.+)$/);if(!match)return;try{const d=JSON.parse(decodeURIComponent(escape(atob(match[1]))));selected=d.p||[];travelDate.value=d.d||travelDate.value;startTime.value=d.t||'09:00';startPlace.value=d.s||'青岛站';transport.value=d.m||'smart';pace.value=d.v||'normal';setTimeout(()=>{renderPlaces();buildPlan();planner.scrollIntoView()},100)}catch{}}

const today=new Date();travelDate.min=today.toISOString().slice(0,10);travelDate.value=travelDate.min;const last=new Date(today);last.setDate(last.getDate()+15);travelDate.max=last.toISOString().slice(0,10);placeNames.innerHTML=places.map(p=>`<option value="${p.name}">`).join('');
morePlaces.onclick=()=>{showAll=!showAll;renderPlaces()};clearSelection.onclick=()=>{selected=[];renderPlaces();buildPlan()};[travelDate,startTime,startPlace,transport,pace].forEach(el=>el.addEventListener(el===startPlace?'change':'input',buildPlan));locate.onclick=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(pos=>{userLocation={name:'我的当前位置',lng:pos.coords.longitude,lat:pos.coords.latitude};startPlace.value='我的当前位置';locate.textContent='已使用当前位置';buildPlan()},()=>{locate.textContent='定位失败，请检查浏览器定位权限'}):locate.textContent='当前浏览器不支持定位';saveShare.onclick=share;
renderRoutes();renderFilters();renderPlaces();fetchWeather();restore();
