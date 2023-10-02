import Token from "../../main/lexer/token";

test("tokenToStringTest", function () {
  const expected = "program\tSPROGRAM\t17\t1";
  expect(new Token("program", 1).toString()).toEqual(expected);
});

test("colon_test", function () {
  expect(new Token(":", 1).token_name).toBe("SCOLON");
});

test("string_test", function () {
  expect(new Token("'**** hoge ******'", 1).token_name).toBe("SSTRING");
});
