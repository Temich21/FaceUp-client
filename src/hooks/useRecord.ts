import { deleteRecord, getAllRecords, patchRecord, postCreateRecord, RequestBodyCreateRecord } from "@/api/records"
import { useMainSt } from "@/stores/main"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Record } from '@/stores/recordStore'

type useRecord = {
    getAllRecordsMutation: UseMutationResult<Record[], Error, void, unknown>,
    postCreateRecordMutation: UseMutationResult<Record, Error, RequestBodyCreateRecord, unknown>,
    deleteRecordMutation: UseMutationResult<string, Error, string, unknown>,
    patchRecordMutation: UseMutationResult<Record, Error, Record, unknown>
}

const useRecord = (): useRecord => {
    const { user, setRecords, addRecord, removeRecord, updateRecord} = useMainSt()

    const getAllRecordsMutation = useMutation({
        mutationFn: () => getAllRecords(user!.id).then(res => res.data),
        onSuccess: (data) => {
            setRecords(data)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const postCreateRecordMutation = useMutation({
        mutationFn: (credentials: RequestBodyCreateRecord) => postCreateRecord(credentials, user!.id).then(res => res.data),
        onSuccess: (data) => {
            addRecord(data)
            toast.success("Record was created successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const deleteRecordMutation = useMutation({
        mutationFn: (recordId: string) => deleteRecord(recordId).then(res => res.data),
        onSuccess: (data) => {
            removeRecord(data)
            toast.success("Record was removed successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

     const patchRecordMutation = useMutation({
        mutationFn: (credentials: Record) => patchRecord(credentials).then(res => res.data),
        onSuccess: (data) => {
            updateRecord(data)
            toast.success("Record was updated successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return {
        getAllRecordsMutation,
        postCreateRecordMutation,
        deleteRecordMutation,
        patchRecordMutation
    }
}

export default useRecord;