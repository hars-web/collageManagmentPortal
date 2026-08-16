import type {
  AnalyticsPoint,
  Assignment,
  AttendanceSummary,
  CertificateRecord,
  ChatChannel,
  ChatMessage,
  Company,
  Complaint,
  Course,
  Department,
  EventItem,
  Exam,
  FacultyMember,
  FeedbackItem,
  FeeRecord,
  ForumReply,
  ForumThread,
  GalleryItem,
  HostelRoom,
  IssueRecord,
  LeaveBalance,
  LeaveRequest,
  LibraryBook,
  NewsItem,
  NotificationItem,
  PlacementRecord,
  ResultRecord,
  Scholarship,
  StudentRecord,
  Subject,
  Testimonial,
  TimetableSlot,
  User,
} from '../types';

export const university = {
  name: 'Centurion University of Technology and Management',
  shortName: 'CUTM',
  tagline: 'Shaping the Future with Innovation & Entrepreneurship',
  established: 2005,
  campuses: ['Bhubaneswar', 'Paralakhemundi', 'Rayagada', 'Balangir', 'Puri'],
  students: 18000,
  faculty: 1200,
  departments: 14,
  placementRate: 92,
  campusSize: '200+ Acres',
  coursesOffered: 120,
  moUs: 150,
  patents: 85,
  helpline: '+91 674 555 3000',
  email: 'info@cutm.ac.in',
  address: 'Ramachandrapur, Jatni, Bhubaneswar, Odisha 752050',
};

export const departments: Department[] = [
  { id: 'd1', name: 'Computer Science & Engineering', shortName: 'CSE', code: 'CSE', description: 'AI, ML, Data Science, Cloud Computing and full-stack development with industry-grade labs and live projects.', students: 3200, faculty: 140, courses: 8, placementRate: 94, icon: 'Code2', color: '#2563EB', hod: 'Dr. Satyabrata Das', established: 2005 },
  { id: 'd2', name: 'Electronics & Communication', shortName: 'ECE', code: 'ECE', description: 'VLSI, Embedded Systems, IoT and 5G communications with advanced research labs and industry tie-ups.', students: 1800, faculty: 90, courses: 6, placementRate: 91, icon: 'Cpu', color: '#14B8A6', hod: 'Dr. Manoranjan Pradhan', established: 2005 },
  { id: 'd3', name: 'Mechanical Engineering', shortName: 'ME', code: 'ME', description: 'Design, Manufacturing, Robotics and Thermal sciences with CAD/CAM centres and incubation support.', students: 1600, faculty: 85, courses: 5, placementRate: 89, icon: 'Settings', color: '#F59E0B', hod: 'Dr. Ajit Kumar Nayak', established: 2005 },
  { id: 'd4', name: 'Civil Engineering', shortName: 'CE', code: 'CE', description: 'Structural, Geo-technical and Construction technology with surveying labs and smart city projects.', students: 1100, faculty: 60, courses: 4, placementRate: 86, icon: 'Building2', color: '#8B5CF6', hod: 'Dr. Pravat Kumar Parhi', established: 2005 },
  { id: 'd5', name: 'Electrical Engineering', shortName: 'EE', code: 'EE', description: 'Power systems, Renewable energy and Smart grid with solar micro-grid campus as a living lab.', students: 950, faculty: 55, courses: 4, placementRate: 88, icon: 'Zap', color: '#EF4444', hod: 'Dr. Renu Sharma', established: 2005 },
  { id: 'd6', name: 'Management Studies', shortName: 'MBA', code: 'MBA', description: 'MBA with dual specialisations, entrepreneurship bootcamps and 100+ partner organisations.', students: 1400, faculty: 70, courses: 6, placementRate: 93, icon: 'Briefcase', color: '#EC4899', hod: 'Dr. Swati Mohanty', established: 2007 },
  { id: 'd7', name: 'Agriculture Sciences', shortName: 'AGR', code: 'AGR', description: 'Smart farming, Agri-tech and precision agriculture on a 100+ acre organic research farm.', students: 1800, faculty: 95, courses: 7, placementRate: 90, icon: 'Leaf', color: '#22C55E', hod: 'Dr. Bhabani Shankar Pradhan', established: 2009 },
  { id: 'd8', name: 'Pharmacy', shortName: 'PHARMA', code: 'PHARMA', description: 'Pharma technology, drug discovery and quality assurance with GMP-certified production labs.', students: 1300, faculty: 75, courses: 5, placementRate: 87, icon: 'Pill', color: '#06B6D4', hod: 'Dr. Sasmita Nayak', established: 2010 },
  { id: 'd9', name: 'Paramedics & Health Sciences', shortName: 'PHS', code: 'PHS', description: 'Physiotherapy, Medical Lab Technology, OT Technology and Nursing with hospital partnerships.', students: 1200, faculty: 65, courses: 6, placementRate: 85, icon: 'Stethoscope', color: '#F43F5E', hod: 'Dr. Nilakantha Panigrahi', established: 2012 },
  { id: 'd10', name: 'Applied Sciences & Humanities', shortName: 'ASH', code: 'ASH', description: 'Physics, Chemistry, Mathematics and English — the academic backbone across all programmes.', students: 900, faculty: 80, courses: 3, placementRate: 90, icon: 'Atom', color: '#6366F1', hod: 'Dr. Susanta Kumar Sahoo', established: 2005 },
  { id: 'd11', name: 'Mining Engineering', shortName: 'MIN', code: 'MIN', description: 'Surface & underground mining, mine safety and mineral processing with virtual reality simulators.', students: 450, faculty: 30, courses: 2, placementRate: 95, icon: 'Hammer', color: '#A16207', hod: 'Dr. Debashish Mishra', established: 2015 },
  { id: 'd12', name: 'Biosciences & Biotechnology', shortName: 'BSB', code: 'BSB', description: 'Molecular biology, bioinformatics and bioprocess engineering with BSL-2 research labs.', students: 600, faculty: 40, courses: 4, placementRate: 88, icon: 'Dna', color: '#0EA5E9', hod: 'Dr. Ipsita Mohanty', established: 2011 },
  { id: 'd13', name: 'Vocational Studies', shortName: 'VS', code: 'VS', description: 'Skilling programmes in solar, electrical, construction and digital media for employability.', students: 1200, faculty: 90, courses: 12, placementRate: 96, icon: 'Wrench', color: '#84CC16', hod: 'Prof. Rabinarayan Sahoo', established: 2013 },
  { id: 'd14', name: 'School of Law', shortName: 'LAW', code: 'LAW', description: 'BA LL.B and LL.M with moot court halls, legal aid clinics and corporate law internships.', students: 500, faculty: 35, courses: 2, placementRate: 82, icon: 'Scale', color: '#7C3AED', hod: 'Dr. Aparajita Mohanty', established: 2018 },
];

