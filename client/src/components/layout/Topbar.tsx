import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCheck, ChevronDown, Command, LogOut, Menu, Search, Settings, UserRound } from 'lucide-react';
import { Avatar, statusTone, Badge } from '../ui';
import { ThemeToggle } from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { markAllRead, markRead } from '../../store/slices/notificationSlice';
import { setSearchOpen } from '../../store/slices/uiSlice';
import { notifications as defaultNotifications } from '../../data/mock';
import { roleHome } from '../../config/navigation';
import { timeAgo, cn } from '../../utils';
import { useClickOutside } from '../../hooks';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.notifications.items);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifItems = useMemo(() => (items.length ? items : defaultNotifications.slice(0, 6)), [items]);
  const unread = notifItems.filter((n) => !n.read).length;
  const profileRef = useClickOutside<HTMLDivElement>(() => setProfileOpen(false));
  const notifRef = useClickOutside<HTMLDivElement>(() => setNotifOpen(false));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-dark-100 bg-white/80 backdrop-blur-xl dark:border-dark-800 dark:bg-dark-900/80">
      <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} aria-label="Toggle sidebar" className="rounded-xl p-2 text-dark-500 hover:bg-dark-100 dark:text-dark-300 dark:hover:bg-dark-800 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={() => dispatch(setSearchOpen(true))}
            className="hidden items-center gap-2.5 rounded-xl border border-dark-200 bg-dark-50/60 px-3.5 py-2 text-sm text-dark-400 transition-all hover:border-primary-400 hover:text-dark-600 dark:border-dark-700 dark:bg-dark-800/60 dark:hover:border-primary-600 dark:hover:text-dark-300 sm:flex"
            aria-label="Open global search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search students, courses, files…</span>
            <kbd className="ml-4 hidden items-center gap-0.5 rounded-md border border-dark-200 px-1.5 py-0.5 text-[10px] font-semibold text-dark-400 dark:border-dark-600 lg:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((v) => !v)}
              aria-label={`Notifications, ${unread} unread`}
              className="relative rounded-xl p-2 text-dark-500 transition-colors hover:bg-dark-100 dark:text-dark-300 dark:hover:bg-dark-800"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-[340px] overflow-hidden rounded-2xl border border-dark-100 bg-white shadow-card dark:border-dark-800 dark:bg-dark-900 sm:w-96"
                  role="dialog"
                  aria-label="Notifications"
                >
                  <div className="flex items-center justify-between border-b border-dark-100 px-4 py-3 dark:border-dark-800">
                    <p className="text-sm font-semibold">Notifications</p>
                    <button onClick={() => dispatch(markAllRead())} className="flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                      <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                    </button>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto">
                    {notifItems.slice(0, 8).map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          dispatch(markRead(n.id));
                          setNotifOpen(false);
                          if (n.link) navigate(n.link);
                        }}
                        className={cn('flex w-full items-start gap-3 border-b border-dark-50 px-4 py-3 text-left transition-colors last:border-0 hover:bg-primary-50/50 dark:border-dark-800/60 dark:hover:bg-dark-800/60', !n.read && 'bg-primary-50/40 dark:bg-primary-900/10')}
                      >
                        <Badge tone={statusTone(n.type)} className="mt-0.5">{n.type === 'danger' ? '!' : '•'}</Badge>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-dark-800 dark:text-dark-100">{n.title}</span>
                          <span className="mt-0.5 line-clamp-2 block text-xs text-dark-500 dark:text-dark-400">{n.message}</span>
                          <span className="mt-1 block text-[10px] font-medium text-dark-400 dark:text-dark-500">{timeAgo(n.createdAt)}</span>
                        </span>
                        {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-600" aria-hidden />}
                      </button>
                    ))}
                  </div>
                  <Link to={roleHome[user?.role ?? 'student'] + '/notifications'} onClick={() => setNotifOpen(false)} className="block border-t border-dark-100 bg-dark-50/50 py-2.5 text-center text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-dark-800 dark:bg-dark-800/40 dark:text-primary-400">
                    View all notifications
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-dark-100 dark:hover:bg-dark-800"
              aria-label="Account menu"
              aria-expanded={profileOpen}
            >
              <Avatar name={user?.name ?? 'User'} size="sm" />
              <ChevronDown className="hidden h-3.5 w-3.5 text-dark-400 sm:block" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-dark-100 bg-white p-1.5 shadow-card dark:border-dark-800 dark:bg-dark-900"
                >
                  <div className="border-b border-dark-100 px-3 py-2.5 dark:border-dark-800">
                    <p className="truncate text-sm font-semibold">{user?.name}</p>
                    <p className="truncate text-xs text-dark-400 dark:text-dark-500">{user?.email}</p>
                  </div>
                  <button onClick={() => { setProfileOpen(false); navigate(roleHome[user?.role ?? 'student'] + '/profile'); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-dark-300 dark:hover:bg-dark-800">
                    <UserRound className="h-4 w-4" /> My Profile
                  </button>
                  <button onClick={() => { setProfileOpen(false); navigate('/student/settings'); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-dark-300 dark:hover:bg-dark-800">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-danger transition-colors hover:bg-danger/10">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
