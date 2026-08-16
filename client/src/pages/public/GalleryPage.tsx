import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { galleryItems } from '../../data/mock';
import { cn } from '../../utils';

export default function GalleryPage() {
  const [category, setCategory] = useState('All');
  const cats = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category)))];
  const filtered = galleryItems.filter((g) => category === 'All' || g.category === category);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <PublicPage
      title="Gallery"
      description="Photos from CUTM campuses — labs, festivals, sports, infrastructure and everyday campus life."
    >
      <PageBanner title="Campus Gallery" subtitle="A visual tour of our campuses, labs, festivals and everyday life." />
      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <Filter className="h-4 w-4 text-dark-400" />
            {cats.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={cn('rounded-full px-4 py-2 text-xs font-semibold transition-all', category === c ? 'bg-primary-600 text-white shadow-glow' : 'border border-dark-200 bg-white text-dark-500 hover:border-primary-400 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-300')}>
                {c}
              </button>
            ))}
          </div>

          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {filtered.map((g, i) => (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                onClick={() => setLightbox(g.image)}
                className="group relative block w-full overflow-hidden rounded-2xl"
                aria-label={`View ${g.title}`}
              >
                <img src={g.image} alt={g.title} loading="lazy" className={cn('w-full object-cover transition-transform duration-500 group-hover:scale-105', i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]')} />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-950/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{g.title}</p>
                    <p className="text-[11px] text-slate-300">{g.category}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setLightbox(null)}>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={lightbox}
            alt="Gallery preview"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20" aria-label="Close preview">Close ✕</button>
        </div>
      )}
    </PublicPage>
  );
}
