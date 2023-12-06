## 快速开始 | [English](https://github.com/miniboxs/chatgpt-ts-cfworkers)

```
git clone https://github.com/miniboxs/chatgpt-ts-cfworkers.git
```

```
cd chatgpt-ts-cfworkers
```

```
npm install
```

```
cp wrangler.toml.template wrangler.toml
```

```
npm run login
```

```
npm run deploy
```

> **如果不需要chatgpt，请直接部署并查看[如何使用？](https://github.com/miniboxs/chatgpt-ts-cfworkers#use)*

# 创建D1并执行schema.sql

```
wrangler d1 create <DATABASE_NAME>
wrangler d1 execute   --file=sql/schema.sql
```

D1 文档： https: [//developers.cloudflare.com/d1/](https://developers.cloudflare.com/d1/)

# 编辑 wrangler.toml

```
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name="<DATABASE_NAME>"
database_id="<unique-ID-for-your-database>"
```

## 如何使用？

* API： https: [//xx.workers.dev](https://xx.workers.dev/) `(部署后的cf workers域名)`

| 端点                | 方法 | 范围           | 类型 | 必需的 | 描述               |
| --------------------- | ------ | ---------------- | ------ | -------- | -------------------- |
| `/api/ai`       | GET| `question` | String | 是的   | 问题的内容         |
|                     |      | `cid`      | String | 不     | 上下文标识符的数量 |
| `/api/text2img` | POST| `prompt`   |String | 是的   | 图像生成的文字提示 |
| `/api/text`     | POST| `prompt`   | String | 是的   | 文字处理的文字提示 |

## 其他

[https://github.com/Hideipnetwork/hideipnetwork-web](https://github.com/Hideipnetwork/hideipnetwork-web)
