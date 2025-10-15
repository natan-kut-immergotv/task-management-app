'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  defaultStatus?: 'todo' | 'in-progress' | 'done'
}

export default function AddTaskModal({ isOpen, onClose, defaultStatus = 'todo' }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '1',
    dueDate: new Date().toISOString().split('T')[0],
    tags: '',
  })

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  })

  const { users, addTask } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      title: formData.title.trim() === '',
      description: formData.description.trim() === '',
    }

    setErrors(newErrors)

    if (!newErrors.title && !newErrors.description) {
      addTask({
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        assignee: formData.assignee,
        dueDate: formData.dueDate,
        comments: [],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        status: defaultStatus,
        priority: 'medium',
        assignee: '1',
        dueDate: new Date().toISOString().split('T')[0],
        tags: '',
      })
      
      onClose()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (name === 'title' || name === 'description') {
      setErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-neutral-800"
          >
            {/* Header */}
            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Add New Task
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-h-[calc(90vh-120px)] overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:bg-neutral-700 dark:text-white ${
                      errors.title ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
                    }`}
                    placeholder="Enter task title..."
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">Title is required</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:bg-neutral-700 dark:text-white ${
                      errors.description ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
                    }`}
                    placeholder="Enter task description..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">Description is required</p>
                  )}
                </div>

                {/* Status and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priority" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Assignee and Due Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="assignee" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                      Assignee
                    </label>
                    <select
                      id="assignee"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dueDate" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-white">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter tags separated by commas..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
