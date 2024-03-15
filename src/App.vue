<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import InitialSettings from './components/InitialSettings.vue';
  import Playback from './components/Playback.vue';
  import PlaybackSettings from './components/PlaybackSettings.vue';
  import PathSettings from './components/PathSettings.vue';

  const pageName = ref('playback');
  const selectPage = (aPage:string) => {
    pageName.value = aPage;
  };

  // ***data
  // パス設定と休止設定（一部）のデータ
  // 再生設定のデータ
  // 履歴のデータ
  // 休止設定のオプション（その他）のデータ
  const isFirstTime = ref(false);//仮
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
      <InitialSettings />
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