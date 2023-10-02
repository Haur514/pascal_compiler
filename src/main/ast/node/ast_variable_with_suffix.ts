import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTLeaf from "./ast_leaf";
import ASTSuffix from "./ast_suffix";
import ASTVariableName from "./ast_variable_name";

class ASTVariableWithSuffix extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    if (!(token_list[0].token_name === "SIDENTIFIER")) {
      throw new SyntaxError(token_list[0].line_num);
    }
    this.addChild(new ASTVariableName([token_list[0]]));

    if (!(token_list[1].token_name === "SLBRACKET")) {
      throw new SyntaxError(token_list[1].line_num);
    }
    this.addChild(new ASTLeaf(token_list[1]));

    if (2 >= token_list.length - 1) {
      throw new SyntaxError(token_list[1].line_num);
    }
    this.addChild(new ASTSuffix(token_list.slice(2, token_list.length - 1)));

    if (!(token_list[token_list.length - 1].token_name === "SRBRACKET")) {
      throw new SyntaxError(token_list[token_list.length - 1].line_num);
    }
    this.addChild(new ASTLeaf(token_list[token_list.length - 1]));
  }
}

export default ASTVariableWithSuffix;
