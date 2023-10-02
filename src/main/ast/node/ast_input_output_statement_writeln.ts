import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpressionArray from "./ast_expression_array";
import ASTLeaf from "./ast_leaf";

class ASTInputOutputStatementWriteln extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  make_subtree(token_list: Token[]) {
    if (!(token_list[0].token_name === "SWRITELN")) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTLeaf(token_list[0]));

    if (token_list.length > 1) {
      if (token_list[1].token_name === "SLPAREN") {
        this.addChild(new ASTLeaf(token_list[1]));
      } else {
        throw new SyntaxError(token_list[1].line_num);
      }

      if (token_list.length - 1 <= 2) {
        throw new SyntaxError(token_list[1].line_num);
      }
      this.addChild(
        new ASTExpressionArray(token_list.slice(2, token_list.length - 1))
      );

      if (token_list[token_list.length - 1].token_name === "SRPAREN") {
        this.addChild(new ASTLeaf(token_list[token_list.length - 1]));
      } else {
        throw new SyntaxError(token_list[token_list.length - 1].line_num);
      }
    }
  }
}

export default ASTInputOutputStatementWriteln;
