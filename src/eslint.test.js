const { DiagnosticSeverity } = require("vscode-languageserver");
const { mapEslintResult, runEslint } = require("./eslint");
const { URI } = require("vscode-uri");
const { resolve } = require("path");

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

test("run eslint on a file and get diagnostics", async () => {
  const uri = URI.file(resolve(__dirname, "__fixtures/index.js")).toString();
  const eslintResult = await runEslint(uri);
  expect(eslintResult).toMatchObject([
    {
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: 0, character: 9 },
        end: { line: 0, character: 14 },
      },
      code: "no-unused-vars",
      message: "'Hello' is defined but never used.",
      source: "eslint",
    },
  ]);
});
