import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Briefcase, Search, Target } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Modal, Button, Avatar, Select } from '../../components/ui';
import { placements, students } from '../../data/mock';
import { cn } from '../../utils';

type Stage = 'Registered' | 'Test' | 'Interview' | 'Offered';

const stageFlow: Stage[] = ['Registered', 'Test', 'Interview', 'Offered'];
const companiesNames = ['Infosys', 'Wipro', 'TCS', 'Accenture', 'Amazon', 'Capgemini', 'Deloitte', 'Oracle', 'Microsoft', 'HCL', 'Cognizant', 'IBM', 'Zoho', 'JPMorgan'];

export default function PlacementTracker() {
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('All');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const records = placements.slice(0, 14).map((p, i) => ({ ...p, stage: (stageFlow[i % stageFlow.length]) as Stage, company: companiesNames[i % companiesNames.length] }));

  const filtered = records.filter((r) => {
    const q = `${r.studentName} ${r.rollNumber} ${r.company}`.toLowerCase().includes(query.toLowerCase());
    return q && (stage === 'All' || r.stage === stage);
  });

  const advance = (id: string) => {
    toast.success('Candidate advanced to next stage');
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Placement Tracker"
        subtitle="Pipeline across 486 registered candidates"
        crumbs={[{ label: 'Placement' }, { label: 'Tracker' }]}
        actions={<Button onClick={() => setOpen(true)}><Briefcase className="h-4 w-4" /> Register Candidate</Button>}
      />

      <div className="grid grid-cols-4 gap-4">
        {stageFlow.map((s, i) => {
          const count = records.filter((r) => r.stage === s).length;
          return (
            <Card key={s} className={cn('p-4 text-center', i === 0 && 'border-primary-200')}>
              <p className="text-xs font-semibold uppercase tracking-wide text-dark-400">{s}</p>
              <p className={cn('mt-1 text-2xl font-bold', i === 0 ? 'text-primary-600 dark:text-primary-400' : 'text-success')}>{count}</p>
              <p className="mt-1 text-[11px] text-dark-400">{i === 0 ? '🎯 Registered' : i === 1 ? '📝 Online test' : i === 2 ? '🎤 Interviews' : '✅ Offer letter'}</p>
            </Card>
          );
        })}
      </div>

      <Card className="my-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search candidate, roll, company…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <select className="input sm:w-44" value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Stage filter">
          <option>All</option>
          {stageFlow.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="table-base min-w-[880px]">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Company</th>
              <th>Role</th>
              <th className="text-center">Stage</th>
              <th className="text-center">Progress</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const idx = stageFlow.indexOf(r.stage);
              return (
                <tr key={r.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={r.studentName} size="sm" />
                      <div>
                        <p className="font-medium">{r.studentName}</p>
                        <p className="text-xs text-dark-400">{r.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm font-medium">{r.company}</td>
                  <td className="text-sm text-dark-500 dark:text-dark-300">{r.role}</td>
                  <td className="text-center"><Badge tone={r.stage === 'Offered' ? 'success' : r.stage === 'Interview' ? 'primary' : r.stage === 'Test' ? 'accent' : 'neutral'} dot>{r.stage}</Badge></td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {stageFlow.map((s, i) => (
                        <span key={s} className={cn('h-2 w-6 rounded-full', i <= idx ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-dark-100 dark:bg-dark-800')} />
                      ))}
                    </div>
                  </td>
                  <td className="text-right">
                    {r.stage !== 'Offered' ? (
                      <button className="btn-primary px-3 py-1.5 text-xs" onClick={() => { setSelected(r.id); setOpen(true); }}>Advance →</button>
                    ) : (
                      <button className="btn-outline px-3 py-1.5 text-xs" onClick={() => toast.success('Offer letter downloaded')}>Offer Letter</button>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-sm text-dark-400">No candidates at this stage.</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={selected ? 'Advance Candidate' : 'Register Candidate'} subtitle={selected ? 'Move to the next round' : 'Add to the current drive pipeline'}>
        <div className="space-y-4">
          {!selected && (
            <>
              <Input label="Student" list="placement-students" placeholder="Start typing name…" />
              <datalist id="placement-students">{students.map((s) => <option key={s.id} value={s.name} />)}</datalist>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Company"><option>Infosys</option><option>Wipro</option><option>TCS</option><option>Accenture</option><option>Amazon</option></Select>
                <Input label="Role" placeholder="SDE-1" />
              </div>
            </>
          )}
          {selected && <p className="text-sm text-dark-400">Candidate will move to the next round with a notification + SMS.</p>}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => advance(selected ?? '')}>{selected ? 'Confirm Advance' : 'Register'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
