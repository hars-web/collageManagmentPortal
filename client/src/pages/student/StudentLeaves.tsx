import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { CalendarPlus, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Input, Select, Textarea, DataTable, type Column, StatCard, Modal } from '../../components/ui';
import { leaveRequests, leaveBalances } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { formatDate } from '../../utils';

const schema = z
  .object({
    type: z.string().min(1, 'Select leave type'),
    from: z.string().min(1, 'Required'),
    to: z.string().min(1, 'Required'),
    reason: z.string().min(10, 'Please explain the reason (min 10 characters)'),
  })
  .refine((d) => d.to >= d.from, { message: 'End date must be after start date', path: ['to'] });

type FormValues = z.infer<typeof schema>;

export default function StudentLeaves() {
  const [rows, setRows] = useState(leaveRequests);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = (values: FormValues) => {
    const days = Math.ceil((new Date(values.to).getTime() - new Date(values.from).getTime()) / 86400000) + 1;
    setRows((r) => [
      { id: `l${Date.now()}`, studentId: 's1', type: values.type, from: values.from, to: values.to, days, reason: values.reason, status: 'pending', appliedOn: new Date().toISOString().slice(0, 10) },
      ...r,
    ]);
    toast.success('Leave request submitted for approval');
    setOpen(false);
    reset();
  };

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'type', header: 'Type', render: (r) => <Badge tone="primary">{r.type}</Badge> },
    { key: 'from', header: 'From', render: (r) => formatDate(r.from) },
    { key: 'to', header: 'To', render: (r) => formatDate(r.to) },
    { key: 'days', header: 'Days', align: 'center', render: (r) => <span className="font-bold">{r.days}</span> },
    { key: 'reason', header: 'Reason', hideBelow: 'lg', render: (r) => <span className="line-clamp-1 max-w-[220px]">{r.reason}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: 'approver', header: 'Approver', hideBelow: 'md' },
  ];

  return (
    <div>
      <PageHeader
        title="Leave Applications"
        subtitle="Medical, casual and earned leave"
        crumbs={[{ label: 'Student' }, { label: 'Leaves' }]}
        actions={<Button onClick={() => setOpen(true)}><CalendarPlus className="h-4 w-4" /> Apply for Leave</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leaveBalances.map((b) => (
          <Card key={b.type} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{b.type} Leave</span>
              <Badge tone={b.remaining <= 2 ? 'danger' : 'success'}>{b.remaining} left</Badge>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-600 to-secondary-500" style={{ width: `${(b.used / b.total) * 100}%` }} />
              </div>
              <span className="text-xs text-dark-400">{b.used}/{b.total} used</span>
            </div>
          </Card>
        ))}
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['type', 'reason']} emptyTitle="No leave applications yet" />

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for Leave" subtitle="Approvals typically take 24 hours">
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <Select label="Leave Type" error={errors.type?.message} {...register('type')}>
            <option value="">Select type</option>
            <option>Medical</option>
            <option>Casual</option>
            <option>Earned</option>
            <option>Placement</option>
            <option>Emergency</option>
          </Select>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="From Date" type="date" error={errors.from?.message} {...register('from')} />
            <Input label="To Date" type="date" error={errors.to?.message} {...register('to')} />
          </div>
          <Textarea label="Reason" placeholder="Explain the reason for leave…" error={errors.reason?.message} {...register('reason')} />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
