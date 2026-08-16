import { useEffect, useMemo } from 'react';
import { PageHeader, Card, Badge } from '../../components/ui';
import { notifications } from '../../data/mock';
import { statusTone } from '../../components/ui/Badge';
import { useAppDispatch, useAppSelector } from '../../store';
import { markAllRead, markRead } from '../../store/slices/notificationSlice';
import { setNotifications } from '../../store/slices/notificationSlice';
import { timeAgo, cn } from '../../utils';
import { BellOff, CheckCheck } from 'lucide-react';

export default function StudentNotifications() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.notifications.items);
  const list = useMemo(() => (items.length ? items : notifications), [items]);

  useEffect(() => {
    if (!items.length) dispatch(setNotifications(notifications));
  }, [dispatch, items.length]);

  const unread = list.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread · real-time via email, SMS and in-app`}
        crumbs={[{ label: 'Student' }, { label: 'Notifications' }]}
        actions={
          <button className="btn-outline" onClick={() => dispatch(markAllRead())} disabled={unread === 0}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        }
      />

      <Card className="divide-y divide-dark-100 dark:divide-dark-800">
        {list.map((n) => (
          <button
            key={n.id}
            onClick={() => dispatch(markRead(n.id))}
            className={cn('flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-50/50 dark:hover:bg-dark-800/60', !n.read && 'bg-primary-50/40 dark:bg-primary-900/10')}
          >
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40 dark:text-primary-400">
              <BellOff className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold">{n.title}</span>
                <Badge tone={statusTone(n.type)}>{n.type}</Badge>
              </span>
              <span className="mt-1 block text-sm text-dark-500 dark:text-dark-400">{n.message}</span>
              <span className="mt-1.5 block text-[11px] font-medium text-dark-400">{timeAgo(n.createdAt)}</span>
            </span>
            {!n.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary-600" aria-hidden />}
          </button>
        ))}
      </Card>
    </div>
  );
}
