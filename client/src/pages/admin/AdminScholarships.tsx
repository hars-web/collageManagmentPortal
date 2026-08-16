import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Award } from 'lucide-react';
import { PageHeader, Card, Badge, statusTone, Button, Modal, Input, Select } from '../../components/ui';
import { scholarships } from '../../data/mock';
import { cn, formatINR } from '../../utils';

export default function AdminScholarships() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Merit-Based', amount: '100000' });

  const pending = scholarships.filter((s) => s.status === 'pending').length;

  return (
    <div>
      <PageHeader
        title="Scholarships & Aid"
        subtitle="₹4.2 Cr disbursed · 1,240 beneficiaries this year"
        crumbs={[{ label: 'Admin' }, { label: 'Scholarships' }]}
        actions={<Button onClick={() => setOpen(true)}><Award className="h-4 w-4" /> New Scheme</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Active Schemes</p><p className="mt-1 text-2xl font-bold">{scholarships.length}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Applications Pending</p><p className="mt-1 text-2xl font-bold text-accent-500">{pending}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Disbursed (FY26)</p><p className="mt-1 text-2xl font-bold text-success">₹4.2 Cr</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Beneficiaries</p><p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">1,240</p></Card>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {scholarships.map((s) => (
          <Card key={s.id} className="card-hover p-5">
            <div className="flex items-start justify-between">
              <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', s.type === 'merit' ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400')}>
                <Award className="h-5 w-5" />
              </span>
              <Badge tone={statusTone(s.status)} dot>{s.status}</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{s.name}</h3>
            <p className="mt-0.5 text-xs text-dark-400">{s.provider}</p>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-dark-50 px-3.5 py-2.5 text-sm dark:bg-dark-800">
              <span className="text-dark-400">Value</span>
              <span className="font-bold">{formatINR(s.amount)}</span>
            </div>
            <p className="mt-2 text-xs text-dark-400">Applied {s.appliedDate} · {s.type}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Applications opened')}>Applications</button>
              <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => { toast.success('Approval workflow started'); }}>Approve</button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Scholarship Scheme" subtitle="Announced to all eligible students">
        <div className="space-y-4">
          <Input label="Scheme Name" placeholder="e.g. CUTM Merit Excellence" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {['Merit-Based', 'Need-Based', 'Sports', 'Research'].map((t) => <option key={t}>{t}</option>)}
            </Select>
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.name) return toast.error('Scheme name required'); toast.success(`${form.name} created & announced`); setOpen(false); setForm({ name: '', type: 'Merit-Based', amount: '100000' }); }}>Create Scheme</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
