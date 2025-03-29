import express from "express";
import { QueryTranslater } from "../controllers/queryTranslater";
import { db } from "../DB/db";
import { authenticate } from "../middleware";

const router = express.Router();
router.post("/translate", authenticate, async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      messge: "unauthorized",
    });
    return;
  }
  const { query } = req.body;
  try {
    const sqlQuery = await QueryTranslater.translateQuery(query);
    if (!sqlQuery) {
      res.status(400).json({
        error: "Query Transition Failed",
        message: "Unable to convert natural language query to SQL",
      });
      return;
    }

    db.all(sqlQuery, (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Database query failed",
          details: err.message,
        });
      }

      res.status(201).json({
        results: rows,
        translatedQuery: sqlQuery,
        queryType: "gemini-powered-analysis",
      });
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

router.post("/explain", authenticate, async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      messge: "unauthorized",
    });
  }
  const { query } = req.body;
  try {
    const explaination = await QueryTranslater.explainQuery(query);

    res.status(201).json({
      queryBreakDown: explaination,
      queryType: "gemini_explanation",
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Explanation Generation Failed",
      details: error.message,
    });
  }
});

router.post("/validate", authenticate, async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      messge: "unauthorized",
    });
  }
  const { query } = req.body;

  try {
    const sqlQuery = await QueryTranslater.translateQuery(query);
    if (!sqlQuery) {
      res.status(400).json({
        valid: false,
        reason: "Unable to translate query",
      });
    }
    res.status(201).json({
      valid: true,
      translatedQuery: sqlQuery,
      queryType: "gemini_validation",
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Validation Failed",
      details: error.message,
    });
  }
});
export default router;
