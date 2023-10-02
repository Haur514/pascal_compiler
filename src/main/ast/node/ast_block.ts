import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTSubprogramDeclarationGroup from "./ast_subprogram_declaration_group";
import ASTVariableDeclaration from "./ast_variable_declaration";

class ASTBlock extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    const variable_declaration_range =
      this.get_range_variable_declaration(token_list);
    if (variable_declaration_range[1] >= variable_declaration_range[0]) {
      this.addChild(
        new ASTVariableDeclaration(
          token_list.slice(
            variable_declaration_range[0],
            variable_declaration_range[1] + 1
          )
        )
      );
    }

    const subprogram_declaration_group_range =
      this.get_range_subprogram_declaration_group(token_list);
    if (
      subprogram_declaration_group_range[1] >=
      subprogram_declaration_group_range[0]
    ) {
      this.addChild(
        new ASTSubprogramDeclarationGroup(
          token_list.slice(
            subprogram_declaration_group_range[0],
            subprogram_declaration_group_range[1] + 1
          )
        )
      );
    }
  }

  // トークンの，変数宣言部のインデックスを取得する．両端を含む．
  get_range_variable_declaration(token_list: Token[]): [number, number] {
    return [0, this.get_procedure_token_index(token_list) - 1];
  }

  // トークンの，副プログラム宣言群のインデックスを取得する．両端を含む．
  get_range_subprogram_declaration_group(
    token_list: Token[]
  ): [number, number] {
    return [this.get_procedure_token_index(token_list), token_list.length - 1];
  }

  // procedure のトークンのインデックスを取得する．
  get_procedure_token_index(token_list: Token[]) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SPROCEDURE") {
        return i;
      }
    }
    // 存在しなかった場合
    return token_list.length;
  }
}

export default ASTBlock;
