[![Netlify Status](https://api.netlify.com/api/v1/badges/6aad93b1-7894-4ead-b96c-0b83eed8ca7c/deploy-status)](https://app.netlify.com/sites/goofy-elion-812f52/deploys)
# cb_jiho

音声で時報をお知らせするウェブアプリ。

## プロジェクトボード
https://github.com/chatbox-inc/cb_joho/projects/1

## 環境情報
https://goofy-elion-812f52.netlify.app
### 環境変数(.env)
```.env
AWS_ACCESS_KEY_ID=********
AWS_SECRET_ACCESS_KEY=*******
AWS_DEFAULT_REGION=*******
```
 
## 各種資料
Tailwind CSS: https://tailwindcss.com/  
AWS Polly: https://docs.aws.amazon.com/ja_jp/polly/latest/dg/what-is.html  
AWS Polly API: https://docs.aws.amazon.com/ja_jp/polly/latest/dg/API_Reference.html  

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Make Voice
```bash
# move to service directory
$ cd service

# make voice
$ node PollyService.js
```
**注意点**:
- `$ node PollyService.js`を実行する前に、.envの各キーの値を設定しておくこと
- 出力される音声を変更したければ、以下の`Text`に出力したい文字列を設定する
```Javascript:PollyService.js
# service/PollyService.jsより抜粋

const params = {
  OutputFormat: 'mp3',
  Text: '12:55:55', // 出力される音声文字列
  VoiceId: 'Mizuki',
  SampleRate: '22050',
  TextType: 'text',
  LanguageCode: 'ja-JP'
}
  ```
 

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
