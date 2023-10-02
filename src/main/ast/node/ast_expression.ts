import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpressionSimple from "./ast_expression_simple";
import ASTLeaf from "./ast_leaf";
import SyntaxError from "../../exception/syntax_error";

class ASTExpression extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    const index = this.get_index_of_relational_operator(token_list);

    if (index === -1) {
      this.addChild(new ASTExpressionSimple(token_list));
    } else {
      if (index === 0 || index === token_list.length - 1) {
        throw new SyntaxError(token_list[0].line_num);
      }
      this.addChild(new ASTExpressionSimple(token_list.slice(0, index)));
      this.addChild(new ASTLeaf(token_list[index]));
      this.addChild(
        new ASTExpressionSimple(token_list.slice(index + 1, token_list.length))
      );
    }
  }

  // 関係演算子のインデックスを取得する．ただし，括弧の中に含まれている場合には無視する．
  private get_index_of_relational_operator(token_list: Token[]) {
    const relational_operators = ["=", "<>", "<", "<=", ">", ">="];
    let left_paren_counter = 0;
    let right_paren_counter = 0;
    let is_in_paren = false;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SLPAREN") {
        is_in_paren = true;
        left_paren_counter++;
        continue;
      } else if (token_list[i].token_name === "SRPAREN") {
        right_paren_counter++;
        continue;
      }
      if (left_paren_counter === right_paren_counter) {
        is_in_paren = false;
      }
      if (is_in_paren) {
        continue;
      }

      if (relational_operators.includes(token_list[i].token_word)) {
        return i;
      }
    }
    return -1;
  }
}

export default ASTExpression;
