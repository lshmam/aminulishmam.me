import { Code, Palette, Database, Cog } from "lucide-react"

export default function StackSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Tech Categories</h2>
        <ul className="space-y-2">
          <li className="text-gray-300 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Design Tools
          </li>
          <li className="text-gray-300 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Frontend Technologies
          </li>
          <li className="text-gray-300 flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Backend Technologies
          </li>
          <li className="text-gray-300 flex items-center">
            <Cog className="w-4 h-4 mr-2" />
            Other Tools
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Tech Proficiency</h2>
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span className="text-gray-300">React</span>
            <span className="text-sm text-gray-400">Expert</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-300">Next.js</span>
            <span className="text-sm text-gray-400">Advanced</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-300">TypeScript</span>
            <span className="text-sm text-gray-400">Advanced</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Learning Next</h2>
        <ul className="space-y-2">
          <li className="text-gray-300">GraphQL</li>
          <li className="text-gray-300">Rust</li>
          <li className="text-gray-300">WebAssembly</li>
        </ul>
      </div>
    </div>
  )
}

