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
  Graph = "Graph",
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
  // Java = "Java",
  // Go = "Go",
  // CSharp = "CSharp",
  // Cpp = "Cpp",
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
  LinkedList = "LinkedList",
  Matrix = "Matrix",
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
  return value;
}

/**
 * @entity class
 * @fields type, type_children
 */
export class AbstractType {
  public type: CompositeType | AtomicType;
  public type_children?: AbstractType;

  constructor(type: CompositeType | AtomicType, type_children?: AbstractType) {
    this.type = type;

    // Assign type_children iteratively
    if (type_children) {
      let current: AbstractType = this;
      let child = type_children;

      while (child) {
        // Create a new AbstractType only when a child exists
        current.type_children = new AbstractType(child.type);
        current = current.type_children;
        child = child.type_children;
      }
    }
  }

  /**
   * Assign children to the current AbstractType iteratively.
   */
  setChildrenIteratively(type_children?: AbstractType) {
    let current: AbstractType = this;

    if (!type_children) {
      current.type_children = undefined;
      return;
    }

    let child = type_children;

    while (child) {
      // Create or update the child iteratively
      if (!current.type_children) {
        current.type_children = new AbstractType(child.type);
      } else {
        current.type_children.type = child.type;
      }
      current = current.type_children;
      child = child.type_children;
    }

    // Ensure any remaining type_children in the chain are cleared
    current.type_children = undefined;
  }

  /**
   * Convert the AbstractType to a string representation.
   * Recursively prints composite types with children.
   */
  toPrint(): string {
    if (this.type_children) {
      // Recursive case: composite type with children
      return `${textify(this.type)} < ${this.type_children.toPrint()} >`;
    }
    // Base case: atomic type
    return textify(this.type);
  }

  isConpositeHead(): boolean {
    return Object.values(CompositeType).includes(this.type as CompositeType);
  }

  getTail(): AbstractType {
    if (!this.type_children) {
      // Base case: No children, return this
      return this;
    }
    // Recursive case: Traverse to the deepest child
    return this.type_children.getTail();
  }

  /**
   * Remove the last atomic type from the hierarchy.
   * If it's the only element, return "VoidType" or reset state.
   */
  removeTail(): AbstractType {
    if (!this.type_children) {
      // Base case: Reset to "VoidType" or clear state if atomic
      this.type = AtomicType.Integer; // Reset to default atomic type
      return this;
    }

    // Recursive case: Remove from the deepest child
    if (!this.type_children.type_children) {
      // If the immediate child is atomic, remove it
      this.type_children = undefined;
      return this;
    }

    // Recursive traversal
    this.type_children.removeTail();
    return this;
  }

  /**
   * Add a new atomic type at the tail of the hierarchy.
   * If the current type is atomic, converts it to a composite type with children.
   */
  addTail(newAtomicType: AtomicType = AtomicType.Integer): AbstractType {
    if (!this.type_children) {
      // If no child exists, add a new atomic child
      this.type_children = new AbstractType(newAtomicType);
      return this;
    }

    // Recursive case: Add to the deepest child
    this.type_children.addTail(newAtomicType);
    return this;
  }

  /**
   * Convert the AbstractType hierarchy to a flat list of types.
   */
  toList(): string[] {
    if (this.type_children) {
      // Recursive case: Flatten the hierarchy
      return [textify(this.type), ...this.type_children.toList()];
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
      // console.log("Index out of bounds");
      return; // Index out of bounds
    }

    let current: AbstractType = this;

    for (let i = 0; i < index; i++) {
      if (!current.type_children) {
        // console.log("Invalid hierarchy, no further children");
        return; //
      }
      current = current.type_children;
    }

    // Update the type
    current.type = newType;

    // Handle edge cases
    if (index === typeList.length - 1 && Object.values(CompositeType).includes(newType as CompositeType)) {
      // If the last type is set to a composite, add an Integer child
      if (!current.type_children) {
        current.type_children = new AbstractType(AtomicType.Integer);
      }
    } else if (Object.values(AtomicType).includes(newType as AtomicType)) {
      // If a middle type is set to atomic, truncate its children
      current.type_children = undefined;
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
      if (!current.type_children) {
        // throw new Error("Invalid type hierarchy");
      }
      current = current.type_children;
    }
    return current.type;
  }

  // get type(): CompositeType | AtomicType {
  //   return this.type;
  // }

  // set type(value: CompositeType | AtomicType) {
  //   this.type = value;
  // }

  // get type_children(): AbstractType | undefined {
  //   return this.type_children;
  // }

  // set type_children(value: AbstractType | undefined) {
  //   if (Object.values(AtomicType).includes(this.type as AtomicType)) {
  //     if (value) {
  //       // // throw new Error(`Type '${this.type}' cannot have children.`);
  //     }
  //     this.type_children = undefined;
  //   } else if (Object.values(CompositeType).includes(this.type as CompositeType)) {
  //     this.type_children = value || new AbstractType(AtomicType.Integer);
  //   }
  // }
}

/**
 * @entity interface
 * @fields name, param_type
 */
