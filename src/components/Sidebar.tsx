
import { useState, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BasicInfo } from '@/components/sections/BasicInfo';
import { Summary } from '@/components/sections/Summary';
import { Experiences } from '@/components/sections/Experiences';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { GeneralSection } from '@/components/sections/GeneralSection';
import { ThemeSelector } from '@/components/ThemeSelector';
import { TailorCVDialog } from '@/components/TailorCVDialog';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { AddSection } from '@/components/AddSectionPanel';
import { DownloadOptions } from '@/components/DownloadOptions';
import { CVData, ThemeType } from '@/lib/types';
import { downloadJSON, readJSONFile } from '@/lib/utils';
import { 
  Upload, 
  FileJson,
  FileText,
  Settings,
  Palette,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface SidebarProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

interface Section {
  id: string;
  label: string;
}

export function Sidebar({ data, onChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basicInfo']);
  const [importKey, setImportKey] = useState<number>(0); // Used to reset file input
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleThemeChange = (theme: ThemeType) => {
    onChange({ ...data, activeTheme: theme });
  };

  const handleTailoredCV = (tailoredData: CVData) => {
    onChange(tailoredData);
  };

  const handleExportJSON = () => {
    downloadJSON(data, 'cv-data.json');
    toast.success('CV data exported successfully');
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await readJSONFile(file);
      onChange(importedData);
      toast.success('CV data imported successfully');
      
      // Reset the file input
      setImportKey(prev => prev + 1);
    } catch (error) {
      console.error('Error importing JSON:', error);
      toast.error('Failed to import CV data. Please check the file format.');
    }
  };

  const triggerImportDialog = () => {
    fileInputRef.current?.click();
  };

  const sections: Section[] = Object.keys(data).filter(key => key !== 'activeTheme' && key !== 'sectionConfig').map(key => ({
    id: key,
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
  }))

  const Components = {
    basicInfo: BasicInfo,
    summary: Summary,
    experiences: Experiences,
    education: Education,
    skills: Skills,
    projects: Projects
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50/70 border-r backdrop-blur-sm">
      
      
      <ScrollArea className="flex-1 px-4 py-2" style={{ maxHeight: 'calc(100vh - 82px)' }}>
        <div className="space-y-6">
          <Accordion
            type="multiple"
            value={expandedSections}
            onValueChange={setExpandedSections}
            className="space-y-4"
          >
             <AccordionItem value="theme" className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>Theme</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <ThemeSelector 
                  selectedTheme={data.activeTheme}
                  onChange={handleThemeChange}
                />
              </AccordionContent>
            </AccordionItem>
            {sections.map((section) => {
              const Component = Components[section.id] ?? GeneralSection;
              return <AccordionItem key={section.id} value={section.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-100/50 transition-colors">
                          {section.label}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 px-4 pb-4">
                          <Component 
                            data={data[section.id]}
                            onChange={(newData) => onChange({ ...data, [section.id]: newData })}
                          />
                        </AccordionContent>
                    </AccordionItem>
            })}


          </Accordion>

          <div className="space-y-4 py-4">
            <div className="space-y-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
              <DownloadOptions cvData={data} />
            </div>

          

           
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
