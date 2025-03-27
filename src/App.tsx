import { MemoryStick as Memory, Cpu, Network, Clock } from 'lucide-react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { PerformanceGraph } from './components/PerformanceGraph';
import { NetworkTable } from './components/NetworkTable';
import { SystemInfo } from './components/SystemInfo';
import { ProcessManager } from './components/ProcessManager';
import { usePerformanceMetrics } from './hooks/usePerformanceMetrics';

// Define thresholds for alerts
const CPU_THRESHOLD = 80; // 80%
const MEMORY_THRESHOLD = 90; // 90%

function App() {
  const { metrics, systemInfo, networkRequests, isConnected } = usePerformanceMetrics();
  const latestMetrics = metrics[metrics.length - 1];

  const handleKillProcess = async (pid: number) => {
    try {
      const response = await fetch(`http://localhost:3000/process/${pid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to terminate process');
      }
    } catch (error) {
      console.error('Error terminating process:', error);
      // Here you could add a toast notification for error feedback
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SystemInfo info={systemInfo} isConnected={isConnected} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Memory}
            title="Memory Usage"
            value={latestMetrics ? `${latestMetrics.memory.percentage.toFixed(1)}%` : 'N/A'}
          />
          <MetricCard
            icon={Cpu}
            title="CPU Usage"
            value={latestMetrics ? `${latestMetrics.cpu.averageUsage.toFixed(1)}%` : 'N/A'}
          />
          <MetricCard
            icon={Network}
            title="Network Requests"
            value={networkRequests.length.toString()}
          />
          <MetricCard
            icon={Clock}
            title="Uptime"
            value={latestMetrics ? `${Math.floor(latestMetrics.uptime / 3600)}h ${Math.floor((latestMetrics.uptime % 3600) / 60)}m` : 'N/A'}
          />
        </div>

        <PerformanceGraph data={metrics} />
        
        {latestMetrics && latestMetrics.processes && (
          <ProcessManager
            processes={latestMetrics.processes}
            onKillProcess={handleKillProcess}
            cpuThreshold={CPU_THRESHOLD}
            memoryThreshold={MEMORY_THRESHOLD}
          />
        )}
        
        <NetworkTable requests={networkRequests} />
      </div>
    </div>
  );
}

export default App;