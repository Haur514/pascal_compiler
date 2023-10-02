import ASTStandartStatement from "../../main/ast/node/ast_standart_statement";
import Token from "../../main/lexer/token";

test("input_output_statement_test", function () {
  const input1: Token[] = [
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
  ];
  expect(() => new ASTStandartStatement(input1)).toThrowError(
    new Error("SyntaxError: line 6")
  );

  const input2: Token[] = [
    new Token("writeln", 6),
    new Token("i", 6),
    new Token(")", 6),
  ];
  expect(() => new ASTStandartStatement(input2)).toThrowError(
    new Error("SyntaxError: line 6")
  );
});
