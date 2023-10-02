import { check } from "prettier";
import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";

class ASTConstant extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    this.check_varidity(token_list);
    this.addChild(new ASTLeaf(token_list[0]));
  }

  private check_varidity(token_list: Token[]) {
    if (token_list.length != 1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    const valid_list = ["SSTRING", "SCONSTANT", "STRUE", "SFALSE"];
    if (!valid_list.includes(token_list[0].token_name)) {
      throw new SyntaxError(token_list[0].line_num);
    }
  }
}

export default ASTConstant;
