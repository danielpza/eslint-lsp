const { DiagnosticSeverity } = require("vscode-languageserver");
const { mapEslintResult } = require("./eslint");

test("map diagnostic from eslint to lsp", () => {
  const fromEslint = [
    {
      filePath:
        "/home/daniel/projects/proofofconcept/eslint-lsp/src/__fixtures/a.js",
      messages: [
        {
          ruleId: "no-unused-vars",
          severity: 2,
          message: "'a' is assigned a value but never used.",
          line: 1,
          column: 7,
          nodeType: "Identifier",
          messageId: "unusedVar",
          endLine: 1,
          endColumn: 8,
        },
      ],
      errorCount: 1,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      source: 'const a = "3";\n',
    },
  ];
  // @ts-ignore
  expect(mapEslintResult(fromEslint)).toMatchObject([
    {
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: 0, character: 6 },
        end: { line: 0, character: 7 },
      },
      code: "no-unused-vars",
      message: "'a' is assigned a value but never used.",
      source: "eslint",
    },
  ]);
});
