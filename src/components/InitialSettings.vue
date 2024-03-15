<script setup lang="ts">
  import {ref} from "vue";

  //**data/
  //仮
  const initialSettings = ref(3);
  //**data/

</script>
<template>
  <nav>
    <ul class="nav">
      <li>音声データセット</li>
      <li>パス設定</li>
      <li>再生設定</li>
    </ul>
  </nav>
  <main>
    <section v-if="initialSettings===1">
      <p>音声データをフォルダに入れて、dataフォルダ以下に配置してください。</p>
      <div class="button">
        <button>次へ</button>
      </div>
    </section>
    <section v-else-if="initialSettings===2">
      <div>
        <label for="">パス名</label>
        <input type="text"><br>
        例）黒色の参考書のパス
        拡張子
        <select name="" id="">
          <option value=".mp3">.mp3</option>
        </select>
        フォルダ名
        <input type="text">
      </div>
      <div>
        ファイル名
        連番の桁数 <input type="number">
        連番の前後の文字列
        <input type="text">
        001
        <input type="text">
      </div>
      <div>
        data/001.mp3
      </div>
      <div>
        <p>再生して、パスが合っているか確認する</p>
      </div>
      <div>
        <video playsinline autoplay controls>
          <source src="" type="video/mp4">
        </video>        
      </div>
      <div class="button">
        <button>次へ</button>
      </div>    
    </section>
    <section v-else>
      <div>
        設定名
        <input type="radio">自動
        <input type="radio">カスタム
      </div>
      <div>
        <div></div>
        <div><input type="text"></div>
      </div>
      <div>
        <input type="radio">開始番号と終了番号を指定
        開始番号 <input type="number">
        終了番号 <input type="number">
        <input type="radio"> 音声ファイルの番号を指定
        <input type="text">
        <p>番号を「,」で区切ってください。</p>
      </div>
      <div>
        速度 <input type="number"> 倍速
      </div>
      <ul>
        <li><input type="radio" name="" id="">昇順再生（最初から再生）</li>
        <li><input type="radio" name="" id="">降順再生（後ろから再生）</li>
        <li><input type="radio" name="" id="">ランダム再生</li>
      </ul>
      <div>
        <input type="checkbox" name="" id="">リピートする
      </div>
      <div class="button">
        <button>完了</button>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
  .nav {
    li {
      display: inline-block;
      padding: 0 0 20px;
    }
  }
</style>