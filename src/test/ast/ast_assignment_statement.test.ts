import ASTAssigmentStatement from "../../main/ast/node/ast_assignment_statement";
import ASTExpression from "../../main/ast/node/ast_expression";
import ASTExpressionSimple from "../../main/ast/node/ast_expression_simple";
import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";

test("test", function () {
  const input = [new Token("i", 5), new Token(":=", 5), new Token("3", 5)];
  expect(() => new ASTAssigmentStatement(input)).not.toThrowError();
});

test("tet_expression", function () {
  const input = [new Token("3", 5)];
  expect(() => new ASTExpression(input)).not.toThrowError();
});

test("tet_expression_simple", function () {
  const input = [new Token("3", 5)];
  expect(() => new ASTExpressionSimple(input)).not.toThrowError();
});

test("assign_test", function () {
  const input = "i := i + 1";
  const token = new Lexer().run(input);
  expect(() => new ASTAssigmentStatement(token)).not.toThrowError();
});
