import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpression from "./ast_expression";
import ASTLeaf from "./ast_leaf";

class ASTExpressionArray extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    const split_token = this.split_with_comma(token_list);
    for (let i = 0; i < split_token.length; i++) {
      if (split_token[i][0].token_name === "SCOMMA") {
        this.addChild(new ASTLeaf(split_token[i][0]));
      } else {
        this.addChild(new ASTExpression(split_token[i]));
      }
    }
  }

  split_with_comma(token_list: Token[]) {
    const ret: Token[][] = [];
    let tmp_token: Token[] = [];
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SCOMMA") {
        if (tmp_token.length > 0) {
          ret.push(tmp_token);
          tmp_token = [];
        }
        ret.push([token_list[i]]);
      } else {
        tmp_token.push(token_list[i]);
      }
    }
    if (tmp_token.length > 0) {
      ret.push(tmp_token);
    }
    return ret;
  }
}

export default ASTExpressionArray;
