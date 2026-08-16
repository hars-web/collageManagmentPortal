import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Briefcase, Plus, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Select } from '../../components/ui';
import { cn } from '../../utils';

const internships = [
  { id: 'i1', company: 'Amazon', role: 'SDE Intern', duration: '6 months', stipend: '₹60,000/mo', location: 'Hyderabad', openings: 8, applicants: 214, deadline: '20 Aug 2026', status: 'Open' },
  { id: 'i2', company: 'Microsoft', role: 'SWE Intern', duration: '4 months', stipend: '₹75,000/mo', location: 'Bengaluru', openings: 6, applicants: 168, deadline: '25 Aug 2026', status: 'Open' },
  { id: 'i3', company: 'Infosys', role: 'Springboard Intern', duration: '6 months', stipend: '₹25,000/mo', location: 'Remote', openings: 40, applicants: 892, deadline: '15 Aug 2026', status: 'Open' },
  { id: 'i4', company: 'JPMorgan', role: 'Analyst Intern', duration: '3 months', stipend: '₹85,000/mo', location: 'Mumbai', openings: 4, applicants: 96, deadline: '10 Aug 2026', status: 'Closing' },
  { id: 'i5', company: 'Deloitte', role: 'Consulting Intern', duration: '4 months', stipend: '₹40,000/mo', location: 'Gurugram', openings: 12, applicants: 340, deadline: '30 Aug 2026', status: 'Open' },
];

export default function PlacementInternships() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company: 'Infosys', role: 'SDE Intern', stipend: '25000', duration: '6 months' });

  const filtered = internships.filter((i) => `${i.company} ${i.role} ${i.location}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Internships"
        subtitle="112 live internship opportunities · 34 remote"
        crumbs={[{ label: 'Placement' }, { label: 'Internships' }]}
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Post Internship</Button>}
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search company, role, location…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="primary">{internships.reduce((s, i) => s + i.openings, 0)} openings</Badge>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((i) => (
          <Card key={i.id} className="card-hover p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-primary-600 text-lg font-black text-white">{i.company.charAt(0)}</span>
              <Badge tone={i.status === 'Open' ? 'success' : 'danger'} dot>{i.status}</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{i.role}</h3>
            <p className="text-xs text-dark-400">{i.company} · {i.location} · {i.duration}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-dark-50 p-2.5 text-center dark:bg-dark-800">
                <p className="font-bold text-success">{i.stipend}</p>
                <p className="text-[10px] text-dark-400">Stipend</p>
              </div>
              <div className="rounded-xl bg-dark-50 p-2.5 text-center dark:bg-dark-800">
                <p className="font-bold">{i.openings}</p>
                <p className="text-[10px] text-dark-400">Openings</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-dark-400">
              <span>{i.applicants} applicants</span>
              <span>Deadline {i.deadline}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Applicants list opened')}>Applicants</button>
              <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => toast.success(`Internship at ${i.company} updated`)}>Manage</button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Post Internship" subtitle="Broadcast to eligible students">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
              {['Infosys', 'Wipro', 'TCS', 'Accenture', 'Amazon', 'Microsoft', 'Deloitte'].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Stipend (₹/mo)" type="number" value={form.stipend} onChange={(e) => setForm({ ...form, stipend: e.target.value })} />
            <Select label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>
              {['2 months', '3 months', '4 months', '6 months'].map((d) => <option key={d}>{d}</option>)}
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Internship posted — ${form.company} ${form.role}`); setOpen(false); }}>Post Internship</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
