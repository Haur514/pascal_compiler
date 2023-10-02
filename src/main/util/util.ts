import Token from "../lexer/token";

class Util {
  // 与えられたトークン列を";"で区切る．
  // ";"をトークンに含む
  // 返り値: [[Token,Token,Token,...,Token],[Token,Token,...,Token]]
  public static split_token_with_semicolon(token_list: Token[]) {
    const ret: Token[][] = [];
    let tmp_token_list: Token[] = [];
    for (let i = 0; i < token_list.length; i++) {
      tmp_token_list.push(token_list[i]);
      if (token_list[i].token_name === "SSEMICOLON") {
        ret.push(tmp_token_list);
        tmp_token_list = [];
      }
    }
    if (tmp_token_list.length > 0) {
      ret.push(tmp_token_list);
    }
    return ret;
  }

  // 与えられたtoken_nameを持つトークンのインデックスを取得
  public static index_of_token(token_list: Token[], token_name: string) {
    for (let i = 0; i < token_list.length; i++) {
      if (token_list[i].token_name === token_name) {
        return i;
      }
    }
    return -1;
  }
}

export default Util;
