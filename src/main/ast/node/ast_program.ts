import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTBlock from "./ast_block";
import ASTComposedStatements from "./ast_composed_statements";
import ASTLeaf from "./ast_leaf";
import ASTProgramName from "./ast_program_name";
import SyntaxError from "../../exception/syntax_error";

class ASTProgram extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    if (typeof token_list === "undefined") {
      throw new SyntaxError(1);
    }
    if (token_list.length == 0) {
      return;
    }

    if (token_list[0].token_name === "SPROGRAM") {
      this.addChild(new ASTLeaf(token_list[0]));
    } else {
      throw new SyntaxError(token_list[0].line_num);
    }

    this.addChild(new ASTProgramName(token_list[1]));
    if (token_list[2].token_name === "SSEMICOLON") {
      this.addChild(new ASTLeaf(token_list[2]));
    } else {
      throw new SyntaxError(token_list[1].line_num);
    }

    const range_of_block = this.get_token_range_of_block(token_list);
    this.addChild(
      new ASTBlock(token_list.slice(range_of_block[0], range_of_block[1] + 1))
    );

    const range_of_composed_statements =
      this.get_token_range_of_composed_statements(token_list);
    this.addChild(
      new ASTComposedStatements(
        token_list.slice(
          range_of_composed_statements[0],
          range_of_composed_statements[1] + 1
        )
      )
    );

    if (token_list[token_list.length - 1].token_name === "SDOT") {
      this.addChild(new ASTLeaf(token_list[-1]));
    } else {
      throw new SyntaxError(token_list[token_list.length - 1].line_num);
    }
  }

  // "ブロック"の範囲となるトークンの範囲を取得し，その範囲を[start: number, end: number]で返す．両端を含む．
  get_token_range_of_block(token_list: Token[]): [number, number] {
    const start = 3;
    const end = this.get_token_range_of_composed_statements(token_list)[0] - 1;
    return [start, end];
  }

  // "複合文"となるトークンの範囲を取得し，その範囲を[start: number, end: nubmer]で返す．両端を含む．
  get_token_range_of_composed_statements(
    token_list: Token[]
  ): [number, number] {
    let begin_index = -1;
    let end_index = -1;

    let end_counter = NaN;

    for (let i = token_list.length - 1; i >= 0; i--) {
      if (token_list[i].token_name == "SBEGIN") {
        end_counter -= 1;
      } else if (token_list[i].token_name == "SEND") {
        if (Number.isNaN(end_counter)) {
          end_counter = 1;
          end_index = i;
        } else {
          end_counter += 1;
        }
      }
      if (end_counter == 0) {
        begin_index = i;
        break;
      }
    }
    return [begin_index, end_index];
  }
}

export default ASTProgram;
