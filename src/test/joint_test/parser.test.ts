import Lexer from "../../main/lexer/lexer";
import Token from "../../main/lexer/token";
import Parser from "../../main/parser/parser";
import "cross-fetch/polyfill";
import * as fs from "fs";

const syn_err_dict = {
  "synerr01.pas": "SyntaxError: line 1",
  "synerr02.pas": "SyntaxError: line 3",
  "synerr03.pas": "SyntaxError: line 8",
  "synerr04.pas": "SyntaxError: line 10",
  "synerr05.pas": "SyntaxError: line 11",
  "synerr06.pas": "SyntaxError: line 13",
  "synerr07.pas": "SyntaxError: line 30",
  "synerr08.pas": "SyntaxError: line 31",
};

test("normal_test1", async function () {
  const file_path = new URL(
    "data/normal01.pas",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).not.toThrowError(
    "SyntaxError: line 1"
  );
});

test("normal_test", async function () {
  const test_path_list = await get_all_normal_file_path();
  for (let i = 0; i < test_path_list.length; i++) {
    const file_path = new URL(test_path_list[i]);
    const file_content = fs.readFileSync(file_path, "utf-8");
    const token_list: Token[] = new Lexer().run(file_content);
    const file_name = get_dir_path(test_path_list[i]);
    console.log(file_path);
    expect(() => new Parser().run(token_list)).not.toThrowError();
  }
});

test("semerr_test", async function () {
  const test_path_list = await get_all_semerr_file_path();
  for (let i = 0; i < test_path_list.length; i++) {
    const file_path = new URL(test_path_list[i]);
    const file_content = fs.readFileSync(file_path, "utf-8");
    const token_list: Token[] = new Lexer().run(file_content);
    const file_name = get_dir_path(test_path_list[i]);
    console.log(file_path);
    expect(() => new Parser().run(token_list)).not.toThrowError();
  }
});

test("normal07", async function () {
  const test_file_name = "normal07.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).not.toThrowError();
});

test("normal12", async function () {
  const test_file_name = "normal12.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).not.toThrowError();
});

test("normal15", async function () {
  const test_file_name = "normal15.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).not.toThrowError();
});

test("synerr01", async function () {
  const test_file_name = "synerr01.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

test("synerr02", async function () {
  const test_file_name = "synerr02.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});
test("synerr03", async function () {
  const test_file_name = "synerr03.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});
test("synerr04", async function () {
  const test_file_name = "synerr04.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

test("synerr05", async function () {
  const test_file_name = "synerr05.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

test("synerr06", async function () {
  const test_file_name = "synerr06.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

test("synerr07", async function () {
  const test_file_name = "synerr07.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

test("synerr08", async function () {
  const test_file_name = "synerr08.pas";
  const file_path = new URL(
    "data/" + test_file_name,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  const file_content = fs.readFileSync(file_path, "utf-8");
  const token_list: Token[] = new Lexer().run(file_content);
  expect(() => new Parser().run(token_list)).toThrowError(
    syn_err_dict[test_file_name]
  );
});

async function get_all_synerr_file_path() {
  const base_url_str = get_dir_path(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("url").pathToFileURL(__filename).toString()
  );
  const data_dir_url = new URL(
    "data/",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  console.log(data_dir_url);
  const allDirents = fs.readdirSync(data_dir_url, { withFileTypes: true });
  const ret = allDirents
    .filter((dirent) => dirent.isFile() && dirent.name.startsWith("synerr"))
    .map(({ name }) => base_url_str + "data/" + name);
  console.log(ret);
  return ret;
}

async function get_all_normal_file_path() {
  const base_url_str = get_dir_path(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("url").pathToFileURL(__filename).toString()
  );
  const data_dir_url = new URL(
    "data/",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  console.log(data_dir_url);
  const allDirents = fs.readdirSync(data_dir_url, { withFileTypes: true });
  const ret = allDirents
    .filter((dirent) => dirent.isFile() && dirent.name.startsWith("normal"))
    .map(({ name }) => base_url_str + "data/" + name);
  console.log(ret);
  return ret;
}

async function get_all_semerr_file_path() {
  const base_url_str = get_dir_path(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("url").pathToFileURL(__filename).toString()
  );
  const data_dir_url = new URL(
    "data/",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    get_dir_path(require("url").pathToFileURL(__filename).toString())
  );
  console.log(data_dir_url);
  const allDirents = fs.readdirSync(data_dir_url, { withFileTypes: true });
  const ret = allDirents
    .filter((dirent) => dirent.isFile() && dirent.name.startsWith("semerr"))
    .map(({ name }) => base_url_str + "data/" + name);
  console.log(ret);
  return ret;
}

function get_dir_path(file_path: string) {
  const last_slash_index = file_path.lastIndexOf("/");
  return file_path.substring(0, last_slash_index + 1);
}
