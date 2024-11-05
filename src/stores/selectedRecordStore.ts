import { StateCreator } from 'zustand';
import { Common } from './main';
import { Category, Record } from './recordStore';

export type FileInfo = {
    id: string
    filename: string
}

export type SelectedRecord = Record & {
    files: FileInfo[]
}
const defaultSelectedRecord: SelectedRecord = {
    id: "",
    title: "",
    category: Category.BULLYING,
    details: "",
    files: [],
}

export type SelectedRecordStore = {
    choosenRecord: SelectedRecord
    setChoosenRecord: (records: SelectedRecord) => void
}

export const createSelectedRecordsSt: StateCreator<Common, [], [], SelectedRecordStore> = (set) => ({
    choosenRecord: defaultSelectedRecord,
    setChoosenRecord: (record: SelectedRecord | null) =>
        set({ choosenRecord: record || defaultSelectedRecord }),
})