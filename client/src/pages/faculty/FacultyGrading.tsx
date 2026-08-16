import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Check, Download, Eye } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Input, Avatar } from '../../components/ui';
import { students } from '../../data/mock';
import { cn, downloadFile } from '../../utils';

export default function FacultyGrading() {
  const [grades, setGrades] = useState<Record<string, string>>({ 'S101': '92', 'S102': '87', 'S103': '78', 'S104': '95', 'S105': '66' });
  const [tab, setTab] = useState('ML Assignment 4');

  const classStudents = students.slice(0, 8);
  const marks = Object.values(grades).map(Number).filter((n) => !isNaN(n));
  const avg = marks.length ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1) : '—';

  return (
    <div>
      <PageHeader
        title="Grading"
        subtitle="Grade submissions and publish marks"
        crumbs={[{ label: 'Faculty' }, { label: 'Grading' }]}
        actions={
          <button className="btn-outline" onClick={() => downloadFile('grading-sheet.csv', 'Roll,Name,Marks\nS101,Rahul,92')}>
            <Download className="h-4 w-4" /> Export Sheet
          </button>
        }
      />

      <Card className="mb-5 flex flex-wrap items-center gap-2 p-3">
        {['ML Assignment 4', 'NLP Assignment 3', 'ML Lab Task 9'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', tab === t ? 'bg-primary-600 text-white' : 'bg-dark-50 text-dark-500 hover:bg-dark-100 dark:bg-dark-800 dark:text-dark-300')}>
            {t}
          </button>
        ))}
        <span className="ml-auto px-3 text-sm text-dark-400">Avg: <b className="text-primary-600 dark:text-primary-400">{avg}%</b> · Graded {Object.keys(grades).length}/8</span>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[720px]">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Submission</th>
              <th>Time</th>
              <th className="text-center">Marks / 100</th>
              <th className="text-center">Grade</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((s) => {
              const mark = grades[s.id];
              const graded = mark !== undefined && mark !== '';
              const g = (m: number) => (m >= 90 ? 'A+' : m >= 80 ? 'A' : m >= 70 ? 'B+' : m >= 60 ? 'B' : m >= 50 ? 'C' : 'F');
              return (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size="sm" />
                      <p className="font-medium">{s.name}</p>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{s.rollNumber}</td>
                  <td className="text-sm text-dark-500 dark:text-dark-300">submitted_ml4.pdf</td>
                  <td className="text-xs text-dark-400">2d ago</td>
                  <td className="text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="input w-24 text-center font-semibold"
                      placeholder="—"
                      value={mark ?? ''}
                      onChange={(e) => setGrades((g) => ({ ...g, [s.id]: e.target.value }))}
                    />
                  </td>
                  <td className="text-center">
                    {graded ? <Badge tone={Number(mark) >= 80 ? 'success' : Number(mark) >= 60 ? 'accent' : 'danger'}>{g(Number(mark))}</Badge> : <span className="text-xs text-dark-300">—</span>}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <button className="btn-outline px-2.5 py-1.5 text-xs" onClick={() => toast.success('Submission preview opened')}><Eye className="h-3.5 w-3.5" /></button>
                      <button
                        className={cn('px-2.5 py-1.5 text-xs', graded ? 'btn-success' : 'btn-primary')}
                        onClick={() => {
                          if (!mark || mark === '' || isNaN(Number(mark))) return toast.error('Enter marks first');
                          toast.success(`${s.name} graded ${mark}% (${g(Number(mark))})`);
                        }}
                      >
                        <Check className="h-3.5 w-3.5" /> {graded ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-dark-100 bg-white p-5 dark:border-dark-800 dark:bg-dark-900">
        <p className="text-sm text-dark-400"><b className="text-dark-600 dark:text-dark-200">{Object.keys(grades).length}/8</b> graded · marks visible to students after publication</p>
        <Button onClick={() => toast.success('Grades published to all students!')}>Publish Grades</Button>
      </div>
    </div>
  );
}
