const axios = require('axios');

const API_URL = 'http://localhost:3000';

// Função para testar a rota raiz
async function testRoot() {
  try {
    console.log('\n=== Testando Rota Raiz ===');
    const response = await axios.get(`${API_URL}/`);
    console.log('Status:', response.status);
    console.log('Dados:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Erro na rota raiz:', error.message);
  }
}

// Função para testar a rota de health check
async function testHealth() {
  try {
    console.log('\n=== Testando Health Check ===');
    const response = await axios.get(`${API_URL}/health`);
    console.log('Status:', response.status);
    console.log('Dados:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Erro no health check:', error.message);
  }
}

// Função para testar a rota de scraping
async function testScrape() {
  try {
    console.log('\n=== Testando Scraping ===');
    const testUrl = 'https://www.google.com'; // URL de teste
    const response = await axios.post(`${API_URL}/scrape`, {
      url: testUrl
    });
    console.log('Status:', response.status);
    console.log('Resposta completa:', JSON.stringify({
      success: response.data.success,
      url: response.data.url,
      timestamp: response.data.timestamp,
      html_length: response.data.html.length,
      html_preview: response.data.html.substring(0, 100) + '...'
    }, null, 2));
  } catch (error) {
    console.error('Erro no scraping:', error.response?.data || error.message);
  }
}

// Função para testar erro de URL inválida
async function testInvalidUrl() {
  try {
    console.log('\n=== Testando URL Inválida ===');
    const response = await axios.post(`${API_URL}/scrape`, {});
    console.log('Status:', response.status);
    console.log('Dados:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('Status:', error.response?.status);
    console.log('Erro esperado:', JSON.stringify(error.response?.data, null, 2));
  }
}

// Função principal que executa todos os testes
async function runTests() {
  console.log('Iniciando testes da API...');
  
  await testRoot();
  await testHealth();
  await testScrape();
  await testInvalidUrl();
  
  console.log('\nTestes concluídos!');
}

// Executa os testes
runTests(); 