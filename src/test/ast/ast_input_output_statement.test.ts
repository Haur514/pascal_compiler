import ASTInputOutputStatement from "../../main/ast/node/ast_input_output_statement";
import Token from "../../main/lexer/token";

test("input_output_statement_test", function () {
  const input1: Token[] = [
    new Token("writeln", 6),
    new Token("i", 6),
    new Token(")", 6),
  ];
  expect(() => new ASTInputOutputStatement(input1)).toThrowError(
    "SyntaxError: line 6"
  );

  const input2: Token[] = [
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
  ];
  expect(() => new ASTInputOutputStatement(input2)).toThrowError(
    "SyntaxError: line 6"
  );
});
