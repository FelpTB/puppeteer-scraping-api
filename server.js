const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

// Inicialização do Express
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middlewares
app.use(express.json()); // Permite receber JSON no body das requisições
app.use(cors()); // Permite requisições de diferentes origens

// Rota raiz - Mensagem de boas-vindas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à API de Web Scraping',
    version: '1.0.0',
    environment: NODE_ENV,
    endpoints: {
      root: 'GET /',
      health: 'GET /health',
      scrape: 'POST /scrape'
    }
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Rota principal de scraping
app.post('/scrape', async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ 
      error: 'URL é obrigatória',
      example: { url: 'https://exemplo.com' }
    });
  }

  console.log(`Iniciando scraping de: ${url}`);
  let browser;

  try {
    // Configuração do Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ]
    });

    const page = await browser.newPage();
    
    // Configurações para simular um navegador real
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Configurar timeout mais longo para o Cloudflare
    await page.setDefaultNavigationTimeout(120000);
    
    console.log('Navegando para a página...');
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 120000 
    });
    
    console.log('Aguardando Cloudflare...');
    await new Promise(resolve => setTimeout(resolve, 15000));

    // Verificar se o Cloudflare ainda está presente
    const cloudflarePresent = await page.evaluate(() => {
      return document.body.innerHTML.includes('cloudflare');
    });

    if (cloudflarePresent) {
      throw new Error('Proteção Cloudflare ainda ativa após timeout');
    }

    console.log('Extraindo HTML...');
    const html = await page.content();
    console.log('HTML extraído com sucesso');

    await browser.close();
    // Retornando o HTML dentro de um JSON
    res.json({
      success: true,
      url: url,
      html: html,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro durante o scraping:', error);
    if (browser) {
      await browser.close();
    }
    res.status(500).json({ 
      success: false,
      error: error.message,
      url: url,
      timestamp: new Date().toISOString()
    });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Ambiente:', NODE_ENV);
  console.log('Endpoints disponíveis:');
  console.log('- GET  /');
  console.log('- GET  /health');
  console.log('- POST /scrape');
});
