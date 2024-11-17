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
  const id = event.context.params?.id;

  if (id) {
    const question = questions.find((q) => q.id === id);
    if (question) {
      return question;
    } else {
      throw createError({ statusCode: 404, statusMessage: "Question not found" });
    }
  }

  throw createError({ statusCode: 400, statusMessage: "ID is required" });
});
