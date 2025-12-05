import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Settings, Bell, User, Calendar, FileText, FolderOpen } from "lucide-react";

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your learning and activities.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass p-4 h-fit"
        >
          <h2 className="text-lg font-medium mb-3">Quick Nav</h2>
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start gap-2 hover:scale-105 active:scale-95 transition-all" asChild>
              <Link to="/profile"><User className="w-4 h-4" /> Profile</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 hover:scale-105 active:scale-95 transition-all" asChild>
              <Link to="#"><BookOpen className="w-4 h-4" /> My Courses</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 hover:scale-105 active:scale-95 transition-all" asChild>
              <Link to="#"><Calendar className="w-4 h-4" /> Schedule</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 hover:scale-105 active:scale-95 transition-all" asChild>
              <Link to="#"><Bell className="w-4 h-4" /> Notifications</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 hover:scale-105 active:scale-95 transition-all" asChild>
              <Link to="#"><Settings className="w-4 h-4" /> Settings</Link>
            </Button>
          </nav>
        </motion.aside>

        {/* Main content */}
        <div className="space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Active Courses", value: "3", icon: <FolderOpen className="w-5 h-5" /> },
              { title: "Weekly Progress", value: "72%", icon: <TrendingUp className="w-5 h-5" /> },
              { title: "Assignments Due", value: "2", icon: <FileText className="w-5 h-5" /> },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (idx + 1) }}
                whileHover={{ scale: 1.03, filter: "brightness(1.05)" }}
                whileTap={{ scale: 0.97 }}
                className="glass p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{card.title}</span>
                  {card.icon}
                </div>
                <div className="text-3xl font-medium">{card.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="glass p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
              <span className="text-xs text-muted-foreground">Dummy actions</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 hover:scale-105 active:scale-95 transition-all">
                <BookOpen className="w-4 h-4" />
                Continue Learning
              </Button>
              <Button variant="outline" className="gap-2 hover:scale-105 active:scale-95 transition-all">
                <Calendar className="w-4 h-4" />
                Plan Study Time
              </Button>
              <Button variant="outline" className="gap-2 hover:scale-105 active:scale-95 transition-all">
                <FileText className="w-4 h-4" />
                View Assignments
              </Button>
              <Button variant="ghost" className="gap-2 hover:scale-105 active:scale-95 transition-all">
                <Settings className="w-4 h-4" />
                Preferences
              </Button>
            </div>
          </motion.section>

          {/* Recent activity */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="glass p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <ul className="space-y-3">
              {[
                { label: "Completed lesson: Intro to JavaScript", time: "2h ago" },
                { label: "New assignment posted: CSS Flexbox", time: "Yesterday" },
                { label: "Joined course: React Fundamentals", time: "2 days ago" },
              ].map((item, idx) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * (idx + 1) }}
                  className="flex items-center justify-between rounded-xl p-3 hover:brightness-110 transition-shadow"
                >
                  <span className="text-foreground/80">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
