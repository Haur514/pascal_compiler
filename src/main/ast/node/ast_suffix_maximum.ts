import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTInteger from "./ast_integer";
import ASTSign from "./ast_sign";

class ASTSuffixMinimum extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    if (
      token_list[0].token_name === "SPLUS" ||
      token_list[0].token_name === "SMINUS"
    ) {
      this.addChild(new ASTSign([token_list[0]]));
      this.addChild(new ASTInteger(token_list.slice(1, token_list.length)));
    } else {
      this.addChild(new ASTInteger(token_list));
    }
  }
}

export default ASTSuffixMinimum;
