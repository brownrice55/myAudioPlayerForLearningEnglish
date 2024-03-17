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
    <label for="">パス名</label>
    <input type="text"><br>
    例）黒色の参考書のパス
  </div>
  <div class="form">
    拡張子
    <select name="" id="">
      <option value=".mp3">.mp3</option>
    </select>
    フォルダ名
    <input type="text">
  </div>
  <div class="form">
    ファイル名<br>
    連番の桁数 <input type="number"><br>
    連番の前後の文字列
    <input type="text">
    001
    <input type="text">
  </div>
  <div class="form">
    data/001.mp3
  </div>
  <div class="form">
    <p>再生して、パスが合っているか確認する</p>
  </div>
  <div class="form">
    <video playsinline autoplay controls>
      <source src="" type="video/mp4">
    </video>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button>次へ</button>
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