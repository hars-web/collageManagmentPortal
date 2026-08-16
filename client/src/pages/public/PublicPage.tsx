import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { PublicFooter } from '../../components/layout/PublicFooter';
import { university } from '../../data/mock';

interface PublicPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PublicPage({ title, description, children, className }: PublicPageProps) {
  const fullTitle = title === 'Home' ? `${university.name} | Learn by Doing` : `${title} — ${university.shortName} | ${university.name}`;
  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description ?? `${title} at ${university.name}. ${university.tagline}.`} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description ?? university.tagline} />
        <meta property="og:type" content="website" />
      </Helmet>
      <PublicNavbar />
      <main className={className}>{children}</main>
      <PublicFooter />
    </>
  );
}

export function PageBanner({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-600/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary-600/20 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-300 ring-1 ring-white/15">
          {university.shortName} University
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
