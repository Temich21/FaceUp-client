import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { useMainSt } from "@/stores/main"
import useRecord from "@/hooks/useRecord"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySelect, FileUpload, FormRecord, TextField } from './RecordForm';
import { Button } from "@/components/ui/button"
import { RecordSchema } from "./CreateNewRecord"

type UpdateRecordCardT = {
    setIsUpdated: Dispatch<SetStateAction<boolean>>
}

const UpdateRecord = ({ setIsUpdated }: UpdateRecordCardT) => {
    const { choosenRecord, setChoosenRecord } = useMainSt()
    const { id, title, category, details, files: initialFiles } = choosenRecord!

    const { patchRecordMutation } = useRecord()
    const [files, setFiles] = useState(initialFiles)

    const form = useForm<z.infer<typeof RecordSchema>>({
        resolver: zodResolver(RecordSchema),
        defaultValues: {
            title,
            category,
            details,
        },
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty },
    } = form

    const onSubmit = (updateRecordCredentials: z.infer<typeof RecordSchema>) => {
        patchRecordMutation.mutate({ ...updateRecordCredentials, id })
        setChoosenRecord({ ...updateRecordCredentials, id, files })
        setIsUpdated(false)
    }

    return (
        <FormRecord onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <TextField
                label="Title"
                id="title"
                register={register}
                error={errors.title?.message}
            />
            <CategorySelect
                control={control}
                error={errors.category?.message}
                name="category"
            />
            <TextField
                label="Description"
                id="details"
                register={register}
                error={errors.details?.message}
                type="textarea"
            />
            <FileUpload
                files={files}
                setFiles={setFiles}
                recordId={id}
            />
            <div className="flex justify-end gap-5">
                <Button type="submit" variant="blue" disabled={!isDirty}>
                    Save changes
                </Button>
                <Button onClick={() => setIsUpdated(false)}>Cancel</Button>
            </div>
        </FormRecord>
    )
}

export default UpdateRecord