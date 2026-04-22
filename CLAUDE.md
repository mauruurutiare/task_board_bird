# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`task_board_bird` は鳥テーマのタスクボード管理アプリケーションです。
GitHub Pages で公開されています: https://mauruurutiare.github.io/task_board_bird/

## 技術スタック

| 用途 | ライブラリ / ツール |
|------|-------------------|
| UI フレームワーク | React 18 |
| ビルドツール | Vite 6 |
| スタイリング | 素の CSS（CSS カスタムプロパティ・keyframes アニメーション） |
| 状態管理 | `useState` / `useEffect` / `useRef`（外部ライブラリなし） |
| データ永続化 | `localStorage`（キー: `tbb_tasks`） |
| デプロイ | GitHub Actions → GitHub Pages（`main` push で自動） |

依存パッケージの追加は最小限に抑える方針。

## コンポーネント・命名規約

- コンポーネントファイルは `PascalCase.jsx`
- 現状は `App.jsx` 1 ファイルにすべてのロジックをまとめている
- 分割する場合は機能単位（例: `TaskItem.jsx`, `CelebrationOverlay.jsx`）で `src/components/` 以下に置く
- CSS は対応するコンポーネントと同名のファイル（`App.css` など）で管理し、CSS Modules は使用しない
- クラス名はケバブケース（例: `.task-item`, `.celebration-bird`）

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:5173/task_board_bird/)
npm run build    # 本番ビルド → dist/
npm run preview  # ビルド結果をローカルでプレビュー
```

## デプロイ

`main` ブランチへの push で GitHub Actions が自動実行され、`dist/` の内容が GitHub Pages に反映される。
ワークフロー定義: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

`vite.config.js` の `base: '/task_board_bird/'` はリポジトリ名と一致させること。リポジトリ名を変更した場合は合わせて修正が必要。

## Git 運用ルール

**コードを変更するたびに必ず GitHub にプッシュすること。**

```bash
git add <変更したファイル>
git commit -m "変更内容を簡潔に記述"
git push origin <ブランチ名>
```

- コミットメッセージは変更の「なぜ」を中心に簡潔に書く
- まとまった単位の変更ごとにコミット＆プッシュを行う
- `main` ブランチへの直接プッシュは避け、原則としてブランチを切って PR 経由でマージする
- 機密情報（APIキー、トークン等）は絶対にコミットしない
