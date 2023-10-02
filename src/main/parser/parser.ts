import ASTBuilder from "../ast/astbuilder";
import Token from "../lexer/token";

class Parser {
  // 抽象構文木を構築し，最上位ノードを返す
  run(token_list: Token[]) {
    return new ASTBuilder().build(token_list);
  }
}

export default Parser;
