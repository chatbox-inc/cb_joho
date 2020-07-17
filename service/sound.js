// 即席ライブラリ
// Ref: http://phiary.me/webaudio-api-getting-started/
;(function(window) {
  const wa = {
    context: null,
    _buffers: {},

    _initialize() {
      this.context = new (window.AudioContext || window.webkitAudioContext)()
    },

    playSilent() {
      const context = this.context
      const buf = context.createBuffer(1, 1, 22050)
      const src = context.createBufferSource()
      src.buffer = buf
      src.connect(context.destination)
      src.start(0)
    },

    play(buffer) {
      // ファイル名で指定
      if (typeof buffer === 'string') {
        buffer = this._buffers[buffer]
        if (!buffer) {
          console.error('ファイルが用意できてません!')
          return
        }
      }

      const context = this.context
      const source = context.createBufferSource()
      source.buffer = buffer
      source.connect(context.destination)
      source.start(0)
    },
    loadFile(src, cb) {
      const self = this
      const context = this.context
      const xml = new XMLHttpRequest()
      xml.open('GET', src)
      xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
          if ([200, 201, 0].includes(xml.status)) {
            const data = xml.response
            // webaudio 用に変換
            context.decodeAudioData(data, function(buffer) {
              // buffer登録
              const s = src.split('/')
              const key = s[s.length - 1]
              self._buffers[key] = buffer
              // コールバック
              cb(buffer)
            })
          } else if (xml.status === 404) {
            // not found
            console.error('not found')
          } else {
            // サーバーエラー
            console.error('server error')
          }
        }
      }
      xml.responseType = 'arraybuffer'
      xml.send(null)
    }
  }
  wa._initialize() // audioContextを新規作成

  window.wa = wa
})(window)
