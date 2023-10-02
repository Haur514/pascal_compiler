import ASTInputOutputStatementWriteln from "../../main/ast/node/ast_input_output_statement_writeln";
import ASTStatementIf from "../../main/ast/node/ast_statement_if";
import Lexer from "../../main/lexer/lexer";
import Parser from "../../main/parser/parser";

test("test_writeln", function () {
  const input = "writeln('*****')";
  const token = new Lexer().run(input);
  expect(() => new ASTInputOutputStatementWriteln(token)).not.toThrow();
});

test("test_writeln2", function () {
  const input = "writeln('[', msg, '] i=', a[ ])";
  const token = new Lexer().run(input);
  expect(() => new ASTInputOutputStatementWriteln(token)).toThrowError(
    "SyntaxError: line 1"
  );
});

test("test_writeln3", function () {
  const input = "writeln('[', msg, '] i=', a[i])";
  const token = new Lexer().run(input);
  expect(() => new ASTInputOutputStatementWriteln(token)).not.toThrowError();
});
