export interface Module {
  id: string;
  name: string;
  serverStatus: 'online' | 'offline' | 'warning';
  serverVersion: string;
  diskSpace: {
    total: number;
    used: number;
  };
  computers: Computer[];
  services: Service[];
  hasWarning?: boolean;
  warningMessage?: string;
}

export interface Computer {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  version: string;
}

export interface Service {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
}

export interface Region {
  id: string;
  name: string;
  modules: Module[];
}