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
  const navSections = [
    {
      title: 'Main',
      items: [
        { icon: <DashboardIcon />, label: 'Dashboard' as Page },
        { icon: <DesktopIcon />, label: 'PC Info' as Page },
        { icon: <LaptopIcon />, label: 'Laptop Info' as Page },
        { icon: <ServerIcon />, label: 'Server Info' as Page },
      ],
    },
    {
      title: 'Peripherals',
      items: [
        { icon: <MouseIcon />, label: 'Mouse Log' as Page },
        { icon: <KeyboardIcon />, label: 'Keyboard Log' as Page },
        { icon: <SSDIcon />, label: 'SSD Log' as Page },
        { icon: <BoxIcon />, label: 'Product Inventory' as Page },
      ],
    },
    {
      title: 'Reports',
      items: [
        { icon: <ChartPieIcon />, label: 'Department Summary' as Page },
      ],
    },
  ];

  const settingsItem = { icon: <SettingsIcon />, label: 'Settings' as Page };

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">IT Inventory</h1>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">{section.title}</h2>
                <ul>
                  {section.items.map(item => (
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
            ))}
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