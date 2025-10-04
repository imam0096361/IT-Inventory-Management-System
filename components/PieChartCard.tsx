import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChartData } from '../types';

interface PieChartCardProps {
  title: string;
  data: PieChartData[];
}

const COLORS = ['#0ea5e9', '#f97316']; // sky-500, orange-500

export const PieChartCard: React.FC<PieChartCardProps> = ({ title, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [value, name]}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};