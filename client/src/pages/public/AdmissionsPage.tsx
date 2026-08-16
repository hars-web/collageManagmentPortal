import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Banknote, CheckCircle2, ClipboardList, FileText, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { SectionHeading, Card, Button, Input, Select, Textarea, Badge } from '../../components/ui';

const steps = [
  { icon: FileText, title: '1. Apply Online', desc: 'Fill the online application with your academic details and stream preferences.' },
  { icon: ClipboardList, title: '2. Entrance & Interview', desc: 'Appear for JEE/OJEE/CAT or CUTM\'s own entrance test + personal interview (waived for merit).' },
  { icon: Users, title: '3. Document Verification', desc: 'Submit 10+2 / graduation marksheets, ID proof, photographs and transfer certificate.' },
  { icon: GraduationCap, title: '4. Confirm Admission', desc: 'Pay the admission fee, complete registration and join the induction programme.' },
];

const fees = [
  { programme: 'B.Tech (all branches)', fee: '₹1.2L – ₹1.5L / year' },
  { programme: 'MBA', fee: '₹1.6L / year' },
  { programme: 'B.Sc Agriculture (Hons)', fee: '₹1.1L / year' },
  { programme: 'B.Pharm', fee: '₹1.3L / year' },
  { programme: 'BPT & Paramedical', fee: '₹1.35L / year' },
  { programme: 'BA LL.B (Hons)', fee: '₹1.4L / year' },
  { programme: 'MCA / M.Tech', fee: '₹1.0L – ₹1.2L / year' },
  { programme: 'PhD', fee: '₹0.6L / year' },
];

export default function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PublicPage
      title="Admissions 2026-27"
      description="Apply to CUTM — admissions open for B.Tech, MBA, B.Sc Agriculture, Pharmacy, Law and PhD. Scholarships up to 100%."
    >
      <PageBanner title="Admissions Open — 2026-27" subtitle="Applications for all UG, PG and PhD programmes are now open. Scholarships up to 100% tuition waiver for meritorious students.">
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-success/15 px-4 py-1.5 text-sm font-semibold text-success-400 ring-1 ring-success/30">Last date: 30 Sep 2026</span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15">Classes begin: Aug 2027</span>
        </div>
      </PageBanner>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="How to Apply" title={<>Admission in <span className="gradient-text">4 Simple Steps</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Card className="card-hover relative h-full p-6">
                  <span className="absolute right-5 top-5 font-display text-4xl font-bold text-primary-100 dark:text-primary-900/40">{i + 1}</span>
                  <s.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-500 dark:text-dark-400">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-transparent via-secondary-50/50 to-transparent dark:via-secondary-900/10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionHeading align="left" eyebrow="Application" title={<>Start Your <span className="gradient-text">Application</span></>} className="mb-8" />
              <Card className="p-6 sm:p-8">
                {submitted ? (
                  <div className="py-10 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </motion.div>
                    <h3 className="mt-4 text-lg font-bold">Application Received!</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-dark-400">Our admissions team will call you within 24 hours. Your application ID will be emailed to you shortly.</p>
                    <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Full Name" required placeholder="Your full name" />
                      <Input label="Date of Birth" type="date" required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Email" type="email" required placeholder="you@example.com" />
                      <Input label="Phone" type="tel" required placeholder="+91 98765 43210" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Select label="Programme" required>
                        <option value="">Select programme</option>
                        <option>B.Tech — CSE / AI / ECE / ME / EE / CE</option>
                        <option>MBA — Marketing / Finance / Analytics</option>
                        <option>B.Sc Agriculture (Hons)</option>
                        <option>B.Pharm</option>
                        <option>BPT & Paramedical</option>
                        <option>BA LL.B (Hons)</option>
                        <option>MCA / M.Tech</option>
                        <option>PhD</option>
                      </Select>
                      <Select label="Preferred Campus" required>
                        <option value="">Select campus</option>
                        <option>Bhubaneswar</option>
                        <option>Paralakhemundi</option>
                        <option>Rayagada</option>
                        <option>Balangir</option>
                        <option>Puri</option>
                      </Select>
                    </div>
                    <Select label="Entrance Exam Appeared" required>
                      <option value="">Select exam</option>
                      <option>JEE Main</option>
                      <option>OJEE</option>
                      <option>CAT / MAT / XAT</option>
                      <option>CLAT</option>
                      <option>CUTM Entrance Test</option>
                      <option>No exam — merit based</option>
                    </Select>
                    <Textarea label="Tell us about yourself (optional)" placeholder="Achievements, interests, goals…" />
                    <Button type="submit" className="w-full" size="lg">Submit Application</Button>
                    <p className="text-center text-[11px] text-dark-400">By submitting, you agree to receive admission updates via email, SMS and WhatsApp.</p>
                  </form>
                )}
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionHeading align="left" eyebrow="Fees & Aid" title={<>Indicative <span className="gradient-text">Fees</span></>} className="mb-8" />
              <Card className="divide-y divide-dark-100 dark:divide-dark-800">
                {fees.map((f) => (
                  <div key={f.programme} className="flex items-center justify-between px-6 py-4 text-sm">
                    <span className="text-dark-600 dark:text-dark-300">{f.programme}</span>
                    <span className="flex items-center gap-1.5 font-semibold text-primary-600 dark:text-primary-400"><Banknote className="h-4 w-4" />{f.fee}</span>
                  </div>
                ))}
              </Card>
              <div className="mt-6 space-y-4">
                <Card className="border-secondary-200 bg-secondary-50/50 p-5 dark:border-secondary-900/50 dark:bg-secondary-900/20">
                  <h4 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-secondary-600 dark:text-secondary-400" /> Scholarship Highlights</h4>
                  <ul className="mt-3 space-y-2 text-sm text-dark-600 dark:text-dark-300">
                    <li className="flex gap-2"><span className="text-secondary-600">•</span> Up to 100% tuition waiver — CUTM Merit Scholarship</li>
                    <li className="flex gap-2"><span className="text-secondary-600">•</span> State E-Medhabruti for 80%+ in 10+2</li>
                    <li className="flex gap-2"><span className="text-secondary-600">•</span> Reserved category schemes & single girl child waivers</li>
                    <li className="flex gap-2"><span className="text-secondary-600">•</span> Industry fellowships for research scholars</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <h4 className="font-semibold">Documents Required</h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {['Marksheets', 'Transfer Certificate', 'ID Proof', 'Photos', 'Caste Cert. (if any)', 'Income Cert. (if any)', 'Migration Cert.'].map((d) => (
                      <Badge key={d} tone="neutral">{d}</Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <Card className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
            <div>
              <h3 className="font-display text-xl font-bold">Have questions about admission?</h3>
              <p className="mt-1 text-sm text-dark-400">Call {`+91 674 555 3000`} or chat with our admissions counsellors — Mon–Sat, 9 AM to 6 PM.</p>
            </div>
            <Button size="lg" onClick={() => window.location.assign('/contact')}>Talk to a Counsellor <ArrowRight className="h-4 w-4" /></Button>
          </Card>
        </div>
      </section>
    </PublicPage>
  );
}
