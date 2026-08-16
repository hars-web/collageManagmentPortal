import { motion } from 'framer-motion';
import { Dumbbell, Flame, Footprints, HeartPulse, Music, Palette, Utensils, Wifi } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card } from '../../components/ui';

const amenities = [
  { icon: Wifi, title: '5G-Ready Wi-Fi', desc: 'Campus-wide high-speed Wi-Fi with 10 Gbps backbone and study pods everywhere.' },
  { icon: Utensils, title: 'Messes & Cafés', desc: '12 messes with rotating menus, speciality cafés and a food court with 20+ outlets.' },
  { icon: Dumbbell, title: 'Gym & Fitness', desc: 'Modern gyms, yoga studios and physiotherapy corners in every hostel block.' },
  { icon: Footprints, title: 'Sports Arenas', desc: 'Cricket, football, basketball, athletics, indoor games and e-sports arena.' },
  { icon: Music, title: 'Cultural Spaces', desc: 'Open-air theatre, music rooms, dance studios and an art gallery.' },
  { icon: HeartPulse, title: 'Healthcare', desc: '24×7 medical centre with doctors, ambulance and tie-ups with city hospitals.' },
  { icon: Palette, title: 'Hobby Clubs', desc: '40+ student clubs — photography, robotics, theatre, coding, debate and more.' },
  { icon: Flame, title: 'Hostel Comforts', desc: 'Laundry, gym, common rooms, mess and 24×7 security in every residence.' },
];

export default function CampusLifePage() {
  return (
    <PublicPage
      title="Campus Life"
      description="Life at CUTM — smart hostels, sports arenas, 40+ clubs, festivals, messes and a 200-acre green campus."
    >
      <PageBanner title="Campus Life" subtitle="Between the labs, you'll find festivals, football finals, food fests and friendships for life." />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Infrastructure" title={<>Everything You Need, <span className="gradient-text">Under One Roof</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}>
                <Card className="card-hover h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
                    <a.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{a.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-transparent via-primary-50/40 to-transparent dark:via-primary-900/10">
        <div className="container-page">
          <SectionHeading eyebrow="A Day at CUTM" title={<>From 6 AM <span className="gradient-text">to 11 PM</span></>} />
          <div className="mx-auto max-w-3xl">
            {[
              { time: '06:00', title: 'Morning Yoga & Jogging', desc: 'The sports complex wakes up with yoga, jogging tracks and gym sessions.' },
              { time: '08:00', title: 'Classes Begin', desc: 'Smart classrooms, live industry sessions and lab hours across departments.' },
              { time: '13:00', title: 'Lunch & Club Time', desc: 'Food courts serve lunch while coding clubs and debate societies run meetups.' },
              { time: '15:00', title: 'Labs & Projects', desc: 'The busiest hours — robotics, agri-farm, pharma plant and innovation hub in full swing.' },
              { time: '18:00', title: 'Sports & Cultural Practice', desc: 'Football finals, basketball, music room jams and dance rehearsals.' },
              { time: '20:00', title: 'Library & Night Study', desc: 'The 24×7 library fills up with exam-season and placement-prep crowds.' },
            ].map((s, i) => (
              <motion.div key={s.time} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.06 }} className="relative flex gap-6 border-l-2 border-primary-200 pb-8 pl-8 last:pb-0 dark:border-primary-800">
                <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 ring-4 ring-primary-100 dark:ring-primary-900/50" />
                <span className="w-14 shrink-0 pt-0.5 font-display text-lg font-bold text-primary-600 dark:text-primary-400">{s.time}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" eyebrow="Hostels" title={<>Home Away <span className="gradient-text">From Home</span></>} className="mb-6" />
              <div className="space-y-4 text-sm leading-relaxed text-dark-500 dark:text-dark-400">
                <p>8,000+ students live across 24 hostel blocks on 5 campuses. Rooms come single/double/triple sharing with attached washrooms.</p>
                <ul className="space-y-2.5">
                  {['24×7 security with biometric access', 'High-speed Wi-Fi in every room', 'Nutritious mess with weekly menu rotation', 'Laundry, gym, common rooms & medical care', 'Parent app for hostel updates'].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-dark-600 dark:text-dark-300"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">✓</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                '/images/campus.jpg',
                '/images/hostel.jpg',
                '/images/fountain.jpg',
                '/images/students.jpg',
              ].map((src, i) => (
                <motion.img key={i} src={src} alt="CUTM campus life" loading="lazy" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
