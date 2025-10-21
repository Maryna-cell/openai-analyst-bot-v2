import path from 'path';

export const config = {
  // --- Telegram Bot Token ---
  botToken: '', 
  
  // !!! Ключ OpenAI API KEY !!!
  openaiApiKey: '',

  // --- Остальные настройки ---
  teacherChatId: '1133556246',
  siteUrl: 'file://' + path.resolve(__dirname, 'test_pages/result.html'),
  selectors: {
    studentEmail: '.email',
    totalScore: '.score',
    testCompletedIndicator: '.test-completed'
  }
};