import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Textarea, Select } from '../../components/ui';
import { leaveBalances } from '../../data/mock';
import { cn } from '../../utils';

const initialLeaves = [
  { id: 'l1', type: 'Casual Leave', from: '10 Aug 2026', to: '10 Aug 2026', days: 1, status: 'Approved', reason: 'Family function' },
  { id: 'l2', type: 'Medical Leave', from: '20 Jul 2026', to: '22 Jul 2026', days: 3, status: 'Approved', reason: 'Fever' },
  { id: 'l3', type: 'Casual Leave', from: '02 Jun 2026', to: '04 Jun 2026', days: 3, status: 'Approved', reason: 'Personal work' },
  { id: 'l4', type: 'Earned Leave', from: '28 May 2026', to: '29 May 2026', days: 2, status: 'Approved', reason: 'Conference travel' },
];

export default function FacultyLeaves() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: 'Casual Leave', from: '', to: '', reason: '' });

  const apply = () => {
    if (!form.from || !form.to || form.reason.length < 5) return toast.error('Fill all fields (reason 5+ chars)');
    const days = Math.max(1, Math.round((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000) + 1);
    setLeaves((l) => [{ id: `l${Date.now()}`, type: form.type, from: new Date(form.from).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), to: new Date(form.to).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), days, status: 'Pending', reason: form.reason }, ...l]);
    toast.success('Leave request submitted to HOD');
    setOpen(false);
    setForm({ type: 'Casual Leave', from: '', to: '', reason: '' });
  };

  return (
    <div>
      <PageHeader
        title="Leave Management"
        subtitle="Apply for leave and track approvals"
        crumbs={[{ label: 'Faculty' }, { label: 'Leaves' }]}
        actions={<Button onClick={() => setOpen(true)}><Calendar className="h-4 w-4" /> Apply Leave</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {leaveBalances.map((lb) => (
          <Card key={lb.type} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{lb.type}</p>
              <Badge tone={lb.remaining <= 2 ? 'danger' : 'secondary'}>{lb.remaining} left</Badge>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800">
              <div className={cn('h-full rounded-full', lb.remaining <= 2 ? 'bg-danger' : 'bg-gradient-to-r from-primary-500 to-secondary-500')} style={{ width: `${(lb.remaining / lb.total) * 100}%` }} />
            </div>
            <p className="mt-2 text-xs text-dark-400">{lb.used}/{lb.total} used · {lb.earned} earned this year</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="table-base min-w-[720px]">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l.id}>
                <td className="text-sm font-semibold">{l.type}</td>
                <td className="text-sm text-dark-500 dark:text-dark-300">{l.from} → {l.to}</td>
                <td className="text-sm font-bold">{l.days}</td>
                <td className="max-w-[240px] truncate text-sm text-dark-500 dark:text-dark-300">{l.reason}</td>
                <td className="text-center">
                  <Badge tone={l.status === 'Approved' ? 'success' : l.status === 'Pending' ? 'accent' : 'danger'} dot>{l.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for Leave" subtitle="Approval by HOD · forwarded to admin">
        <div className="space-y-4">
          <Select label="Leave Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {['Casual Leave', 'Medical Leave', 'Earned Leave', 'Academic Leave'].map((t) => <option key={t}>{t}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="From" type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
            <Input label="To" type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
          </div>
          <Textarea label="Reason" placeholder="Why do you need this leave?" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={apply}>Submit Request</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
