import { Dispatch, SetStateAction } from "react"
import useRecord from "@/hooks/useRecord"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Controller, useForm } from "react-hook-form"
import { Category } from "@/stores/recordStore"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type UpdateRecordCardT = {
    id: string
    title: string
    category: Category
    details: string
    setIsUpdated: Dispatch<SetStateAction<boolean>>
}

type UpdateRecordCredentions = {
    title: string
    category: Category
    details: string
}

const UpdateRecord = ({ id, title, category, details, setIsUpdated }: UpdateRecordCardT) => {
    const { patchRecordMutation } = useRecord()

    const {
        register,
        handleSubmit,
        control,
        formState: { isDirty },
    } = useForm<UpdateRecordCredentions>({
        defaultValues: {
            title: title,
            category: category,
            details: details,
        },
    })

    const onSubmit = (updateRecordCredentials: UpdateRecordCredentions) => {
        patchRecordMutation.mutate({ ...updateRecordCredentials, id })
        setIsUpdated(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-left text-md">
                    Title
                </Label>
                <Input
                    id="title"
                    className="col-span-3"
                    {...register("title", {
                        required: "Please Enter Title!",
                    })}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-left text-md">
                    Category
                </Label>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Please Choose a category!" }}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger id="category" className="col-span-3 w-[230px]">
                                <SelectValue placeholder="Choose category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Bullying, bad behaviour">Bullying, bad behaviour</SelectItem>
                                    <SelectItem value="Learning difficulties">Learning difficulties</SelectItem>
                                    <SelectItem value="Problems at home">Problems at home</SelectItem>
                                    <SelectItem value="Something else">Something else</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 items-start gap-2">
                <Label htmlFor="details" className="text-left text-md">
                    Description
                </Label>
                <Textarea
                    id="details"
                    className="w-full"
                    {...register("details", {
                        required: "Please Enter Details!",
                    })}
                />
            </div>
            <div className="flex justify-end gap-5">
                <Button type="submit" variant="blue" disabled={!isDirty}>
                    Save changes
                </Button>
                <Button onClick={() => setIsUpdated(false)}>Cancel</Button>
            </div>
        </form>
    )
}

export default UpdateRecord