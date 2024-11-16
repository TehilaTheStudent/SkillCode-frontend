import type { Avatar } from "#ui/types";

export type UserStatus = "subscribed" | "unsubscribed" | "bounced";

/**
 * @entity interface
 * @fields id, name, email, avatar, status, location
 */
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: Avatar;
  status: UserStatus;
  location: string;
}

/**
 * @entity interface
 * @fields id, unread, from, subject, body, date
 */
export interface Mail {
  id: number;
  unread?: boolean;
  from: User;
  subject: string;
  body: string;
  date: string;
}

/**
 * @entity interface
 * @fields name, username, role, avatar
 */
export interface Member {
  name: string;
  username: string;
  role: "member" | "owner";
  avatar: Avatar;
}

/**
 * @entity interface
 * @fields id, unread, sender, body, date
 */
export interface Notification {
  id: number;
  unread?: boolean;
  sender: User;
  body: string;
  date: string;
}

export type Period = "daily" | "weekly" | "monthly";

/**
 * @entity interface
 * @fields start, end
 */
export interface Range {
  start: Date;
  end: Date;
}
//#region SkillCode

/**
 * @entity type
 */
export type VoidType = "VoidType";

/**
 * @entity enum
 */
export enum AtomicType {
  Integer = "Integer",
  Double = "Double",
  String = "String",
  Boolean = "Boolean",
}

/**
 * @entity enum
 */
export enum CompositeType {
  GraphNode = "GraphNode",
  TreeNode = "TreeNode",
  ListNode = "ListNode",
  Array = "Array",
  Matrix = "Matrix",
}

/**
 * @entity enum
 */
export enum PredefinedSupportedLanguage {
  JavaScript = "JavaScript",
  Python = "Python",
  Java = "Java",
  Go = "Go",
  CSharp = "CSharp",
}

/**
 * @entity enum
 */
export enum PredefinedCategory {
  Array = "Array",
  Graph = "Graph",
  String = "String",
  Tree = "Tree",
  DynamicProgramming = "DynamicProgramming",
}

export function textifyEnum<T>(enumObj: T, value: T[keyof T]): string {
  if (Object.values(enumObj).includes(value)) {
    return textify(value);
  }
  return "Unknown";
}
// Utility function to make text more human-readable
function textify(value: string): string {
  // Replace camel case, underscores, and capitalize words
  return value  
    
}

/**
 * @entity class
 * @fields type, tChildren
 */
export class AbstractType {
  public type: CompositeType | AtomicType;
  public tChildren?: AbstractType;

  constructor(type: CompositeType | AtomicType, tChildren?: AbstractType) {
    this.type = type;
    if (Object.values(CompositeType).includes(type as CompositeType) && !tChildren) {
      this.tChildren = new AbstractType(AtomicType.Integer);
    } else {
      this.tChildren = tChildren;
    }
  }

  /**
   * Convert the AbstractType to a string representation.
   * Recursively prints composite types with children.
   */
  toPrint(): string {
    if (this.tChildren) {
      // Recursive case: composite type with children
      return `${textify(this.type)} < ${this.tChildren.toPrint()} >`;
    }
    // Base case: atomic type
    return textify(this.type);
  }

  isConpositeHead(): boolean {
    return Object.values(CompositeType).includes(this.type as CompositeType);
  }

  getTail(): AbstractType {
    if (!this.tChildren) {
      // Base case: No children, return this
      return this;
    }
    // Recursive case: Traverse to the deepest child
    return this.tChildren.getTail();
  }

  /**
   * Remove the last atomic type from the hierarchy.
   * If it's the only element, return "VoidType" or reset state.
   */
  removeTail(): AbstractType {
    if (!this.tChildren) {
      // Base case: Reset to "VoidType" or clear state if atomic
      this.type = AtomicType.Integer; // Reset to default atomic type
      return this;
    }

    // Recursive case: Remove from the deepest child
    if (!this.tChildren.tChildren) {
      // If the immediate child is atomic, remove it
      this.tChildren = undefined;
      return this;
    }

    // Recursive traversal
    this.tChildren.removeTail();
    return this;
  }

  /**
   * Add a new atomic type at the tail of the hierarchy.
   * If the current type is atomic, converts it to a composite type with children.
   */
  addTail(newAtomicType: AtomicType = AtomicType.Integer): AbstractType {
    if (!this.tChildren) {
      // If no child exists, add a new atomic child
      this.tChildren = new AbstractType(newAtomicType);
      return this;
    }

    // Recursive case: Add to the deepest child
    this.tChildren.addTail(newAtomicType);
    return this;
  }

