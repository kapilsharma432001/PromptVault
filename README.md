# PromptVault 🧠

PromptVault is a personal library for managing, categorizing, and refining AI prompts. It features a modern, responsive UI and integrates with OpenAI to automatically "polish" raw prompts into professional requests. Created this project to learn front-end engineering (because I am more of a backend developer).

**Live Demo:** [Insert your Vercel URL here]

## 🚀 Tech Stack

This project uses a modern "AI Engineer" stack focused on speed and type safety:

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router) - Handles both Frontend and Backend API.
* **Language:** [TypeScript](https://www.typescriptlang.org/) - Ensures strict typing for data models.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling.
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Accessible, pre-built components (Radix UI + Tailwind).
* **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) - Standard library for AI/LLM text generation.
* **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Features

1.  **CRUD Operations:** Create, Read, and Delete prompts.
2.  **Local Persistence:** Data is saved to the browser's `localStorage`, persisting across page reloads.
3.  **AI Polish:** A "Magic Wand" feature that sends raw text to an internal API (`/api/polish`), utilizing OpenAI (or a mock provider) to rewrite and improve the prompt.
4.  **Responsive Grid:** Built with CSS Grid to work on mobile and desktop.
5.  **Copy to Clipboard:** One-click copying for quick usage.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed.
- (Optional) An OpenAI API Key for the "Polish" feature.

### Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/kapilsharma432001/PromptVault.git](https://github.com/kapilsharma432001/PromptVault.git)
    cd prompt-vault
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```bash
    OPENAI_API_KEY=sk-your-openai-key-here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.
