// import type { Parameter } from "~/types"; //interface
// import {
//   CompositeType,
//   AtomicType,
//   AbstractType,
//   FunctionConfig,
//   Question,
//   InputOutput,
//   PredefinedCategory,
//   type Difficulty,
//   PredefinedSupportedLanguage,
// } from "~/types/index.d"; //enums and classes
// const questions: Question[] = [
//   new Question(
//     "Merge Sorted Arrays",
//     "Merge two sorted arrays into one sorted array.",
//     "Medium",
//     PredefinedCategory.Array,
//     [
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//       new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]"),
//     ],
//     [new InputOutput(["[1, 2]", "[3, 4]"], "[1, 2, 3, 4]")],
//     new FunctionConfig(
//       "mergeArrays",
//       [
//         { name: "arr1", param_type: new AbstractType(CompositeType.Array) },
//         { name: "arr2", param_type: new AbstractType(CompositeType.Array) },
//       ],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Matrix Multiplication",
//     "Multiply two matrices and return the result.",
//     "Hard",
//     PredefinedCategory.Matrix,
//     [new InputOutput(["[[1, 2], [3, 4]]", "[[5, 6], [7, 8]]"], "[[19, 22], [43, 50]]")],
//     [new InputOutput(["[[2, 3], [4, 5]]", "[[1, 0], [0, 1]]"], "[[2, 3], [4, 5]]")],
//     new FunctionConfig(
//       "multiplyMatrices",
//       [
//         { name: "matrix1", param_type: new AbstractType(CompositeType.Matrix) },
//         { name: "matrix2", param_type: new AbstractType(CompositeType.Matrix) },
//       ],
//       new AbstractType(CompositeType.Matrix)
//     ),
//     [PredefinedSupportedLanguage.Python, PredefinedSupportedLanguage.Cpp, PredefinedSupportedLanguage.Java]
//   ),
//   new Question(
//     "Max Depth of Binary Tree",
//     "Find the maximum depth of a binary tree.",
//     "Easy",
//     PredefinedCategory.Tree,
//     [new InputOutput(["[3, 9, 20, null, null, 15, 7]"], "3")],
//     [new InputOutput(["[1, 2, null, 3, null]"], "3")],
//     new FunctionConfig(
//       "maxDepth",
//       [{ name: "root", param_type: new AbstractType(CompositeType.TreeNode) }],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.Java,
//       PredefinedSupportedLanguage.JavaScript,
//     ]
//   ),
//   new Question(
//     "Reverse a Linked List",
//     "Reverse a singly linked list.",
//     "Easy",
//     PredefinedCategory.LinkedList,
//     [new InputOutput(["[1, 2, 3, 4, 5]"], "[5, 4, 3, 2, 1]")],
//     [new InputOutput(["[1, 2, 3]"], "[3, 2, 1]")],
//     new FunctionConfig(
//       "reverseList",
//       [{ name: "head", param_type: new AbstractType(CompositeType.ListNode) }],
//       new AbstractType(CompositeType.ListNode)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Cpp,
//     ]
//   ),
//   new Question(
//     "Clone a Graph",
//     "Clone a graph represented as a set of interconnected nodes.",
//     "Medium",
//     PredefinedCategory.Graph,
//     [new InputOutput(["[[1, 2], [2, 3]]"], "[[1, 2], [2, 3]]")],
//     [new InputOutput(["[[1, 2], [2, 3], [3, 4]]"], "[[1, 2], [2, 3], [3, 4]]")],
//     new FunctionConfig(
//       "cloneGraph",
//       [{ name: "node", param_type: new AbstractType(CompositeType.GraphNode) }],
//       new AbstractType(CompositeType.GraphNode)
//     ),
//     [PredefinedSupportedLanguage.Python, PredefinedSupportedLanguage.Java, PredefinedSupportedLanguage.Cpp]
//   ),
//   new Question(
//     "Find the Missing Number",
//     "Find the missing number in an array of integers.",
//     "Easy",
//     PredefinedCategory.Array,
//     [new InputOutput(["[1, 2, 4, 5]"], "3")],
//     [new InputOutput(["[3, 7, 1, 2, 8, 4, 5]"], "6")],
//     new FunctionConfig(
//       "findMissingNumber",
//       [{ name: "arr", param_type: new AbstractType(CompositeType.Array) }],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Longest Substring Without Repeating Characters",
//     "Find the length of the longest substring without repeating characters.",
//     "Medium",
//     PredefinedCategory.String,
//     [new InputOutput(['"abcabcbb"'], "3")],
//     [new InputOutput(['"bbbbb"'], "1")],
//     new FunctionConfig(
//       "lengthOfLongestSubstring",
//       [{ name: "s", param_type: new AbstractType(AtomicType.String) }],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Valid Parentheses",
//     "Determine if the input string is valid.",
//     "Easy",
//     PredefinedCategory.String,
//     [new InputOutput(['"()"'], "true")],
//     [new InputOutput(['"()[]{}"'], "true")],
//     new FunctionConfig(
//       "isValid",
//       [{ name: "s", param_type: new AbstractType(AtomicType.String) }],
//       new AbstractType(AtomicType.Boolean)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Generate Parentheses",
//     "Generate all combinations of well-formed parentheses.",
//     "Medium",
//     PredefinedCategory.String,
//     [new InputOutput(["3"], '["((()))","(()())","(())()","()(())","()()()"]')],
//     [new InputOutput(["1"], '["()"]')],
//     new FunctionConfig(
//       "generateParenthesis",
//       [{ name: "n", param_type: new AbstractType(AtomicType.Integer) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Merge Two Sorted Lists",
//     "Merge two sorted linked lists and return it as a new sorted list.",
//     "Easy",
//     PredefinedCategory.LinkedList,
//     [new InputOutput(["[1, 2, 4]", "[1, 3, 4]"], "[1, 1, 2, 3, 4, 4]")],
//     [new InputOutput(["[1, 2, 4]", "[1, 3, 4]"], "[1, 1, 2, 3, 4, 4]")],
//     new FunctionConfig(
//       "mergeTwoLists",
//       [
//         { name: "l1", param_type: new AbstractType(CompositeType.ListNode) },
//         { name: "l2", param_type: new AbstractType(CompositeType.ListNode) },
//       ],
//       new AbstractType(CompositeType.ListNode)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Binary Tree Inorder Traversal",
//     "Return the inorder traversal of a binary tree's nodes' values.",
//     "Easy",
//     PredefinedCategory.Tree,
//     [new InputOutput(["[1, null, 2, 3]"], "[1, 3, 2]")],
//     [new InputOutput(["[]"], "[]")],
//     new FunctionConfig(
//       "inorderTraversal",
//       [{ name: "root", param_type: new AbstractType(CompositeType.TreeNode) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Symmetric Tree",
//     "Check whether a binary tree is symmetric around its center.",
//     "Easy",
//     PredefinedCategory.Tree,
//     [new InputOutput(["[1, 2, 2, 3, 4, 4, 3]"], "true")],
//     [new InputOutput(["[1, 2, 2, null, 3, null, 3]"], "false")],
//     new FunctionConfig(
//       "isSymmetric",
//       [{ name: "root", param_type: new AbstractType(CompositeType.TreeNode) }],
//       new AbstractType(AtomicType.Boolean)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Maximum Subarray",
//     "Find the contiguous subarray with the maximum sum.",
//     "Medium",
//     PredefinedCategory.Array,
//     [new InputOutput(["[-2,1,-3,4,-1,2,1,-5,4]"], "6")],
//     [new InputOutput(["[1]"], "1")],
//     new FunctionConfig(
//       "maxSubArray",
//       [{ name: "nums", param_type: new AbstractType(CompositeType.Array) }],
//       new AbstractType(AtomicType.Double)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Spiral Matrix",
//     "Return all elements of the matrix in spiral order.",
//     "Medium",
//     PredefinedCategory.Matrix,
//     [new InputOutput(["[[1,2,3],[4,5,6],[7,8,9]]"], "[1,2,3,6,9,8,7,4,5]")],
//     [new InputOutput(["[[1,2,3,4],[5,6,7,8],[9,10,11,12]]"], "[1,2,3,4,8,12,11,10,9,5,6,7]")],
//     new FunctionConfig(
//       "spiralOrder",
//       [{ name: "matrix", param_type: new AbstractType(CompositeType.Matrix) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Rotate Image",
//     "Rotate the image by 90 degrees (clockwise).",
//     "Medium",
//     PredefinedCategory.Matrix,
//     [new InputOutput(["[[1,2,3],[4,5,6],[7,8,9]]"], "[[7,4,1],[8,5,2],[9,6,3]]")],
//     [
//       new InputOutput(
//         ["[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]"],
//         "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
//       ),
//     ],
//     new FunctionConfig(
//       "rotate",
//       [{ name: "matrix", param_type: new AbstractType(CompositeType.Matrix) }],
//       new AbstractType(CompositeType.Matrix)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Group Anagrams",
//     "Group anagrams from a list of strings.",
//     "Medium",
//     PredefinedCategory.String,
//     [
//       new InputOutput(
//         ['["eat","tea","tan","ate","nat","bat"]'],
//         '[["eat","tea","ate"],["tan","nat"],["bat"]]'
//       ),
//     ],
//     [new InputOutput(['[""]'], '[[""]]')],
//     new FunctionConfig(
//       "groupAnagrams",
//       [{ name: "strs", param_type: new AbstractType(CompositeType.Array) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Pow(x, n)",
//     "Implement pow(x, n), which calculates x raised to the power n.",
//     "Medium",
//     PredefinedCategory.Matrix,
//     [new InputOutput(["2.00000", "10"], "1024.00000")],
//     [new InputOutput(["2.10000", "3"], "9.26100")],
//     new FunctionConfig(
//       "myPow",
//       [
//         { name: "x", param_type: new AbstractType(AtomicType.Double) },
//         { name: "n", param_type: new AbstractType(AtomicType.Integer) },
//       ],
//       new AbstractType(AtomicType.Double)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Subsets",
//     "Return all possible subsets of a set of distinct integers.",
//     "Medium",
//     PredefinedCategory.Array,
//     [new InputOutput(["[1,2,3]"], "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]")],
//     [new InputOutput(["[0]"], "[[],[0]]")],
//     new FunctionConfig(
//       "subsets",
//       [{ name: "nums", param_type: new AbstractType(CompositeType.Array) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Word Search",
//     "Given a 2D board and a word, find if the word exists in the grid.",
//     "Medium",
//     PredefinedCategory.Matrix,
//     [new InputOutput(['[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', '"ABCCED"'], "true")],
//     [new InputOutput(['[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', '"SEE"'], "true")],
//     new FunctionConfig(
//       "exist",
//       [
//         { name: "board", param_type: new AbstractType(CompositeType.Matrix) },
//         { name: "word", param_type: new AbstractType(AtomicType.String) },
//       ],
//       new AbstractType(AtomicType.Boolean)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Combination Sum",
//     "Find all unique combinations in candidates where the candidate numbers sum to target.",
//     "Medium",
//     PredefinedCategory.Array,
//     [new InputOutput(["[2,3,6,7]", "7"], "[[7],[2,2,3]]")],
//     [new InputOutput(["[2,3,5]", "8"], "[[2,2,2,2],[2,3,3],[3,5]]")],
//     new FunctionConfig(
//       "combinationSum",
//       [
//         { name: "candidates", param_type: new AbstractType(CompositeType.Array) },
//         { name: "target", param_type: new AbstractType(AtomicType.Integer) },
//       ],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "N-Queens",
//     "Solve the N-Queens puzzle.",
//     "Hard",
//     PredefinedCategory.Matrix,
//     [new InputOutput(["4"], '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]')],
//     [new InputOutput(["1"], '[["Q"]]')],
//     new FunctionConfig(
//       "solveNQueens",
//       [{ name: "n", param_type: new AbstractType(AtomicType.Integer) }],
//       new AbstractType(CompositeType.Array)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Trapping Rain Water",
//     "Calculate how much water it is able to trap after raining.",
//     "Hard",
//     PredefinedCategory.Array,
//     [new InputOutput(["[0,1,0,2,1,0,1,3,2,1,2,1]"], "6")],
//     [new InputOutput(["[4,2,0,3,2,5]"], "9")],
//     new FunctionConfig(
//       "trap",
//       [{ name: "height", param_type: new AbstractType(CompositeType.Array) }],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [
//       PredefinedSupportedLanguage.Python,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Edit Distance",
//     "Calculate the minimum number of operations required to convert word1 to word2.",
//     "Hard",
//     PredefinedCategory.String,
//     [new InputOutput(['"horse"', '"ros"'], "3")],
//     [new InputOutput(['"intention"', '"execution"'], "5")],
//     new FunctionConfig(
//       "minDistance",
//       [
//         { name: "word1", param_type: new AbstractType(AtomicType.String) },
//         { name: "word2", param_type: new AbstractType(AtomicType.String) },
//       ],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [PredefinedSupportedLanguage.JavaScript, PredefinedSupportedLanguage.Java]
//   ),
//   new Question(
//     "Word Ladder",
//     "Find the length of the shortest transformation sequence from beginWord to endWord.",
//     "Hard",
//     PredefinedCategory.String,
//     [new InputOutput(['"hit"', '"cog"', '["hot","dot","dog","lot","log","cog"]'], "5")],
//     [new InputOutput(['"hit"', '"cog"', '["hot","dot","dog","lot","log"]'], "0")],
//     new FunctionConfig(
//       "ladderLength",
//       [
//         { name: "beginWord", param_type: new AbstractType(AtomicType.String) },
//         { name: "endWord", param_type: new AbstractType(AtomicType.String) },
//         { name: "wordList", param_type: new AbstractType(CompositeType.Array) },
//       ],
//       new AbstractType(AtomicType.Integer)
//     ),
//     [
//       PredefinedSupportedLanguage.CSharp,
//       PredefinedSupportedLanguage.JavaScript,
//       PredefinedSupportedLanguage.Java,
//     ]
//   ),
//   new Question(
//     "Regular Expression Matching",
//     "Implement regular expression matching with support for '.' and '*'.",
//     "Hard",
//     PredefinedCategory.String,
//     [new InputOutput(['"aa"', '"a"'], "false")],
//     [new InputOutput(['"aa"', '"a*"'], "true")],
//     new FunctionConfig(
//       "isMatch",
//       [
//         { name: "s", param_type: new AbstractType(AtomicType.String) },
//         { name: "p", param_type: new AbstractType(AtomicType.String) },
//       ],
//       new AbstractType(AtomicType.Boolean)
//     ),
//     [PredefinedSupportedLanguage.JavaScript, PredefinedSupportedLanguage.Java]
//   ),
// ];

// export default questions;
