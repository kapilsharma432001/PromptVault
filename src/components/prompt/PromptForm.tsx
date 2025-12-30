"use client";

import { useState } from "react";
import { Category } from "@/types"; // Import our Enum
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Wand2, Loader2 } from "lucide-react"; // Icons for magic and loading


// PROPS: What does this form need from the parent?
// It needs a function to call when a user clicks on save

interface PromptFormProps {
    onAddPrompt: (title: string, content: string, category: Category, tags: string[]) => void;
}

export function PromptForm({onAddPrompt}: PromptFormProps) {
    // 1. LOCAL STATE (Temporary storage while user types)
  const [open, setOpen] = useState(false); // Is the modal open?
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("Code");
  const [tagInput, setTagInput] = useState("");
  const [isPolishing, setIsPolishing] = useState(false); // Loading state for AI polishing

  // Form submission logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stop the browser from refreshing the page (Classic Backend behavior)
    
    // Convert generic string "tag1, tag2" into an array ["tag1", "tag2"]
    const tagsArray = tagInput.split(",").map(tag => tag.trim()).filter(t => t.length > 0);

    // Call the PARENT function with the data
    onAddPrompt(title, content, category, tagsArray);

    // Reset the form and close the modal
    setTitle("");
    setContent("");
    setTagInput("");
    setOpen(false);
  };

  const handlePolish = async () => {

    if (!content) return;
    
    setIsPolishing(true);
    try {
        const response = await fetch('/api/polish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: content }),
        });
        const data = await response.json();

        if (data.polishedText) {
            setContent(data.polishedText); // update the text biox with AI result
        }
    } catch (error) {
        console.error("Error polishing prompt:", error);
        alert("Something went wrong with the AI.");
    }finally {
        setIsPolishing(false); // stop loading spinner
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

        {/* TRIGGER BUTTON */}
        <DialogTrigger asChild>
            <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Prompt
            
            </Button>
        </DialogTrigger>

        {/* THE MODAL CONTENT */}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          {/* TITLE INPUT */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            {/* CONTROLLED INPUT: We force value to be {title} and update it on every keystroke */}
            <Input 
              id="title" 
              placeholder="e.g. SQL Optimizer" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          {/* CATEGORY SELECT (Simple Native Select for now) */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
            >
                <option value="Code">Code</option>
                <option value="Creative">Creative</option>
                <option value="Productivity">Productivity</option>
                <option value="Email">Email</option>
            </select>
          </div>

          {/* CONTENT TEXTAREA */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
                    <Button 
                        type="button" // Important: preventing it from submitting the form
                        variant="outline" 
                        size="sm"
                        onClick={handlePolish}
                        disabled={isPolishing || !content}
                        className="text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                    >
                        {isPolishing ? (
                            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        ) : (
                            <Wand2 className="w-3 h-3 mr-2" />
                        )}
                        {isPolishing ? "Polishing..." : "AI Polish"}
                    </Button>
                </div>
            <Label htmlFor="content">Prompt Content</Label>
            <Textarea 
              id="content" 
              placeholder="Paste your prompt here..." 
              value={content}
              onChange={(e) => setContent(e.target.value)} 
              required
            />
          </div>

          {/* TAGS INPUT */}
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              placeholder="sql, postgres, db" 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)} 
            />
          </div>

          <Button type="submit">Save Prompt</Button>
        </form>
      </DialogContent>
        
        </Dialog>
)

}