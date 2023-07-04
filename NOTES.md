### Starting a project NodeJS with Typescript, Fastify, Prisma , Postgres, Docker, and etc

## 1. Create a project

```bash
mkdir daily-diet-api
cd daily-diet-api
```

## 2. Create a package.json file

```bash
npm init -y
```

## 3. Install dependencies

```bash
npm i typescript @types/node tsx tsup -D
```

## 4. Create a tsconfig.json file

```bash
npx tsc --init
```

## 5. change the `target` to `es2020`

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 6. Install Fastify

```bash
npm i fastify
```

## 7. Create a src folder

```bash
mkdir src
```

## 8. Create a .gitignore file

```bash
touch .gitignore
```

## 9. Add the following to the .gitignore file

```bash
node_modules
dist
```

## 10. In package.json add the following scripts

```json
{
  "scripts": {
    "start:dev": "tsx watch src/server.ts",
    "start": "node build/server.js",
    "build": "tsup src --out-dir build"
  }
}
```

## 11. Create a file .npmrc

```bash
touch .npmrc
```

## 12. Add the following to the .npmrc file

```bash
save-exact=true
```

## 13. Create files .env and .env.example

```bash
touch .env .env.example
```

## 14. Install dotenv

```bash
npm i dotenv
```

## 15. Install zod

```bash
npm i zod
```

## 16. install eslint and Rockeseat config

```bash
npm i eslint @rocketseat/eslint-config -D
```

## 17. Create a .eslintrc.json file and .eslintignore

```bash
touch .eslintrc.json
touch .eslintignore
```

## 18. In the file tsconfig.json change `baseUrl`

```json
{
  "baseUrl": "./"
}
```

## 19. Yet in the file tsconfig.json change `paths`

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

## 20. Install Prisma

```bash
npm i prisma -D
```

## 21. Install Prisma Client

```bash
npm i @prisma/client
```

## 22. Initialize Prisma

```bash
npx prisma init
```

## 23. Make changes to the file prisma/schema.prisma for your database and tables what you want, for example:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Food {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model FoodUser {
  id        Int      @id @default(autoincrement())
  foodId    Int
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 24. Before run the following command, you need to have a database created in your Postgres instance in a Docker, for example:

```bash
docker run --name dailyDietAPI -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e  POSTGRESQL_DATABASE=dailyDietAPI -p 5432:5432 -d bitnami/postgresql
```

## 25. In .env file add the following:

```bash
DATABASE_URL="postgresql://docker:docker@localhost:5432/dailyDietAPI?schema=public"
```

## 26. After this run the following command to generate the Prisma Client

```bash
npx prisma generate
```

## 27. Run migrations

```bash
npx prisma migrate dev --name init
```

## 28. Install @fastify/cookies and @fastify/jwt how dev dependencies

```bash
npm i @fastify/cookies @fastify/jwt -D
```
