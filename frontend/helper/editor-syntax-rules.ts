export default function getEditorSytaxRules (theme: unknown){
    const syntaxRules = [
      theme.syntaxKeyword && {
        token: "keyword",
        foreground: theme.syntaxKeyword.replace("#", ""),
      },
      theme.syntaxString && {
        token: "string",
        foreground: theme.syntaxString.replace("#", ""),
      },
      theme.syntaxVariable && {
        token: "variable",
        foreground: theme.syntaxVariable.replace("#", ""),
      },
      theme.syntaxVariable && {
        token: "identifier",
        foreground: theme.syntaxVariable.replace("#", ""),
      },
      theme.syntaxFunction && {
        token: "function",
        foreground: theme.syntaxFunction.replace("#", ""),
      },
      theme.syntaxNumber && {
        token: "number",
        foreground: theme.syntaxNumber.replace("#", ""),
      },
      theme.syntaxComment && {
        token: "comment",
        foreground: theme.syntaxComment.replace("#", ""),
      },
      theme.syntaxOperator && {
        token: "operator",
        foreground: theme.syntaxOperator.replace("#", ""),
      },
  ].filter(Boolean);

  return syntaxRules
}
