"""Converte o pg_dump do Heroku (INSERTs) num banco SQLite local.

Uso: python scripts/dump_to_sqlite.py <dump.sql> <saida.sqlite>
"""
import os
import re
import sqlite3
import sys

dump_path, out_path = sys.argv[1], sys.argv[2]
sql = open(dump_path, encoding='utf-8').read()

# PKs vêm em ALTER TABLE separados no dump; SQLite precisa delas no CREATE
pks = dict(re.findall(
    r'ALTER TABLE ONLY public\.("?\w+"?)\s+ADD CONSTRAINT \S+ PRIMARY KEY \(([^)]+)\);', sql))

con = sqlite3.connect(out_path)
con.execute('PRAGMA journal_mode = OFF')

for table, body in re.findall(r'CREATE TABLE public\.("?\w+"?) \((.*?)\n\);', sql, re.S):
    body = body.replace('DEFAULT now()', 'DEFAULT CURRENT_TIMESTAMP')
    if table in pks:
        body += f',\n    PRIMARY KEY ({pks[table]})'
    con.execute(f'DROP TABLE IF EXISTS {table}')
    con.execute(f'CREATE TABLE {table} ({body})')

inserts = [line[len('INSERT INTO public.'):] for line in sql.splitlines()
           if line.startswith('INSERT INTO public.')]
with con:
    for stmt in inserts:
        con.execute('INSERT INTO ' + stmt)

# As fotos dos Robsoners apontavam para o funkyimg.com (fora do ar);
# agora ficam em front-end/public/players/<gamertag>.png
players_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'front-end', 'public', 'players')
with con:
    for (name,) in con.execute('SELECT name FROM "Robsoners"').fetchall():
        if os.path.exists(os.path.join(players_dir, f'{name}.png')):
            con.execute('UPDATE "Robsoners" SET face = ? WHERE name = ?', (f'/players/{name}.png', name))

for (name,) in con.execute("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"):
    print(con.execute(f'SELECT count(*) FROM "{name}"').fetchone()[0], name)
con.close()