  /**
   * Convert the AbstractType hierarchy to a flat list of types.
   */
  toList(): string[] {
    if (this.tChildren) {
      // Recursive case: Flatten the hierarchy
      return [textify(this.type), ...this.tChildren.toList()];
    }

    // Base case: Return the single type
    return [textify(this.type)];
  }

  /**
   * Set the type of AbstractType at the specified index in the list.
   */
  setVarType(index: number, newType: CompositeType | AtomicType): void {
    const typeList = this.toList();
    if (index < 0 || index >= typeList.length) {
      console.log('Index out of bounds')
      return; // Index out of bounds
    }
  
    let current: AbstractType = this;
  
    for (let i = 0; i < index; i++) {
      if (!current.tChildren) {
        console.log('Invalid hierarchy, no further children')
        return; // 
      }
      current = current.tChildren;
    }
  
    // Update the type
    current.type = newType;
  
    // Handle edge cases
    if (index === typeList.length - 1 && Object.values(CompositeType).includes(newType as CompositeType)) {
      // If the last type is set to a composite, add an Integer child
      if (!current.tChildren) {
        current.tChildren = new AbstractType(AtomicType.Integer);
      }
    } else if (Object.values(AtomicType).includes(newType as AtomicType)) {
      // If a middle type is set to atomic, truncate its children
      current.tChildren = undefined;
    }
  }
  
  /**
   * Get the type of AbstractType at the specified index in the list.
   */
  getVarType(index: number): CompositeType | AtomicType {
    const typeList = this.toList();
    if (index < 0 || index >= typeList.length) {
      // throw new Error("Index out of bounds");
    }
    let current: AbstractType = this;
    for (let i = 0; i < index; i++) {
      if (!current.tChildren) {
        // throw new Error("Invalid type hierarchy");
      }
      current = current.tChildren;
    }
    return current.type;
  }

  // get type(): CompositeType | AtomicType {
  //   return this.type;
  // }

  // set type(value: CompositeType | AtomicType) {
  //   this.type = value;
  // }

  // get tChildren(): AbstractType | undefined {
  //   return this.tChildren;
  // }

  // set tChildren(value: AbstractType | undefined) {
  //   if (Object.values(AtomicType).includes(this.type as AtomicType)) {
  //     if (value) {
  //       // // throw new Error(`Type '${this.type}' cannot have children.`);
  //     }
  //     this.tChildren = undefined;
  //   } else if (Object.values(CompositeType).includes(this.type as CompositeType)) {
  //     this.tChildren = value || new AbstractType(AtomicType.Integer);
  //   }
  // }
}

/**
 * @entity interface
 * @fields name, paramType
 */
export interface Parameter {
  name: string;
  paramType: AbstractType;
}

/**
 * @entity class
 * @fields name, parameters, returnType
 */
export class FunctionConfig {
  public name: string;
  public parameters: Parameter[] | VoidType;
  public returnType: AbstractType | VoidType;

  constructor(name: string, parameters: Parameter[] | VoidType, returnType: AbstractType | VoidType) {
    if (parameters === "VoidType" && returnType === "VoidType") {
      // // throw new Error("Both parameters and returnType cannot be 'VoidType'.");
    }
    this.name = name;
    this.parameters = parameters;
    this.returnType = returnType;
  }

  // get name(): string {
  //   return this.name;
  // }

  // set name(value: string) {
  //   this.name = value;
  // }

  // get parameters(): Parameter[] | VoidType {
  //   return this.parameters;
  // }

  // set parameters(value: Parameter[] | VoidType) {
  //   if (value === "VoidType" && this.returnType === "VoidType") {
  //     // // throw new Error("Both parameters and returnType cannot be 'VoidType'.");
  //   }
  //   this.parameters = value;
  // }

  // get returnType(): AbstractType | VoidType {
  //   return this.returnType;
  // }

  // set returnType(value: AbstractType | VoidType) {
  //   if (this.parameters === "VoidType" && value === "VoidType") {
  //     // // throw new Error("Both parameters and returnType cannot be 'VoidType'.");
  //   }
  //   this.returnType = value;
  // }
}

/**
 * @entity class
 * @fields parameters, expectedOutput
 */
export class InputOutput {
  public parameters?: string[];
  public expectedOutput?: string;

