import { StateCreator } from 'zustand';
import { Common } from './main';

export enum Category {
    BULLYING = "Bullying, bad behaviour",
    LEARNING_DIFFICULTIES = "Learning difficulties",
    HOME_PROBLEMS = "Problems at home",
    OTHER = "Something else"
}

export type Record = {
    id: string
    title: string
    details: string
    category: Category
}

export type RecordStore = {
    records: Record[] | []
    setRecords: (records: Record[] | []) => void
    addRecord: (record: Record) => void
    removeRecord: (recordId: string) => void
    updateRecord: (record: Record) => void
}

export const createRecordsSt: StateCreator<Common, [], [], RecordStore> = (set) => ({
    records: [],
    setRecords: (records: Record[] | []) => set({ records }),
    addRecord: (record: Record) =>
        set((state) => ({
            records: [...state.records, record],
        })),
    removeRecord: (recordId: string) =>
        set((state) => ({
            records: state.records.filter((record) => record.id !== recordId),
        })),
    updateRecord: (updatedRecord: Record) =>
        set((state) => ({
            records: state.records.map((record) =>
                record.id === updatedRecord.id ? { ...record, ...updatedRecord } : record
            ),
        })),
})