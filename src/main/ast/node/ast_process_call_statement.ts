import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTExpressionArray from "./ast_expression_array";
import ASTLeaf from "./ast_leaf";
import ASTProcessName from "./ast_process_name";

class ASTProcessCallStatement extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    this.addChild(new ASTProcessName(token_list[0]));
    if (this.do_have_paren(token_list)) {
      if (!(token_list[1].token_name === "SLPAREN")) {
        throw new SyntaxError(token_list[1].line_num);
      }
      this.addChild(new ASTLeaf(token_list[1]));

      this.addChild(
        new ASTExpressionArray(token_list.slice(2, token_list.length - 1))
      );

      if (!(token_list[token_list.length - 1].token_name === "SRPAREN")) {
        throw new SyntaxError(token_list[token_list.length - 1].line_num);
      }
      this.addChild(new ASTLeaf(token_list[token_list.length - 1]));
    } else {
      if (token_list.length > 1) {
        throw new SyntaxError(token_list[0].line_num);
      }
    }
  }

  private do_have_paren(token_list: Token[]) {
    if (Util.index_of_token(token_list, "SLPAREN") >= 0) {
      return true;
    }
    return false;
  }
}

export default ASTProcessCallStatement;
