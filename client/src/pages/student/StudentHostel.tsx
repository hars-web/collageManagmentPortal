import { PageHeader, Card, Badge, StatCard, DataTable, type Column } from '../../components/ui';
import { hostelRooms } from '../../data/mock';
import { BedDouble, Building2, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { formatINR } from '../../utils';

export default function StudentHostel() {
  const room = hostelRooms[0];

  const columns: Column<(typeof hostelRooms)[number]>[] = [
    { key: 'hostel', header: 'Hostel', render: (r) => <span className="font-medium">{r.hostel}</span> },
    { key: 'block', header: 'Block', render: (r) => <Badge tone="primary">{r.block}</Badge> },
    { key: 'roomNo', header: 'Room', render: (r) => <span className="font-bold">{r.roomNo}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge tone="secondary">{r.type}</Badge> },
    { key: 'capacity', header: 'Occupancy', align: 'center', render: (r) => <span>{r.occupied}/{r.capacity}</span> },
    { key: 'feesPerSem', header: 'Fees/Sem', align: 'right', render: (r) => formatINR(r.feesPerSem) },
  ];

  return (
    <div>
      <PageHeader title="Hostel" subtitle="Boys Hostel · Block A · Room A-204" crumbs={[{ label: 'Student' }, { label: 'Hostel' }]} />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Hostel Fees Paid" value={25000} icon={<Building2 className="h-5 w-5" />} iconClass="primary" format="currency" trendLabel="Semester 6 — paid ✓" />
        <StatCard label="Room Type" value="Double" icon={<BedDouble className="h-5 w-5" />} iconClass="secondary" format="plain" />
        <StatCard label="Warden" value="P.K. Mohanty" icon={<UserRound className="h-5 w-5" />} iconClass="accent" format="plain" />
        <StatCard label="Security" value="24×7" icon={<ShieldCheck className="h-5 w-5" />} iconClass="success" format="plain" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="border-b border-dark-100 p-5 dark:border-dark-800">
            <h3 className="text-base font-semibold">My Room</h3>
            <p className="text-xs text-dark-400">Room allocation verified for the academic year 2026-27</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            {[
              { label: 'Hostel', value: room.hostel.split('—')[0].trim() },
              { label: 'Block & Room', value: `${room.block} · ${room.roomNo}` },
              { label: 'Roommates', value: '1 / 2 (1 slot open)' },
              { label: 'Fees / Semester', value: formatINR(room.feesPerSem) },
              { label: 'Mess Plan', value: 'Vegetarian + Non-veg (Wed, Sat)' },
              { label: 'Warden Contact', value: '+91 98610 44110' },
            ].map((i) => (
              <div key={i.label} className="rounded-xl bg-dark-50 p-4 dark:bg-dark-800">
                <p className="text-[11px] font-medium uppercase tracking-wide text-dark-400">{i.label}</p>
                <p className="mt-1 text-sm font-semibold">{i.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-dark-100 px-5 py-3 text-xs text-dark-400 dark:border-dark-800">
            <MapPin className="h-3.5 w-3.5 text-secondary-600" /> In-room Wi-Fi · Hot water · Laundry · Gym · Common room · Biometric security
          </div>
        </Card>

        <Card>
          <div className="border-b border-dark-100 p-5 dark:border-dark-800">
            <h3 className="text-base font-semibold">Mess Menu — This Week</h3>
          </div>
          <div className="divide-y divide-dark-100 dark:divide-dark-800">
            {[
              { day: 'Mon', items: 'Dal Tadka, Paneer, Roti, Rice, Salad' },
              { day: 'Tue', items: 'Rajma, Veg Pulao, Raita, Sweet' },
              { day: 'Wed', items: 'Chicken Curry, Dal, Roti, Rice' },
              { day: 'Thu', items: 'Chole, Poori, Rice, Papad' },
              { day: 'Fri', items: 'Veg Biryani, Curd, Raita, Gulab Jamun' },
              { day: 'Sat', items: 'Fish Curry, Dal, Roti, Rice' },
              { day: 'Sun', items: 'Special Thali + Ice cream' },
            ].map((m) => (
              <div key={m.day} className="flex items-center gap-3 px-5 py-2.5 text-sm">
                <span className="w-10 shrink-0 font-bold text-primary-600 dark:text-primary-400">{m.day}</span>
                <span className="text-dark-500 dark:text-dark-400">{m.items}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <DataTable data={hostelRooms} columns={columns} pageSize={10} emptyTitle="No rooms available" />
      </div>
    </div>
  );
}
