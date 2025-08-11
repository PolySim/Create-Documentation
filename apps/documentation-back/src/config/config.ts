/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('dotenv').config();

export const config = {
  DATABASE_URL: process.env.DATABASE_URL,
} as const;
