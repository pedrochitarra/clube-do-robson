# CLAUDE.md

Clube do Robson — site de estatísticas de um clube de Pro Clubs (FIFA 21, PS4, clubId `6703918`). Coleta dados da API da EA, salva em Postgres e exibe num front Vue. Último commit: mar/2021; estava no Heroku (`clubedorobson.herokuapp.com`).

## Stack
- **Back-end**: Node + Express 4 (`index.js`), Sequelize 6 + Postgres. `package.json` pede Node 12, `.nvmrc` 14.3 (máquina atual: Node 24).
- **Coleta**: `schedule.js` (processo `clock` no `Procfile`) — node-cron a cada 10 min chama a API da EA e faz `upsert` no banco.
- **Front-end**: `front-end/` Vue 2 + Vuetify + bootstrap-vue + chart.js. `npm run build` gera em `../app/views`, que o Express serve como estático (build commitado).

## Rodar
```
npm install                      # raiz
cd front-end && npm install
npm start                        # nodemon index.js (porta $PORT ou 5500)
node schedule.js                 # coletor
cd front-end && npm run serve    # dev do front
```
Banco: `config/config.js` usa Postgres se `.env` tiver `database`/`host` (+`username`/`password`, porta 5432, SSL); senão usa SQLite em `data/clubedorobson.sqlite` (ou `SQLITE_PATH`). **Banco único**: a fonte é `../clubedorobson-py/data/raw/clubedorobson.db`; este projeto só gera uma cópia com as tabelas renomeadas para os nomes dos models:
```
python scripts/build_sqlite.py
```
Correções de dados vão no banco do clubedorobson-py, nunca aqui. `scripts/dump_to_sqlite.py` reconstrói do `dump_original.sql` (backup de 24/02/2021) e fica só como referência.
`data/` está no `.gitignore`. `sqlite3` é dependência nativa: no npm 11+ precisa de `npm install-scripts approve sqlite3`. `config/config.json` é para o sequelize-cli e usa `DATABASE_URL`.
Front usa `baseURL: '/api'` (relativo, `front-end/src/http-common.js`); em `npm run serve` o proxy do `vue.config.js` manda `/api` para `localhost:5500`. Build no Node 24: `NODE_OPTIONS=--openssl-legacy-provider npm run build` (webpack 4).

## Estrutura
- `app/models/` — Sequelize, carregados por `index.js`. Tabelas: `Clubes`, `Membros` (PK = nome do jogador), `Partidas`, `ClubesPartidas` (stats do clube por partida, PK `matchId+clubId`), `MembrosPartidas` (PK `playername+matchId`), `Seasonal` (PK clubid), `Robsoners` (cadastro manual dos membros do clube), `Estadios`.
- `app/controllers/` + `app/routes/` — um par por recurso, montados em `/api/<recurso>` (`clubes`, `clubesPartidas`, `membros`, `membrosPartidas`, `partidas`, `robsoners`, `seasonals`, `stadiums`).
- `database/migrations/` — migrations do sequelize-cli (nem todas as tabelas têm migration: Seasonal, Robsoners, Estadios faltam).
- `common/logger.js` — tracer.
- `front-end/src/` — `router.js` (`/` redireciona para o Clube), `components/` (Clube, MembrosList, Membro, Partidas, Partida/*; RadarHex, Pizza e Slider estão sem uso), `services/` (wrappers axios por recurso), `utils/crest.js` (escudo local do clube).
- Visual: tema escuro único em `front-end/src/styles/theme.scss` (tokens CSS `--bg`, `--surface*`, `--gold`, `--win/--draw/--loss` e classes `.page`, `.card-x`, `.grid-*`, `.stat-big`, `.kv`, `.bar`), importado no `App.vue`. Componentes usam `<style scoped>` e os tokens; não redefinir cores nem `body`. Fontes Barlow Condensed (números/títulos) e Inter. Bootstrap CSS via CDN fixo em 4.6.2 (o bootstrap-vue não funciona com o 5).
- Imagens locais: `front-end/public/crests/<id>.png` (escudos, `scripts/download_crests.py`) e `front-end/public/players/<gamertag>.png` (fotos dos Robsoners, vindas do `clubedorobson-py/assets/players`).
- `public/`, `lib/tasks/`, `app.json` — sobras do template Heroku.

## API da EA usada (`schedule.js`)
Base `https://proclubs.ea.com/api/fifa/`, `platform=ps4`:
`clubs/info?clubIds=`, `members/stats?clubId=`, `clubs/matches?matchType=gameType9&clubIds=`, `clubs/seasonalStats?clubIds=`.
A API só devolve as últimas ~5 partidas — por isso o histórico depende do banco. Desde o FC 24 os endpoints mudaram (ver backlog).

## Problemas conhecidos (backlog)
- **Banco Heroku**: apagado. Único backup é o dump de 24/02/2021; o Heroku avisou 7.060 linhas em 14/03/2021, então ~2.7k linhas posteriores estão perdidas (busca exaustiva feita em nov/2026).
- **Credenciais vazadas**: a URL do Postgres foi removida de `config/config.js`, mas continua no histórico do GitHub (banco já não existe).
- Imagens externas mortas: estádios (CDN da EA, agora escondidas no erro) e avatares em `MembrosList.vue` (`funkyimg.com`).
- O nome do `El_Wandershow` é "Show" (o dump original dizia "Sins").
- `assets/squads` não tem imagem para todas as combinações de jogadores (`Partida.vue#getSquadImage` agora ignora as ausentes).
- `schedule.js`: `forEach(async ...)` sem await (upserts concorrentes/erros perdidos); muito código duplicado home/away; `updateSeasonal()` roda solto no topo; cron só chama `updateMatches`; `divswon*` hardcoded; clubId e plataforma hardcoded.
- Dependências de 2021 (Vue 2 EOL, axios 0.21, Node 12) e deps inúteis (`cool-ascii-faces`, `jquery`, `mysql2`, `logger`, `trace`).
- Endpoints/plataforma da EA desatualizados (FIFA 21/ps4).
- Sem testes (`npm test` aponta para `test.js` inexistente).

## Convenções
- Nomes de domínio em português (Clubes, Membros, Partidas), código em inglês/camelCase, ESLint standard (sem ponto e vírgula).
- Mantenha este arquivo atualizado ao mudar estrutura, rotas ou resolver itens do backlog.
