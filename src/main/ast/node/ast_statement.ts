import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTStandartStatement from "./ast_standart_statement";
import ASTStatementIf from "./ast_statement_if";
import ASTStatementWhile from "./ast_statement_while";

class ASTStatement extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "SIF":
        this.addChild(new ASTStatementIf(token_list));
        break;
      case "SWHILE":
        this.addChild(new ASTStatementWhile(token_list));
        break;
      default:
        this.addChild(new ASTStandartStatement(token_list));
        break;
    }
  }
}

export default ASTStatement;
