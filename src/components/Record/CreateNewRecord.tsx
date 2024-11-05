import { useState } from "react"
import { useForm } from "react-hook-form"
import useRecord from "@/hooks/useRecord"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRecord, TextField, CategorySelect, FileAdd } from "./RecordForm"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Category } from "@/stores/recordStore"

export const RecordSchema = z.object({
    title: z.string().nonempty("Please enter a title"),
    category: z.nativeEnum(Category, { errorMap: () => ({ message: "Please choose a category" }) }),
    details: z.string().nonempty("Please enter details"),
})

const CreateNewRecord = () => {
    const { postCreateRecordMutation } = useRecord()
    const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof RecordSchema>>({
        resolver: zodResolver(RecordSchema),
    })

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = form

    const onSubmit = (recordCredentials: z.infer<typeof RecordSchema>) => {
        postCreateRecordMutation.mutate({ ...recordCredentials, files }, {
            onSuccess: () => {
                reset()
                setFiles([])
            },
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"blue"}>Create New Record</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Record</DialogTitle>
                </DialogHeader>
                <FormRecord onSubmit={handleSubmit(onSubmit)}>
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
                        type="textarea"
                        register={register}
                        error={errors.details?.message}
                    />
                    <FileAdd
                        files={files}
                        setFiles={setFiles}
                    />
                    <DialogFooter>
                        <Button type="submit">Create Record</Button>
                    </DialogFooter>
                </FormRecord>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewRecord