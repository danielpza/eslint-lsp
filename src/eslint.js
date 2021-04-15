const { DiagnosticSeverity } = require("vscode-languageserver");
const { URI } = require("vscode-uri");
const { dirname } = require("path");

/**
 * @param {import("eslint").Linter.Severity} severity
 * @returns {import("vscode-languageserver").DiagnosticSeverity}
 */
function mapSeverity(severity) {
  if (severity === 1) {
    return DiagnosticSeverity.Warning;
  }
  return DiagnosticSeverity.Error;
}

/**
 * @param {import("eslint").Linter.LintMessage} message
 * @returns {import("vscode-languageserver").Diagnostic}
 */
function mapMessage(message) {
  return {
    severity: mapSeverity(message.severity),
    range: {
      start: { line: message.line - 1, character: message.column - 1 },
      end: {
        // TODO find out why it is optional
        line: (message.endLine ?? message.line) - 1,
        character: (message.endColumn ?? message.column) - 1,
      },
    },
    code: message.ruleId ?? undefined,
    message: message.message,
    source: "eslint",
  };
}

/**
 * @param {import("eslint").ESLint.LintResult[]} lintResult
 * @returns {import("vscode-languageserver").Diagnostic[]}
 */
function mapEslintResult(lintResult) {
  const diagnostics = [];
  lintResult.forEach((result) => {
    result.messages.forEach((message) => {
      diagnostics.push(mapMessage(message));
    });
  });
  return diagnostics;
}

/**
 * @param {string} fileUri
 * @returns {string}
 */
function getUriPath(fileUri) {
  const uri = URI.parse(fileUri);
  const file = uri.path;
  return file;
}

/**
 * @param {string} fileUri
 * @returns {Promise<import("vscode-languageserver").Diagnostic[]>}
 */
async function runEslint(fileUri) {
  const file = getUriPath(fileUri);
  const cwd = dirname(file);

  const { ESLint } = /** @type {import("eslint")} */ (require(require.resolve(
    "eslint",
    {
      paths: [cwd],
    }
  )));

  const engine = new ESLint({ cwd });
  const eslintResult = await engine.lintFiles(file);
  return mapEslintResult(eslintResult);
}

module.exports = { runEslint, mapEslintResult };
