import { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, type Column, Button, Modal, Input } from '../../components/ui';
import { scholarships } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { formatINR } from '../../utils';
import { toast } from 'react-hot-toast';
import { Plus, Wallet } from 'lucide-react';

type ScholarshipRow = (typeof scholarships)[number] & { applied: boolean };

export default function StudentScholarships() {
  const rows: ScholarshipRow[] = scholarships.map((s) => ({ ...s, applied: false }));
  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState({ scheme: 'State E-Medhabruti', reason: '' });

  const available = ['CUTM Merit Scholarship (up to 100%)', 'State E-Medhabruti', 'Central Sector Scheme', 'OBC / ST / SC Welfare', 'Single Girl Child Waiver', 'Industry Fellowship — Infosys'];

  const apply = () => {
    if (!form.reason) return toast.error('Please add a short statement of need');
    toast.success(`Application submitted for ${form.scheme}`);
    setApplyOpen(false);
    setForm({ ...form, reason: '' });
  };

  const columns: Column<ScholarshipRow>[] = [
    { key: 'name', header: 'Scholarship', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'provider', header: 'Provider', render: (r) => <Badge tone="neutral">{r.provider}</Badge>, hideBelow: 'md' },
    { key: 'type', header: 'Type', render: (r) => <Badge tone={r.type === 'merit' ? 'primary' : r.type === 'need' ? 'accent' : 'secondary'}>{r.type}</Badge> },
    { key: 'amount', header: 'Amount', align: 'right', render: (r) => <span className="font-bold">{formatINR(r.amount)}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: 'appliedDate', header: 'Applied On', hideBelow: 'lg' },
  ];

  return (
    <div>
      <PageHeader
        title="Scholarships"
        subtitle="Track applications and discover schemes you're eligible for"
        crumbs={[{ label: 'Student' }, { label: 'Scholarships' }]}
        actions={
          <Button onClick={() => setApplyOpen(true)}>
            <Plus className="h-4 w-4" /> Apply for Scholarship
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-success-200 bg-success/5 p-5">
          <Wallet className="h-5 w-5 text-success" />
          <p className="mt-3 font-display text-2xl font-bold text-success">{formatINR(rows.filter((r) => r.status === 'approved').reduce((s, r) => s + r.amount, 0))}</p>
          <p className="text-xs text-dark-400">Approved this year</p>
        </Card>
        <Card className="border-accent-200 bg-accent-50/50 p-5 dark:border-accent-900/50 dark:bg-accent-900/10">
          <Wallet className="h-5 w-5 text-accent-500" />
          <p className="mt-3 font-display text-2xl font-bold text-accent-500">{rows.filter((r) => r.status === 'pending').length}</p>
          <p className="text-xs text-dark-400">Pending review</p>
        </Card>
        <Card className="p-5">
          <Wallet className="h-5 w-5 text-primary-600" />
          <p className="mt-3 font-display text-2xl font-bold">{rows.filter((r) => r.status !== 'approved' && r.status !== 'rejected').length}</p>
          <p className="text-xs text-dark-400">In process</p>
        </Card>
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['name', 'provider']} emptyTitle="No scholarship applications" />

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Apply for Scholarship" subtitle="Choose a scheme and submit your statement">
        <div className="space-y-4">
          <Input label="Scheme" value={form.scheme} onChange={(e) => setForm({ ...form, scheme: e.target.value })} />
          <div className="flex flex-wrap gap-1.5">
            {available.slice(0, 5).map((s) => (
              <button key={s} onClick={() => setForm({ ...form, scheme: s })} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${form.scheme === s ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-500 dark:bg-dark-800 dark:text-dark-300'}`}>
                {s}
              </button>
            ))}
          </div>
          <Input label="Statement of Need (short)" placeholder="e.g. Family income below ₹2.5L, requires fee support…" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setApplyOpen(false)}>Cancel</Button>
            <Button onClick={apply}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
