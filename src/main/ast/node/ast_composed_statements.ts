import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import ASTStatementsArray from "./ast_statements_array";

class ASTComposedStatements extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    if (token_list[0].token_name === "SBEGIN") {
      this.addChild(new ASTLeaf(token_list[0]));
    } else {
      throw new SyntaxError(token_list[0].line_num);
    }

    this.addChild(
      new ASTStatementsArray(token_list.slice(1, token_list.length - 1))
    );

    if (token_list[token_list.length - 1].token_name == "SEND") {
      this.addChild(new ASTLeaf(token_list[token_list.length - 1]));
    } else {
      throw new SyntaxError(token_list[token_list.length - 1].line_num);
    }
  }
}

export default ASTComposedStatements;
