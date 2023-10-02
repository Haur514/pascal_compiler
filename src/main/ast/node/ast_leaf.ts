import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTLeaf extends ASTNode {
  constructor(token: Token) {
    super([token]);
  }
}

export default ASTLeaf;
