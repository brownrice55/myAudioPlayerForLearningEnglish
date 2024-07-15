<script setup lang="ts">
  import {onMounted, provide, ref, reactive} from "vue";
  import InitialSettings from './components/InitialSettings.vue';
  import Playback from './components/Playback.vue';
  import PlaybackSettings from './components/PlaybackSettings.vue';
  import PathSettings from './components/PathSettings.vue';
  import type { PathDataType, PlaybackDataType, HistoryDataType } from './interfaces';

  const pageName = ref('playback');
  const selectPage = (aPage:string) => {
    pageName.value = aPage;
  };

  // ***data
  // パス設定と休止設定（一部）のデータ
  let pathData = new Map<number, PathDataType>();
  const pathDataJsonStr = localStorage.getItem('pathData');
  if(pathDataJsonStr!=='undefined') {
    const pathDataJson = JSON.parse(pathDataJsonStr);
    pathData = new Map<number, PathDataType>(pathDataJson);
  }
  provide('pathData', reactive(pathData));

  // 再生設定のデータ
  let playbackData = new Map<number, PlaybackDataType>();
  const playbackDataJsonStr = localStorage.getItem('playbackData');
  if(playbackDataJsonStr!=='undefined') {
    const playbackDataJson = JSON.parse(playbackDataJsonStr);
    playbackData = new Map<number, playbackDataType>(playbackDataJson);
  }
  provide('playbackData', reactive(playbackData));

  // 履歴のデータ
  let historyData = new Map<number, HistoryDataType>();
  const historyDataJsonStr = localStorage.getItem('historyData');
  if(historyDataJsonStr!=='undefined') {
    const historyDataJson = JSON.parse(historyDataJsonStr);
    historyData = new Map<number, historyDataType>(historyDataJson);
  }
  provide('historyData', reactive(historyData));
  
  
  // 休止設定のオプション（その他）のデータ

  const initialNumber = ref(1);

  // start 仮
  const isFirstTime = ref(true);
  if(pathData.size && playbackData.size) {
    isFirstTime.value = false;
  }
  else if(pathData.size) {
    initialNumber.value = 3;
  }

  const setFirstTimeFalse = () => {
    isFirstTime.value = false;
  }
  // end 仮
  // ***data

  onMounted(
    (): void => {
      if(isFirstTime.value) {
        // InitialSettings.vueを表示
      }
      else {//初期設定画面を表示
        // isFirstTime.value  = false;
      }
    }
  );
</script>

<template>
  <div class="container">
    <template v-if="isFirstTime">
      <InitialSettings @setInitialNumber="setFirstTimeFalse" :initialNumber="initialNumber" />
    </template>
    <template v-else>
      <header class="header">
        <ul class="header__nav">
          <li @click="selectPage('playback')">再生</li>
          <li @click="selectPage('playbackSettings')">再生設定</li>
          <li @click="selectPage('pathSettings')">パス設定</li>
        </ul>
      </header>
      <main>
        <section class="playback" v-if="pageName==='playback'">
          <Playback />
        </section>
        <section class="playbackSettings" v-else-if="pageName==='playbackSettings'">
          <PlaybackSettings />
        </section>
        <section v-else-if="pageName==='pathSettings'">
          <PathSettings />
        </section>
      </main>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>