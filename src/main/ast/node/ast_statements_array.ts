import Token from "../../lexer/token";
import ASTNode from "../astnode";
import Util from "../../util/util";
import ASTStatement from "./ast_statement";
import ASTLeaf from "./ast_leaf";
import SyntaxError from "../../exception/syntax_error";

class ASTStatementsArray extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  private make_subtree(token_list: Token[]) {
    const split_token_list = this.split_statements_array(token_list);
    for (let i = 0; i < split_token_list.length; i++) {
      const target_token_list = split_token_list[i];
      this.addChild(
        new ASTStatement(
          target_token_list.slice(0, target_token_list.length - 1)
        )
      );
      if (
        target_token_list[target_token_list.length - 1].token_name ===
        "SSEMICOLON"
      ) {
        this.addChild(
          new ASTLeaf(target_token_list[target_token_list.length - 1])
        );
      } else {
        throw new SyntaxError(target_token_list[0].line_num);
      }
    }
  }

  // 文の並びを分解し，文のリストを返す
  private split_statements_array(token_list: Token[]) {
    const ret: Token[][] = [];
    let tmp_token_list: Token[] = [];
    let begin_counter = 0;
    let end_counter = 0;
    for (let i = 0; i < token_list.length; i++) {
      tmp_token_list.push(token_list[i]);
      switch (token_list[i].token_name) {
        case "SBEGIN":
          begin_counter++;
          break;
        case "SEND":
          end_counter++;
          break;
        case "SSEMICOLON":
          if (begin_counter === end_counter) {
            begin_counter = 0;
            end_counter = 0;
            ret.push(tmp_token_list);
            tmp_token_list = [];
          }
          break;
      }
    }
    if (tmp_token_list.length > 0) {
      ret.push(tmp_token_list);
    }
    return ret;
  }
}

export default ASTStatementsArray;
