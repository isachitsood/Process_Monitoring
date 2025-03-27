export interface SystemInfoData {
  cpuCores: number;
  platform: string;
  hostname: string;
  arch: string;
  gpus: GpuInfo[];
}

export interface GpuInfo {
  name: string;
  vendor: string;
  type: 'integrated' | 'dedicated';
  memoryTotal: number;
  memoryUsed: number;
  temperature?: number;
  usage: number;
  fanSpeed?: number;
  clockCore?: number;
  clockMemory?: number;
}

export interface SystemMetrics {
  timestamp: number;
  memory: {
    total: number;
    free: number;
    used: number;
    percentage: number;
  };
  cpu: {
    cores: number;
    usage: number[];
    averageUsage: number;
  };
  gpu: {
    usage: number[];
    memory: number[];
    temperature: number[];
    fanSpeed: number[];
    clockCore: number[];
    clockMemory: number[];
  };
  loadAverage: number[];
  uptime: number;
  processes: ProcessInfo[];
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: string;
  uptime: number;
  command?: string;
  path?: string;
  user?: string;
}

export interface NetworkRequest {
  url: string;
  duration: number;
  timestamp: number;
}

export interface AlertThresholds {
  cpu: number;
  memory: number;
  gpu: number;
}