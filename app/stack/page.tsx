import Sidebar from "@/components/Sidebar"
import StackGrid from "@/components/StackGrid"

export default function StackPage() {
  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">My Tech Stack</h1>
        <p className="text-xl text-gray-300 mb-8">
          Here's an overview of the technologies and tools I specialize in, categorized by design and engineering.
        </p>
        <StackGrid />
      </main>
    </>
  )
}

