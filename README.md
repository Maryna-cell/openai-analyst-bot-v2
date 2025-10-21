# 🤖 Exam Monitor (OpenAI Analyst Bot)

This Telegram bot is an automated tool designed for monitoring and analyzing student test results. Developed using **TypeScript** and **Node.js**, the project includes core functionality for interacting with the **Telegram API** and demonstrates a clear architecture for integrating advanced services like **OpenAI** for data analysis.

## ✨ Key Features

  * **Automated Monitoring:** The bot periodically checks a specified local HTML file (`test_pages/result.html`) for test completion and status updates.
  * **Data Extraction:** The **`scraper.ts`** module uses **DOM selectors** to reliably extract critical student data (email, total score, completion status) from the parsed results.
  * **OpenAI Integration (Functional Placeholder):** The **`analyst.ts`** module is structured to send extracted student performance data to the **OpenAI API** for generating detailed reports, identifying trends, or providing personalized teacher recommendations.
  * **Secure Notifications:** Sends timely, structured notifications regarding test completion and scores directly to a designated teacher's chat via Telegram.
  * **TypeScript Foundation:** Built with **TypeScript** to ensure strong typing, improved code maintainability, and fewer runtime errors.

-----

## ⚙️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Primary Language** | **TypeScript** | Ensures type safety and scalability. |
| **Runtime** | **Node.js** | Asynchronous server-side environment. |
| **Messaging API** | **Telegram API** | Handles real-time communication and notifications. |
| **Analytics Layer** | **OpenAI API** | Integration point for AI-driven data analysis (e.g., GPT models). |
| **Development Tools** | **`nodemon`**, **`dotenv`** | Live reloading for development and environment variable management. |

-----

## 🚀 Getting Started

*(Остальная часть этого раздела остается без изменений.)*

### 1\. Prerequisites

You must have **Node.js** and **npm** installed.

### 2\. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Maryna-cell/openai-analyst-bot-v2.git
cd openai-analyst-bot-v2
npm install
```

### 3\. Configuration

For the application to run, it requires API keys. You must create a file named **`.env`** in the project root to store these secrets.

> **Note:** The actual key values in `config.ts` are replaced with placeholders, as is standard practice for public repositories.

**`.env` Example:**

```env
# Get your Telegram bot token from BotFather
BOT_TOKEN=YOUR_REAL_TELEGRAM_BOT_TOKEN_HERE

# Get your OpenAI API Key
OPENAI_API_KEY=YOUR_REAL_OPENAI_KEY_HERE

# The chat ID where the bot should send notifications
TEACHER_CHAT_ID=YOUR_TEACHER_CHAT_ID
```

### 4\. Build and Run

Since the project uses TypeScript, you need to compile it before execution.

```bash
# Build the TypeScript code (compiles .ts files to JavaScript in the 'dist' folder)
npm run build 

# Run the compiled application in development mode (if configured)
npm run dev 
# OR use the direct node command:
node dist/index.js
```

-----

## 📂 Project Structure (Updated)

The codebase is organized into logical modules to separate concerns:

```
/
├── dist/                    # Compiled JavaScript output
├── node_modules/            # Project dependencies
├── src/
│   ├── analyst.ts           # Module for integrating and analyzing data with OpenAI
│   ├── config.ts            # Application settings and API key placeholders
│   ├── index.ts             # Main application entry point (bootstrapping and setup)
│   ├── scraper.ts           # Module for extracting data from local HTML files
│   └── test_pages/
│       └── result.html      # Local file used as the source for test data (mock data)
├── .gitignore               # Specifies files/folders to exclude from Git 
├── package.json             # Project metadata and scripts
└── tsconfig.json            # TypeScript compiler configuration
```

-----

## ✍️ Contribution & Contact

**Author:** Maryna Samonenko

**GitHub Profile:** [Maryna-cell](https://www.google.com/search?q=https://github.com/Maryna-cell)

Feel free to contact me regarding this project.
