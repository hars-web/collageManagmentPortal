import type { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import type { AnalyticsPoint } from '../../types';
import { cn } from '../../utils';

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid rgba(148,163,184,0.2)',
  background: 'rgba(15,23,42,0.92)',
  color: '#F1F5F9',
  fontSize: 12,
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
};

const axisProps = {
  tick: { fill: '#94A3B8', fontSize: 11 },
  axisLine: { stroke: 'rgba(148,163,184,0.15)' },
  tickLine: false as const,
};

export const chartColors = {
  primary: '#2563EB',
  secondary: '#14B8A6',
  accent: '#F59E0B',
  success: '#22C55E',
  danger: '#EF4444',
  purple: '#8B5CF6',
  pink: '#EC4899',
  sky: '#0EA5E9',
  dark: '#64748B',
};

export function ChartCard({ title, subtitle, children, className, actions }: { title: string; subtitle?: string; children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={cn('card p-5', className)}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-dark-400 dark:text-dark-500">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div className="h-64 w-full">{children}</div>
    </motion.div>
  );
}

interface TrendChartProps {
  data: AnalyticsPoint[];
  type?: 'area' | 'line';
  color?: string;
  height?: number;
  showGrid?: boolean;
  secondaryKey?: string;
}

export function TrendChart({ data, type = 'area', color = chartColors.primary, height = 256, showGrid = true, secondaryKey }: TrendChartProps) {
  const Chart = type === 'area' ? AreaChart : LineChart;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <Chart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 6" stroke="rgba(148,163,184,0.14)" vertical={false} />}
        <XAxis dataKey="label" {...axisProps} dy={6} />
        <YAxis {...axisProps} width={44} domain={secondaryKey ? undefined : [0, (dataMax: number) => Math.ceil(dataMax * 1.15)]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: color, strokeDasharray: '4 4', strokeOpacity: 0.4 }} />
        {type === 'area' ? (
          <>
            <defs>
              <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.32} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#grad-${color.replace('#', '')})`} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
            {secondaryKey && <Area type="monotone" dataKey={secondaryKey} stroke={chartColors.dark} strokeWidth={2} strokeDasharray="5 5" fill="transparent" dot={false} />}
          </>
        ) : (
          <>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            {secondaryKey && <Line type="monotone" dataKey={secondaryKey} stroke={chartColors.dark} strokeWidth={2} strokeDasharray="5 5" dot={false} />}
          </>
        )}
      </Chart>
    </ResponsiveContainer>
  );
}

interface BarChartProps {
  data: AnalyticsPoint[];
  color?: string;
  height?: number;
  vertical?: boolean;
  radius?: number;
}

export function BarChartComponent({ data, color = chartColors.primary, height = 256, vertical, radius = 6 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: vertical ? -20 : -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 6" stroke="rgba(148,163,184,0.14)" vertical={false} />
        {vertical ? (
          <>
            <XAxis dataKey="value" type="number" {...axisProps} />
            <YAxis dataKey="label" type="category" width={84} {...axisProps} />
          </>
        ) : (
          <>
            <XAxis dataKey="label" {...axisProps} dy={6} />
            <YAxis {...axisProps} width={44} />
          </>
        )}
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(37,99,235,0.06)' }} />
        <Bar dataKey="value" radius={radius} maxBarSize={vertical ? 18 : 34} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PieChartProps {
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
  donut?: boolean;
  centerLabel?: string;
  centerValue?: string;
}

export function PieChartComponent({ data, height = 256, colors = [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.purple, chartColors.pink, chartColors.sky], donut = true, centerLabel, centerValue }: PieChartProps) {
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={donut ? '58%' : 0} outerRadius="82%" paddingAngle={donut ? 3 : 0} strokeWidth={2} stroke="rgba(255,255,255,0.6)">
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      {donut && centerValue && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-10">
          <span className="text-2xl font-bold text-dark-900 dark:text-white">{centerValue}</span>
          {centerLabel && <span className="text-xs text-dark-400 dark:text-dark-500">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function RadialProgressChart({ value, label, color = chartColors.primary, height = 180, max = 100 }: { value: number; label?: string; color?: string; height?: number; max?: number }) {
  const data = [{ name: 'score', value: Math.round((value / max) * 100) }];
  return (
    <div className="relative mx-auto w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart data={data} innerRadius="72%" outerRadius="100%" startAngle={210} endAngle={-30}>
          <RadialBar dataKey="value" cornerRadius={12} fill={color} background={{ fill: 'rgba(148,163,184,0.12)' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-dark-900 dark:text-white">{value}%</span>
        {label && <span className="text-xs text-dark-400 dark:text-dark-500">{label}</span>}
      </div>
    </div>
  );
}
