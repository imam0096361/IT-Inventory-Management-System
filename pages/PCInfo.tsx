import React, { useState, useEffect } from 'react';
import { pcInfoData } from '../data/dummyData';
import { PCInfoEntry } from '../types';
import { Modal } from '../components/Modal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { DownloadIcon } from '../components/Icons';
import { exportToCSV } from '../utils/export';

const emptyFormState: Omit<PCInfoEntry, 'id'> = {
    department: '',
    ip: '',
    pcName: '',
    motherboard: '',
    cpu: '',
    ram: '',
    storage: '',
    monitor: '',
    os: '',
    status: 'OK',
    floor: 7,
};

export const PCInfo: React.FC = () => {
    const [pcs, setPcs] = useLocalStorage<PCInfoEntry[]>('pcInfo', pcInfoData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPC, setEditingPC] = useState<PCInfoEntry | null>(null);
    const [formData, setFormData] = useState<Omit<PCInfoEntry, 'id'>>(emptyFormState);
    const [activeTab, setActiveTab] = useState<5 | 6 | 7>(7);
    const [searchQuery, setSearchQuery] = useState('');
    const [pcToDelete, setPcToDelete] = useState<PCInfoEntry | null>(null);

    useEffect(() => {
        if (editingPC) {
            setFormData(editingPC);
        }
    }, [editingPC]);

    const handleAddNew = () => {
        setEditingPC(null);
        setFormData({ ...emptyFormState, floor: activeTab });
        setIsModalOpen(true);
    };

    const handleEdit = (pc: PCInfoEntry) => {
        setEditingPC(pc);
        setFormData(pc);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (pc: PCInfoEntry) => {
        setPcToDelete(pc);
    };

    const handleConfirmDelete = () => {
        if (!pcToDelete) return;
        setPcs(prevPcs => prevPcs.filter(pc => pc.id !== pcToDelete.id));
        setPcToDelete(null);
    };

    const handleCancelDelete = () => {
        setPcToDelete(null);
    };

    const handleSave = () => {
        if (editingPC) {
            setPcs(pcs.map(pc => (pc.id === editingPC.id ? { ...formData, id: editingPC.id } : pc)));
        } else {
            setPcs([...pcs, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isNumber = e.target.type === 'select-one' && name === 'floor';
        setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    const searchedPcs = pcs.filter(pc =>
        pc.pcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pc.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pc.cpu.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPcs = searchedPcs.filter(pc => pc.floor === activeTab);
    
    const handleExport = () => {
        exportToCSV(filteredPcs, `pc-info-floor-${activeTab}`);
    };

    const getStatusBadge = (status: 'OK' | 'NO' | 'Repair') => {
        switch (status) {
            case 'OK': return 'bg-green-100 text-green-800';
            case 'NO': return 'bg-red-100 text-red-800';
            case 'Repair': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const floors: (5 | 6 | 7)[] = [7, 6, 5];

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">PC Information</h1>
                    <div className="flex flex-col sm:flex-row gap-2 order-first md:order-last">
                        <button
                            onClick={handleExport}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <DownloadIcon />
                            <span>Export Data</span>
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Add New PC
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by PC name, department, IP..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                
                <div className="border-b border-gray-200 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {floors.map(floor => (
                             <button
                                key={floor}
                                onClick={() => setActiveTab(floor)}
                                className={`${
                                    activeTab === floor
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                {floor}th Floor
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PC Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPcs.map((pc) => (
                                <tr key={pc.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pc.pcName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pc.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pc.ip}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{pc.cpu}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(pc.status)}`}>
                                            {pc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(pc)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDeleteRequest(pc)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredPcs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No PC information found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPC ? "Edit PC Information" : "Add New PC"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="pcName" value={formData.pcName} onChange={handleChange} placeholder="PC Name" className="p-2 border rounded" />
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="p-2 border rounded" />
                    <input type="text" name="ip" value={formData.ip} onChange={handleChange} placeholder="IP Address" className="p-2 border rounded" />
                    <input type="text" name="cpu" value={formData.cpu} onChange={handleChange} placeholder="CPU" className="p-2 border rounded" />
                    <input type="text" name="motherboard" value={formData.motherboard} onChange={handleChange} placeholder="Motherboard" className="p-2 border rounded" />
                    <input type="text" name="ram" value={formData.ram} onChange={handleChange} placeholder="RAM" className="p-2 border rounded" />
                    <input type="text" name="storage" value={formData.storage} onChange={handleChange} placeholder="Storage" className="p-2 border rounded" />
                    <input type="text" name="monitor" value={formData.monitor} onChange={handleChange} placeholder="Monitor" className="p-2 border rounded" />
                    <input type="text" name="os" value={formData.os} onChange={handleChange} placeholder="Operating System" className="p-2 border rounded" />
                    <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
                        <option value="OK">OK</option>
                        <option value="NO">NO</option>
                        <option value="Repair">Repair</option>
                    </select>
                     <select name="floor" value={formData.floor} onChange={handleChange} className="p-2 border rounded">
                        <option value={7}>7th Floor</option>
                        <option value={6}>6th Floor</option>
                        <option value={5}>5th Floor</option>
                    </select>
                </div>
                 <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingPC ? 'Save Changes' : 'Add PC'}</button>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={!!pcToDelete}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm PC Deletion"
                message={<p>Are you sure you want to delete the PC entry for <span className="font-semibold">{pcToDelete?.pcName}</span>? This action cannot be undone.</p>}
            />
        </>
    );
};
