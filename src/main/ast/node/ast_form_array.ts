import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTFormStandart from "./ast_form_standart";
import ASTLeaf from "./ast_leaf";
import ASTSuffixMinimum from "./ast_suffix_minimum";

class ASTFormArray extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }
  make_subtree(token_list: Token[]) {
    if (token_list[0].token_name != "SARRAY") {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTLeaf(token_list[0]));

    if (token_list[1].token_name != "SLBRACKET") {
      throw new SyntaxError(token_list[1].line_num);
    }
    this.addChild(new ASTLeaf(token_list[1]));

    const min_suffix_range = this.get_range_of_minimum_suffix(token_list);
    this.addChild(
      new ASTSuffixMinimum(
        token_list.slice(min_suffix_range.left, min_suffix_range.right + 1)
      )
    );

    if (token_list[min_suffix_range.right + 1].token_name != "SRANGE") {
      throw new SyntaxError(token_list[min_suffix_range.right + 1].line_num);
    }
    this.addChild(new ASTLeaf(token_list[min_suffix_range.right + 1]));

    const max_suffix_range = this.get_range_of_maximum_suffix(token_list);
    this.addChild(
      new ASTSuffixMinimum(
        token_list.slice(max_suffix_range.left, max_suffix_range.right + 1)
      )
    );

    if (token_list[max_suffix_range.right + 1].token_name != "SRBRACKET") {
      throw new SyntaxError(token_list[max_suffix_range.right + 1].line_num);
    }
    this.addChild(new ASTLeaf(token_list[max_suffix_range.right + 1]));

    if (token_list[max_suffix_range.right + 2].token_name != "SOF") {
      throw new SyntaxError(token_list[max_suffix_range.right + 2].line_num);
    }
    this.addChild(new ASTLeaf(token_list[max_suffix_range.right + 2]));

    this.addChild(
      new ASTFormStandart(
        token_list.slice(max_suffix_range.right + 3, token_list.length)
      )
    );
  }

  // 「添え字の最小値」が入ったトークン群のインデックスを取得．両端を含む．
  get_range_of_minimum_suffix(token_list: Token[]) {
    let left = -1;
    let right = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SLBRACKET") {
        if (left === -1) {
          left = i + 1;
        }
      }
      if (token_list[i].token_name === "SRANGE") {
        if (right === -1) {
          right = i - 1;
        }
      }
    }
    if (left == -1 || right == -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    return { left: left, right: right };
  }

  // 「添え字の最大値」が入ったトークン群のインデックスを取得．両端を含む．
  get_range_of_maximum_suffix(token_list: Token[]) {
    let left = -1;
    let right = -1;
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === "SRANGE") {
        if (left === -1) {
          left = i + 1;
        }
      }
      if (token_list[i].token_name === "SRBRACKET") {
        if (right === -1) {
          right = i - 1;
        }
      }
    }
    if (left == -1 || right == -1) {
      throw new SyntaxError(token_list[0].line_num);
    }
    return { left: left, right: right };
  }
}

export default ASTFormArray;
