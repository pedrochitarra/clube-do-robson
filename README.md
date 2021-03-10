# Clube do Robson

O jogo FIFA21 possui um modo chamado Pro Clubs, em que cada jogador cria um jogador virtual e o controla durante as partidas. A intenção do modo é simular a participação individual em uma partida de futebol, podendo chegar à situação de 11 x 11 jogadores. Assim como em todas as ligas da vida real, o modo possui divisões (no caso 10) e cada uma possui uma pontuação mínima para subir para não ser rebaixado e outra para progredir para a superior.

A EA Sports, desenvolvedora do jogo, disponibiliza no seu servidor diversas informações sobre todos os times criados no modo, bem como de todos os jogadores criados. As informações são coletadas via chamadas API e manipuladas em objetos JSON. Tendo isso em vista, a ideia desse aplicativo/site hospedado na nuvem é extrair as informações do clube que jogo, salvá-las em um banco de dados e exibi-las no navegador para desenvolver habilidades de programação e acompanhar o desempenho do time.

A API fornece somente informações das últimas 5 partidas, por isso cada vez que jogo é rodado um CRON para fazer as requisições e salvar no banco de dados fornecido gratuitamente pelo Heroku, plataforma utilizada para hospedar a aplicação. Com isso, tendo as respostas da requisição, os dados são salvos em tabelas do banco, criado com Postgres. O servidor Node com Express é responsável por fornecer as rotas e chamadas API que o front-end irá utilizar para exibir os dados.

O front-end foi criado utilizando Vuejs, pela facilidade de criação de componentes e familiaridade com a ferramenta. Há 3 principais categorias de informações, sendo elas Clube, Jogadores e Partidas, sendo a divisão estrutural das rotas e componentes do Vue. Alguns exemplos da aplicação estão abaixo para demonstração, mas a qualquer momento o site pode ser visitado.

Disponível em: https://clubedorobson.herokuapp.com/#/clubes/6703918

## Página principal do Clube
![clube](https://user-images.githubusercontent.com/31597278/110321372-5a5f3680-7ff0-11eb-9a03-6f2d5ab67f2c.JPG)

Nessa página estão presentes as informações gerais do clube, como número total de jogos e temporadas

## Página de jogadores
![membros](https://user-images.githubusercontent.com/31597278/110321905-14ef3900-7ff1-11eb-9808-e51b942b46df.JPG)

Nessa página está presente a lista dos jogadores do time numa tabela, com informações resumidas e a possibilidade de ir para os detalhes de cada um.

### Página de detalhes de cada jogador
![membro](https://user-images.githubusercontent.com/31597278/110321405-63e89e80-7ff0-11eb-8095-d2d8b2ce8a66.JPG)

Nessa página estão presentes os dados de habilidades de cada jogador e seu gráfico, bem como as estatísticas do jogador dentro do clube, como jogos e gols marcados.

## Página de partidas
![partidas](https://user-images.githubusercontent.com/31597278/110321658-c17ceb00-7ff0-11eb-9123-8e1804a603bd.JPG)

Nessa página está presente a tabela completa de partidas dividida por temporadas do clube, com informações resumidas do resultado de cada uma.

### Página da partida
![partida](https://user-images.githubusercontent.com/31597278/110321439-6fd46080-7ff0-11eb-891a-28bb8f3730b7.JPG)


Nessa página estão presentes as informações detalhadas da partida, como horário da partida e estatísticas de cada time.
