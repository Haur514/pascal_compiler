import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTVariableDeclaration extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
  }
}

export default ASTVariableDeclaration;
