'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { motion } from 'framer-motion'
import { Plus, Circle } from 'lucide-react'
import { Task } from '../types/task'
import SortableTaskCard from './SortableTaskCard'

interface TaskColumnProps {
  status: Task['status']
  title: string
  tasks: Task[]
  onAddTask?: () => void
  onEditTask?: (task: Task) => void
}

const statusColors = {
  todo: 'bg-blue-50 border-blue-200',
  'in-progress': 'bg-yellow-50 border-yellow-200',
  done: 'bg-green-50 border-green-200',
}

const statusIcons = {
  todo: Circle,
  'in-progress': Circle,
  done: Circle,
}

export default function TaskColumn({ status, title, tasks, onAddTask, onEditTask }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      {/* Column Header */}
      <div className={`mb-4 rounded-lg border p-4 ${statusColors[status]}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(() => {
              const Icon = statusIcons[status]
              return <Icon className="h-5 w-5 text-neutral-600" />
            })()}
            <h2 className="font-semibold text-neutral-900">{title}</h2>
            <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-600">
              {tasks.length}
            </span>
          </div>
          
          {onAddTask && (
            <button
              onClick={onAddTask}
              className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-white/50 hover:text-neutral-700"
              title="Add new task"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tasks Container - ref on outer div */}
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-lg p-3 transition-colors ${
          isOver ? 'bg-neutral-100' : 'bg-neutral-50'
        }`}
      >
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 min-h-32">
            {tasks.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300">
                <p className="text-sm text-neutral-500">
                  No tasks yet
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </motion.div>
  )
}
