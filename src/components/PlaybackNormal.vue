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
      emit('setNum', currentPlaybackData.value.number1);
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
  <main class="playback__main">
    <dl>
      <dt>パス</dt>
      <dd>
        <select @change="openModalFromSelect('path')">
          <option value="">選択してください</option>
          <option v-for="[id, data] in pathData" :key="id" :value="id">{{ data.name }}</option>
          <option value="add">パスを追加する</option>
        </select>
        <div v-if="isModalOpen && pageNameFromSelect==='path'" class="overlay">
          <CommonPathSettings pageName="add" @closeModal="onCloseModal" />
        </div>
      </dd>
    </dl>
    <dl>
      <dt>再生設定</dt>
      <dd>
        <select @change="openModalFromSelect('playback')" v-model="selectPlaybackSettingsId">
          <option value="0">選択してください</option>
          <option v-for="[id, data] in playbackData" :key="id" :value="id">{{ (data.settingsNameType=='auto') ? data.settingsNameAuto : data.settingsNameCustom }}</option>
          <option value="add">再生設定を追加する</option>
        </select>
        <div v-if="isModalOpen && pageNameFromSelect==='playback'" class="overlay">
          <CommonPlaybackSettings pageName="add" @closeModal="onCloseModal" />
        </div>
      </dd>
    </dl>
    <div class="table">
      <template v-if="currentPlaybackData">
        <table>
          <tr>
            <th>再生番号</th>
            <td>{{ currentPlaybackData.number1 }}〜{{ currentPlaybackData.number2 }}</td>
          </tr>
          <tr>
            <th>現在再生中の問題の番号</th>
            <td>1</td>
          </tr>
          <tr>
            <th>リピート再生</th>
            <td>3/30回目</td>
          </tr>
          <tr>
            <th>スピード</th>
            <td>{{ currentPlaybackData.settingsSpeed }}倍速<br>0.01秒ずつ加速</td>
          </tr>
        </table>
      </template>
      <div class="button--small">
        <button @click="onOpenModal()">編集</button>
      </div>
      <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
        <CommonPlaybackSettings pageName="edit" @closeModal="onCloseModal" />
      </div>
    </div>
    <div>
      <dl>
        <dt>
          休止設定
        </dt>
        <dd>
          <select @change="openModalFromSelect('pause')">
            <option value="">ちょっと休む/3秒</option>
            <option value="add">休止設定を設定する</option>
          </select>
          <div v-if="isModalOpen && pageNameFromSelect=='pause'" class="overlay">
            <ModalPauseSettings @closeModal="onCloseModal" />
          </div>
        </dd>
      </dl>
    </div>
  </main>
</template>