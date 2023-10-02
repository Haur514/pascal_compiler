import ASTBuilder from "../../main/ast/astbuilder";
import ASTNode from "../../main/ast/astnode";
import ASTIdentifier from "../../main/ast/node/ast_identifier";
import ASTProgram from "../../main/ast/node/ast_program";
import SyntaxError from "../../main/exception/syntax_error";
import Token from "../../main/lexer/token";
import Parser from "../../main/parser/parser";

test("ast_program_test", function () {
  const input1: Token[] = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(")", 6),
    new Token(";", 6),
    new Token("end", 7),
    new Token(".", 7),
  ];

  const program_node = new ASTBuilder().build(input1);
  expect(program_node.children.length).toBe(6);
});

test("block_range", function () {
  const input1: Token[] = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(")", 6),
    new Token(";", 6),
    new Token("end", 7),
    new Token(".", 7),
  ];
  const expected1 = [3, 7];
  expect(new ASTProgram([]).get_token_range_of_block(input1)).toEqual(
    expected1
  );
});

test("ast_program_test", function () {
  const input1: Token[] = [
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(")", 6),
    new Token(";", 6),
    new Token("end", 7),
    new Token(".", 7),
  ];
  expect(() => new ASTProgram(input1)).toThrowError(
    new Error("SyntaxError: line 1")
  );

  const input2: Token[] = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(")", 6),
    new Token(";", 6),
    new Token("end", 7),
  ];
  expect(() => new ASTProgram(input2)).toThrowError(
    new Error("SyntaxError: line 7")
  );
});

test("test_writeln", function () {
  const input3: Token[] = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token(":", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(";", 6),
    new Token("end", 7),
    new Token(".", 7),
  ];
  expect(() => new ASTProgram(input3)).toThrowError(
    new Error("SyntaxError: line 6")
  );
});

test("test_variable_declaration", function () {
  const input1: Token[] = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
    new Token("var", 2),
    new Token("i", 2),
    new Token("integer", 2),
    new Token(";", 2),
    new Token("begin", 4),
    new Token("i", 5),
    new Token(":=", 5),
    new Token("3", 5),
    new Token(";", 5),
    new Token("writeln", 6),
    new Token("(", 6),
    new Token("i", 6),
    new Token(")", 6),
    new Token(";", 6),
    new Token("end", 7),
    new Token(".", 7),
  ];
  expect(() => new ASTProgram(input1)).toThrowError(
    new Error("SyntaxError: line 2")
  );
});
