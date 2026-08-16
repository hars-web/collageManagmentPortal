import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, MapPin, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Badge } from '../../components/ui';
import { events, galleryItems, news } from '../../data/mock';
import { cn } from '../../utils';

export default function EventsPage() {
  const [category, setCategory] = useState('All');
  const cats = ['All', 'technical', 'cultural', 'sports', 'seminar', 'workshop'];
  const filtered = events.filter((e) => category === 'All' || e.category === category);

  return (
    <PublicPage
      title="Events"
      description="Hackathons, fests, seminars and sports meets at CUTM — register for upcoming campus events."
    >
      <PageBanner title="Events & Festivities" subtitle="Something happens every week at CUTM. Register, participate, and win." />
      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={cn('rounded-full px-4 py-2 text-xs font-semibold capitalize transition-all', category === c ? 'bg-primary-600 text-white shadow-glow' : 'border border-dark-200 bg-white text-dark-500 hover:border-primary-400 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-300')}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}>
                <Card className={cn('card-hover h-full overflow-hidden', e.featured && 'ring-2 ring-accent-500/40')}>
                  <div className="flex gap-5 p-6">
                    <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-glow">
                      <span className="font-display text-2xl font-bold leading-none">{new Date(e.date).getDate()}</span>
                      <span className="text-xs font-semibold uppercase">{new Date(e.date).toLocaleString('en-IN', { month: 'short' })}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={e.category === 'technical' ? 'primary' : e.category === 'cultural' ? 'pink' : e.category === 'sports' ? 'success' : 'accent'}>{e.category}</Badge>
                        {e.featured && <Badge tone="accent">Featured</Badge>}
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{e.title}</h3>
                      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dark-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date} · {e.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{e.venue}</span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{e.registered?.toLocaleString()}/{e.capacity.toLocaleString()}</span>
                      </div>
                      <p className="mt-2.5 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{e.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-dark-400">Organised by {e.organizer}</span>
                        <button className="btn-primary px-4 py-1.5 text-xs">Register</button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="Highlights" title={<>Recents from the <span className="gradient-text">Ground</span></>} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.filter((g) => g.category === 'Events').slice(0, 4).map((g, i) => (
              <motion.div key={g.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="group relative overflow-hidden rounded-2xl">
                <img src={g.image} alt={g.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-950/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{g.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {news.slice(0, 3).map((n, i) => (
              <Card key={n.id} className="card-hover p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">{n.category}</p>
                <h4 className="mt-2 font-semibold leading-snug">{n.title}</h4>
                <p className="mt-2 flex items-center gap-2 text-xs text-dark-400"><Eye className="h-3.5 w-3.5" />{n.views.toLocaleString()} views · {n.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
