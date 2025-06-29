import { Level } from '../models/department';
import { getConnection } from '../utils/db';

export const levelRepository = {
  async findAll(): Promise<Level[]> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM levels ORDER BY levelid DESC');
      return rows as Level[];
    } finally {
      connection.release();
    }
  },

  async findActive(): Promise<Level[]> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM levels WHERE active = 1 ORDER BY levelid DESC');
      return rows as Level[];
    } finally {
      connection.release();
    }
  },

  async create(levelData: Level): Promise<Level> {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        `INSERT INTO levels (levelcode, levelname, linetokenaccess, fullqty, comeqty, active, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          levelData.levelcode,
          levelData.levelname,
          levelData.linetokenaccess,
          levelData.fullqty,
          levelData.comeqty,
          levelData.active
        ]
      );

      const insertResult = result as any;
      const newLevelId = insertResult.insertId;

      // ดึงข้อมูลที่เพิ่งสร้าง
      const [rows] = await connection.execute(
        'SELECT * FROM levels WHERE levelid = ?',
        [newLevelId]
      );

      const newLevel = (rows as Level[])[0];
      return newLevel;
    } finally {
      connection.release();
    }
  },

  async findById(levelid: number): Promise<Level | null> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM levels WHERE levelid = ?',
        [levelid]
      );
      const levels = rows as Level[];
      return levels.length > 0 ? levels[0] : null;
    } finally {
      connection.release();
    }
  },

  async findByCode(levelcode: string): Promise<Level | null> {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM levels WHERE levelcode = ?',
        [levelcode]
      );
      const levels = rows as Level[];
      return levels.length > 0 ? levels[0] : null;
    } finally {
      connection.release();
    }
  },

  async update(levelid: number, levelData: Partial<Level>): Promise<Level | null> {
    const connection = await getConnection();
    try {
      const updateFields = [];
      const updateValues = [];

      if (levelData.levelcode !== undefined) {
        updateFields.push('levelcode = ?');
        updateValues.push(levelData.levelcode);
      }
      if (levelData.levelname !== undefined) {
        updateFields.push('levelname = ?');
        updateValues.push(levelData.levelname);
      }
      if (levelData.linetokenaccess !== undefined) {
        updateFields.push('linetokenaccess = ?');
        updateValues.push(levelData.linetokenaccess);
      }
      if (levelData.fullqty !== undefined) {
        updateFields.push('fullqty = ?');
        updateValues.push(levelData.fullqty);
      }
      if (levelData.comeqty !== undefined) {
        updateFields.push('comeqty = ?');
        updateValues.push(levelData.comeqty);
      }
      if (levelData.active !== undefined) {
        updateFields.push('active = ?');
        updateValues.push(levelData.active);
      }

      updateFields.push('updated_at = NOW()');
      updateValues.push(levelid);

      await connection.execute(
        `UPDATE levels SET ${updateFields.join(', ')} WHERE levelid = ?`,
        updateValues
      );

      return this.findById(levelid);
    } finally {
      connection.release();
    }
  },

  async delete(levelid: number): Promise<boolean> {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'DELETE FROM levels WHERE levelid = ?',
        [levelid]
      );
      const deleteResult = result as any;
      return deleteResult.affectedRows > 0;
    } finally {
      connection.release();
    }
  },

  async toggleActive(levelid: number): Promise<Level | null> {
    const connection = await getConnection();
    try {
      await connection.execute(
        'UPDATE levels SET active = NOT active, updated_at = NOW() WHERE levelid = ?',
        [levelid]
      );
      return this.findById(levelid);
    } finally {
      connection.release();
    }
  }
};

export default levelRepository; 