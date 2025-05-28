# API de Web Scraping com Puppeteer

API para realizar web scraping de páginas web usando Puppeteer e Node.js.

## Funcionalidades

- Scraping de páginas web
- Suporte a páginas com proteção Cloudflare
- Resposta em formato JSON
- CORS habilitado

## Endpoints

- `GET /`: Informações da API
- `GET /health`: Verificação de saúde da API
- `POST /scrape`: Realiza o scraping de uma URL

## Exemplo de Uso

```javascript
// Exemplo de requisição para o endpoint /scrape
const response = await axios.post('http://localhost:3000/scrape', {
  url: 'https://exemplo.com'
});

// Resposta
{
  "success": true,
  "url": "https://exemplo.com",
  "html": "<!DOCTYPE html>...",
  "timestamp": "2024-02-28T12:00:00.000Z"
}
```

## Requisitos

- Node.js >= 18.0.0
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/puppeteer-scraping-api.git
cd puppeteer-scraping-api
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

## Desenvolvimento

Para rodar em modo de desenvolvimento:
```bash
npm run dev
```

## Docker

Para rodar com Docker:
```bash
docker build -t puppeteer-scraping-api .
docker run -p 3000:3000 puppeteer-scraping-api
```

## Licença

ISC 