import { useMainSt } from '@/stores/main'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import useRecord from '@/hooks/useRecord'
import { useState } from 'react'
import UpdateRecord from './UpdateRecord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const ChoosenRecordCard = () => {
    const { choosenRecord } = useMainSt()
    const { id, title, category, details, files } = choosenRecord!

    const { deleteRecordMutation, getFileMutation } = useRecord()
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const handleDeleteRecord = () => {
        deleteRecordMutation.mutate(id)
    }

    return (
        isUpdated ? (
            <UpdateRecord setIsUpdated={setIsUpdated} />
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
                <ul>
                    {files && (
                        files.map((file) => (
                            <li
                                key={file.id}
                                className="flex items-center gap-2"
                            >
                                {file.filename}
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    className='cursor-pointer'
                                    onClick={() => getFileMutation.mutate(file.id)}
                                />
                            </li>
                        ))
                    )}
                </ul>
                <div className="flex justify-end gap-5">
                    <Button variant="blue" onClick={() => setIsUpdated(true)}>Update</Button>
                    <Button onClick={handleDeleteRecord}>Delete</Button>
                </div>
            </div>
        )
    )
}

export default ChoosenRecordCard