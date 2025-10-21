<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Telegraf, Context } from "telegraf";
import { config } from "./config";
import { getPersonalizedRecommendation, TopicScore } from "./analyst";
import * as cheerio from "cheerio";
import * as fs from "fs";

// Вывод пути для отладки
console.log("Loading file from:", config.siteUrl);

// Чтение содержимого result.html
const resultHtmlPath = config.siteUrl;
const htmlContent = fs.readFileSync(resultHtmlPath, "utf-8");
const $ = cheerio.load(htmlContent);
const studentEmail = $(".email").text().trim();
const overallScore = $(".score").text().trim();
const topicScores: TopicScore[] = $(".topic-score-item").map((i, el) => ({
  topic: $(el).attr("data-topic") || "",
  score: $(el).text().trim(),
})).get();

const bot = new Telegraf(config.botToken);

bot.start((ctx: Context) => ctx.reply("Привет! Я твой Telegram-бот с AI-рекомендациями. Напиши /recommend для анализа теста."));

bot.command("recommend", async (ctx: Context) => {
  try {
    const recommendation = await getPersonalizedRecommendation(studentEmail, overallScore, topicScores);
    await ctx.reply(recommendation);
  } catch (error) {
    console.error("Ошибка при обработке рекомендации:", error);
    await ctx.reply("Произошла ошибка при получении рекомендации.");
  }
});

bot.on("text", (ctx: Context) => {
  if (ctx.message && "text" in ctx.message) {
    ctx.reply(`Ты сказал: ${ctx.message.text}`);
  } else {
    ctx.reply("Я понимаю только текстовые сообщения.");
  }
});

bot.launch();
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
=======
import { Telegraf } from 'telegraf';
import { config } from './config';
import { scrapeTestResults } from './scraper';

const bot = new Telegraf(config.botToken);

bot.start((ctx) => ctx.reply('Привет! Я Monitoring Scraper. Используй /monitor для проверки тестов.'));

bot.command('monitor', async (ctx) => {
  ctx.reply('Начинаю мониторинг...');
  const results = await scrapeTestResults();  // Вызываем скрепер

  if (results) {
    const message = `Тест завершен!\nEmail студента: ${results.studentEmail}\nОбщий результат: ${results.totalScore}`;
    await bot.telegram.sendMessage(config.teacherChatId, message);  // Отправляем учителю
    ctx.reply('Уведомление отправлено учителю.');
  } else {
    ctx.reply('Не удалось получить данные.');
  }
});

bot.on('text', (ctx) => ctx.reply(`Ты сказал: ${ctx.message.text}`));  // Оставляем эхо для теста

bot.launch();
console.log('Бот запущен');

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
>>>>>>> bb00d19428e698fbc2be16929c88669b66068bef
