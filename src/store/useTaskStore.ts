import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, User } from '../types/task'

interface TaskState {
  tasks: Task[]
  users: User[]
  currentUser: User | null
  darkMode: boolean
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: Task['status']) => void
  addComment: (taskId: string, comment: Omit<Task['comments'][0], 'id' | 'createdAt'>) => void
  setCurrentUser: (user: User) => void
  toggleDarkMode: () => void
}

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Natan Kutnowski',
    email: 'nkutnowski87@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    role: 'member'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    role: 'member'
  }
]

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create a modern and responsive landing page for the new product launch',
    status: 'todo',
    priority: 'high',
    assignee: '1',
    dueDate: '2024-02-15',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    comments: [],
    tags: ['design', 'frontend']
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality with JWT tokens',
    status: 'in-progress',
    priority: 'medium',
    assignee: '2',
    dueDate: '2024-02-20',
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    comments: [
      {
        id: '1',
        text: 'Started working on the login component',
        author: 'Sarah Johnson',
        createdAt: '2024-01-16T14:20:00Z'
      }
    ],
    tags: ['backend', 'security']
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Create comprehensive API documentation with examples',
    status: 'done',
    priority: 'low',
    assignee: '3',
    dueDate: '2024-01-30',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-28T16:45:00Z',
    comments: [
      {
        id: '2',
        text: 'Completed all endpoints documentation',
        author: 'Mike Chen',
        createdAt: '2024-01-28T16:45:00Z'
      }
    ],
    tags: ['documentation', 'api']
  },
  {
    id: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline',
    status: 'todo',
    priority: 'high',
    assignee: '1',
    dueDate: '2024-02-25',
    createdAt: '2024-01-18T11:15:00Z',
    updatedAt: '2024-01-18T11:15:00Z',
    comments: [],
    tags: ['devops', 'automation']
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Review and optimize slow database queries for better performance',
    status: 'in-progress',
    priority: 'medium',
    assignee: '2',
    dueDate: '2024-02-18',
    createdAt: '2024-01-20T13:45:00Z',
    updatedAt: '2024-01-22T09:30:00Z',
    comments: [
      {
        id: '3',
        text: 'Identified 3 slow queries that need optimization',
        author: 'Sarah Johnson',
        createdAt: '2024-01-22T09:30:00Z'
      }
    ],
    tags: ['database', 'performance']
  }
]

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: defaultTasks,
      users: defaultUsers,
      currentUser: defaultUsers[0],
      darkMode: false,
      
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          tasks: [...state.tasks, newTask]
        }))
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          )
        }))
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }))
      },
      
      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
              : task
          )
        }))
      },
      
      addComment: (taskId, commentData) => {
        const newComment = {
          ...commentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, comments: [...task.comments, newComment], updatedAt: new Date().toISOString() }
              : task
          )
        }))
      },
      
      setCurrentUser: (user) => {
        set({ currentUser: user })
      },
      
      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }))
      },
    }),
    {
      name: 'task-management-storage',
    }
  )
)
