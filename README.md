# TaskFlow - Collaborative Task Manager

A modern, responsive task management application built with Next.js 14, TypeScript, and Tailwind CSS. Features drag & drop functionality, real-time collaboration, and a beautiful UI.

## ✨ Features

- **🎯 Task Management**: Create, edit, delete, and organize tasks
- **🔄 Drag & Drop**: Intuitive Kanban board with drag & drop functionality
- **👥 Collaboration**: Multi-user support with assignee management
- **💬 Comments**: Add comments and track task discussions
- **🏷️ Tags & Priority**: Organize tasks with tags and priority levels
- **📅 Due Dates**: Track deadlines and overdue tasks
- **🌙 Dark Mode**: Beautiful light and dark themes
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast**: Built with Next.js 14 and optimized for performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: LocalStorage (with Zustand persist)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build directories

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── AddTaskModal.tsx   # Modal for creating new tasks
│   ├── Header.tsx         # Application header
│   ├── SortableTaskCard.tsx # Draggable task card
│   ├── TaskCard.tsx       # Individual task display
│   ├── TaskColumn.tsx     # Kanban column component
│   └── TaskModal.tsx      # Modal for viewing/editing tasks
├── store/                 # State management
│   └── useTaskStore.ts    # Zustand store configuration
└── types/                 # TypeScript type definitions
    └── task.ts            # Task-related interfaces
```

## 🎨 Features Overview

### Task Management
- Create tasks with title, description, priority, and due date
- Assign tasks to team members
- Add tags for better organization
- Track task status (To Do, In Progress, Done)

### Drag & Drop
- Smooth drag and drop between columns
- Visual feedback during dragging
- Maintains task order within columns

### Collaboration
- Multi-user support with avatars
- Comment system for task discussions
- User roles (Admin, Member)

### UI/UX
- Modern, clean design
- Smooth animations with Framer Motion
- Responsive layout for all screen sizes
- Dark mode support
- Intuitive user interface

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app uses localStorage for data persistence.

### Customization
- **Colors**: Modify Tailwind CSS classes in components
- **Data**: Update default tasks and users in `useTaskStore.ts`
- **Layout**: Adjust grid layouts in `TaskColumn.tsx` and `page.tsx`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full Kanban board layout
- **Tablet**: Adjusted column widths
- **Mobile**: Stacked columns with touch-friendly interactions

## 🌙 Dark Mode

Dark mode is automatically applied and can be toggled via the header. The theme preference is saved in localStorage.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Natan Kutnowski**
- GitHub: [@natan-kut-immergotv](https://github.com/natan-kut-immergotv)
- LinkedIn: [natan-kutnowski](https://www.linkedin.com/in/natan-kutnowski/)
- Email: nkutnowski87@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [@dnd-kit](https://dndkit.com/) for drag and drop functionality
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for beautiful icons