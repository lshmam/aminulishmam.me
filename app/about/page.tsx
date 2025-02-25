import Sidebar from "@/components/Sidebar"

export default function AboutPage() {
  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Who I Am</h2>
          <p className="text-gray-300">
            I&apos;m Aminul Ishmam, a Design Engineer with a passion for creating beautiful, functional, and
            user-centric digital experiences. With a unique blend of design aesthetics and technical expertise, I bridge
            the gap between creative vision and practical implementation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">My Journey</h2>
          <p className="text-gray-300">
            My journey in the world of design and engineering began with a curiosity about how things work and look.
            Over the years, I&apos;ve honed my skills in various design tools and programming languages, always striving
            to stay at the forefront of technological advancements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What I Do</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>User Interface (UI) Design</li>
            <li>User Experience (UX) Design</li>
            <li>Front-end Development</li>
            <li>Prototyping and Wireframing</li>
            <li>Design Systems Creation</li>
            <li>Responsive Web Design</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">My Approach</h2>
          <p className="text-gray-300">
            I believe in a user-centered approach to design and development. Every project I undertake begins with
            understanding the user&apos;s needs and the client&apos;s goals. I combine creativity with data-driven
            insights to create solutions that are not only visually appealing but also highly functional and intuitive.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
          <p className="text-gray-300">
            I&apos;m always excited to take on new challenges and collaborate on innovative projects. Whether you have a
            specific project in mind or just want to chat about the latest in design and technology, I&apos;d love to
            hear from you. Feel free to explore my portfolio and reach out through the contact information provided.
          </p>
        </section>
      </main>
    </>
  )
}

