import * as SQLite from 'expo-sqlite';

// SQLite.deleteDatabaseAsync('jogoCadastro.db');
export const db = SQLite.openDatabaseSync('jogoCadastro.db');

export function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS jogos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      conquistas INTEGER NOT NULL,
      porcentagemConclusao INTEGER NOT NULL,
      tempoJogo INTEGER NOT NULL
    );
  `);
}