  constructor(parameters?: string[], expectedOutput?: string, functionConfig?: FunctionConfig) {
    if (functionConfig) {
      if (functionConfig.parameters !== "VoidType") {
        const paramCount = (functionConfig.parameters as Parameter[]).length;
        if (!parameters || parameters.length !== paramCount) {
          // // throw new Error(
          //   `Expected ${paramCount} parameters, but got ${
          //     parameters ? parameters.length : 0
          //   }.`
          // );
        }
      }

      if (functionConfig.returnType !== "VoidType" && !expectedOutput) {
        // // throw new Error(
        //   "Expected output is required when returnType is not 'VoidType'."
        // );
      }
    }

    this.parameters = parameters;
    this.expectedOutput = expectedOutput;
  }

  // get parameters(): string[] | undefined {
  //   return this.parameters;
  // }

  // set parameters(value: string[] | undefined) {
  //   this.parameters = value;
  // }

  // get expectedOutput(): string | undefined {
  //   return this.expectedOutput;
  // }

  // set expectedOutput(value: string | undefined) {
  //   this.expectedOutput = value;
  // }
}

export type Difficulty = "Easy" | "Medium" | "Hard";

/**
 * @entity class
 * @fields id, title, description, difficulty, category, stats, examples, testCases, functionConfig, languages
 */
export class Question {
  static idCounter = 0;
  public id?: string;
  public title: string;
  public description: string;
  public difficulty: Difficulty;
  public category: string | PredefinedCategory;
  public stats: number = 0;
  public examples: InputOutput[];
  public testCases: InputOutput[];
  public functionConfig: FunctionConfig;
  public languages: (string | SupportedLanguages)[];

  constructor(
    title: string,
    description: string,
    difficulty: Difficulty,
    category: string | PredefinedCategory,
    examples: InputOutput[],
    testCases: InputOutput[],
    functionConfig: FunctionConfig,
    languages: (string | SupportedLanguages)[]
  ) {
    this.publicid = (Question.idCounter++).toString();
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.category = category;

    if (!examples || examples.length < 1) {
      // // throw new Error("At least one example is required.");
    }
    this.examples = examples;

    if (!testCases || testCases.length < 1) {
      // // throw new Error("At least one test case is required.");
    }
    this.testCases = testCases;
    this.functionConfig = functionConfig;

    if (!languages || languages.length < 1) {
      // // throw new Error("At least one language is required.");
    }
    this.languages = languages;
  }

  // get id(): string | undefined {
  //   return this.id;
  // }

  // get title(): string {
  //   return this.title;
  // }

  // set title(value: string) {
  //   this.title = value;
  // }

  // get description(): string {
  //   return this.description;
  // }

  // set description(value: string) {
  //   this.description = value;
  // }

  // get difficulty(): Difficulty {
  //   return this.difficulty;
  // }

  // set difficulty(value: Difficulty) {
  //   this.difficulty = value;
  // }

  // get category(): string | PredefinedCategory {
  //   return this.category;
  // }

  // set category(value: string | PredefinedCategory) {
  //   this.category = value;
  // }

  // get stats(): number {
  //   return this.stats;
  // }

  // set stats(value: number) {
  //   this.stats = value;
  // }

  // get examples(): InputOutput[] {
  //   return this.examples;
  // }

  // set examples(value: InputOutput[]) {
  //   if (!value || value.length < 1) {
  //     // throw new Error("At least one example is required.");
  //   }
  //   this.examples = value;
  // }

  // get testCases(): InputOutput[] {
  //   return this.testCases;
  // }

  // set testCases(value: InputOutput[]) {
  //   if (!value || value.length < 1) {
  //     // throw new Error("At least one test case is required.");
  //   }
  //   this.testCases = value;
  // }

  // get functionConfig(): FunctionConfig {
  //   return this.functionConfig;
  // }

  // set functionConfig(value: FunctionConfig) {
  //   this.functionConfig = value;
  // }

  // get languages(): (string | SupportedLanguages)[] {
  //   return this.languages;
  // }

  // set languages(value: (string | SupportedLanguages)[]) {
  //   if (!value || value.length < 1) {
  //     // throw new Error("At least one language is required.");
  //   }
  //   this.languages = value;
  // }
}

/// this logic is for the backend //////////////////////////////////////////////////
//#region backend

/**
 * @entity interface
 * @fields val, neighbors
 */
export interface GraphNode {
  val: number; // Value of the node
  neighbors: GraphNode[]; // List of neighboring nodes (for graphs)
}

/**
 * @entity interface
 * @fields val, left, right
 */
export interface TreeNode {
  val: number; // Value of the node
  left?: TreeNode; // Left child
  right?: TreeNode; // Right child
}

/**
 * @entity interface
 * @fields val, next
 */
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
