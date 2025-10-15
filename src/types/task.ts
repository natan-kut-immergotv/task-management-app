export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
  tags: string[]
}

export interface Comment {
  id: string
  text: string
  author: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'member'
}

export interface Project {
  id: string
  name: string
  description: string
  tasks: Task[]
  members: User[]
  createdAt: string
}
