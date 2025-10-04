import React from 'react';
import { DashboardIcon, DesktopIcon, LaptopIcon, ServerIcon, MouseIcon, KeyboardIcon, SSDIcon, ChartPieIcon } from './Icons';

type Page = 'Dashboard' | 'PC Info' | 'Laptop Info' | 'Server Info' | 'Mouse Log' | 'Keyboard Log' | 'SSD Log' | 'Department Summary';

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
  <li className="mb-2">
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
  const navItems: { icon: React.ReactNode; label: Page }[] = [
    { icon: <DashboardIcon />, label: 'Dashboard' },
    { icon: <DesktopIcon />, label: 'PC Info' },
    { icon: <LaptopIcon />, label: 'Laptop Info' },
    { icon: <ServerIcon />, label: 'Server Info' },
    { icon: <MouseIcon />, label: 'Mouse Log' },
    { icon: <KeyboardIcon />, label: 'Keyboard Log' },
    { icon: <SSDIcon />, label: 'SSD Log' },
    { icon: <ChartPieIcon />, label: 'Department Summary' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">IT Inventory</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={currentPage === item.label}
              onClick={() => setCurrentPage(item.label)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Your Company</p>
      </div>
    </div>
  );
};