import ASTIdentifier from "../../main/ast/node/ast_identifier";
import Token from "../../main/lexer/token";

test("ast_identifier_test", function () {
  const input1: Token = new Token("1hogePoge13hoge", 17);
  expect(() => new ASTIdentifier(input1)).toThrowError(
    new Error("SyntaxError: line 17")
  );

  const input2: Token = new Token("hog&ePoge13hoge", 17);
  expect(() => new ASTIdentifier(input2)).toThrowError(
    new Error("SyntaxError: line 17")
  );

  const input3: Token = new Token("hoge123", 17);
  expect(() => new ASTIdentifier(input3)).not.toThrowError(
    new Error("SyntaxError: line 17")
  );
});
