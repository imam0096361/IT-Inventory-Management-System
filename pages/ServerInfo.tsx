import React, { useState, useEffect } from 'react';
import { serverInfoData } from '../data/dummyData';
import { ServerInfoEntry } from '../types';
import { Modal } from '../components/Modal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { DownloadIcon } from '../components/Icons';
import { exportToCSV } from '../utils/export';

const emptyFormState: Omit<ServerInfoEntry, 'id'> = {
    serverID: '',
    brand: '',
    model: '',
    cpu: '',
    totalCores: 0,
    ram: '',
    storage: '',
    raid: '',
    status: 'Online',
};

export const ServerInfo: React.FC = () => {
    const [servers, setServers] = useLocalStorage<ServerInfoEntry[]>('serverInfo', serverInfoData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingServer, setEditingServer] = useState<ServerInfoEntry | null>(null);
    const [formData, setFormData] = useState<Omit<ServerInfoEntry, 'id'>>(emptyFormState);
    const [searchQuery, setSearchQuery] = useState('');
    const [serverToDelete, setServerToDelete] = useState<ServerInfoEntry | null>(null);

     useEffect(() => {
        if (editingServer) {
            setFormData(editingServer);
        } else {
            setFormData(emptyFormState);
        }
    }, [editingServer]);

    const handleAddNew = () => {
        setEditingServer(null);
        setFormData(emptyFormState);
        setIsModalOpen(true);
    };

    const handleEdit = (server: ServerInfoEntry) => {
        setEditingServer(server);
        setFormData(server);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (server: ServerInfoEntry) => {
        setServerToDelete(server);
    };

    const handleConfirmDelete = () => {
        if (!serverToDelete) return;
        setServers(prevServers => prevServers.filter(server => server.id !== serverToDelete.id));
        setServerToDelete(null);
    };

    const handleCancelDelete = () => {
        setServerToDelete(null);
    };

    const handleSave = () => {
        if (editingServer) {
            setServers(servers.map(server => (server.id === editingServer.id ? { ...formData, id: editingServer.id } : server)));
        } else {
            setServers([...servers, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    const filteredServers = servers.filter(server =>
        server.serverID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExport = () => {
        exportToCSV(filteredServers, 'server-info');
    };

    const getStatusBadge = (status: 'Online' | 'Offline' | 'Maintenance') => {
        switch (status) {
            case 'Online': return 'bg-green-100 text-green-800';
            case 'Offline': return 'bg-red-100 text-red-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Server Information</h1>
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
                            Add New Server
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Server ID, brand, model..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAM</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredServers.map((server) => (
                                <tr key={server.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.serverID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.ram}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(server.status)}`}>
                                            {server.status}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(server)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDeleteRequest(server)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredServers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No servers found matching your search.
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingServer ? "Edit Server Information" : "Add New Server"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="serverID" value={formData.serverID} onChange={handleChange} placeholder="Server ID" className="p-2 border rounded" />
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="p-2 border rounded" />
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="p-2 border rounded" />
                    <input type="text" name="cpu" value={formData.cpu} onChange={handleChange} placeholder="CPU" className="p-2 border rounded" />
                    <input type="number" name="totalCores" value={formData.totalCores} onChange={handleChange} placeholder="Total Cores" className="p-2 border rounded" />
                    <input type="text" name="ram" value={formData.ram} onChange={handleChange} placeholder="RAM" className="p-2 border rounded" />
                    <input type="text" name="storage" value={formData.storage} onChange={handleChange} placeholder="Storage" className="p-2 border rounded" />
                    <input type="text" name="raid" value={formData.raid} onChange={handleChange} placeholder="RAID" className="p-2 border rounded" />
                     <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded md:col-span-2">
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>
                 <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingServer ? 'Save Changes' : 'Add Server'}</button>
                </div>
            </Modal>
            
            <ConfirmationModal
                isOpen={!!serverToDelete}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Server Deletion"
                message={<p>Are you sure you want to delete the server entry for <span className="font-semibold">{serverToDelete?.serverID}</span>? This action cannot be undone.</p>}
            />
        </>
    );
};
