import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users } from 'lucide-react';
import { PageHeader, Card, Badge, ProgressBar } from '../../components/ui';
import { departments } from '../../data/mock';
import { cn } from '../../utils';

export default function AdminDepartments() {
  return (
    <div>
      <PageHeader
        title="Departments"
        subtitle="14 departments · manage HODs and settings"
        crumbs={[{ label: 'Admin' }, { label: 'Departments' }]}
        actions={
          <button className="btn-primary" onClick={() => {}}><Building2 className="h-4 w-4" /> Add Department</button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {departments.map((d) => (
          <Card key={d.id} className="card-hover group relative overflow-hidden p-5">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
            <div className="flex items-start justify-between">
              <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl text-lg', d.color ?? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400')}>{d.icon}</span>
              <Badge tone="neutral">{d.code}</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{d.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-dark-400">{d.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-dark-50 p-2.5 text-center dark:bg-dark-800">
                <p className="flex items-center justify-center gap-1 font-bold"><Users className="h-3.5 w-3.5 text-primary-500" /> {d.students}</p>
                <p className="text-[10px] text-dark-400">Students</p>
              </div>
              <div className="rounded-xl bg-dark-50 p-2.5 text-center dark:bg-dark-800">
                <p className="font-bold">{d.faculty}</p>
                <p className="text-[10px] text-dark-400">Faculty</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-dark-400">Placement</span>
                <span className="font-bold text-success">{d.placementRate}%</span>
              </div>
              <ProgressBar value={d.placementRate} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-dark-100 pt-3 dark:border-dark-800">
              <span className="text-xs text-dark-400">HOD: {d.hod}</span>
              <Link to="/admin/departments" className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary-400">
                Manage <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
