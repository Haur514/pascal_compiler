import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import ASTVariableDeclarationArray from "./ast_variable_declaration_array";

class ASTVariableDeclaration extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    if (token_list.length > 0) {
      if (token_list[0].token_name === "SVAR") {
        this.addChild(new ASTLeaf(token_list[0]));
      } else {
        throw new SyntaxError(token_list[0].line_num);
      }
      this.addChild(
        new ASTVariableDeclarationArray(token_list.slice(1, token_list.length))
      );
    }
  }
}

export default ASTVariableDeclaration;
