import { PeripheralLogEntry, DepartmentAssetSummary, ServerInfoEntry, LaptopInfoEntry, PCInfoEntry } from '../types';

export const peripheralUsageStats = {
  mouse: [
    { name: 'Used', value: 90 },
    { name: 'In Stock', value: 10 },
  ],
  keyboard: [
    { name: 'Used', value: 88 },
    { name: 'In Stock', value: 12 },
  ],
  ssd: [
    { name: 'Used', value: 97 },
    { name: 'In Stock', value: 3 },
  ],
};

export const mouseDistributionLog: PeripheralLogEntry[] = [
  { id: 1, productName: 'A4TECH OP-720 USB Wired Mouse', serialNumber: 'GB2501023321', pcName: 'DE25012345', pcUsername: 'salman', department: 'Business Development', date: '07/07/2025', time: '9:25 AM', servicedBy: 'Fahad Hossen', comment: 'Replace new one due to old mouse is not fun' },
  { id: 2, productName: 'A4TECH OP-330 USB Wired Mouse', serialNumber: 'GB2504001265', pcName: '', pcUsername: '', department: 'Arts & Entertainment', date: '24/09/2025', time: '', servicedBy: 'Jaber', comment: 'Replace new one due to old mouse is not fun' },
  { id: 3, productName: 'A4TECH OP-330 USB Wired Mouse', serialNumber: 'GB2504076570', pcName: '', pcUsername: '', department: '', date: '24/09/2025', time: '', servicedBy: '', comment: 'User reported intermittent disconnection' },
  { id: 4, productName: 'A4TECH OP-330 USB Wired Mouse', serialNumber: 'GB2501029081', pcName: '', pcUsername: '', department: 'IT', date: '24/09/2025', time: '', servicedBy: 'Admin', comment: 'New stock registration' },
  { id: 5, productName: 'A4TECH OP-330 USB Wired Mouse', serialNumber: 'GB2504076571', pcName: '', pcUsername: 'Tasnim Tabassum', department: 'Commercial Suppliment', date: '28/09/2025', time: '11:59 AM', servicedBy: 'Fahad Hossen', comment: 'Replaced old damage one' },
  { id: 6, productName: 'A4TECH OP-330 USB Wired Mouse', serialNumber: 'GB2504076569', pcName: '', pcUsername: 'zyma', department: 'Reporting', date: '27/09/2025', time: '12:17 PM', servicedBy: 'Fahad Hossen', comment: 'Replace due to damage previous one' },
];

export const keyboardDistributionLog: PeripheralLogEntry[] = [
  { id: 1, productName: 'Logitech K120 Wired Keyboard', serialNumber: 'KB2501023321', pcName: 'DE25012345', pcUsername: 'salman', department: 'Business Development', date: '07/07/2025', time: '9:30 AM', servicedBy: 'Fahad Hossen', comment: 'Upgraded from old model' },
  { id: 2, productName: 'Dell KB216 Wired Keyboard', serialNumber: 'KB2504001265', pcName: '', pcUsername: '', department: 'Arts & Entertainment', date: '24/09/2025', time: '', servicedBy: 'Jaber', comment: 'Sticky keys reported, replaced.' },
];

export const ssdDistributionLog: PeripheralLogEntry[] = [
  { id: 1, productName: 'Samsung 870 EVO 500GB SSD', serialNumber: 'SSD2501023321', pcName: 'DE25012345', pcUsername: 'salman', department: 'Business Development', date: '07/07/2025', time: '10:00 AM', servicedBy: 'Fahad Hossen', comment: 'OS drive upgrade for performance' },
  { id: 2, productName: 'Crucial MX500 1TB SSD', serialNumber: 'SSD2504001265', pcName: 'EDITDELL01', pcUsername: 'designer1', department: 'Editorial', date: '25/09/2025', time: '2:00 PM', servicedBy: 'Admin', comment: 'Added as secondary storage for projects.' },
];

