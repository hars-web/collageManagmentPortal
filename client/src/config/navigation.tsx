import type { Role } from '../types';
import {
  BadgeCheck,
  BarChart3,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileDown,
  FileText,
  GraduationCap,
  Hotel,
  LayoutDashboard,
  Library,
  LineChart,
  Megaphone,
  MessageSquare,
  NotepadText,
  Palette,
  Shield,
  Ticket,
  UploadCloud,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const studentNav: NavSection[] = [
  { items: [{ label: 'Dashboard', to: '/student', icon: LayoutDashboard, end: true }] },
  {
    title: 'Academic',
    items: [
      { label: 'My Profile', to: '/student/profile', icon: UserRound },
      { label: 'Attendance', to: '/student/attendance', icon: ClipboardCheck },
      { label: 'Subjects', to: '/student/subjects', icon: BookOpen },
      { label: 'Timetable', to: '/student/timetable', icon: CalendarDays },
      { label: 'Assignments', to: '/student/assignments', icon: NotepadText },
      { label: 'Exams', to: '/student/exams', icon: ClipboardList },
      { label: 'Results', to: '/student/results', icon: BarChart3 },
      { label: 'Certificates', to: '/student/certificates', icon: BadgeCheck },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Fees', to: '/student/fees', icon: CreditCard },
      { label: 'Library', to: '/student/library', icon: Library },
      { label: 'Hostel', to: '/student/hostel', icon: Hotel },
      { label: 'Scholarships', to: '/student/scholarships', icon: Wallet },
      { label: 'Placements', to: '/student/placements', icon: Briefcase },
    ],
  },
  {
    title: 'Engage',
    items: [
      { label: 'Events', to: '/student/events', icon: Calendar },
      { label: 'Leave Application', to: '/student/leaves', icon: FileText },
      { label: 'Complaints', to: '/student/complaints', icon: Ticket },
      { label: 'Documents', to: '/student/documents', icon: FileDown },
      { label: 'Notifications', to: '/student/notifications', icon: Megaphone },
      { label: 'Forum', to: '/student/forum', icon: MessageSquare },
    ],
  },
];

export const facultyNav: NavSection[] = [
  { items: [{ label: 'Dashboard', to: '/faculty', icon: LayoutDashboard, end: true }] },
  {
    title: 'Teaching',
    items: [
      { label: 'My Profile', to: '/faculty/profile', icon: UserRound },
      { label: 'Class Schedule', to: '/faculty/schedule', icon: CalendarDays },
      { label: 'My Students', to: '/faculty/students', icon: Users },
      { label: 'Attendance', to: '/faculty/attendance', icon: ClipboardCheck },
      { label: 'Upload Notes', to: '/faculty/notes', icon: UploadCloud },
      { label: 'Assignments', to: '/faculty/assignments', icon: NotepadText },
      { label: 'Grading', to: '/faculty/grading', icon: ClipboardList },
      { label: 'Performance', to: '/faculty/performance', icon: LineChart },
    ],
  },
  {
    title: 'Personal',
    items: [
      { label: 'Leave Request', to: '/faculty/leaves', icon: FileText },
      { label: 'Notifications', to: '/faculty/notifications', icon: Megaphone },
    ],
  },
];

export const adminNav: NavSection[] = [
  { items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true }] },
  {
    title: 'Management',
    items: [
      { label: 'Students', to: '/admin/students', icon: GraduationCap },
      { label: 'Faculty', to: '/admin/faculty', icon: Users },
      { label: 'Departments', to: '/admin/departments', icon: Building2 },
      { label: 'Courses', to: '/admin/courses', icon: BookOpen },
      { label: 'Subjects', to: '/admin/subjects', icon: BookMarked },
      { label: 'Timetable', to: '/admin/timetable', icon: CalendarDays },
      { label: 'Attendance', to: '/admin/attendance', icon: ClipboardCheck },
      { label: 'Results', to: '/admin/results', icon: BarChart3 },
    ],
  },
  {
    title: 'Finance & Services',
    items: [
      { label: 'Fees', to: '/admin/fees', icon: CreditCard },
      { label: 'Hostel', to: '/admin/hostel', icon: Hotel },
      { label: 'Library', to: '/admin/library', icon: Library },
      { label: 'Placements', to: '/admin/placements', icon: Briefcase },
      { label: 'Scholarships', to: '/admin/scholarships', icon: Wallet },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Events', to: '/admin/events', icon: Calendar },
      { label: 'Complaints', to: '/admin/complaints', icon: Ticket },
      { label: 'Notice Board', to: '/admin/notices', icon: Megaphone },
      { label: 'Analytics', to: '/admin/analytics', icon: LineChart },
      { label: 'Roles & Permissions', to: '/admin/roles', icon: Shield },
      { label: 'Website Settings', to: '/admin/settings', icon: Palette },
    ],
  },
];

export const placementNav: NavSection[] = [
  { items: [{ label: 'Dashboard', to: '/placement', icon: LayoutDashboard, end: true }] },
  {
    title: 'Placements',
    items: [
      { label: 'Placement Tracker', to: '/placement/tracker', icon: ClipboardCheck },
      { label: 'Recruiters', to: '/placement/recruiters', icon: Building2 },
      { label: 'Internships', to: '/placement/internships', icon: Briefcase },
      { label: 'Drives', to: '/placement/drives', icon: Calendar },
      { label: 'Reports', to: '/placement/reports', icon: BarChart3 },
    ],
  },
];

export const librarianNav: NavSection[] = [
  { items: [{ label: 'Dashboard', to: '/library', icon: LayoutDashboard, end: true }] },
  {
    title: 'Library',
    items: [
      { label: 'Catalogue', to: '/library/catalogue', icon: Library },
      { label: 'Issues & Returns', to: '/library/issues', icon: ClipboardCheck },
      { label: 'Members', to: '/library/members', icon: Users },
      { label: 'Add Book', to: '/library/add', icon: BookOpen },
    ],
  },
];

export const navByRole: Record<Role, NavSection[]> = {
  student: studentNav,
  faculty: facultyNav,
  admin: adminNav,
  placement: placementNav,
  librarian: librarianNav,
};

export const roleLabels: Record<Role, string> = {
  student: 'Student',
  faculty: 'Faculty',
  admin: 'Administrator',
  placement: 'Placement Officer',
  librarian: 'Librarian',
};

export const roleHome: Record<Role, string> = {
  student: '/student',
  faculty: '/faculty',
  admin: '/admin',
  placement: '/placement',
  librarian: '/library',
};
