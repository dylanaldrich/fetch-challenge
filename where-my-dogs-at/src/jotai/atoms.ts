import { atom } from 'jotai';

export const user = atom<{ name: string | null } | null>(null);
export const favoriteDogIds = atom<Set<string>>(new Set<string>());

export const loggedIn = atom((get) => {
  const activeUser = get(user);
  return !!activeUser && !!activeUser.name;
});
