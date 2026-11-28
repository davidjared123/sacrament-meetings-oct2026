import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

// Built-in authorized leader accounts for the ward
const LEADER_USERS = [
  {
    id: '1',
    name: 'Bishopric Rexburg 1st',
    email: 'bishopric@rexburg1st.org',
    // bcrypt hash of 'bishopric2026'
    passwordHash: '$2b$10$KkApSk6SvlOKkh3tcQGLp.F3AGHgnK8d0SfXtatauIg4jP3ctLTlO',
    role: 'bishopric',
  },
  {
    id: '2',
    name: 'Ward Clerk',
    email: 'clerk@rexburg1st.org',
    // bcrypt hash of 'bishopric2026'
    passwordHash: '$2b$10$KkApSk6SvlOKkh3tcQGLp.F3AGHgnK8d0SfXtatauIg4jP3ctLTlO',
    role: 'clerk',
  },
];

async function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return LEADER_USERS.find((u) => u.email.toLowerCase() === normalized) || null;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});
