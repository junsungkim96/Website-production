import React from 'react';

const SpectrumPlot = (wave, energy) => {
  if (!wave || !energy) return;

  // 팝업 크기
  const width = 900;
  const height = 700;

  // 화면 중앙 좌표 계산
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  // 새 브라우저 창 열기 (중앙)
  const plotWindow = window.open(
    "",
    "_blank",
    `width=${width},height=${height},top=${top},left=${left}`
  );

  if (!plotWindow) {
    console.error("Popup blocked!");
    return;
  }

  // 플롯용 HTML 생성
  const html = `
    <html>
      <head>
        <title>Spectrum Plot</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <canvas id="spectrumChart" width="800" height="600"></canvas>
        <script>
          const ctx = document.getElementById('spectrumChart').getContext('2d');
          const data = {
            labels: ${JSON.stringify(wave)},
            datasets: [{
              label: 'Energy vs Wavelength',
              data: ${JSON.stringify(energy)},
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true
            }]
          };
          const options = {
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: 'Energy vs Wavelength' }
            },
            scales: {
              x: { title: { display: true, text: 'Wavelength (nm)' } },
              y: { title: { display: true, text: 'Energy (a.u.)' } }
            }
          };
          new Chart(ctx, { type: 'line', data, options });
        </script>
      </body>
    </html>
  `;

  plotWindow.document.write(html);
  plotWindow.document.close();
};

export default SpectrumPlot;
