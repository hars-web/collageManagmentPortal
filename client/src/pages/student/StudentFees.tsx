import { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, type Column, ProgressBar, Modal, Button, Input } from '../../components/ui';
import { feeRecords } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { formatINR } from '../../utils';
import { toast } from 'react-hot-toast';
import { Download, IndianRupee } from 'lucide-react';

interface FeeRow {
  id: string;
  description: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: string;
  method?: string;
  date?: string;
}

export default function StudentFees() {
  const [rows, setRows] = useState<FeeRow[]>(feeRecords);
  const [payFor, setPayFor] = useState<FeeRow | null>(null);
  const [amount, setAmount] = useState('');

  const totalDue = rows.filter((r) => r.status !== 'paid').reduce((s, r) => s + (r.amount - r.paid), 0);

  const payNow = () => {
    if (!payFor || !amount) return;
    const amt = Number(amount);
    if (amt <= 0 || amt > payFor.amount - payFor.paid) return toast.error('Enter a valid amount');
    setRows((r) =>
      r.map((x) =>
        x.id === payFor.id
          ? { ...x, paid: x.paid + amt, status: x.paid + amt >= x.amount ? 'paid' : 'partial', method: 'UPI', date: new Date().toISOString().slice(0, 10) }
          : x,
      ),
    );
    toast.success(`Payment of ${formatINR(amt)} successful!`);
    setPayFor(null);
    setAmount('');
  };

  const columns: Column<FeeRow>[] = [
    { key: 'description', header: 'Fee Head', render: (r) => <span className="font-medium">{r.description}</span> },
    { key: 'amount', header: 'Amount', align: 'right', render: (r) => formatINR(r.amount) },
    { key: 'paid', header: 'Paid', align: 'right', render: (r) => <span className="font-semibold text-success">{formatINR(r.paid)}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    { key: 'dueDate', header: 'Due', hideBelow: 'md' },
    { key: 'method', header: 'Method', hideBelow: 'lg' },
    {
      key: 'id',
      header: 'Action',
      render: (r) =>
        r.status === 'paid' ? (
          <span className="text-xs font-semibold text-dark-400">{r.date}</span>
        ) : (
          <Button size="xs" onClick={() => { setPayFor(r); setAmount(String(r.amount - r.paid)); }}>Pay Now</Button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Fee Details"
        subtitle={`Outstanding balance: ${formatINR(totalDue)}`}
        crumbs={[{ label: 'Student' }, { label: 'Fees' }]}
        actions={
          <button className="btn-outline" onClick={() => {}}>
            <Download className="h-4 w-4" /> Download Statement
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-dark-400">Total Billed (Sem 6)</p>
          <p className="mt-2 font-display text-2xl font-bold">{formatINR(rows.reduce((s, r) => s + r.amount, 0))}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-dark-400">Total Paid</p>
          <p className="mt-2 font-display text-2xl font-bold text-success">{formatINR(rows.reduce((s, r) => s + r.paid, 0))}</p>
        </Card>
        <Card className="border-accent-200 bg-accent-50/50 p-5 dark:border-accent-900/50 dark:bg-accent-900/10">
          <p className="text-xs font-medium uppercase tracking-wide text-accent-600 dark:text-accent-400">Outstanding</p>
          <p className="mt-2 font-display text-2xl font-bold text-accent-600 dark:text-accent-400">{formatINR(totalDue)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-dark-400">Next Due</p>
          <p className="mt-2 font-display text-2xl font-bold">15 Sep</p>
          <ProgressBar value={80} className="mt-3" color="#F59E0B" />
        </Card>
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['description']} searchPlaceholder="Search fee heads…" />

      <Modal
        open={!!payFor}
        onClose={() => setPayFor(null)}
        title="Make Payment"
        subtitle={payFor?.description}
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-dark-50 p-4 dark:bg-dark-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-500 dark:text-dark-400">Total due</span>
              <span className="font-bold">{payFor ? formatINR(payFor.amount - payFor.paid) : '—'}</span>
            </div>
          </div>
          <Input
            label="Amount"
            type="number"
            leftIcon={<IndianRupee className="h-4 w-4" />}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            {['UPI', 'Net Banking', 'Card'].map((m) => (
              <button key={m} className="btn-outline flex-1 py-2 text-xs">{m}</button>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setPayFor(null)}>Cancel</Button>
            <Button onClick={payNow} disabled={!amount || Number(amount) <= 0}>
              Pay {amount ? formatINR(Number(amount)) : ''}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
