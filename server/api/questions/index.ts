import questions from "../../data/questions";
import { readBody, createError, getQuery } from "h3"; // Ensure `readBody` and `getQuery` are imported
import type { Parameter } from "~/types"; // interface
import {
  CompositeType,
  AtomicType,
  AbstractType,
  FunctionConfig,
  Question,
  InputOutput,
} from "~/types/index.d"; // enums and classes

export default eventHandler(async (event) => {
  const { q, categories, difficulties, sort, order } = getQuery(event) as {
    q?: string;
    categories?: string[];
    difficulties?: string[];
    sort?: keyof Question;
    order?: "asc" | "desc";
  };

  const id = event.context.params?.id;

  // Handle GET for a specific question by ID
  if (id) {
    const question = questions.find((q) => q.id === id);
    if (question) {
      return question;
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  // Handle POST request to add a new question
  if (event.req.method === "POST") {
    const newQuestion = await readBody(event);

    // Validate the new question
    if (!newQuestion || typeof newQuestion !== "object") {
      throw createError({ statusCode: 400, statusMessage: "Invalid question data" });
    }

    // Check required fields (id, title, description, etc.)
    const { id, title, description, difficulty, category } = newQuestion;
    if (!id || !title || !description || !difficulty || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: id, title, description, difficulty, or category",
      });
    }

    // Check for duplicate ID
    if (questions.find((q) => q.id === id)) {
      throw createError({
        statusCode: 400,
        statusMessage: `A question with ID "${id}" already exists`,
      });
    }

    // Add the new question to the list
    questions.push(newQuestion);

    return { message: "Question added successfully", question: newQuestion };
  }

  // Handle GET for all questions with filtering, sorting
  if (event.req.method === "GET") {
    let filteredQuestions = questions;

    // Apply filtering
    if (q) {
      filteredQuestions = filteredQuestions.filter((question) =>
        question.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (categories && categories.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => categories.includes(question.category));
    }

    if (difficulties && difficulties.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => difficulties.includes(question.difficulty));
    }

    // Apply sorting
    if (sort) {
      const orderFactor = order === "desc" ? -1 : 1;

      filteredQuestions.sort((a, b) => {
        if (sort === "difficulty") {
          const difficultyOrder = ["Easy", "Medium", "Hard"];
          return (difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty)) * orderFactor;
        }

        const aValue = a[sort];
        const bValue = b[sort];

        if (aValue < bValue) return -1 * orderFactor;
        if (aValue > bValue) return 1 * orderFactor;
        return 0;
      });
    }

    return filteredQuestions;
  }

  // Handle unsupported methods
  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
