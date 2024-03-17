<script setup lang="ts">
  import {ref} from "vue";
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';

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
  <h1>パス設定</h1>
  <p>使用する設定を選択して、<br>編集、または追加を押してください。</p>
  <ul>
    <li>
      <input type="radio" id="radio1" name="radio_playbackSettings">
      <label for="radio1">黒色の参考書のパス</label>
    </li>
    <li>      
      <input type="radio" id="radio2" name="radio_playbackSettings">
      <label for="radio2">青色の参考書のパス</label>
    </li>
  </ul>
  <div class="button">
    <button @click="onOpenModal('edit')">編集</button>
    <div v-if="isModalOpen && modalName=='edit'" class="overlay">
      <div>パス設定 編集</div>
      <CommonPathSettings pageName="edit" @closeModal="onCloseModal" />
    </div>
    <button>削除</button>
  </div>
  <div class="button">
    <button @click="onOpenModal('add')">新規追加</button>
    <div v-if="isModalOpen && modalName=='add'" class="overlay">
      <div>パス設定 新規追加</div>
      <CommonPathSettings pageName="add" @closeModal="onCloseModal" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>