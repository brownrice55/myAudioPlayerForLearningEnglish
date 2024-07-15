<script setup lang="ts">
  import {ref, inject} from "vue";
  import CommonPlaybackSettings from '/src/components/CommonPlaybackSettings.vue';
  import ModalPauseSettings from '/src/components/ModalPauseSettings.vue';
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';
  import type{ PathDataType, PlaybackDataType } from '/src/interfaces';

  const pathDataInject = inject('pathData') as Map<number, PathDataType>;
  const pathData = ref(pathDataInject);
  const playbackDataInject = inject('playbackData') as Map<number, PlaybackDataType>;
  const playbackData = ref(playbackDataInject);

  const pageNameFromSelect = ref('');
  const selectPlaybackSettingsId = ref(0);
  const currentPlaybackData = ref('');

  interface Emits {
    (event: 'setPath', id:number): void;
    (event: 'setNum', number1:number): void;
  }
  const emit = defineEmits<Emits>();

  const openModalFromSelect = (aName:string): void => {
    let target = event.target;
    if(target.value==0) {
      currentPlaybackData.value = '';
      return;
    }
    if(target.value=='add') {
      pageNameFromSelect.value = aName;
      isModalOpen.value = !isModalOpen.value;
      target.childNodes[0].selected = true;//「選択して下さい」に戻す
    }
    else if(aName=='playback') {
      currentPlaybackData.value = playbackData.value.get(Math.trunc(target.value));
      emit('setNum', currentPlaybackData.value.numberStart);
    }
    else {
      emit('setPath', Math.trunc(target.value));
    }
  };

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
  <div class="playback__select">
    <div>
      <small>パス</small><br>
      <div>
        <select @change="openModalFromSelect('path')">
          <option value="">選択してください</option>
          <option v-for="[id, data] in pathData" :key="id" :value="id">{{ data.settingsName }}</option>
          <option value="add">パスを追加する</option>
        </select>
      </div>
      <div v-if="isModalOpen && pageNameFromSelect==='path'" class="overlay">
        <CommonPathSettings pageName="add" @closeModal="onCloseModal" />
      </div>
    </div>

    <div>
      <small>再生設定</small><br>
      <div>
        <select @change="openModalFromSelect('playback')" v-model="selectPlaybackSettingsId">
          <option value="0">選択してください</option>
          <option v-for="[id, data] in playbackData" :key="id" :value="id">{{ (data.settingsNameType=='auto') ? data.settingsNameAuto : data.settingsNameCustom }}</option>
          <option value="add">再生設定を追加する</option>
        </select>
        <div v-if="isModalOpen && pageNameFromSelect==='playback'" class="overlay">
          <CommonPlaybackSettings pageName="add" @closeModal="onCloseModal" />
        </div>
      </div>
    </div>
  </div>

  <div class="playback__table" v-if="currentPlaybackData">
    <ul>
      <li>
        再生番号：{{ currentPlaybackData.numberStart }}〜{{ currentPlaybackData.numberEnd }}
      </li>
      <li>
        現在再生中の問題の番号：1
      </li>
      <li>
        リピート再生：1/{{ currentPlaybackData.repetition }}回目
      </li>
      <li>
        スピード：{{ currentPlaybackData.initialSpeed }}倍速
      </li>
      <li>
        {{ currentPlaybackData.acceleration }}秒ずつ加速
      </li>
    </ul>
    <div class="playback__table__btn">
      <button @click="onOpenModal">編集</button>
    </div>
  </div>
  <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
    <CommonPlaybackSettings pageName="edit" @closeModal="onCloseModal" />
  </div>
  <div>
    休止設定<br>
    <div>
      <select @change="openModalFromSelect('pause')">
        <option value="">ちょっと休む/3秒</option>
        <option value="add">休止設定を設定する</option>
      </select>
    </div>
    <div v-if="isModalOpen && pageNameFromSelect=='pause'" class="overlay">
      <ModalPauseSettings @closeModal="onCloseModal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>