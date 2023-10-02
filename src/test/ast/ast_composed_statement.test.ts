import ASTComposedStatements from "../../main/ast/node/ast_composed_statements";
import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";

test("input_output_statement_test", function () {
  const input1: Token[] = [
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
  ];
  expect(() => new ASTComposedStatements(input1)).toThrowError(
    new Error("SyntaxError: line 6")
  );
});

test("composed_test", function () {
  const input = `begin
  if M = 1 then
  begin
      z := Y-1901;
  end
  else
  begin
      if M = 2 then
      begin
          z := Y-1901;
      end
      else
      begin
          z := Y-1900;
      end;
  end;

  N := (4+z+(z div 4)+table[M]+(D-1));
  while N >= 7 do
  begin
      N := N-7;
  end;
  Result := N;
end`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTComposedStatements(token_list)).not.toThrowError();
});
