import { auth } from '@/lib/auth';

interface IApp {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}

export { IApp };
