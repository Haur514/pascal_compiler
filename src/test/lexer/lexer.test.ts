import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";

test("quoteTest", function () {
  expect(new Lexer().is_quote('"')).toBe(true);
});

test("tokenizeTest", function () {
  const input = "program testBasic;";
  const expected = ["program", "testBasic", ";"];
  expect(new Lexer().tokenize(input)).toEqual(expected);

  const input2 = `
    var i: integer;
  `;
  const expected2 = ["var", "i", ":", "integer", ";"];
  expect(new Lexer().tokenize(input2)).toEqual(expected2);

  const input3 = `

  `;
  const expected3: string[] = [];
  expect(new Lexer().tokenize(input3)).toEqual(expected3);

  const input4 = `
  i := 3;
  `;
  const expected4: string[] = ["i", ":=", "3", ";"];
  expect(new Lexer().tokenize(input4)).toEqual(expected4);

  const input5 = `
  writeln(i);
  `;
  const expected5: string[] = ["writeln", "(", "i", ")", ";"];
  expect(new Lexer().tokenize(input5)).toEqual(expected5);

  const input6 = `
  end.
  `;
  const expected6: string[] = ["end", "."];
  expect(new Lexer().tokenize(input6)).toEqual(expected6);
});

test("lexerRunTest", function () {
  const input1 = "program testBasic;";
  const expected1 = [
    new Token("program", 1),
    new Token("testBasic", 1),
    new Token(";", 1),
  ];
  expect(new Lexer().run(input1)).toEqual(expected1);

  const input2 = `program testBasic;
  var i: integer;
  
  begin
    i := 3;
    writeln(i);
  end.`;
  const expected2 = [
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

  expect(new Lexer().run(input2)).toEqual(expected2);
});
