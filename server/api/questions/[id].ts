import questions from "../../data/questions";
import { readBody, createError } from "h3";

export default eventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  if (event.req.method === "DELETE") {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      questions.splice(index, 1);
      return { message: "Question deleted successfully" };
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  if (event.req.method === "PUT") {
    const updatedQuestion = await readBody(event);

    if (!updatedQuestion || typeof updatedQuestion !== "object") {
      throw createError({ statusCode: 400, statusMessage: "Invalid request body" });
    }

    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      questions[index] = { ...questions[index], ...updatedQuestion };
      return { message: "Question updated successfully" };
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  if (event.req.method === "GET") {
    const question = questions.find((q) => q.id === id);
    if (question) {
      return question;
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
