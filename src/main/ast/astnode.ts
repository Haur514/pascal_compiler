import Token from "../lexer/token";

class ASTNode {
  token_list: Token[] = [];
  children: ASTNode[] = [];

  constructor(token_list: Token[]) {
    this.token_list = token_list;
  }

  addChild(node: ASTNode) {
    this.children.push(node);
  }
}
export default ASTNode;
