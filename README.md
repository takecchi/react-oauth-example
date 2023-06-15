# react-oauth-sample
OAuth認可を想定したReactサンプルプロジェクトです。<br/>
あくまでサンプルですので、 認可情報の保存先やデータフェッチ部分なんかは各々のやり方に合わせてください。

## はじめに
アクセストークンをJavaScriptで取得し、ユーザ情報を取得するサンプルとして実装しました。

当プロジェクトでは保存先としてlocalStorageを使用していますが、
実際に使用する場合アクセストークンの保存先を変えたり、期限を短く設定する必要があります。

## 環境
- `React`
- `swr` 共通の状態管理に使用
- `msw` mockサーバーとして使用

## 使用方法

### インストール
```shell
$ npm install
```

### 起動
```shell
$ npm start
```
mockサーバーも自動で立ち上がります。
[http://localhost:3000](http://localhost:3000)

### ログイン
ユーザー名:`test`
パスワード:`test`

### Mock Service Workerのコード生成
```shell
$ npx msw init public/ --save
```
既に生成物が入っているので不要かも
