```
## quickstart
```

```
git clone https://github.com/miniboxs/chatgpt-ts-cfworkers.git
```

```
cd chatgpt-ts-cfworkers && npm install
```

# Create D1 and execute schema.sql

```
wrangler d1 create <DATABASE_NAME>
wrangler d1 execute   --file=sql/schema.sql
```

```
D1 visit: [https://developers.cloudflare.com/d1/](https://developers.cloudflare.com/d1/)
```

```
cp wrangler.toml.template wrangler.toml
```

# Edit wrangler.toml

```
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name="<DATABASE_NAME>"
database_id="<unique-ID-for-your-database>"
```

## how to use?

* API: https://xx.workers.dev

| Endpoint                       | Method | Parameter   | Type   | Required | Description                                |
| ------------------------------ | ------ | ----------- | ------ | -------- | ------------------------------------------ |
| `/api/ai`                      	| GET    | `question`  | string | Yes      | The content of the question                |
|                                	|        | `cid`       | string| No       | of context identifiers               |
| `/api/text2img`             | POST   | `prompt`    | string | Yes      | Text prompt for image generation           |
| `/api/text`                    | POST   | `prompt`    | string | Yes      | Text prompt for text processing            |


