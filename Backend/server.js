const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// MySQL pool setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL error:", err);
  }
})();

const api = express.Router();
app.use("/api", api);

// --- LOGIN ---
api.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.execute(
      `SELECT Username as username, Role as role, AllowedPlants as allowedPlants FROM Users 
       WHERE LOWER(Username) = LOWER(?) AND Password = ? 
       AND (IsDelete = 0 OR IsDelete IS NULL)`,
      [username, password]
    );
    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        message: "Login successful",
        role: user.role,
        username: user.username,
        allowedPlants: user.allowedPlants,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- PLANT MASTER ---
api.get("/plant-master", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM PlantMaster");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

api.delete("/plant-master/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "UPDATE PlantMaster SET IsDeleted = 1 WHERE PlantID = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json({ message: "✅ Plant soft deleted successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({ error: "❌ Failed to delete plant" });
  }
});

api.post("/plant-master", async (req, res) => {
  const { plantName, plantAddress, contactPerson, mobileNo, remarks } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO PlantMaster (PlantName, PlantAddress, ContactPerson, MobileNo, Remarks) 
       VALUES (?, ?, ?, ?, ?)`,
      [plantName, plantAddress, contactPerson, mobileNo, remarks]
    );
    res.status(201).json({
      plantid: result.insertId,
      plantName,
      plantAddress,
      contactPerson,
      mobileNo,
      remarks
    });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ error: "Failed to create plant" });
  }
});

api.put("/plant-master/:id", async (req, res) => {
  const { id } = req.params;
  const { plantName, plantAddress, contactPerson, mobileNo, remarks } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE PlantMaster 
       SET PlantName = ?, PlantAddress = ?, ContactPerson = ?, MobileNo = ?, Remarks = ? 
       WHERE PlantID = ?`,
      [plantName, plantAddress, contactPerson, mobileNo, remarks, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Plant not found" });
    res.json({
      plantid: id,
      plantName,
      plantAddress,
      contactPerson,
      mobileNo,
      remarks
    });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({ error: "Failed to update plant" });
  }
});

api.get("/plantmaster/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
        PlantID as plantId, 
        PlantName as plantName, 
        PlantAddress as plantAddress, 
        ContactPerson as contactPerson, 
        MobileNo as mobileNo, 
        Remarks as remarks 
      FROM PlantMaster 
      WHERE PlantID = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({ error: "Failed to fetch plant" });
  }
});

api.get("/plants", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM PlantMaster WHERE IsDeleted = 0 OR IsDeleted IS NULL"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching plant list:", error);
    res.status(500).json({ error: "Failed to fetch plant list" });
  }
});

// --- USERS ---
api.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Username as username,
        Password as password,
        Role as role,
        AllowedPlants as allowedplants,
        ContactNumber as contactnumber
      FROM Users 
      WHERE (IsDelete = 0 OR IsDelete IS NULL)
      ORDER BY Username
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

api.get("/plantmaster", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        PlantID as plantid,
        PlantName as plantname
      FROM PlantMaster 
      WHERE (IsDeleted = 0 OR IsDeleted IS NULL)
      ORDER BY PlantName
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

api.put("/users/:username", async (req, res) => {
  const { username } = req.params;
  const {
    username: newUsername,
    password,
    role,
    allowedplants,
    contactnumber,
  } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE Users 
      SET Username = ?, Password = ?, Role = ?, AllowedPlants = ?, ContactNumber = ?
      WHERE Username = ?`,
      [newUsername, password, role, allowedplants, contactnumber, username]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

api.delete("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const [result] = await pool.query(
      `UPDATE Users SET IsDelete = 1 WHERE Username = ?`,
      [username]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// --- CREATE USER ---
api.post("/users", async (req, res) => {
  const { username, password, contactNumber, moduleRights, allowedPlants } = req.body;
  if (!username || !password || !contactNumber) {
    return res.status(400).json({
      message: "Username, password, and contact number are required.",
    });
  }
  try {
    const roleString = moduleRights.join(",");
    const plantsString = allowedPlants.join(",");
    const [result] = await pool.query(
      `INSERT INTO Users (Username, Password, ContactNumber, Role, AllowedPlants)
      VALUES (?, ?, ?, ?, ?)`,
      [username, password, contactNumber, roleString, plantsString]
    );
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ message: "Error creating user." });
  }
});

// --- TRUCK TRANSACTION (with transaction logic) ---
api.post("/truck-transaction", async (req, res) => {
  const { formData, tableData } = req.body;
  const truckNo = formData.truckNo.trim().toLowerCase();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let transactionId = formData.transactionId;

    // Check if the truck is already in transport
    if (!transactionId) {
      const [truckExists] = await conn.query(
        `SELECT 1 FROM TruckTransactionMaster
         WHERE LOWER(LTRIM(RTRIM(TruckNo))) = ? AND completed = 0`,
        [truckNo]
      );
      if (truckExists.length > 0) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          message: "🚫 Truck number already exists.",
        });
      }
      const [pendingCheck] = await conn.query(
        `SELECT 1
         FROM TruckTransactionDetails d
         JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
         WHERE LOWER(LTRIM(RTRIM(m.TruckNo))) = ?
           AND (d.CheckInStatus = 0 OR d.CheckOutStatus = 0)
         LIMIT 1`,
        [truckNo]
      );
      if (pendingCheck.length > 0) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          message: "🚫 Truck already in transport. Complete check-out first.",
        });
      }
    }

    // Insert or Update Master Record
    if (transactionId) {
      await conn.query(
        `UPDATE TruckTransactionMaster SET
          TruckNo = ?, TransactionDate = ?, CityName = ?, Transporter = ?, AmountPerTon = ?, TruckWeight = ?, DeliverPoint = ?, Remarks = ?
         WHERE TransactionID = ?`,
        [
          formData.truckNo,
          formData.transactionDate,
          formData.cityName,
          formData.transporter,
          formData.amountPerTon,
          formData.truckWeight,
          formData.deliverPoint,
          formData.remarks,
          transactionId,
        ]
      );
    } else {
      const [insertResult] = await conn.query(
        `INSERT INTO TruckTransactionMaster
          (TruckNo, TransactionDate, CityName, Transporter, AmountPerTon, TruckWeight, DeliverPoint, Remarks, CreatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          formData.truckNo,
          formData.transactionDate,
          formData.cityName,
          formData.transporter,
          formData.amountPerTon,
          formData.truckWeight,
          formData.deliverPoint,
          formData.remarks,
        ]
      );
      transactionId = insertResult.insertId;
    }

    // ONLY DELETE UNCHECKED rows
    await conn.query(
      `DELETE FROM TruckTransactionDetails 
       WHERE TransactionID = ?
         AND (CheckInStatus = 0 AND CheckOutStatus = 0)`,
      [transactionId]
    );

    const filteredTableData = tableData.filter((row) => row.plantName?.trim() !== "");
    for (const row of filteredTableData) {
      const [plantResult] = await conn.query(
        `SELECT PlantID FROM PlantMaster WHERE LOWER(LTRIM(RTRIM(PlantName))) = LOWER(LTRIM(RTRIM(?)))`,
        [row.plantName]
      );
      const plantId = plantResult[0]?.PlantID;
      if (!plantId) throw new Error(`Plant not found: ${row.plantName}`);

      // Skip duplicates
      const [duplicateCheck] = await conn.query(
        `SELECT 1 FROM TruckTransactionDetails
         WHERE TransactionID = ? AND PlantID = ? AND LoadingSlipNo = ? AND Priority = ?`,
        [transactionId, plantId, row.loadingSlipNo, row.priority]
      );
      if (duplicateCheck.length > 0) continue;

      await conn.query(
        `INSERT INTO TruckTransactionDetails
          (TransactionID, PlantID, LoadingSlipNo, Qty, Priority, Remarks, Freight, CheckInTime, CheckOutTime)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transactionId,
          plantId,
          row.loadingSlipNo,
          row.qty,
          row.priority,
          row.remarks || "",
          row.freight,
          row.checkinTime || null,
          row.checkoutTime || null,
        ]
      );
    }

    // Check completion
    const [[{ total }]] = await conn.query(
      `SELECT COUNT(*) AS total FROM TruckTransactionDetails WHERE TransactionID = ?`,
      [transactionId]
    );
    const [[{ completed }]] = await conn.query(
      `SELECT COUNT(*) AS completed FROM TruckTransactionDetails
       WHERE TransactionID = ? AND CheckInStatus = 1 AND CheckOutStatus = 1`,
      [transactionId]
    );
    if (total > 0 && total === completed) {
      await conn.query(
        `UPDATE TruckTransactionMaster
         SET completed = 1
         WHERE transactionid = ?
           AND NOT EXISTS (
             SELECT 1 FROM TruckTransactionDetails
             WHERE transactionid = ?
               AND (checkinstatus <> 1 OR checkoutstatus <> 1)
           )`,
        [transactionId, transactionId]
      );
      await conn.commit();
      return res.json({ message: "✅ Truck transaction completed." });
    }

    await conn.commit();
    res.json({ success: true, transactionId });
  } catch (err) {
    console.error("❌ Transaction failed:", err.message);
    await conn.rollback();
    res.status(500).json({ success: false, error: err.message });
  } finally {
    conn.release();
  }
});

// --- TRUCK FIND ---
api.get("/truck-find", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT TruckNo, TransactionDate, CityName
       FROM TruckTransactionMaster
       WHERE TruckNo IS NOT NULL AND Completed = 0
       ORDER BY TransactionDate DESC`
    );
    const formattedData = rows.map((truck) => ({
      truckno: truck.TruckNo,
      transactiondate: truck.TransactionDate,
      cityname: truck.CityName,
    }));
    res.json(formattedData);
  } catch (err) {
    console.error("Error fetching truck transactions:", err);
    res.status(500).json({ error: "Failed to fetch truck data" });
  }
});

