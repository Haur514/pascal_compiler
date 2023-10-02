import ASTExpression from "../../main/ast/node/ast_expression";
import ASTStatementIf from "../../main/ast/node/ast_statement_if";
import Lexer from "../../main/lexer/lexer";

// expressinに括弧がついている場合に処理がうまく行かないことを確認
test("if_test", function () {
  const input = `if (i > j) then
begin
    l := 6;
end;`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTStatementIf(token_list)).not.toThrowError();
});

test("if_conditional_expression", function () {
  const input = `(i > j)`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTExpression(token_list)).not.toThrowError();
});

test("if_test2", function () {
  const input = `if not(not(ba and bt)or bf) then
    begin
        m := 4;
    end;`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTStatementIf(token_list)).not.toThrowError();
});

test("if_test3", function () {
  const input = `if -i*j+j*1+(-2)*i-((-i div 3 -j/7+(-k)mod(-((1+(2+(k+i)))-2)))) <> 24
  then
  begin
      l := 0;
  end`;
  const token_list = new Lexer().run(input);
  expect(() => new ASTStatementIf(token_list)).not.toThrowError();
});
