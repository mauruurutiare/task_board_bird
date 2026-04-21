# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`task_board_bird` はタスクボード管理アプリケーションです。

## Git 運用ルール

**コードを変更するたびに必ず GitHub にプッシュすること。**

具体的な手順:

```bash
git add <変更したファイル>
git commit -m "変更内容を簡潔に記述"
git push origin <ブランチ名>
```

- コミットメッセージは変更の「なぜ」を中心に簡潔に書く
- まとまった単位の変更ごとにコミット＆プッシュを行う
- `main` ブランチへの直接プッシュは避け、原則としてブランチを切って PR 経由でマージする
- 機密情報（APIキー、トークン等）は絶対にコミットしない

## コマンド

プロジェクトのセットアップや使用コマンドは、技術スタックが決まり次第このセクションに追記すること。
