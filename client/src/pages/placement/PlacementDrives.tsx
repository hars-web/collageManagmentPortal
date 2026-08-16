import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CalendarClock, Search, Users } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Modal, Button, Select } from '../../components/ui';
import { students } from '../../data/mock';
import { cn } from '../../utils';

const drives = [
  { id: 'd1', company: 'Infosys', role: 'Systems Engineer', date: '12 Aug 2026', venue: 'Online', batch: '2026-27', registered: 412, capacity: 320, status: 'Open' },
  { id: 'd2', company: 'Wipro', role: 'Project Engineer', date: '15 Aug 2026', venue: 'Campus — Placement Hall', batch: '2026-27', registered: 268, capacity: 240, status: 'Open' },
  { id: 'd3', company: 'TCS Digital', role: 'Digital Fresher', date: '19 Aug 2026', venue: 'Online', batch: '2026-27', registered: 412, capacity: 180, status: 'Open' },
  { id: 'd4', company: 'Accenture', role: 'ASE', date: '26 Aug 2026', venue: 'Campus — Auditorium', batch: '2026-27', registered: 389, capacity: 410, status: 'Open' },
  { id: 'd5', company: 'Amazon', role: 'SDE-1', date: '03 Sep 2026', venue: 'Online', batch: '2026-27', registered: 96, capacity: 60, status: 'Open' },
  { id: 'd6', company: 'Microsoft', role: 'SWE Intern', date: '08 Sep 2026', venue: 'Online', batch: '2027-28', registered: 58, capacity: 50, status: 'Open' },
  { id: 'd7', company: 'Deloitte', role: 'Analyst', date: '14 Sep 2026', venue: 'Campus — Placement Hall', batch: '2026-27', registered: 0, capacity: 200, status: 'Announced' },
];

export default function PlacementDrives() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company: 'Infosys', role: 'SDE-1', date: '2026-09-20', venue: 'Online' });

  const filtered = drives.filter((d) => `${d.company} ${d.role}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Placement Drives"
        subtitle="Schedule, manage registrations and results"
        crumbs={[{ label: 'Placement' }, { label: 'Drives' }]}
        actions={<Button onClick={() => setOpen(true)}><CalendarClock className="h-4 w-4" /> Schedule Drive</Button>}
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search drive, company, role…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="primary">{drives.filter((d) => d.status === 'Open').length} open drives</Badge>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => {
          const pct = d.capacity ? Math.min(100, Math.round((d.registered / d.capacity) * 100)) : 0;
          const full = d.capacity > 0 && d.registered >= d.capacity;
          return (
            <Card key={d.id} className="card-hover flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-lg font-black text-white">{d.company.charAt(0)}</span>
                <Badge tone={full ? 'danger' : d.status === 'Open' ? 'success' : 'primary'} dot>{full ? 'Full' : d.status}</Badge>
              </div>
              <h3 className="mt-3 font-semibold">{d.company} — {d.role}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dark-400">
                <span>📅 {d.date}</span><span>📍 {d.venue}</span><span>🎓 {d.batch}</span>
              </p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="flex items-center gap-1 text-dark-400"><Users className="h-3.5 w-3.5" /> {d.registered} registered</span>
                  <span className="font-bold">{d.capacity} slots</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-dark-100 dark:bg-dark-800">
                  <div className={cn('h-full rounded-full', full ? 'bg-danger' : 'bg-gradient-to-r from-primary-500 to-secondary-500')} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Registered candidates list opened')}>Candidates ({d.registered})</button>
                <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => toast.success(`Drive "${d.company}" updated`)}>Manage</button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule Drive" subtitle="Students get notified with eligibility criteria">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
              {['Infosys', 'Wipro', 'TCS', 'Accenture', 'Amazon', 'Microsoft', 'Deloitte', 'Cognizant'].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Select label="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}>
              {['Online', 'Campus — Auditorium', 'Campus — Placement Hall'].map((v) => <option key={v}>{v}</option>)}
            </Select>
          </div>
          <Select label="Eligible Batch">
            <option>2026-27 (Final year)</option>
            <option>2027-28 (Pre-final)</option>
            <option>Both</option>
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Drive scheduled: ${form.company} ${form.role}`); setOpen(false); }}>Schedule Drive</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
