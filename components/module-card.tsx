'use client';

import { Module } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Monitor, Cog, AlertTriangle, HardDrive } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ModuleCardProps {
  module: Module;
}

const CURRENT_APP_VERSION = '2.1.0';

export function ModuleCard({ module }: ModuleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'running':
        return 'bg-green-500/15 text-green-700 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-red-500/15 text-red-700 dark:text-red-400';
    }
  };

  const getVersionColor = (version: string) => {
    return version >= CURRENT_APP_VERSION
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  const getDiskSpaceColor = (usedPercentage: number) => {
    if (usedPercentage >= 90) return 'text-red-600 dark:text-red-400';
    if (usedPercentage >= 66) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const diskSpaceUsed = (module.diskSpace.used / module.diskSpace.total) * 100;
  const diskSpaceColor = getDiskSpaceColor(diskSpaceUsed);

  return (
    <Card className={`w-full ${module.hasWarning ? 'border-red-500/50' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">{module.name}</CardTitle>
            {module.hasWarning && (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <Badge className={getStatusColor(module.serverStatus)}>
            {module.serverStatus.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-muted-foreground">Server Version:</span>
          <span className={getVersionColor(module.serverVersion)}>
            {module.serverVersion}
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <HardDrive className="h-4 w-4" />
              <span className="text-muted-foreground">Disk Space:</span>
            </div>
            <span className={diskSpaceColor}>
              {formatBytes(module.diskSpace.used)} / {formatBytes(module.diskSpace.total)}
            </span>
          </div>
          <Progress 
            value={diskSpaceUsed} 
            className={`h-2 ${
              diskSpaceUsed >= 90 ? 'bg-red-200 dark:bg-red-950' : 
              diskSpaceUsed >= 66 ? 'bg-yellow-200 dark:bg-yellow-950' : 
              'bg-green-200 dark:bg-green-950'
            }`}
            indicatorClassName={`${
              diskSpaceUsed >= 90 ? 'bg-red-500' : 
              diskSpaceUsed >= 66 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`}
          />
        </div>
        {module.hasWarning && (
          <div className="mt-2 text-sm text-red-500">
            {module.warningMessage}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="computers">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Connected Computers
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {module.computers.map((computer) => (
                  <div
                    key={computer.id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{computer.name}</span>
                      <span className={`text-xs ${getVersionColor(computer.version)}`}>
                        Version: {computer.version}
                      </span>
                    </div>
                    <Badge className={getStatusColor(computer.status)}>
                      {computer.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="services">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Cog className="h-4 w-4" />
                Services
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {module.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <span className="text-sm">{service.name}</span>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}