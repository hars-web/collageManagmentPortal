import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store';
import { setTheme } from './store/slices/themeSlice';
import { ProtectedRoute, GuestRoute } from './routes/ProtectedRoute';
import { DashboardLayout, PublicLayout } from './components/layout/DashboardLayout';
import AuthLayout from './pages/auth/AuthLayout';

const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const CoursesPage = lazy(() => import('./pages/public/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/public/CourseDetailPage'));
const DepartmentsPage = lazy(() => import('./pages/public/DepartmentsPage'));
const DepartmentDetailPage = lazy(() => import('./pages/public/DepartmentDetailPage'));
const FacultyPage = lazy(() => import('./pages/public/FacultyPage'));
const AdmissionsPage = lazy(() => import('./pages/public/AdmissionsPage'));
const CampusLifePage = lazy(() => import('./pages/public/CampusLifePage'));
const EventsPage = lazy(() => import('./pages/public/EventsPage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const PlacementsPage = lazy(() => import('./pages/public/PlacementsPage'));
const AlumniPage = lazy(() => import('./pages/public/AlumniPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const FAQPage = lazy(() => import('./pages/public/FAQPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentProfile = lazy(() => import('./pages/student/StudentProfile'));
const StudentAttendance = lazy(() => import('./pages/student/StudentAttendance'));
const StudentSubjects = lazy(() => import('./pages/student/StudentSubjects'));
const StudentTimetable = lazy(() => import('./pages/student/StudentTimetable'));
const StudentAssignments = lazy(() => import('./pages/student/StudentAssignments'));
const StudentExams = lazy(() => import('./pages/student/StudentExams'));
const StudentResults = lazy(() => import('./pages/student/StudentResults'));
const StudentFees = lazy(() => import('./pages/student/StudentFees'));
const StudentLibrary = lazy(() => import('./pages/student/StudentLibrary'));
const StudentHostel = lazy(() => import('./pages/student/StudentHostel'));
const StudentScholarships = lazy(() => import('./pages/student/StudentScholarships'));
const StudentPlacements = lazy(() => import('./pages/student/StudentPlacements'));
const StudentEvents = lazy(() => import('./pages/student/StudentEvents'));
const StudentLeaves = lazy(() => import('./pages/student/StudentLeaves'));
const StudentComplaints = lazy(() => import('./pages/student/StudentComplaints'));
const StudentCertificates = lazy(() => import('./pages/student/StudentCertificates'));
const StudentDocuments = lazy(() => import('./pages/student/StudentDocuments'));
const StudentNotifications = lazy(() => import('./pages/student/StudentNotifications'));
const StudentForum = lazy(() => import('./pages/student/StudentForum'));

const FacultyDashboard = lazy(() => import('./pages/faculty/FacultyDashboard'));
const FacultyProfile = lazy(() => import('./pages/faculty/FacultyProfile'));
const FacultySchedule = lazy(() => import('./pages/faculty/FacultySchedule'));
const FacultyStudents = lazy(() => import('./pages/faculty/FacultyStudents'));
const FacultyAttendance = lazy(() => import('./pages/faculty/FacultyAttendance'));
const FacultyNotes = lazy(() => import('./pages/faculty/FacultyNotes'));
const FacultyAssignments = lazy(() => import('./pages/faculty/FacultyAssignments'));
const FacultyGrading = lazy(() => import('./pages/faculty/FacultyGrading'));
const FacultyPerformance = lazy(() => import('./pages/faculty/FacultyPerformance'));
const FacultyLeaves = lazy(() => import('./pages/faculty/FacultyLeaves'));
const FacultyNotifications = lazy(() => import('./pages/faculty/FacultyNotifications'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminFaculty = lazy(() => import('./pages/admin/AdminFaculty'));
const AdminDepartments = lazy(() => import('./pages/admin/AdminDepartments'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminSubjects = lazy(() => import('./pages/admin/AdminSubjects'));
const AdminTimetable = lazy(() => import('./pages/admin/AdminTimetable'));
const AdminAttendance = lazy(() => import('./pages/admin/AdminAttendance'));
const AdminResults = lazy(() => import('./pages/admin/AdminResults'));
const AdminFees = lazy(() => import('./pages/admin/AdminFees'));
const AdminHostel = lazy(() => import('./pages/admin/AdminHostel'));
const AdminLibrary = lazy(() => import('./pages/admin/AdminLibrary'));
const AdminPlacements = lazy(() => import('./pages/admin/AdminPlacements'));
const AdminScholarships = lazy(() => import('./pages/admin/AdminScholarships'));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents'));
const AdminComplaints = lazy(() => import('./pages/admin/AdminComplaints'));
const AdminNotices = lazy(() => import('./pages/admin/AdminNotices'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminRoles = lazy(() => import('./pages/admin/AdminRoles'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

const PlacementDashboard = lazy(() => import('./pages/placement/PlacementDashboard'));
const PlacementTracker = lazy(() => import('./pages/placement/PlacementTracker'));
const PlacementRecruiters = lazy(() => import('./pages/placement/PlacementRecruiters'));
const PlacementInternships = lazy(() => import('./pages/placement/PlacementInternships'));
const PlacementDrives = lazy(() => import('./pages/placement/PlacementDrives'));
const PlacementReports = lazy(() => import('./pages/placement/PlacementReports'));

const LibrarianDashboard = lazy(() => import('./pages/librarian/LibrarianDashboard'));
const LibrarianCatalogue = lazy(() => import('./pages/librarian/LibrarianCatalogue'));
const LibrarianIssues = lazy(() => import('./pages/librarian/LibrarianIssues'));
const LibrarianMembers = lazy(() => import('./pages/librarian/LibrarianMembers'));
const LibrarianAddBook = lazy(() => import('./pages/librarian/LibrarianAddBook'));

function ThemeBootstrap() {
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTheme(theme));
  }, [dispatch, theme]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:id" element={<DepartmentDetailPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/campus-life" element={<CampusLifePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['student']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/subjects" element={<StudentSubjects />} />
          <Route path="/student/timetable" element={<StudentTimetable />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/exams" element={<StudentExams />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/fees" element={<StudentFees />} />
          <Route path="/student/library" element={<StudentLibrary />} />
          <Route path="/student/hostel" element={<StudentHostel />} />
          <Route path="/student/scholarships" element={<StudentScholarships />} />
          <Route path="/student/placements" element={<StudentPlacements />} />
          <Route path="/student/events" element={<StudentEvents />} />
          <Route path="/student/leaves" element={<StudentLeaves />} />
          <Route path="/student/complaints" element={<StudentComplaints />} />
          <Route path="/student/certificates" element={<StudentCertificates />} />
          <Route path="/student/documents" element={<StudentDocuments />} />
          <Route path="/student/notifications" element={<StudentNotifications />} />
          <Route path="/student/forum" element={<StudentForum />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['faculty']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/profile" element={<FacultyProfile />} />
          <Route path="/faculty/schedule" element={<FacultySchedule />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/faculty/notes" element={<FacultyNotes />} />
          <Route path="/faculty/assignments" element={<FacultyAssignments />} />
          <Route path="/faculty/grading" element={<FacultyGrading />} />
          <Route path="/faculty/performance" element={<FacultyPerformance />} />
          <Route path="/faculty/leaves" element={<FacultyLeaves />} />
          <Route path="/faculty/notifications" element={<FacultyNotifications />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
          <Route path="/admin/departments" element={<AdminDepartments />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/subjects" element={<AdminSubjects />} />
          <Route path="/admin/timetable" element={<AdminTimetable />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/results" element={<AdminResults />} />
          <Route path="/admin/fees" element={<AdminFees />} />
          <Route path="/admin/hostel" element={<AdminHostel />} />
          <Route path="/admin/library" element={<AdminLibrary />} />
          <Route path="/admin/placements" element={<AdminPlacements />} />
          <Route path="/admin/scholarships" element={<AdminScholarships />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/roles" element={<AdminRoles />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['placement']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/placement" element={<PlacementDashboard />} />
          <Route path="/placement/tracker" element={<PlacementTracker />} />
          <Route path="/placement/recruiters" element={<PlacementRecruiters />} />
          <Route path="/placement/internships" element={<PlacementInternships />} />
          <Route path="/placement/drives" element={<PlacementDrives />} />
          <Route path="/placement/reports" element={<PlacementReports />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['librarian']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/library" element={<LibrarianDashboard />} />
          <Route path="/library/catalogue" element={<LibrarianCatalogue />} />
          <Route path="/library/issues" element={<LibrarianIssues />} />
          <Route path="/library/members" element={<LibrarianMembers />} />
          <Route path="/library/add" element={<LibrarianAddBook />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeBootstrap />
        <BrowserRouter>
          <Suspense fallback={<FullScreenLoader />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              background: '#0F172A',
              color: '#fff',
              fontSize: '14px',
            },
          }}
        />
      </HelmetProvider>
    </Provider>
  );
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-dark-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="text-sm font-medium text-dark-400">Loading Centurion Portal…</p>
      </div>
    </div>
  );
}
