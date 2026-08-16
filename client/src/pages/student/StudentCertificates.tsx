import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Award, BadgeCheck, Download, FileText, ScrollText } from 'lucide-react';
import { PageHeader, Card, Badge, Button, DataTable, type Column, StatCard } from '../../components/ui';
import { certificates } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { downloadFile } from '../../utils';

interface CertRow {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  status: string;
}

export default function StudentCertificates() {
  const [rows, setRows] = useState<CertRow[]>(certificates);

  const requestCertificate = (id: string) => {
    setRows((r) => r.map((c) => (c.id === id ? { ...c, status: 'pending' } : c)));
    toast.success('Certificate requested — ready in 24 hours');
  };

  const columns: Column<CertRow>[] = [
    { key: 'name', header: 'Certificate', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge tone={r.type === 'academic' ? 'primary' : r.type === 'conduct' ? 'secondary' : r.type === 'achievement' ? 'accent' : 'neutral'}>{r.type}</Badge> },
    { key: 'issueDate', header: 'Issued On', hideBelow: 'md', render: (r) => (r.issueDate ? <span>{r.issueDate}</span> : <span className="text-dark-300 dark:text-dark-600">—</span>) },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge> },
    {
      key: 'id',
      header: 'Action',
      render: (r) =>
        r.status === 'issued' ? (
          <Button size="xs" variant="outline" onClick={() => downloadFile(`${r.name.replace(/[^\w]+/g, '-').toLowerCase()}.txt`, `CUTM OFFICIAL CERTIFICATE\n${r.name}\nIssued to Arpit Mohanty (CUTM21001001)\nDate: ${r.issueDate}`)}>
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        ) : r.status === 'ready' ? (
          <Button size="xs" onClick={() => setRows((rs) => rs.map((c) => (c.id === r.id ? { ...c, status: 'issued', issueDate: new Date().toISOString().slice(0, 10) } : c)))}>
            Collect
          </Button>
        ) : (
          <Button size="xs" variant="ghost" disabled>Requested</Button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Certificates"
        subtitle="Bonafide, conduct, provisional and achievement certificates"
        crumbs={[{ label: 'Student' }, { label: 'Certificates' }]}
        actions={
          <Button onClick={() => requestCertificate(certificates[3].id)}>
            <ScrollText className="h-4 w-4" /> Request Character Certificate
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Issued" value={rows.filter((r) => r.status === 'issued').length} icon={<BadgeCheck className="h-5 w-5" />} iconClass="success" format="plain" />
        <StatCard label="Ready to Collect" value={rows.filter((r) => r.status === 'ready').length} icon={<Award className="h-5 w-5" />} iconClass="primary" format="plain" />
        <StatCard label="Pending Requests" value={rows.filter((r) => r.status === 'pending').length} icon={<FileText className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Downloads" value="12" icon={<Download className="h-5 w-5" />} iconClass="purple" format="plain" />
      </div>

      <DataTable data={rows} columns={columns} pageSize={10} searchKeys={['name', 'type']} emptyTitle="No certificates yet" />
    </div>
  );
}
