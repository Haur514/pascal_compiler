import ASTStatement from "../../main/ast/node/ast_statement";
import ASTStatementsArray from "../../main/ast/node/ast_statements_array";
import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";
import Parser from "../../main/parser/parser";

test("input_output_statement_test", function () {
  const input1: Token[] = [
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(";", 6),
  ];
  expect(() => new ASTStatementsArray(input1)).toThrowError(
    new Error("SyntaxError: line 6")
  );

  const input2: Token[] = [
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(";", 6),
  ];
  expect(() => new ASTStatementsArray(input2)).toThrowError(
    new Error("SyntaxError: line 6")
  );
});

test("test_writeln", function () {
  const input = `writeln('[', msg, '] i=', a[ ]);  { <<<< syntax error here }
  i := i + 1;`;
  const token = new Lexer().run(input);
  expect(() => new ASTStatementsArray(token)).toThrowError();
});
test("test_writeln", function () {
  const input = `writeln('[', msg, '] i=', a[ ])`;
  const token = new Lexer().run(input);
  expect(() => new ASTStatement(token)).toThrowError();
});
