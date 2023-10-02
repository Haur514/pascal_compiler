import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTForm from "./ast_form";
import ASTLeaf from "./ast_leaf";
import ASTVariableNameArray from "./ast_variable_name_array";

class ASTVariableDeclarationArray extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    const split_token: Token[][] = this.split_token_with_semicolon(token_list);
    for (let i = 0; i < split_token.length; i++) {
      const target_token = split_token[i];

      const variable_name_array = target_token.slice(
        0,
        this.search_colon(target_token)
      );
      this.addChild(new ASTVariableNameArray(variable_name_array));

      this.addChild(new ASTLeaf(target_token[this.search_colon(target_token)]));

      const form = target_token.slice(
        this.search_colon(target_token) + 1,
        target_token.length - 1
      );
      this.addChild(new ASTForm(form));

      if (target_token[target_token.length - 1].token_name != "SSEMICOLON") {
        throw new SyntaxError(target_token[target_token.length - 1].line_num);
      }
    }
  }

  // 与えられたトークン列内に存在する":"のトークンのインデックスを取得する．存在しない場合，SyntaxErrorを出力.
  search_colon(token_list: Token[]) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SCOLON") {
        return i;
      }
    }
    throw new SyntaxError(token_list[0].line_num);
  }

  // 与えられたトークン列を";"で区切る．
  // 返り値: [[Token,Token,Token,...,Token],[Token,Token,...,Token]]
  split_token_with_semicolon(token_list: Token[]) {
    const ret: Token[][] = [];
    let tmp_token_list: Token[] = [];
    for (let i = 0; i < token_list.length; i++) {
      tmp_token_list.push(token_list[i]);
      if (token_list[i].token_name === "SSEMICOLON") {
        ret.push(tmp_token_list);
        tmp_token_list = [];
      }
    }
    if (tmp_token_list.length > 0) {
      ret.push(tmp_token_list);
    }
    return ret;
  }
}

export default ASTVariableDeclarationArray;
