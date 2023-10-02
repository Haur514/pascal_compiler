import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";

class ASTIdentifier extends ASTNode {
  constructor(token: Token) {
    super([token]);
    this.check_validity(token);
  }

  // 要件を満たしているかチェック
  check_validity(token: Token) {
    if (!token.token_word.charAt(0).match(/^[A-Za-z]*$/)) {
      throw new SyntaxError(token.line_num);
    }
    for (let i = 1; i < token.token_word.length; i++) {
      if (!token.token_word.charAt(i).match(/^[A-Za-z0-9]*$/)) {
        throw new SyntaxError(token.line_num);
      }
    }
    return true;
  }
}

export default ASTIdentifier;
