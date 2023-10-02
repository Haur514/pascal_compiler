import EmptyTokenException from "../../exception/empty_token_error";
import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpression from "./ast_expression";
import ASTLeaf from "./ast_leaf";
import ASTLeftside from "./ast_leftside";

class ASTAssigmentStatement extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    try {
      this.addChild(
        new ASTLeftside(this.get_token_list_of_leftside(token_list))
      );
      this.addChild(
        new ASTLeaf(token_list[this.get_index_of_assign_token(token_list)])
      );
      this.addChild(
        new ASTExpression(this.get_token_list_of_expression(token_list))
      );
    } catch (error) {
      throw new SyntaxError(token_list[0].line_num);
    }
  }

  // 左辺に該当するトークンを取得
  private get_token_list_of_leftside(token_list: Token[]) {
    const ret = token_list.slice(0, this.get_index_of_assign_token(token_list));
    if (ret.length === 0) {
      throw new EmptyTokenException();
    }
    return ret;
  }

  // 式に該当するトークンを取得
  private get_token_list_of_expression(token_list: Token[]) {
    const ret = token_list.slice(
      this.get_index_of_assign_token(token_list) + 1,
      token_list.length
    );
    if (ret.length === 0) {
      throw new EmptyTokenException();
    }
    return ret;
  }

  // SASSIGNのトークンのインデックスを取得
  private get_index_of_assign_token(token_list: Token[]) {
    let pos = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SASSIGN") {
        pos = i;
        break;
      }
    }
    if (pos === -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    return pos;
  }
}

export default ASTAssigmentStatement;
