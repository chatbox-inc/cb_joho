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

const polly = new aws.Polly()
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

/* これを用いれば、vue側で時刻の音声読み上げが可能
* export const PollyService = {
  timeVoice(currentTime) {
    const params = {
      OutputFormat: 'mp3',
      Text: `${currentTime}です。`,
      VoiceId: 'Mizuki',
      SampleRate: '22050',
      TextType: 'text',
      LanguageCode: 'ja-JP'
    }

    const polly = new aws.Polly()
    polly.synthesizeSpeech(params, function(err, data) {
      if (!err) {
        const elementId = 'audioElement'
        const audioElement = document.createElement('audio')
        audioElement.setAttribute('id', elementId)
        document.body.appendChild(audioElement)
        const uInt8Array = new Uint8Array(data.AudioStream)
        const arrayBuffer = uInt8Array.buffer
        const blob = new Blob([arrayBuffer])
        const url = URL.createObjectURL(blob)
        audioElement.src = url
        audioElement.play()
      }
    })
  }
}
* */
