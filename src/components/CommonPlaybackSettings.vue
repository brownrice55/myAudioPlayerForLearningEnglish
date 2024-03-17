<script setup lang="ts">
  import {ref} from "vue";

  interface Props {
    pageName: string;
  }
  
  defineProps<Props>();

//** modal
  interface Emits {
    (event: 'closeModal', isModalOpen:boolean): void;
  }
  const emit = defineEmits<Emits>();
  const onCloseModal = () => {
    emit('closeModal', false);
  };
//** modal

</script>
<template>
  <div class="form">
    設定名
    <input type="radio">自動
    <input type="radio">カスタム
  </div>
  <div class="form">
    <div></div>
    <div><input type="text"></div>
  </div>
  <div class="form">
    <div>
      <input type="radio">開始番号と終了番号を指定<br>
    開始番号 <input type="number">
    終了番号 <input type="number">
    </div>
    <div>
      <input type="radio"> 音声ファイルの番号を指定<br>
      <input type="text">
      <p>番号を「,」で区切ってください。</p>
    </div>
  </div>
  <div class="form">
    速度 <input type="number"> 倍速
  </div>
  <ul>
    <li><input type="radio" name="" id="">昇順再生（最初から再生）</li>
    <li><input type="radio" name="" id="">降順再生（後ろから再生）</li>
    <li><input type="radio" name="" id="">ランダム再生</li>
  </ul>
  <div class="form">
    <input type="checkbox" name="" id="">リピートする
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button>完了</button>
  </div>
  <!-- initial -->
  <!-- modalPathEdit -->
  <div v-else-if="pageName==='edit'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
  <!-- modalPathEdit -->
  <!-- modalPathAdd -->
  <div v-else-if="pageName==='add'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
  <!-- modalPathAdd -->
</template>
<style lang="scss" scoped>
</style>