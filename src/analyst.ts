import OpenAI from 'openai';
import { config } from './config';

// Интерфейс для детальных оценок
export interface TopicScore {
    topic: string;
    score: string;
}

// 1. Инициализация клиента OpenAI
const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

/**
 * Отправляет детальные данные об оценке в OpenAI для получения персонализированной рекомендации.
 */
export async function getPersonalizedRecommendation(
    studentEmail: string,
    overallScore: string,
    detailedScores: TopicScore[]
): Promise<string> {
    
    const detailedList = detailedScores
        .map(item => `\n- ${item.topic}: ${item.score}`)
        .join('');

    const prompt = `
        Ты — опытный, дружелюбный преподаватель английского языка.
        Проанализируй результаты теста и дай студенту персональный совет.

        ---
        Email: ${studentEmail}
        Общая оценка: ${overallScore}
        Детальные результаты: ${detailedList}

        ---
        Правила:
        1. Если оценка < 50% — 4 занятия.
        2. Если 60–80% — 1 занятие.
        3. Если > 80% — похвали.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Ты — мотивирующий преподаватель английского языка." },
                { role: "user", content: prompt }
            ],
            temperature: 0.8,
            max_tokens: 300,
        });

        return response.choices[0].message?.content?.trim() || "AI не дал ответа.";
        
    } catch (error) {
        console.error("Ошибка при вызове OpenAI API:", error);
        return "Ошибка при получении рекомендации от AI.";
    }
}
