'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, MessageCircle, Tag, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Task } from '../types/task'
import { useTaskStore } from '../store/useTaskStore'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { users, deleteTask } = useTaskStore()
  
  const assignee = users.find(user => user.id === task.assignee)
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'

  const handleDelete = () => {
    deleteTask(task.id)
    setShowMenu(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        isOverdue ? 'border-red-300' : 'border-neutral-200'
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-neutral-900">
            {task.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            {task.description}
          </p>
        </div>
        
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="ml-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-100"
        >
          <MoreVertical className="h-4 w-4 text-neutral-500" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-2 top-10 z-10 rounded-lg border bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              onEdit?.(task)
              setShowMenu(false)
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Priority */}
      <div className="mb-3">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}
        >
          {priorityLabels[task.priority]} Priority
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          {/* Assignee */}
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{assignee?.name || 'Unassigned'}</span>
          </div>
          
          {/* Due Date */}
          <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-500' : ''}`}>
            <Calendar className="h-3 w-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Comments Count */}
        {task.comments.length > 0 && (
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{task.comments.length}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