export const courses: Course[] = [
  { id: 'c1', code: 'B.Tech-CSE', name: 'B.Tech in Computer Science & Engineering', level: 'UG', departmentId: 'd1', duration: '4 Years', seats: 480, feePerYear: 140000, eligibility: '10+2 with PCM (min 60%), valid JEE/OJEE/CLAT score', specializations: ['Artificial Intelligence', 'Data Science', 'Cloud Computing', 'Cyber Security'], overview: 'Industry-aligned curriculum with 4 specialisations, 20+ certifications and guaranteed project-based learning.', careerPaths: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Cloud Architect'], icon: 'Code2' },
  { id: 'c2', code: 'B.Tech-AI', name: 'B.Tech in AI & Machine Learning', level: 'UG', departmentId: 'd1', duration: '4 Years', seats: 180, feePerYear: 150000, eligibility: '10+2 with PCM (min 60%)', specializations: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'], overview: 'India\'s first UG programme with dedicated GPU labs and industry-sponsored capstone projects.', careerPaths: ['ML Engineer', 'Data Scientist', 'AI Researcher'], icon: 'BrainCircuit' },
  { id: 'c3', code: 'MCA', name: 'MCA — Master of Computer Applications', level: 'PG', departmentId: 'd1', duration: '2 Years', seats: 120, feePerYear: 120000, eligibility: 'BCA/B.Sc IT with min 50% + entrance', specializations: ['Software Engineering', 'Data Analytics', 'Cloud & DevOps'], overview: 'AICTE approved with 6-month paid industry internship.', careerPaths: ['Software Architect', 'DevOps Engineer', 'Analytics Lead'], icon: 'MonitorSmartphone' },
  { id: 'c4', code: 'B.Tech-ECE', name: 'B.Tech in Electronics & Communication', level: 'UG', departmentId: 'd2', duration: '4 Years', seats: 240, feePerYear: 130000, eligibility: '10+2 with PCM (min 60%)', specializations: ['VLSI Design', 'IoT', 'Embedded Systems', '5G'], overview: 'Hands-on VLSI design flow with Cadence tools and industry-certified IoT track.', careerPaths: ['VLSI Engineer', 'Embedded Engineer', 'RF Engineer'], icon: 'Cpu' },
  { id: 'c5', code: 'B.Tech-ME', name: 'B.Tech in Mechanical Engineering', level: 'UG', departmentId: 'd3', duration: '4 Years', seats: 240, feePerYear: 120000, eligibility: '10+2 with PCM (min 60%)', specializations: ['Robotics', 'Thermal Engineering', 'Design & Manufacturing'], overview: 'Robotics lab with 20+ industrial robots, CAD/CAM and additive manufacturing centre.', careerPaths: ['Design Engineer', 'Robotics Engineer', 'Automotive Engineer'], icon: 'Settings' },
  { id: 'c6', code: 'MBA', name: 'MBA — Master of Business Administration', level: 'PG', departmentId: 'd6', duration: '2 Years', seats: 240, feePerYear: 160000, eligibility: 'Graduation (min 50%) + CAT/MAT/XAT/CMAT', specializations: ['Marketing', 'Finance', 'HRM', 'Business Analytics', 'Entrepreneurship'], overview: 'Entrepreneurship bootcamps, 100+ recruiter network and live industry projects every semester.', careerPaths: ['Business Analyst', 'Product Manager', 'Consultant', 'Founder'], icon: 'Briefcase' },
  { id: 'c7', code: 'B.Sc-AGRI', name: 'B.Sc (Hons) Agriculture', level: 'UG', departmentId: 'd7', duration: '4 Years', seats: 300, feePerYear: 110000, eligibility: '10+2 with PCB/PCM (min 55%)', specializations: ['Agri-Tech', 'Organic Farming', 'Agri-Business'], overview: 'Learn on a 100-acre organic farm with drones, soil labs and agri-business incubation.', careerPaths: ['Agri-Tech Specialist', 'Agripreneur', 'Soil Scientist'], icon: 'Leaf' },
  { id: 'c8', code: 'B.Pharm', name: 'B.Pharm — Bachelor of Pharmacy', level: 'UG', departmentId: 'd8', duration: '4 Years', seats: 180, feePerYear: 130000, eligibility: '10+2 with PCB/PCM (min 50%)', specializations: ['Pharmaceutical Technology', 'Pharmacovigilance', 'Quality Assurance'], overview: 'GMP-certified pilot plant, IP training and pharmacy licensing exam preparation.', careerPaths: ['Pharmacist', 'QA Officer', 'Drug Inspector'], icon: 'Pill' },
  { id: 'c9', code: 'BPT', name: 'BPT — Bachelor of Physiotherapy', level: 'UG', departmentId: 'd9', duration: '4.5 Years', seats: 100, feePerYear: 135000, eligibility: '10+2 with PCB (min 50%)', specializations: ['Orthopaedics', 'Neurology', 'Sports Physiotherapy'], overview: 'Clinical rotations across 5 partner hospitals with modern rehab equipment.', careerPaths: ['Physiotherapist', 'Sports Rehab Specialist', 'Clinic Owner'], icon: 'Activity' },
  { id: 'c10', code: 'BA-LLB', name: 'BA LL.B (Hons)', level: 'UG', departmentId: 'd14', duration: '5 Years', seats: 120, feePerYear: 140000, eligibility: '10+2 with min 45% + CLAT/LSAT', specializations: ['Corporate Law', 'Criminal Law', 'Constitutional Law'], overview: 'Moot courts, legal aid clinic, and mandatory internships in High Courts and corporate firms.', careerPaths: ['Advocate', 'Corporate Counsel', 'Legal Analyst'], icon: 'Scale' },
  { id: 'c11', code: 'M.Tech', name: 'M.Tech in CSE / VLSI / Power', level: 'PG', departmentId: 'd1', duration: '2 Years', seats: 90, feePerYear: 100000, eligibility: 'B.Tech with min 55% + GATE', specializations: ['AI & ML', 'VLSI', 'Power Systems'], overview: 'Research-led programme with teaching assistantships and publication support.', careerPaths: ['Research Engineer', 'PhD Scholar', 'R&D Lead'], icon: 'FlaskConical' },
  { id: 'c12', code: 'PhD', name: 'PhD — Doctor of Philosophy', level: 'PhD', departmentId: 'd1', duration: '3-5 Years', seats: 40, feePerYear: 60000, eligibility: 'Masters with min 55% + PET/UGC-NET', specializations: ['AI & ML', 'Materials', 'Management', 'Agriculture'], overview: '85+ patents filed by CUTM research scholars, monthly stipends for fellows.', careerPaths: ['Professor', 'Senior Researcher', 'Scientist'], icon: 'GraduationCap' },
];

export const facultyMembers: FacultyMember[] = [
  { id: 'f1', name: 'Dr. Satyabrata Das', designation: 'Professor & HOD', departmentId: 'd1', email: 'satyabrata.das@cutm.ac.in', phone: '+91 94370 12345', qualification: 'PhD (IIT Kharagpur)', experienceYears: 22, specialization: 'Distributed Systems, Cloud', publications: 95, rating: 4.8 },
  { id: 'f2', name: 'Dr. Anjali Mohapatra', designation: 'Associate Professor', departmentId: 'd1', email: 'anjali.mohapatra@cutm.ac.in', phone: '+91 98610 56789', qualification: 'PhD (NIT Rourkela)', experienceYears: 14, specialization: 'Machine Learning, NLP', publications: 62, rating: 4.9 },
  { id: 'f3', name: 'Prof. Rajesh Kumar Patnaik', designation: 'Assistant Professor', departmentId: 'd1', email: 'rajesh.patnaik@cutm.ac.in', phone: '+91 88950 11223', qualification: 'M.Tech (BITS Pilani)', experienceYears: 9, specialization: 'Full Stack, DevOps', publications: 24, rating: 4.7 },
  { id: 'f4', name: 'Dr. Manoranjan Pradhan', designation: 'Professor & HOD', departmentId: 'd2', email: 'manoranjan.pradhan@cutm.ac.in', phone: '+91 94371 45678', qualification: 'PhD (IISc Bangalore)', experienceYears: 20, specialization: 'VLSI Design', publications: 88, rating: 4.6 },
  { id: 'f5', name: 'Dr. Sasmita Nayak', designation: 'Professor & HOD', departmentId: 'd8', email: 'sasmita.nayak@cutm.ac.in', phone: '+91 94372 78901', qualification: 'PhD (Jadavpur University)', experienceYears: 18, specialization: 'Pharmaceutical Technology', publications: 71, rating: 4.7 },
  { id: 'f6', name: 'Dr. Swati Mohanty', designation: 'Professor & HOD', departmentId: 'd6', email: 'swati.mohanty@cutm.ac.in', phone: '+91 94373 23456', qualification: 'PhD (Utkal University)', experienceYears: 17, specialization: 'Entrepreneurship, Marketing', publications: 45, rating: 4.8 },
  { id: 'f7', name: 'Dr. Bhabani Shankar Pradhan', designation: 'Professor & HOD', departmentId: 'd7', email: 'bhabani.pradhan@cutm.ac.in', phone: '+91 94374 34567', qualification: 'PhD (OUAT Bhubaneswar)', experienceYears: 21, specialization: 'Agronomy, Agri-Tech', publications: 103, rating: 4.5 },
  { id: 'f8', name: 'Dr. Renu Sharma', designation: 'Professor & HOD', departmentId: 'd5', email: 'renu.sharma@cutm.ac.in', phone: '+91 94375 45678', qualification: 'PhD (IIT Delhi)', experienceYears: 19, specialization: 'Power Systems, Solar', publications: 66, rating: 4.6 },
  { id: 'f9', name: 'Prof. Debashish Mishra', designation: 'Associate Professor', departmentId: 'd11', email: 'debashish.mishra@cutm.ac.in', phone: '+91 94376 56789', qualification: 'M.Tech (ISM Dhanbad)', experienceYears: 13, specialization: 'Mine Safety, VR Simulation', publications: 38, rating: 4.4 },
  { id: 'f10', name: 'Dr. Ipsita Mohanty', designation: 'Associate Professor', departmentId: 'd12', email: 'ipsita.mohanty@cutm.ac.in', phone: '+91 94377 67890', qualification: 'PhD (NISER Bhubaneswar)', experienceYears: 11, specialization: 'Molecular Biology', publications: 52, rating: 4.7 },
  { id: 'f11', name: 'Dr. Aparajita Mohanty', designation: 'Professor & HOD', departmentId: 'd14', email: 'aparajita.mohanty@cutm.ac.in', phone: '+91 94378 78901', qualification: 'LL.D (Utkal University)', experienceYears: 16, specialization: 'Constitutional Law', publications: 29, rating: 4.8 },
  { id: 'f12', name: 'Dr. Nilakantha Panigrahi', designation: 'Professor & HOD', departmentId: 'd9', email: 'nilakantha.panigrahi@cutm.ac.in', phone: '+91 94379 89012', qualification: 'PhD (SCB Medical College)', experienceYears: 15, specialization: 'Cardiopulmonary Physio', publications: 41, rating: 4.5 },
];

export const students: StudentRecord[] = [
  { id: 's1', rollNumber: 'CUTM21001001', name: 'Arpit Mohanty', email: 'arpit.mohanty@cutm.ac.in', departmentId: 'd1', program: 'B.Tech CSE', semester: 6, batch: '2021-25', phone: '+91 90000 00001', cgpa: 8.7, attendance: 91, status: 'active', hosteller: true },
  { id: 's2', rollNumber: 'CUTM21001002', name: 'Priya Dash', email: 'priya.dash@cutm.ac.in', departmentId: 'd1', program: 'B.Tech CSE', semester: 6, batch: '2021-25', phone: '+91 90000 00002', cgpa: 9.1, attendance: 95, status: 'active', hosteller: false },
  { id: 's3', rollNumber: 'CUTM21001003', name: 'Rahul Behera', email: 'rahul.behera@cutm.ac.in', departmentId: 'd1', program: 'B.Tech CSE (AI)', semester: 6, batch: '2021-25', phone: '+91 90000 00003', cgpa: 8.2, attendance: 84, status: 'active', hosteller: true },
  { id: 's4', rollNumber: 'CUTM21002001', name: 'Sneha Patnaik', email: 'sneha.patnaik@cutm.ac.in', departmentId: 'd2', program: 'B.Tech ECE', semester: 6, batch: '2021-25', phone: '+91 90000 00004', cgpa: 8.9, attendance: 93, status: 'active', hosteller: true },
  { id: 's5', rollNumber: 'CUTM21003001', name: 'Amit Kumar Sahoo', email: 'amit.sahoo@cutm.ac.in', departmentId: 'd3', program: 'B.Tech ME', semester: 6, batch: '2021-25', phone: '+91 90000 00005', cgpa: 7.8, attendance: 79, status: 'active', hosteller: true },
  { id: 's6', rollNumber: 'CUTM21006001', name: 'Sonali Mahapatra', email: 'sonali.mahapatra@cutm.ac.in', departmentId: 'd6', program: 'MBA', semester: 3, batch: '2022-24', phone: '+91 90000 00006', cgpa: 8.4, attendance: 88, status: 'active', hosteller: false },
  { id: 's7', rollNumber: 'CUTM21007001', name: 'Bikash Rout', email: 'bikash.rout@cutm.ac.in', departmentId: 'd7', program: 'B.Sc Agriculture', semester: 6, batch: '2021-25', phone: '+91 90000 00007', cgpa: 8.0, attendance: 86, status: 'active', hosteller: true },
  { id: 's8', rollNumber: 'CUTM21008001', name: 'Sushree Jena', email: 'sushree.jena@cutm.ac.in', departmentId: 'd8', program: 'B.Pharm', semester: 5, batch: '2022-26', phone: '+91 90000 00008', cgpa: 8.6, attendance: 90, status: 'active', hosteller: true },
  { id: 's9', rollNumber: 'CUTM21014001', name: 'Devansh Mishra', email: 'devansh.mishra@cutm.ac.in', departmentId: 'd14', program: 'BA LL.B', semester: 4, batch: '2022-27', phone: '+91 90000 00009', cgpa: 7.9, attendance: 82, status: 'active', hosteller: false },
  { id: 's10', rollNumber: 'CUTM21006002', name: 'Tanmay Sahu', email: 'tanmay.sahu@cutm.ac.in', departmentId: 'd6', program: 'MBA', semester: 3, batch: '2022-24', phone: '+91 90000 00010', cgpa: 7.5, attendance: 74, status: 'active', hosteller: true },
  { id: 's11', rollNumber: 'CUTM21001004', name: 'Ishita Bhoi', email: 'ishita.bhoi@cutm.ac.in', departmentId: 'd1', program: 'B.Tech CSE', semester: 6, batch: '2021-25', phone: '+91 90000 00011', cgpa: 8.3, attendance: 89, status: 'active', hosteller: true },
  { id: 's12', rollNumber: 'CUTM21002002', name: 'Subham Padhi', email: 'subham.padhi@cutm.ac.in', departmentId: 'd2', program: 'B.Tech ECE', semester: 6, batch: '2021-25', phone: '+91 90000 00012', cgpa: 7.6, attendance: 77, status: 'active', hosteller: true },
];

export const subjects: Subject[] = [
  { id: 'sub1', code: 'CSE601', name: 'Machine Learning', departmentId: 'd1', semester: 6, credits: 4, facultyId: 'f2', hoursPerWeek: 4, category: 'core' },
  { id: 'sub2', code: 'CSE602', name: 'Cloud Computing & DevOps', departmentId: 'd1', semester: 6, credits: 4, facultyId: 'f3', hoursPerWeek: 4, category: 'core' },
  { id: 'sub3', code: 'CSE603', name: 'Data Structures & Algorithms', departmentId: 'd1', semester: 6, credits: 4, facultyId: 'f1', hoursPerWeek: 3, category: 'core' },
  { id: 'sub4', code: 'CSE604', name: 'Full Stack Development Lab', departmentId: 'd1', semester: 6, credits: 3, facultyId: 'f3', hoursPerWeek: 4, category: 'lab' },
  { id: 'sub5', code: 'CSE605', name: 'Natural Language Processing', departmentId: 'd1', semester: 6, credits: 3, facultyId: 'f2', hoursPerWeek: 3, category: 'elective' },
  { id: 'sub6', code: 'CSE606', name: 'Cyber Security Fundamentals', departmentId: 'd1', semester: 6, credits: 3, facultyId: 'f1', hoursPerWeek: 3, category: 'elective' },
  { id: 'sub7', code: 'ECE601', name: 'IoT System Design', departmentId: 'd2', semester: 6, credits: 4, facultyId: 'f4', hoursPerWeek: 4, category: 'core' },
  { id: 'sub8', code: 'ME601', name: 'Robotics & Automation', departmentId: 'd3', semester: 6, credits: 4, facultyId: 'f6', hoursPerWeek: 4, category: 'core' },
];

export const timetable: TimetableSlot[] = [
  { id: 't1', day: 'Monday', start: '09:00', end: '10:30', subjectId: 'sub1', room: 'Smart Class 4A' },
  { id: 't2', day: 'Monday', start: '11:00', end: '12:30', subjectId: 'sub2', room: 'Lab 201' },
  { id: 't3', day: 'Monday', start: '14:00', end: '15:30', subjectId: 'sub4', room: 'Lab 204' },
  { id: 't4', day: 'Tuesday', start: '09:00', end: '10:30', subjectId: 'sub3', room: 'LH-12' },
  { id: 't5', day: 'Tuesday', start: '11:00', end: '12:30', subjectId: 'sub5', room: 'Smart Class 4B' },
  { id: 't6', day: 'Tuesday', start: '14:00', end: '15:30', subjectId: 'sub1', room: 'LH-14' },
  { id: 't7', day: 'Wednesday', start: '09:00', end: '10:30', subjectId: 'sub2', room: 'Lab 201' },
  { id: 't8', day: 'Wednesday', start: '11:00', end: '12:30', subjectId: 'sub6', room: 'LH-11' },
  { id: 't9', day: 'Wednesday', start: '14:00', end: '16:00', subjectId: 'sub4', room: 'Lab 204' },
  { id: 't10', day: 'Thursday', start: '09:00', end: '10:30', subjectId: 'sub3', room: 'LH-12' },
  { id: 't11', day: 'Thursday', start: '11:00', end: '12:30', subjectId: 'sub5', room: 'Smart Class 4A' },
  { id: 't12', day: 'Thursday', start: '14:00', end: '15:30', subjectId: 'sub1', room: 'LH-14' },
  { id: 't13', day: 'Friday', start: '09:00', end: '10:30', subjectId: 'sub2', room: 'Lab 201' },
  { id: 't14', day: 'Friday', start: '11:00', end: '12:30', subjectId: 'sub6', room: 'LH-11' },
  { id: 't15', day: 'Saturday', start: '09:00', end: '11:00', subjectId: 'sub4', room: 'Lab 204' },
];

export const assignments: Assignment[] = [
  { id: 'a1', title: 'ML Model: Credit Card Fraud Detection', subjectId: 'sub1', description: 'Build a classification model on the given dataset. Compare Random Forest and XGBoost with proper evaluation metrics and a 5-page report.', dueDate: '2026-08-20', totalMarks: 50, status: 'pending' },
  { id: 'a2', title: 'DevOps Pipeline Implementation', subjectId: 'sub2', description: 'Set up a CI/CD pipeline for a Node.js app with GitHub Actions, Docker and deploy to a cloud provider. Submit the pipeline YAML and screenshots.', dueDate: '2026-08-25', totalMarks: 50, status: 'pending' },
  { id: 'a3', title: 'DSA Problem Set — Graphs & DP', subjectId: 'sub3', description: 'Solve 15 problems on graphs and dynamic programming. Submit solutions with time complexity analysis.', dueDate: '2026-08-15', totalMarks: 30, status: 'overdue' },
  { id: 'a4', title: 'E-Commerce REST API (Lab)', subjectId: 'sub4', description: 'Design a REST API for e-commerce with JWT auth, roles and MongoDB. Include Postman collection.', dueDate: '2026-09-02', totalMarks: 40, status: 'pending' },
  { id: 'a5', title: 'NLP: Sentiment Analysis Report', subjectId: 'sub5', description: 'Fine-tune a transformer model for sentiment analysis on product reviews. Submit notebook + 3-page report.', dueDate: '2026-08-28', totalMarks: 30, status: 'pending' },
  { id: 'a6', title: 'Security Audit Case Study', subjectId: 'sub6', description: 'Perform a security audit of the provided web app. Document OWASP Top 10 findings and remediation plan.', dueDate: '2026-08-30', totalMarks: 25, status: 'pending' },
  { id: 'a7', title: 'ML Model Evaluation (Submitted)', subjectId: 'sub1', description: 'Model evaluation assignment from last unit.', dueDate: '2026-07-28', totalMarks: 30, status: 'submitted', submittedAt: '2026-07-26' },
  { id: 'a8', title: 'Cloud Architecture Design (Graded)', subjectId: 'sub2', description: 'Design a scalable architecture on AWS for a social media app.', dueDate: '2026-07-10', totalMarks: 20, status: 'graded', submittedAt: '2026-07-08', obtainedMarks: 18 },
];

export const exams: Exam[] = [
  { id: 'e1', name: 'Mid Semester — Machine Learning', subjectId: 'sub1', date: '2026-09-10', time: '09:30 AM', room: 'LH-14', mode: 'theory', totalMarks: 30 },
  { id: 'e2', name: 'Mid Semester — Cloud & DevOps', subjectId: 'sub2', date: '2026-09-12', time: '09:30 AM', room: 'LH-12', mode: 'theory', totalMarks: 30 },
  { id: 'e3', name: 'Lab Viva — Full Stack', subjectId: 'sub4', date: '2026-09-15', time: '02:00 PM', room: 'Lab 204', mode: 'lab', totalMarks: 50 },
  { id: 'e4', name: 'Unit Test — DSA', subjectId: 'sub3', date: '2026-08-18', time: '11:00 AM', room: 'LH-11', mode: 'theory', totalMarks: 20 },
  { id: 'e5', name: 'End Semester — NLP', subjectId: 'sub5', date: '2026-11-25', time: '09:30 AM', room: 'LH-14', mode: 'theory', totalMarks: 70 },
  { id: 'e6', name: 'End Semester — Cyber Security', subjectId: 'sub6', date: '2026-11-28', time: '09:30 AM', room: 'LH-12', mode: 'theory', totalMarks: 70 },
];

export const results: ResultRecord[] = [
  { id: 'r1', studentId: 's1', semester: 5, subjectCode: 'CSE501', subjectName: 'Database Systems', internalMarks: 28, externalMarks: 62, totalMarks: 90, grade: 'O', result: 'PASS', credits: 4 },
  { id: 'r2', studentId: 's1', semester: 5, subjectCode: 'CSE502', subjectName: 'Operating Systems', internalMarks: 25, externalMarks: 58, totalMarks: 83, grade: 'A+', result: 'PASS', credits: 4 },
  { id: 'r3', studentId: 's1', semester: 5, subjectCode: 'CSE503', subjectName: 'Computer Networks', internalMarks: 24, externalMarks: 54, totalMarks: 78, grade: 'A', result: 'PASS', credits: 4 },
  { id: 'r4', studentId: 's1', semester: 5, subjectCode: 'CSE504', subjectName: 'Software Engineering', internalMarks: 27, externalMarks: 60, totalMarks: 87, grade: 'A+', result: 'PASS', credits: 3 },
  { id: 'r5', studentId: 's1', semester: 5, subjectCode: 'CSE505', subjectName: 'Web Technologies', internalMarks: 26, externalMarks: 56, totalMarks: 82, grade: 'A', result: 'PASS', credits: 3 },
  { id: 'r6', studentId: 's1', semester: 4, subjectCode: 'CSE401', subjectName: 'Discrete Mathematics', internalMarks: 23, externalMarks: 55, totalMarks: 78, grade: 'A', result: 'PASS', credits: 4 },
  { id: 'r7', studentId: 's1', semester: 4, subjectCode: 'CSE402', subjectName: 'Java Programming', internalMarks: 28, externalMarks: 59, totalMarks: 87, grade: 'A+', result: 'PASS', credits: 4 },
  { id: 'r8', studentId: 's1', semester: 4, subjectCode: 'CSE403', subjectName: 'Computer Organization', internalMarks: 24, externalMarks: 52, totalMarks: 76, grade: 'A', result: 'PASS', credits: 4 },
  { id: 'r9', studentId: 's1', semester: 4, subjectCode: 'CSE404', subjectName: 'Python Programming Lab', internalMarks: 29, externalMarks: 48, totalMarks: 77, grade: 'A', result: 'PASS', credits: 3 },
  { id: 'r10', studentId: 's1', semester: 3, subjectCode: 'CSE301', subjectName: 'Data Structures', internalMarks: 27, externalMarks: 57, totalMarks: 84, grade: 'A+', result: 'PASS', credits: 4 },
  { id: 'r11', studentId: 's1', semester: 3, subjectCode: 'CSE302', subjectName: 'Probability & Statistics', internalMarks: 26, externalMarks: 50, totalMarks: 76, grade: 'A', result: 'PASS', credits: 3 },
  { id: 'r12', studentId: 's1', semester: 3, subjectCode: 'CSE303', subjectName: 'OOPS with C++', internalMarks: 28, externalMarks: 55, totalMarks: 83, grade: 'A+', result: 'PASS', credits: 4 },
];

export const feeRecords: FeeRecord[] = [
  { id: 'fee1', studentId: 's1', description: 'Tuition Fee — Semester 6', amount: 70000, paid: 70000, dueDate: '2026-05-10', status: 'paid', date: '2026-04-28', method: 'UPI' },
  { id: 'fee2', studentId: 's1', description: 'Hostel Fee — Semester 6', amount: 25000, paid: 25000, dueDate: '2026-05-10', status: 'paid', date: '2026-04-28', method: 'Net Banking' },
  { id: 'fee3', studentId: 's1', description: 'Examination Fee — Mid Sem', amount: 3000, paid: 3000, dueDate: '2026-09-01', status: 'paid', date: '2026-08-02', method: 'Card' },
  { id: 'fee4', studentId: 's1', description: 'Library & Lab Caution Deposit', amount: 5000, paid: 2000, dueDate: '2026-09-15', status: 'partial' },
  { id: 'fee5', studentId: 's1', description: 'Bus Transport — Semester 6', amount: 15000, paid: 0, dueDate: '2026-09-20', status: 'unpaid' },
  { id: 'fee6', studentId: 's1', description: 'Placement Training Fee', amount: 8000, paid: 8000, dueDate: '2026-06-15', status: 'paid', date: '2026-06-10', method: 'UPI' },
];

export const books: LibraryBook[] = [
  { id: 'b1', accessionNo: 'LIB-0001', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest', category: 'Computer Science', rack: 'A-12', copies: 25, available: 6 },
  { id: 'b2', accessionNo: 'LIB-0002', title: 'Machine Learning with Python', author: 'Sebastian Raschka', category: 'AI/ML', rack: 'B-04', copies: 15, available: 3 },
  { id: 'b3', accessionNo: 'LIB-0003', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engg', rack: 'A-08', copies: 20, available: 9 },
  { id: 'b4', accessionNo: 'LIB-0004', title: 'Design Patterns', author: 'Erich Gamma et al.', category: 'Software Engg', rack: 'A-09', copies: 18, available: 2 },
  { id: 'b5', accessionNo: 'LIB-0005', title: 'Deep Learning', author: 'Ian Goodfellow', category: 'AI/ML', rack: 'B-06', copies: 12, available: 1 },
  { id: 'b6', accessionNo: 'LIB-0006', title: 'Operating System Concepts', author: 'Silberschatz, Galvin', category: 'Computer Science', rack: 'A-15', copies: 30, available: 12 },
  { id: 'b7', accessionNo: 'LIB-0007', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software Engg', rack: 'A-10', copies: 14, available: 4 },
  { id: 'b8', accessionNo: 'LIB-0008', title: 'Computer Networking: Top Down', author: 'Kurose & Ross', category: 'Computer Science', rack: 'A-16', copies: 22, available: 7 },
];

export const myIssues: IssueRecord[] = [
  { id: 'i1', studentId: 's1', bookId: 'b1', issueDate: '2026-07-05', dueDate: '2026-08-05', returned: false, fine: 0 },
  { id: 'i2', studentId: 's1', bookId: 'b2', issueDate: '2026-07-20', dueDate: '2026-08-20' },
  { id: 'i3', studentId: 's1', bookId: 'b3', issueDate: '2026-05-02', dueDate: '2026-06-02', returned: true, returnDate: '2026-05-30', fine: 0 },
  { id: 'i4', studentId: 's1', bookId: 'b6', issueDate: '2026-04-10', dueDate: '2026-05-10', returned: true, returnDate: '2026-05-08', fine: 0 },
];

export const hostelRooms: HostelRoom[] = [
  { id: 'h1', hostel: 'Boys Hostel — Bhubaneswar', block: 'Block A', roomNo: 'A-204', type: 'double', capacity: 2, occupied: 1, feesPerSem: 25000, warden: 'Mr. P.K. Mohanty' },
  { id: 'h2', hostel: 'Girls Hostel — Bhubaneswar', block: 'Block C', roomNo: 'C-118', type: 'double', capacity: 2, occupied: 2, feesPerSem: 25000, warden: 'Ms. S. Rath' },
  { id: 'h3', hostel: 'Boys Hostel — Paralakhemundi', block: 'Block B', roomNo: 'B-312', type: 'single', capacity: 1, occupied: 1, feesPerSem: 30000, warden: 'Mr. D. Panda' },
  { id: 'h4', hostel: 'International Hostel', block: 'Block D', roomNo: 'D-101', type: 'triple', capacity: 3, occupied: 2, feesPerSem: 35000, warden: 'Dr. R. Nanda' },
];

export const scholarships: Scholarship[] = [
  { id: 'sch1', studentId: 's1', name: 'Merit Scholarship — CUTM 100%', provider: 'CUTM', amount: 140000, status: 'approved', appliedDate: '2026-04-02', type: 'merit' },
  { id: 'sch2', studentId: 's1', name: 'State E-Medhabruti', provider: 'Govt. of Odisha', amount: 30000, status: 'approved', appliedDate: '2026-05-15', type: 'merit' },
  { id: 'sch3', studentId: 's1', name: 'OBC / ST / SC Welfare Scheme', provider: 'Govt. of Odisha', amount: 15000, status: 'pending', appliedDate: '2026-07-01', type: 'reserved' },
  { id: 'sch4', studentId: 's1', name: 'Industry Sponsored Fellowship — Infosys', provider: 'Infosys', amount: 100000, status: 'rejected', appliedDate: '2026-03-10', type: 'merit' },
];

export const certificates: CertificateRecord[] = [
  { id: 'cert1', studentId: 's1', name: 'Bonafide Student Certificate', issueDate: '2026-07-15', type: 'bonafide', status: 'issued' },
  { id: 'cert2', studentId: 's1', name: 'Academic Record — Semester 5', issueDate: '2026-06-20', type: 'academic', status: 'issued' },
  { id: 'cert3', studentId: 's1', name: 'Provisional Certificate (4th Sem)', issueDate: '', type: 'provisional', status: 'ready' },
  { id: 'cert4', studentId: 's1', name: 'Character & Conduct Certificate', issueDate: '', type: 'conduct', status: 'pending' },
  { id: 'cert5', studentId: 's1', name: 'Sports Achievement — Inter-College Cricket', issueDate: '2026-02-10', type: 'achievement', status: 'issued' },
];

export const placementRecords: PlacementRecord[] = [
  { id: 'p1', studentId: 's1', company: 'Tata Consultancy Services', role: 'System Engineer', package: 450000, offerDate: '2026-08-01', status: 'offered', location: 'Bhubaneswar' },
  { id: 'p2', studentId: 's1', company: 'Infosys', role: 'Digital Specialist Engineer', package: 560000, offerDate: '2026-07-25', status: 'placed', location: 'Mysuru' },
  { id: 'p3', studentId: 's1', company: 'Wipro', role: 'Project Engineer', package: 420000, offerDate: '2026-07-10', status: 'placed', location: 'Hyderabad' },
  { id: 'p4', studentId: 's1', company: 'TCS Digital', role: 'Digital Engineer', package: 700000, offerDate: '', status: 'interviewing', location: 'Remote' },
  { id: 'p5', studentId: 's1', company: 'Capgemini', role: 'Analyst', package: 450000, offerDate: '', status: 'interviewing', location: 'Mumbai' },
  { id: 'p6', studentId: 's1', company: 'Accenture', role: 'ASE', package: 460000, offerDate: '', status: 'not-placed', location: 'Bengaluru' },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Assignment due soon', message: '"ML Model: Credit Card Fraud Detection" is due in 3 days.', type: 'warning', read: false, createdAt: '2026-08-06T09:00:00Z', link: '/student/assignments' },
  { id: 'n2', title: 'Mid-sem exam schedule released', message: 'Mid-semester exam dates for Semester 6 are now live.', type: 'info', read: false, createdAt: '2026-08-05T14:30:00Z', link: '/student/exams' },
  { id: 'n3', title: 'TCS interview result', message: 'Congratulations! You have been offered a position at TCS.', type: 'success', read: false, createdAt: '2026-08-04T11:00:00Z', link: '/student/placements' },
  { id: 'n4', title: 'Library book overdue', message: '"Introduction to Algorithms" is 2 days overdue. Return it to avoid fines.', type: 'danger', read: false, createdAt: '2026-08-03T10:00:00Z', link: '/student/library' },
  { id: 'n5', title: 'Fee reminder', message: 'Library & Lab caution deposit of ₹3,000 is still pending.', type: 'warning', read: true, createdAt: '2026-08-01T09:00:00Z', link: '/student/fees' },
  { id: 'n6', title: 'Campus placement drive', message: 'Infosys hiring drive on 12 Aug — register before 10 Aug.', type: 'info', read: true, createdAt: '2026-07-30T16:00:00Z', link: '/student/placements' },
  { id: 'n7', title: 'Scholarship update', message: 'State E-Medhabruti scholarship has been approved.', type: 'success', read: true, createdAt: '2026-07-28T12:00:00Z', link: '/student/scholarships' },
  { id: 'n8', title: 'Hostel mess menu', message: 'New weekly mess menu uploaded to the portal.', type: 'info', read: true, createdAt: '2026-07-25T08:00:00Z', link: '/student/hostel' },
];

export const events: EventItem[] = [
  { id: 'ev1', title: 'CUTM TechFest 2026 — InnovateX', description: 'The flagship technical festival with hackathons, robotics arena, coding olympiad and 50+ tech events with prizes worth ₹10 lakhs.', date: '2026-09-18', time: '09:00 AM', venue: 'Main Campus, Bhubaneswar', category: 'technical', organizer: 'Student Council', registered: 2400, capacity: 5000, featured: true },
  { id: 'ev2', title: 'National Placement Bootcamp', description: 'A 3-day intensive placement preparation program covering aptitude, HR rounds, group discussions and mock interviews with recruiters.', date: '2026-08-22', time: '10:00 AM', venue: 'Auditorium, Bhubaneswar', category: 'seminar', organizer: 'Placement Cell', registered: 850, capacity: 1200, featured: true },
  { id: 'ev3', title: 'Annual Cultural Fest — Utopia', description: 'Three days of music, dance, theatre, fashion show and celebrity night performances.', date: '2026-11-06', time: '04:00 PM', venue: 'Open Air Theatre', category: 'cultural', organizer: 'Cultural Committee', registered: 3100, capacity: 8000, featured: true },
  { id: 'ev4', title: 'National Hackathon: Code for Bharat', description: '24-hour hackathon building tech solutions for rural India. Sponsored by industry partners.', date: '2026-09-05', time: '08:00 AM', venue: 'Innovation Hub', category: 'technical', organizer: 'IEEE CUTM', registered: 480, capacity: 600 },
  { id: 'ev5', title: 'Inter-University Sports Meet', description: 'Athletics, cricket, football, basketball and e-sports across 20+ universities.', date: '2026-10-12', time: '08:00 AM', venue: 'University Sports Complex', category: 'sports', organizer: 'Sports Board', registered: 1600, capacity: 4000 },
  { id: 'ev6', title: 'AI & Data Science Workshop', description: 'Hands-on workshop on LLMs, RAG pipelines and MLOps with cloud credits for all participants.', date: '2026-08-29', time: '09:30 AM', venue: 'Lab 204', category: 'workshop', organizer: 'CSE Dept', registered: 210, capacity: 240 },
  { id: 'ev7', title: 'Entrepreneurship Conclave', description: 'Startup founders, VCs and incubators share journeys. Pitch your startup for funding.', date: '2026-10-25', time: '10:00 AM', venue: 'CUTM Convention Centre', category: 'seminar', organizer: 'Incubation Cell', registered: 620, capacity: 1000 },
  { id: 'ev8', title: 'Literary & Debate Fest', description: 'Debates, elocution, poetry and creative writing competitions with inter-college participation.', date: '2026-09-12', time: '10:00 AM', venue: 'Library Auditorium', category: 'cultural', organizer: 'ASH Dept', registered: 340, capacity: 500 },
];

export const news: NewsItem[] = [
  { id: 'nw1', title: 'CUTM Achieves 92% Placement Record for Batch 2025-26', excerpt: 'Over 1,800 students placed with top recruiters including TCS, Infosys, Wipro, Amazon and Deloitte. Highest package touches ₹52 LPA.', category: 'Placements', date: '2026-08-01', author: 'Placement Cell', views: 12400 },
  { id: 'nw2', title: 'CUTM Files 85th Patent for Indigenous Agri-Drone Technology', excerpt: 'The university\'s research wing files a new patent for a low-cost precision agriculture drone developed with student researchers.', category: 'Research', date: '2026-07-24', author: 'R&D Cell', views: 8900 },
  { id: 'nw3', title: 'MoU Signed with TCS for AI Research Centre', excerpt: 'A joint centre for applied AI research will offer 50 fellowships annually and industry mentoring for final-year students.', category: 'Partnerships', date: '2026-07-18', author: 'Corporate Relations', views: 6700 },
  { id: 'nw4', title: 'CUTM Ranks Among Top 100 Universities in India — NIRF 2026', excerpt: 'The university improves its NIRF ranking by 14 positions this year across Engineering and Management categories.', category: 'Achievement', date: '2026-06-30', author: 'Registrar', views: 15200 },
  { id: 'nw5', title: 'Solar-Powered Smart Campus: 5 MW Installed', excerpt: 'CUTM Bhubaneswar campus becomes 60% self-sufficient in energy with the completion of the 5 MW solar micro-grid.', category: 'Campus', date: '2026-06-12', author: 'Infrastructure Cell', views: 5400 },
  { id: 'nw6', title: 'Startup Weekend: 3 Student Startups Get Funding', excerpt: 'AgriTech, EdTech and HealthTech startups founded by CUTM students raise ₹1.2 crore in seed funding at Demo Day.', category: 'Innovation', date: '2026-05-28', author: 'Incubation Cell', views: 7800 },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Ankit Sharma', role: 'SDE-II, Amazon', company: 'Amazon', quote: 'CUTM\'s project-based learning and dedicated placement cell transformed my career. I walked into Amazon\'s campus drive fully prepared — the mock interviews were a game changer.', rating: 5 },
  { id: 't2', name: 'Sushree Pattnaik', role: 'Data Scientist, Mu Sigma', company: 'Mu Sigma', quote: 'The ML labs and industry capstone at CUTM gave me real exposure before I even graduated. Faculty mentorship is world-class.', rating: 5 },
  { id: 't3', name: 'Rohan Kumar', role: 'Founder, AgriKart', company: 'AgriKart', quote: 'CUTM\'s incubation cell supported my agritech startup from idea to funding. The university truly lives its entrepreneurship-first philosophy.', rating: 4.5 },
  { id: 't4', name: 'Priyanka Sen', role: 'Consultant, Deloitte', company: 'Deloitte', quote: 'The campus, the labs, the events, the people — CUTM feels like a tech campus of the future. Proud to be a Centurion!', rating: 5 },
  { id: 't5', name: 'Vivek Agarwal', role: 'Systems Engineer, TCS', company: 'TCS', quote: 'From skill labs to soft-skills training, everything is designed for employability. 92% placement speaks for itself.', rating: 4.5 },
  { id: 't6', name: 'Nandini Sahu', role: 'IAS Aspirant', company: 'UPSC', quote: 'The library, research culture and faculty guidance at CUTM prepared me not just for campus placements but for bigger goals.', rating: 5 },
];

export const companies: Company[] = [
  { id: 'co1', name: 'Tata Consultancy Services', industry: 'IT Services', roles: ['System Engineer', 'Digital Engineer'], avgPackage: 450000, hiringYear: 2026 },
  { id: 'co2', name: 'Infosys', industry: 'IT Services', roles: ['DSE', 'SES'], avgPackage: 560000, hiringYear: 2026 },
  { id: 'co3', name: 'Amazon', industry: 'E-Commerce', roles: ['SDE', 'Area Manager'], avgPackage: 4200000, hiringYear: 2026 },
  { id: 'co4', name: 'Wipro', industry: 'IT Services', roles: ['Project Engineer'], avgPackage: 420000, hiringYear: 2026 },
  { id: 'co5', name: 'Deloitte', industry: 'Consulting', roles: ['Analyst', 'Consultant'], avgPackage: 900000, hiringYear: 2026 },
  { id: 'co6', name: 'Capgemini', industry: 'IT Services', roles: ['Analyst', 'Associate Consultant'], avgPackage: 450000, hiringYear: 2026 },
  { id: 'co7', name: 'Accenture', industry: 'Consulting', roles: ['ASE', 'Analyst'], avgPackage: 460000, hiringYear: 2026 },
  { id: 'co8', name: 'Mu Sigma', industry: 'Analytics', roles: ['Decision Scientist'], avgPackage: 600000, hiringYear: 2026 },
  { id: 'co9', name: 'Tech Mahindra', industry: 'IT Services', roles: ['Software Engineer'], avgPackage: 430000, hiringYear: 2026 },
  { id: 'co10', name: 'IBM', industry: 'Technology', roles: ['Associate Engineer'], avgPackage: 700000, hiringYear: 2026 },
  { id: 'co11', name: 'Oracle', industry: 'Technology', roles: ['App Developer'], avgPackage: 900000, hiringYear: 2026 },
  { id: 'co12', name: 'Nestlé', industry: 'FMCG', roles: ['Management Trainee'], avgPackage: 800000, hiringYear: 2026 },
  { id: 'co13', name: 'Cognizant', industry: 'IT Services', roles: ['Programmer Analyst'], avgPackage: 440000, hiringYear: 2026 },
  { id: 'co14', name: 'HDFC Bank', industry: 'Banking', roles: ['PO Trainee'], avgPackage: 900000, hiringYear: 2026 },
  { id: 'co15', name: 'Zomato', industry: 'Tech', roles: ['Analyst'], avgPackage: 700000, hiringYear: 2026 },
  { id: 'co16', name: 'Bosch', industry: 'Automotive', roles: ['Mechanical Design Engineer'], avgPackage: 650000, hiringYear: 2026 },
  { id: 'co17', name: 'Dr. Reddy\'s', industry: 'Pharma', roles: ['MR / QA'], avgPackage: 500000, hiringYear: 2026 },
  { id: 'co18', name: 'AgriKart', industry: 'Agri-Tech', roles: ['Product Trainee'], avgPackage: 400000, hiringYear: 2026 },
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Main Campus — Bhubaneswar', category: 'Campus', image: '/images/campus.jpg' },
  { id: 'g2', title: 'Modern Smart Classroom', category: 'Infrastructure', image: '/images/students.jpg' },
  { id: 'g3', title: 'Central Library', category: 'Campus', image: '/images/building.jpg' },
  { id: 'g4', title: 'Robotics & Automation Lab', category: 'Labs', image: '/images/fountain.jpg' },
  { id: 'g5', title: 'TechFest 2026 Hackathon', category: 'Events', image: '/images/hostel.jpg' },
  { id: 'g6', title: 'Sports Complex', category: 'Sports', image: '/images/students.jpg' },
  { id: 'g7', title: 'Hostel Blocks', category: 'Campus', image: '/images/hostel.jpg' },
  { id: 'g8', title: 'Convocation Day', category: 'Events', image: '/images/campus.jpg' },
  { id: 'g9', title: 'Agriculture Research Farm', category: 'Labs', image: '/images/fountain.jpg' },
  { id: 'g10', title: 'Innovation & Incubation Hub', category: 'Infrastructure', image: '/images/building.jpg' },
  { id: 'g11', title: 'Cultural Fest — Utopia', category: 'Events', image: '/images/students.jpg' },
  { id: 'g12', title: 'Industry Visit — TCS', category: 'Industry', image: '/images/campus.jpg' },
];

export const complaints: Complaint[] = [
  { id: 'cm1', studentId: 's1', category: 'Hostel', subject: 'AC not working in Block A-204', description: 'The air conditioner in room A-204 has not worked for 3 days. Summer heat is unbearable.', status: 'in-progress', createdAt: '2026-08-02', priority: 'high' },
  { id: 'cm2', studentId: 's1', category: 'WiFi / Network', subject: 'Intermittent WiFi in Library', description: 'WiFi drops frequently near section B of the library, making research work difficult.', status: 'open', createdAt: '2026-08-05', priority: 'medium' },
  { id: 'cm3', studentId: 's1', category: 'Mess / Food', subject: 'Mess menu not followed', description: 'Tuesday dinner was served without the listed item. Please enforce the menu.', status: 'resolved', createdAt: '2026-07-20', priority: 'low', resolution: 'Mess committee has been informed; menu compliance monitored from next week.' },
  { id: 'cm4', studentId: 's1', category: 'Transport', subject: 'Bus delay on Route 3', description: 'Route 3 bus is consistently 25+ minutes late in the morning.', status: 'open', createdAt: '2026-08-06', priority: 'medium' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', studentId: 's1', type: 'Medical', from: '2026-08-14', to: '2026-08-16', days: 3, reason: 'Dental surgery and recovery.', status: 'pending', appliedOn: '2026-08-06' },
  { id: 'l2', studentId: 's1', type: 'Personal', from: '2026-07-21', to: '2026-07-23', days: 3, reason: 'Family function — sister\'s wedding.', status: 'approved', appliedOn: '2026-07-15', approver: 'Dr. Satyabrata Das' },
  { id: 'l3', studentId: 's1', type: 'Medical', from: '2026-05-02', to: '2026-05-04', days: 3, reason: 'Viral fever.', status: 'approved', appliedOn: '2026-04-30', approver: 'Dr. Satyabrata Das' },
  { id: 'l4', studentId: 's1', type: 'Placement', from: '2026-06-12', to: '2026-06-13', days: 2, reason: 'Attending off-campus interview at Hyderabad.', status: 'rejected', appliedOn: '2026-06-05', approver: 'Dr. Anjali Mohapatra' },
];

export const leaveBalances: LeaveBalance[] = [
  { type: 'Medical', total: 10, used: 6, remaining: 4 },
  { type: 'Casual', total: 8, used: 5, remaining: 3 },
  { type: 'Earned', total: 12, used: 8, remaining: 4 },
];

export const forumThreads: ForumThread[] = [
  { id: 'ft1', title: 'How to approach the ML fraud detection assignment?', body: 'Stuck on feature engineering for the credit card dataset. The classes are heavily imbalanced. Any tips on handling this?', authorId: 's3', authorName: 'Rahul Behera', authorRole: 'student', category: 'Academics', createdAt: '2026-08-05T10:00:00Z', replies: [], upvotes: 14, tags: ['ML', 'Assignment'] },
  { id: 'ft2', title: 'Best resources for System Design interviews', body: 'Preparing for TCS Digital and product company interviews. What would you recommend for system design prep?', authorId: 's2', authorName: 'Priya Dash', authorRole: 'student', category: 'Placements', createdAt: '2026-08-04T15:30:00Z', replies: [], upvotes: 22, tags: ['Placements', 'System Design'] },
  { id: 'ft3', title: 'DevOps pipeline assignment — GitHub Actions vs GitLab CI', body: 'Which CI platform should I pick for the pipeline assignment? GitHub Actions seems easier with the free tier.', authorId: 's11', authorName: 'Ishita Bhoi', authorRole: 'student', category: 'Academics', createdAt: '2026-08-03T09:15:00Z', replies: [], upvotes: 9, tags: ['DevOps'] },
  { id: 'ft4', title: 'Hostel mess: any improvements this semester?', body: 'The new mess committee posted a survey. What changes would you like to see in the menu and timings?', authorId: 's5', authorName: 'Amit Kumar Sahoo', authorRole: 'student', category: 'Campus Life', createdAt: '2026-08-02T18:00:00Z', replies: [], upvotes: 31, tags: ['Hostel', 'Mess'] },
  { id: 'ft5', title: 'Looking for team members for InnovateX hackathon', body: 'Team of 2 (ML + backend). Need a frontend dev and a designer. 24hr hackathon on 5th Sept, prizes ₹10L.', authorId: 's4', authorName: 'Sneha Patnaik', authorRole: 'student', category: 'Events', createdAt: '2026-08-01T12:45:00Z', replies: [], upvotes: 17, tags: ['Hackathon', 'Team'] },
  { id: 'ft6', title: 'Faculty note: Mid-sem syllabus coverage', body: 'Covering graph algorithms this week. Please solve the practice set before the unit test on 18th Aug.', authorId: 'f1', authorName: 'Dr. Satyabrata Das', authorRole: 'faculty', category: 'Academics', createdAt: '2026-07-31T08:00:00Z', replies: [], upvotes: 40, tags: ['Announcement', 'DSA'] },
];

export const forumReplies: ForumReply[] = [
  { id: 'fr1', threadId: 'ft2', authorId: 'f3', authorName: 'Prof. Rajesh Kumar Patnaik', body: 'Start with the basics — load balancers, caching, DB sharding. Grokking System Design + Alex Xu\'s book are the gold standard. Also practice one design per week.', createdAt: '2026-08-04T17:00:00Z', upvotes: 12 },
  { id: 'fr2', threadId: 'ft1', authorId: 'f2', authorName: 'Dr. Anjali Mohapatra', body: 'For imbalanced data: try SMOTE for resampling, but also evaluate using precision-recall AUC instead of accuracy. Focus on the minority class recall — it\'s the business metric here.', createdAt: '2026-08-05T12:00:00Z', upvotes: 25 },
  { id: 'fr3', threadId: 'ft2', authorId: 's2', authorName: 'Priya Dash', body: 'There\'s a great mock interview drive organized by the Placement Cell this weekend. Sign up!', createdAt: '2026-08-04T18:20:00Z', upvotes: 8 },
];

export const feedbackItems: FeedbackItem[] = [
  { id: 'fb1', targetId: 'f2', targetName: 'Dr. Anjali Mohapatra', category: 'faculty', rating: 5, comment: 'Excellent teaching style with real-world examples. Doubt sessions are super helpful.', authorName: 'Priya Dash', createdAt: '2026-07-25' },
  { id: 'fb2', targetId: 'f1', targetName: 'Dr. Satyabrata Das', category: 'faculty', rating: 5, comment: 'Makes DSA interesting. Practice sets are challenging but very rewarding.', authorName: 'Ishita Bhoi', createdAt: '2026-07-24' },
  { id: 'fb3', targetId: 'sub4', targetName: 'Full Stack Development Lab', category: 'course', rating: 4, comment: 'Great hands-on labs, but would love more React advanced topics.', authorName: 'Rahul Behera', createdAt: '2026-07-22' },
  { id: 'fb4', targetId: 'f3', targetName: 'Prof. Rajesh Kumar Patnaik', category: 'faculty', rating: 4, comment: 'Very practical DevOps classes. CI/CD demos are excellent.', authorName: 'Sneha Patnaik', createdAt: '2026-07-20' },
];

export const chatChannels: ChatChannel[] = [
  { id: 'ch1', name: 'CSE — Semester 6 Group', type: 'group', members: ['s1', 's2', 's3', 's11'], lastMessage: 'Priya: Uploaded the DSA practice set!', lastActivity: '2026-08-06T11:30:00Z' },
  { id: 'ch2', name: 'ML Assignment Help', type: 'group', members: ['s1', 's3', 's2'], lastMessage: 'Rahul: Anyone tried SMOTE?', lastActivity: '2026-08-06T09:12:00Z' },
  { id: 'ch3', name: 'Dr. Anjali Mohapatra', type: 'direct', members: ['s1', 'f2'], lastMessage: 'You: Ma\'am, can I share my model eval script?', lastActivity: '2026-08-05T16:40:00Z' },
  { id: 'ch4', name: 'InnovateX Hackathon Team', type: 'group', members: ['s1', 's4', 's11'], lastMessage: 'Sneha: Meet at the Innovation Hub at 5', lastActivity: '2026-08-05T14:00:00Z' },
  { id: 'ch5', name: 'Prof. Rajesh Kumar Patnaik', type: 'direct', members: ['s1', 'f3'], lastMessage: 'You: Submitted the pipeline YAML, sir', lastActivity: '2026-08-04T10:22:00Z' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', channelId: 'ch1', senderId: 's2', senderName: 'Priya Dash', senderRole: 'student', text: 'Uploaded the DSA practice set! It\'s on the portal under Assignments.', createdAt: '2026-08-06T11:30:00Z', readBy: ['s1', 's3'] },
  { id: 'm2', channelId: 'ch1', senderId: 's1', senderName: 'Arpit Mohanty', senderRole: 'student', text: 'Thanks Priya! The graph section looks brutal but fun 😅', createdAt: '2026-08-06T11:32:00Z', readBy: ['s2', 's3'] },
  { id: 'm3', channelId: 'ch2', senderId: 's3', senderName: 'Rahul Behera', senderRole: 'student', text: 'Anyone tried SMOTE on the fraud dataset?', createdAt: '2026-08-06T09:12:00Z', readBy: ['s1'] },
  { id: 'm4', channelId: 'ch2', senderId: 's1', senderName: 'Arpit Mohanty', senderRole: 'student', text: 'Yes, improved recall from 0.71 → 0.84. Worth trying with XGBoost.', createdAt: '2026-08-06T09:15:00Z', readBy: ['s3'] },
  { id: 'm5', channelId: 'ch3', senderId: 's1', senderName: 'Arpit Mohanty', senderRole: 'student', text: 'Ma\'am, can I share my model evaluation script for review?', createdAt: '2026-08-05T16:40:00Z', readBy: [] },
  { id: 'm6', channelId: 'ch4', senderId: 's4', senderName: 'Sneha Patnaik', senderRole: 'student', text: 'Meet at the Innovation Hub at 5 to finalize the hackathon idea!', createdAt: '2026-08-05T14:00:00Z', readBy: ['s1'] },
];

export const demoUsers: User[] = [
  { id: 'u1', name: 'Arpit Mohanty', email: 'student@cutm.ac.in', role: 'student', department: 'Computer Science & Engineering', enrolledYear: 2021, program: 'B.Tech CSE', rollNumber: 'CUTM21001001' },
  { id: 'u2', name: 'Dr. Anjali Mohapatra', email: 'faculty@cutm.ac.in', role: 'faculty', department: 'Computer Science & Engineering' },
  { id: 'u3', name: 'Dr. Debasis Tripathy', email: 'admin@cutm.ac.in', role: 'admin', department: 'Administration' },
  { id: 'u4', name: 'Mr. Sanjay Panda', email: 'placement@cutm.ac.in', role: 'placement', department: 'Placement Cell' },
  { id: 'u5', name: 'Mrs. Laxmi Rath', email: 'librarian@cutm.ac.in', role: 'librarian', department: 'Central Library' },
];

export const attendanceSummary: AttendanceSummary[] = [
  { subjectId: 'sub1', subjectName: 'Machine Learning', total: 42, present: 40, percentage: 95.2 },
  { subjectId: 'sub2', subjectName: 'Cloud Computing & DevOps', total: 40, present: 37, percentage: 92.5 },
  { subjectId: 'sub3', subjectName: 'Data Structures & Algorithms', total: 38, present: 33, percentage: 86.8 },
  { subjectId: 'sub4', subjectName: 'Full Stack Development Lab', total: 30, present: 28, percentage: 93.3 },
  { subjectId: 'sub5', subjectName: 'Natural Language Processing', total: 36, present: 30, percentage: 83.3 },
  { subjectId: 'sub6', subjectName: 'Cyber Security Fundamentals', total: 34, present: 31, percentage: 91.2 },
];

export const attendanceTrend: AnalyticsPoint[] = [
  { label: 'Mar', value: 88 },
  { label: 'Apr', value: 90 },
  { label: 'May', value: 85 },
  { label: 'Jun', value: 92 },
  { label: 'Jul', value: 94 },
  { label: 'Aug', value: 91 },
];

export const performanceTrend: AnalyticsPoint[] = [
  { label: 'Sem 1', value: 7.4 },
  { label: 'Sem 2', value: 7.8 },
  { label: 'Sem 3', value: 8.0 },
  { label: 'Sem 4', value: 8.3 },
  { label: 'Sem 5', value: 8.7 },
  { label: 'Sem 6', value: 8.7 },
];

export const adminStats = {
  totalStudents: 18240,
  totalFaculty: 1215,
  totalDepartments: 14,
  revenue: 1865000000,
  feeCollected: 1287000000,
  pendingFees: 576000000,
  activeComplaints: 42,
  todayAttendance: 92.4,
  newAdmissions: 1280,
  placementRate: 92,
  highestPackage: 5200000,
  avgPackage: 780000,
  placedStudents: 4280,
  totalCompanies: 218,
};

export const studentGrowth: AnalyticsPoint[] = [
  { label: '2019', value: 9800 },
  { label: '2020', value: 11200 },
  { label: '2021', value: 12900 },
  { label: '2022', value: 14800 },
  { label: '2023', value: 16200 },
  { label: '2024', value: 17400 },
  { label: '2025', value: 18240 },
];

export const revenueTrend: AnalyticsPoint[] = [
  { label: 'Q1 25', value: 410, secondary: 380 },
  { label: 'Q2 25', value: 445, secondary: 395 },
  { label: 'Q3 25', value: 470, secondary: 420 },
  { label: 'Q4 25', value: 510, secondary: 440 },
  { label: 'Q1 26', value: 535, secondary: 465 },
  { label: 'Q2 26', value: 560, secondary: 490 },
];

export const genderDistribution = [
  { name: 'Male', value: 58 },
  { name: 'Female', value: 42 },
];

export const departmentWiseStudents: AnalyticsPoint[] = departments.slice(0, 8).map((d) => ({ label: d.shortName, value: d.students }));

export const placementTrend: AnalyticsPoint[] = [
  { label: '2019', value: 71 },
  { label: '2020', value: 76 },
  { label: '2021', value: 81 },
  { label: '2022', value: 84 },
  { label: '2023', value: 87 },
  { label: '2024', value: 90 },
  { label: '2025', value: 92 },
];

export const courseEnrollment: AnalyticsPoint[] = [
  { label: 'B.Tech CSE', value: 1480 },
  { label: 'B.Tech ECE', value: 640 },
  { label: 'B.Tech ME', value: 580 },
  { label: 'MBA', value: 720 },
  { label: 'B.Sc Agri', value: 950 },
  { label: 'B.Pharm', value: 430 },
  { label: 'BPT', value: 310 },
  { label: 'BA LL.B', value: 260 },
];

export const examAnalysis: AnalyticsPoint[] = [
  { label: 'O', value: 18 },
  { label: 'A+', value: 27 },
  { label: 'A', value: 22 },
  { label: 'B+', value: 15 },
  { label: 'B', value: 11 },
  { label: 'C', value: 5 },
  { label: 'F', value: 2 },
];

export const feeCollectionTrend: AnalyticsPoint[] = [
  { label: 'Apr', value: 12.4 },
  { label: 'May', value: 18.9 },
  { label: 'Jun', value: 15.2 },
  { label: 'Jul', value: 11.8 },
  { label: 'Aug', value: 9.4 },
  { label: 'Sep', value: 8.2 },
];

export const currentUser: User = {
  id: 'u1',
  name: 'Arpit Mohanty',
  email: 'student@cutm.ac.in',
  role: 'student',
  department: 'Computer Science & Engineering',
  enrolledYear: 2021,
  program: 'B.Tech CSE',
  rollNumber: 'CUTM21001001',
};

export const studentsInClass: StudentRecord[] = students.slice(0, 8);

export const facultySchedule: TimetableSlot[] = timetable.slice(0, 8);

export const facultyStats = {
  totalStudents: 186,
  todayLectures: 4,
  pendingAssignments: 6,
  attendanceToday: 91,
  averageRating: 4.8,
  coursesTeaching: 3,
  papersPublished: 62,
  leavesTaken: 6,
  leaveBalance: 18,
};

export const analyticsTrend: AnalyticsPoint[] = [
  { label: 'Mar', value: 18.2 },
  { label: 'Apr', value: 22.4 },
  { label: 'May', value: 19.8 },
  { label: 'Jun', value: 26.1 },
  { label: 'Jul', value: 24.5 },
  { label: 'Aug', value: 28.9 },
];

export const feeStatusData = [
  { name: 'Paid', value: 62, color: '#22C55E' },
  { name: 'Partial', value: 24, color: '#F59E0B' },
  { name: 'Pending', value: 14, color: '#EF4444' },
];

export const feeCollections = [
  { id: 'fc1', studentName: 'Rahul Sharma', rollNumber: 'CUTM23001234', course: 'B.Tech CSE', amount: 135000, method: 'UPI', status: 'Completed' },
  { id: 'fc2', studentName: 'Priya Nanda', rollNumber: 'CUTM23002345', course: 'B.Tech ECE', amount: 125000, method: 'Net Banking', status: 'Completed' },
  { id: 'fc3', studentName: 'Aman Verma', rollNumber: 'CUTM23003456', course: 'MCA', amount: 110000, method: 'Card', status: 'Completed' },
  { id: 'fc4', studentName: 'Sneha Patnaik', rollNumber: 'CUTM23004567', course: 'B.Tech CSE', amount: 135000, method: 'UPI', status: 'Completed' },
  { id: 'fc5', studentName: 'Vikram Singh', rollNumber: 'CUTM23005678', course: 'MBA', amount: 145000, method: 'Demand Draft', status: 'Processing' },
  { id: 'fc6', studentName: 'Ananya Das', rollNumber: 'CUTM23006789', course: 'B.Pharm', amount: 98000, method: 'UPI', status: 'Completed' },
];

export const placementsByDept: AnalyticsPoint[] = [
  { label: 'CSE', value: 94 },
  { label: 'ECE', value: 88 },
  { label: 'MECH', value: 82 },
  { label: 'CIVIL', value: 79 },
  { label: 'MBA', value: 92 },
  { label: 'MCA', value: 93 },
];

export const libraryBooks: LibraryBook[] = books;

export interface IssueRow {
  id: string;
  bookTitle: string;
  memberName: string;
  issueDate: string;
  dueDate: string;
  status: 'Issued' | 'Overdue' | 'Returned';
  fine: number;
}

export const issueRecords: IssueRow[] = [
  { id: 'ir1', bookTitle: 'Introduction to Algorithms', memberName: 'Priya Dash', issueDate: '2026-07-25', dueDate: '2026-08-08', status: 'Issued', fine: 0 },
  { id: 'ir2', bookTitle: 'Machine Learning with Python', memberName: 'Rahul Behera', issueDate: '2026-07-20', dueDate: '2026-08-03', status: 'Issued', fine: 0 },
  { id: 'ir3', bookTitle: 'Deep Learning', memberName: 'Sneha Patnaik', issueDate: '2026-07-01', dueDate: '2026-07-15', status: 'Overdue', fine: 120 },
  { id: 'ir4', bookTitle: 'Clean Code', memberName: 'Amit Kumar Sahoo', issueDate: '2026-07-28', dueDate: '2026-08-11', status: 'Issued', fine: 0 },
  { id: 'ir5', bookTitle: 'Operating System Concepts', memberName: 'Ishita Bhoi', issueDate: '2026-06-10', dueDate: '2026-06-24', status: 'Returned', fine: 0 },
  { id: 'ir6', bookTitle: 'Design Patterns', memberName: 'Dr. Anjali Mohapatra', issueDate: '2026-07-15', dueDate: '2026-08-14', status: 'Issued', fine: 0 },
];

export interface PlacementRow {
  id: string;
  studentName: string;
  rollNumber: string;
  company: string;
  role: string;
  ctc: number;
  date: string;
  status: 'Offered' | 'Placed' | 'Interview' | 'Not Placed';
}

export const placements: PlacementRow[] = [
  { id: 'p1', studentName: 'Arpit Mohanty', rollNumber: 'CUTM21001001', company: 'Tata Consultancy Services', role: 'System Engineer', ctc: 7.2, date: '01 Aug 2026', status: 'Offered' },
  { id: 'p2', studentName: 'Priya Dash', rollNumber: 'CUTM21001002', company: 'Amazon', role: 'SDE-1', ctc: 42, date: '28 Jul 2026', status: 'Offered' },
  { id: 'p3', studentName: 'Rahul Behera', rollNumber: 'CUTM21001003', company: 'Infosys', role: 'DSE', ctc: 8.4, date: '25 Jul 2026', status: 'Placed' },
  { id: 'p4', studentName: 'Sneha Patnaik', rollNumber: 'CUTM21002001', company: 'Deloitte', role: 'Analyst', ctc: 12, date: '22 Jul 2026', status: 'Offered' },
  { id: 'p5', studentName: 'Amit Kumar Sahoo', rollNumber: 'CUTM21003001', company: 'Bosch', role: 'Design Engineer', ctc: 9.5, date: '18 Jul 2026', status: 'Placed' },
  { id: 'p6', studentName: 'Sonali Mahapatra', rollNumber: 'CUTM21006001', company: 'HDFC Bank', role: 'PO Trainee', ctc: 11, date: '15 Jul 2026', status: 'Offered' },
  { id: 'p7', studentName: 'Bikash Rout', rollNumber: 'CUTM21007001', company: 'AgriKart', role: 'Product Trainee', ctc: 5.5, date: '10 Jul 2026', status: 'Placed' },
  { id: 'p8', studentName: 'Sushree Jena', rollNumber: 'CUTM21008001', company: 'Dr. Reddy\'s', role: 'QA Officer', ctc: 8, date: '08 Jul 2026', status: 'Offered' },
];