export const departmentSummaryData: DepartmentAssetSummary[] = [
    { id: 1, department: 'Accounts', quantity: 4 },
    { id: 2, department: 'Admin', quantity: 3 },
    { id: 3, department: 'Advertisement', quantity: 3 },
    { id: 4, department: 'Arts & Entertainment', quantity: 3 },
    { id: 5, department: 'Business', quantity: 3 },
    { id: 6, department: 'Business Dev.', quantity: 0 },
    { id: 7, department: 'Creative Graphics', quantity: 2 },
    { id: 8, department: 'Digital Marketing', quantity: 5 },
    { id: 9, department: 'Editorial', quantity: 5 },
    { id: 10, department: 'IT', quantity: 38 },
    { id: 11, department: 'Marketing', quantity: 4 },
    { id: 12, department: 'News', quantity: 5 },
    { id: 13, department: 'Sports', quantity: 6 },
    { id: 14, department: 'IT DC', quantity: 14 },
];

export const serverInfoData: ServerInfoEntry[] = [
  { id: 1, serverID: '192.168.150.116', brand: 'ERICSSON', model: 'ERICSSON ENU/B1', cpu: 'Intel Xeon E5-2695 v4 @ 2.10GHz', totalCores: 72, ram: '256 GB', storage: '960 GBx3', raid: 'RAID5', status: 'Online', department: 'IT DC' },
  { id: 2, serverID: '172.17.150.117', brand: 'ERICSSON', model: 'ERICSSON ENU/B1', cpu: 'Intel Xeon E5-2695 v4 @ 2.10GHz', totalCores: 72, ram: '256 GB', storage: '960 GBx3', raid: 'RAID5', status: 'Online', department: 'IT DC' },
  { id: 3, serverID: '192.168.150.118', brand: 'ERICSSON', model: 'ERICSSON ENU/B1', cpu: 'Intel Xeon E5-2695 v4 @ 2.10GHz', totalCores: 72, ram: '256 GB', storage: '960 GBx3', raid: 'RAID5', status: 'Maintenance', department: 'IT DC' },
  { id: 4, serverID: '192.168.150.119', brand: 'ERICSSON', model: 'ERICSSON ENU/B1', cpu: 'Intel Xeon E5-2695 v4 @ 2.10GHz', totalCores: 72, ram: '256 GB', storage: '960 GBx3', raid: 'RAID5', status: 'Online', department: 'IT DC' },
  { id: 5, serverID: '192.168.150.120', brand: 'HP', model: 'HP APOLLO 4200 G9', cpu: 'Intel Xeon E5-2620 v4 @ 2.10GHz', totalCores: 32, ram: '256 GB', storage: '1.8TB*10, 256*4', raid: 'RAID10', status: 'Offline', department: 'IT DC' },
  { id: 6, serverID: '192.168.150.121', brand: 'ASUSTOR', model: 'ASUSTOR AS6508T NAS', cpu: 'Intel Atom Quad-Core', totalCores: 4, ram: '32 GB', storage: '20TB*2', raid: 'RAID1', status: 'Online', department: 'IT DC' },
];

