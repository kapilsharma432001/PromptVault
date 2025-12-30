import {generateText} from 'ai';
import {openai} from '@ai-sdk/openai';

export async function POST(req: Request) {
    try{
        const { text } = await req.json();

        // input validation
        if (!text || text.length < 5){
            return Response.json({error: "Text is too short !"}, {status: 400});
        }

        // AI call
        const apiKey = process.env.OPENAI_API_KEY;
        let polishedText = '';

        if(apiKey){
            // real ai mode
            const { text: response } = await generateText({
                model: openai('gpt-4o'),
                system: "You are an expert prompt engineer. Your sole task is to rewrite the user's input to be a more effective and detailed prompt. Directly return only the rewritten prompt, with no additional commentary, greetings, or explanations.",
                prompt: `Please rewrite the following prompt: "${text}"`,
              });
              polishedText = response;
            } else {
            // mock mode
            await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
            polishedText = `[AI POLISHED]: ${text} \n\n (Note: Add OPENAI_API_KEY to .env to get real AI responses)`;
            }

            // return response
            return Response.json({ polishedText }, { status: 200 });
        } catch (error) {
            return Response.json({'error': 'Internal server errror'}, { status: 500 });
    }
}