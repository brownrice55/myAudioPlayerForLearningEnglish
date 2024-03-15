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
  <div>
    <ul>
      <li>
        <input type="radio" id="history1" name="history">
        <label for="history1">2/22 パス：黒色の参考書のパス 再生設定：1-100 リピート3回　スピード1倍速 2,13,30,41,50,61,65</label>
      </li>
      <li>
        <input type="radio" id="history2" name="history">
        <label for="history2">2/22 パス：黒色の参考書のパス 再生設定：1-100 リピート3回　スピード1倍速 2,13,30,41,50,61,65</label>
      </li>
      <li>
        <input type="radio" id="history3" name="history">
        <label for="history3">2/22 パス：黒色の参考書のパス 再生設定：1-100 リピート3回　スピード1倍速 2,13,30,41,50,61,65</label>
      </li>
    </ul>
    <div class="button">
      <button @click="onCloseModal">キャンセル</button>
      <button>選択</button>
    </div>
  </div>
</template>