'use client';

import { useState } from 'react';
import { Region } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleCard } from '@/components/module-card';

interface RegionTabsProps {
  regions: Region[];
}

export function RegionTabs({ regions }: RegionTabsProps) {
  const [activeRegion, setActiveRegion] = useState(regions[0]?.id);

  return (
    <Tabs defaultValue={activeRegion} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        {regions.map((region) => (
          <TabsTrigger key={region.id} value={region.id}>
            {region.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {regions.map((region) => (
        <TabsContent key={region.id} value={region.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {region.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}