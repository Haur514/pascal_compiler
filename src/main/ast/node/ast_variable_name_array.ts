import ASTNode from "../astnode";
import Token from "../../lexer/token";

class ASTVariableNameArray extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
  }
}

export default ASTVariableNameArray;
