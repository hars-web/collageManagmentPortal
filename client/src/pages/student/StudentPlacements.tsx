import { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, type Column, Button, Modal, StatCard } from '../../components/ui';
import { placementRecords, companies } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { formatINR, formatINRCrore } from '../../utils';
import { Banknote, Briefcase, Building2, TrendingUp } from 'lucide-react';

export default function StudentPlacements() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registered, setRegistered] = useState<string[]>([]);

  const columns: Column<(typeof placementRecords)[number]>[] = [
    { key: 'company', header: 'Company', render: (r) => <span className="font-medium">{r.company}</span> },
    { key: 'role', header: 'Role' },
    { key: 'package', header: 'Package', align: 'right', render: (r) => <span className="font-bold text-success">{formatINRCrore(r.package)}</span> },
    { key: 'location', header: 'Location', hideBelow: 'md' },
    { key: 'offerDate', header: 'Offer Date', hideBelow: 'lg', render: (r) => (r.offerDate ? <span>{r.offerDate}</span> : <span className="text-dark-300 dark:text-dark-600">—</span>) },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status.replace('-', ' ')}</Badge> },
  ];

  const drives = companies.slice(0, 4).map((c, i) => ({ ...c, driveDate: ['20 Aug 2026', '25 Aug 2026', '5 Sep 2026', '12 Sep 2026'][i], registered: registered.includes(c.id) }));

  return (
    <div>
      <PageHeader
        title="Placements"
        subtitle="2 offers in hand · 2 interviews ongoing · next drive 20 Aug"
        crumbs={[{ label: 'Student' }, { label: 'Placements' }]}
        actions={<Button onClick={() => setRegisterOpen(true)}>Register for Drive</Button>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Offers Received" value={placementRecords.filter((p) => p.status === 'placed' || p.status === 'offered').length} icon={<Briefcase className="h-5 w-5" />} iconClass="success" format="plain" />
        <StatCard label="Best Package" value={720000} icon={<Banknote className="h-5 w-5" />} iconClass="primary" format="currency" />
        <StatCard label="Ongoing Interviews" value={placementRecords.filter((p) => p.status === 'interviewing').length} icon={<TrendingUp className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Companies Visiting" value={companies.length} icon={<Building2 className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable data={placementRecords} columns={columns} pageSize={10} searchKeys={['company', 'role']} emptyTitle="No placement records yet" />
        </div>

        <Card>
          <div className="border-b border-dark-100 p-5 dark:border-dark-800">
            <h3 className="text-base font-semibold">Upcoming Drives</h3>
          </div>
          <div className="space-y-3 p-4">
            {drives.map((d) => (
              <div key={d.id} className={`rounded-2xl border p-4 transition-all ${d.registered ? 'border-success/40 bg-success/5' : 'border-dark-100 dark:border-dark-800'}`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{d.name}</p>
                  <Badge tone={d.registered ? 'success' : 'accent'}>{d.registered ? 'Registered' : d.driveDate}</Badge>
                </div>
                <p className="mt-1 text-xs text-dark-400">{d.roles.join(', ')} · avg {formatINRCrore(d.avgPackage)}</p>
                <button
                  className={`mt-3 w-full rounded-xl py-2 text-xs font-semibold transition-all ${d.registered ? 'bg-success/15 text-success' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                  onClick={() => {
                    if (!d.registered) {
                      setRegistered((r) => [...r, d.id]);
                      setRegisterOpen(false);
                    }
                  }}
                >
                  {d.registered ? 'Registered ✓' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)} title="Register for Placement Drive" subtitle="Your profile will be shared with the recruiter">
        <div className="space-y-3">
          <p className="text-sm text-dark-500 dark:text-dark-400">You're eligible for the following drives based on your CGPA (8.7) and skills:</p>
          <ul className="space-y-2">
            {companies.slice(0, 6).map((c, i) => (
              <li key={c.id} className="flex items-center justify-between rounded-xl border border-dark-100 px-4 py-3 text-sm dark:border-dark-800">
                <span className="font-medium">{c.name}</span>
                <Badge tone={['20 Aug', '25 Aug', '5 Sep', '12 Sep', '20 Sep', '28 Sep'][i]}>Drive: {['20 Aug', '25 Aug', '5 Sep', '12 Sep', '20 Sep', '28 Sep'][i]}</Badge>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setRegisterOpen(false)}>Cancel</Button>
            <Button onClick={() => { setRegistered((r) => [...r, companies[0].id]); setRegisterOpen(false); }}>Register for TCS</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
