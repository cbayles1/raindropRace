import {getServerSession} from 'next-auth';

export const session = async ({session, token}) => {
  session.user.id = token.id;
  return session;
}

export const getUserSession = async () => {
  const authUserSession = await getServerSession({
    callbacks: {session},
    onUnauthenticated() {
      redirect('/api/auth/signin'); 
    }
  });
  if (!authUserSession) {
    redirect('/api/auth/signin');
  }
  return authUserSession.user;
}