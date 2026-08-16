import { PageHeader, Card, ChartCard, TrendChart, BarChartComponent, RadialProgressChart, ProgressBar, Badge } from '../../components/ui';
import { analyticsTrend } from '../../data/mock';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AdminAnalytics() {
  const metrics = [
    { label: 'Enrollment (5-yr)', value: '32,480', trend: '+8.2%' },
    { label: 'Retention Rate', value: '91.4%', trend: '+1.1%' },
    { label: 'Graduation Rate', value: '88.7%', trend: '+2.3%' },
    { label: 'Research Output', value: '1,204 papers', trend: '+14%' },
    { label: 'Industry Partners', value: '486', trend: '+32' },
    { label: 'Alumni Network', value: '58,900', trend: '+12%' },
  ];

  return (
    <div>
      <PageHeader
        title="Institutional Analytics"
        subtitle="NAAC A++ · NIRF 32 · live KPIs for AY 2025-26"
        crumbs={[{ label: 'Admin' }, { label: 'Analytics' }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.label} className="card-hover p-5">
            <p className="text-xs text-dark-400">{m.label}</p>
            <p className="mt-1 text-2xl font-bold">{m.value}</p>
            <Badge tone="success">{m.trend} YoY</Badge>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Student Growth" subtitle="Total enrollment 2021-2026">
          <TrendChart data={analyticsTrend} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Department Strength" subtitle="Students by school">
          <BarChartComponent
            data={[
              { label: 'CSE', value: 4892 },
              { label: 'ECE', value: 2210 },
              { label: 'MECH', value: 1340 },
              { label: 'CIVIL', value: 986 },
              { label: 'MBA', value: 702 },
              { label: 'MCA', value: 402 },
            ]}
            color="#2563EB"
          />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="text-base font-semibold">NAAC Readiness</h3>
          <div className="mt-4">
            <RadialProgressChart value={92} label="A++ score" color="#8B5CF6" />
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Curriculum', pct: 94 },
              { label: 'Research & Innovation', pct: 88 },
              { label: 'Student Support', pct: 91 },
              { label: 'Governance', pct: 85 },
            ].map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-dark-400">{c.label}</span>
                  <span className="font-bold">{c.pct}%</span>
                </div>
                <ProgressBar value={c.pct} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">FY 2025-26 Financials</h3>
            <Badge tone="success">Audited ✓</Badge>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Revenue', value: '₹128.4 Cr', sub: 'Fees 82% · Grants 12% · Other 6%' },
              { label: 'Expenditure', value: '₹104.2 Cr', sub: 'Salaries 58% · Infra 22% · Ops 20%' },
              { label: 'Surplus', value: '₹24.2 Cr', sub: 'Reinvested in campus & research' },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl border border-dark-100 p-4 dark:border-dark-800">
                <p className="text-xs text-dark-400">{f.label}</p>
                <p className="mt-1 text-xl font-bold">{f.value}</p>
                <p className="mt-1 text-[11px] text-dark-400">{f.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-dark-50 p-4 text-sm dark:bg-dark-800">
            <p className="font-semibold">AI Insight</p>
            <p className="mt-1 text-dark-400">Mechanical dept. placement (−4%) and hostel occupancy (78%) are the two watch-items this quarter. <Link to="/admin/placements" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">Review placement pipeline <ArrowRight className="inline h-3 w-3" /></Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
