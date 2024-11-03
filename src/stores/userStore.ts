import { StateCreator } from 'zustand';
import { Common } from './main';

export type User = {
    id: string
    email: string
    password: string
    age: number
}

export type UserStore = {
    user: User | null
    setUser: (user: User | null) => void
}

export const createUserSt: StateCreator<Common, [], [], UserStore> = (set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
})