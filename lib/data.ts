export type Place = {
  id: string;
  name: string;
  category: "城市漫游" | "山海自然" | "博物馆人文" | "亲子体验" | "美食";
  summary: string;
  image: string;
  lat: number;
  lng: number;
  duration: number;
  difficulty: "轻松" | "适中" | "挑战";
  seasons: string[];
  weatherSensitivity: "低" | "中" | "高";
  note: string;
  slope: string;
  reservation?: string;
};

export type CuratedRoute = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  minutes: number;
  walkingKm: number;
  intensity: "轻松" | "适中" | "挑战";
  seasons: string[];
  audience: string[];
  theme: string[];
  placeIds: string[];
  featured?: boolean;
  seasonNote: string;
};

const oldCityImage = "/images/route-oldcity.webp";
const coastImage = "/images/route-coast.webp";
const mountainImage = "/images/hero-qingdao.webp";

export const places: Place[] = [
  { id:"qingdao-station", name:"青岛站", category:"城市漫游", summary:"从海边火车站开始，步行进入老城。", image:oldCityImage, lat:36.0649, lng:120.3124, duration:20, difficulty:"轻松", seasons:["全年"], weatherSensitivity:"低", note:"出站后先确认老城方向，行李较多时建议寄存。", slope:"基本平坦" },
  { id:"sardine-lane", name:"银鱼巷", category:"城市漫游", summary:"旧里院与新店铺交织，适合慢慢拍照。", image:oldCityImage, lat:36.0689, lng:120.3188, duration:35, difficulty:"轻松", seasons:["春","夏","秋"], weatherSensitivity:"中", note:"巷道较窄，雨天石板路可能湿滑。", slope:"轻微坡度" },
  { id:"zhongshan-memory", name:"中山路城市记忆馆", category:"博物馆人文", summary:"用一站时间读懂中山路与青岛商业史。", image:oldCityImage, lat:36.0711, lng:120.3199, duration:45, difficulty:"轻松", seasons:["全年","雨天"], weatherSensitivity:"低", note:"适合作为炎热或雨天的室内停留点。", slope:"室内平坦" },
  { id:"shangjieli", name:"上街里", category:"城市漫游", summary:"老建筑、街巷与城市烟火集中在一起。", image:oldCityImage, lat:36.0731, lng:120.3225, duration:40, difficulty:"轻松", seasons:["全年"], weatherSensitivity:"中", note:"节假日人多，可作为有时间再去的可选点。", slope:"局部缓坡" },
  { id:"christ-church", name:"青岛基督教堂", category:"博物馆人文", summary:"标志性的钟楼与山城街景。", image:oldCityImage, lat:36.0706, lng:120.3282, duration:35, difficulty:"适中", seasons:["全年"], weatherSensitivity:"中", note:"临近整点到达，更容易赶上钟声。", slope:"前往教堂有上坡", reservation:"开放信息请出发前复核" },
  { id:"signal-hill", name:"信号山公园", category:"山海自然", summary:"不高，却能把红瓦、绿树和海岸线收入眼底。", image:mountainImage, lat:36.0684, lng:120.3350, duration:60, difficulty:"适中", seasons:["春","秋","冬"], weatherSensitivity:"高", note:"强风、浓雾或雨雪天气不建议登顶。", slope:"连续上坡与台阶" },
  { id:"governor-house", name:"德国总督楼旧址", category:"博物馆人文", summary:"建筑、城市史与山海环境结合得最完整的一站。", image:oldCityImage, lat:36.0668, lng:120.3400, duration:70, difficulty:"适中", seasons:["全年","雨天"], weatherSensitivity:"低", note:"室内参观可缓解老城线路中的连续步行。", slope:"入口周边有坡", reservation:"旺季建议提前预约" },
  { id:"navy-museum", name:"中国海军博物馆", category:"博物馆人文", summary:"青岛具有代表性的博物馆，室内外展陈丰富。", image:coastImage, lat:36.0525, lng:120.3215, duration:120, difficulty:"适中", seasons:["全年"], weatherSensitivity:"中", note:"室外展区受风雨影响，旺季需预留安检时间。", slope:"馆区较大", reservation:"需提前预约" },
  { id:"xiaoqingdao", name:"小青岛", category:"山海自然", summary:"从岛、灯塔和岸线理解青岛名字的由来。", image:coastImage, lat:36.0486, lng:120.3186, duration:55, difficulty:"轻松", seasons:["春","夏","秋"], weatherSensitivity:"高", note:"海风较强时注意帽子和随身物品。", slope:"入口平缓，岛内少量台阶" },
  { id:"qinyu-road", name:"琴屿路", category:"城市漫游", summary:"贴着海走的一段慢路，适合傍晚停留。", image:coastImage, lat:36.0512, lng:120.3280, duration:45, difficulty:"轻松", seasons:["春","夏","秋"], weatherSensitivity:"高", note:"浪大、强风或道路湿滑时缩短停留。", slope:"基本平坦" },
  { id:"luxun-park", name:"鲁迅公园", category:"山海自然", summary:"礁石、松树和海浪组成青岛人的海边记忆。", image:coastImage, lat:36.0538, lng:120.3356, duration:45, difficulty:"适中", seasons:["全年"], weatherSensitivity:"高", note:"礁石区域不要越过安全提示，雨雪后注意湿滑。", slope:"局部台阶和礁石路" },
  { id:"underwater-world", name:"青岛海底世界", category:"亲子体验", summary:"老牌海洋场馆，适合亲子与雨天安排。", image:coastImage, lat:36.0560, lng:120.3428, duration:120, difficulty:"轻松", seasons:["全年","雨天","寒假"], weatherSensitivity:"低", note:"暑期排队明显，建议提早到达。", slope:"室内为主", reservation:"旺季建议提前购票" },
  { id:"first-beach", name:"第一海水浴场", category:"山海自然", summary:"青岛最早的度假海滩，也是海滨文化的一部分。", image:coastImage, lat:36.0579, lng:120.3523, duration:60, difficulty:"轻松", seasons:["夏","暑期"], weatherSensitivity:"高", note:"下海以浴场开放和现场安全提示为准。", slope:"沙地行走较费力" },
  { id:"badaguan", name:"八大关", category:"城市漫游", summary:"四季都有变化的建筑与林荫路，适合漫步。", image:coastImage, lat:36.0528, lng:120.3667, duration:120, difficulty:"适中", seasons:["春","夏","秋","冬"], weatherSensitivity:"中", note:"范围较大，建议按体力选择建筑和海边段。", slope:"缓坡较多" },
  { id:"taipingjiao", name:"太平角公园", category:"山海自然", summary:"相对安静的海角，适合拍照和看潮。", image:coastImage, lat:36.0487, lng:120.3787, duration:50, difficulty:"适中", seasons:["春","夏","秋"], weatherSensitivity:"高", note:"赶海需提前看潮汐，恶劣天气不要靠近礁石。", slope:"局部下坡与礁石" },
  { id:"laoshan", name:"崂山", category:"山海自然", summary:"山海相连，是青岛最具代表性的自然线路。", image:mountainImage, lat:36.1606, lng:120.6248, duration:300, difficulty:"挑战", seasons:["春","夏","秋"], weatherSensitivity:"高", note:"山区天气变化快，强风、雷电和冰雪时应调整计划。", slope:"长距离上坡和台阶", reservation:"按景区要求购票预约" },
  { id:"jinmaiyuan", name:"金麦园老面包", category:"美食", summary:"品种多、价格实在的青岛老面包。", image:oldCityImage, lat:36.0704, lng:120.3253, duration:25, difficulty:"轻松", seasons:["全年"], weatherSensitivity:"低", note:"热门时段可能排队，适合作为老城路线加餐。", slope:"临街店铺" },
  { id:"seafood-potstickers", name:"海鲜锅贴", category:"美食", summary:"把青岛海味包进焦香锅贴里。", image:oldCityImage, lat:36.0750, lng:120.3300, duration:60, difficulty:"轻松", seasons:["全年"], weatherSensitivity:"低", note:"具体店铺由后台持续精选与更新。", slope:"以具体店铺为准" },
];

