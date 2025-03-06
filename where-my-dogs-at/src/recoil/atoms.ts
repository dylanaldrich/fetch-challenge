/* imports */
import { atom } from 'recoil';

/* Global User State Atom */
export const userState = atom<string | null>({
  key: 'userState',
  default: null,
});
