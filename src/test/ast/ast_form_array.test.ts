import ASTComposedStatements from "../../main/ast/node/ast_composed_statements";
import ASTForm from "../../main/ast/node/ast_form";
import ASTFormArray from "../../main/ast/node/ast_form_array";
import Token from "../../main/lexer/token";

test("input_output_statement_test", function () {
  const input1: Token[] = [
    new Token("array", 5),
    new Token("[", 5),
    new Token("1", 5),
    new Token("..", 5),
    new Token("10", 5),
    new Token("]", 5),
    new Token("of", 5),
    new Token("integer", 5),
  ];
  expect(() => new ASTFormArray(input1)).not.toThrowError(
    new Error("SyntaxError: line 5")
  );
});
test("input_output_statement_test", function () {
  const input1: Token[] = [
    new Token("array", 5),
    new Token("[", 5),
    new Token("1", 5),
    new Token("..", 5),
    new Token("10", 5),
    new Token("]", 5),
    new Token("of", 5),
    new Token("integer", 5),
  ];
  expect(() => new ASTForm(input1)).not.toThrowError(
    new Error("SyntaxError: line 5")
  );
});
