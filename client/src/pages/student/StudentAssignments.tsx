import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, DataTable, type Column, EmptyState } from '../../components/ui';
import { assignments, subjects } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { exportCSV } from '../../utils';

interface AssignmentRow {
  id: string;
  title: string;
  subjectName: string;
  dueDate: string;
  totalMarks: number;
  status: string;
  obtained?: number;
}

export default function StudentAssignments() {
  const [rows, setRows] = useState<AssignmentRow[]>(
    assignments.map((a) => ({
      id: a.id,
      title: a.title,
      subjectName: subjects.find((s) => s.id === a.subjectId)?.name ?? '—',
      dueDate: a.dueDate,
      totalMarks: a.totalMarks,
      status: a.status,
      obtained: a.obtainedMarks,
    })),
  );
  const [submitFor, setSubmitFor] = useState<AssignmentRow | null>(null);
  const [file, setFile] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!file) return toast.error('Please attach your solution file');
    setRows((r) => r.map((x) => (x.id === submitFor?.id ? { ...x, status: 'submitted' } : x)));
    toast.success('Assignment submitted successfully!');
    setSubmitFor(null);
    setFile(null);
  };

  const columns: Column<AssignmentRow>[] = [
    { key: 'title', header: 'Assignment', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'subjectName', header: 'Subject', hideBelow: 'md' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'totalMarks', header: 'Marks', align: 'center', render: (r) => <Badge tone="primary">{r.totalMarks}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    {
      key: 'obtained',
      header: 'Action',
      render: (r) =>
        r.status === 'graded' ? (
          <span className="font-bold text-success">{r.obtained}/{r.totalMarks}</span>
        ) : r.status === 'submitted' ? (
          <Badge tone="info">Submitted</Badge>
        ) : (
          <Button size="xs" variant="primary" onClick={() => setSubmitFor(r)}>Submit</Button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle={`${rows.filter((r) => r.status === 'pending' || r.status === 'overdue').length} pending · 2 graded this semester`}
        crumbs={[{ label: 'Student' }, { label: 'Assignments' }]}
        actions={
          <Button variant="outline" onClick={() => exportCSV('assignments.csv', rows)}>
            Export List
          </Button>
        }
      />

      <DataTable
        data={rows}
        columns={columns}
        pageSize={10}
        searchKeys={['title', 'subjectName']}
        searchPlaceholder="Search assignments…"
        emptyTitle="No assignments"
      />

      <Modal
        open={!!submitFor}
        onClose={() => { setSubmitFor(null); setFile(null); }}
        title="Submit Assignment"
        subtitle={submitFor?.title}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-dark-200 p-8 text-center transition-colors hover:border-primary-400 dark:border-dark-700">
            <input type="file" id="assignment-file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
            <label htmlFor="assignment-file" className="flex cursor-pointer flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                <UploadCloud className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium">{file ?? 'Click to upload PDF / ZIP / DOCX (max 10 MB)'}</span>
            </label>
          </div>
          {file && <p className="text-xs text-success">✓ {file} attached</p>}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setSubmitFor(null)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!file}>Submit Assignment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
