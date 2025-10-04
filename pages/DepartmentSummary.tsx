import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { PCInfoEntry, LaptopInfoEntry, ServerInfoEntry } from '../types';
import { pcInfoData, laptopInfoData, serverInfoData } from '../data/dummyData';

interface DepartmentSummaryRow {
  id: number;
  department: string;
  quantity: number;
}

export const DepartmentSummary: React.FC = () => {
    const [pcs] = useLocalStorage<PCInfoEntry[]>('pcInfo', pcInfoData);
    const [laptops] = useLocalStorage<LaptopInfoEntry[]>('laptopInfo', laptopInfoData);
    const [servers] = useLocalStorage<ServerInfoEntry[]>('serverInfo', serverInfoData);

    const departmentCounts: { [key: string]: number } = {};

    const allAssets = [...pcs, ...laptops, ...servers];

    allAssets.forEach(asset => {
        // Fix: Use a type guard to ensure asset has a 'department' property, as ServerInfoEntry does not.
        if ('department' in asset && asset.department && asset.department.trim() !== '') {
            departmentCounts[asset.department] = (departmentCounts[asset.department] || 0) + 1;
        }
    });

    const summaryData: DepartmentSummaryRow[] = Object.entries(departmentCounts)
        .map(([department, quantity], index) => ({
            id: index + 1,
            department,
            quantity,
        }))
        .sort((a, b) => a.department.localeCompare(b.department));

    const totalQuantity = summaryData.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Department Asset Summary</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sl.
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {summaryData.map((item, index) => (
                            <tr key={item.department} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.department}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                        <tr>
                            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 uppercase text-right">
                                Total
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 text-right">
                                {totalQuantity}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
