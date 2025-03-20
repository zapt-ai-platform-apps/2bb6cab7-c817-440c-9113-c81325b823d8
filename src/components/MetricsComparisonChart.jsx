import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function MetricsComparisonChart({ startup }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Calculate percentage growth for each metric
    const calculateGrowthPercentage = (before, after) => {
      if (before === 0) return after > 0 ? 100 : 0;
      return Math.round(((after - before) / before) * 100);
    };
    
    const fundingGrowth = calculateGrowthPercentage(
      startup.metrics.before.fundingRaised, 
      startup.metrics.after.fundingRaised
    );
    
    const userGrowth = calculateGrowthPercentage(
      startup.metrics.before.userGrowth, 
      startup.metrics.after.userGrowth
    );
    
    const mediaMentionsGrowth = calculateGrowthPercentage(
      startup.metrics.before.mediaMentions, 
      startup.metrics.after.mediaMentions
    );
    
    // Format funding for display
    const formatFunding = (value) => {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value}`;
    };
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Funding Raised', 'Users/Clients', 'Media Mentions'],
        datasets: [
          {
            label: 'Before',
            data: [
              startup.metrics.before.fundingRaised, 
              startup.metrics.before.userGrowth, 
              startup.metrics.before.mediaMentions
            ],
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
            borderColor: 'rgba(107, 114, 128, 1)',
            borderWidth: 1
          },
          {
            label: 'After',
            data: [
              startup.metrics.after.fundingRaised, 
              startup.metrics.after.userGrowth, 
              startup.metrics.after.mediaMentions
            ],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                if (this.chart.scales.x.getLabels()[index] === 'Funding Raised') {
                  return formatFunding(value);
                }
                return value;
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                
                if (context.parsed.y !== null) {
                  if (context.label === 'Funding Raised') {
                    label += formatFunding(context.parsed.y);
                  } else {
                    label += context.parsed.y;
                  }
                }
                return label;
              },
              footer: function(tooltipItems) {
                const dataIndex = tooltipItems[0].dataIndex;
                const label = tooltipItems[0].dataset.label;
                
                // Only show growth for "After" dataset
                if (label === 'After') {
                  const growthValues = [fundingGrowth, userGrowth, mediaMentionsGrowth];
                  const growth = growthValues[dataIndex];
                  
                  if (growth > 0) {
                    return `Growth: ${growth}%`;
                  }
                }
                return null;
              }
            }
          },
          legend: {
            position: 'top',
          },
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [startup]);

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}