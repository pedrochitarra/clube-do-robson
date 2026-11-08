"""Snapshot do banco único (clubedorobson-py) em JSON para o front estático (GitHub Pages).

    python scripts/export_snapshot.py

Gera front-end/public/data/clubedorobson.json com as tabelas usadas pelo front
(Players só do Clube do Robson). Rodar de novo sempre que o banco do Python mudar.
"""
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB = ROOT.parent / "clubedorobson-py" / "data" / "raw" / "clubedorobson.db"
OUT = ROOT / "front-end" / "public" / "data" / "clubedorobson.json"
CLUB_ID = 6703918
TABLES = ["Clubs", "Seasonals", "Robsoners", "Players", "Matches", "ClubsMatches", "PlayersMatches", "Stadiums"]

con = sqlite3.connect(DB)
con.row_factory = sqlite3.Row
snap = {}
for t in TABLES:
    rows = [dict(r) for r in con.execute(f'SELECT * FROM "{t}"')]
    if t == "Players":
        rows = [r for r in rows if str(r["clubid"]) == str(CLUB_ID)]
    snap[t] = rows
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(snap, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(OUT, {t: len(v) for t, v in snap.items()}, f"{OUT.stat().st_size / 1e6:.1f} MB")
