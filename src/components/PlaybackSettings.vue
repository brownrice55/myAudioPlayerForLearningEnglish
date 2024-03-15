<script setup lang="ts">
  import {ref} from "vue";
  import ModalPlaybackSettingsEdit from '/src/components/ModalPlaybackSettingsEdit.vue';
  import ModalPlaybackSettingsAdd from '/src/components/ModalPlaybackSettingsAdd.vue';

  // ** modal
  const isModalOpen = ref(0);
  const modalName = ref('');
  const onOpenModal = (aModalName:string): void => {
    isModalOpen.value = !isModalOpen.value;
    modalName.value = aModalName;
  };
  const onCloseModal = (aIsModal:boolean) => {
    isModalOpen.value = aIsModal;
  };
  // ** modal

</script>
<template>
  <h1>再生設定</h1>
  <p>使用する設定を選択して、編集、または追加を押してください。</p>
  <ul class="list">
    <li>
      <input type="radio" id="radio1" name="radio_playbackSettings" checked>
      <label for="radio1">1-100 リピート3回 1倍速</label>
    </li>
    <li>
      <input type="radio" id="radio2" name="radio_playbackSettings">
      <label for="radio2">101-120 リピート30回 0.8倍速　徐々に速度を上げる</label>
    </li>
  </ul>
  <div class="button">
    <button @click="onOpenModal('edit')">編集</button>
    <div v-if="isModalOpen && modalName=='edit'" class="overlay">
      <ModalPlaybackSettingsEdit @closeModal="onCloseModal" />
    </div>   
    <button>削除</button>
  </div>
  <div class="button">
    <button @click="onOpenModal('add')">新規追加</button>
    <div v-if="isModalOpen && modalName=='add'" class="overlay">
      <ModalPlaybackSettingsAdd @closeModal="onCloseModal" />
    </div> 
  </div>
</template>

<style lang="scss" scoped>

</style>