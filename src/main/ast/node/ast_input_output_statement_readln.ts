import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpressionArray from "./ast_expression_array";
import ASTLeaf from "./ast_leaf";

class ASTInputOutputStatementReadln extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  make_subtree(token_list: Token[]) {}
}

export default ASTInputOutputStatementReadln;
