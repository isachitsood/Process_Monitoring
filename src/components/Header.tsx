
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Activity className="w-8 h-8 text-indigo-600" />
        System Performance Dashboard
      </h1>
    </header>
  );
}