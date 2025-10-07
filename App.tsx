import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PCInfo } from './pages/PCInfo';
import { LaptopInfo } from './pages/LaptopInfo';
import { ServerInfo } from './pages/ServerInfo';
import { PeripheralLog } from './pages/PeripheralLog';
import { KeyboardLog } from './pages/KeyboardLog';
import { SSDLog } from './pages/SSDLog';
import { DepartmentSummary } from './pages/DepartmentSummary';
import { MenuIcon, XIcon } from './components/Icons';
import { Settings } from './pages/Settings';
import { ProductInventory } from './pages/ProductInventory';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard setActivePage={setCurrentPage} />;
      case 'PC Info':
        return <PCInfo />;
      case 'Laptop Info':
        return <LaptopInfo />;
      case 'Server Info':
        return <ServerInfo />;
      case 'Mouse Log':
        return <PeripheralLog />;
      case 'Keyboard Log':
        return <KeyboardLog />;
      case 'SSD Log':
        return <SSDLog />;
      case 'Department Summary':
        return <DepartmentSummary />;
      case 'Product Inventory':
        return <ProductInventory />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard setActivePage={setCurrentPage} />;
    }
  };
  
  const handleSetCurrentPage = useCallback((page: Page) => {
    setCurrentPage(page);
    if (window.innerWidth < 768) {
        setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <Sidebar currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 md:hidden">
          <h1 className="text-xl font-semibold text-gray-800">TDS IT Inventory</h1>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700">
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;