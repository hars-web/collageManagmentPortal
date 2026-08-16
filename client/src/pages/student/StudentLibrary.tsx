import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, BookX, Clock, Search } from 'lucide-react';
import { PageHeader, Card, Badge, DataTable, type Column, StatCard, Modal, Button, Input, Tabs, TabPanel } from '../../components/ui';
import { books, myIssues } from '../../data/mock';
import { formatDate } from '../../utils';

type BookRow = (typeof books)[number] & { borrowed?: boolean };

export default function StudentLibrary() {
  const [tab, setTab] = useState('catalogue');
  const [issueFor, setIssueFor] = useState<BookRow | null>(null);
  const [catalogue, setCatalogue] = useState<BookRow[]>(books);

  const issueBook = () => {
    if (!issueFor || issueFor.available <= 0) return;
    setCatalogue((c) => c.map((b) => (b.id === issueFor.id ? { ...b, available: b.available - 1, borrowed: true } : b)));
    toast.success(`"${issueFor.title}" issued — due 6 Sep 2026`);
    setIssueFor(null);
  };

  const returnBook = (id: string) => {
    setCatalogue((c) => c.map((b) => (b.id === id ? { ...b, available: b.available + 1, borrowed: false } : b)));
    toast.success('Book returned successfully');
  };

  const columns: Column<BookRow>[] = [
    { key: 'accessionNo', header: 'Accession', render: (r) => <span className="text-xs font-semibold text-dark-400">{r.accessionNo}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'author', header: 'Author', hideBelow: 'md' },
    { key: 'category', header: 'Category', render: (r) => <Badge tone="neutral">{r.category}</Badge> },
    { key: 'rack', header: 'Rack', hideBelow: 'lg', render: (r) => <Badge tone="secondary">{r.rack}</Badge> },
    { key: 'available', header: 'Available', align: 'center', render: (r) => <span className={r.available > 0 ? 'font-bold text-success' : 'font-bold text-danger'}>{r.available}/{r.copies}</span> },
    {
      key: 'id',
      header: 'Action',
      render: (r) =>
        r.borrowed ? (
          <Button size="xs" variant="danger" onClick={() => returnBook(r.id)}>Return</Button>
        ) : (
          <Button size="xs" variant="outline" disabled={r.available <= 0} onClick={() => setIssueFor(r)}>
            {r.available > 0 ? 'Borrow' : 'Out of stock'}
          </Button>
        ),
    },
  ];

  const issueColumns: Column<(typeof myIssues)[number]>[] = [
    { key: 'bookId', header: 'Book', render: (r) => <span className="font-medium">{books.find((b) => b.id === r.bookId)?.title ?? '—'}</span> },
    { key: 'issueDate', header: 'Issued On', render: (r) => formatDate(r.issueDate) },
    { key: 'dueDate', header: 'Due On', render: (r) => formatDate(r.dueDate) },
    { key: 'returned', header: 'Status', render: (r) => (r.returned ? <Badge tone="success">Returned</Badge> : r.dueDate < '2026-08-07' ? <Badge tone="danger">Overdue</Badge> : <Badge tone="primary">Issued</Badge>) },
    { key: 'fine', header: 'Fine', align: 'right', render: (r) => <span className={r.fine ? 'font-bold text-danger' : 'text-dark-400'}>₹{r.fine ?? 0}</span> },
  ];

  return (
    <div>
      <PageHeader title="Central Library" subtitle="2,40,000+ books · 1,800 e-journals · 24×7 reading hall" crumbs={[{ label: 'Student' }, { label: 'Library' }]} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Books Issued to Me" value={myIssues.filter((i) => !i.returned).length} icon={<BookOpen className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="Overdue Books" value={myIssues.filter((i) => !i.returned && i.dueDate < '2026-08-07').length} icon={<BookX className="h-5 w-5" />} iconClass="danger" format="plain" />
        <StatCard label="Pending Fines" value="₹10" icon={<Clock className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Reading Hours" value="42" icon={<BookOpen className="h-5 w-5" />} iconClass="secondary" format="plain" trendLabel="this month" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        className="mb-6 max-w-md"
        tabs={[
          { value: 'catalogue', label: 'Catalogue', badge: catalogue.length },
          { value: 'myissues', label: 'My Issues', badge: myIssues.length },
        ]}
      />

      <TabPanel value="catalogue" active={tab}>
        <DataTable
          data={catalogue}
          columns={columns}
          pageSize={8}
          searchKeys={['title', 'author', 'category']}
          searchPlaceholder="Search books, authors, subjects…"
          emptyTitle="No books found"
        />
      </TabPanel>
      <TabPanel value="myissues" active={tab}>
        <DataTable data={myIssues} columns={issueColumns} pageSize={8} emptyTitle="No books issued" />
        <Card className="mt-4 border-accent-200 bg-accent-50/50 p-4 text-sm text-accent-700 dark:border-accent-900/50 dark:bg-accent-900/10 dark:text-accent-300">
          Fine policy: ₹5/day per book. You have <strong>₹10</strong> pending for "Introduction to Algorithms".
        </Card>
      </TabPanel>

      <Modal open={!!issueFor} onClose={() => setIssueFor(null)} title="Borrow Book" subtitle={issueFor?.title}>
        <div className="space-y-4">
          <div className="rounded-2xl bg-dark-50 p-4 text-sm dark:bg-dark-800">
            <p><span className="text-dark-400">Author:</span> <span className="font-medium">{issueFor?.author}</span></p>
            <p><span className="text-dark-400">Category:</span> <span className="font-medium">{issueFor?.category}</span></p>
            <p><span className="text-dark-400">Rack:</span> <span className="font-medium">{issueFor?.rack}</span></p>
            <p><span className="text-dark-400">Available:</span> <span className="font-bold text-success">{issueFor?.available}</span></p>
          </div>
          <p className="text-xs text-dark-400">Loan period: 30 days · Fine: ₹5/day after due date · Max 5 active issues.</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIssueFor(null)}>Cancel</Button>
            <Button onClick={issueBook}>Confirm Borrow</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
