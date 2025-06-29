// server/utils/db.ts
import mysql from 'mysql2/promise';

// สร้าง Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // กำหนดจำนวน connection สูงสุดใน pool
  queueLimit: 0 // กำหนด queue limit (0 คือไม่จำกัด)
});

export const getConnection = async () => {
  return pool.getConnection(); // ดึง connection จาก pool
};

// Optional: สำหรับปิด pool เมื่อ server ปิดตัวลง (อาจต้องใช้ในบางสถานการณ์)
// process.on('exit', () => {
//   pool.end();
//   console.log('MySQL connection pool closed.');
// });