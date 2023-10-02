import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTExpressionArray from "./ast_expression_array";
import ASTInputOutputStatementReadln from "./ast_input_output_statement_readln";
import ASTInputOutputStatementWriteln from "./ast_input_output_statement_writeln";
import ASTLeaf from "./ast_leaf";

class ASTInputOutputStatement extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  make_subtree(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "SWRITELN":
        this.addChild(new ASTInputOutputStatementWriteln(token_list));
        break;
      case "SREADLN":
        this.addChild(new ASTInputOutputStatementReadln(token_list));
        break;
      default:
        throw new SyntaxError(token_list[0].line_num);
        break;
    }
  }
}

export default ASTInputOutputStatement;
