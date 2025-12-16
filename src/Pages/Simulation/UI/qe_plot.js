const SpectrumPlot = (wave, qe) => {
  if (!wave || !qe) return;

  const width = 900;
  const height = 700;

  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const plotWindow = window.open(
    "",
    "_blank",
    `width=${width},height=${height},top=${top},left=${left}`
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
  </head>
  <body>
    <canvas id="qeChart" width="800" height="600"></canvas>
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
              fill: false
            },
            {
              label: 'G',
              data: ${JSON.stringify(qe.G)},
              borderColor: 'green',
              fill: false
            },
            {
              label: 'B',
              data: ${JSON.stringify(qe.B)},
              borderColor: 'blue',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: {
              display: true,
              text: 'Quantum Efficiency vs Wavelength'
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Wavelength (nm)' }
            },
            y: {
              min: 0,
              max: 1,
              title: { display: true, text: 'Quantum Efficiency' }
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
