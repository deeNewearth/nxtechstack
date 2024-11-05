/**
 * This module provides custom examples for GraphQL operations
 */
module.exports = {
  // Example for Query operations
  queryExamples: {
    course: {
      id: "course_123"
    },
    searchCourses: {
      filter: {
        query: "javascript",
        difficultyLevel: ["BEGINNER"],
        minRating: 4.0
      },
      pagination: {
        first: 10
      }
    }
  },

  // Example for Mutation operations
  mutationExamples: {
    createCourse: {
      input: {
        title: "Advanced TypeScript",
        description: "Deep dive into TypeScript features",
        difficultyLevel: "ADVANCED",
        duration: 120,
        learningObjectives: ["Generics", "Decorators", "Type Inference"],
        accessLevel: "PUBLIC"
      }
    }
  }
}; 