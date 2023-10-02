import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTInteger extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  private make_subtree(token_list: Token[]) {
    if (token_list.length != 1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.check_varidity(token_list[0]);
  }

  private check_varidity(token: Token) {
    for (let i = 0; i < token.token_word.length; i++) {
      if (
        token.token_word.charAt(i) < "0" ||
        "9" < token.token_word.charAt(i)
      ) {
        throw new SyntaxError(token.line_num);
      }
    }
  }
}

export default ASTInteger;
