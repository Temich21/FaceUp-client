import { useMainSt } from "@/stores/main"
import { AxiosResponse } from "axios"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { deleteRecord, getAllRecords, getFile, patchRecord, postCreateRecord, postFile, RequestBodyCreateRecord, getRecord, RequestBodyPostFile, ResponseBodyPostFile, deleteFile } from "@/api/records"
import { Record } from '@/stores/recordStore'
import { SelectedRecord } from "@/stores/selectedRecordStore"
import { toast } from "react-toastify"

type useRecord = {
    getAllRecordsMutation: UseMutationResult<Record[], Error, void, unknown>,
    postCreateRecordMutation: UseMutationResult<Record, Error, RequestBodyCreateRecord, unknown>,
    deleteRecordMutation: UseMutationResult<string, Error, string, unknown>,
    patchRecordMutation: UseMutationResult<Record, Error, Record, unknown>,
    getFileMutation: UseMutationResult<AxiosResponse<ArrayBuffer, unknown>, Error, string, unknown>,
    postFileMutation: UseMutationResult<ResponseBodyPostFile, Error, RequestBodyPostFile, unknown>,
    deleteFileMutation: UseMutationResult<void, Error, string, unknown>,
    getRecordutation: UseMutationResult<SelectedRecord, Error, string, unknown>
}

const useRecord = (): useRecord => {
    const { user, setRecords, addRecord, removeRecord, updateRecord } = useMainSt()

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

    const getFileMutation = useMutation({
        mutationFn: (fileId: string) => getFile(fileId),
        onSuccess: (response) => {
            const contentDisposition = response.headers['content-disposition']

            const filename = contentDisposition.match(/filename="?([^"]+)"?/)[1]

            const blob = new Blob([response.data], { type: 'application/octet-stream' });

            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = filename

            document.body.appendChild(a)
            a.click()

            URL.revokeObjectURL(url)
            document.body.removeChild(a)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const postFileMutation = useMutation({
        mutationFn: (credentials: RequestBodyPostFile) => postFile(credentials).then(res => res.data),
        onSuccess: () => {
            toast.success("File was uploaded successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const deleteFileMutation = useMutation({
        mutationFn: (fileId: string) => deleteFile(fileId).then(res => res.data),
        onSuccess: () => {
            toast.success("File was removed successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const getRecordutation = useMutation({
        mutationFn: (recordId: string) => getRecord(recordId).then(res => res.data),
        onError: (error) => {
            toast.error(error.message);
        },
    })

    return {
        getAllRecordsMutation,
        postCreateRecordMutation,
        deleteRecordMutation,
        patchRecordMutation,
        getFileMutation,
        postFileMutation,
        deleteFileMutation,
        getRecordutation
    }
}

export default useRecord;