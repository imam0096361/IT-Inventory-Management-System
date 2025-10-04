import React from 'react';
import { PieChartCard } from '../components/PieChartCard';
import { BarChartCard } from '../components/BarChartCard';
import { RecentActivityCard } from '../components/RecentActivityCard';
import { pcInfoData, laptopInfoData, serverInfoData, mouseDistributionLog, keyboardDistributionLog, ssdDistributionLog } from '../data/dummyData';
import { DesktopIcon, LaptopIcon, ServerIcon, MouseIcon, KeyboardIcon, SSDIcon, ChartPieIcon } from '../components/Icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { PCInfoEntry, LaptopInfoEntry, ServerInfoEntry, PeripheralLogEntry } from '../types';

type Page = 'Dashboard' | 'PC Info' | 'Laptop Info' | 'Server Info' | 'Mouse Log' | 'Keyboard Log' | 'SSD Log' | 'Department Summary';

interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const DashboardCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}> = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center w-full h-full"
    >
        <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h4 className="font-semibold text-gray-700">{title}</h4>
    </button>
);


export const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    const [pcs] = useLocalStorage<PCInfoEntry[]>('pcInfo', pcInfoData);
    const [laptops] = useLocalStorage<LaptopInfoEntry[]>('laptopInfo', laptopInfoData);
    const [servers] = useLocalStorage<ServerInfoEntry[]>('serverInfo', serverInfoData);
    const [mouseLogs] = useLocalStorage<PeripheralLogEntry[]>('mouseLogs', mouseDistributionLog);
    const [keyboardLogs] = useLocalStorage<PeripheralLogEntry[]>('keyboardLogs', keyboardDistributionLog);
    const [ssdLogs] = useLocalStorage<PeripheralLogEntry[]>('ssdLogs', ssdDistributionLog);

    const inventoryItems = [
        { icon: <DesktopIcon />, title: 'PC Information', page: 'PC Info' },
        { icon: <LaptopIcon />, title: 'Laptop Information', page: 'Laptop Info' },
        { icon: <ServerIcon />, title: 'Server Information', page: 'Server Info' },
        { icon: <MouseIcon />, title: 'Mouse Service Log', page: 'Mouse Log' },
        { icon: <KeyboardIcon />, title: 'Keyboard Log', page: 'Keyboard Log' },
        { icon: <SSDIcon />, title: 'SSD Log', page: 'SSD Log' },
        { icon: <ChartPieIcon />, title: 'Department Summary', page: 'Department Summary' },
    ];

    const totalAssetsData = [
        { name: 'PCs', count: pcs.length },
        { name: 'Laptops', count: laptops.length },
        { name: 'Servers', count: servers.length },
    ];
    
    const calculateUsage = (logs: PeripheralLogEntry[]) => {
        if (!logs || logs.length === 0) {
            return [{ name: 'Used', value: 0 }, { name: 'In Stock', value: 0 }];
        }
        const used = logs.filter(log => log.pcName || log.pcUsername).length;
        const inStock = logs.length - used;
        return [{ name: 'Used', value: used }, { name: 'In Stock', value: inStock }];
    };

    const peripheralUsageStats = {
        mouse: calculateUsage(mouseLogs),
        keyboard: calculateUsage(keyboardLogs),
        ssd: calculateUsage(ssdLogs),
    };

    const allLogs = [...mouseLogs, ...keyboardLogs, ...ssdLogs];
    const recentLogs = allLogs
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

             <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Inventory Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <BarChartCard title="Total Assets by Category" data={totalAssetsData} barColor="#3b82f6" />
                    </div>
                    <RecentActivityCard title="Recent Service Logs" logs={recentLogs} />
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Peripheral Usage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PieChartCard title="MOUSE" data={peripheralUsageStats.mouse} />
                    <PieChartCard title="KEYBOARD" data={peripheralUsageStats.keyboard} />
                    <PieChartCard title="SSD" data={peripheralUsageStats.ssd} />
                </div>
            </section>

            <section>
                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Access</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {inventoryItems.map(item => (
                        <DashboardCard
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                            onClick={() => setActivePage(item.page as Page)}
                        />
                    ))}
                 </div>
            </section>
        </div>
    );
};