import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import useRecord from "@/hooks/useRecord"

type RecordCredentions = {
    title: string
    category: Category
    details: string
}

const CreateNewRecord = () => {
    const { postCreateRecordMutation } = useRecord()

    const {
        register,
        handleSubmit,
        control,
        reset
    } = useForm<RecordCredentions>()

    const onSubmit = (recordCredentials: RecordCredentions) => {
        postCreateRecordMutation.mutate(recordCredentials, {
            onSuccess: () => {
                reset()
            },
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"blue"}>Create New Record</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Record</DialogTitle>
                </DialogHeader>
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
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewRecord