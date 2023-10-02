import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTIdentifier from "./ast_identifier";

class ASTProgramName extends ASTNode {
  constructor(token_list: Token) {
    super([token_list]);
    this.addChild(new ASTIdentifier(token_list));
  }
}
[];
export default ASTProgramName;
