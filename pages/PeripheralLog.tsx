import React, { useState, useEffect } from 'react';
import { mouseDistributionLog } from '../data/dummyData';
import { PeripheralLogEntry } from '../types';
import { Modal } from '../components/Modal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { DownloadIcon } from '../components/Icons';
import { exportToCSV } from '../utils/export';

const emptyFormState: Omit<PeripheralLogEntry, 'id'> = {
    productName: '',
    serialNumber: '',
    pcName: '',
    pcUsername: '',
    department: '',
    date: '',
    time: '',
    servicedBy: '',
    comment: ''
};

export const PeripheralLog: React.FC = () => {
    const [logs, setLogs] = useLocalStorage<PeripheralLogEntry[]>('mouseLogs', mouseDistributionLog);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState<PeripheralLogEntry | null>(null);
    const [formData, setFormData] = useState(emptyFormState);
    const [searchQuery, setSearchQuery] = useState('');
    const [logToDelete, setLogToDelete] = useState<PeripheralLogEntry | null>(null);

    useEffect(() => {
        if (editingLog) {
            setFormData(editingLog);
        } else {
            setFormData(emptyFormState);
        }
    }, [editingLog]);

    const handleAddNew = () => {
        setEditingLog(null);
        setFormData(emptyFormState);
        setIsModalOpen(true);
    };

    const handleEdit = (log: PeripheralLogEntry) => {
        setEditingLog(log);
        setFormData(log);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (log: PeripheralLogEntry) => {
        setLogToDelete(log);
    };

    const handleConfirmDelete = () => {
        if (!logToDelete) return;
        setLogs(prevLogs => prevLogs.filter(log => log.id !== logToDelete.id));
        setLogToDelete(null);
    };

    const handleCancelDelete = () => {
        setLogToDelete(null);
    };

    const handleSave = () => {
        if (editingLog) {
            setLogs(logs.map(log => (log.id === editingLog.id ? { ...formData, id: editingLog.id } : log)));
        } else {
            setLogs([...logs, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredLogs = logs.filter(log =>
        log.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.servicedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.pcName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExport = () => {
        exportToCSV(filteredLogs, 'mouse-service-logs');
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Mouse Service Log</h1>
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
                            Add New Log
                        </button>
                    </div>
                </div>
                 <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviced By</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.productName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.serialNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.department || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.servicedBy || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(log)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDeleteRequest(log)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredLogs.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No logs found matching your search.
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingLog ? "Edit Log Entry" : "Add New Log Entry"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" className="p-2 border rounded" />
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Serial Number" className="p-2 border rounded" />
                    <input type="text" name="pcName" value={formData.pcName} onChange={handleChange} placeholder="PC Name" className="p-2 border rounded" />
                    <input type="text" name="pcUsername" value={formData.pcUsername} onChange={handleChange} placeholder="PC Username" className="p-2 border rounded" />
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="p-2 border rounded" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" className="p-2 border rounded" />
                    <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Time" className="p-2 border rounded" />
                    <input type="text" name="servicedBy" value={formData.servicedBy} onChange={handleChange} placeholder="Serviced By" className="p-2 border rounded" />
                    <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Comment" className="p-2 border rounded md:col-span-2" rows={3}></textarea>
                </div>
                 <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingLog ? 'Save Changes' : 'Add Entry'}</button>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={!!logToDelete}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Log Deletion"
                message={<p>Are you sure you want to delete the log for <span className="font-semibold">{logToDelete?.productName} (S/N: {logToDelete?.serialNumber})</span>? This action cannot be undone.</p>}
            />
        </>
    );
};
