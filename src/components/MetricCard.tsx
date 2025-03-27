
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: typeof LucideIcon;
  title: string;
  value: string;
}

export function MetricCard({ icon: Icon, title, value }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}