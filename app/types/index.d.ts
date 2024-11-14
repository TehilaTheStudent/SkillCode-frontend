import type { Avatar } from "#ui/types";

export type UserStatus = "subscribed" | "unsubscribed" | "bounced";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: Avatar;
  status: UserStatus;
  location: string;
}

export interface Mail {
  id: number;
  unread?: boolean;
  from: User;
  subject: string;
  body: string;
  date: string;
}

export interface Member {
  name: string;
  username: string;
  role: "member" | "owner";
  avatar: Avatar;
}

export interface Notification {
  id: number;
  unread?: boolean;
  sender: User;
  body: string;
  date: string;
}

export type Period = "daily" | "weekly" | "monthly";

export interface Range {
  start: Date;
  end: Date;
}

// skillcode types go here //////////////////////////////////////////////////
export type Void = "Void";

export enum AtomicType {
  Integer = "Integer",
  Number = "Number",
  String = "String",
  Boolean = "Boolean",
}

export enum CompositeType {
  GraphNode = "GraphNode",
  TreeNode = "TreeNode",
  ListNode = "ListNode",
  Array = "Array",
  Matrix = "Matrix",
}

export interface AbstractType {
  type: CompositeType | AtomicType | Void;
  tChildren?: AbstractType;
}

export interface Parameter {
  name?: string; // Parameter name
  paramType: AbstractType; // Abstract type (e.g., 'Array', 'Integer')
}

export interface FunctionConfig {
  name: string; // Name of the function to implement
  parameters: Parameter[]; // List of parameters with abstract types
  returnType: AbstractType; // Return type of the function
}

export interface InputOutput {
  parameters: string[]; // Array of parameter values matching the order in the question
  expectedOutput: string; // The expected result of the function
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  stats: number; // e.g., number of attempts or submissions
  examples: InputOutput[]; // Example inputs or usage examples
  testCases: InputOutput[]; // Test cases with inputs and expected outputs
  functionConfig: FunctionConfig; // Function signature and return type
  languages: string[]; // List of languages supported by the question
}

/// this logic is for the backend //////////////////////////////////////////////////
//#region backend

export interface GraphNode {
  val: number; // Value of the node
  neighbors: GraphNode[]; // List of neighboring nodes (for graphs)
}

export interface TreeNode {
  val: number; // Value of the node
  left?: TreeNode; // Left child
  right?: TreeNode; // Right child
}

export interface ListNode {
  val: number; // Value of the node
  next?: ListNode; // Pointer to the next node in the list
}

const reusableTypes = {
  GraphNode: {
    val: "Integer",
    neighbors: "Array<GraphNode>",
  },
  TreeNode: {
    val: "Integer",
    left: "TreeNode",
    right: "TreeNode",
  },
  ListNode: {
    val: "Integer",
    next: "ListNode",
  },
};

const typeMappings = {
  Integer: {
    python: "int",
    javascript: "number",
    cpp: "int",
    c: "int",
    golang: "int",
    java: "int",
    csharp: "int",
  },
  Number: {
    python: "float",
    javascript: "number",
    cpp: "double",
    c: "double",
    golang: "float64",
    java: "double",
    csharp: "double",
  },
  String: {
    python: "str",
    javascript: "string",
    cpp: "std::string",
    c: "char*",
    golang: "string",
    java: "String",
    csharp: "string",
  },
  Array: {
    python: "List",
    javascript: "Array",
    cpp: "std::vector",
    c: "array",
    golang: "[]",
    java: "List",
    csharp: "List",
  },
  Boolean: {
    python: "bool",
    javascript: "boolean",
    cpp: "bool",
    c: "bool",
    golang: "bool",
    java: "boolean",
    csharp: "bool",
  },
};

//#endregion