export const laptopInfoData: LaptopInfoEntry[] = [
    { id: 1, pcName: 'DSG04951', brand: 'HP', model: 'PROBOOK 450 G8', cpu: 'Core i5-11th Gen', serialNumber: '5CD1488S3B', ram: '8 GB', storage: '256 GB SSD', userStatus: 'BAD', department: 'IT DC', date: '29-08-2022', hardwareStatus: 'Good' },
    { id: 2, pcName: 'DSG04952', brand: 'HP', model: 'PROBOOK 450 G8', cpu: 'Core i5-11th Gen', serialNumber: '5CD1488S3C', ram: '8 GB', storage: '256 GB SSD', userStatus: 'GOOD', department: 'IT DC', date: '29-08-2022', hardwareStatus: 'Good' },
    { id: 3, pcName: 'DSG04953', brand: 'ACER', model: 'ASPIRE A515-41G', cpu: 'AMD A12-9720P', serialNumber: 'NXGP4SI005', ram: '8 GB', storage: '1 TB HDD', userStatus: 'BAD', department: 'IT DC', date: '17-01-2022', hardwareStatus: 'Battery Problem' },
    { id: 4, pcName: 'DSG04954', brand: 'ASUS', model: 'ASUS-411U', cpu: 'Core i3-7th Gen', serialNumber: 'J2N0CV219', ram: '4 GB', storage: '1 TB HDD', userStatus: 'GOOD', department: 'Graphics', date: '01-04-2022', hardwareStatus: 'Good' },
    { id: 5, pcName: 'DSG04955', brand: 'HP', model: 'PROBOOK 450 G8', cpu: 'Core i5-11th Gen', serialNumber: '5CD1488S3D', ram: '8 GB', storage: '256 GB SSD', userStatus: 'GOOD', department: 'Editorial', date: '29-08-2022', hardwareStatus: 'Platform Problem' },
    { id: 6, pcName: 'DSG04956', brand: 'DELL', model: 'VOSTRO-3400', cpu: 'Core i5-11th Gen', serialNumber: '6B3Z8J3', ram: '8 GB', storage: '1 TB HDD', userStatus: 'GOOD', department: 'IT', date: '19-10-2022', hardwareStatus: 'Good' },
];

export const pcInfoData: PCInfoEntry[] = [
    { id: 1, department: 'Editorial', ip: '192.168.170.1', pcName: 'EDITDELL01', motherboard: 'GIGABYTE B460M-DS3H', cpu: 'Core i5-4570 @ 3.20 GHz', ram: '4 GB DDR3', storage: 'TOSHIBA 500 GB', monitor: 'DELL 22"', os: 'Win 10', status: 'OK', floor: 7 },
    { id: 2, department: 'Editorial', ip: '192.168.170.2', pcName: 'EDITCLONE02', motherboard: 'GIGABYTE B460M-DS3H', cpu: 'Core i5-4570 @ 3.20 GHz', ram: '4 GB DDR3', storage: 'TOSHIBA 500 GB', monitor: 'DELL 22"', os: 'Win 10', status: 'OK', floor: 7 },
    { id: 3, department: 'MAKEUP', ip: '192.168.170.3', pcName: 'MAKEUPCLONE03', motherboard: 'ASUS PRIME Z270M-PLUS', cpu: 'Core i7-7700 @ 3.60 GHz', ram: '8 GB DDR4', storage: 'SAMSUNG 250 GB SSD', monitor: 'HP 19"', os: 'Win 10', status: 'OK', floor: 6 },
    { id: 4, department: 'MAGAZINE', ip: '192.168.170.4', pcName: 'MAGAZINECLONE04', motherboard: 'GIGABYTE GA-B150M-DS3H', cpu: 'Core i5-7500 @ 3.40 GHz', ram: '4 GB DDR4', storage: 'WD 250 GB', monitor: 'SAMSUNG 19"', os: 'Win XP', status: 'Repair', floor: 6 },
    { id: 5, department: 'IT Desk', ip: '192.168.170.5', pcName: 'ITDESKDELL05', motherboard: 'DELL Vostro', cpu: 'Core i5-2nd Gen', ram: '4 GB DDR3', storage: 'DELL 500 GB', monitor: 'DELL 22"', os: 'Win 10', status: 'OK', floor: 5 },
    { id: 6, department: 'Accounts', ip: '192.168.170.6', pcName: 'ACCOUNTSCLONE06', motherboard: 'ASUS PRIME Z270M-PLUS', cpu: 'Core i3-7100 @ 3.90 GHz', ram: '4 GB DDR4', storage: 'TOSHIBA 1 TB', monitor: 'LG 22"', os: 'Win 10', status: 'OK', floor: 5 },
];