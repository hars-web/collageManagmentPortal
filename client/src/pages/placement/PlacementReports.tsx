import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileBarChart } from 'lucide-react';
import { PageHeader, Card, Badge, ChartCard, BarChartComponent, TrendChart, ProgressBar } from '../../components/ui';
import { placementsByDept, analyticsTrend } from '../../data/mock';
import { downloadFile } from '../../utils';

export default function PlacementReports() {
  return (
    <div>
      <PageHeader
        title="Placement Reports"
        subtitle="Batch-wise insights for NAAC & accreditation"
        crumbs={[{ label: 'Placement' }, { label: 'Reports' }]}
        actions={
          <div className="flex gap-2">
            <button className="btn-outline" onClick={() => downloadFile('placement-report-2026.csv', 'Company,Students,AvgLPA\nInfosys,412,6.2')}><Download className="h-4 w-4" /> Export CSV</button>
            <button className="btn-primary" onClick={() => downloadFile('placement-report-2026.pdf', 'Placement Report 2025-26')}><FileBarChart className="h-4 w-4" /> Download PDF</button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Department-wise Placement Rate" subtitle="Batch 2025-26">
          <BarChartComponent data={placementsByDept} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Average CTC Trend" subtitle="Last 5 batches (₹ LPA)">
          <TrendChart data={analyticsTrend} color="#14B8A6" />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="text-base font-semibold">Top Paying Companies</h3>
          <div className="mt-4 space-y-4">
            {[
              { c: 'Amazon', lpa: 42 },
              { c: 'Microsoft', lpa: 38 },
              { c: 'Goldman Sachs', lpa: 31 },
              { c: 'Oracle', lpa: 24 },
              { c: 'Deloitte', lpa: 18 },
              { c: 'Infosys', lpa: 6.2 },
            ].map((x) => (
              <div key={x.c}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{x.c}</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">₹{x.lpa} LPA</span>
                </div>
                <ProgressBar value={(x.lpa / 42) * 100} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="text-base font-semibold">Batch Summary — 2025-26</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Eligible Students', value: '2,148' },
              { label: 'Placed', value: '1,912', sub: '89.0%' },
              { label: 'Highest Package', value: '₹62 LPA', sub: 'Amazon SDE-1' },
              { label: 'Average Package', value: '₹6.4 LPA', sub: '+9.8% YoY' },
              { label: 'Companies Visited', value: '318', sub: '48 PPOs' },
              { label: 'Higher Studies', value: '128', sub: '6.0%' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-dark-50 p-4 dark:bg-dark-800">
                <p className="text-xs text-dark-400">{s.label}</p>
                <p className="mt-1 text-lg font-bold">{s.value}</p>
                {s.sub && <p className="text-[11px] text-success">{s.sub}</p>}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dark-100 p-4 text-sm dark:border-dark-800">
            <p className="font-semibold">Accreditation note</p>
            <p className="mt-1 text-dark-400">MBA and MCA cohorts crossed 92% placement — highlight in NAAC SSR v3. Mechanical needs 2 more partner MOUs this quarter. <Link to="/placement/recruiters" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">Add partners <ArrowRight className="inline h-3 w-3" /></Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
