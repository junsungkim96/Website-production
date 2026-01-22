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
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: 6 },
          plugins: {
            legend: {
              labels: { font: { size: 5 } }
            },
            title: {
              display: true,
              text: 'Energy vs Wavelength',
              font: { size: 8 }
            },
            tooltip: {
              titleFont: { size: 7 },
              bodyFont: { size: 7 },
              footerFont: { size: 7 },
              padding: 4,
              caretSize: 4
            }
          },
          scales: {
            x: {
              ticks: { font: { size: 7 } },
              title: {
                display: true,
                text: 'Wavelength (nm)',
                font: { size: 7 }
              }
            },
            y: {
              ticks: { font: { size: 7 } },
              title: {
                display: true,
                text: 'Energy (a.u.)',
                font: { size: 7 }
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
