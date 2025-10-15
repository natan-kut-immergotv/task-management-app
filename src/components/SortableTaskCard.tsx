'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import TaskCard from './TaskCard'
import { Task } from '../types/task'

interface SortableTaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

export default function SortableTaskCard({ task, onEdit }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <TaskCard task={task} onEdit={onEdit} />
    </div>
  )
}
