<script setup lang="ts">

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
  <h1>再生設定　編集</h1>
  <div>
    設定名
    <input type="radio" id="radio1Edit" name="radio_playbackSettings">
    <label for="radio1Edit">自動</label>
    <input type="radio" id="radio2Edit" name="radio_playbackSettings">
    <label for="radio2Edit">カスタム</label><br>
    <input type="text">
  </div>
  <div>
    <p>1-100 リピート3回　1倍速 0.01秒ずつ速度を上げる</p>
  </div>
  <div>
    <input type="radio" id="radio3Edit" name="radio_playbackSettings">
    <label for="radio3Edit">開始番号と終了番号を指定</label>
    <div>
      開始番号<input type="text">
      終了番号<input type="text">
    </div>
  </div>
  <div class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
</template>