"use client"; // This runs in the browser and not on the server

import { useState } from "react"
import { Prompt, Category } from "@/types";
import { PromptCard } from "./PromptCard";

// MOCK DATA - In a real app, this would come from a backend or database

const INITIAL_DATA: Prompt[] = [
    {
        id: "1",
        title: "SQL Optimizer",
        content: "Optimize this PostgreSQL query for better performance using indexing strategies...",
        category: "Code",
        tags: ["sql", "postgres", "performance"],
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Cold Email Generator",
        content: "Write a cold email to a CTO pitching an AI-driven backend solution...",
        category: "Email",
        tags: ["sales", "marketing"],
        createdAt: new Date(),
      },
];

export function PromptDashboard() {
    // THE STATE (The "In-Memory DB")
    // [variable, functionToUpdateVariable] = useState(initialValue)
    const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_DATA);

    // Business logic to delete
    // Delete from prompts where id = ?
    const handleDelete = (id: string) => {
        // We create a new arrray excluding the item with that ID.
        // React logic: never mutate state directly, always create a new copy
        const newPrompts = prompts.filter((p) => p.id != id);
        setPrompts(newPrompts); // Trigger a re-render (UI update)
    };

    // Business logic to copy
    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        alert("Copied to clipboard!"); // Simple feedback
    };

    // The view
    return (
        <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">PromptVault</h1>
        <p className="text-gray-500">Manage and store your best AI commands.</p>
      </div>

        {/* THE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}        // Unique Key is required for Lists (React internal index)
            prompt={prompt}        // Passing Data
            onCopy={handleCopy}    // Passing the Function "Down"
            onDelete={handleDelete}// Passing the Function "Down"
          />
        ))}

    {prompts.length === 0 && (
          <div className="text-center col-span-2 text-gray-500 py-10">
            No prompts found. Add one to get started!
          </div>
        )}
    </div>
    </div>
    );
}
