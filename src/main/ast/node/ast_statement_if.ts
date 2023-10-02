import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTComposedStatements from "./ast_composed_statements";
import ASTExpression from "./ast_expression";
import ASTLeaf from "./ast_leaf";

class ASTStatementIf extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.check_syntax_validity(token_list);
  }
  private check_syntax_validity(token_list: Token[]) {
    if (!(token_list[0].token_name === "SIF")) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTLeaf(token_list[0]));

    const then_index = Util.index_of_token(token_list, "STHEN");
    if (then_index <= 1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTExpression(token_list.slice(1, then_index)));

    this.addChild(new ASTLeaf(token_list[then_index]));

    const composed_range = this.get_range_of_composed_statement(token_list);
    if (composed_range.start === -1 || composed_range.end === -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    if (composed_range.end + 1 < composed_range.start) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(
      new ASTComposedStatements(
        token_list.slice(composed_range.start, composed_range.end + 1)
      )
    );

    if (composed_range.end + 2 < token_list.length) {
      if (!(token_list[composed_range.end + 1].token_name === "SELSE")) {
        throw new SyntaxError(token_list[composed_range.end + 1].line_num);
      }
      this.addChild(new ASTLeaf(token_list[composed_range.end + 1]));

      this.addChild(
        new ASTComposedStatements(
          token_list.slice(composed_range.end + 2, token_list.length)
        )
      );
    }
  }

  // 1個目の複合文の範囲を取得する
  private get_range_of_composed_statement(token_list: Token[]) {
    let start = -1;
    let end = -1;
    let begin_counter = 0;
    let end_counter = 0;
    let find_flag = true;
    for (let i = 0; i < token_list.length && find_flag; i++) {
      switch (token_list[i].token_name) {
        case "SBEGIN":
          if (start === -1) {
            start = i;
          }
          begin_counter++;
          break;
        case "SEND":
          end_counter++;
          if (begin_counter === end_counter) {
            end = i;
            find_flag = false;
          }
          break;
      }
    }
    return { start: start, end: end };
  }
}

export default ASTStatementIf;
