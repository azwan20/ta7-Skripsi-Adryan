import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign-in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                // Add your own logic here to validate credentials and return a user object
                const user = { id: 1, name: 'User' };
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            }
        })
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        session: async (session, user) => {
            session.user.id = user.id; // Store user id in the session
            return Promise.resolve(session);
        },
    },
});