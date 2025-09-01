// src/App.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Preview } from '@/components/Preview';
import { CVData } from '@/lib/types';
import { defaultCVData } from '@/lib/defaultData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster as ToasterProvider } from "@/components/ui/toaster";
import { Toaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthScreen } from "@/components/AuthScreen";

function App() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [user, setUser] = useState<any | null | undefined>(undefined);
  const isMobile = useIsMobile();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cv-data');
    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved CV data', e);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('cv-data', JSON.stringify(cvData));
  }, [cvData]);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Show loading while auth state is being determined
  if (user === undefined) {
    return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading...</div>;
  }

  // Show login screen if not authenticated
  if (!user) {
    return <AuthScreen onLogin={() => {}} />;
  }

  // ✅ Authenticated screens (mobile + desktop)
  const commonHeader = (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
        Development of a Web Application for Generating 
        Optimized Resume Based on User Input Using NLP
      </h1>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
      >
        Logout.  
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <TooltipProvider>
        <ToasterProvider />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
          <Toaster position="top-center" richColors />
          {commonHeader}
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="edit" className="transition-all">Edit</TabsTrigger>
              <TabsTrigger value="preview" className="transition-all">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4 overflow-auto animate-fade-in">
              <Preview data={cvData} />
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    );
  }

  // 💼 Desktop layout
  return (
    <TooltipProvider>
      <ToasterProvider />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 animate-fade-in">
        <Toaster position="top-right" richColors />
        <div className="container mx-auto py-6 px-4">
          {commonHeader}
          <div className="bg-white/40 backdrop-blur-md rounded-xl border shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
              <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="transition-all">
                <Sidebar data={cvData} onChange={setCVData} />
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-gray-200 transition-colors hover:bg-gray-300" />

              <ResizablePanel defaultSize={70} className="transition-all">
                <div className="h-full bg-gray-50/80 backdrop-blur-sm flex items-center justify-center p-8 overflow-auto">
                  <Preview data={cvData} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
