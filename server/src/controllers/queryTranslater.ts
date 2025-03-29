import { GoogleGenerativeAI } from "@google/generative-ai";
const apikey = process.env.GEMINI_API_KEY!;
console.log("apikey", apikey);
const genAI = new GoogleGenerativeAI(apikey);

export class QueryTranslater {
  static async translateQuery(query: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are a SQL query generator for a sales database. 
      Convert the following natural language query into a precise SQL query.

      Database Schema:
      - product_name: Text (product name)
      - category: Text (product category)
      - quantity: Integer (units sold)
      - revenue: Decimal (total revenue)
      - sale_date: Date (when sale occurred the date of sales of laptops)
      - region: Text (sales region)
      - customer_segment: Text (customer type)

      Rules:
      - Generate a valid, executable SQL query
      - Use appropriate SQL functions
      - Handle aggregations, filtering, and sorting
      - Prioritize clarity and direct data retrieval
      - if used the word data just ignore it and focus on the main part

      Query: "${query}"
      respond properly if asked about 2 or more rows
      Respond ONLY with the SQL query. Do not include any additional text or explanation.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      if (
        !response ||
        !response.candidates ||
        response.candidates.length === 0
      ) {
        throw new Error("Invalid response from Gemini AI");
      }

      let sqlQuery =
        response.candidates[0]?.content?.parts?.[0]?.text?.trim() || "";

      sqlQuery = sqlQuery
        .replace(/```sql/g, "")
        .replace(/```/g, "")
        .trim();

      if (!sqlQuery.toLowerCase().startsWith("select")) {
        throw new Error("Generated query is not valid SQL.");
      }

      return sqlQuery;
    } catch (error) {
      console.error("Gemini Translation Error:", error);
      return null;
    }
  }

  static async explainQuery(query: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Return simulated query breakdown and Analyze the following query and return only the key details:
    "${query}"
    
    If applicable, provide:
    - The SQL translation
    - A concise explanation of its purpose`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const explanation = response.text().trim();

      return {
        query,
        explanation,
      };
    } catch (error) {
      console.error("Query Explanation Error:", error);
      return {
        query,
        explanation: "An error occurred while trying to explain the query.",
      };
    }
  }
}
