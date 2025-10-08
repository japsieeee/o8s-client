export interface EventMetricsResponse {
  dateTime: string; // yyyy-MM-dd HH:mm:ss
  agentId: string;
  clusterId: string;
  memory: {
    total: number;
    free: number;
    used: number;
    usedPercent: number;
  };
  storage: {
    filesystem: string;
    size: string;
    used: string;
    avail: string;
    usedPercent: string;
    mount: string;
  }[];
  cpu: {
    cores: number;
    loadAvg: number[];
    usagePerCore: number[];
  };
  topProcesses: {
    pid: number;
    memPercent: number;
    command: string;
  }[];
  network: {
    iface: string;
    rxBytes: number;
    txBytes: number;
  }[];
  uptime: number;

  /**
   * PM2 service information, if available.
   * Undefined if PM2 is not installed or not running.
   */
  pm2Services?: {
    configFile: string;
    services: {
      name: string;
      pid: number | null;
      status: 'online' | 'stopped' | 'errored' | 'unknown';
      cpu: number;
      memory: number;
      uptime: number;
      restarts: number;
      version?: string;
    }[];
  };
}
