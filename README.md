# eslint-lsp

[![npm](https://img.shields.io/npm/v/eslint-lsp)](https://www.npmjs.com/package/eslint-lsp)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Eslint language server

NOTE: this is a work in progress and still lacks many feature

## Installation

```sh
npm install --global eslint-lsp
# or from github npm install --global danielpza/eslint-lsp
```

## Usage

```js
eslint-lsp --stdio
```

## Emacs Integration

lsp-mode:

```el
(setq lsp-eslint-server-command '("eslint-lsp" "--stdio"))
```

eglot:

```el
(add-to-list 'eglot-server-programs `(js-mode . ("eslint-lsp" "--stdio")))
```

## Roadmap

- [ ] Code actions
