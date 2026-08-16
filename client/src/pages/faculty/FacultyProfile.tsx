import { PageHeader, Card, Badge, SimpleList, Avatar } from '../../components/ui';
import { facultyMembers } from '../../data/mock';
import { exportCSV } from '../../utils';

export default function FacultyProfile() {
  const f = facultyMembers[1];

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Faculty record · Computer Science & Engineering"
        crumbs={[{ label: 'Faculty' }, { label: 'Profile' }]}
        actions={<button className="btn-outline" onClick={() => exportCSV('faculty-profile.csv', [{ Field: 'Name', Value: f.name }, { Field: 'Designation', Value: f.designation }, { Field: 'Experience', Value: `${f.experienceYears} years` }])}>Export</button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-secondary-500 via-primary-600 to-primary-700" />
          <div className="-mt-12 flex flex-col items-center px-5 pb-5">
            <Avatar name={f.name} size="xl" className="ring-4 ring-white dark:ring-dark-900" />
            <h2 className="mt-3 text-lg font-bold">{f.name}</h2>
            <p className="text-sm text-primary-600 dark:text-primary-400">{f.designation}</p>
            <div className="mt-3 flex gap-2">
              <Badge tone="success" dot>Active</Badge>
              <Badge tone="primary">{f.qualification}</Badge>
            </div>
            <div className="mt-5 w-full space-y-2 rounded-2xl bg-dark-50 p-4 text-sm dark:bg-dark-800">
              <p className="flex items-center justify-between"><span className="text-dark-400">Publications</span><span className="font-bold">{f.publications}</span></p>
              <p className="flex items-center justify-between"><span className="text-dark-400">Experience</span><span className="font-bold">{f.experienceYears} years</span></p>
              <p className="flex items-center justify-between"><span className="text-dark-400">Teaching Rating</span><span className="font-bold text-accent-500">★ {f.rating}</span></p>
              <p className="flex items-center justify-between"><span className="text-dark-400">Employee ID</span><span className="font-bold">CUTM-F-0241</span></p>
            </div>
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="border-b border-dark-100 p-5 dark:border-dark-800">
              <h3 className="text-base font-semibold">Contact & Employment</h3>
            </div>
            <div className="p-5">
              <SimpleList
                items={[
                  { label: 'Full Name', value: f.name },
                  { label: 'Designation', value: f.designation },
                  { label: 'Department', value: 'Computer Science & Engineering' },
                  { label: 'Specialisation', value: f.specialization, tone: 'primary' },
                  { label: 'Email', value: f.email },
                  { label: 'Phone', value: f.phone },
                  { label: 'Joined', value: 'Aug 2015' },
                  { label: 'Cabin', value: 'CSE Block · Cabin 214' },
                ]}
              />
            </div>
          </Card>

          <Card>
            <div className="border-b border-dark-100 p-5 dark:border-dark-800">
              <h3 className="text-base font-semibold">Teaching Load — Semester 6</h3>
            </div>
            <div className="divide-y divide-dark-100 dark:divide-dark-800">
              {[
                { code: 'CSE601', name: 'Machine Learning', type: 'Core', hours: 4, students: 64 },
                { code: 'CSE605', name: 'Natural Language Processing', type: 'Elective', hours: 3, students: 58 },
                { code: 'CSE610', name: 'ML Lab (Batch A)', type: 'Lab', hours: 4, students: 64 },
              ].map((c) => (
                <div key={c.code} className="flex items-center justify-between px-5 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">{c.code}</span>
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={c.type === 'Lab' ? 'secondary' : c.type === 'Elective' ? 'accent' : 'neutral'}>{c.type}</Badge>
                    <span className="hidden text-xs text-dark-400 sm:block">{c.hours} hrs/wk · {c.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
