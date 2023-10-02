class SyntaxError extends Error {
  constructor(line_number: number) {
    super("SyntaxError: line " + line_number);
  }
}

export default SyntaxError;
