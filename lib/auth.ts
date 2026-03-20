// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./db";
// import { env } from "./env";
// import { resend } from "./resend";
// import { emailOTP } from "better-auth/plugins"
// import {admin} from 'better-auth/plugins'

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   socialProviders: {
//     github: {
//       clientId: env.AUTH_GITHUB_CLIENT_ID as string,
//       clientSecret: env.AUTH_GITHUB_SECRET as string,
//     },
//   },
//   plugins: [
//     emailOTP({
//       async sendVerificationOTP({ email, otp }) {
//         const { data, error } = await resend.emails.send({
//           from: 'NextLearn <onboarding@resend.dev>',
//           // to: [email],
//           to: ['pcp2905@gmail.com'],
//           subject: 'NextLearn - Verify your email',
//           html: `<p>Your OTP is <strong>${otp}</strong></p>`,
//         });
//       },
//     }),
//      admin()
//   ],
// });


/* eslint-disable @typescript-eslint/no-unused-vars */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";
import { emailOTP } from "better-auth/plugins"
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ✅ 🔥 ONLY THIS ADD
  baseURL: env.BETTER_AUTH_URL,
secret: env.BETTER_AUTH_SECRET,

trustedOrigins: [
  "https://next-learn-five-xi.vercel.app",
  "http://localhost:3000",
],

  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: env.AUTH_GITHUB_SECRET as string,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const { data, error } = await resend.emails.send({
          from: 'NextLearn <onboarding@resend.dev>',
          // to: [email],
          to: ['pcp2905@gmail.com'],
          subject: 'NextLearn - Verify your email',
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin()
  ],
});