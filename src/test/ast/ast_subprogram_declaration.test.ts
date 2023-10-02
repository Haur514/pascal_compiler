import ASTSubprogramDeclaration from "../../main/ast/node/ast_subprogram_declaration";
import ASTSubprogramDeclarationGroup from "../../main/ast/node/ast_subprogram_declaration_group";
import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";
import Parser from "../../main/parser/parser";

test("unit_ast_subprogram_declaration_test", async function () {
  const program = `procedure printData;
var  i: integer;
begin
    i :=  ;  { <<<< syntax error here }
    while i <= 10 do
    begin
        writeln('[', msg, '] i=', a[i]);
        i := i + 1;
    end;
end`;
  const token_list: Token[] = new Lexer().run(program);
  expect(() => new ASTSubprogramDeclaration(token_list)).toThrowError(
    "SyntaxError: line 4"
  );
});

test("unit_ast_subprogram_declaration_group_test", async function () {
  const program = `procedure printData;
var  i: integer;
begin
    i := 1;
    while i <= 10 do
    begin
        writeln('[', msg, '] i=', a[i]);
        i := i + 1;
    end;
end;`;
  const token_list: Token[] = new Lexer().run(program);
  expect(
    () => new ASTSubprogramDeclarationGroup(token_list)
  ).not.toThrowError();
});

test("unit_ast_subprogram_declaration_group_test2", async function () {
  const program = `procedure printData;
  var  i: integer;
  begin
      i := 1;
      while i <= 10 do
      begin
          writeln('[', msg, '] i=', a[ ]);  { <<<< syntax error here }
          i := i + 1;
      end;
  end;`;
  const token_list: Token[] = new Lexer().run(program);
  expect(() => new ASTSubprogramDeclarationGroup(token_list)).toThrowError(
    "SyntaxError: line 7"
  );
});

test("unit_ast_subprogram_declaration_group_test3", function () {
  const program = `procedure printData;
  var  i: integer;
  begin
      i := 1;
      while i <= 10 do
      begin
          writeln('[', msg, '] i=', a[i]);
          i := i + 1;
      end;
  end;`;
  const token_list: Token[] = new Lexer().run(program);
  expect(
    () => new ASTSubprogramDeclarationGroup(token_list)
  ).not.toThrowError();
});

test("テスト", function () {
  const input = `procedure dayofWeek(Y, M, D: integer);
var z, N: integer;
begin
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
end;
procedure printDay(Y, M, D, DD: integer);
begin
    writeln(Y, '-', M, '-', D, ' IS');
    if DD = 0 then
    begin
        writeln('SUNDAY');
    end
    else
    begin
        if DD = 1 then
        begin
            writeln('MONDAY');
        end
        else
        begin
            if DD = 2 then
            begin
                writeln('TUESDAY');
            end
            else
            begin
                if DD = 3 then
                begin
                    writeln('WEDNESDAY');
                end
                else
                begin
                    if DD = 4 then
                    begin
                        writeln('THURSDAY');
                    end
                    else
                    begin
                        if DD = 5 then
                        begin
                            writeln('FRIDAY');
                        end
                        else
                        begin
                            if DD = 6 then
                            begin
                                writeln('SATURDAY');
                            end;
                        end;
                    end;
                end;
            end;
        end;
    end;
end;`;
  const token_list = new Lexer().run(input);
  expect(
    () => new ASTSubprogramDeclarationGroup(token_list)
  ).not.toThrowError();
});