export const routes: CuratedRoute[] = [
  { id:"old-city", name:"老城寻踪", subtitle:"从青岛站走进红瓦老城", description:"把你提供的5公里线路整理成一条有室内休息、有可选点的老城漫步。", image:oldCityImage, duration:"半日", minutes:300, walkingKm:5, intensity:"适中", seasons:["全年"], audience:["第一次来","摄影","全家"], theme:["老城","人文","逛吃"], placeIds:["qingdao-station","sardine-lane","zhongshan-memory","shangjieli","jinmaiyuan","christ-church","signal-hill","governor-house"], featured:true, seasonNote:"夏季建议早出发；冬季减少山顶停留。" },
  { id:"coastal-walk", name:"沿海漫步", subtitle:"从小青岛一路走到八大关", description:"海岸、人文和公园连续展开，完整路线约10公里，可按体力分段。", image:coastImage, duration:"一日", minutes:540, walkingKm:10, intensity:"挑战", seasons:["春","夏","秋"], audience:["摄影","情侣","朋友"], theme:["海滨","城市漫游"], placeIds:["navy-museum","xiaoqingdao","qinyu-road","luxun-park","underwater-world","first-beach","badaguan","taipingjiao"], featured:true, seasonNote:"强风和降雨时缩短海边段，增加室内场馆。" },
  { id:"first-time", name:"第一次来青岛", subtitle:"经典老城与海滨组合", description:"一天抓住青岛最有辨识度的红瓦、老城和海岸线。", image:mountainImage, duration:"一日", minutes:510, walkingKm:6.8, intensity:"适中", seasons:["全年"], audience:["第一次来","全家"], theme:["经典","老城","海滨"], placeIds:["qingdao-station","christ-church","signal-hill","governor-house","xiaoqingdao","qinyu-road","badaguan"], featured:true, seasonNote:"全年可走，按天气决定信号山与琴屿路停留时间。" },
  { id:"easy-family", name:"带爸妈轻松游", subtitle:"少爬坡，多休息，交通更从容", description:"保留青岛的代表性，同时把连续爬坡和长距离步行降下来。", image:coastImage, duration:"一日", minutes:420, walkingKm:3.2, intensity:"轻松", seasons:["全年"], audience:["老人","全家","亲子"], theme:["轻松","室内外结合"], placeIds:["zhongshan-memory","governor-house","navy-museum","underwater-world","badaguan"], seasonNote:"高温和寒冷天气增加室内停留。" },
  { id:"mountain-sea", name:"山海之间", subtitle:"崂山与渔村的一整天", description:"留足交通和登山时间，不把崂山塞进市区半日行程。", image:mountainImage, duration:"一日", minutes:600, walkingKm:8.5, intensity:"挑战", seasons:["春","夏","秋"], audience:["朋友","徒步"], theme:["崂山","山海"], placeIds:["laoshan"], seasonNote:"雷电、强风、暴雨、积雪或道路结冰时建议改期。" },
  { id:"rainy-day", name:"雨天也能玩", subtitle:"把风雨留在窗外", description:"博物馆、历史建筑、海洋场馆和美食组成的室内路线。", image:oldCityImage, duration:"一日", minutes:450, walkingKm:2.3, intensity:"轻松", seasons:["全年","雨天","寒假"], audience:["全家","老人","亲子"], theme:["雨天","室内","人文"], placeIds:["zhongshan-memory","governor-house","navy-museum","underwater-world","seafood-potstickers"], seasonNote:"暴雨预警时仍应以官方安全提示和场馆开放为准。" },
  { id:"food-oldtown", name:"逛吃青岛", subtitle:"老城烟火与青岛味道", description:"把老街、老面包、海鲜锅贴和城市故事连成不赶时间的一天。", image:oldCityImage, duration:"半日", minutes:270, walkingKm:3.6, intensity:"轻松", seasons:["全年"], audience:["美食","朋友","全家"], theme:["美食","老城"], placeIds:["sardine-lane","zhongshan-memory","shangjieli","jinmaiyuan","seafood-potstickers"], seasonNote:"天气影响较小，适合作为备选路线。" },
  { id:"three-day", name:"三天走懂青岛", subtitle:"老城、海滨、崂山各有一天", description:"按区域拆分，避免每天来回穿城，适合第一次完整认识青岛。", image:mountainImage, duration:"三日", minutes:1680, walkingKm:23.5, intensity:"适中", seasons:["春","夏","秋"], audience:["第一次来","全家","朋友"], theme:["经典","多日"], placeIds:["qingdao-station","sardine-lane","christ-church","signal-hill","governor-house","xiaoqingdao","qinyu-road","luxun-park","badaguan","laoshan"], seasonNote:"将天气最好的一天留给崂山，风雨天安排老城室内段。" },
];

export const placeById = Object.fromEntries(places.map((place) => [place.id, place]));

export const routeFilters = {
  duration: ["全部", "半日", "一日", "三日"],
  audience: ["全部", "第一次来", "全家", "老人", "亲子", "情侣", "摄影", "美食"],
  season: ["全部", "春", "夏", "秋", "冬", "暑期", "寒假", "雨天"],
};
