interface token_dict_type {
  [key: string]: { id: number; name: string };
}

const token_dict: token_dict_type = {
  and: {
    id: 0,
    name: "SAND",
  },
  array: {
    id: 1,
    name: "SARRAY",
  },
  begin: {
    id: 2,
    name: "SBEGIN",
  },
  boolean: {
    id: 3,
    name: "SBOOLEAN",
  },
  char: {
    id: 4,
    name: "SCHAR",
  },
  "/": {
    id: 5,
    name: "SDIVD",
  },
  div: {
    id: 5,
    name: "SDIVD",
  },
  do: {
    id: 6,
    name: "SDO",
  },
  else: {
    id: 7,
    name: "SELSE",
  },
  end: {
    id: 8,
    name: "SEND",
  },
  false: {
    id: 9,
    name: "SFALSE",
  },
  if: {
    id: 10,
    name: "SIF",
  },
  integer: {
    id: 11,
    name: "SINTEGER",
  },
  mod: {
    id: 12,
    name: "SMOD",
  },
  not: {
    id: 13,
    name: "SNOT",
  },
  of: {
    id: 14,
    name: "SOF",
  },
  or: {
    id: 15,
    name: "SOR",
  },
  procedure: {
    id: 16,
    name: "SPROCEDURE",
  },
  program: {
    id: 17,
    name: "SPROGRAM",
  },
  readln: {
    id: 18,
    name: "SREADLN",
  },
  then: {
    id: 19,
    name: "STHEN",
  },
  true: {
    id: 20,
    name: "STRUE",
  },
  var: {
    id: 21,
    name: "SVAR",
  },
  while: {
    id: 22,
    name: "SWHILE",
  },
  writeln: {
    id: 23,
    name: "SWRITELN",
  },
  "=": {
    id: 24,
    name: "SEQUAL",
  },
  "<>": {
    id: 25,
    name: "SNOTEQUAL",
  },
  "<": {
    id: 26,
    name: "SLESS",
  },
  "<=": {
    id: 27,
    name: "SLESSEQUAL",
  },
  ">=": {
    id: 28,
    name: "SGREATEQUAL",
  },
  ">": {
    id: 29,
    name: "SGREAT",
  },
  "+": {
    id: 30,
    name: "SPLUS",
  },
  "-": {
    id: 31,
    name: "SMINUS",
  },
  "*": {
    id: 32,
    name: "SSTAR",
  },
  "(": {
    id: 33,
    name: "SLPAREN",
  },
  ")": {
    id: 34,
    name: "SRPAREN",
  },
  "[": {
    id: 35,
    name: "SLBRACKET",
  },
  "]": {
    id: 36,
    name: "SRBRACKET",
  },
  ";": {
    id: 37,
    name: "SSEMICOLON",
  },
  ":": {
    id: 38,
    name: "SCOLON",
  },
  "..": {
    id: 39,
    name: "SRANGE",
  },
  ":=": {
    id: 40,
    name: "SASSIGN",
  },
  ",": {
    id: 41,
    name: "SCOMMA",
  },
  ".": {
    id: 42,
    name: "SDOT",
  },
};

class Token {
  token_id: number;
  token_word: string;
  token_name: string;
  line_num: number;

  constructor(token_word: string, line_num: number) {
    this.token_word = token_word;
    this.token_id = this.get_token_label(token_word)[0];
    this.token_name = this.get_token_label(token_word)[1];
    this.line_num = line_num;
  }

  get_token_label(token_word: string): [number, string] {
    if (token_word in token_dict) {
      return [token_dict[token_word]["id"], token_dict[token_word]["name"]];
    } else {
      if (Number.isNaN(token_word)) {
        return [44, "SCONSTANT"];
      } else if (token_word.startsWith("'") && token_word.endsWith("'")) {
        return [45, "SSTRING"];
      } else {
        return [43, "SIDENTIFIER"];
      }
    }
  }

  toString() {
    return (
      this.token_word +
      "\t" +
      this.token_name +
      "\t" +
      this.token_id +
      "\t" +
      this.line_num
    );
  }
}

export default Token;
