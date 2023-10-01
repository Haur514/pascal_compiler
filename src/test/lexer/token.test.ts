import Token from "../../main/lexer/token";

test("tokenToStringTest", function () {
  const expected = "program\tSPROGRAM\t17\t1";
  expect(new Token("program", 1).toString()).toEqual(expected);
});
