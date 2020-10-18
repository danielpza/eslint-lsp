const {
  createConnection,
  TextDocuments,
  ProposedFeatures,
} = require("vscode-languageserver");
const { runEslint } = require("./eslint");

const { TextDocument } = require("vscode-languageserver-textdocument");

function run() {
  const connection = createConnection(ProposedFeatures.all);

  const documents = new TextDocuments(TextDocument);

  documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
  });

  /** @param {import("vscode-languageserver-textdocument").TextDocument} textDocument */
  async function validateTextDocument(textDocument) {
    connection.sendDiagnostics({
      uri: textDocument.uri,
      diagnostics: await runEslint(textDocument.uri),
    });
  }

  documents.listen(connection);

  connection.listen();

  return connection;
}

module.exports = { run };
