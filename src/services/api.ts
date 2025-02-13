// src/services/api.ts
import { Question, UserContext, ExploreResponse } from "../types";
import { Backend_Link } from "../../BackendLink";
const transformQuestion = (rawQuestion: Question): Question => ({
  text: rawQuestion.text,
  options: rawQuestion.options,
  correctAnswer: rawQuestion.correctAnswer,
  explanation: rawQuestion.explanation,
  difficulty: rawQuestion.difficulty,
  ageGroup: rawQuestion.ageGroup,
  topic: rawQuestion.topic,
  subtopic: rawQuestion.subtopic || "",
  questionType: rawQuestion.questionType || "conceptual",
});

export const api = {
  async getQuestion(
    topic: string,
    level: number,
    userContext: UserContext
  ): Promise<Question> {
    try {
      const question = await fetch(
        `${Backend_Link.LOCAL}/getPlaygroundQuestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic, level, age: userContext.age }),
        }
      );

      const returnedQuestion = await question.json();
      return transformQuestion(returnedQuestion);
    } catch (error) {
      console.error("Question generation error:", error);
      throw new Error("Failed to generate question");
    }
  },

  async generateTest(
    topic: string,
    examType: "JEE" | "NEET"
  ): Promise<Question[]> {
    try {
      console.log("API generateTest called with:", { topic, examType });

      const questions = await fetch(`${Backend_Link.LOCAL}/getTestQuestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, examType }),
      });

      console.log("API received questions:", questions);

      const returnedQuestions = await questions.json();
      return returnedQuestions.map(transformQuestion);
    } catch (error) {
      console.error("Test generation error:", error);
      throw new Error("Failed to generate test");
    }
  },

  async explore(
    query: string,
    userContext: UserContext
  ): Promise<ExploreResponse> {
    try {
      const response = await await fetch(`${Backend_Link.LOCAL}/initStream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, age: userContext.age }),
      });

      const returnedResponse = await response.json();
      return returnedResponse;
    } catch (error) {
      console.error("Explore error:", error);
      throw new Error("Failed to explore topic");
    }
  },
};
