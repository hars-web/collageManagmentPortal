import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, CalendarClock, Handshake, Target, TrendingUp, Users } from 'lucide-react';
import { PageHeader, StatCard, Card, Badge, ChartCard, BarChartComponent, ProgressBar, Avatar } from '../../components/ui';
import { placements, companies, placementsByDept } from '../../data/mock';

export default function PlacementDashboard() {
  return (
    <div>
      <PageHeader
        title="Placement Cell Dashboard"
        subtitle="Batch 2025-26 · placement drive season in progress"
        crumbs={[{ label: 'Placement' }, { label: 'Dashboard' }]}
        actions={<Link to="/placement/drives" className="btn-primary"><CalendarClock className="h-4 w-4" /> Schedule Drive</Link>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Students Placed" value={1912} icon={<Briefcase className="h-5 w-5" />} iconClass="primary" format="plain" trend={6.8} />
        <StatCard label="Avg. Package" value={6.4} icon={<TrendingUp className="h-5 w-5" />} iconClass="secondary" format="lpa" trend={0.9} />
        <StatCard label="Active Recruiters" value={companies.length} icon={<Building2 className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Offers Made" value={2143} icon={<Handshake className="h-5 w-5" />} iconClass="purple" format="plain" trend={12.4} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChartCard title="Placements by Department" subtitle="Batch 2025-26">
            <BarChartComponent data={placementsByDept} color="#2563EB" />
          </ChartCard>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Placement Goal Tracker</h3>
              <Badge tone="success" dot>On track</Badge>
            </div>
            <div className="mt-4 space-y-4">
              {[
                { label: 'Overall placement', pct: 89, target: 'Target 92%' },
                { label: 'Core tech roles', pct: 71, target: 'Target 75%' },
                { label: 'Women candidates placed', pct: 86, target: 'Target 90%' },
                { label: 'Higher studies / startups', pct: 6, target: 'Target 8%' },
              ].map((g) => (
                <div key={g.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{g.label}</span>
                    <span className="flex items-center gap-2"><span className="text-xs text-dark-400">{g.target}</span><span className="font-bold text-primary-600 dark:text-primary-400">{g.pct}%</span></span>
                  </div>
                  <ProgressBar value={g.pct} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-semibold">Upcoming Drives</h3>
            <div className="mt-4 space-y-3">
              {[
                { c: 'Infosys', role: 'Systems Engineer', date: '12 Aug', slots: '320' },
                { c: 'Wipro', role: 'Project Engineer', date: '15 Aug', slots: '240' },
                { c: 'TCS Digital', role: 'Digital Fresher', date: '19 Aug', slots: '180' },
                { c: 'Accenture', role: 'ASE', date: '26 Aug', slots: '410' },
              ].map((d) => (
                <div key={d.c} className="flex items-center gap-3 rounded-xl border border-dark-100 p-3 dark:border-dark-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-50 text-lg dark:bg-dark-800">{d.c.charAt(0)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{d.c}</p>
                    <p className="text-[11px] text-dark-400">{d.role} · {d.slots} slots</p>
                  </div>
                  <Badge tone="primary">{d.date}</Badge>
                </div>
              ))}
            </div>
            <Link to="/placement/drives" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400">Manage drives <ArrowRight className="h-3 w-3" /></Link>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Recent Offers</h3>
              <Users className="h-4 w-4 text-dark-300" />
            </div>
            <div className="mt-4 space-y-3">
              {placements.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <Avatar name={p.studentName} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.studentName}</p>
                    <p className="text-[11px] text-dark-400">{p.company} · {p.role}</p>
                  </div>
                  <span className="text-sm font-bold text-success">{p.ctc} LPA</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-semibold">Top Recruiters</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {companies.slice(0, 12).map((c) => (
                <span key={c.name} className="rounded-full bg-dark-50 px-3 py-1.5 text-xs font-medium dark:bg-dark-800">{c.name}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
