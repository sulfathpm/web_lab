const http = require("http");
const mysql = require("mysql2");

// 1️⃣ Create DB connection at top level
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sulfath@2",
  database: "trip_db"
});

// Connect
db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("mysql connected.");
});

// 2️⃣ Create server
const server = http.createServer((req, res) => {

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/saveTrip") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const sql = `
          INSERT INTO trip_details
          (pickup,destination,distance,vehicle,hourss,base_fare,tax,total_amount)
          VALUES (?,?,?,?,?,?,?,?)
        `;

        // ✅ Use top-level db variable
        db.query(sql, [
          data.pickup,
          data.destination,
          data.distance,
          data.vehicle,
          data.hourss,
          data.baseFare,
          data.tax,
          data.total
        ], (err, result) => {
          if (err) {
            console.error("DB error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Database error" }));
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Trip saved" }));
        });

      } catch (err) {
        console.error("JSON parse error:", err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
