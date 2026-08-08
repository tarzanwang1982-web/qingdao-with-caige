import Link from "next/link";

export default function PrivacyPage() { return <main className="legal-page"><Link href="/">← 返回首页</Link><p>隐私说明</p><h1>轻装上路，也少留痕迹</h1><section><h2>我们保存什么</h2><p>自定义行程只保存你选择的地点、日期、出发时间、交通偏好和你填写的出发点名称，用于生成专属分享链接。无需注册，也不要求填写姓名或电话号码。</p><h2>链接如何使用</h2><p>拿到查看链接的人可以看到行程内容；管理链接应由创建者自行保管。请不要在出发点名称中填写门牌号、房间号等敏感信息。</p><h2>第三方服务</h2><p>天气数据和高德导航由相应服务提供。打开外部导航后，将适用该服务自己的隐私政策。</p></section></main>; }
