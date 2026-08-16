import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { Card, Button, Input, Select, Textarea } from '../../components/ui';
import { university } from '../../data/mock';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PublicPage
      title="Contact Us"
      description={`Reach the CUTM admissions office — ${university.helpline}, ${university.email}, ${university.address}.`}
    >
      <PageBanner title="Contact Us" subtitle="Questions about admissions, placements, or campus visits? We reply within 24 hours." />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, title: 'Admissions Helpline', value: university.helpline, sub: 'Mon–Sat, 9 AM – 6 PM' },
              { icon: Mail, title: 'Email', value: university.email, sub: 'Replies within 24 hours' },
              { icon: MapPin, title: 'Head Office', value: 'Bhubaneswar Campus', sub: university.address },
              { icon: Clock, title: 'Office Hours', value: '9:00 – 18:00 IST', sub: 'Sunday closed' },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Card className="card-hover h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">{c.value}</p>
                  <p className="mt-1 text-xs text-dark-400">{c.sub}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-6 sm:p-8">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-bold">Message Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-dark-400">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h3 className="flex items-center gap-2 text-lg font-bold"><MessageSquare className="h-5 w-5 text-primary-600" /> Send Us a Message</h3>
                  <p className="mt-1 text-sm text-dark-400">Fields marked * are required.</p>
                  <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Full Name" required placeholder="Your name" />
                      <Input label="Phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <Input label="Email" type="email" required placeholder="you@example.com" />
                    <Select label="Query Type" required>
                      <option value="">Select type</option>
                      <option>Admissions & Courses</option>
                      <option>Fees & Scholarships</option>
                      <option>Hostel & Accommodation</option>
                      <option>Placements & Recruiting</option>
                      <option>Other</option>
                    </Select>
                    <Textarea label="Message" required placeholder="How can we help?" />
                    <Button type="submit" className="w-full" size="lg"><Send className="h-4 w-4" /> Send Message</Button>
                  </form>
                </>
              )}
            </Card>
            <div className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-dark-100 shadow-soft dark:border-dark-800">
                <iframe
                  title="CUTM Bhubaneswar campus map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=85.7190%2C20.1100%2C85.7890%2C20.1600&layer=mapnik&marker=20.1350%2C85.7540"
                  className="h-72 w-full"
                  loading="lazy"
                />
              </div>
              <Card className="p-6">
                <h4 className="font-semibold">Campus Offices</h4>
                <ul className="mt-4 space-y-3 text-sm text-dark-500 dark:text-dark-400">
                  {university.campuses.map((c) => (
                    <li key={c} className="flex items-center gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-primary-600" />{c} Campus</li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
