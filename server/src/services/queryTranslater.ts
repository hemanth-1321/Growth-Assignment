import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
      - sale_date: Date (when sale occurred)
      - region: Text (sales region)
      - customer_segment: Text (customer type)

      Rules:
      - Generate a valid, executable SQL query
      - Use appropriate SQL functions
      - Handle aggregations, filtering, and sorting
      - Prioritize clarity and direct data retrieval

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

      const prompt = `Act as a data analytics expert. 
      Provide a detailed, business-oriented explanation for this query:
      "${query}"

      Explain:
      - The intent behind the query
      - Potential business insights
      - How this query helps in decision-making
      - Context of the data being analyzed

      Make the explanation clear and accessible to non-technical stakeholders.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const explanation = response.text().trim();

      return explanation;
    } catch (error) {
      console.error("Explanation Generation Error:", error);
      return "Unable to generate explanation.";
    }
  }
}
