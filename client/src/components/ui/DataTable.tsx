import { useMemo, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { cn } from '../../utils';
import { EmptyState } from './EmptyState';
import { Input, Select } from './Field';
import { useDebounce } from '../../hooks';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
  hideBelow?: 'sm' | 'md' | 'lg';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  filters?: ReactNode;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: ReactNode;
  csvExport?: { filename: string; getRows: () => Record<string, unknown>[] };
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  pageSize = 10,
  searchKeys,
  searchPlaceholder = 'Search…',
  filters,
  onRowClick,
  loading,
  emptyTitle = 'No records found',
  emptyDescription,
  toolbar,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let rows = data;
    if (debouncedQuery && searchKeys) {
      const q = debouncedQuery.toLowerCase();
      rows = rows.filter((row) => searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)));
    }
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      if (col?.sortable) {
        rows = [...rows].sort((a, b) => {
          const va = String(a[sortKey as keyof T] ?? '');
          const vb = String(b[sortKey as keyof T] ?? '');
          return sortDir === 'asc' ? va.localeCompare(vb, undefined, { numeric: true }) : vb.localeCompare(va, undefined, { numeric: true });
        });
      }
    }
    return rows;
  }, [data, debouncedQuery, searchKeys, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="card overflow-hidden">
      {(searchKeys || toolbar || filters) && (
        <div className="flex flex-col gap-3 border-b border-dark-100 p-4 dark:border-dark-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {searchKeys && (
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className="pl-10"
                  aria-label={searchPlaceholder}
                  rightIcon={query ? <button onClick={() => setQuery('')} aria-label="Clear search"><X className="h-4 w-4 text-dark-400" /></button> : undefined}
                />
              </div>
            )}
            {filters}
          </div>
          <div className="flex items-center gap-2">{toolbar}</div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                    col.hideBelow === 'sm' && 'hidden min-[640px]:table-cell',
                    col.hideBelow === 'md' && 'hidden min-[768px]:table-cell',
                    col.hideBelow === 'lg' && 'hidden min-[1024px]:table-cell',
                    col.className,
                  )}
                >
                  {col.sortable ? (
                    <button className="inline-flex items-center gap-1 uppercase hover:text-primary-600" onClick={() => toggleSort(col.key)} aria-label={`Sort by ${col.header}`}>
                      {col.header}
                      <ArrowUpDown className={cn('h-3 w-3', sortKey === col.key ? 'text-primary-600' : 'text-dark-300 dark:text-dark-600')} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col.key}><div className="skeleton h-4 w-full rounded" /></td>
                    ))}
                  </tr>
                ))
              : paged.map((row) => (
                  <tr key={row.id} onClick={() => onRowClick?.(row)} className={cn(onRowClick && 'cursor-pointer')}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                          col.hideBelow === 'sm' && 'hidden min-[640px]:table-cell',
                          col.hideBelow === 'md' && 'hidden min-[768px]:table-cell',
                          col.hideBelow === 'lg' && 'hidden min-[1024px]:table-cell',
                          col.className,
                        )}
                      >
                        {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!loading && filtered.length === 0 && <EmptyState title={emptyTitle} description={emptyDescription} compact />}

      {filtered.length > pageSize && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-dark-100 p-4 dark:border-dark-800 sm:flex-row">
          <p className="text-xs text-dark-500 dark:text-dark-400">
            Showing <span className="font-semibold text-dark-700 dark:text-dark-200">{(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)}</span> of{' '}
            <span className="font-semibold text-dark-700 dark:text-dark-200">{filtered.length}</span> entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="btn-ghost h-8 w-8 rounded-lg p-0" disabled={safePage === 1} onClick={() => setPage(1)} aria-label="First page"><ChevronsLeft className="h-4 w-4" /></button>
            <button className="btn-ghost h-8 w-8 rounded-lg p-0" disabled={safePage === 1} onClick={() => setPage(safePage - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
            <span className="px-2 text-xs font-medium text-dark-600 dark:text-dark-300">
              Page {safePage} / {totalPages}
            </span>
            <button className="btn-ghost h-8 w-8 rounded-lg p-0" disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
            <button className="btn-ghost h-8 w-8 rounded-lg p-0" disabled={safePage === totalPages} onClick={() => setPage(totalPages)} aria-label="Last page"><ChevronsRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PageSizeSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Select value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label="Rows per page" className="w-24 py-1.5 text-xs">
      {[5, 10, 25, 50].map((n) => (
        <option key={n} value={n}>{n} / page</option>
      ))}
    </Select>
  );
}

export function FilterButton({ onClick, active }: { onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} className={cn('btn-outline px-3 py-2 text-xs', active && 'border-primary-500 text-primary-600')} aria-label="Toggle filters">
      <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
    </button>
  );
}
