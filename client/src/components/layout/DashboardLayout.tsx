import { useEffect, useState, type ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';
import { CommandPalette } from '../widgets/CommandPalette';
import { ChatWidget } from '../widgets/ChatWidget';
import { setNotifications } from '../../store/slices/notificationSlice';
import { useAppDispatch } from '../../store';
import { notifications } from '../../data/mock';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNotifications(notifications));
    window.scrollTo(0, 0);
  }, [dispatch, location.pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="hidden px-6 py-4 text-center text-xs text-dark-400 dark:text-dark-500 lg:block">
          © {new Date().getFullYear()} Centurion University of Technology and Management — ERP Portal
        </footer>
      </div>
      <BottomNav />
      <CommandPalette />
      <ChatWidget />
    </div>
  );
}

export function PublicLayout({ children }: { children?: ReactNode }) {
  return <div className="min-h-screen">{children ?? <Outlet />}</div>;
}
