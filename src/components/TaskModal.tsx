'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Tag, MessageCircle } from 'lucide-react'
import { Task } from '../types/task'
import { useTaskStore } from '../store/useTaskStore'

interface TaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const [newComment, setNewComment] = useState('')
  const { users, addComment } = useTaskStore()

  const assignee = users.find(user => user.id === task?.assignee)

  const handleAddComment = () => {
    if (!task || !newComment.trim()) return
    
    addComment(task.id, {
      text: newComment,
      author: 'Current User', // In a real app, this would be the logged-in user
    })
    
    setNewComment('')
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  const statusColors = {
    todo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }

  if (!task) return null

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
            className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-neutral-800"
          >
            {/* Header */}
            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    {task.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()} Priority
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-6 py-4">
              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-2 font-medium text-neutral-900 dark:text-white">
                  Description
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {task.description}
                </p>
              </div>

              {/* Task Details */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Assignee
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {assignee?.name || 'Unassigned'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      Due Date
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {task.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 font-medium text-neutral-900 dark:text-white">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div>
                <h3 className="mb-3 font-medium text-neutral-900 dark:text-white">
                  Comments ({task.comments.length})
                </h3>

                {/* Add Comment */}
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full rounded-lg border border-neutral-300 bg-white p-3 text-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    rows={3}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Comment
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {task.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-700"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          {comment.author}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
