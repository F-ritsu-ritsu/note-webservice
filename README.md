# note-webservice
## 制作物

メモを作ることができるwebサービス。
各メモのタイトルと内容を変更できる。
入力が完了したら"更新"をクリックする。
DBにメモの内容が保存されている。
メモは3つ作られていて，増やすことはできない。

　
## 使い方

dockerを使ってmongoDBを起動する

```bash
$ docker run --rm --name=my-app-db -p 27017:27017 mongo
```

bashで実行後
localhost:3100にアクセス
(データはDBにnode.js実行時に追加されるので，複数実行するとエラーになる可能性があります。)

```bash
$ npm install
$ node index.js
```
