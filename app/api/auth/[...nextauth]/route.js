import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
const db = require('../../db.js');
import {session} from '../../../lib/session';

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({account, profile}) {
            if (!profile?.email) {
                throw new Error('No profile given');
            }
            const userId = await db.loginOrRegister(profile.name, profile.email);
            return true;
        },
        session,
        async jwt({token, user, account, profile}) {
            if (profile) {
                const u = await db.getUserByEmail(profile.email);
                if (!u) {
                    throw new Error('No user found');
                }
                token.id = u.id;
            }
            return token;
        },
    }
});

export {handler as GET, handler as POST}

// some paths have to be changed on google dashboard once headed to production
// see https://www.youtube.com/watch?v=ot9yuKg15iA