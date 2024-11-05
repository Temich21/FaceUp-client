import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { UserStore, createUserSt } from './userStore';
import { RecordStore, createRecordsSt } from './recordStore'
import { SelectedRecordStore, createSelectedRecordsSt } from './selectedRecordStore'

export type Common = UserStore & RecordStore & SelectedRecordStore;

export const useMainSt = create<Common>()(
  persist(
    immer((...a) => ({
      ...createUserSt(...a),
      ...createRecordsSt(...a),
      ...createSelectedRecordsSt(...a),
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
