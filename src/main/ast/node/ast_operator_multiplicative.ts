import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTOperatorMultiplicative extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {}
}

export default ASTOperatorMultiplicative;
