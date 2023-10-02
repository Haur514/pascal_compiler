import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import ASTSubprogramDeclaration from "./ast_subprogram_declaration";

class ASTSubprogramDeclarationGroup extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    const split_token_list =
      this.split_subprogram_declaration_array(token_list);
    for (let i = 0; i < split_token_list.length; i++) {
      const target_token_list = split_token_list[i];
      this.addChild(
        new ASTSubprogramDeclaration(
          target_token_list.slice(0, target_token_list.length - 1)
        )
      );
      if (
        target_token_list[target_token_list.length - 1].token_name !=
        "SSEMICOLON"
      ) {
        throw new SyntaxError(
          target_token_list[target_token_list.length - 1].line_num
        );
      }
      this.addChild(
        new ASTLeaf(target_token_list[target_token_list.length - 1])
      );
    }
  }

  // 1個あたりの副プログラム宣言を分解し，リストで返す．
  private split_subprogram_declaration_array(token_list: Token[]) {
    const ret: Token[][] = [];
    let tmp_token_list: Token[] = [];
    let begin_counter = 0;
    let end_counter = 0;
    for (let i = 0; i < token_list.length; i++) {
      tmp_token_list.push(token_list[i]);
      switch (token_list[i].token_name) {
        case "SBEGIN":
          begin_counter++;
          break;
        case "SEND":
          end_counter++;
          break;
        case "SSEMICOLON":
          if (begin_counter === end_counter) {
            if (i > 0 && token_list[i - 1].token_name === "SEND") {
              begin_counter = 0;
              end_counter = 0;
              ret.push(tmp_token_list);
              tmp_token_list = [];
            }
          }
          break;
      }
    }
    if (tmp_token_list.length > 0) {
      ret.push(tmp_token_list);
    }
    return ret;
  }
}

export default ASTSubprogramDeclarationGroup;
