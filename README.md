# Clube do Robson

Aplicativo contendo informações de partidas do modo Pro Clubs do FIFA21 relacionados ao Clube do Robson. Todas as informações são extraídas diretamente do servidor do jogo utilizando a API que fornece as informações sobre todos os clubes e partidas respectivas. Banco de dados para salvar o histórico total, pois no servidor do jogo ficam salvas apenas as últimas 5 partidas. 

Disponível em: https://clubedorobson.herokuapp.com/#/clubes/6703918

Back-end utilizando Node, front-end utilizando Vuejs, banco de dados Postgres e deploy na plataforma Heroku.

## Página principal do Clube
![clube](https://user-images.githubusercontent.com/31597278/110194553-85daf900-7e17-11eb-801a-8705d5ff27f3.JPG)

Nessa página estão presentes as informações gerais do clube, como número total de jogos e temporadas.

## Página de jogadores
![jogadores](https://user-images.githubusercontent.com/31597278/110194625-db170a80-7e17-11eb-8ddb-24b9c298c929.JPG)

Nessa página está presente a lista dos jogadores do time numa tabela, com informações resumidas e a possibilidade de ir para os detalhes de cada um.

### Página de detalhes de cada jogador
![jogador](https://user-images.githubusercontent.com/31597278/110194649-0994e580-7e18-11eb-90f5-46e5b77ad7ce.JPG)

Nessa página estão presentes os dados de habilidades de cada jogador e seu gráfico, bem como as estatísticas do jogador dentro do clube, como jogos e gols marcados.

## Página de partidas
![partidas](https://user-images.githubusercontent.com/31597278/110194672-377a2a00-7e18-11eb-9e1e-0e248d667653.JPG)

Nessa página está presente a tabela completa de partidas dividida por temporadas do clube, com informações resumidas do resultado de cada uma.

### Página da partida
![partida-1](https://user-images.githubusercontent.com/31597278/110194685-5f698d80-7e18-11eb-961f-a8cb295d4c77.JPG)
![partida-2](https://user-images.githubusercontent.com/31597278/110194690-61cbe780-7e18-11eb-8925-ce13bb735b9e.JPG)

Nessa página estão presentes as informações detalhadas da partida, como horário da partida e estatísticas de cada time.
