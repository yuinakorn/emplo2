// server/api/db-test.ts
import { defineEventHandler } from 'h3'
import mysql from 'mysql2/promise'; // ใช้เวอร์ชัน promise เพื่อให้ทำงานกับ async/await ได้ง่าย

export default defineEventHandler(async (event) => {
  let connection;
  try {
    // สร้าง Connection Pool (แนะนำสำหรับการใช้งานจริง)
    // หรือจะสร้าง connection ตรงๆ ก็ได้สำหรับการทดสอบเบื้องต้น
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'), // ต้องแปลงเป็นตัวเลข
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // ลอง Query ข้อมูลเล็กๆ น้อยๆ เพื่อทดสอบ
    // ตัวอย่าง: ดึงข้อมูลเวอร์ชันของ MySQL
    const [rows] = await connection.execute('SELECT VERSION() as version');
    const mysqlVersion = (rows as any[])[0].version;

    return {
      status: 'success',
      message: 'Connected to MySQL successfully!',
      mysqlVersion: mysqlVersion,
    };

  } catch (error: any) {
    // หากเกิดข้อผิดพลาดในการเชื่อมต่อ
    console.error('Database connection error:', error);
    return {
      status: 'error',
      message: 'Failed to connect to database or execute query.',
      error: error.message,
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});