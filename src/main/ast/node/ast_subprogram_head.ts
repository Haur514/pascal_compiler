import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTInteger from "./ast_integer";
import ASTSign from "./ast_sign";

class ASTSubprogramHead extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {}
}

export default ASTSubprogramHead;
