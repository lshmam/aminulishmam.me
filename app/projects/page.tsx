import Sidebar from "@/components/Sidebar"
import AllProjectsGrid from "@/components/AllProjectsGrid"

export default function AllProjectsPage() {
  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">All Projects</h1>
        <AllProjectsGrid />
      </main>
    </>
  )
}

