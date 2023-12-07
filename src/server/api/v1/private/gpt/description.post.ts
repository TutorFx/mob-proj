import OpenAI from "openai";

import type { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useSchemas } from "~/composables/useSchemas";

const { gptDescription } = useSchemas;
type IgptDescription = z.infer<typeof gptDescription>;

export interface TextCompletion {
  warning: string;
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null | unknown; // Você pode ajustar o tipo de logprobs conforme necessário
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody<IgptDescription>(event);
  try {
    gptDescription.parse(body);
    const { name, description, price } = body;

    // Escreva uma descrição para meu produto 'hamburguer de costela' da loja 'Pizzaria da gatinha', esse produto custa 'R$20,00'

    const prompt = description
      ? `Melhore a seguinte descrição para meu produto '${name}', esse produto custa '${price}'. """${description}"""`
      : `Escreva em HTML uma descrição para meu produto '${name}', esse produto custa '${price}'.`;

    // Ask OpenAI for a streaming completion given the prompt

    return await $fetch<TextCompletion>(
      "https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt,
          temperature: 0.9,
          max_tokens: 512,
          top_p: 1.0,
          frequency_penalty: 0,
          presence_penalty: 0.6,
        }),
      },
    );
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, message } = error;
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${name} - ${message}`,
        }),
      );
    }
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        }),
      );
    }
  }
});
