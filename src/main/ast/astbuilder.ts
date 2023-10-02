import Token from "../lexer/token";
import ASTProgram from "./node/ast_program";

class ASTBuilder {
  build(token_list: Token[]) {
    return new ASTProgram(token_list);
  }
}

export default ASTBuilder;
