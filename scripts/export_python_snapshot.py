import json
import sqlite3
from pathlib import Path

SOURCE = Path(r'C:\Users\pedro\projects\clubedorobson-py\data\raw\clubedorobson.db')
TARGET = Path(__file__).resolve().parents[1] / 'front-end' / 'public' / 'data' / 'clubedorobson.json'
TABLES = ('Clubs', 'ClubsMatches', 'Matches', 'Players', 'PlayersMatches', 'Robsoners', 'Seasonals', 'Stadiums')


def main():
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(SOURCE) as connection:
        snapshot = {}
        for table in TABLES:
            rows = connection.execute(f'SELECT * FROM "{table}"').fetchall()
            columns = [row[1] for row in connection.execute(f'PRAGMA table_info("{table}")')]
            snapshot[table] = [dict(zip(columns, row)) for row in rows]
    TARGET.write_text(json.dumps(snapshot, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'Exportadas {sum(len(rows) for rows in snapshot.values())} linhas para {TARGET}')


if __name__ == '__main__':
    main()
