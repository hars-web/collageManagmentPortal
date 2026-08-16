import { Link } from 'react-router-dom';
import { ArrowRight, AtSign, Globe, Mail, MapPin, MessageCircle, Phone, Rss, Send } from 'lucide-react';
import { Logo } from './Logo';
import { university } from '../../data/mock';
import { Button } from '../ui';

const quickLinks = [
  { label: 'About University', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Courses Offered', to: '/courses' },
  { label: 'Departments', to: '/departments' },
  { label: 'Faculty Directory', to: '/faculty' },
  { label: 'Placements', to: '/placements' },
];

const portalLinks = [
  { label: 'Student Portal', to: '/login' },
  { label: 'Faculty Portal', to: '/login' },
  { label: 'Admin Dashboard', to: '/login' },
  { label: 'Placement Cell', to: '/login' },
  { label: 'Library', to: '/login' },
  { label: 'Alumni Network', to: '/alumni' },
];

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden bg-dark-900 text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} aria-hidden />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-primary-600/20 blur-3xl" aria-hidden />

      <div className="container-page relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Centurion University is a NAAC A++ accredited institution delivering industry-aligned education through innovation,
              entrepreneurship and a learning-by-doing philosophy across Odisha.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[Globe, Send, AtSign, Rss, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Social media link ${i + 1}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-all hover:bg-primary-600 hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-secondary-300">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="-ml-4 transition-all group-hover:ml-0">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Portals</h4>
            <ul className="mt-5 space-y-2.5">
              {portalLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-secondary-300">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="-ml-4 transition-all group-hover:ml-0">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Stay Updated</h4>
            <p className="mt-5 text-sm text-slate-400">Subscribe for admissions, events and placement news.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/15"
              />
              <Button type="submit" variant="secondary" size="md">Subscribe</Button>
            </form>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" /> {university.address}</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-secondary-400" /> {university.helpline}</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-secondary-400" /> {university.email}</li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-secondary-400" />
                <a href="https://cutm.ac.in" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary-300">
                  Official Website: cutm.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} Centurion University of Technology and Management. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-secondary-300">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-secondary-300">Terms of Use</a>
              <a href="#" className="transition-colors hover:text-secondary-300">RTI</a>
              <a href="#" className="transition-colors hover:text-secondary-300">NIRF</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
