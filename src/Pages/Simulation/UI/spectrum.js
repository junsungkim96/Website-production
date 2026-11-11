
import React from 'react';

const SpectrumPlot = (wave, energy) => {
  if (!wave || !energy) return;

  const width = 900;
  const height = 700;

  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const plotWindow = window.open(
    "",
    "_blank",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes`
  );

  if (!plotWindow) {
    console.error("Popup blocked!");
    return;
  }

  const html = `
<html>
  <head>
    <title>Energy Spectrum</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      #container {
        width: 100%;
        height: 100%;
      }
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <canvas id="energyChart"></canvas>
    </div>

    <script>
      const ctx = document.getElementById('energyChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ${JSON.stringify(wave)},
          datasets: [
            {
              label: 'Energy',
              data: ${JSON.stringify(energy)},
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: 20 },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { size: 16 },
                boxWidth: 25,
                padding: 20
              }
            },
            title: {
              display: true,
              text: 'Energy vs Wavelength',
              font: {
                size: 20,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 25
              }
            },
            tooltip: {
              titleFont: { size: 14 },
              bodyFont: { size: 14 },
              footerFont: { size: 12 },
              padding: 10,
              caretSize: 6
            }
          },
          scales: {
            x: {
              ticks: {
                font: { size: 14 },
                maxRotation: 0
              },
              title: {
                display: true,
                text: 'Wavelength (nm)',
                font: {
                  size: 17,
                  weight: 'bold'
                },
                padding: 12
              },
              grid: {
                color: '#e5e5e5'
              }
            },
            y: {
              ticks: {
                font: { size: 14 }
              },
              title: {
                display: true,
                text: 'Energy (a.u.)',
                font: {
                  size: 17,
                  weight: 'bold'
                },
                padding: 12
              },
              grid: {
                color: '#e5e5e5'
              }
            }
          }
        }
      });
    </script>
  </body>
</html>
`;

  plotWindow.document.write(html);
  plotWindow.document.close();
};

export default SpectrumPlot;
