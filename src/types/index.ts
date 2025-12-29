// This is our main entry, think of it as a DB scehema

export type Category = 'Code' | 'Creative' | 'Productivity' | 'Email';

export interface Prompt {
    id: string;
    title: string;
    content: string;
    category: Category;
    tags: string[];
    createdAt: Date;
}

// This is a "Prop Type". It defines what the card component needs to receive
export interface PromptCardProps {
    prompt: Prompt;
    onCopy: (content: string) => void; // A function callback to handle copy action
    onDelete: (id: string) => void; // A function callback to handle delete action
}