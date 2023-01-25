# react-oauth-example
OAuth認可を想定したReactサンプルプロジェクトです。<br/>
あくまでサンプルですので、 認可情報の保存先やデータフェッチ部分なんかは各々のやり方に合わせてください。

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

### Mock Service Workerのコード生成
```shell
$ npx msw init public/ --save
```
既に生成物が入っているので不要かも