export interface Parameter {
  name: string;
  param_type: AbstractType;
}

/**
 * @entity class
 * @fields name, parameters, return_type
 */
export class FunctionConfig {
  public name: string;
  public parameters: Parameter[] | VoidType;
  public return_type: AbstractType | VoidType;

  constructor(name: string, parameters: Parameter[] | VoidType, return_type: AbstractType | VoidType) {
    if (parameters === "VoidType" && return_type === "VoidType") {
      // // throw new Error("Both parameters and return_type cannot be 'VoidType'.");
    }
    this.name = name;
    this.parameters = parameters;
    this.return_type = return_type;
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
  //   if (value === "VoidType" && this.return_type === "VoidType") {
  //     // // throw new Error("Both parameters and return_type cannot be 'VoidType'.");
  //   }
  //   this.parameters = value;
  // }

  // get return_type(): AbstractType | VoidType {
  //   return this.return_type;
  // }

  // set return_type(value: AbstractType | VoidType) {
  //   if (this.parameters === "VoidType" && value === "VoidType") {
  //     // // throw new Error("Both parameters and return_type cannot be 'VoidType'.");
  //   }
  //   this.return_type = value;
  // }
}

/**
 * @entity class
 * @fields parameters, expected_output
 */
export class InputOutput {
  public parameters?: string[];
  public expected_output?: string;

  constructor(parameters?: string[], expected_output?: string, function_config?: FunctionConfig) {
    if (function_config) {
      if (function_config.parameters !== "VoidType") {
        const paramCount = (function_config.parameters as Parameter[]).length;
        if (!parameters || parameters.length !== paramCount) {
          // // throw new Error(
          //   `Expected ${paramCount} parameters, but got ${
          //     parameters ? parameters.length : 0
          //   }.`
          // );
        }
      }

      if (function_config.return_type !== "VoidType" && !expected_output) {
        // // throw new Error(
        //   "Expected output is required when return_type is not 'VoidType'."
        // );
      }
    }

    this.parameters = parameters;
    this.expected_output = expected_output;
  }

  // get parameters(): string[] | undefined {
  //   return this.parameters;
  // }

  // set parameters(value: string[] | undefined) {
  //   this.parameters = value;
  // }

  // get expected_output(): string | undefined {
  //   return this.expected_output;
  // }

  // set expected_output(value: string | undefined) {
  //   this.expected_output = value;
  // }
}

export interface Feedback {
  status: "success" | "fail"; // Overall status: success or fail
  results: Result[]; // Array of individual test case results
  error?: "compilation" | "fail tests" | "schema validation" | null; // Error type, if any
  details?: string | null; // Detailed description of the error, if applicable
}

export interface Result {
  status: "pass" | "fail"; // Status of the test case: pass or fail
  parameters: string[]; // Array of strings representing input parameters
  expected_output: string; // Expected output of the test case
  actual_output: string; // Actual output of the test case
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

/**
 * @entity class
 * @fields id, title, description, difficulty, category, stats, examples, test_cases, function_config, languages
 */
export class Question {
  static idCounter = 0;
  public id?: string;
  public title: string;
  public description: string;
  public difficulty: Difficulty;
  public category: PredefinedCategory;
  public stats: number = 0;
  public examples: InputOutput[];
  public test_cases: InputOutput[];
  public function_config: FunctionConfig;
  public languages: SupportedLanguages[];

  constructor(
    id?: string,
    title?: string,
    description?: string,
    difficulty?: string,
    category?: PredefinedCategory,
    examples?: InputOutput[],
    test_cases?: InputOutput[],
    function_config?: FunctionConfig,
    languages?: PredefinedSupportedLanguage[]
  ) {
    this.id = id || undefined;
    this.title = title || "";
    this.description = description || "";
    this.difficulty = difficulty || "Easy";
    this.category = category || PredefinedCategory.Array;
    this.examples = examples || [];
    this.test_cases = test_cases || [];
    this.function_config = function_config || new FunctionConfig("", "VoidType", "VoidType");
    this.languages = languages || [];

    if (!examples || examples.length < 1) {
      // // throw new Error("At least one example is required.");
    }
    // this.examples = examples;

    if (!test_cases || test_cases.length < 1) {
      // // throw new Error("At least one test case is required.");
    }
    // this.test_cases = test_cases;
    // this.function_config = function_config;

    if (!languages || languages.length < 1) {
      // // throw new Error("At least one language is required.");
    }
    // this.languages = languages;
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

  // get test_cases(): InputOutput[] {
  //   return this.test_cases;
  // }

  // set test_cases(value: InputOutput[]) {
  //   if (!value || value.length < 1) {
  //     // throw new Error("At least one test case is required.");
  //   }
  //   this.test_cases = value;
  // }

  // get function_config(): FunctionConfig {
  //   return this.function_config;
  // }

  // set function_config(value: FunctionConfig) {
  //   this.function_config = value;
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
export interface Graph {
  val: number; // Value of the node
  neighbors: Graph[]; // List of neighboring nodes (for graphs)
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
  Graph: {
    val: "Integer",
    neighbors: "Array<Graph>",
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
