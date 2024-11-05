import { useState } from "react"
import { useMainSt } from "@/stores/main"
import useAuth from "@/hooks/useAuth"
import useRecord from "@/hooks/useRecord"
import RecordCard from "@/components/Record/RecordCard"
import { Button } from "@/components/ui/button"
import CreateNewRecord from "@/components/Record/CreateNewRecord"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChoosenRecordCard from "@/components/Record/ChoosenRecordCard"

const Home = () => {
  const { records, setChoosenRecord } = useMainSt()

  const { logoutMutation } = useAuth()
  const { getRecordutation } = useRecord()

  const [loadingRecordId, setLoadingRecordId] = useState<string | null>(null)

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleGetRecord = (recordId: string) => {
    setLoadingRecordId(recordId)
    getRecordutation.mutate(recordId, {
      onSuccess: (data) => {
        setChoosenRecord(data)
        setLoadingRecordId(null)
      },
      onError: () => {
        setLoadingRecordId(null);
      },
    })
  }

  return (
    <>
      <header className="flex pt-5 gap-6">
        <h1 className='text-2xl font-bold'>
          Thank you for speaking up
        </h1>
        <CreateNewRecord />
        <Button onClick={handleLogout}>Log Out</Button>
      </header>
      <main className="flex flex-col gap-7 w-[550px]">
        {records.length > 0 ? (
          records.map(({ id, category, details, title }) => (
            <Dialog>
              <DialogTrigger
                className="text-start"
                onClick={() => handleGetRecord(id)}
              >
                <RecordCard
                  key={id}
                  title={title}
                  category={category}
                  details={details}
                />
              </DialogTrigger>
              <DialogContent className="w-[550px]">
                {loadingRecordId === id ? (
                  <div>Loading...</div>
                ) : (
                  <ChoosenRecordCard />
                )}
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <h2 className="text-xl text-center font-semibold">
            Your List of Records is empty.
          </h2>
        )}
      </main>
    </>
  )
}

export default Home

