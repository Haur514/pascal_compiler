import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTComposedStatements from "./ast_composed_statements";
import ASTExpression from "./ast_expression";
import ASTLeaf from "./ast_leaf";

class ASTStatementWhile extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.check_syntax_validity(token_list);
  }
  private check_syntax_validity(token_list: Token[]) {
    if (!(token_list[0].token_name === "SWHILE")) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTLeaf(token_list[0]));

    const do_index = Util.index_of_token(token_list, "SDO");
    if (do_index == -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTExpression(token_list.slice(1, do_index)));

    this.addChild(new ASTLeaf(token_list[do_index]));

    this.addChild(
      new ASTComposedStatements(
        token_list.slice(do_index + 1, token_list.length)
      )
    );
  }
}

export default ASTStatementWhile;
