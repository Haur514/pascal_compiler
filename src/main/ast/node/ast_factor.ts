import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTConstant from "./ast_constant";
import ASTExpression from "./ast_expression";
import ASTLeaf from "./ast_leaf";
import ASTVariable from "./ast_variable";

class ASTFactor extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  private make_subtree(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "SLPAREN":
        this.addChild(new ASTLeaf(token_list[0]));
        this.addChild(
          new ASTExpression(token_list.slice(1, token_list.length - 1))
        );
        if (token_list[token_list.length - 1].token_name != "SRPAREN") {
          throw new SyntaxError(token_list[token_list.length - 1].line_num);
        }
        this.addChild(new ASTLeaf(token_list[token_list.length - 1]));
        break;
      case "SNOT":
        this.addChild(new ASTLeaf(token_list[0]));
        this.addChild(new ASTFactor(token_list.slice(1, token_list.length)));
        break;
      default:
        if (this.is_constant(token_list)) {
          this.addChild(new ASTConstant(token_list));
        } else {
          this.addChild(new ASTVariable(token_list));
        }
        break;
    }
  }

  // 定数か判定する．
  private is_constant(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "STRUE":
      case "SFALSE":
      case "SCONSTANT":
      case "SSTRING":
        return true;
      default:
        return false;
    }
  }
}

export default ASTFactor;
