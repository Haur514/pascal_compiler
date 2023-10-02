import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import SyntaxError from "../../exception/syntax_error";

class ASTFormStandart extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  make_subtree(token_list: Token[]) {
    if (token_list.length != 1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    switch (token_list[0].token_name) {
      case "SINTEGER":
      case "SCHAR":
      case "SBOOLEAN":
        this.addChild(new ASTLeaf(token_list[0]));
        break;
      default:
        throw new SyntaxError(token_list[0].line_num);
        break;
    }
  }
}

export default ASTFormStandart;
