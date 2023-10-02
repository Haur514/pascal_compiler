import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTOperatorMultiplicative from "./ast_operator_multiplicative";
import SyntaxError from "../../exception/syntax_error";
import ASTFactor from "./ast_factor";

class ASTTerm extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    const split_token =
      this.split_token_with_operator_multiplicative(token_list);

    for (let i = 0; i < split_token.length; i++) {
      // インデックスの偶奇で加法演算子か判別
      if (i % 2 === 0) {
        this.addChild(new ASTFactor(split_token[i]));
      } else {
        if (this.is_operator_multiplicative(split_token[i])) {
          this.addChild(new ASTOperatorMultiplicative(split_token[i]));
        } else {
          throw new SyntaxError(split_token[i][0].line_num);
        }
      }
    }
  }

  // 乗法演算子か判別
  private is_operator_multiplicative(token_list: Token[]) {
    const op_mult_list = ["SSTAR", "SDIVD", "SMOD", "SAND"];
    return (
      token_list.length === 1 && op_mult_list.includes(token_list[0].token_name)
    );
  }

  // 乗法演算子によってトークン列をスプリット
  // ただし，括弧で囲まれている部分に関しては分割しない．
  private split_token_with_operator_multiplicative(token_list: Token[]) {
    const op_mult_list = ["SSTAR", "SDIVD", "SMOD", "SAND"];
    const ret: Token[][] = [];
    let tmp: Token[] = [];
    let is_in_paren = false;
    let left_paren_counter = 0;
    let right_paren_counter = 0;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SLPAREN") {
        tmp.push(token_list[i]);
        is_in_paren = true;
        left_paren_counter++;
        continue;
      } else if (token_list[i].token_name === "SRPAREN") {
        tmp.push(token_list[i]);
        right_paren_counter++;
        continue;
      }

      if (left_paren_counter === right_paren_counter) {
        is_in_paren = false;
      }

      if (is_in_paren) {
        continue;
      }

      if (op_mult_list.includes(token_list[i].token_name)) {
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

export default ASTTerm;
