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
  program: {
    id: 17,
    name: "SPROGRAM",
  },
};

class Token {
  token_id: number;
  token_word: string;
  token_name: string;
  line_num: number;

  constructor(token_word: string, line_num: number) {
    this.token_word = token_word;
    this.token_id = this.get_token_id(token_word);
    this.token_name = this.get_token_name(token_word);
    this.line_num = line_num;
  }

  get_token_id(token_word: string) {
    if (token_word in token_dict) {
      return token_dict[token_word]["id"];
    } else {
      if (Number.isNaN(token_word)) {
        return 44;
      } else if (token_word.startsWith('"')) {
        return 45;
      } else {
        return 43;
      }
    }
  }

  get_token_name(token_word: string) {
    if (token_word in token_dict) {
      return token_dict[token_word]["name"];
    } else {
      if (Number.isNaN(token_word)) {
        return "SCONSTANT";
      } else if (token_word.startsWith('"')) {
        return "SSTRING";
      } else {
        return "SIDENTIFIER";
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
