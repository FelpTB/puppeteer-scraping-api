# API de Web Scraping com Puppeteer

API Node.js para realizar web scraping utilizando Puppeteer, com suporte a bypass de proteções Cloudflare e autenticação via token.

## 🚀 Funcionalidades

- Web scraping com Puppeteer
- Bypass de proteção Cloudflare
- Autenticação via token
- CORS habilitado
- Health check endpoint
- Documentação automática de endpoints
- Suporte a Docker

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Google Chrome (para desenvolvimento local)
- Docker (opcional, para containerização)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=8001
NODE_ENV=development
API_TOKEN=seu_token_aqui
```

## 🚀 Executando a aplicação

### Desenvolvimento Local

1. Inicie o servidor:
```bash
npm start
```

2. A API estará disponível em `http://localhost:8001`

### Usando Docker

1. Construa a imagem:
```bash
docker build -t puppeteer-scraping-api .
```

2. Execute o container:
```bash
docker run -p 8001:8001 -e API_TOKEN=seu_token_aqui puppeteer-scraping-api
```

## 📚 Documentação da API

### Endpoints

#### GET /
Retorna informações sobre a API.
```bash
curl http://localhost:8001/
```

#### GET /health
Verifica o status da API.
```bash
curl http://localhost:8001/health
```

#### POST /scrape
Realiza o scraping de uma URL.

**Headers necessários:**
```
Authorization: Bearer seu_token_aqui
Content-Type: application/json
```

**Body:**
```json
{
    "url": "https://exemplo.com"
}
```

**Exemplo de uso:**
```bash
curl -X POST http://localhost:8001/scrape \
  -H "Authorization: Bearer seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://exemplo.com"}'
```

## 🧪 Testando a API

### Usando PowerShell

1. Execute o script de testes:
```powershell
.\test-api.ps1
```

O script testará todos os endpoints e mostrará os resultados formatados.

### Testando endpoints específicos

Você pode testar endpoints específicos usando as funções do script:

```powershell
# Testar rota raiz
Test-RootEndpoint

# Testar health check
Test-HealthCheck

# Testar scraping
Test-Scraping -url "https://exemplo.com"
```

## 🔒 Segurança

- A API requer autenticação via token
- O token deve ser configurado através da variável de ambiente `API_TOKEN`
- Em ambiente de desenvolvimento, um token padrão '123' é utilizado
- Em produção, sempre use um token forte e único

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de conexão com o servidor**
   - Verifique se o servidor está rodando
   - Confirme se a porta 8001 está disponível

2. **Erro de autenticação**
   - Verifique se o token está correto
   - Confirme se o header Authorization está sendo enviado

3. **Erro no scraping**
   - Verifique se a URL está acessível
   - Confirme se o site não tem proteções adicionais

## 📝 Notas de Desenvolvimento

- O projeto utiliza Puppeteer para web scraping
- Implementa bypass de proteção Cloudflare
- Suporta CORS para integração com frontends
- Inclui tratamento de erros robusto
- Logs detalhados para debugging

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 