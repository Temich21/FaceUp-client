import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { UserStore, createUserSt } from './userStore';
import {RecordStore, createRecordsSt} from './recordStore'

export type Common = UserStore & RecordStore;

export const useMainSt = create<Common>()(
  persist(
    immer((...a) => ({
      ...createUserSt(...a),
      ...createRecordsSt(...a)
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
