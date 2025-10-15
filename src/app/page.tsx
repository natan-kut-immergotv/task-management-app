'use client'

import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { useTaskStore } from '../store/useTaskStore'
import Header from '../components/Header'
import TaskColumn from '../components/TaskColumn'
import TaskModal from '../components/TaskModal'
import AddTaskModal from '../components/AddTaskModal'
import { Task } from '../types/task'

export default function HomePage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [addTaskStatus, setAddTaskStatus] = useState<Task['status']>('todo')
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  
  const { tasks, darkMode, toggleDarkMode } = useTaskStore()

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Debug - log dark mode state
  useEffect(() => {
    console.log('Dark mode:', darkMode)
  }, [darkMode])

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done'),
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    setDraggedTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    // Only update if dropped over a valid column
    if (active && over) {
      const taskId = active.id as string
      const newStatus = over.id as Task['status']
      
      // Verify the new status is valid
      if (newStatus === 'todo' || newStatus === 'in-progress' || newStatus === 'done') {
        // Update task status
        useTaskStore.getState().moveTask(taskId, newStatus)
      }
    }
    
    // Always clear the dragged task (whether dropped successfully or not)
    setDraggedTask(null)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskModalOpen(true)
  }

  const handleAddTask = (status: Task['status'] = 'todo') => {
    setAddTaskStatus(status)
    setIsAddTaskModalOpen(true)
  }

  const columns = [
    {
      status: 'todo' as const,
      title: 'To Do',
      tasks: tasksByStatus.todo,
    },
    {
      status: 'in-progress' as const,
      title: 'In Progress',
      tasks: tasksByStatus['in-progress'],
    },
    {
      status: 'done' as const,
      title: 'Done',
      tasks: tasksByStatus.done,
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header onAddTask={() => handleAddTask()} />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {columns.map((column) => (
            <div
              key={column.status}
              className="rounded-lg border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {column.title}
                  </p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {column.tasks.length}
                  </p>
                </div>
                <div className="rounded-full bg-neutral-100 p-2 dark:bg-neutral-700">
                  <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Kanban Board */}
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.status}
                status={column.status}
                title={column.title}
                tasks={column.tasks}
                onAddTask={() => handleAddTask(column.status)}
                onEditTask={handleTaskClick}
              />
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {draggedTask ? (
              <div className="rounded-lg border bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                <h3 className="font-medium text-neutral-900 dark:text-white">
                  {draggedTask.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {draggedTask.description}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Modals */}
      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setSelectedTask(null)
        }}
      />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        defaultStatus={addTaskStatus}
      />
    </div>
  )
}