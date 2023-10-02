import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";

class ASTSign extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.check_syntax_validity(token_list);
  }
  check_syntax_validity(token_list: Token[]) {
    if (token_list.length != 1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    if (
      token_list[0].token_name != "SPLUS" &&
      token_list[0].token_name != "SMINUS"
    ) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTLeaf(token_list[0]));
  }
}

export default ASTSign;
