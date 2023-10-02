import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTComposedStatements from "./ast_composed_statements";
import ASTSubprogramHead from "./ast_subprogram_head";
import ASTVariableDeclaration from "./ast_variable_declaration";

class ASTSubprogramDeclaration extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    this.addChild(
      new ASTSubprogramHead(this.get_token_list_of_subprogram_head(token_list))
    );
    this.addChild(
      new ASTVariableDeclaration(
        this.get_token_list_of_variable_declaration(token_list)
      )
    );
    this.addChild(
      new ASTComposedStatements(
        this.get_token_list_of_composed_statement(token_list)
      )
    );
  }

  // 副プログラム頭部のトークン列を取得
  private get_token_list_of_subprogram_head(token_list: Token[]) {
    let right = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (
        token_list[i].token_name === "SVAR" ||
        token_list[i].token_name === "SBEGIN"
      ) {
        right = i;
        break;
      }
    }
    return token_list.slice(0, right);
  }

  // 変数宣言部のトークン列を取得
  private get_token_list_of_variable_declaration(token_list: Token[]) {
    let left = -1;
    let right = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SVAR" && left === -1) {
        left = i;
      }
      if (token_list[i].token_name === "SBEGIN") {
        right = i;
        break;
      }
    }
    if (left === -1) {
      return [];
    } else {
      return token_list.slice(left, right);
    }
  }

  // 複合分部のトークン列を取得
  private get_token_list_of_composed_statement(token_list: Token[]) {
    let left = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SBEGIN") {
        left = i;
        break;
      }
    }
    if (left === -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    return token_list.slice(left, token_list.length);
  }
}
export default ASTSubprogramDeclaration;
