const fs = require('fs')
const aws = require('aws-sdk')
require('dotenv').config({ path: '../.env' })

// 環境変数(.env)を設定する必要あり
aws.config.update({
  credentials: new aws.Credentials(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY
  ),
  region: process.env.AWS_DEFAULT_REGION
})

const polly = new aws.Polly({ region: process.env.AWS_DEFAULT_REGION })
const params = {
  OutputFormat: 'mp3',
  Text: '12:55:55', // 出力される音声文字列
  VoiceId: 'Mizuki',
  SampleRate: '22050',
  TextType: 'text',
  LanguageCode: 'ja-JP'
}
const filePath = '../assets/sound/polly.mp3'

polly.synthesizeSpeech(params, function(err, data) {
  if (err) {
    console.log(err, err.stack)
  } else if (data.AudioStream instanceof Buffer) {
    fs.writeFile(filePath, data.AudioStream, (fsErr) => {
      if (fsErr) {
        console.error(err)
      }
    })
  }
})
