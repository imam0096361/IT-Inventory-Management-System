export type Page = 'Dashboard' | 'PC Info' | 'Laptop Info' | 'Server Info' | 'Mouse Log' | 'Keyboard Log' | 'SSD Log' | 'Department Summary' | 'Product Inventory' | 'Settings';

export interface PeripheralLogEntry {
  id: number;
  productName: string;
  serialNumber: string;
  pcName: string;
  pcUsername:string;
  department: string;
  date: string;
  time: string;
  servicedBy: string;
  comment: string;
}

export interface DepartmentAssetSummary {
  id: number;
  department: string;
  quantity: number;
}

export interface ServerInfoEntry {
  id: number;
  serverID: string;
  brand: string;
  model: string;
  cpu: string;
  totalCores: number;
  ram: string;
  storage: string;
  raid: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  department?: string;
  customFields?: Record<string, string>;
}

export interface LaptopInfoEntry {
  id: number;
  pcName: string;
  brand: string;
  model: string;
  cpu: string;
  serialNumber: string;
  ram: string;
  storage: string;
  userStatus: string;
  department: string;
  date: string;
  hardwareStatus: 'Good' | 'Battery Problem' | 'Platform Problem';
  customFields?: Record<string, string>;
}

export interface PCInfoEntry {
  id: number;
  department: string;
  ip: string;
  pcName: string;
  motherboard: string;
  cpu: string;
  ram: string;
  storage: string;
  monitor: string;
  os: string;
  status: 'OK' | 'NO' | 'Repair';
  floor: 5 | 6 | 7;
  customFields?: Record<string, string>;
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface BarChartData {
  name: string;
  count: number;
}

export interface CustomFieldDef {
  id: string;
  name: string;
}