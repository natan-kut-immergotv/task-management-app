'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Plus, Bell, User, Settings, LogOut } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'

interface HeaderProps {
  onAddTask: () => void
}

export default function Header({ onAddTask }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { darkMode, toggleDarkMode, currentUser } = useTaskStore()

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
            <span className="text-sm font-bold text-white">T</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            TaskFlow
          </h1>
        </motion.div>

        {/* Center Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTask}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </motion.button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:block">
                {currentUser?.name}
              </span>
            </motion.button>

            {/* User Dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 z-50 w-48 rounded-lg border bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="border-b border-neutral-200 px-3 py-2 dark:border-neutral-700">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {currentUser?.email}
                  </p>
                </div>
                
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                
                <hr className="my-1 border-neutral-200 dark:border-neutral-700" />
                
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:text-red-400 dark:hover:bg-neutral-700">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
