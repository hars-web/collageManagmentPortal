import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Building2, BedDouble, Users } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Modal, Input, Select } from '../../components/ui';
import { hostelRooms, students } from '../../data/mock';
import { cn } from '../../utils';

export default function AdminHostel() {
  const [rooms, setRooms] = useState(hostelRooms);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ block: 'A', roomNo: '', capacity: '2', studentName: '' });

  const occupancy = Math.round((hostelRooms.reduce((s, r) => s + r.occupied, 0) / hostelRooms.reduce((s, r) => s + r.capacity, 0)) * 100);

  const allocate = () => {
    if (!form.roomNo || !form.studentName) return toast.error('Room number and student required');
    setRooms((rs) => rs.map((r) => (r.roomNo === form.roomNo && r.block === form.block ? { ...r, occupied: Math.min(r.capacity, r.occupied + 1) } : r)));
    toast.success(`${form.studentName} allocated Room ${form.roomNo}, Block ${form.block}`);
    setOpen(false);
    setForm({ block: 'A', roomNo: '', capacity: '2', studentName: '' });
  };

  return (
    <div>
      <PageHeader
        title="Hostel Management"
        subtitle="4 blocks · 1,248 rooms · mess & warden controls"
        crumbs={[{ label: 'Admin' }, { label: 'Hostel' }]}
        actions={<Button onClick={() => setOpen(true)}><BedDouble className="h-4 w-4" /> Allocate Room</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-dark-400">Occupancy</p><p className="mt-1 text-2xl font-bold text-secondary-600 dark:text-secondary-400">{occupancy}%</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Residents</p><p className="mt-1 text-2xl font-bold">{hostelRooms.reduce((s, r) => s + r.occupied, 0)}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Vacant Beds</p><p className="mt-1 text-2xl font-bold text-success">{hostelRooms.reduce((s, r) => s + (r.capacity - r.occupied), 0)}</p></Card>
        <Card className="p-4"><p className="text-xs text-dark-400">Waitlist</p><p className="mt-1 text-2xl font-bold text-accent-500">34</p></Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map((r) => (
          <Card key={r.id} className="card-hover p-5">
            <div className="flex items-start justify-between">
              <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', r.block === 'A' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : r.block === 'B' ? 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400' : r.block === 'C' ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400')}>
                <Building2 className="h-5 w-5" />
              </span>
              <Badge tone={r.occupied >= r.capacity ? 'danger' : r.occupied === 0 ? 'success' : 'accent'}>
                {r.occupied >= r.capacity ? 'Full' : r.occupied === 0 ? 'Vacant' : `${r.capacity - r.occupied} bed${r.capacity - r.occupied > 1 ? 's' : ''} left`}
              </Badge>
            </div>
            <h3 className="mt-3 font-semibold">Block {r.block} · Room {r.roomNo}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-dark-400">
              <Users className="h-3.5 w-3.5" /> {r.occupied}/{r.capacity} occupants · {r.type} · ₹{r.feesPerSem.toLocaleString('en-IN')}/sem
            </p>
            <div className="mt-3 flex gap-1.5">
              {Array.from({ length: r.capacity }).map((_, i) => (
                <span key={i} className={cn('h-2.5 flex-1 rounded-full', i < r.occupied ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-dark-100 dark:bg-dark-800')} />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-outline flex-1 py-1.5 text-xs" onClick={() => toast.success('Room details opened')}>Details</button>
              <button className="btn-primary flex-1 py-1.5 text-xs" onClick={() => toast.success(r.occupied >= r.capacity ? 'Move-out initiated' : 'New allocation form opened')}>{r.occupied >= r.capacity ? 'Move Out' : 'Allocate'}</button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Allocate Hostel Room" subtitle="Seat map updates instantly">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Block" value={form.block} onChange={(e) => setForm({ ...form, block: e.target.value })}>
              {['A', 'B', 'C', 'D'].map((b) => <option key={b}>{b}</option>)}
            </Select>
            <Input label="Room No" placeholder="214" value={form.roomNo} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} />
          </div>
          <Input label="Student" list="hostel-students" placeholder="Start typing student name…" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
          <datalist id="hostel-students">
            {students.map((s) => <option key={s.id} value={s.name} />)}
          </datalist>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={allocate}>Allocate Room</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
