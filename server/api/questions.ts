import type { Question, AbstractType, Parameter, Difficulty } from "~/types";
import { AtomicType, CompositeType } from "~/types/index.d";

const questions: Question[] = [
  {
    id: "1",
    title: "Merge Sorted Arrays",
    description: "Merge two sorted arrays into one sorted array.",
    difficulty: "Medium",
    category: "Array",
    stats: 150,
    examples: [
      {
        parameters: ["[1, 2]", "[3, 4]"],
        expectedOutput: "[1, 2, 3, 4]",
      },
      {
        parameters: ["[1, 2]", "[3, 4]"],
        expectedOutput: "[1, 2, 3, 4]",
      },
      {
        parameters: ["[1, 2]", "[3, 4]"],
        expectedOutput: "[1, 2, 3, 4]",
      },
    ],
    testCases: [
      {
        parameters: ["[1, 2, 3]", "[4, 5, 6]"],
        expectedOutput: "[1, 2, 3, 4, 5, 6]",
      },
    ],
    functionConfig: {
      name: "mergeArrays",
      parameters: [
        { name: "arr1", paramType: { type: CompositeType.Array } },
        { name: "arr2", paramType: { type: CompositeType.Array } },
      ],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "2",
    title: "Matrix Multiplication",
    description: "Multiply two matrices and return the result.",
    difficulty: "Hard",
    category: "Matrix",
    stats: 120,
    examples: [
      {
        parameters: ["[[1, 2], [3, 4]]", "[[5, 6], [7, 8]]"],
        expectedOutput: "[[19, 22], [43, 50]]",
      },
    ],
    testCases: [
      {
        parameters: ["[[2, 3], [4, 5]]", "[[1, 0], [0, 1]]"],
        expectedOutput: "[[2, 3], [4, 5]]",
      },
    ],
    functionConfig: {
      name: "multiplyMatrices",
      parameters: [
        { name: "matrix1", paramType: { type: CompositeType.Matrix } },
        { name: "matrix2", paramType: { type: CompositeType.Matrix } },
      ],
      returnType: { type: CompositeType.Matrix },
    },
    languages: ["python", "c++", "java"],
  },
  {
    id: "3",
    title: "Max Depth of Binary Tree",
    description: "Find the maximum depth of a binary tree.",
    difficulty: "Easy",
    category: "Tree",
    stats: 180,
    examples: [
      {
        parameters: ["[3, 9, 20, null, null, 15, 7]"],
        expectedOutput: "3",
      },
    ],
    testCases: [
      {
        parameters: ["[1, 2, null, 3, null]"],
        expectedOutput: "3",
      },
    ],
    functionConfig: {
      name: "maxDepth",
      parameters: [{ name: "root", paramType: { type: CompositeType.TreeNode } }],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "java", "javascript"],
  },
  {
    id: "4",
    title: "Reverse a Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "Easy",
    category: "Linked List",
    stats: 200,
    examples: [
      {
        parameters: ["[1, 2, 3, 4, 5]"],
        expectedOutput: "[5, 4, 3, 2, 1]",
      },
    ],
    testCases: [
      {
        parameters: ["[1, 2, 3]"],
        expectedOutput: "[3, 2, 1]",
      },
    ],
    functionConfig: {
      name: "reverseList",
      parameters: [{ name: "head", paramType: { type: CompositeType.ListNode } }],
      returnType: { type: CompositeType.ListNode },
    },
    languages: ["python", "javascript", "c++"],
  },
  {
    id: "5",
    title: "Clone a Graph",
    description: "Clone a graph represented as a set of interconnected nodes.",
    difficulty: "Medium",
    category: "Graph",
    stats: 150,
    examples: [
      {
        parameters: ["[[1, 2], [2, 3]]"],
        expectedOutput: "[[1, 2], [2, 3]]",
      },
    ],
    testCases: [
      {
        parameters: ["[[1, 2], [2, 3], [3, 4]]"],
        expectedOutput: "[[1, 2], [2, 3], [3, 4]]",
      },
    ],
    functionConfig: {
      name: "cloneGraph",
      parameters: [{ name: "node", paramType: { type: CompositeType.GraphNode } }],
      returnType: { type: CompositeType.GraphNode },
    },
    languages: ["python", "java", "c++"],
  },
  {
    id: "6",
    title: "Find the Missing Number",
    description: "Find the missing number in an array of integers.",
    difficulty: "Easy",
    category: "Array",
    stats: 130,
    examples: [
      {
        parameters: ["[1, 2, 4, 5]"],
        expectedOutput: "3",
      },
    ],
    testCases: [
      {
        parameters: ["[3, 7, 1, 2, 8, 4, 5]"],
        expectedOutput: "6",
      },
    ],
    functionConfig: {
      name: "findMissingNumber",
      parameters: [{ name: "arr", paramType: { type: CompositeType.Array } }],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "7",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "String",
    stats: 140,
    examples: [
      {
        parameters: ['"abcabcbb"'],
        expectedOutput: "3",
      },
    ],
    testCases: [
      {
        parameters: ['"bbbbb"'],
        expectedOutput: "1",
      },
    ],
    functionConfig: {
      name: "lengthOfLongestSubstring",
      parameters: [{ name: "s", paramType: { type: AtomicType.String } }],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "8",
    title: "Valid Parentheses",
    description: "Determine if the input string is valid.",
    difficulty: "Easy",
    category: "String",
    stats: 160,
    examples: [
      {
        parameters: ['"()"'],
        expectedOutput: "true",
      },
    ],
    testCases: [
      {
        parameters: ['"()[]{}"'],
        expectedOutput: "true",
      },
    ],
    functionConfig: {
      name: "isValid",
      parameters: [{ name: "s", paramType: { type: AtomicType.String } }],
      returnType: { type: AtomicType.Boolean },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "9",
    title: "Generate Parentheses",
    description: "Generate all combinations of well-formed parentheses.",
    difficulty: "Medium",
    category: "String",
    stats: 110,
    examples: [
      {
        parameters: ["3"],
        expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]',
      },
    ],
    testCases: [
      {
        parameters: ["1"],
        expectedOutput: '["()"]',
      },
    ],
    functionConfig: {
      name: "generateParenthesis",
      parameters: [{ name: "n", paramType: { type: AtomicType.Integer } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "10",
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a new sorted list.",
    difficulty: "Easy",
    category: "Linked List",
    stats: 170,
    examples: [
      {
        parameters: ["[1, 2, 4]", "[1, 3, 4]"],
        expectedOutput: "[1, 1, 2, 3, 4, 4]",
      },
    ],
    testCases: [
      {
        parameters: ["[1, 2, 4]", "[1, 3, 4]"],
        expectedOutput: "[1, 1, 2, 3, 4, 4]",
      },
    ],
    functionConfig: {
      name: "mergeTwoLists",
      parameters: [
        { name: "l1", paramType: { type: CompositeType.ListNode } },
        { name: "l2", paramType: { type: CompositeType.ListNode } },
      ],
      returnType: { type: CompositeType.ListNode },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "11",
    title: "Binary Tree Inorder Traversal",
    description: "Return the inorder traversal of a binary tree's nodes' values.",
    difficulty: "Easy",
    category: "Tree",
    stats: 150,
    examples: [
      {
        parameters: ["[1, null, 2, 3]"],
        expectedOutput: "[1, 3, 2]",
      },
    ],
    testCases: [
      {
        parameters: ["[]"],
        expectedOutput: "[]",
      },
    ],
    functionConfig: {
      name: "inorderTraversal",
      parameters: [{ name: "root", paramType: { type: CompositeType.TreeNode } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "12",
    title: "Symmetric Tree",
    description: "Check whether a binary tree is symmetric around its center.",
    difficulty: "Easy",
    category: "Tree",
    stats: 140,
    examples: [
      {
        parameters: ["[1, 2, 2, 3, 4, 4, 3]"],
        expectedOutput: "true",
      },
    ],
    testCases: [
      {
        parameters: ["[1, 2, 2, null, 3, null, 3]"],
        expectedOutput: "false",
      },
    ],
    functionConfig: {
      name: "isSymmetric",
      parameters: [{ name: "root", paramType: { type: CompositeType.TreeNode } }],
      returnType: { type: AtomicType.Boolean },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "13",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the maximum sum.",
    difficulty: "Medium",
    category: "Array",
    stats: 160,
    examples: [
      {
        parameters: ["[-2,1,-3,4,-1,2,1,-5,4]"],
        expectedOutput: "6",
      },
    ],
    testCases: [
      {
        parameters: ["[1]"],
        expectedOutput: "1",
      },
    ],
    functionConfig: {
      name: "maxSubArray",
      parameters: [{ name: "nums", paramType: { type: CompositeType.Array } }],
      returnType: { type: AtomicType.Number },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "14",
    title: "Spiral Matrix",
    description: "Return all elements of the matrix in spiral order.",
    difficulty: "Medium",
    category: "Matrix",
    stats: 130,
    examples: [
      {
        parameters: ["[[1,2,3],[4,5,6],[7,8,9]]"],
        expectedOutput: "[1,2,3,6,9,8,7,4,5]",
      },
    ],
    testCases: [
      {
        parameters: ["[[1,2,3,4],[5,6,7,8],[9,10,11,12]]"],
        expectedOutput: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    functionConfig: {
      name: "spiralOrder",
      parameters: [{ name: "matrix", paramType: { type: CompositeType.Matrix } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "15",
    title: "Rotate Image",
    description: "Rotate the image by 90 degrees (clockwise).",
    difficulty: "Medium",
    category: "Matrix",
    stats: 120,
    examples: [
      {
        parameters: ["[[1,2,3],[4,5,6],[7,8,9]]"],
        expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
      },
    ],
    testCases: [
      {
        parameters: ["[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]"],
        expectedOutput: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      },
    ],
    functionConfig: {
      name: "rotate",
      parameters: [{ name: "matrix", paramType: { type: CompositeType.Matrix } }],
      returnType: { type: CompositeType.Matrix },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "16",
    title: "Group Anagrams",
    description: "Group anagrams from a list of strings.",
    difficulty: "Medium",
    category: "String",
    stats: 150,
    examples: [
      {
        parameters: ['["eat","tea","tan","ate","nat","bat"]'],
        expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
      },
    ],
    testCases: [
      {
        parameters: ['[""]'],
        expectedOutput: '[[""]]',
      },
    ],
    functionConfig: {
      name: "groupAnagrams",
      parameters: [{ name: "strs", paramType: { type: CompositeType.Array } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "17",
    title: "Pow(x, n)",
    description: "Implement pow(x, n), which calculates x raised to the power n.",
    difficulty: "Medium",
    category: "Math",
    stats: 140,
    examples: [
      {
        parameters: ["2.00000", "10"],
        expectedOutput: "1024.00000",
      },
    ],
    testCases: [
      {
        parameters: ["2.10000", "3"],
        expectedOutput: "9.26100",
      },
    ],
    functionConfig: {
      name: "myPow",
      parameters: [
        { name: "x", paramType: { type: AtomicType.Number } },
        { name: "n", paramType: { type: AtomicType.Integer } },
      ],
      returnType: { type: AtomicType.Number },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "18",
    title: "Subsets",
    description: "Return all possible subsets of a set of distinct integers.",
    difficulty: "Medium",
    category: "Array",
    stats: 130,
    examples: [
      {
        parameters: ["[1,2,3]"],
        expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      },
    ],
    testCases: [
      {
        parameters: ["[0]"],
        expectedOutput: "[[],[0]]",
      },
    ],
    functionConfig: {
      name: "subsets",
      parameters: [{ name: "nums", paramType: { type: CompositeType.Array } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "19",
    title: "Word Search",
    description: "Given a 2D board and a word, find if the word exists in the grid.",
    difficulty: "Medium",
    category: "Matrix",
    stats: 120,
    examples: [
      {
        parameters: ['[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', '"ABCCED"'],
        expectedOutput: "true",
      },
    ],
    testCases: [
      {
        parameters: ['[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', '"SEE"'],
        expectedOutput: "true",
      },
    ],
    functionConfig: {
      name: "exist",
      parameters: [
        { name: "board", paramType: { type: CompositeType.Matrix } },
        { name: "word", paramType: { type: AtomicType.String } },
      ],
      returnType: { type: AtomicType.Boolean },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "20",
    title: "Combination Sum",
    description: "Find all unique combinations in candidates where the candidate numbers sum to target.",
    difficulty: "Medium",
    category: "Array",
    stats: 110,
    examples: [
      {
        parameters: ["[2,3,6,7]", "7"],
        expectedOutput: "[[7],[2,2,3]]",
      },
    ],
    testCases: [
      {
        parameters: ["[2,3,5]", "8"],
        expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]",
      },
    ],
    functionConfig: {
      name: "combinationSum",
      parameters: [
        { name: "candidates", paramType: { type: CompositeType.Array } },
        { name: "target", paramType: { type: AtomicType.Integer } },
      ],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "21",
    title: "N-Queens",
    description: "Solve the N-Queens puzzle.",
    difficulty: "Hard",
    category: "Backtracking",
    stats: 100,
    examples: [
      {
        parameters: ["4"],
        expectedOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
      },
    ],
    testCases: [
      {
        parameters: ["1"],
        expectedOutput: '[["Q"]]',
      },
    ],
    functionConfig: {
      name: "solveNQueens",
      parameters: [{ name: "n", paramType: { type: AtomicType.Integer } }],
      returnType: { type: CompositeType.Array },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "22",
    title: "Trapping Rain Water",
    description: "Calculate how much water it is able to trap after raining.",
    difficulty: "Hard",
    category: "Array",
    stats: 90,
    examples: [
      {
        parameters: ["[0,1,0,2,1,0,1,3,2,1,2,1]"],
        expectedOutput: "6",
      },
    ],
    testCases: [
      {
        parameters: ["[4,2,0,3,2,5]"],
        expectedOutput: "9",
      },
    ],
    functionConfig: {
      name: "trap",
      parameters: [{ name: "height", paramType: { type: CompositeType.Array } }],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "23",
    title: "Edit Distance",
    description: "Calculate the minimum number of operations required to convert word1 to word2.",
    difficulty: "Hard",
    category: "String",
    stats: 80,
    examples: [
      {
        parameters: ['"horse"', '"ros"'],
        expectedOutput: "3",
      },
    ],
    testCases: [
      {
        parameters: ['"intention"', '"execution"'],
        expectedOutput: "5",
      },
    ],
    functionConfig: {
      name: "minDistance",
      parameters: [
        { name: "word1", paramType: { type: AtomicType.String } },
        { name: "word2", paramType: { type: AtomicType.String } },
      ],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "24",
    title: "Word Ladder",
    description: "Find the length of the shortest transformation sequence from beginWord to endWord.",
    difficulty: "Hard",
    category: "Graph",
    stats: 70,
    examples: [
      {
        parameters: ['"hit"', '"cog"', '["hot","dot","dog","lot","log","cog"]'],
        expectedOutput: "5",
      },
    ],
    testCases: [
      {
        parameters: ['"hit"', '"cog"', '["hot","dot","dog","lot","log"]'],
        expectedOutput: "0",
      },
    ],
    functionConfig: {
      name: "ladderLength",
      parameters: [
        { name: "beginWord", paramType: { type: AtomicType.String } },
        { name: "endWord", paramType: { type: AtomicType.String } },
        { name: "wordList", paramType: { type: CompositeType.Array } },
      ],
      returnType: { type: AtomicType.Integer },
    },
    languages: ["python", "javascript", "java"],
  },
  {
    id: "25",
    title: "Regular Expression Matching",
    description: "Implement regular expression matching with support for '.' and '*'.",
    difficulty: "Hard",
    category: "String",
    stats: 60,
    examples: [
      {
        parameters: ['"aa"', '"a"'],
        expectedOutput: "false",
      },
    ],
    testCases: [
      {
        parameters: ['"aa"', '"a*"'],
        expectedOutput: "true",
      },
    ],
    functionConfig: {
      name: "isMatch",
      parameters: [
        { name: "s", paramType: { type: AtomicType.String } },
        { name: "p", paramType: { type: AtomicType.String } },
      ],
      returnType: { type: AtomicType.Boolean },
    },
    languages: ["python", "javascript", "java"],
  },
];

export default eventHandler(async (event) => {
  const { q, categories, difficulties, sort, order } = getQuery(event) as {
    q?: string;
    categories?: string[];
    difficulties?: string[];
    sort?: keyof Question;
    order?: "asc" | "desc";
  };

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
