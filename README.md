# Secure Notes

## Project Setup

1. Run `cp .env.example .env`
2. In `.env`, change the `JWT_SIGNING_SECRET` variable
3. Run the following commands:

```
cp .env.example .env
npm i
npx prisma migrate app --name init
npm run dev
```
