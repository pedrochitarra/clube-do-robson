"""Gera data/clubedorobson.sqlite a partir do banco único do clubedorobson-py.

O banco de referência é ../clubedorobson-py/data/raw/clubedorobson.db (tabelas em inglês).
Aqui só se renomeiam as tabelas para os nomes que os models Sequelize esperam e se
apontam as fotos dos Robsoners para front-end/public/players/<gamertag>.png.

Uso: python scripts/build_sqlite.py [caminho/do/clubedorobson.db]
"""
import os
import shutil
import sqlite3
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '..', 'clubedorobson-py', 'data', 'raw', 'clubedorobson.db')
OUT = os.path.join(ROOT, 'data', 'clubedorobson.sqlite')
PLAYERS = os.path.join(ROOT, 'front-end', 'public', 'players')

TABELAS = {
    'Clubs': 'Clubes',
    'Players': 'Membros',
    'Matches': 'Partidas',
    'ClubsMatches': 'ClubesPartidas',
    'PlayersMatches': 'MembrosPartidas',
    'Stadiums': 'Estadios',
    # Robsoners e Seasonals têm o mesmo nome nas duas versões
}

os.makedirs(os.path.dirname(OUT), exist_ok=True)
shutil.copyfile(SRC, OUT)
con = sqlite3.connect(OUT)
with con:
    for de, para in TABELAS.items():
        con.execute(f'ALTER TABLE "{de}" RENAME TO "{para}"')
    for (name,) in con.execute('SELECT name FROM "Robsoners"').fetchall():
        if os.path.exists(os.path.join(PLAYERS, f'{name}.png')):
            con.execute('UPDATE "Robsoners" SET face = ? WHERE name = ?', (f'/players/{name}.png', name))

for (t,) in con.execute("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"):
    print(con.execute(f'SELECT count(*) FROM "{t}"').fetchone()[0], t)
con.close()
