import Token from "../lexer/token";

class ASTNode {
  token_list: Token[] = [];
  children: ASTNode[] = [];
}
export default ASTNode;
