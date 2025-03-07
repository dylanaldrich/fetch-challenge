import { atom } from 'jotai';

export const user = atom<{ name: string | null } | null>(null);

export const loggedIn = atom((get) => {
  const activeUser = get(user);
  return !!activeUser && !!activeUser.name;
});
