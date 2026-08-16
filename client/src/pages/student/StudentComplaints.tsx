import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { MessageSquarePlus } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Select, Input, Textarea, DataTable, type Column, StatCard, Modal } from '../../components/ui';
import { complaints } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { timeAgo } from '../../utils';

const schema = z.object({
  category: z.string().min(1, 'Select a category'),
  subject: z.string().min(5, 'Subject too short'),
  description: z.string().min(20, 'Describe the issue in detail (min 20 chars)'),
  priority: z.string().min(1, 'Select priority'),
});

type FormValues = z.infer<typeof schema>;

export default function StudentComplaints() {
  const [rows, setRows] = useState(complaints);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = (values: FormValues) => {
    setRows((r) => [
      { id: `cm${Date.now()}`, studentId: 's1', category: values.category, subject: values.subject, description: values.description, status: 'open', createdAt: new Date().toISOString(), priority: values.priority as 'low' | 'medium' | 'high' },
      ...r,
    ]);
    toast.success('Complaint registered — tracking ID generated');
    setOpen(false);
    reset();
  };

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'subject', header: 'Subject', render: (r) => <span className="font-medium">{r.subject}</span> },
    { key: 'category', header: 'Category', render: (r) => <Badge tone="neutral">{r.category}</Badge> },
    { key: 'priority', header: 'Priority', render: (r) => <Badge tone={r.priority === 'high' ? 'danger' : r.priority === 'medium' ? 'accent' : 'neutral'}>{r.priority}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: 'createdAt', header: 'Raised', hideBelow: 'md', render: (r) => timeAgo(r.createdAt) },
    { key: 'resolution', header: 'Resolution', hideBelow: 'lg', render: (r) => (r.resolution ? <span className="line-clamp-1 max-w-[200px] text-xs">{r.resolution}</span> : <span className="text-dark-300 dark:text-dark-600">—</span>) },
  ];

  return (
    <div>
      <PageHeader
        title="Complaint Portal"
        subtitle="Report issues — tracked to resolution, average 48 hours"
        crumbs={[{ label: 'Student' }, { label: 'Complaints' }]}
        actions={<Button onClick={() => setOpen(true)}><MessageSquarePlus className="h-4 w-4" /> Raise Complaint</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Open" value={rows.filter((r) => r.status === 'open').length} icon={<MessageSquarePlus className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="In Progress" value={rows.filter((r) => r.status === 'in-progress').length} icon={<MessageSquarePlus className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Resolved" value={rows.filter((r) => r.status === 'resolved').length} icon={<MessageSquarePlus className="h-5 w-5" />} iconClass="success" format="plain" />
        <StatCard label="Avg. Resolution" value="36h" icon={<MessageSquarePlus className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['subject', 'category', 'description']} emptyTitle="No complaints raised" />

      <Modal open={open} onClose={() => setOpen(false)} title="Raise a Complaint" subtitle="Track progress from your dashboard">
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Category" error={errors.category?.message} {...register('category')}>
              <option value="">Select category</option>
              <option>Hostel</option>
              <option>WiFi / Network</option>
              <option>Mess / Food</option>
              <option>Transport</option>
              <option>Classroom / Lab</option>
              <option>Library</option>
              <option>Fees / Accounts</option>
              <option>Safety & Security</option>
              <option>Other</option>
            </Select>
            <Select label="Priority" error={errors.priority?.message} {...register('priority')}>
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High (urgent)</option>
            </Select>
          </div>
          <Input label="Subject" placeholder="Short summary of the issue" error={errors.subject?.message} {...register('subject')} />
          <Textarea label="Description" placeholder="Describe the problem with location and timings…" error={errors.description?.message} {...register('description')} />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Complaint</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
