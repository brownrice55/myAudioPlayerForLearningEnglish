<script setup lang="ts">
  import {ref} from "vue";
  import ModalPlaybackHistory from '/src/components/ModalPlaybackHistory.vue';
  
  const pageNameFromSelect = ref('');

  // ** modal 後でまとめたい
  const isModalOpen = ref(false);
  const onOpenModal = (): void => {
    isModalOpen.value = !isModalOpen.value;
  };
  const onCloseModal = (aIsModal:boolean) => {
    isModalOpen.value = aIsModal;
    if(pageNameFromSelect.value) {
      pageNameFromSelect.value = '';
    }
  };
  // ** modal
</script>
<template>
  <main>
    <div class="playback__select">
      <div>
        <span>前回（2/22）の履歴</span>
      </div>
      <div class="playback__select__btn">
        <button @click="onOpenModal()">他の履歴を選択する</button>
      </div>
    </div>
    <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
      <ModalPlaybackHistory @closeModal="onCloseModal" />
    </div>
    <div class="playback__table">
      <ul>
        <li>
          パス名：黒色の参考書のパス
        </li>
        <li>
          再生番号：2,13,30,41,50,61,65
        </li>
        <li>
          現在再生中の問題の番号：1
        </li>
        <li>
          リピート再生：3/3回目
        </li>
        <li>
          スピード：1倍速
        </li>
      </ul>
    </div>
  </main>
</template>