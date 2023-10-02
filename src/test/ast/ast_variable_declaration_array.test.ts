import ASTForm from "../../main/ast/node/ast_form";
import ASTIdentifier from "../../main/ast/node/ast_identifier";
import ASTVariableDeclarationArray from "../../main/ast/node/ast_variable_declaration_array";
import Token from "../../main/lexer/token";

test("split_token_with_semicolon_test", function () {
  const input1: Token[] = [
    new Token("hoge", 0),
    new Token(":", 0),
    new Token("integer", 0),
    new Token(";", 0),
    new Token("hoge", 0),
    new Token(":", 0),
    new Token("integer", 0),
    new Token(";", 0),
    new Token("hoge", 0),
    new Token(":", 0),
    new Token("integer", 0),
    new Token(";", 0),
  ];
  const expect1: Token[][] = [
    [
      new Token("hoge", 0),
      new Token(":", 0),
      new Token("integer", 0),
      new Token(";", 0),
    ],
    [
      new Token("hoge", 0),
      new Token(":", 0),
      new Token("integer", 0),
      new Token(";", 0),
    ],
    [
      new Token("hoge", 0),
      new Token(":", 0),
      new Token("integer", 0),
      new Token(";", 0),
    ],
  ];
  expect(
    new ASTVariableDeclarationArray([]).split_token_with_semicolon(input1)
  ).toEqual(expect1);
});

test("ast_variable_declaration_array_test", function () {
  const input1: Token[] = [
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
  ];
  expect(() => new ASTVariableDeclarationArray(input1)).not.toThrowError(
    new Error("SyntaxError: line 2")
  );
});

test("ast_variable_declaration_array_test", function () {
  const input1: Token[] = [
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("int", 2),
    new Token(";", 2),
  ];
  expect(() => new ASTVariableDeclarationArray(input1)).toThrowError(
    new Error("SyntaxError: line 2")
  );
});

test("ast_form", function () {
  const input1: Token[] = [new Token("integer", 2)];
  expect(() => new ASTForm(input1)).not.toThrowError(
    new Error("SyntaxError: line 2")
  );
});

test("search_clone_test", function () {
  const input1: Token[] = [
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
  ];
  expect(new ASTVariableDeclarationArray([]).search_colon(input1)).toBe(2);
});
