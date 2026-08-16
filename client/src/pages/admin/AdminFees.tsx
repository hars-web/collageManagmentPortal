import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search, IndianRupee } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select } from '../../components/ui';
import { feeRecords, feeStatusData, students } from '../../data/mock';
import { ChartCard, PieChartComponent } from '../../components/ui';

export default function AdminFees() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ rollNumber: '', amount: '65000', head: 'Tuition Fee' });
  const studentOf = (id: string) => students.find((s) => s.id === id);

  const total = feeRecords.reduce((s, f) => s + f.amount, 0);
  const pending = feeRecords.filter((f) => f.status === 'unpaid').length;

  const filtered = feeRecords.filter((f) => `${studentOf(f.studentId)?.name ?? ''} ${studentOf(f.studentId)?.rollNumber ?? ''} ${studentOf(f.studentId)?.program ?? ''} ${f.description}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Fee Management"
        subtitle="₹105.6 Cr collected FY 2025-26 · 82% of target"
        crumbs={[{ label: 'Admin' }, { label: 'Fees' }]}
        actions={<Button onClick={() => setOpen(true)}><IndianRupee className="h-4 w-4" /> Record Payment</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Total Billed</p><p className="mt-1 text-2xl font-bold">₹{(total / 10000000).toFixed(1)} Cr</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Collected</p><p className="mt-1 text-2xl font-bold text-success">₹{(total * 0.86 / 10000000).toFixed(1)} Cr</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Pending</p><p className="mt-1 text-2xl font-bold text-danger">₹{(total * 0.14 / 10000000).toFixed(1)} Cr</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Outstanding Students</p><p className="mt-1 text-2xl font-bold text-accent-500">{pending}</p></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Fee Status Breakdown" subtitle="All students">
          <PieChartComponent data={feeStatusData} />
        </ChartCard>
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
              <Input placeholder="Search student or roll number…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
            </div>
          </Card>
          <Card className="overflow-x-auto p-0">
            <table className="table-base min-w-[760px]">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <tr key={f.id}>
                    <td className="text-sm font-medium">{studentOf(f.studentId)?.name ?? '—'}</td>
                    <td className="font-mono text-xs">{studentOf(f.studentId)?.rollNumber ?? '—'}</td>
                    <td className="text-sm text-dark-500 dark:text-dark-300">{studentOf(f.studentId)?.program ?? f.description}</td>
                    <td className="text-sm font-bold">₹{f.amount.toLocaleString('en-IN')}</td>
                    <td className="text-sm text-dark-500 dark:text-dark-300">{f.dueDate}</td>
                    <td className="text-center"><Badge tone={f.status === 'paid' ? 'success' : f.status === 'unpaid' ? 'danger' : 'accent'} dot>{f.status}</Badge></td>
                    <td className="text-right">
                      {f.status !== 'paid' ? (
                        <button className="btn-primary px-3 py-1.5 text-xs" onClick={() => { toast.success(`Payment reminder sent to ${studentOf(f.studentId)?.name ?? 'student'}`); }}>Remind</button>
                      ) : (
                        <button className="btn-outline px-3 py-1.5 text-xs" onClick={() => toast.success('Receipt downloaded')}>Receipt</button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={7} className="p-10 text-center text-sm text-dark-400">No fee records match.</td></tr>}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Record Payment" subtitle="Reconcile against the fee ledger">
        <div className="space-y-4">
          <Input label="Roll Number" placeholder="CUTM2023001" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Fee Head" value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })}>
              {['Tuition Fee', 'Hostel Fee', 'Development Fee', 'Exam Fee'].map((h) => <option key={h}>{h}</option>)}
            </Select>
            <Input label="Amount (₹)" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <Select label="Payment Method">
            <option>UPI</option>
            <option>Net Banking</option>
            <option>Demand Draft</option>
            <option>Cash</option>
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.rollNumber) return toast.error('Enter roll number'); toast.success(`₹${form.amount} recorded for ${form.rollNumber}`); setOpen(false); }}>Record Payment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
