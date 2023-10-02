import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTProgramName extends ASTNode {
  constructor(token_list: Token) {
    super([token_list]);
    // this.addChild(null);
  }
}

export default ASTProgramName;
