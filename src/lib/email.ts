import { User } from 'better-auth/types';

export const sendEmail = async (
  {
    user,
    url,
    token,
  }: {
    user: User;
    url: string;
    token: string;
  },
  request: Request | undefined,
): Promise<void> => {
  // todo send email to verify
  // eslint-disable-next-line no-console
  console.log({ user, url, token, request });
};
