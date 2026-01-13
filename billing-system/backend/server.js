const http = require("http");
const mysql = require("mysql2");

/* ---------- DATABASE CONNECTION ---------- */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sulfath@2",
  database: "billing_db"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected");
});

/* ---------- SERVER ---------- */
const server = http.createServer((req, res) => {

  // CORS + JSON
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  /* ---------- ADD BILL ---------- */
  if (req.method === "POST" && req.url === "/add-bill") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const { amount, tax, discount, total } = JSON.parse(body);

        const sql =
          "INSERT INTO bills (amount, tax, discount, total) VALUES (?, ?, ?, ?)";

        db.query(sql, [amount, tax, discount, total], err => {
          if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: "Database Error" }));
          }
          res.end(JSON.stringify({ message: "Bill Added Successfully" }));
        });
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  /* ---------- BILL HISTORY ---------- */
  else if (req.method === "GET" && req.url === "/history") {
    db.query("SELECT * FROM bills ORDER BY id DESC", (err, result) => {
      if (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: "Database Error" }));
      }
      res.end(JSON.stringify(result));
    });
  }

  /* ---------- NOT FOUND ---------- */
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route Not Found" }));
  }
});

/* ---------- START SERVER ---------- */
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
