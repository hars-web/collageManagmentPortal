import { useMemo, useState } from 'react';
import { PageHeader, Card, Badge, DataTable, type Column, ChartCard, PieChartComponent, BarChartComponent } from '../../components/ui';
import { results } from '../../data/mock';
import { downloadFile, gradePoints, getGrade } from '../../utils';
import { Download } from 'lucide-react';

export default function StudentResults() {
  const [semester, setSemester] = useState('All');
  const filtered = results.filter((r) => semester === 'All' || r.semester === Number(semester));

  const sgpa = useMemo(() => {
    const totalCredits = filtered.reduce((s, r) => s + r.credits, 0);
    const weighted = filtered.reduce((s, r) => s + gradePoints(r.grade) * r.credits, 0);
    return totalCredits ? (weighted / totalCredits).toFixed(2) : '0';
  }, [filtered]);

  const grades = useMemo(() => {
    const map: Record<string, number> = {};
    results.forEach((r) => {
      map[r.grade] = (map[r.grade] ?? 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  const columns: Column<(typeof filtered)[number]>[] = [
    { key: 'semester', header: 'Sem', render: (r) => <Badge tone="neutral">Sem {r.semester}</Badge> },
    { key: 'subjectCode', header: 'Code', render: (r) => <span className="font-semibold text-primary-600 dark:text-primary-400">{r.subjectCode}</span> },
    { key: 'subjectName', header: 'Subject' },
    { key: 'internalMarks', header: 'Internal', align: 'center' },
    { key: 'externalMarks', header: 'External', align: 'center' },
    { key: 'totalMarks', header: 'Total', align: 'center', render: (r) => <span className="font-bold">{r.totalMarks}</span> },
    { key: 'grade', header: 'Grade', align: 'center', render: (r) => <Badge tone={r.grade === 'O' || r.grade === 'A+' ? 'success' : r.grade === 'F' ? 'danger' : 'primary'}>{r.grade}</Badge> },
    { key: 'result', header: 'Result', render: (r) => <Badge tone={r.result === 'PASS' ? 'success' : 'danger'}>{r.result}</Badge> },
  ];

  const header = (
    <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input w-44" aria-label="Filter by semester">
      <option value="All">All Semesters</option>
      {[3, 4, 5].map((s) => (
        <option key={s} value={s}>Semester {s}</option>
      ))}
    </select>
  );

  return (
    <div>
      <PageHeader
        title="Results"
        subtitle={`Current CGPA: 8.7 · ${semester === 'All' ? 'All semesters' : `Semester ${semester}`} SGPA: ${sgpa}`}
        crumbs={[{ label: 'Student' }, { label: 'Results' }]}
        actions={
          <button className="btn-outline" onClick={() => downloadFile('result-transcript.txt', results.map((r) => `${r.semester}|${r.subjectCode}|${r.subjectName}|${r.totalMarks}|${r.grade}|${r.result}`).join('\n'))}>
            <Download className="h-4 w-4" /> Download Transcript
          </button>
        }
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Semester SGPA Trend" subtitle="Performance across semesters">
          <BarChartComponent
            data={[3, 4, 5].map((s) => {
              const rows = results.filter((r) => r.semester === s);
              const tc = rows.reduce((x, r) => x + r.credits, 0);
              const sg = tc ? (rows.reduce((x, r) => x + gradePoints(r.grade) * r.credits, 0) / tc) : 0;
              return { label: `Sem ${s}`, value: Number(sg.toFixed(1)) };
            })}
            color="#14B8A6"
          />
        </ChartCard>
        <ChartCard title="Grade Distribution" subtitle="All semesters">
          <PieChartComponent data={grades} height={200} centerValue="100%" centerLabel="Pass rate" />
        </ChartCard>
        <Card className="p-5">
          <h3 className="text-sm font-semibold">Scorecard</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: 'Credits earned', value: `${results.reduce((s, r) => s + r.credits, 0)}` },
              { label: 'Subjects cleared', value: `${results.length} / ${results.length}` },
              { label: 'Current CGPA', value: '8.7' },
              { label: 'Backlogs', value: '0' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-xl bg-dark-50 px-4 py-3 dark:bg-dark-800">
                <span className="text-sm text-dark-500 dark:text-dark-400">{s.label}</span>
                <span className="text-sm font-bold">{s.value}</span>
              </div>
            ))}
            <div className="rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-center text-white">
              <p className="text-[11px] uppercase tracking-wide opacity-80">Projected CGPA after Sem 6</p>
              <p className="font-display text-3xl font-bold">9.0</p>
            </div>
          </div>
        </Card>
      </div>

      <DataTable data={filtered} columns={columns} pageSize={10} searchKeys={['subjectName', 'subjectCode']} filters={header} emptyTitle="No results for this filter" />
    </div>
  );
}
