import  questions  from "../../data/questions";
import type { Parameter } from "~/types"; //interface
import {
  CompositeType,
  AtomicType,
  AbstractType,
  FunctionConfig,
  Question,
  InputOutput,
} from "~/types/index.d"; //enums and classes

export default eventHandler(async (event) => {
  const { q, categories, difficulties, sort, order } = getQuery(event) as {
    q?: string;
    categories?: string[];
    difficulties?: string[];
    sort?: keyof Question;
    order?: "asc" | "desc";
  };

  const id = event.context.params?.id;

  if (id) {
    const question = questions.find((q) => q.id === id);
    if (question) {
      return question;
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  // Apply filtering
  let filteredQuestions = questions;

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
});
