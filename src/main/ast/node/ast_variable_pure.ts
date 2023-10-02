import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";

class ASTVariablePure extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {}
}

export default ASTVariablePure;
