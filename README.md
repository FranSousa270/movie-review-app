# Movie Review App

Aplicação web desenvolvida em React que permite aos usuários explorar filmes, avaliar, escrever reviews e receber recomendações personalizadas por gênero, tudo isso sem necessidade de login.
O projeto consome a API do TMDB (The Movie Database) e utiliza conceitos modernos do React, como hooks, componentização, rotas e armazenamento local.

## Funcionalidades 

- Pesquisa de filmes em tempo real
- Avaliação de filmes (1 a 5 estrelas)
- Escrita e salvamento de reviews
- Página individual para cada filme
- Sistema de recomendação baseado nos gêneros mais bem avaliados pelo usuário
- Carrosséis com top rated, tendências da semana, recomendados
- Persistência de dados com localStorage

## Lógica de Recomendação
- As recomendações são geradas a partir das avaliações do usuário:
- O usuário avalia filmes e quanto maior a nota mais o filme e o gênero dele são levados em conta
- Os gêneros desses filmes são contabilizados
- Os gêneros mais frequentes são usados para buscar novos filmes via API
- Os filmes recomendados aparecem automaticamente na Home

## Tecnologias Utilizadas
- React
- Javascript
- Tailwind CSS
- Vite

## Próximas Melhorias 
- Integração com Firebase (Auth + Firestore)
- Histórico de avaliações por usuário
