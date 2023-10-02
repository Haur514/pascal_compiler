import Token from "../../main/lexer/token";
import Parser from "../../main/parser/parser";

test("lexerRunTest", function () {
  const input1 = [
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
});
