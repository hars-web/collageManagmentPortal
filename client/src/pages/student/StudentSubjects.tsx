import { PageHeader, Card, Badge, DataTable, type Column, StatCard } from '../../components/ui';
import { subjects, facultyMembers } from '../../data/mock';
import { BookOpen, Clock, FileText, Users } from 'lucide-react';

export default function StudentSubjects() {
  const rows = subjects.slice(0, 6).map((s) => {
    const faculty = facultyMembers.find((f) => f.id === s.facultyId);
    return { ...s, facultyName: faculty?.name ?? '—', category: s.category };
  });

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-semibold text-primary-600 dark:text-primary-400">{r.code}</span> },
    { key: 'name', header: 'Subject', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'facultyName', header: 'Faculty', hideBelow: 'md' },
    { key: 'credits', header: 'Credits', render: (r) => <Badge tone="primary">{r.credits}</Badge>, align: 'center' },
    { key: 'hoursPerWeek', header: 'Hrs/Week', align: 'center', hideBelow: 'sm' },
    { key: 'category', header: 'Type', render: (r) => <Badge tone={r.category === 'lab' ? 'secondary' : r.category === 'elective' ? 'accent' : 'neutral'}>{r.category}</Badge> },
  ];

  return (
    <div>
      <PageHeader title="My Subjects" subtitle="Semester 6 · 6 subjects · 21 credits" crumbs={[{ label: 'Student' }, { label: 'Subjects' }]} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Subjects Enrolled" value={rows.length} icon={<BookOpen className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="Total Credits" value={rows.reduce((s, r) => s + r.credits, 0)} icon={<FileText className="h-5 w-5" />} iconClass="secondary" format="plain" />
        <StatCard label="Weekly Hours" value={rows.reduce((s, r) => s + r.hoursPerWeek, 0)} icon={<Clock className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Faculty Mentors" value={new Set(rows.map((r) => r.facultyId)).size} icon={<Users className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <DataTable
        data={rows}
        columns={columns}
        pageSize={10}
        searchKeys={['name', 'code', 'facultyName']}
        searchPlaceholder="Search subjects…"
        onRowClick={(r) => window.open(`/student/subjects`, '_self')}
      />
    </div>
  );
}
