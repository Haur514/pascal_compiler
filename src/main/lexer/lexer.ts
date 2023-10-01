// Lexer.run(pascal_program/*パスカルのプログラム*/)を与えらえると，

import Token from "./token";

// トークンを切り出し配列で返す
class Lexer {
  run(pascal_program: string) {
    const token_list: Token[] = [];
    const pascal_statements = pascal_program.split("\n");
    for (let i = 0; i < pascal_statements.length; i++) {
      const tokenized_list = this.tokenize(pascal_statements[i]);
      for (let j = 0; j < tokenized_list.length; j++) {
        token_list.push(new Token(tokenized_list[j], i + 1));
      }
    }

    return token_list;
  }

  // パスカルのプログラムを1行与えられると，それをトークンにしてリスト形式で返す
  tokenize(statement: string) {
    statement = statement.trim();
    let is_current_character_in_natural_string = false;

    const token_candidate_list: string[] = [];
    let current_token = "";
    for (let i = 0; i < statement.length; i++) {
      const current_char = statement.charAt(i);

      if (is_current_character_in_natural_string) {
        is_current_character_in_natural_string =
          !is_current_character_in_natural_string;
      } else {
        if (this.is_delimiter(current_char)) {
          this.add_token(token_candidate_list, current_token);
          this.add_token(token_candidate_list, current_char);
          current_token = "";
        } else {
          current_token += current_char;
        }
      }
      if (this.is_quote(current_char)) {
        is_current_character_in_natural_string =
          !is_current_character_in_natural_string;
      }
    }
    this.add_token(token_candidate_list, current_token);
    const token_list = this.purificate_token_candidate(token_candidate_list);
    return token_list;
  }

  // トークンの中身が空白以外の場合，リストに追加する．空白の場合はしない．
  add_token(token_list: string[], token: string) {
    if (token.trim() == "") {
      return;
    }
    token_list.push(token);
  }

  //区切り文字「:」「;」を検出する
  is_delimiter(current_char: string) {
    const delimiter = [
      ":",
      ";",
      " ",
      "\t",
      "(",
      ")",
      ".",
      "=",
      "<",
      ">",
      "+",
      "-",
      "*",
      "/",
      "[",
      "]",
      ",",
    ];
    return delimiter.includes(current_char);
  }

  is_quote(char: string) {
    if (char == '"') {
      return true;
    }
    return false;
  }

  purificate_token_candidate(token_candidate_list: string[]) {
    const ret: string[] = [];

    for (let i = 0; i < token_candidate_list.length; i++) {
      const current_token = token_candidate_list[i];
      let next_token;
      if (i + 1 < token_candidate_list.length) {
        next_token = token_candidate_list[i + 1];
      }
      switch (current_token) {
        case "<":
          if (next_token == "=") {
            ret.push("<=");
            i += 1;
          } else if (next_token == ">") {
            ret.push("<>");
            i += 1;
          } else {
            ret.push("<");
          }
          break;
        case ">":
          if (next_token == "=") {
            ret.push(">=");
            i += 1;
          } else {
            ret.push(">");
          }
          break;
        case ".":
          if (next_token == ".") {
            ret.push("..");
            i += 1;
          } else {
            ret.push(".");
          }
          break;
        case ":":
          if (next_token == "=") {
            ret.push(":=");
            i += 1;
          } else {
            ret.push(":");
          }
          break;
        default:
          ret.push(current_token);
          break;
      }
    }
    return ret;
  }
}

export default Lexer;
