export default function ProjectDetails({ project }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-300">
          This is where you would provide a more detailed description of the project, including its goals, challenges,
          and solutions. You can expand on the brief description provided in the sidebar, giving visitors a
          comprehensive understanding of the project.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Feature 1: Description of the first key feature</li>
          <li>Feature 2: Description of the second key feature</li>
          <li>Feature 3: Description of the third key feature</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Development Process</h2>
        <p className="text-gray-300">
          Here you can describe the development process, including any interesting challenges you faced and how you
          overcame them. This is a great place to showcase your problem-solving skills and attention to detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
        <p className="text-gray-300">
          Discuss the outcomes of the project. Did it meet its goals? What was the impact on the client or users? If you
          have any metrics or testimonials, this would be a great place to include them.
        </p>
      </section>
    </div>
  )
}

