import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTExpression from "./ast_expression";

class ASTSuffix extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    this.addChild(new ASTExpression(token_list));
  }
}

export default ASTSuffix;
