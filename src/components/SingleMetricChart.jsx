import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function SingleMetricChart({ title, beforeValue, afterValue, formatValue, color = 'rgb(16, 185, 129)' }) {
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
    
    // Create a gradient for the "after" bar
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color.replace('rgb', 'rgba').replace(')', ', 0.7)'));
    
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
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'After',
            data: [afterValue],
            backgroundColor: gradient,
            borderColor: color,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)',
            },
            ticks: {
              callback: function(value) {
                return formatValue ? formatValue(value) : value;
              }
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1f2937',
            bodyColor: '#1f2937',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {
              bottom: 15
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
  }, [title, beforeValue, afterValue, formatValue, color]);

  return (
    <div className="w-full h-48">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}