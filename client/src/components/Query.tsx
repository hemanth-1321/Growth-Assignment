import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { BACKEND_URL } from "../lib/Api";

export default function QueryApp() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async (endpoint: string) => {
    setLoading(true);
    setResponse(""); // Clear previous response

    const authToken = localStorage.getItem("authToken"); // Get token from localStorage

    try {
      const res = await axios.post(
        `${BACKEND_URL}/query/${endpoint}`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send token in headers
            "Content-Type": "application/json",
          },
        }
      );

      // Format response properly
      if (typeof res.data === "string") {
        setResponse(res.data.replace(/\n/g, "<br/>"));
      } else {
        setResponse(JSON.stringify(res.data, null, 2).replace(/\n/g, "<br/>"));
      }
    } catch (error) {
      setResponse("❌ Error: Failed to process request");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AI Query Engine</h1>

      {/* Input Field */}
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your natural language query..."
        className="w-full max-w-md p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <Button onClick={() => handleQuery("transalte")} disabled={loading} className="w-40 flex justify-center">
          {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Translate"}
        </Button>
        <Button onClick={() => handleQuery("explain")} disabled={loading} className="w-40 flex justify-center">
          {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Explain Query"}
        </Button>
        <Button onClick={() => handleQuery("validate")} disabled={loading} className="w-40 flex justify-center">
          {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Validate Query"}
        </Button>
      </div>

      {/* Response Card */}
      {loading ? (
        <p className="mt-6 text-gray-700 text-lg font-medium">Processing your query...</p>
      ) : response && (
        <Card className="mt-6 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Response:</h2>
            <div
              className="text-base text-gray-600 whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: response }} // Render formatted text
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
