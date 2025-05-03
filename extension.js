
const vscode = require('vscode');
const fetch = require('node-fetch');

function activate(context) {
  let disposable = vscode.commands.registerCommand('aicodeassistant.askAI', async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const prompt = selectedText || await vscode.window.showInputBox({ prompt: 'Enter your question/code prompt' });
    if (!prompt) return;

    vscode.window.showInformationMessage('Contacting AI Assistant...');
    const response = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    editor.edit(editBuilder => {
      editBuilder.insert(selection.end, `\n\n// AI Suggestion:\n${data.response}`);
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
