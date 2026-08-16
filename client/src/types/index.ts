export type Role = 'student' | 'faculty' | 'admin' | 'placement' | 'librarian';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  enrolledYear?: number;
  program?: string;
  rollNumber?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  twoFactorRequired: boolean;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  code: string;
  description: string;
  students: number;
  faculty: number;
  courses: number;
  placementRate: number;
  icon: string;
  color: string;
  hod: string;
  established: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  level: 'UG' | 'PG' | 'PhD';
  departmentId: string;
  duration: string;
  seats: number;
  feePerYear: number;
  eligibility: string;
  specializations: string[];
  overview: string;
  careerPaths: string[];
  icon: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  email: string;
  phone: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  publications: number;
  photo?: string;
  rating: number;
}

export interface StudentRecord {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  departmentId: string;
  program: string;
  semester: number;
  batch: string;
  phone: string;
  cgpa: number;
  attendance: number;
  status: 'active' | 'inactive' | 'graduated';
  hosteller: boolean;
  photo?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  semester: number;
  credits: number;
  facultyId: string;
  hoursPerWeek: number;
  category: 'core' | 'elective' | 'lab' | 'project';
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  start: string;
  end: string;
  subjectId: string;
  room: string;
  batch?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submittedAt?: string;
  obtainedMarks?: number;
  attachments?: string[];
}

export interface Exam {
  id: string;
  name: string;
  subjectId: string;
  date: string;
  time: string;
  room: string;
  mode: 'theory' | 'lab' | 'viva';
  totalMarks: number;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grade: string;
  result: 'PASS' | 'FAIL';
  credits: number;
  gpa?: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  description: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'unpaid';
  date?: string;
  method?: string;
}

export interface LibraryBook {
  id: string;
  accessionNo: string;
  title: string;
  author: string;
  category: string;
  rack: string;
  copies: number;
  available: number;
  issuedTo?: string;
  dueDate?: string;
}

export interface IssueRecord {
  id: string;
  studentId: string;
  bookId: string;
  issueDate: string;
  dueDate: string;
  returned?: boolean;
  returnDate?: string;
  fine?: number;
}

export interface HostelRoom {
  id: string;
  hostel: string;
  block: string;
  roomNo: string;
  type: 'single' | 'double' | 'triple';
  capacity: number;
  occupied: number;
  feesPerSem: number;
  warden: string;
}

export interface Scholarship {
  id: string;
  studentId: string;
  name: string;
  provider: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  appliedDate: string;
  type: 'merit' | 'need' | 'reserved';
}

export interface CertificateRecord {
  id: string;
  studentId: string;
  name: string;
  issueDate: string;
  type: 'academic' | 'conduct' | 'bonafide' | 'provisional' | 'achievement';
  status: 'issued' | 'pending' | 'ready';
}

export interface PlacementRecord {
  id: string;
  studentId: string;
  company: string;
  role: string;
  package: number;
  offerDate: string;
  status: 'placed' | 'interviewing' | 'offered' | 'not-placed';
  location: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'academic' | 'cultural' | 'sports' | 'technical' | 'seminar' | 'workshop';
  organizer: string;
  registered?: number;
  capacity: number;
  image?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image?: string;
  views: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  roles: string[];
  avgPackage: number;
  hiringYear: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  url?: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  category: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
  resolution?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  approver?: string;
}

export interface ForumThread {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  category: string;
  createdAt: string;
  replies: ForumReply[];
  upvotes: number;
  tags: string[];
}

export interface ForumReply {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
  upvotes: number;
}

export interface FeedbackItem {
  id: string;
  targetId: string;
  targetName: string;
  category: 'faculty' | 'course' | 'facility' | 'event';
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  text: string;
  createdAt: string;
  readBy: string[];
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'direct' | 'group';
  members: string[];
  lastMessage?: string;
  lastActivity?: string;
}

export interface AttendanceSummary {
  subjectId: string;
  subjectName: string;
  total: number;
  present: number;
  percentage: number;
}

export interface AnalyticsPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}
