import SyntaxError from "../../exception/syntax_error";
import Token from "../../lexer/token";
import ASTNode from "../astnode";
import ASTFormArray from "./ast_form_array";
import ASTFormStandart from "./ast_form_standart";

class ASTForm extends ASTNode {
  constructor(token_list: Token[]) {
    super(token_list);
    this.make_subtree(token_list);
  }

  make_subtree(token_list: Token[]) {
    switch (token_list[0].token_name) {
      case "SINTEGER":
      case "SCHAR":
      case "SBOOLEAN":
        this.addChild(new ASTFormStandart(token_list));
        break;
      case "SARRAY":
        this.addChild(new ASTFormArray(token_list));
        break;
      default:
        throw new SyntaxError(token_list[0].line_num);
    }
  }
}

export default ASTForm;
