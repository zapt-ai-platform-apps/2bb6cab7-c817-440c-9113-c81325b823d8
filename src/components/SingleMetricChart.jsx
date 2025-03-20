import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function SingleMetricChart({ title, beforeValue, afterValue, formatValue }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Calculate percentage growth
    const calculateGrowthPercentage = (before, after) => {
      if (before === 0) return after > 0 ? 100 : 0;
      return Math.round(((after - before) / before) * 100);
    };
    
    const growthPercentage = calculateGrowthPercentage(beforeValue, afterValue);
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [title],
        datasets: [
          {
            label: 'Before',
            data: [beforeValue],
            backgroundColor: 'rgba(107, 114, 128, 0.5)',
            borderColor: 'rgba(107, 114, 128, 1)',
            borderWidth: 1
          },
          {
            label: 'After',
            data: [afterValue],
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
              callback: function(value) {
                return formatValue ? formatValue(value) : value;
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
                  label += formatValue ? formatValue(context.parsed.y) : context.parsed.y;
                }
                return label;
              },
              footer: function(tooltipItems) {
                const label = tooltipItems[0].dataset.label;
                
                // Only show growth for "After" dataset
                if (label === 'After' && growthPercentage > 0) {
                  return `Growth: ${growthPercentage}%`;
                }
                return null;
              }
            }
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [title, beforeValue, afterValue, formatValue]);

  return (
    <div className="w-full h-48">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}