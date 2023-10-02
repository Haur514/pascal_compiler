import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTAssigmentStatement from "./ast_assignment_statement";
import ASTComposedStatements from "./ast_composed_statements";
import ASTInputOutputStatement from "./ast_input_output_statement";
import ASTProcessCallStatement from "./ast_process_call_statement";

class ASTStandartStatement extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "SREADLN":
      case "SWRITELN":
        this.addChild(new ASTInputOutputStatement(token_list));
        break;
      case "SBEGIN":
        this.addChild(new ASTComposedStatements(token_list));
        break;
      // 代入文 or 手続き呼び出し文
      default:
        if (this.is_assigment_statement(token_list)) {
          this.addChild(new ASTAssigmentStatement(token_list));
        } else {
          this.addChild(new ASTProcessCallStatement(token_list));
        }
        break;
    }
  }

  // 与えたトークン列が代入文か判定する
  private is_assigment_statement(token_list: Token[]) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SASSIGN") {
        return true;
      }
    }
    return false;
  }
}

export default ASTStandartStatement;
