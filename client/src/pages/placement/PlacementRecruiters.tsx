import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Building2, Mail, Phone, Plus, Search } from 'lucide-react';
import { PageHeader, Card, Badge, Input, Button, Modal, Textarea } from '../../components/ui';
import { companies } from '../../data/mock';
import { cn } from '../../utils';

export default function PlacementRecruiters() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', industry: 'IT Services', location: '', email: '' });

  const filtered = companies.filter((c) => `${c.name} ${c.industry}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Recruiters & Partners"
        subtitle="486 active industry partners · MOU'd 124"
        crumbs={[{ label: 'Placement' }, { label: 'Recruiters' }]}
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Recruiter</Button>}
      />

      <Card className="mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <Input placeholder="Search company or industry…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" aria-label="Search" />
        </div>
        <Badge tone="neutral">{filtered.length} companies</Badge>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c, i) => (
          <Card key={c.name} className="card-hover p-5">
            <div className="flex items-start justify-between">
              <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black text-white', ['bg-primary-600', 'bg-secondary-500', 'bg-accent-500', 'bg-purple-600', 'bg-success', 'bg-danger'][i % 6])}>{c.name.charAt(0)}</span>
              <Badge tone={c.offers > 50 ? 'success' : c.offers > 20 ? 'primary' : 'neutral'}>{c.offers} offers</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{c.name}</h3>
            <p className="text-xs text-dark-400">{c.industry} · {c.location}</p>
            <p className="mt-2 text-xs text-dark-500 dark:text-dark-300">{c.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-dark-100 pt-3 text-xs dark:border-dark-800">
              <span className="font-semibold text-primary-600 dark:text-primary-400">Avg ₹{c.avgPackage} LPA</span>
              <div className="flex gap-2">
                <button className="btn-outline px-2.5 py-1.5" onClick={() => toast.success(`Emailing ${c.name}`)}><Mail className="h-3 w-3" /></button>
                <button className="btn-outline px-2.5 py-1.5" onClick={() => toast.success('Phone dialed')}><Phone className="h-3 w-3" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Recruiter" subtitle="Builds the partner profile">
        <div className="space-y-4">
          <Input label="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Industry" placeholder="IT Services" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
            <Input label="Location" placeholder="Hyderabad" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <Input label="HR Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Textarea label="Notes" placeholder="Past hiring history, JD preferences…" />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!form.name) return toast.error('Company name required'); toast.success(`${form.name} added as partner`); setOpen(false); setForm({ name: '', industry: 'IT Services', location: '', email: '' }); }}>Save Recruiter</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
