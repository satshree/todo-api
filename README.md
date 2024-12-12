# ToDo API

Backend API for simple ToDo app

## Tech Stack

- Express.js
- MySQL (Prisma)

# Setup

1. Create `.env` file at the root with following settings

```text
DATABASE_URL="mysql://dbusername:dbpassword@dbhost:port/dbname"
```

2. Install packages

```bash
npm install
```

3. Generate Prisma Client

```bash
npx prisma generate
```

4. Migrate database

```bash
npx prisma migrate dev --name init
```

5. Run API

```bash
npm run start
```

# REST API

## Fetch todo list

```
/tasks/ [GET]
```

## Add todo item

```
/tasks/ [POST] { title: string, color: string }
```

## Update todo item

```
/tasks/id [PUT] { title: string, color: string, completed: boolean }
```

## Delete todo item

```
/tasks/id [DELETE]
```

#

Work by Satshree Shrestha
