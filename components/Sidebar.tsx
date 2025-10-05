import React from 'react';
import { DashboardIcon, DesktopIcon, LaptopIcon, ServerIcon, MouseIcon, KeyboardIcon, SSDIcon, ChartPieIcon, SettingsIcon, BoxIcon } from './Icons';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li className="mb-1">
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const mainNavItems: { icon: React.ReactNode; label: Page }[] = [
    { icon: <DashboardIcon />, label: 'Dashboard' },
    { icon: <DesktopIcon />, label: 'PC Info' },
    { icon: <LaptopIcon />, label: 'Laptop Info' },
    { icon: <ServerIcon />, label: 'Server Info' },
  ];

  const peripheralNavItems: { icon: React.ReactNode; label: Page }[] = [
    { icon: <MouseIcon />, label: 'Mouse Log' },
    { icon: <KeyboardIcon />, label: 'Keyboard Log' },
    { icon: <SSDIcon />, label: 'SSD Log' },
    { icon: <BoxIcon />, label: 'Product Inventory' },
  ];

  const reportNavItems: { icon: React.ReactNode; label: Page }[] = [
     { icon: <ChartPieIcon />, label: 'Department Summary' },
  ];
  
  const settingsItem = { icon: <SettingsIcon />, label: 'Settings' as Page };

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">IT Inventory</h1>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto space-y-6">
            <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Main</h2>
                <ul>
                    {mainNavItems.map(item => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.label}
                            onClick={() => setCurrentPage(item.label)}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Peripherals</h2>
                <ul>
                    {peripheralNavItems.map(item => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.label}
                            onClick={() => setCurrentPage(item.label)}
                        />
                    ))}
                </ul>
            </div>
             <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Reports</h2>
                <ul>
                    {reportNavItems.map(item => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.label}
                            onClick={() => setCurrentPage(item.label)}
                        />
                    ))}
                </ul>
            </div>
        </nav>
        <div className="p-4 border-t border-gray-700">
             <ul>
                 <NavItem
                    icon={settingsItem.icon}
                    label={settingsItem.label}
                    isActive={currentPage === settingsItem.label}
                    onClick={() => setCurrentPage(settingsItem.label)}
                />
            </ul>
        </div>
    </div>
  );
};
