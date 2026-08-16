import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, FileDown, FileText, FileSpreadsheet, FolderOpen, Upload } from 'lucide-react';
import { PageHeader, Card, Badge, Button, DataTable, type Column, StatCard, EmptyState } from '../../components/ui';
import { downloadFile, exportCSV } from '../../utils';

interface Doc {
  id: string;
  name: string;
  category: string;
  size: string;
  uploaded: string;
}

export default function StudentDocuments() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: 'd1', name: 'Semester-5-Marksheet.pdf', category: 'Academic', size: '1.2 MB', uploaded: '12 Jul 2026' },
    { id: 'd2', name: 'Bonafide-Certificate.pdf', category: 'Official', size: '240 KB', uploaded: '15 Jul 2026' },
    { id: 'd3', name: 'Fee-Receipt-Sem6.pdf', category: 'Finance', size: '310 KB', uploaded: '28 Apr 2026' },
    { id: 'd4', name: 'ID-Card-Front.png', category: 'Personal', size: '820 KB', uploaded: '02 Aug 2025' },
    { id: 'd5', name: 'TC-Scan.pdf', category: 'Official', size: '540 KB', uploaded: '20 Jul 2025' },
  ]);

  const addDocs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setDocs((d) => [...files.map((f, i) => ({ id: `d${Date.now()}-${i}`, name: f.name, category: 'Personal', size: `${(f.size / 1024 / 1024).toFixed(1)} MB`, uploaded: 'Just now' })), ...d]);
    toast.success(`${files.length} document(s) uploaded`);
  };

  const columns: Column<Doc>[] = [
    { key: 'name', header: 'Document', render: (r) => (
      <span className="flex items-center gap-2.5 font-medium">
        {r.name.endsWith('.pdf') ? <FileText className="h-4 w-4 text-danger" /> : r.name.endsWith('.csv') || r.name.endsWith('.xlsx') ? <FileSpreadsheet className="h-4 w-4 text-success" /> : <FolderOpen className="h-4 w-4 text-primary-600" />}
        {r.name}
      </span>
    ) },
    { key: 'category', header: 'Category', render: (r) => <Badge tone="neutral">{r.category}</Badge> },
    { key: 'size', header: 'Size', align: 'right', hideBelow: 'sm' },
    { key: 'uploaded', header: 'Uploaded', hideBelow: 'md' },
    { key: 'id', header: 'Action', render: (r) => (
      <Button size="xs" variant="outline" onClick={() => downloadFile(r.name, `CUTM document archive — ${r.name}`)}>
        <Download className="h-3.5 w-3.5" /> Download
      </Button>
    ) },
  ];

  return (
    <div>
      <PageHeader
        title="My Documents"
        subtitle="Official downloads and personal uploads"
        crumbs={[{ label: 'Student' }, { label: 'Documents' }]}
        actions={
          <label className="btn-primary cursor-pointer">
            <Upload className="h-4 w-4" /> Upload Document
            <input type="file" multiple className="sr-only" onChange={addDocs} />
          </label>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Documents" value={docs.length} icon={<FolderOpen className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="Academic" value={docs.filter((d) => d.category === 'Academic').length} icon={<FileText className="h-5 w-5" />} iconClass="secondary" format="plain" />
        <StatCard label="Official" value={docs.filter((d) => d.category === 'Official').length} icon={<FileDown className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Storage Used" value="3.1" icon={<FileSpreadsheet className="h-5 w-5" />} iconClass="purple" format="plain" trendLabel="of 500 MB" />
      </div>

      {docs.length ? (
        <DataTable
          data={docs}
          columns={columns}
          pageSize={10}
          searchKeys={['name', 'category']}
          searchPlaceholder="Search documents…"
          toolbar={<Button variant="outline" size="sm" onClick={() => exportCSV('documents.csv', docs)}>Export List</Button>}
        />
      ) : (
        <Card className="p-4">
          <EmptyState title="No documents yet" description="Upload your first document to keep records handy." />
        </Card>
      )}
    </div>
  );
}