// --- TRUCK TRANSACTION BY TRUCK NUMBER ---
api.get("/truck-transaction/:truckNo", async (req, res) => {
  const { truckNo } = req.params;
  try {
    const [masterRows] = await pool.query(
      `SELECT * FROM TruckTransactionMaster
       WHERE TruckNo = ? AND Completed = 0
       ORDER BY TransactionID DESC LIMIT 1`,
      [truckNo]
    );
    const master = masterRows[0];
    if (!master) {
      return res.status(404).json({ error: "Truck not found" });
    }
    const [details] = await pool.query(
      `SELECT d.*, p.PlantName as plantname
       FROM TruckTransactionDetails d
       LEFT JOIN PlantMaster p ON d.PlantID = p.PlantID
       WHERE d.TransactionID = ?`,
      [master.TransactionID]
    );
    res.json({ master, details });
  } catch (err) {
    console.error("Error fetching truck transaction:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// --- DELETE TRUCK TRANSACTION DETAIL ---
api.delete('/truck-transaction/detail/:detailId', async (req, res) => {
  const { detailId } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM TruckTransactionDetails WHERE detailid = ?',
      [parseInt(detailId)]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Detail not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- ADD ALL OTHER ENDPOINTS HERE (copy logic from your original MSSQL code, just swap to pool.query/execute and MySQL syntax) ---
// You can continue to add the rest of your endpoints (truck status, reports, etc.) using the same pattern as above.

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

//     const result = await request.query(`
//       SELECT 
//         PlantID as plantId, 
//         PlantName as plantName, 
//         PlantAddress as plantAddress, 
//         ContactPerson as contactPerson, 
//         MobileNo as mobileNo, 
//         Remarks as remarks 
//       FROM PlantMaster 
//       WHERE PlantID = @plantId
//     `);

//     if (result.recordset.length === 0) {
//       return res.status(404).json({ error: "Plant not found" });
//     }

//     res.json(result.recordset[0]);
//   } catch (error) {
//     console.error("Error fetching plant:", error);
//     res.status(500).json({ error: "Failed to fetch plant" });
//   }
// });

// app.get("/api/plants", async (req, res) => {
//   try {
//     const request = new sql.Request();
//     const result = await request.query(
//       "SELECT * FROM PlantMaster WHERE IsDeleted = 0 OR IsDeleted IS NULL"
//     );
//     res.json(result.recordset); // Send plant data
//   } catch (error) {
//     console.error("Error fetching plant list:", error);
//     res.status(500).json({ error: "Failed to fetch plant list" });
//   }
// });

// // Get all users API
// app.get("/api/users", async (req, res) => {
//   try {
//     const request = new sql.Request();
//     const result = await request.query(`
//       SELECT 
//         Username as username,
//         Password as password,
//         Role as role,
//         AllowedPlants as allowedplants,
//         ContactNumber as contactnumber
//       FROM Users 
//       WHERE (IsDelete = 0 OR IsDelete IS NULL)
//       ORDER BY Username
//     `);
//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Get all plants for plantmaster API (used by UserRegister)
// app.get("/api/plantmaster", async (req, res) => {
//   try {
//     const request = new sql.Request();
//     const result = await request.query(`
//       SELECT 
//         PlantID as plantid,
//         PlantName as plantname
//       FROM PlantMaster 
//       WHERE (IsDeleted = 0 OR IsDeleted IS NULL)
//       ORDER BY PlantName
//     `);
//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching plants:", error);
//     res.status(500).json({ error: "Failed to fetch plants" });
//   }
// });

// // Update user API
// app.put("/api/users/:username", async (req, res) => {
//   const { username } = req.params;
//   const {
//     username: newUsername,
//     password,
//     role,
//     allowedplants,
//     contactnumber,
//   } = req.body;

//   try {
//     const request = new sql.Request();
//     request.input("oldUsername", sql.VarChar, username);
//     request.input("newUsername", sql.VarChar, newUsername);
//     request.input("password", sql.VarChar, password);
//     request.input("role", sql.VarChar, role);
//     request.input("allowedplants", sql.VarChar, allowedplants);
//     request.input("contactnumber", sql.VarChar, contactnumber);

//     const result = await request.query(`
//       UPDATE Users 
//       SET Username = @newUsername,
//           Password = @password,
//           Role = @role,
//           AllowedPlants = @allowedplants,
//           ContactNumber = @contactnumber
//       WHERE Username = @oldUsername
//     `);

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Failed to update user" });
//   }
// });

// // Delete user API
// app.delete("/api/users/:username", async (req, res) => {
//   const { username } = req.params;

//   try {
//     const request = new sql.Request();
//     request.input("username", sql.VarChar, username);

//     const result = await request.query(`
//       UPDATE Users 
//       SET IsDelete = 1 
//       WHERE Username = @username
//     `);

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// });

// ///////////////////////////////////////////////////////////////////////////////truck transaction api///////////////////////////////////////////////////////////////////////////////////////////////////////
// // app.post("/api/truck-transaction", async (req, res) => {
// //   const { formData, tableData } = req.body;
// //   const truckNo = formData.truckNo.trim().toLowerCase();
// //   const transaction = new sql.Transaction();

// //   try {
// //     await transaction.begin();
// //     let transactionId = formData.transactionId;

// //     // Check if the truck is already in transport
// //     if (!transactionId) {
// //       const checkTruckRequest = new sql.Request(transaction);
// //       checkTruckRequest.input("truckNo", sql.VarChar, truckNo);

// //       const truckExists = await checkTruckRequest.query(`
// //         SELECT 1 FROM TruckTransactionMaster
// //         WHERE LOWER(LTRIM(RTRIM(TruckNo))) = @truckNo AND completed = 0
// //       `);

// //       if (truckExists.recordset.length > 0) {
// //         await transaction.rollback();
// //         return res.status(409).json({
// //           success: false,
// //           message: "🚫 Truck number already exists.",
// //         });
// //       }

// //       const checkRequest = new sql.Request(transaction);
// //       checkRequest.input("truckNo", sql.VarChar, truckNo);

// //       const pendingCheck = await checkRequest.query(`
// //         SELECT TOP 1 1
// //         FROM TruckTransactionDetails d
// //         JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
// //         WHERE LOWER(LTRIM(RTRIM(m.TruckNo))) = @truckNo
// //           AND (d.CheckInStatus = 0 OR d.CheckOutStatus = 0)
// //       `);

// //       if (pendingCheck.recordset.length > 0) {
// //         await transaction.rollback();
// //         return res.status(409).json({
// //           success: false,
// //           message: "🚫 Truck already in transport. Complete check-out first.",
// //         });
// //       }
// //     }

// ... Continue converting all remaining endpoints and transaction logic to MySQL using the same approach ...

//       const truckExists = await checkTruckRequest.query(`
//         SELECT 1 FROM TruckTransactionMaster
//         WHERE LOWER(LTRIM(RTRIM(TruckNo))) = @truckNo AND completed = 0
//       `);

//       if (truckExists.recordset.length > 0) {
//         await transaction.rollback();
//         return res.status(409).json({
//           success: false,
//           message: "🚫 Truck number already exists.",
//         });
//       }

//       const checkRequest = new sql.Request(transaction);
//       checkRequest.input("truckNo", sql.VarChar, truckNo);

//       const pendingCheck = await checkRequest.query(`
//         SELECT TOP 1 1
//         FROM TruckTransactionDetails d
//         JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
//         WHERE LOWER(LTRIM(RTRIM(m.TruckNo))) = @truckNo
//           AND (d.CheckInStatus = 0 OR d.CheckOutStatus = 0)
//       `);

//       if (pendingCheck.recordset.length > 0) {
//         await transaction.rollback();
//         return res.status(409).json({
//           success: false,
//           message: "🚫 Truck already in transport. Complete check-out first.",
//         });
//       }
//     }

//     // Insert or Update Master Record
//     if (transactionId) {
//       const updateRequest = new sql.Request(transaction);
//       updateRequest.input("transactionId", sql.Int, transactionId);
//       updateRequest.input("truckNo", sql.VarChar, formData.truckNo);
//       updateRequest.input("transactionDate", sql.DateTime, formData.transactionDate);
//       updateRequest.input("cityName", sql.VarChar, formData.cityName);
//       updateRequest.input("transporter", sql.VarChar, formData.transporter);
//       updateRequest.input("amountPerTon", sql.Decimal(10, 2), formData.amountPerTon);
//       updateRequest.input("truckWeight", sql.Decimal(10, 2), formData.truckWeight);
//       updateRequest.input("deliverPoint", sql.VarChar, formData.deliverPoint);
//       updateRequest.input("remarks", sql.VarChar, formData.remarks);

//       await updateRequest.query(`
//         UPDATE TruckTransactionMaster SET
//           TruckNo = @truckNo,
//           TransactionDate = @transactionDate,
//           CityName = @cityName,
//           Transporter = @transporter,
//           AmountPerTon = @amountPerTon,
//           TruckWeight = @truckWeight,
//           DeliverPoint = @deliverPoint,
//           Remarks = @remarks
//         WHERE TransactionID = @transactionId
//       `);
//     } else {
//       const insertRequest = new sql.Request(transaction);
//       insertRequest.input("truckNo", sql.VarChar, formData.truckNo);
//       insertRequest.input("transactionDate", sql.DateTime, formData.transactionDate);
//       insertRequest.input("cityName", sql.VarChar, formData.cityName);
//       insertRequest.input("transporter", sql.VarChar, formData.transporter);
//       insertRequest.input("amountPerTon", sql.Decimal(10, 2), formData.amountPerTon);
//       insertRequest.input("truckWeight", sql.Decimal(10, 2), formData.truckWeight);
//       insertRequest.input("deliverPoint", sql.VarChar, formData.deliverPoint);
//       insertRequest.input("remarks", sql.VarChar, formData.remarks);

//       const insertResult = await insertRequest.query(`
//         INSERT INTO TruckTransactionMaster
//           (TruckNo, TransactionDate, CityName, Transporter, AmountPerTon, TruckWeight, DeliverPoint, Remarks, CreatedAt)
//         OUTPUT INSERTED.TransactionID
//         VALUES
//           (@truckNo, @transactionDate, @cityName, @transporter, @amountPerTon, @truckWeight, @deliverPoint, @remarks, GETDATE())
//       `);

//       transactionId = insertResult.recordset[0].TransactionID;
//     }

//     // ✅ ONLY DELETE UNCHECKED rows
//     const deleteRequest = new sql.Request(transaction);
//     deleteRequest.input("transactionId", sql.Int, transactionId);
//     await deleteRequest.query(`
//       DELETE FROM TruckTransactionDetails 
//       WHERE TransactionID = @transactionId
//         AND (CheckInStatus = 0 AND CheckOutStatus = 0)
//     `);

//     const filteredTableData = tableData.filter((row) => row.plantName?.trim() !== "");

//     for (const row of filteredTableData) {
//       const plantRequest = new sql.Request(transaction);
//       plantRequest.input("plantName", sql.VarChar, row.plantName);
//       const plantResult = await plantRequest.query(`
//         SELECT PlantID FROM PlantMaster WHERE LOWER(LTRIM(RTRIM(PlantName))) = LOWER(LTRIM(RTRIM(@plantName)))
//       `);

//       const plantId = plantResult.recordset[0]?.PlantID;
//       if (!plantId) throw new Error(`Plant not found: ${row.plantName}`);

//       // Skip duplicates
//       const duplicateCheck = await new sql.Request(transaction)
//         .input("transactionId", sql.Int, transactionId)
//         .input("plantId", sql.Int, plantId)
//         .input("loadingSlipNo", sql.VarChar, row.loadingSlipNo)
//         .input("priority", sql.Int, row.priority)
//         .query(`
//           SELECT 1 FROM TruckTransactionDetails
//           WHERE TransactionID = @transactionId
//             AND PlantID = @plantId
//             AND LoadingSlipNo = @loadingSlipNo
//             AND Priority = @priority
//         `);

//       if (duplicateCheck.recordset.length > 0) continue;

//       const detailRequest = new sql.Request(transaction);
//       detailRequest.input("transactionId", sql.Int, transactionId);
//       detailRequest.input("plantId", sql.Int, plantId);
//       detailRequest.input("loadingSlipNo", sql.VarChar, row.loadingSlipNo);
//       detailRequest.input("qty", sql.Decimal(10, 2), row.qty);
//       detailRequest.input("priority", sql.Int, row.priority);
//       detailRequest.input("remarks", sql.VarChar, row.remarks || "");
//       detailRequest.input("freight", sql.VarChar, row.freight);
//       detailRequest.input("checkInTime", sql.DateTime, row.checkinTime || null);
//       detailRequest.input("checkOutTime", sql.DateTime, row.checkoutTime || null);

//       await detailRequest.query(`
//         INSERT INTO TruckTransactionDetails
//           (TransactionID, PlantID, LoadingSlipNo, Qty, Priority, Remarks, Freight, CheckInTime, CheckOutTime)
//         VALUES
//           (@transactionId, @plantId, @loadingSlipNo, @qty, @priority, @remarks, @freight, @checkInTime, @checkOutTime)
//       `);
//     }

//     const totalRowsResult = await new sql.Request(transaction)
//       .input("transactionId", sql.Int, transactionId)
//       .query(`
//         SELECT COUNT(*) AS total FROM TruckTransactionDetails WHERE TransactionID = @transactionId
//       `);
//     const totalRows = totalRowsResult.recordset[0].total;

//     const completedRowsResult = await new sql.Request(transaction)
//       .input("transactionId", sql.Int, transactionId)
//       .query(`
//         SELECT COUNT(*) AS completed FROM TruckTransactionDetails
//         WHERE TransactionID = @transactionId AND CheckInStatus = 1 AND CheckOutStatus = 1
//       `);
//     const completedRows = completedRowsResult.recordset[0].completed;

//     if (totalRows > 0 && totalRows === completedRows) {
//       await new sql.Request(transaction)
//         .input("transactionId", sql.Int, transactionId)
//         .query(`
//           UPDATE TruckTransactionMaster
//           SET completed = 1
//           WHERE transactionid = @transactionId
//             AND NOT EXISTS (
//               SELECT 1 FROM TruckTransactionDetails
//               WHERE transactionid = @transactionId
//                 AND (checkinstatus <> 1 OR checkoutstatus <> 1)
//             )
//         `);
//       return res.json({ message: "✅ Truck transaction completed." });
//     }

//     await transaction.commit();
//     res.json({ success: true, transactionId });
//   } catch (err) {
//     console.error("❌ Transaction failed:", err.message);
//     await transaction.rollback();
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// // Fetch Truck Numbers API
// app.get("/api/trucks", async (req, res) => {
//   const { plantName } = req.query;

//   try {
//     const request = new sql.Request();
//     request.input("plantName", sql.VarChar, plantName);

//     const result = await request.query(`
//       SELECT DISTINCT m.TruckNo
//       FROM PlantMaster p
//       JOIN TruckTransactionDetails d ON p.PlantID = d.PlantID
//       JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
//       WHERE LOWER(LTRIM(RTRIM(p.PlantName))) = LOWER(LTRIM(RTRIM(@plantName)))
//         AND d.CheckInStatus = 0
//         AND m.Completed = 0
//     `);

//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching truck numbers:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Update Truck Status API
// app.post("/api/update-truck-status", async (req, res) => {
//   const { truckNo, plantName, invoicenumber, type } = req.body;

//   try {
//     // 1. Get TransactionID
//     const transactionRequest = new sql.Request();
//     transactionRequest.input("truckNo", sql.VarChar, truckNo);

//     const transactionResult = await transactionRequest.query(`
//       SELECT TOP 1 TransactionID
//       FROM TruckTransactionMaster
//       WHERE LOWER(LTRIM(RTRIM(TruckNo))) = LOWER(LTRIM(RTRIM(@truckNo))) AND Completed = 0
//       ORDER BY TransactionID DESC
//     `);

//     if (transactionResult.recordset.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "❌ Truck not found or already completed" });
//     }
//     const transactionId = transactionResult.recordset[0].TransactionID;

//     // 2. Get PlantID
//     const plantRequest = new sql.Request();
//     plantRequest.input("plantName", sql.VarChar, plantName);

//     const plantResult = await plantRequest.query(
//       `SELECT TOP 1 PlantID FROM PlantMaster WHERE LOWER(LTRIM(RTRIM(PlantName))) = LOWER(LTRIM(RTRIM(@plantName)))`
//     );

//     if (plantResult.recordset.length === 0) {
//       return res.status(404).json({ message: "❌ Plant not found" });
//     }
//     const plantId = plantResult.recordset[0].PlantID;

//     // 3. Get current status
//     const statusRequest = new sql.Request();
//     statusRequest.input("plantId", sql.Int, plantId);
//     statusRequest.input("transactionId", sql.Int, transactionId);

//     const statusResult = await statusRequest.query(`
//       SELECT CheckInStatus, CheckOutStatus
//       FROM TruckTransactionDetails
//       WHERE PlantID = @plantId AND TransactionID = @transactionId
//     `);

//     if (statusResult.recordset.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "❌ Truck detail not found for this plant" });
//     }
//     const status = statusResult.recordset[0];

//     // 4. Handle Check-In
//     if (type === "Check In" && status.CheckInStatus === 0) {
//       const updateRequest = new sql.Request();
//       updateRequest.input("plantId", sql.Int, plantId);
//       updateRequest.input("transactionId", sql.Int, transactionId);

//       await updateRequest.query(`
//         UPDATE TruckTransactionDetails
//         SET CheckInStatus = 1,
//             CheckInTime = GETDATE()
//         WHERE PlantID = @plantId AND TransactionID = @transactionId
//       `);

//       return res
//         .status(200)
//         .json({ message: "✅ Truck checked in successfully!" });
//     }

//     // 5. Handle Check-Out
//     if (type === "Check Out") {
//       if (status.CheckInStatus === 0) {
//         return res
//           .status(400)
//           .json({ message: "❌ Please Check In first before Check Out" });
//       }

//       if (status.CheckOutStatus === 1) {
//         return res
//           .status(400)
//           .json({ message: "🚫 This truck has already been checked out." });
//       }

//       const updateRequest = new sql.Request();
//       updateRequest.input("plantId", sql.Int, plantId);
//       updateRequest.input("transactionId", sql.Int, transactionId);
//       updateRequest.input("invoiceNumber", sql.VarChar, invoicenumber);

//       await updateRequest.query(`
//         UPDATE TruckTransactionDetails
//         SET CheckOutStatus = 1,
//             CheckOutTime = GETDATE(),
//             Invoice_Number = @invoiceNumber
//         WHERE PlantID = @plantId AND TransactionID = @transactionId
//       `);

//       // 6. Check if all plants completed
//       const allStatusRequest = new sql.Request();
//       allStatusRequest.input("transactionId", sql.Int, transactionId);

//       const allStatusResult = await allStatusRequest.query(`
//         SELECT COUNT(*) AS totalplants,
//                SUM(CASE WHEN CheckInStatus = 1 THEN 1 ELSE 0 END) AS checkedin,
//                SUM(CASE WHEN CheckOutStatus = 1 THEN 1 ELSE 0 END) AS checkedout
//         FROM TruckTransactionDetails
//         WHERE TransactionID = @transactionId
//       `);

//       const statusCheck = allStatusResult.recordset[0];
//       if (
//         statusCheck.totalplants === statusCheck.checkedin &&
//         statusCheck.totalplants === statusCheck.checkedout
//       ) {
//         const completeRequest = new sql.Request();
//         completeRequest.input("transactionId", sql.Int, transactionId);

//         await completeRequest.query(`
//           UPDATE TruckTransactionMaster
//           SET completed = 1
//           WHERE transactionid = @transactionId
//             AND NOT EXISTS (
//               SELECT 1 FROM TruckTransactionDetails
//               WHERE transactionid = @transactionId
//                 AND (checkinstatus <> 1 OR checkoutstatus <> 1)
//             )
//         `);

//         return res.json({
//           message: "✅ All plants processed. Truck process completed.",
//         });
//       }

//       return res
//         .status(200)
//         .json({ message: "✅ Truck checked out successfully!" });
//     }
//   } catch (error) {
//     console.error("Error updating truck status:", error);
//     res.status(500).json({ error: "Failed to update truck status" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// //       await completeRequest.query(`
// //         UPDATE TruckTransactionMaster
// //   SET Completed = 1
// //   WHERE TransactionID = @transactionId
// //       `);

// //       return res.json({
// //         message: "✅ All plants processed. Truck process completed.",
// //       });
// //     }

// //     return res.json({ message: `✅ ${type} successful` });
// //   } catch (error) {
// //     console.error("Status update error:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });
// app.post("/api/update-truck-status", async (req, res) => {
//   const { truckNo, plantName, invoicenumber, type } = req.body;

//   try {
//     // 1. Get TransactionID
//     const transactionRequest = new sql.Request();
//     transactionRequest.input("truckNo", sql.VarChar, truckNo);

//     const transactionResult = await transactionRequest.query(`
//       SELECT TOP 1 transactionid
//       FROM trucktransactionmaster
//       WHERE LOWER(LTRIM(RTRIM(truckno))) = LOWER(LTRIM(RTRIM(@truckNo))) AND completed = 0
//       ORDER BY transactionid DESC
//     `);

//     if (transactionResult.recordset.length === 0) {
//       return res.status(404).json({ message: "❌ Truck not found or already completed" });
//     }
//     const transactionId = transactionResult.recordset[0].transactionid;

//     // 2. Get PlantID
//     const plantRequest = new sql.Request();
//     plantRequest.input("plantName", sql.VarChar, plantName);

//     const plantResult = await plantRequest.query(`
//       SELECT TOP 1 plantid FROM plantmaster WHERE LOWER(LTRIM(RTRIM(plantname))) = LOWER(LTRIM(RTRIM(@plantName)))
//     `);

//     if (plantResult.recordset.length === 0) {
//       return res.status(404).json({ message: "❌ Plant not found" });
//     }
//     const plantId = plantResult.recordset[0].plantid;

//     // 3. Get current status
//     const statusRequest = new sql.Request();
//     statusRequest.input("plantId", sql.Int, plantId);
//     statusRequest.input("transactionId", sql.Int, transactionId);

//     const statusResult = await statusRequest.query(`
//       SELECT checkinstatus, checkoutstatus
//       FROM trucktransactiondetails
//       WHERE plantid = @plantId AND transactionid = @transactionId
//     `);

//     if (statusResult.recordset.length === 0) {
//       return res.status(404).json({ message: "❌ Truck detail not found for this plant" });
//     }
//     const status = statusResult.recordset[0];

//     // 4. Handle Check-In
//     if (type === "Check In" && status.checkinstatus === 0) {
//       const updateRequest = new sql.Request();
//       updateRequest.input("plantId", sql.Int, plantId);
//       updateRequest.input("transactionId", sql.Int, transactionId);

//       await updateRequest.query(`
//         UPDATE trucktransactiondetails
//         SET checkinstatus = 1,
//             checkintime = GETDATE()
//         WHERE plantid = @plantId AND transactionid = @transactionId
//       `);

//       return res.status(200).json({ message: "✅ Truck checked in successfully!" });
//     }

//     // 5. Handle Check-Out
//     if (type === "Check Out") {
//       if (status.checkinstatus === 0) {
//         return res.status(400).json({ message: "❌ Please Check In first before Check Out" });
//       }

//       if (status.checkoutstatus === 1) {
//         return res.status(400).json({ message: "🚫 This truck has already been checked out." });
//       }

//       const updateRequest = new sql.Request();
//       updateRequest.input("plantId", sql.Int, plantId);
//       updateRequest.input("transactionId", sql.Int, transactionId);
//       updateRequest.input("invoiceNumber", sql.VarChar, invoicenumber);

//       await updateRequest.query(`
//         UPDATE trucktransactiondetails
//         SET checkoutstatus = 1,
//             checkouttime = GETDATE(),
//             invoice_number = @invoiceNumber
//         WHERE plantid = @plantId AND transactionid = @transactionId
//       `);

//       // 6. Check if all plants completed
//       const allStatusRequest = new sql.Request();
//       allStatusRequest.input("transactionId", sql.Int, transactionId);

//       const allStatusResult = await allStatusRequest.query(`
//         SELECT COUNT(*) AS totalplants,
//                SUM(CASE WHEN checkinstatus = 1 THEN 1 ELSE 0 END) AS checkedin,
//                SUM(CASE WHEN checkoutstatus = 1 THEN 1 ELSE 0 END) AS checkedout
//         FROM trucktransactiondetails
//         WHERE transactionid = @transactionId
//       `);

//       const statusCheck = allStatusResult.recordset[0];
//       if (
//         statusCheck.totalplants === statusCheck.checkedin &&
//         statusCheck.totalplants === statusCheck.checkedout
//       ) {
//         const completeRequest = new sql.Request();
//         completeRequest.input("transactionId", sql.Int, transactionId);

//         await completeRequest.query(`
//           UPDATE trucktransactionmaster
//           SET completed = 1
//           WHERE transactionid = @transactionId
//             AND NOT EXISTS (
//               SELECT 1 FROM trucktransactiondetails
//               WHERE transactionid = @transactionId
//                 AND (checkinstatus <> 1 OR checkoutstatus <> 1)
//             )
//         `);

//         return res.json({
//           message: "✅ All plants processed. Truck process completed.",
//         });
//       }

//       return res.status(200).json({ message: "✅ Truck checked out successfully!" });
//     }
//   } catch (error) {
//     console.error("Status update error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Check Priority Status API
// app.get("/api/check-priority-status", async (req, res) => {
//   const { truckNo, plantName } = req.query;

//   try {
//     // Get the latest active transaction
//     const transRequest = new sql.Request();
//     transRequest.input("truckNo", sql.VarChar, truckNo);

//     const transRes = await transRequest.query(`
//       SELECT TOP 1 TransactionID 
//       FROM TruckTransactionMaster
//       WHERE LOWER(LTRIM(RTRIM(TruckNo))) = LOWER(LTRIM(RTRIM(@truckNo))) AND Completed = 0
//       ORDER BY TransactionID DESC
//     `);

//     if (transRes.recordset.length === 0) {
//       return res.json({ hasPending: false });
//     }

//     const transactionId = transRes.recordset[0].TransactionID;

//     // Get all rows with check statuses
//     const detailRequest = new sql.Request();
//     detailRequest.input("transactionId", sql.Int, transactionId);

//     const detailRes = await detailRequest.query(`
//       SELECT d.Priority, d.CheckInStatus, d.CheckOutStatus, p.PlantName
//       FROM TruckTransactionDetails d
//       JOIN PlantMaster p ON d.PlantID = p.PlantID
//       WHERE d.TransactionID = @transactionId
//     `);

//     if (detailRes.recordset.length === 0) {
//       return res.json({ hasPending: false });
//     }

//     const sorted = detailRes.recordset.sort((a, b) => a.Priority - b.Priority);

//     // Find the lowest pending priority
//     const pending = sorted.find(
//       (row) => row.CheckInStatus !== 1 || row.CheckOutStatus !== 1
//     );

//     if (!pending) {
//       return res.json({ hasPending: false });
//     }

//     const currentRow = sorted.find(
//       (row) => row.PlantName.toLowerCase() === plantName.toLowerCase()
//     );

//     if (!currentRow) {
//       return res
//         .status(400)
//         .json({ error: "Current plant not found in transaction" });
//     }

//     const canProceed = currentRow.Priority === pending.Priority;

//     res.json({
//       hasPending: true,
//       canProceed,
//       nextPriority: pending.Priority,
//       nextPlant: pending.PlantName,
//     });
//   } catch (err) {
//     console.error("Priority status error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get Finished Plant API
// app.get("/api/finished-plant", async (req, res) => {
//   const { truckNo } = req.query;

//   try {
//     const transRequest = new sql.Request();
//     transRequest.input("truckNo", sql.VarChar, truckNo);

//     const transRes = await transRequest.query(`
//       SELECT TOP 1 TransactionID 
//       FROM TruckTransactionMaster 
//       WHERE LOWER(LTRIM(RTRIM(TruckNo))) = LOWER(LTRIM(RTRIM(@truckNo))) AND Completed = 0 
//       ORDER BY TransactionID DESC
//     `);

//     if (transRes.recordset.length === 0) {
//       return res.json({ lastFinished: null });
//     }

//     const transactionId = transRes.recordset[0].TransactionID;

//     const finishedRequest = new sql.Request();
//     finishedRequest.input("transactionId", sql.Int, transactionId);

//     const finishedRes = await finishedRequest.query(`
//       SELECT TOP 1 p.PlantName, d.Priority
//       FROM TruckTransactionDetails d
//       JOIN PlantMaster p ON d.PlantID = p.PlantID
//       WHERE d.TransactionID = @transactionId 
//         AND d.CheckInStatus = 1 
//         AND d.CheckOutStatus = 1
//       ORDER BY d.Priority DESC
//     `);

//     if (finishedRes.recordset.length === 0) {
//       return res.json({ lastFinished: null });
//     }

//     res.json({ lastFinished: finishedRes.recordset[0].PlantName });
//   } catch (error) {
//     console.error("Error in /api/finished-plant:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Truck Report API
// app.get("/api/truck-report", async (req, res) => {
//   const { fromDate, toDate, plant } = req.query;

//   if (!fromDate || !toDate || !plant) {
//     return res.status(400).json({ error: "Missing required filters" });
//   }

//   let plantArray = [];
//   try {
//     plantArray = JSON.parse(plant);
//   } catch (err) {
//     return res.status(400).json({ error: "Invalid plant parameter" });
//   }

//   if (!Array.isArray(plantArray) || plantArray.length === 0) {
//     return res.status(400).json({ error: "No plants selected" });
//   }

//   try {
//     const request = new sql.Request();
//     request.input("fromDate", sql.Date, fromDate);
//     request.input("toDate", sql.Date, toDate);

//     // Add plant IDs as parameters
//     plantArray.forEach((plantId, index) => {
//       request.input(`plantId${index}`, sql.Int, plantId);
//     });

//     const placeholders = plantArray
//       .map((_, index) => `@plantId${index}`)
//       .join(",");

//     const query = `
//       SELECT 
//          ttm.TruckNo AS truckNo,
//          ttm.TransactionDate AS transactionDate,
//          p.PlantName AS plantName,
//          ttd.CheckInTime AS checkInTime,
//          ttd.CheckOutTime AS checkOutTime,
//          ttd.LoadingSlipNo AS loadingSlipNo,
//          ttd.Qty AS qty,
//          ttd.Freight AS freight,
//          ttd.Priority AS priority,
//          ttd.Remarks AS remarks
//       FROM TruckTransactionDetails ttd
//       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//       WHERE ttd.PlantID IN (${placeholders})
//         AND CAST(ttm.TransactionDate AS DATE) BETWEEN @fromDate AND @toDate
//       ORDER BY ttm.TransactionDate DESC
//     `;

//     const result = await request.query(query);
//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching truck report:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Fetch Checked-in Trucks API
// app.get("/api/checked-in-trucks", async (req, res) => {
//   const { plantName } = req.query;

//   try {
//     const request = new sql.Request();
//     request.input("plantName", sql.VarChar, plantName);

//     const result = await request.query(`
//       SELECT DISTINCT m.TruckNo
//       FROM PlantMaster p
//       JOIN TruckTransactionDetails d ON p.PlantID = d.PlantID
//       JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
//       WHERE LOWER(LTRIM(RTRIM(p.PlantName))) = LOWER(LTRIM(RTRIM(@plantName)))
//         AND d.CheckInStatus = 1
//         AND d.CheckOutStatus = 0
//     `);

//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching truck numbers:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Fetch Remarks API
// app.get("/api/fetch-remarks", async (req, res) => {
//   const { plantName, truckNo } = req.query;

//   try {
//     // Step 1: Get PlantID
//     const plantRequest = new sql.Request();
//     plantRequest.input("plantName", sql.VarChar, plantName);

//     const plantResult = await plantRequest.query(
//       `SELECT TOP 1 PlantID FROM PlantMaster WHERE LOWER(LTRIM(RTRIM(PlantName))) = LOWER(LTRIM(RTRIM(@plantName)))`
//     );

//     if (plantResult.recordset.length === 0) {
//       return res.status(404).json({ message: "Plant not found" });
//     }
//     const plantId = plantResult.recordset[0].PlantID;

//     // Step 2: Get TransactionID
//     const txnRequest = new sql.Request();
//     txnRequest.input("truckNo", sql.VarChar, truckNo);

//     const txnResult = await txnRequest.query(
//       `SELECT TOP 1 TransactionID FROM TruckTransactionMaster WHERE LOWER(LTRIM(RTRIM(TruckNo))) = LOWER(LTRIM(RTRIM(@truckNo)))`
//     );

//     if (txnResult.recordset.length === 0) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     const transactionId = txnResult.recordset[0].TransactionID;

//     // Step 3: Fetch Remarks
//     const remarksRequest = new sql.Request();
//     remarksRequest.input("plantId", sql.Int, plantId);
//     remarksRequest.input("transactionId", sql.Int, transactionId);

//     const remarksResult = await remarksRequest.query(`
//       SELECT TOP 1 Remarks 
//       FROM TruckTransactionDetails 
//       WHERE PlantID = @plantId AND TransactionID = @transactionId
//     `);

//     if (remarksResult.recordset.length === 0) {
//       return res.status(404).json({ message: "Remarks not found" });
//     }

//     const remarks = remarksResult.recordset[0].Remarks;
//     res.json({ remarks });
//   } catch (error) {
//     console.error("Error fetching remarks:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Create User API
// app.post("/api/users", async (req, res) => {
//   const { username, password, contactNumber, moduleRights, allowedPlants } =
//     req.body;

//   if (!username || !password || !contactNumber) {
//     return res.status(400).json({
//       message: "Username, password, and contact number are required.",
//     });
//   }

//   try {
//     const roleString = moduleRights.join(",");
//     const plantsString = allowedPlants.join(",");

//     console.log("👉 Incoming Data:", {
//       username,
//       password,
//       contactNumber,
//       roleString,
//       plantsString,
//     });

//     const request = new sql.Request();
//     request.input("username", sql.VarChar, username);
//     request.input("password", sql.VarChar, password);
//     request.input("contactNumber", sql.VarChar, contactNumber);
//     request.input("role", sql.VarChar, roleString);
//     request.input("allowedPlants", sql.VarChar, plantsString);

//     await request.query(`
//       INSERT INTO Users (Username, Password, ContactNumber, Role, AllowedPlants)
//       VALUES (@username, @password, @contactNumber, @role, @allowedPlants)
//     `);

//     res.status(201).json({ message: "User created successfully." });
//   } catch (err) {
//     console.error("❌ Error creating user:", err);
//     res.status(500).json({ message: "Error creating user." });
//   }
// });

// // Get Truck Plant Quantities API
// app.get("/api/truck-plant-quantities", async (req, res) => {
//   const { truckNo } = req.query;

//   try {
//     const request = new sql.Request();
//     request.input("truckNo", sql.VarChar, truckNo);

//     const result = await request.query(`
//       SELECT 
//         p.PlantName,
//         SUM(ttd.Qty) AS quantity,
//         MIN(ttd.Priority) AS priority
//       FROM TruckTransactionDetails ttd
//       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//       WHERE LOWER(LTRIM(RTRIM(ttm.TruckNo))) = LOWER(LTRIM(RTRIM(@truckNo)))
//         AND ttm.Completed = 0
//       GROUP BY p.PlantName
//       ORDER BY MIN(ttd.Priority)
//     `);

//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching truck quantities:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // // Get Truck Find API
// // app.get("/api/truck-find", async (req, res) => {
// //   try {
// //     const request = new sql.Request();
// //     const result = await request.query(`
// //       SELECT TruckNo, TransactionDate, CityName
// //       FROM TruckTransactionMaster
// //       WHERE TruckNo IS NOT NULL AND Completed = 0
// //       ORDER BY TransactionDate DESC
// //     `);

// //     res.json(result.recordset);
// //   } catch (err) {
// //     console.error("Error fetching truck transactions:", err);
// //     res.status(500).json({ error: "Failed to fetch truck data" });
// //   }
// // });
// app.get("/api/truck-find", async (req, res) => {
//   try {
//     const request = new sql.Request();
//     const result = await request.query(`
//       SELECT TruckNo, TransactionDate, CityName
//       FROM TruckTransactionMaster
//       WHERE TruckNo IS NOT NULL AND Completed = 0
//       ORDER BY TransactionDate DESC
//     `);

//     const formattedData = result.recordset.map((truck) => ({
//       truckno: truck.TruckNo,
//       transactiondate: truck.TransactionDate, // send as-is, no new Date()
//       cityname: truck.CityName,
//     }));

//     res.json(formattedData);
//   } catch (err) {
//     console.error("Error fetching truck transactions:", err);
//     res.status(500).json({ error: "Failed to fetch truck data" });
//   }
// });

// // Get Truck Transaction by Truck Number
// // app.get("/api/truck-transaction/:truckNo", async (req, res) => {
// //   let { truckNo } = req.params;
// //   truckNo = truckNo.trim().toLowerCase();

// //   try {
// //     // 1. Check if truck has pending check-in/out
// //     const pendingRequest = new sql.Request();
// //     pendingRequest.input('truckNo', sql.VarChar, truckNo);

// //     const pendingResult = await pendingRequest.query(`
// //       SELECT COUNT(*) as pending
// //       FROM TruckTransactionDetails d
// //       LEFT JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
// //       WHERE LOWER(LTRIM(RTRIM(m.TruckNo))) = @truckNo
// //       AND (d.CheckInStatus = 1 AND (d.CheckOutStatus = 0 OR d.CheckOutStatus IS NULL))
// //     `);

// //     if (parseInt(pendingResult.recordset[0].pending) > 0) {
// //       return res.json({
// //         alreadyInTransport: true,
// //         message: "Truck already in transport",
// //       });
// //     }

// //     // 2. Fetch Master Data
// //     const masterRequest = new sql.Request();
// //     masterRequest.input('truckNo', sql.VarChar, truckNo);

// //     const masterResult = await masterRequest.query(`
// //       SELECT TOP 1
// //         TransactionID, TruckNo, TransactionDate, CityName,
// //         Transporter, AmountPerTon, DeliverPoint,
// //         TruckWeight, Remarks
// //       FROM TruckTransactionMaster
// //       WHERE LOWER(LTRIM(RTRIM(TruckNo))) = @truckNo
// //       ORDER BY TransactionID DESC
// //     `);

// //     if (masterResult.recordset.length === 0) {
// //       return res.status(404).json({ message: "Truck not found" });
// //     }

// //     const masterData = masterResult.recordset[0];

// //     // 3. Fetch Details Data
// //     const detailRequest = new sql.Request();
// //     detailRequest.input('transactionId', sql.Int, masterData.TransactionID);

// //     const detailResult = await detailRequest.query(`
// //       SELECT
// //         d.PlantID,
// //         p.PlantName,
// //         d.LoadingSlipNo, d.Qty, d.Priority,
// //         d.Remarks, d.Freight
// //       FROM TruckTransactionDetails d
// //       LEFT JOIN PlantMaster p ON d.PlantID = p.PlantID
// //       WHERE d.TransactionID = @transactionId
// //     `);

// //     res.json({
// //       master: masterData,
// //       details: detailResult.recordset,
// //     });
// //   } catch (err) {
// //     console.error("❌ Error fetching truck details:", err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // });
// app.get("/api/truck-transaction/:truckNo", async (req, res) => {
//   const { truckNo } = req.params;
//   try {
//     const request = new sql.Request();
//     // Bind the parameter!
//     request.input("truckNo", sql.VarChar, truckNo);

//     // Query for master
//     const masterResult = await request.query(`
//        SELECT TOP 1 * FROM trucktransactionmaster
//   WHERE truckno = @truckNo AND completed = 0
//   ORDER BY transactionid DESC
//     `);
//     const master = masterResult.recordset[0];
//     if (!master) {
//       return res.status(404).json({ error: "Truck not found" });
//     }

//     // Query for details (new request for each query)
//     const detailsRequest = new sql.Request();
//     detailsRequest.input("transactionId", sql.Int, master.transactionid);
//     const detailsResult = await detailsRequest.query(`
//       SELECT d.*, p.plantname
//       FROM trucktransactiondetails d
//       LEFT JOIN plantmaster p ON d.plantid = p.plantid
//       WHERE d.transactionid = @transactionId
//     `);
//     const details = detailsResult.recordset;

//     res.json({ master, details });
//   } catch (err) {
//     console.error("Error fetching truck transaction:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });
// // Truck Schedule API
// app.get("/api/truck-schedule", async (req, res) => {
//   const { fromDate, toDate, status, plant } = req.query;

//   if (!fromDate || !toDate || !status || !plant) {
//     return res.status(400).json({ error: "Missing required filters" });
//   }

//   let plantArray = [];
//   try {
//     plantArray = JSON.parse(plant);
//   } catch (err) {
//     return res.status(400).json({ error: "Invalid plant format" });
//   }

//   if (!Array.isArray(plantArray) || plantArray.length === 0) {
//     return res.status(400).json({ error: "No plants selected" });
//   }

//   let statusCondition = "";
//   if (status === "Dispatched") {
//     statusCondition = "ttd.CheckInStatus = 0 AND ttd.CheckOutStatus = 0";
//   } else if (status === "InTransit") {
//     statusCondition =
//       "ttd.CheckInStatus = 1 AND (ttd.CheckOutStatus = 0 OR ttd.CheckOutStatus IS NULL)";
//   } else if (status === "CheckedOut") {
//     statusCondition = "ttd.CheckInStatus = 1 AND ttd.CheckOutStatus = 1";
//   } else if (status === "All") {
//     statusCondition = "1=1";
//   } else {
//     return res.status(400).json({ error: "Invalid status filter" });
//   }

//   try {
//     const request = new sql.Request();
//     request.input("fromDate", sql.Date, fromDate);
//     request.input("toDate", sql.Date, toDate);

//     // Add plant IDs as parameters
//     plantArray.forEach((plantId, index) => {
//       request.input(`plantId${index}`, sql.Int, plantId);
//     });

//     const placeholders = plantArray
//       .map((_, index) => `@plantId${index}`)
//       .join(",");

//     const query = `
//       SELECT 
//         ttm.TruckNo AS truckNo,
//         ttm.TransactionDate AS transactionDate,
//         p.PlantName AS plantName,
//         ttd.CheckInTime AS checkInTime,
//         ttd.CheckOutTime AS checkOutTime,
//         ttd.LoadingSlipNo AS loadingSlipNo,
//         ttd.Qty AS qty,
//         ttd.Freight AS freight,
//         ttd.Priority AS priority,
//         ttd.Remarks AS remarks
//       FROM TruckTransactionDetails ttd
//       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//       WHERE ttd.PlantID IN (${placeholders})
//         AND CAST(ttm.TransactionDate AS DATE) BETWEEN @fromDate AND @toDate
//         AND ${statusCondition}
//       ORDER BY ttm.TransactionDate DESC
//     `;

//     const result = await request.query(query);
//     res.json(result.recordset);
//   } catch (err) {
//     console.error("Error fetching truck schedule:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });






// app.delete('/api/truck-transaction/detail/:detailId', async (req, res) => {
//   const { detailId } = req.params;
//   try {
//     const pool = await sql.connect(config); // your MSSQL config
//     const result = await pool.request()
//       .input('detailId', sql.Int, parseInt(detailId))
//       .query('DELETE FROM TruckTransactionDetails WHERE detailid = @detailId');
//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({ message: 'Detail not found' });
//     }
//     res.json({ success: true });
//   } catch (err) {
//     console.error('Delete error:', err); // <--- Check this log in your backend console!
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
// // 🚀 Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });



///////////////////////////////////////////////////// Start Server /////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
