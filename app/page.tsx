'use client';

import { useEffect, useState } from 'react';
import { RegionTabs } from '@/components/region-tabs';
import { api } from '@/lib/axios';
import { Region } from '@/types';

const CURRENT_APP_VERSION = '2.1.0';

// Temporary mock data - replace with API call
const mockRegions: Region[] = [
  {
    id: 'mexico',
    name: 'Mexico',
    modules: [
      {
        id: 'mx-1',
        name: 'Production Line A',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 450 * 1024 * 1024 * 1024, // 450GB
        },
        computers: [
          { id: 'pc-1', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-2', name: 'Vision System', status: 'warning', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-1', name: 'Main Controller', status: 'running' },
          { id: 'svc-2', name: 'Data Logger', status: 'running' },
        ],
      },
      {
        id: 'mx-2',
        name: 'Production Line B',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 200 * 1024 * 1024 * 1024, // 200GB
        },
        computers: [
          { id: 'pc-3', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-4', name: 'Quality Control', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-3', name: 'Main Controller', status: 'running' },
          { id: 'svc-4', name: 'Analytics Service', status: 'running' },
        ],
      },
      {
        id: 'mx-3',
        name: 'Production Line C',
        serverStatus: 'online',
        serverVersion: '2.0.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 350 * 1024 * 1024 * 1024, // 350GB
        },
        computers: [
          { id: 'pc-5', name: 'Control PC', status: 'online', version: '2.0.0' },
          { id: 'pc-6', name: 'Monitoring Station', status: 'online', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-5', name: 'Main Controller', status: 'running' },
          { id: 'svc-6', name: 'Data Collection', status: 'running' },
        ],
      },
    ],
  },
  {
    id: 'china',
    name: 'China',
    modules: [
      {
        id: 'cn-1',
        name: 'Production Line X',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 1024 * 1024 * 1024 * 1024, // 1TB
          used: 600 * 1024 * 1024 * 1024, // 600GB
        },
        computers: [
          { id: 'pc-7', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-8', name: 'Quality Station', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-7', name: 'Main Controller', status: 'running' },
          { id: 'svc-8', name: 'Analytics', status: 'running' },
        ],
      },
      {
        id: 'cn-2',
        name: 'Production Line Y',
        serverStatus: 'warning',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 480 * 1024 * 1024 * 1024, // 480GB
        },
        computers: [
          { id: 'pc-9', name: 'Control PC', status: 'warning', version: '2.1.0' },
          { id: 'pc-10', name: 'Vision System', status: 'online', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-9', name: 'Main Controller', status: 'running' },
          { id: 'svc-10', name: 'Data Logger', status: 'error' },
        ],
      },
      {
        id: 'cn-3',
        name: 'Production Line Z',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 300 * 1024 * 1024 * 1024, // 300GB
        },
        computers: [
          { id: 'pc-11', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-12', name: 'Inspection System', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-11', name: 'Main Controller', status: 'running' },
          { id: 'svc-12', name: 'Quality Control', status: 'running' },
        ],
      },
    ],
  },
  {
    id: 'brazil',
    name: 'Brazil',
    modules: [
      {
        id: 'br-1',
        name: 'Production Line 1',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 250 * 1024 * 1024 * 1024, // 250GB
        },
        computers: [
          { id: 'pc-13', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-14', name: 'Vision System', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-13', name: 'Main Controller', status: 'running' },
          { id: 'svc-14', name: 'Data Collection', status: 'running' },
        ],
      },
      {
        id: 'br-2',
        name: 'Production Line 2',
        serverStatus: 'offline',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 100 * 1024 * 1024 * 1024, // 100GB
        },
        computers: [
          { id: 'pc-15', name: 'Control PC', status: 'offline', version: '2.1.0' },
          { id: 'pc-16', name: 'Quality Station', status: 'offline', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-15', name: 'Main Controller', status: 'stopped' },
          { id: 'svc-16', name: 'Analytics', status: 'stopped' },
        ],
      },
      {
        id: 'br-3',
        name: 'Production Line 3',
        serverStatus: 'online',
        serverVersion: '2.0.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 400 * 1024 * 1024 * 1024, // 400GB
        },
        computers: [
          { id: 'pc-17', name: 'Control PC', status: 'online', version: '2.0.0' },
          { id: 'pc-18', name: 'Monitoring Station', status: 'online', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-17', name: 'Main Controller', status: 'running' },
          { id: 'svc-18', name: 'Data Logger', status: 'running' },
        ],
      },
    ],
  },
  {
    id: 'hungary',
    name: 'Hungary',
    modules: [
      {
        id: 'hu-1',
        name: 'Production Line Alpha',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 200 * 1024 * 1024 * 1024, // 200GB
        },
        computers: [
          { id: 'pc-19', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-20', name: 'Vision System', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-19', name: 'Main Controller', status: 'running' },
          { id: 'svc-20', name: 'Quality Control', status: 'running' },
        ],
      },
      {
        id: 'hu-2',
        name: 'Production Line Beta',
        serverStatus: 'warning',
        serverVersion: '2.0.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 490 * 1024 * 1024 * 1024, // 490GB
        },
        computers: [
          { id: 'pc-21', name: 'Control PC', status: 'online', version: '2.0.0' },
          { id: 'pc-22', name: 'Inspection System', status: 'warning', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-21', name: 'Main Controller', status: 'running' },
          { id: 'svc-22', name: 'Analytics', status: 'error' },
        ],
      },
      {
        id: 'hu-3',
        name: 'Production Line Gamma',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 350 * 1024 * 1024 * 1024, // 350GB
        },
        computers: [
          { id: 'pc-23', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-24', name: 'Quality Station', status: 'online', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-23', name: 'Main Controller', status: 'running' },
          { id: 'svc-24', name: 'Data Collection', status: 'running' },
        ],
      },
    ],
  },
  {
    id: 'usa',
    name: 'USA',
    modules: [
      {
        id: 'us-1',
        name: 'Production Line East',
        serverStatus: 'online',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 1024 * 1024 * 1024 * 1024, // 1TB
          used: 400 * 1024 * 1024 * 1024, // 400GB
        },
        computers: [
          { id: 'pc-25', name: 'Control PC', status: 'online', version: '2.1.0' },
          { id: 'pc-26', name: 'Vision System', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-25', name: 'Main Controller', status: 'running' },
          { id: 'svc-26', name: 'Analytics', status: 'running' },
        ],
      },
      {
        id: 'us-2',
        name: 'Production Line Central',
        serverStatus: 'online',
        serverVersion: '2.0.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 300 * 1024 * 1024 * 1024, // 300GB
        },
        computers: [
          { id: 'pc-27', name: 'Control PC', status: 'online', version: '2.0.0' },
          { id: 'pc-28', name: 'Quality Station', status: 'online', version: '2.0.0' },
        ],
        services: [
          { id: 'svc-27', name: 'Main Controller', status: 'running' },
          { id: 'svc-28', name: 'Data Logger', status: 'running' },
        ],
      },
      {
        id: 'us-3',
        name: 'Production Line West',
        serverStatus: 'warning',
        serverVersion: '2.1.0',
        diskSpace: {
          total: 500 * 1024 * 1024 * 1024, // 500GB
          used: 475 * 1024 * 1024 * 1024, // 475GB
        },
        computers: [
          { id: 'pc-29', name: 'Control PC', status: 'warning', version: '2.1.0' },
          { id: 'pc-30', name: 'Monitoring Station', status: 'online', version: '2.1.0' },
        ],
        services: [
          { id: 'svc-29', name: 'Main Controller', status: 'error' },
          { id: 'svc-30', name: 'Quality Control', status: 'running' },
        ],
      },
    ],
  },
];

