import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, GraduationCap, Home, LayoutDashboard, Search } from 'lucide-react';
import { PublicPage } from './PublicPage';

export default function NotFoundPage() {
  return (
    <PublicPage title="Page Not Found" description="The page you are looking for does not exist.">
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 16 }}
            className="relative mx-auto flex h-40 w-40 items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 opacity-10 blur-2xl" />
            <div className="relative font-display text-8xl font-bold tracking-tight">
              <span className="gradient-text">404</span>
            </div>
          </motion.div>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">This page wandered off campus</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-dark-500 dark:text-dark-400 sm:text-base">
            The link may be broken or the page may have been moved. Let's get you back to somewhere useful.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Back to Home</Link>
            <Link to="/courses" className="btn-outline"><GraduationCap className="h-4 w-4" /> Browse Courses</Link>
            <Link to="/admissions" className="btn-ghost"><Compass className="h-4 w-4" /> Admissions</Link>
            <Link to="/login" className="btn-ghost"><LayoutDashboard className="h-4 w-4" /> Portal Login</Link>
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-dark-400">
            <Search className="h-3.5 w-3.5" /> Can't find something? <Link to="/contact" className="font-semibold text-primary-600 hover:underline">Contact support</Link>
          </p>
        </div>
      </section>
    </PublicPage>
  );
}
