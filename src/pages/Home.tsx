import RecordCardInList from "@/components/Record/RecordCardInList"
import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import { useMainSt } from "@/stores/main"
import CreateNewRecord from "@/components/Record/CreateNewRecord"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import RecordCard from "@/components/Record/RecordCard"

function Home() {
  const { records } = useMainSt()
  const { logoutMutation } = useAuth()

  const handleLogout = () => {
    logoutMutation.mutate()
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
              <DialogTrigger className="text-start">
                <RecordCardInList
                  key={id}
                  title={title}
                  category={category}
                  details={details}
                />
              </DialogTrigger>
              <DialogContent className="w-[550px]">
                <RecordCard
                  id={id}
                  title={title}
                  category={category}
                  details={details}
                />
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <h2 className="text-xl font-semibold">
            Your List of Records is empty.
          </h2>
        )}
      </main>
    </>
  )
}

export default Home

