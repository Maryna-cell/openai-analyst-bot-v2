<<<<<<< HEAD
import puppeteer, { Browser } from 'puppeteer';

// Интерфейс для детальных оценок по темам
export interface TopicScore {
    topic: string; // Название грамматической темы
    score: string; // Процент или оценка
}

// Интерфейс для полного результата скрапинга
export interface ScrapeResult {
    email: string;
    score: string; // Общая оценка
    detailedScores: TopicScore[]; // Новый массив детальных оценок
}

/**
 * Выполняет скрапинг HTML-страницы для извлечения email, общей оценки и детальных результатов по темам.
 * @param url - Путь к локальному HTML-файлу (или URL внешней страницы).
 * @returns Промис, который возвращает объект ScrapeResult.
 */
export async function scrapePage(url: string): Promise<ScrapeResult> {
    let browser: Browser | null = null;
    
    try {
        // Запуск headless-браузера
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Переход на страницу
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Выполнение логики скрапинга внутри контекста страницы
        const result = await page.evaluate(() => {
            const email = document.querySelector('.email')?.textContent?.trim() || 'N/A';
            const score = document.querySelector('.score')?.textContent?.trim() || 'N/A';

            // НОВАЯ ЛОГИКА: Сбор детальных результатов
            const detailedScores: TopicScore[] = [];
            
            // Ищем все элементы внутри блока #detailed-results с классом .topic-score-item
            document.querySelectorAll('#detailed-results .topic-score-item').forEach(el => {
                // Извлекаем название темы из атрибута data-topic
                const topic = el.getAttribute('data-topic') || 'Unknown Topic';
                // Извлекаем оценку из текстового содержимого элемента
                const score = el.textContent?.trim() || '0%';
                
                detailedScores.push({ topic, score });
            });

            // Возвращаем объект со всеми собранными данными
            return { email, score, detailedScores };
        });

        await browser.close();
        return result;

    } catch (error) {
        console.error("Scraping error:", error);
        if (browser) await browser.close();
        // Возвращаем пустые значения в случае ошибки, чтобы не сломать бота
        return { email: 'Error', score: 'Error', detailedScores: [] }; 
    }
}
=======
import puppeteer from 'puppeteer';
import { config } from './config';
import fs from 'fs';

export async function scrapeTestResults() {
  try {
    console.log('Открываю файл:', config.siteUrl); // <-- ✅ Проверим, что путь верный

    // Проверяем, существует ли локальный файл
    const localPath = config.siteUrl.replace('file://', '');
    if (!fs.existsSync(localPath)) {
      console.error('❌ Файл не найден:', localPath);
      return null; // Возвращаем null, чтобы бот не падал
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.siteUrl, { waitUntil: 'domcontentloaded' });

    // Пример извлечения данных
    const studentEmail = await page.$eval(config.selectors.studentEmail, el => el.textContent?.trim());
    const totalScore = await page.$eval(config.selectors.totalScore, el => el.textContent?.trim());

    await browser.close();

    return { studentEmail, totalScore };
  } catch (error) {
    console.error('Ошибка при скрапинге:', error);
    return null;
  }
}
>>>>>>> bb00d19428e698fbc2be16929c88669b66068bef
