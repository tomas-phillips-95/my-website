# Example project with tRPC, Vue 3, express.js and prisma.

## An example todo project to demonstrate the usage of tRPC with Vue 3. It can be used as a startingpoint for you're project.

![screenshot](/images/todo.png)

Tanstack query is used to retrieve the data and manage the server state. Zod is
used to validate the incoming data.

used in this project:

- npm workspaces monorepo
- Express.js
- Prisma
- Typescript
- tRPC
- Zod
- Tailwind
- Vue 3
- Vue Query (tanstack)
- Prettier
- Eslint

recommended vscode extensions:

- Volar + TypeScript Vue Plugin (Volar)
- Prisma
- Tailwind CSS IntelliSense

# install and run

in the root of the root repo run:

```bash
npm install
```

initialize the db in the api repo

```bash
cd apps/api-server/
mv .env.example .env
npx prisma migrate dev --name init     
cd ../../
```

start the dev client and server

```bash
npm run dev
```
