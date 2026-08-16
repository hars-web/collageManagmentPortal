import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link to="/" className="flex items-center text-dark-400 transition-colors hover:text-primary-600 dark:text-dark-500 dark:hover:text-primary-400" aria-label="Home">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <Fragment key={crumb.label}>
              <ChevronRight className="h-3.5 w-3.5 text-dark-300 dark:text-dark-600" aria-hidden />
              <li>
                {crumb.to && !last ? (
                  <Link to={crumb.to} className="text-dark-500 transition-colors hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-dark-800 dark:text-dark-100">{crumb.label}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({ title, subtitle, actions, crumbs, icon }: { title: string; subtitle?: string; actions?: ReactNode; crumbs?: Crumb[]; icon?: ReactNode }) {
  return (
    <div className="mb-6">
      {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow sm:flex">{icon}</div>}
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-dark-500 dark:text-dark-400">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}
