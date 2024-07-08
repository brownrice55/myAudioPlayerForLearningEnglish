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
    <div>
      <span>前回（2/22）の履歴</span>
      <div class="button--small">
        <button @click="onOpenModal()">他の履歴を選択する</button>
      </div>
    </div>
    <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
      <ModalPlaybackHistory @closeModal="onCloseModal" />
    </div>
    <div class="table">
      <table>
        <tr>
          <th>再生番号</th>
          <td>2,13,30,41,50,61,65</td>
        </tr>
        <tr>
          <th>現在再生中の問題の番号</th>
          <td>1</td>
        </tr>
        <tr>
          <th>リピート再生</th>
          <td>3/3回目</td>
        </tr>
        <tr>
          <th>スピード</th>
          <td>1倍速</td>
        </tr>
      </table>
    </div>
  </main>
</template>