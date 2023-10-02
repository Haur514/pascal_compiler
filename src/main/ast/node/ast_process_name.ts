import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import SyntaxError from "../../exception/syntax_error";

class ASTProcessName extends ASTNode {
  constructor(token: Token) {
    super([token]);
    this.make_subtree(token);
  }

  private make_subtree(token: Token) {
    if (!(token.token_name === "SIDENTIFIER")) {
      throw new SyntaxError(token.line_num);
    }
    this.addChild(new ASTLeaf(token));
  }
}

export default ASTProcessName;
