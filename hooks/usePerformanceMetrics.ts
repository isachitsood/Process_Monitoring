import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SystemMetrics, SystemInfoData } from '../types';

//web sockets connections
const SOCKET_URL = 'http://localhost:3000';
const socket = io(SOCKET_URL, {
  transports: ['websocket'], 
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfoData | null>(null);
  const [networkRequests, setNetworkRequests] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // performance observer
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries().map(entry => ({
        url: entry.name,
        duration: entry.duration,
        timestamp: Date.now()
      }));
//for now we are only taking the last 10 req
      setNetworkRequests(prev => [...prev, ...entries].slice(-10)); 
    });

    observer.observe({ entryTypes: ['resource', 'navigation'] });

    // Event handlers
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleSystemInfo = (info: SystemInfoData) => setSystemInfo(info);
    const handleMetrics = (newMetrics: SystemMetrics) => {
      setMetrics(prev => [...prev, newMetrics].slice(-20)); 
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('systemInfo', handleSystemInfo);
    socket.on('metrics', handleMetrics);

    return () => {
      observer.disconnect();
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('systemInfo', handleSystemInfo);
      socket.off('metrics', handleMetrics);
    };
  }, []);

  return {
    metrics,
    systemInfo,
    networkRequests,
    isConnected
  };
}
