import { Category } from '@/stores/recordStore'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import useRecord from '@/hooks/useRecord'
import { useState } from 'react'
import UpdateRecord from './UpdateRecord'

export type RecordCardT = {
    id: string
    title: string
    category: Category
    details: string
}

const RecordCardInList = ({ id, title, category, details }: RecordCardT) => {
    const { deleteRecordMutation } = useRecord()
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const handleDeleteRecord = () => {
        deleteRecordMutation.mutate(id)
    }

    return (
        isUpdated ? (
            <UpdateRecord
                id={id}
                title={title}
                category={category}
                details={details}
                setIsUpdated={setIsUpdated}
            />
        ) : (
            <div className="flex flex-col gap-3">
                <Label className="text-xl">
                    Title: {title}
                </Label>
                <Label className="text-md">
                    Category: {category}
                </Label>
                <div>
                    <Label className="text-md">
                        Details:
                    </Label>
                    <div className="mt-2">
                        {details}
                    </div>
                </div>
                <div className="flex justify-end gap-5">
                    <Button variant="blue" onClick={() => setIsUpdated(true)}>Update</Button>
                    <Button onClick={handleDeleteRecord}>Delete</Button>
                </div>
            </div>
        )
    )
}

export default RecordCardInList