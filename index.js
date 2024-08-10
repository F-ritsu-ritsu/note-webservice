//server側の動き

const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient } = require('mongodb');
const { notDeepEqual } = require('node:assert');
const { title } = require('node:process');
const client = new MongoClient('mongodb://localhost:27017');
let now_note_id=0;

app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

async function main() {
  await client.connect();

  const db = client.db('my-app');
  const note_db = client.db('note');
  const in_data= await note_db.collection('note').insertMany([
    {No:1,Title:'title1',Content:'This is note1 content'},
    {No:2,Title:'title2',Content:'This is note2 content'},
    {No:3,Title:'title3',Content:'This is note3 content'}
  ]);

  //topページ
  app.get('/', logMiddleware, async (req, res) => {
    res.render(path.resolve(__dirname, 'views/index.ejs'));
  });

  //noteの更新
  app.post('/api/note', express.json(), async (req, res) => {
    const note_no = now_note_id;
    const new_content = { $set: { Title: req.body.title, Content: req.body.content } };
    if (!new_content) {
      res.status(400).send('Bad Request');
      return;
    }
    await note_db.collection('note').updateOne({ No: note_no },new_content);
    res.status(200).send('Created');
  });

  //各メモ
  app.get('/note/:id', logMiddleware, async(req, res) => {
    const note_id=req.params.id - 0;
    now_note_id=note_id;
    const note_object = await note_db.collection('note').findOne({No:note_id});
    res.render(path.resolve(__dirname, 'views/note-index.ejs'),
    {note_id:note_id, note_title: note_object.Title,note_content:note_object.Content});
  });



  // ポート: 3100でサーバーを起動
  app.listen(3100, () => {
    console.log('start listening');
  });
}



main();
