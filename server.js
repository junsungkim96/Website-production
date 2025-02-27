const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = 5000;

// Enable CORS for requests from localhost:3000 and other ports
app.use(cors({
  origin: '*'
}))

// Serve static files for React
app.use(express.static(path.join(__dirname, "public")));

// File download route
app.get('/api/download/trial', function(req, res) {
  const filePath = path.join(__dirname, "public", "files", "test.txt");

  // Log the file path to make sure it's correct
  console.log("Serving file from:", filePath);

  res.download(filePath, "test.txt", (err) => {
    if (err) {
      console.error("파일 다운로드 오류:", err);
      res.status(500).send("파일을 다운로드할 수 없습니다");
    }
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});