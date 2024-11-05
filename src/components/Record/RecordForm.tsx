import { DetailedHTMLProps, FormHTMLAttributes, forwardRef, useState } from 'react';
import { Control, Controller, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Category } from '@/stores/recordStore';
import { Button } from '../ui/button';
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useRecord from '@/hooks/useRecord';
import { FileInfo } from '@/stores/selectedRecordStore';

export const FormRecord = forwardRef<
    HTMLFormElement,
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement>
>(({ className, children, ...rest }, ref) => {
    return <form
        className={`grid gap-4 py-4 ${className}`}
        {...rest}
        ref={ref}
    >
        {children}
    </form>
})

type TextFieldProps<T extends FieldValues> = {
    label: string
    id: Path<T>
    register: UseFormRegister<T>
    error?: string
    type?: "input" | "textarea"
}
export const TextField = <T extends FieldValues,>({ label, id, register, error, type = "input" }: TextFieldProps<T>) => (
    <div className={`grid  ${type === "input" ? "grid-cols-4 items-center gap-4" : "grid-cols-1 items-start gap-2"}`}>
        <Label htmlFor={id} className="text-left text-md">
            {label}
        </Label>
        {type === "input" ? (
            <Input id={id} className="col-span-3" {...register(id)} />
        ) : (
            <Textarea id={id} className="col-span-3" {...register(id)} />
        )}
        {error && (
            <p className={`text-red-500 ${type === "input" ? "col-span-4" : ""}`}>
                {error}
            </p>
        )}
    </div>
)

type CategorySelectProps<T extends FieldValues> = {
    control: Control<T>
    error?: string
    name: Path<T>
}

export const CategorySelect = <T extends FieldValues>({ control, error, name }: CategorySelectProps<T>) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-left text-md">
            Category
        </Label>
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please Choose a category!" }}
            render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="category" className="col-span-3 w-[230px]">
                        <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={Category.BULLYING}>Bullying, bad behaviour</SelectItem>
                            <SelectItem value={Category.LEARNING_DIFFICULTIES}>Learning difficulties</SelectItem>
                            <SelectItem value={Category.HOME_PROBLEMS}>Problems at home</SelectItem>
                            <SelectItem value={Category.OTHER}>Something else</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        />
        {error && <p className="text-red-500 col-span-4">{error}</p>}
    </div>
)

type FileAddProps = {
    files: File[]
    setFiles: (files: File[]) => void
}

export const FileAdd = ({ files = [], setFiles }: FileAddProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleAddFile = () => {
        if (selectedFile) {
            setFiles([...files, selectedFile])
            setSelectedFile(null)
        }
    }

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    return (
        <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="files" className="text-left text-md">
                Files
            </Label>
            <div className="flex gap-5">
                <Input type="file" className="mb-3" onChange={handleFileChange} />
                <Button
                    variant={"blue"}
                    onClick={handleAddFile}
                    disabled={!selectedFile || files.some(file => file.name === selectedFile.name)}
                >
                    Add File
                </Button>
            </div>
            <ul>
                {files.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {file.name}
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-red-700 cursor-pointer"
                            onClick={() => handleRemoveFile(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

type FileUploadProps = {
    files: FileInfo[]
    setFiles: (files: FileInfo[]) => void
    recordId: string
}

export const FileUpload = ({ files = [], setFiles, recordId }: FileUploadProps) => {
    const { postFileMutation, deleteFileMutation } = useRecord()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleUploadFile = () => {
        if (selectedFile) {
            postFileMutation.mutate({ file: selectedFile, recordId }, {
                onSuccess: (data) => {
                    setFiles([...files, data])
                }
            })
            setSelectedFile(null)
        }
    }

    const handleDeleteFile = (fileId: string) => {
        deleteFileMutation.mutate(fileId, {
            onSuccess: () => {
                setFiles(files.filter(file => file.id !== fileId))
            }
        })
    }

    return (
        <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="files" className="text-left text-md">
                Files
            </Label>
            <div className="flex gap-5">
                <Input type="file" className="mb-3" onChange={handleFileChange} />
                <Button
                    variant={"blue"}
                    onClick={handleUploadFile}
                    disabled={!selectedFile || files.some(file => file.filename === selectedFile.name)}
                >
                    Upload File
                </Button>
            </div>
            <ul>
                {files.map((file) => (
                    <li key={file.id} className="flex items-center gap-2">
                        {file.filename}
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-red-700 cursor-pointer"
                            onClick={() => handleDeleteFile(file.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}