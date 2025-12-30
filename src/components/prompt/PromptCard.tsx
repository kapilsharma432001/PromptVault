import React from 'react'
import { PromptCardProps } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react"; // npm install lucide-react if needed


export function PromptCard({prompt, onCopy , onDelete}: PromptCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">
          {prompt.title}
        </CardTitle>
        <Badge variant="outline">{prompt.category}</Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-3">
          {prompt.content}
        </p>
        <div className="mt-4 flex gap-2 flex-wrap">
          {prompt.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onDelete(prompt.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
        <Button size="sm" onClick={() => onCopy(prompt.content)}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
      </CardFooter>

    </Card>
  )
}
