import { useState } from 'react';
import { PageHeader, Card, Badge, ProgressBar, TrendChart, ChartCard, DataTable, type Column } from '../../components/ui';
import { attendanceSummary, attendanceTrend, subjects, students } from '../../data/mock';
import { cn, percentColor } from '../../utils';

export default function StudentAttendance() {
  const [tab, setTab] = useState<'summary' | 'record'>('summary');
  const overall = Math.round(attendanceSummary.reduce((s, a) => s + a.percentage, 0) / attendanceSummary.length);

  const recordData = students.slice(0, 5).map((s) => ({
    id: s.id,
    date: '2026-08-06',
    subject: subjects.find((sub) => sub.id === 'sub1')?.name ?? 'ML',
    status: 'Present' as const,
    by: 'Dr. Anjali Mohapatra',
  }));

  const columns: Column<(typeof recordData)[number]>[] = [
    { key: 'date', header: 'Date' },
    { key: 'subject', header: 'Subject' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={r.status === 'Present' ? 'success' : 'danger'}>{r.status}</Badge> },
    { key: 'by', header: 'Marked By' },
  ];

  return (
    <div>
      <PageHeader title="Attendance" subtitle={`Overall attendance: ${overall}% · Minimum required: 75%`} crumbs={[{ label: 'Student' }, { label: 'Attendance' }]} />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl bg-dark-100/70 p-1 dark:bg-dark-800/70">
          {(['summary', 'record'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn('rounded-lg px-4 py-2 text-sm font-medium transition-all', tab === t ? 'bg-white text-primary-700 shadow-soft dark:bg-dark-900 dark:text-primary-300' : 'text-dark-500 dark:text-dark-400')}>
              {t === 'summary' ? 'Subject Summary' : 'Daily Record'}
            </button>
          ))}
        </div>
        {overall >= 75 ? <Badge tone="success" className="px-3 py-1.5">Above minimum — eligible for exams</Badge> : <Badge tone="danger" className="px-3 py-1.5">Below 75% — exam eligibility at risk</Badge>}
      </div>

      {tab === 'summary' ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Attendance Trend" subtitle="Monthly attendance percentage">
            <TrendChart data={attendanceTrend} color="#2563EB" />
          </ChartCard>
          <div className="space-y-3">
            {attendanceSummary.map((a) => (
              <Card key={a.subjectId} className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{a.subjectName}</span>
                  <span className={cn('font-bold', percentColor(a.percentage))}>{a.percentage}%</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <ProgressBar value={a.percentage} color={a.percentage >= 75 ? '#22C55E' : '#EF4444'} className="flex-1" />
                  <span className="shrink-0 text-xs text-dark-400">{a.present}/{a.total} classes</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          data={recordData}
          columns={columns}
          pageSize={10}
          searchKeys={['subject', 'status']}
          searchPlaceholder="Search records…"
        />
      )}
    </div>
  );
}
