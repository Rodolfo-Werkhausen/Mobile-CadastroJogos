import { db, initDb } from './db';

initDb();

export function carregarJogos() {
  return db.getAllSync('SELECT * FROM jogos ORDER BY id DESC');
}

export function cadastrarJogo(nome, conquistas, porcentagemConclusao, tempoJogo) {
  db.runSync('INSERT INTO jogos (nome, conquistas, porcentagemConclusao, tempoJogo) VALUES (?, ?, ?, ?)', [nome, conquistas, porcentagemConclusao, tempoJogo]);
}

export function editarJogo(id, nome, conquistas, porcentagemConclusao, tempoJogo) {
  db.runSync('UPDATE jogos SET nome = ?, conquistas = ?, porcentagemConclusao = ?, tempoJogo = ? WHERE id = ?', [nome, conquistas, porcentagemConclusao, tempoJogo, id]);
}

export function excluirJogo(id) {
  db.runSync('DELETE FROM jogos WHERE id = ?', [id]);
}