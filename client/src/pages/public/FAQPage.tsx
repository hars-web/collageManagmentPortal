import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Phone, Search } from 'lucide-react';
import { PublicPage, PageBanner } from './PublicPage';
import { Accordion, Input, Card } from '../../components/ui';
import { cn } from '../../utils';

const faqGroups = [
  {
    title: 'Admissions',
    icon: '🎓',
    items: [
      { q: 'What is the eligibility for B.Tech?', a: '10+2 with Physics, Chemistry and Mathematics and minimum 60% aggregate. JEE Main / OJEE scores are preferred but not mandatory — CUTM conducts its own entrance test.' },
      { q: 'When does the admission cycle start?', a: 'Applications open in August for the next academic year and close on 30 September. Entrance tests run through October–December, with classes beginning in August.' },
      { q: 'Can I apply for multiple programmes?', a: 'Yes. You can select up to 3 programme preferences in a single application. The application fee is ₹1,000 for the first programme and ₹500 for each additional.' },
      { q: 'Is there a separate application for international students?', a: 'Yes, international students apply through the International Affairs office with a simplified process — no entrance test required, IELTS/TOEFL optional.' },
    ],
  },
  {
    title: 'Fees & Scholarships',
    icon: '💰',
    items: [
      { q: 'What scholarships are available?', a: 'CUTM Merit Scholarship (up to 100% tuition), State E-Medhabruti, reserved category schemes, single girl child waiver and industry fellowships. Merit scholarships are auto-considered at admission.' },
      { q: 'Can fees be paid in instalments?', a: 'Yes. Semester fees can be split into 2 instalments — 60% at admission and 40% within 60 days. Hostel fees have a similar option.' },
      { q: 'Are there education loan partners?', a: 'CUTM has tie-ups with SBI, HDFC Bank, Axis and Avanse for education loans with campus-facilitated processing.' },
    ],
  },
  {
    title: 'Academics & Exams',
    icon: '📚',
    items: [
      { q: 'How is the semester system structured?', a: 'Two semesters per year with mid-semester and end-semester exams. Grading is relative with O/A+/A/B+/B/C grades. CGPA is calculated per semester credits.' },
      { q: 'What happens if I fail a subject?', a: 'Backlog exams are held within 60 days of result publication. You can also opt for re-appearing in the next semester. There is no cap on attempts within the programme duration.' },
      { q: 'Is attendance compulsory?', a: 'Yes, 75% attendance per subject is mandatory to appear for end-semester exams. Medical leave beyond the limit requires documentation.' },
    ],
  },
  {
    title: 'Hostel & Campus',
    icon: '🏠',
    items: [
      { q: 'How do I get a hostel room?', a: 'Hostel allocation opens with admission confirmation on a first-come-first-served basis. You choose room type (single/double/triple) during registration.' },
      { q: 'What facilities are inside hostels?', a: 'Wi-Fi, attached washrooms, hot water, laundry, gym, common room with TV, mess with weekly menu rotation, and 24×7 security with biometric access.' },
      { q: 'Is there a transport facility?', a: 'Yes, university buses cover major city routes and the railway station. Transport fee is ₹15,000 per semester.' },
    ],
  },
  {
    title: 'Placements',
    icon: '💼',
    items: [
      { q: 'When does placement training start?', a: 'From semester 3 — aptitude building, coding practice and soft-skills modules begin early. Interview prep intensifies from semester 5.' },
      { q: 'What is the average and highest package?', a: 'Average package is ₹7.8 LPA and the highest is ₹52 LPA (2025 batch). 92% of eligible students were placed.' },
      { q: 'Is placement guaranteed?', a: 'While placement cannot be contractually guaranteed, CUTM has maintained 90%+ placement for 7 consecutive years, with multiple offers per student common.' },
    ],
  },
  {
    title: 'Student Services',
    icon: '🛎️',
    items: [
      { q: 'How do I raise a complaint?', a: 'Use the Complaint Portal in the student dashboard. Track status in real time — most complaints are resolved within 48 hours.' },
      { q: 'How do I get my Bonafide certificate?', a: 'Apply from the Certificates section of the student portal. It is issued digitally within 24 hours and physically within 3 days.' },
      { q: 'Does the university provide mental health support?', a: 'Yes — a free counselling centre with professional psychologists runs Mon–Sat. Appointments can be booked confidentially through the portal.' },
    ],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const allItems = faqGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
  const filtered = allItems.filter((i) => {
    const okGroup = group === 'All' || i.group === group;
    const okQuery = `${i.q} ${i.a}`.toLowerCase().includes(query.toLowerCase());
    return okGroup && okQuery;
  });

  return (
    <PublicPage
      title="FAQ"
      description="Answers to the most common questions about CUTM admissions, fees, scholarships, hostels and placements."
    >
      <PageBanner title="Frequently Asked Questions" subtitle="Find quick answers — or reach out, and we'll help you personally." />
      <section className="section-pad">
        <div className="container-page max-w-4xl">
          <div className="relative mb-8">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-400" />
            <Input placeholder="Search questions… e.g. scholarship, hostel, placement" value={query} onChange={(e) => setQuery(e.target.value)} className="h-13 py-3.5 pl-12 text-base" aria-label="Search FAQs" />
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {['All', ...faqGroups.map((g) => g.title)].map((g) => (
              <button key={g} onClick={() => setGroup(g)} className={cn('rounded-full px-4 py-2 text-xs font-semibold transition-all', group === g ? 'bg-primary-600 text-white shadow-glow' : 'border border-dark-200 bg-white text-dark-500 hover:border-primary-400 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-300')}>
                {g}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-dark-300 dark:text-dark-600" />
              <p className="mt-4 font-semibold">No results for "{query}"</p>
              <p className="mt-1 text-sm text-dark-400">Try different keywords or contact us directly.</p>
            </Card>
          ) : (
            <Accordion
              items={filtered.map((f) => ({ title: f.q, content: f.a }))}
              defaultOpen={0}
            />
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-12">
            <Card className="flex flex-col items-center justify-between gap-5 p-8 text-center sm:flex-row sm:text-left">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white shadow-glow">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Still have questions?</h3>
                  <p className="mt-1 text-sm text-dark-400">Our counsellors reply within 24 hours, Monday to Saturday.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a href="tel:+916745553000" className="btn-outline"><Phone className="h-4 w-4" /> Call Us</a>
                <a href="/contact" className="btn-primary">Contact Support</a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </PublicPage>
  );
}
