import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIContent(
  prompt: string,
  options: { useSearch?: boolean; model?: string } = {}
) {
  const { useSearch = false, model = "gemini-3.1-pro-preview" } = options;

  const config: any = {
    systemInstruction:
      "你是一个顶尖的AI教育专家和行业分析师。请用专业、清晰、易懂的中文回答。对于资讯和趋势类问题，请确保信息是最新的。请使用 Markdown 格式输出，适当使用标题、列表和加粗来组织内容。",
  };

  if (useSearch) {
    config.tools = [{ googleSearch: {} }];
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });
    return response.text || "未能生成内容，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("获取内容失败，请检查网络或API配置。");
  }
}
