export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  futureWork?: {
    title: string
    description: string
    skills: string[]
  }
}

export interface Message {
  id: number
  content: string
  timestamp: string
}

