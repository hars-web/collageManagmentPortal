import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, CheckCircle2, MapPin, Users } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal } from '../../components/ui';
import { events } from '../../data/mock';
import { cn } from '../../utils';

export default function StudentEvents() {
  const [registered, setRegistered] = useState<string[]>([events[1].id]);
  const [detail, setDetail] = useState<(typeof events)[number] | null>(null);

  return (
    <div>
      <PageHeader title="Campus Events" subtitle={`${events.length} events this semester · register to grab your spot`} crumbs={[{ label: 'Student' }, { label: 'Events' }]} />

      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e, i) => {
          const isRegistered = registered.includes(e.id);
          return (
            <Card key={e.id} className={cn('card-hover h-full overflow-hidden', e.featured && 'ring-2 ring-accent-500/40')}>
              <div className="relative h-40 overflow-hidden">
                <img src={`/images/${['campus.jpg', 'hostel.jpg', 'fountain.jpg', 'students.jpg', 'building.jpg'][i % 5]}`} alt="" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary-700 backdrop-blur">{e.category}</span>
                {e.featured && <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold text-white">Featured</span>}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dark-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {e.date} · {e.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.venue}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {e.registered?.toLocaleString()}/{e.capacity.toLocaleString()}</span>
                </div>
                <p className="mt-2.5 line-clamp-2 text-sm text-dark-500 dark:text-dark-400">{e.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-dark-400">by {e.organizer}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setDetail(e)}>Details</Button>
                    {isRegistered ? (
                      <Badge tone="success" className="px-3 py-2"><CheckCircle2 className="h-3.5 w-3.5" /> Registered</Badge>
                    ) : (
                      <Button size="sm" onClick={() => { setRegistered((r) => [...r, e.id]); toast.success(`Registered for ${e.title}!`); }}>Register</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.title} subtitle={`${detail?.date} · ${detail?.time} · ${detail?.venue}`}>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-dark-600 dark:text-dark-300">{detail?.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><p className="text-[11px] text-dark-400">Organizer</p><p className="font-medium">{detail?.organizer}</p></div>
            <div className="rounded-xl bg-dark-50 p-3 dark:bg-dark-800"><p className="text-[11px] text-dark-400">Seats</p><p className="font-medium">{detail?.registered?.toLocaleString()} / {detail?.capacity.toLocaleString()}</p></div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setDetail(null)}>Close</Button>
            <Button disabled={registered.includes(detail!.id)} onClick={() => { setRegistered((r) => [...r, detail!.id]); toast.success('Registration confirmed!'); setDetail(null); }}>
              {registered.includes(detail!.id) ? 'Registered ✓' : 'Confirm Registration'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
