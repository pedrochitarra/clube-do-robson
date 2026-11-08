"""Baixa os escudos (CDN do FIFA 21) de todos os clubes do banco para front-end/public/crests.

A CDN da EA é de 2021 e pode sair do ar; com os arquivos locais o front não depende dela.
Uso: python scripts/download_crests.py [data/clubedorobson.sqlite]
"""
import os
import sqlite3
import sys
import urllib.request

CDN = ('https://fifa21.content.easports.com/fifa/fltOnlineAssets/'
       '05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l{}.png')
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, 'data', 'clubedorobson.sqlite')
out = os.path.join(root, 'front-end', 'public', 'crests')
os.makedirs(out, exist_ok=True)

con = sqlite3.connect(db)
# Mesma regra do front: clube customizado usa customcrestid, senão o teamId do time licenciado
ids = {str(crest) for (crest,) in con.execute(
    'SELECT CASE WHEN iscustomteam = 1 THEN customcrestid ELSE "teamId" END FROM "Clubes"')}

ok, missing = 0, []
for crest in sorted(ids):
    path = os.path.join(out, f'{crest}.png')
    if os.path.exists(path):
        ok += 1
        continue
    try:
        with urllib.request.urlopen(CDN.format(crest), timeout=20) as r:
            open(path, 'wb').write(r.read())
        ok += 1
    except Exception as e:
        missing.append(f'{crest} ({e})')

print(f'{ok}/{len(ids)} escudos em {out}')
for m in missing:
    print('faltando:', m)
