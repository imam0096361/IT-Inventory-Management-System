import { render, screen } from '@testing-library/react';
import { InventorySummaryCard } from '../../components/InventorySummaryCard';
import { PieChartData } from '../../types';
import { MouseIcon } from '../../components/Icons';
import { describe, it, expect } from 'vitest';

describe('InventorySummaryCard', () => {
  it('should render with correct data', () => {
    const data: PieChartData[] = [
      { name: 'Used', value: 10 },
      { name: 'In Stock', value: 5 },
    ];

    render(<InventorySummaryCard title="Test Inventory" data={data} icon={<MouseIcon />} />);

    expect(screen.getByText('Test Inventory')).toBeInTheDocument();
    expect(screen.getByText('Total Items:')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument(); // 10 (Used) + 5 (In Stock)
    expect(screen.getByText('Used: 10')).toBeInTheDocument();
    expect(screen.getByText('In Stock: 5')).toBeInTheDocument();

    // Check if the pie chart container is rendered
    const pieChartContainer = document.querySelector('.recharts-responsive-container');
    expect(pieChartContainer).toBeInTheDocument();
  });

  it('should handle empty data gracefully', () => {
    const data: PieChartData[] = [];

    render(<InventorySummaryCard title="Empty Inventory" data={data} icon={<MouseIcon />} />);

    expect(screen.getByText('Empty Inventory')).toBeInTheDocument();
    expect(screen.getByText('Total Items:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Used: 0')).toBeInTheDocument();
    expect(screen.getByText('In Stock: 0')).toBeInTheDocument();
  });
});