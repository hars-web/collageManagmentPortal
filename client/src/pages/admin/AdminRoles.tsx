import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { KeyRound, ShieldCheck, Users } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Select, Input, Avatar } from '../../components/ui';
import { cn } from '../../utils';

const roles = [
  { name: 'Super Admin', users: 3, desc: 'Full system access incl. settings & audit logs', color: 'bg-danger', usersList: ['System Admin', 'Registrar', 'Controller of Exams'] },
  { name: 'Admin', users: 12, desc: 'Department & student management', color: 'bg-primary-600', usersList: ['Admin Dept. 1', 'Admin Dept. 2'] },
  { name: 'Faculty', users: 240, desc: 'Attendance, grading, notes & assignments', color: 'bg-secondary-500', usersList: [] },
  { name: 'Placement Officer', users: 8, desc: 'Drives, recruiters and placement records', color: 'bg-accent-500', usersList: [] },
  { name: 'Librarian', users: 6, desc: 'Catalogue and issue/return management', color: 'bg-purple-600', usersList: [] },
  { name: 'Student', users: 7888, desc: 'Portal access to academics & services', color: 'bg-success', usersList: [] },
];

export default function AdminRoles() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('Faculty');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState(roles[0].name);

  const active = roles.find((r) => r.name === selected)!;

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        subtitle="RBAC · least privilege · full audit trail"
        crumbs={[{ label: 'Admin' }, { label: 'Roles' }]}
        actions={<Button onClick={() => setOpen(true)}><Users className="h-4 w-4" /> Add User</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <Card key={r.name} className={cn('card-hover cursor-pointer p-5', selected === r.name && 'ring-2 ring-primary-500')} onClick={() => setSelected(r.name)}>
            <div className="flex items-start justify-between">
              <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl text-white', r.color)}><ShieldCheck className="h-5 w-5" /></span>
              <Badge tone="neutral">{r.users} users</Badge>
            </div>
            <h3 className="mt-3 font-semibold">{r.name}</h3>
            <p className="mt-1 text-xs text-dark-400">{r.desc}</p>
            <div className="mt-3 flex -space-x-2">
              {r.usersList.slice(0, 3).map((u) => (
                <span key={u} className="rounded-full bg-white ring-2 ring-dark-100 dark:bg-dark-900 dark:ring-dark-800"><Avatar name={u} size="xs" /></span>
              ))}
              {r.usersList.length > 0 && <span className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-dark-100 text-[10px] font-bold text-dark-500 ring-2 ring-dark-100 dark:bg-dark-800 dark:text-dark-300 dark:ring-dark-800">+</span>}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Permissions — {active.name}</h3>
          <Badge tone="primary">24 permissions</Badge>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {['View students', 'Edit students', 'View faculty', 'Mark attendance', 'Publish results', 'Manage fees', 'Approve leaves', 'Manage library', 'Manage hostel', 'Publish notices', 'Manage events', 'View analytics', 'Export data', 'Manage settings', 'Manage users'].map((p) => (
            <label key={p} className="flex items-center gap-2.5 rounded-xl border border-dark-100 p-3 text-sm dark:border-dark-800">
              <input type="checkbox" defaultChecked={active.name === 'Super Admin' || p.startsWith('View') || p === 'Mark attendance'} className="h-4 w-4 accent-primary-600" />
              {p}
            </label>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => toast.success('Changes discarded')}>Discard</Button>
          <Button onClick={() => toast.success(`Permissions for ${active.name} saved`)}>Save Changes</Button>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add System User" subtitle="They'll receive login credentials by email">
        <div className="space-y-4">
          <Input label="Email" placeholder="name@cutm.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => <option key={r.name}>{r.name}</option>)}
          </Select>
          <Select label="Department (for Faculty)">
            <option>Computer Science & Engineering</option>
            <option>Electronics & Communication</option>
            <option>Mechanical Engineering</option>
            <option>Management Studies</option>
          </Select>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { if (!email) return toast.error('Email required'); toast.success(`${role} created — invite sent`); setOpen(false); setEmail(''); }}><KeyRound className="h-4 w-4" /> Create & Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
