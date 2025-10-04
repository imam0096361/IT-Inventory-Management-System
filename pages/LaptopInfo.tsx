import React, { useState, useEffect } from 'react';
import { laptopInfoData } from '../data/dummyData';
import { LaptopInfoEntry } from '../types';
import { Modal } from '../components/Modal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { DownloadIcon } from '../components/Icons';
import { exportToCSV } from '../utils/export';

const emptyFormState: Omit<LaptopInfoEntry, 'id'> = {
    pcName: '',
    brand: '',
    model: '',
    cpu: '',
    serialNumber: '',
    ram: '',
    storage: '',
    userStatus: '',
    department: '',
    date: '',
    hardwareStatus: 'Good',
};

export const LaptopInfo: React.FC = () => {
    const [laptops, setLaptops] = useLocalStorage<LaptopInfoEntry[]>('laptopInfo', laptopInfoData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLaptop, setEditingLaptop] = useState<LaptopInfoEntry | null>(null);
    const [formData, setFormData] = useState<Omit<LaptopInfoEntry, 'id'>>(emptyFormState);
    const [searchQuery, setSearchQuery] = useState('');
    const [laptopToDelete, setLaptopToDelete] = useState<LaptopInfoEntry | null>(null);

    useEffect(() => {
        if (editingLaptop) {
            setFormData(editingLaptop);
        } else {
            setFormData(emptyFormState);
        }
    }, [editingLaptop]);
    
    const handleAddNew = () => {
        setEditingLaptop(null);
        setFormData(emptyFormState);
        setIsModalOpen(true);
    };

    const handleEdit = (laptop: LaptopInfoEntry) => {
        setEditingLaptop(laptop);
        setFormData(laptop);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (laptop: LaptopInfoEntry) => {
        setLaptopToDelete(laptop);
    };

    const handleConfirmDelete = () => {
        if (!laptopToDelete) return;
        setLaptops(prevLaptops => prevLaptops.filter(laptop => laptop.id !== laptopToDelete.id));
        setLaptopToDelete(null);
    };

    const handleCancelDelete = () => {
        setLaptopToDelete(null);
    };


    const handleSave = () => {
        if (editingLaptop) {
            setLaptops(laptops.map(laptop => (laptop.id === editingLaptop.id ? { ...formData, id: editingLaptop.id } : laptop)));
        } else {
            setLaptops([...laptops, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    const filteredLaptops = laptops.filter(laptop =>
        laptop.pcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
        
    const handleExport = () => {
        exportToCSV(filteredLaptops, 'laptop-info');
    };

    const getStatusBadge = (status: 'Good' | 'Battery Problem' | 'Platform Problem') => {
        switch (status) {
            case 'Good': return 'bg-green-100 text-green-800';
            case 'Battery Problem': return 'bg-yellow-100 text-yellow-800';
            case 'Platform Problem': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Laptop Information</h1>
                    <div className="flex flex-col sm:flex-row gap-2 self-start md:self-auto">
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
                            Add New Laptop
                        </button>
                    </div>
                </div>
                 <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, brand, department..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PC Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hardware Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLaptops.map((laptop) => (
                                <tr key={laptop.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{laptop.pcName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{laptop.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(laptop.hardwareStatus)}`}>
                                            {laptop.hardwareStatus}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(laptop)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDeleteRequest(laptop)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredLaptops.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No laptops found matching your search.
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingLaptop ? "Edit Laptop Information" : "Add New Laptop"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="pcName" value={formData.pcName} onChange={handleChange} placeholder="PC Name" className="p-2 border rounded" />
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="p-2 border rounded" />
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="p-2 border rounded" />
                    <input type="text" name="cpu" value={formData.cpu} onChange={handleChange} placeholder="CPU" className="p-2 border rounded" />
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" className="p-2 border rounded" />
                    <input type="text" name="ram" value={formData.ram} onChange={handleChange} placeholder="RAM" className="p-2 border rounded" />
                    <input type="text" name="storage" value={formData.storage} onChange={handleChange} placeholder="Storage" className="p-2 border rounded" />
                    <input type="text" name="userStatus" value={formData.userStatus} onChange={handleChange} placeholder="User Status" className="p-2 border rounded" />
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="p-2 border rounded" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 border rounded" />
                    <select name="hardwareStatus" value={formData.hardwareStatus} onChange={handleChange} className="p-2 border rounded md:col-span-2">
                        <option value="Good">Good</option>
                        <option value="Battery Problem">Battery Problem</option>
                        <option value="Platform Problem">Platform Problem</option>
                    </select>
                </div>
                 <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingLaptop ? 'Save Changes' : 'Add Laptop'}</button>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={!!laptopToDelete}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Laptop Deletion"
                message={<p>Are you sure you want to delete the laptop entry for <span className="font-semibold">{laptopToDelete?.pcName}</span>? This action cannot be undone.</p>}
            />
        </>
    );
};
