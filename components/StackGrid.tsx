import Image from "next/image"

// Update the mock data with Pexels images for tech icons
const techStack = {
  design: [
    {
      name: "Adobe Illustrator",
      icon: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Vector graphics editor for creating illustrations, logos, and more",
      proficiency: "Advanced",
    },
    {
      name: "Figma",
      icon: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Collaborative interface design tool for creating UI/UX designs",
      proficiency: "Expert",
    },
    {
      name: "Blender",
      icon: "https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "3D creation suite supporting modeling, rigging, animation, and more",
      proficiency: "Intermediate",
    },
  ],
  engineering: [
    {
      name: "React",
      icon: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "A JavaScript library for building user interfaces",
      proficiency: "Expert",
    },
    {
      name: "Next.js",
      icon: "https://images.pexels.com/photos/11035381/pexels-photo-11035381.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "The React Framework for Production",
      proficiency: "Advanced",
    },
    {
      name: "TypeScript",
      icon: "https://images.pexels.com/photos/11035382/pexels-photo-11035382.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Typed JavaScript at Any Scale",
      proficiency: "Advanced",
    },
    {
      name: "Tailwind CSS",
      icon: "https://images.pexels.com/photos/11035383/pexels-photo-11035383.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "A utility-first CSS framework",
      proficiency: "Expert",
    },
  ],
}

function TechCategory({ title, items }: { title: string; items: typeof techStack.design }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((tech) => (
          <div key={tech.name} className="bg-gray-800 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.proficiency}</p>
              </div>
            </div>
            <p className="text-gray-300">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StackGrid() {
  return (
    <div className="space-y-12">
      <TechCategory title="Design" items={techStack.design} />
      <TechCategory title="Engineering" items={techStack.engineering} />
    </div>
  )
}

