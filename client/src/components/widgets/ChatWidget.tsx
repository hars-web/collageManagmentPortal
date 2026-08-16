import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { cn } from '../../utils';
import { useAppSelector } from '../../store';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

const KB: { match: string[]; answer: string }[] = [
  { match: ['attendance', 'percentage', 'absent'], answer: 'Your current attendance is 91%. You are above the 75% requirement. Missing 4 more sessions this semester would drop you below 75%.' },
  { match: ['fee', 'pay', 'paymen', 'due'], answer: 'You have ₹13,000 pending (₹3,000 library caution + ₹10,000 remaining caution deposit). You can pay via UPI, net banking or card from the Fees page.' },
  { match: ['exam', 'mid sem', 'schedule'], answer: 'Your next exam is the Mid Semester — Machine Learning on 10 Sep 2026 at 9:30 AM in LH-14. Full schedule is on the Exams page.' },
  { match: ['cgpa', 'gpa', 'grade', 'result'], answer: 'Your current CGPA is 8.7. Your best semester was Semester 5 with a 9.0 SGPA. Results are on the Results page.' },
  { match: ['placement', 'job', 'offer', 'tcs'], answer: 'You currently have 2 offers (TCS ₹4.5 LPA and Infosys ₹5.6 LPA) and 2 ongoing interviews. Next drive: TCS Digital on 20 Aug — register early!' },
  { match: ['library', 'book', 'overdue'], answer: '"Introduction to Algorithms" is 2 days overdue. Return it soon — fine is ₹5/day. You currently have 2 books issued and 1 overdue.' },
  { match: ['hostel', 'room', 'mess'], answer: 'You stay in Boys Hostel, Block A, Room A-204 (double sharing). Mess menu for this week is uploaded on the Hostel page.' },
  { match: ['scholarship', 'e-medhabruti'], answer: '2 of your scholarships are approved (CUTM Merit 100% + State E-Medhabruti). Your reserved-category application is pending review.' },
  { match: ['assignment', 'homework', 'due'], answer: 'You have 4 pending assignments. Nearest deadline: DSA Problem Set (15 Aug — overdue). Complete the ML fraud detection assignment before 20 Aug.' },
  { match: ['leave', 'holiday', 'time off'], answer: 'You have 3 casual leave days remaining. Apply from the Leave Application page — approvals typically take 24 hours.' },
  { match: ['help', 'support', 'complaint'], answer: 'You can raise a complaint via the Complaint Portal. Average resolution time is 48 hours. Current open complaints: 3.' },
];

const defaultReplies = [
  'Let me check that for you. While our AI assistant is synced with the university database, for specific queries you can also contact the respective department.',
  'Great question! You can find detailed information on the corresponding page in your portal. Use the search bar (Ctrl+K) to jump anywhere instantly.',
  'I can help with attendance, fees, exams, results, placements, library, hostel and scholarships. Try asking "my attendance" or "upcoming exams".',
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm0',
      role: 'bot',
      text: `Hi ${user?.name?.split(' ')[0] ?? 'there'}! 👋 I'm CUTM Assistant. Ask me about attendance, fees, exams, results, placements, library or hostel.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      const hit = KB.find((k) => k.match.some((m) => lower.includes(m)));
      const reply = hit ? hit.answer : defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: 'bot', text: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-20 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-dark-100 bg-white shadow-2xl dark:border-dark-800 dark:bg-dark-900 sm:bottom-24 sm:right-6 lg:bottom-6"
            role="dialog"
            aria-label="CUTM AI Assistant"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3.5 text-white">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Bot className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-primary-600" />
              </span>
              <div>
                <p className="text-sm font-semibold">CUTM Assistant</p>
                <p className="text-[11px] text-white/70">AI Student Support · Online</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto rounded-lg p-1.5 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto bg-dark-50/50 p-4 dark:bg-dark-950/40">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-soft',
                      m.role === 'user'
                        ? 'rounded-br-md bg-gradient-to-r from-primary-600 to-primary-500 text-white'
                        : 'rounded-bl-md border border-dark-100 bg-white text-dark-700 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-200',
                    )}
                  >
                    {m.role === 'bot' && <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400"><Sparkles className="h-3 w-3" /> Assistant</span>}
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-dark-100 bg-white px-4 py-3 dark:border-dark-800 dark:bg-dark-900">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-primary-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-dark-100 bg-white p-3 dark:border-dark-800 dark:bg-dark-900"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fees, exams, CGPA…"
                aria-label="Chat message"
                className="input py-2"
              />
              <button type="submit" aria-label="Send message" className="btn-primary h-10 w-10 shrink-0 rounded-xl p-0">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-5 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-glow transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
