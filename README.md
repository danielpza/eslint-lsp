# eslint-lsp

Eslint language server

NOTE: this is a work in progress and still lacks many feature

## Installation

```sh
npm install --global danielpza/eslint-lsp
# npm install --global eslint-lsp # might not be published yet!
```

## Usage

```js
eslint-lsp --stdio
```

## Emacs Integration (lsp-mode)


With `use-package`:

```el
(use-package lsp-mode
  :config
  (setq lsp-eslint-server-command '("eslint-lsp" "--stdio")))
```

## Roadmap

- [ ] Code actions
