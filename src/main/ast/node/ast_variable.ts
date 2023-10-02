import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import Util from "../../util/util";
import ASTNode from "../astnode";
import ASTVariablePure from "./ast_variable_pure";
import ASTVariableWithSuffix from "./ast_variable_with_suffix";

class ASTVariable extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    if (this.is_pure_variable(token_list)) {
      this.addChild(new ASTVariablePure(token_list));
    } else {
      this.addChild(new ASTVariableWithSuffix(token_list));
    }
  }

  private is_pure_variable(token_list: Token[]) {
    const l = Util.index_of_token(token_list, "SLBRACKET");
    const r = Util.index_of_token(token_list, "SRBRACKET");
    if (l >= 0 && r >= 0) {
      return false;
    }
    return true;
  }
}

export default ASTVariable;
