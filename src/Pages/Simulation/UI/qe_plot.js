const SpectrumPlot = (wave, qe) => {
  if (!wave || !qe) return;

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
    <title>Quantum Efficiency Spectrum</title>
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
      <canvas id="qeChart"></canvas>
    </div>

    <script>
      const ctx = document.getElementById('qeChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ${JSON.stringify(wave)},
          datasets: [
            {
              label: 'R',
              data: ${JSON.stringify(qe.R)},
              borderColor: 'red',
              borderWidth: 1.5,
              pointRadius: 0
            },
            {
              label: 'G',
              data: ${JSON.stringify(qe.G)},
              borderColor: 'green',
              borderWidth: 1.5,
              pointRadius: 0
            },
            {
              label: 'B',
              data: ${JSON.stringify(qe.B)},
              borderColor: 'blue',
              borderWidth: 1.5,
              pointRadius: 0
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
              text: 'Quantum Efficiency vs Wavelength',
              font: { size: 8 }
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
              min: 0,
              max: 1,
              ticks: { font: { size: 7 } },
              title: {
                display: true,
                text: 'Quantum Efficiency',
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
