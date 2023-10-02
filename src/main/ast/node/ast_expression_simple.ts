import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTSign from "./ast_sign";
import ASTTerm from "./ast_term";
import SyntaxError from "../../exception/syntax_error";
import ASTOperatorAddition from "./ast_operator_addition";
import ASTLeaf from "./ast_leaf";

class ASTExpressionSimple extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    // 項が始まるインデックスを指定．符号があるかないかで決定．
    let start_point = 0;
    if (this.have_sign(token_list)) {
      this.addChild(new ASTSign(token_list.slice(0, 1)));
      start_point = 1;
    }

    const split_token = this.split_token_with_operator_addition(
      token_list.slice(start_point, token_list.length)
    );

    if (split_token.length === 0 || split_token.length % 2 == 0) {
      throw new SyntaxError(token_list[0].line_num);
    }

    for (let i = 0; i < split_token.length; i++) {
      if (i % 2 === 0) {
        this.addChild(new ASTTerm(split_token[i]));
      } else {
        if (split_token[i].length != 1) {
          throw new SyntaxError(token_list[0].line_num);
        }
        this.addChild(new ASTLeaf(split_token[i][0]));
      }
    }
  }

  // 加法演算子か判別
  private is_operator_addition(token_list: Token[]) {
    const op_add_list = ["SPLUS", "SMINUS", "SOR"];

    return (
      token_list.length === 1 && op_add_list.includes(token_list[0].token_name)
    );
  }

  // 符号ありか判別
  private have_sign(token_list: Token[]) {
    const sign_list = ["SPLUS", "SMINUS"];
    return sign_list.includes(token_list[0].token_name);
  }

  // 加法演算子ごとにトークン列を分断
  private split_token_with_operator_addition(token_list: Token[]) {
    const op_add_list = ["SPLUS", "SMINUS", "SOR"];
    const ret: Token[][] = [];
    let tmp: Token[] = [];
    let left_paren_coutner = 0;
    let right_paren_counter = 0;
    let is_in_paren = false;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SLPAREN") {
        left_paren_coutner++;
        is_in_paren = true;
      } else if (token_list[i].token_name === "SRPAREN") {
        right_paren_counter++;
      }
      if (left_paren_coutner === right_paren_counter) {
        is_in_paren = false;
      }
      if (is_in_paren) {
        continue;
      }

      if (op_add_list.includes(token_list[i].token_name)) {
        if (tmp.length > 0) {
          ret.push(tmp);
        }
        ret.push([token_list[i]]);
        tmp = [];
      } else {
        tmp.push(token_list[i]);
      }
    }
    if (tmp.length > 0) {
      ret.push(tmp);
    }
    return ret;
  }
}

export default ASTExpressionSimple;
