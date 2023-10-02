import ASTVariableDeclaration from "../../main/ast/node/ast_variable_declaration";
import ASTVariableDeclarationArray from "../../main/ast/node/ast_variable_declaration_array";
import Token from "../../main/lexer/token";

test("ast_variable_declaration_array_test", function () {
  const input1: Token[] = [
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
  ];
  expect(() => new ASTVariableDeclaration(input1)).not.toThrowError(
    "SyntaxError: line 2"
  );
});
