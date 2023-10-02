import ASTExpression from "../../main/ast/node/ast_expression";
import ASTExpressionSimple from "../../main/ast/node/ast_expression_simple";
import ASTStatementIf from "../../main/ast/node/ast_statement_if";
import Lexer from "../../main/lexer/lexer";

test("expression_test1", function () {
  const input = `-i*j+j*1+(-2)*i-((-i div 3 -j/7+(-k)mod(-((1+(2+(k+i)))-2)))) <> 24`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpression(token_list)).not.toThrowError();
});

test("expression_simple_test1", function () {
  const input = `-i*j+j*1+(-2)*i-((-i div 3 -j/7+(-k)mod(-((1+(2+(k+i)))-2))))`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});

test("expression_simple_test2", function () {
  const input = "(-2)*c";
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});

test("term_test1", function () {
  const input = `(-i div (3 -(j/7)))`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});

test("term_test2", function () {
  const input = `((-i div 3 -j/7+(-k)mod(-((1+(2+(k+i)))-2))))`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});

test("term_test3", function () {
  const input = `(-2)*c`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});

test("factor_test1", function () {
  const input = `(-2)`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpressionSimple(token_list)).not.toThrowError();
});