export default function Home() {
  const [regions, setRegions] = useState<Region[]>(mockRegions);

  useEffect(() => {
    // Process modules to add warning flags
    const processedRegions = regions.map(region => ({
      ...region,
      modules: region.modules.map(module => {
        const outdatedComputers = module.computers.filter(
          pc => pc.version < CURRENT_APP_VERSION
        );
        const warningComputers = module.computers.filter(
          pc => pc.status === 'warning' || pc.status === 'offline'
        );
        const warningServices = module.services.filter(
          service => service.status === 'error' || service.status === 'stopped'
        );
        const diskSpaceUsedPercentage = (module.diskSpace.used / module.diskSpace.total) * 100;

        const warnings = [
          ...(module.serverVersion < CURRENT_APP_VERSION ? ['Server outdated'] : []),
          ...outdatedComputers.map(pc => `${pc.name} outdated`),
          ...warningComputers.map(pc => `${pc.name} ${pc.status}`),
          ...warningServices.map(service => `${service.name} ${service.status}`),
          ...(diskSpaceUsedPercentage >= 90 ? ['Critical disk space'] : []),
        ];

        return {
          ...module,
          hasWarning: warnings.length > 0,
          warningMessage: warnings.join(', '),
        };
      }),
    }));

    setRegions(processedRegions);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Production Line Dashboard</h1>
        <div className="text-sm font-medium">
          Current Version: <span className="text-green-600">{CURRENT_APP_VERSION}</span>
        </div>
      </div>
      <RegionTabs regions={regions} />
    </div>
  );
}