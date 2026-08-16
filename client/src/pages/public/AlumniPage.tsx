import { motion } from 'framer-motion';
import { ArrowRight, Award, Briefcase, Globe2, GraduationCap, Mail, MapPin, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Button, Input, Textarea } from '../../components/ui';
import { testimonials } from '../../data/mock';

export default function AlumniPage() {
  return (
    <PublicPage
      title="Alumni"
      description="Join the 22,000+ strong CUTM alumni network across 30+ countries. Reconnect, mentor and grow."
    >
      <PageBanner title="Alumni Network" subtitle="22,000+ Centurions across 30+ countries — engineers, founders, doctors, lawyers and leaders." />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: '22,000+', label: 'Alumni Worldwide' },
              { icon: Globe2, value: '30+', label: 'Countries' },
              { icon: Briefcase, value: '150+', label: 'Alumni-Led Startups' },
              { icon: Award, value: '₹52L', label: 'Highest Package' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Card className="card-hover p-6 text-center">
                  <s.icon className="mx-auto h-7 w-7 text-primary-600 dark:text-primary-400" />
                  <p className="mt-3 font-display text-3xl font-bold gradient-text">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-dark-400">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="Alumni Stories" title={<>Where Centurions <span className="gradient-text">Are Today</span></>} />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.slice(3, 6).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Card className="card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 font-bold text-white">{t.name.split(' ').map((w) => w[0]).join('')}</span>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-xs text-dark-400">{t.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-dark-500 dark:text-dark-400">"{t.quote}"</p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400"><GraduationCap className="h-3.5 w-3.5" /> {t.company}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-bold">Update Your Details</h3>
              <p className="mt-1 text-sm text-dark-400">Stay connected — we'll share reunions, job alerts and mentorship opportunities.</p>
              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full Name" required placeholder="Your name" />
                  <Input label="Passout Year" type="number" required placeholder="e.g. 2021" />
                </div>
                <Input label="Email" type="email" required placeholder="you@example.com" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Current Company" placeholder="Where do you work?" />
                  <Input label="Current Role" placeholder="Your designation" />
                </div>
                <Textarea label="Message" placeholder="What would you like to share with your alma mater?" />
                <Button type="submit" className="w-full" size="lg">Submit to Alumni Office</Button>
              </form>
            </Card>
            <div className="space-y-5">
              <Card className="p-6">
                <h4 className="flex items-center gap-2 font-semibold"><Users className="h-5 w-5 text-primary-600" /> Why Join?</h4>
                <ul className="mt-4 space-y-3 text-sm text-dark-500 dark:text-dark-400">
                  <li className="flex gap-2.5"><span className="text-success">✓</span> Annual alumni meet + chapter events in 12 cities</li>
                  <li className="flex gap-2.5"><span className="text-success">✓</span> Mentor current students and earn CUTM mentor credits</li>
                  <li className="flex gap-2.5"><span className="text-success">✓</span> Campus recruitment referral drives for your company</li>
                  <li className="flex gap-2.5"><span className="text-success">✓</span> Alumni scholarship fund for the next generation</li>
                  <li className="flex gap-2.5"><span className="text-success">✓</span> Lifelong library and lab access</li>
                </ul>
              </Card>
              <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <h4 className="font-semibold">Alumni Office</h4>
                  <p className="mt-1 flex items-center gap-2 text-sm text-dark-400"><Mail className="h-4 w-4" /> alumni@cutm.ac.in</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-dark-400"><MapPin className="h-4 w-4" /> Bhubaneswar Campus</p>
                </div>
                <Button variant="outline">Join Network <ArrowRight className="h-4 w-4" /></Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
