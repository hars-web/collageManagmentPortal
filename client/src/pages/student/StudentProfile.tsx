import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, Download, GraduationCap, Mail, MapPin, Phone, UserRound } from 'lucide-react';
import { PageHeader, Card, CardBody, CardHeader, Badge, Avatar, SimpleList, Button } from '../../components/ui';
import { currentUser, departments, students } from '../../data/mock';
import { exportCSV } from '../../utils';

export default function StudentProfile() {
  const student = students[0];
  const dept = departments.find((d) => d.id === student.departmentId);
  const data = { ...currentUser, rollNumber: student.rollNumber, batch: student.batch, phone: student.phone, department: dept?.name, cgpa: student.cgpa, attendance: student.attendance, hostel: 'Block A, Room A-204' };

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Your verified university record"
        crumbs={[{ label: 'Student' }, { label: 'Profile' }]}
        actions={
          <>
            <Button variant="outline" onClick={() => exportCSV('profile.csv', [{ Field: 'Name', Value: data.name }, { Field: 'Roll', Value: data.rollNumber }, { Field: 'CGPA', Value: String(data.cgpa) }])}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button><Camera className="h-4 w-4" /> Update Photo</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500" />
          <div className="-mt-12 flex flex-col items-center px-5 pb-5">
            <Avatar name={data.name} size="xl" className="ring-4 ring-white dark:ring-dark-900" />
            <h2 className="mt-3 text-lg font-bold">{data.name}</h2>
            <p className="text-sm text-dark-400">{data.program} · Batch {data.batch}</p>
            <div className="mt-3 flex gap-2">
              <Badge tone="primary">{data.rollNumber}</Badge>
              <Badge tone="success">Active</Badge>
            </div>
            <div className="mt-5 w-full rounded-2xl bg-dark-50 p-4 text-center dark:bg-dark-800">
              <QRCodeSVG value={JSON.stringify({ id: student.id, roll: data.rollNumber, name: data.name })} size={110} className="mx-auto rounded-lg bg-white p-2" />
              <p className="mt-2 text-[11px] font-medium text-dark-400">Digital Student ID — scan for campus access</p>
              <button className="mt-3 btn-primary px-4 py-1.5 text-xs">Download ID Card</button>
            </div>
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <h3 className="text-base font-semibold">Personal Information</h3>
                <p className="text-xs text-dark-400">Verified by the university registrar</p>
              </div>
              <Badge tone="success" dot>Verified</Badge>
            </CardHeader>
            <CardBody>
              <SimpleList
                items={[
                  { label: 'Full Name', value: data.name },
                  { label: 'Roll Number', value: data.rollNumber },
                  { label: 'Email', value: data.email, tone: 'primary' },
                  { label: 'Phone', value: data.phone },
                  { label: 'Department', value: data.department ?? '—' },
                  { label: 'Programme', value: data.program ?? '—' },
                  { label: 'Semester', value: `Semester ${student.semester}` },
                  { label: 'Batch', value: data.batch },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <h3 className="text-base font-semibold">Academic Snapshot</h3>
                <p className="text-xs text-dark-400">Updated after every examination cycle</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: GraduationCap, label: 'CGPA', value: String(data.cgpa) },
                  { icon: UserRound, label: 'Attendance', value: `${data.attendance}%` },
                  { icon: MapPin, label: 'Hostel', value: data.hostel },
                  { icon: Phone, label: 'Backlogs', value: '0' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-dark-50 p-4 text-center dark:bg-dark-800">
                    <s.icon className="mx-auto h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <p className="mt-2 text-lg font-bold">{s.value}</p>
                    <p className="text-[11px] text-dark-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <h3 className="text-base font-semibold">Quick Links</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Attendance', to: '/student/attendance', icon: UserRound },
                  { label: 'Results', to: '/student/results', icon: GraduationCap },
                  { label: 'Fee Details', to: '/student/fees', icon: Mail },
                  { label: 'Library', to: '/student/library', icon: Phone },
                  { label: 'Certificates', to: '/student/certificates', icon: UserRound },
                  { label: 'Placements', to: '/student/placements', icon: GraduationCap },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="card-hover flex items-center gap-2.5 rounded-xl border border-dark-100 px-3.5 py-3 text-sm font-medium transition-colors hover:border-primary-300 dark:border-dark-800">
                    <l.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" /> {l.label}
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
