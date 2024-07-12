<script setup lang="ts">
  import {ref, inject} from "vue";
  import PlaybackNormal from '/src/components/PlaybackNormal.vue';
  import PlaybackHistory from '/src/components/PlaybackHistory.vue';
  import type{ PathDataType } from '/src/interfaces';

  const pathDataInject = inject('pathData') as Map<number, PathDataType>;
  const pathData = ref(pathDataInject);

  const pageName = ref('playback');

  const selectPage = (aPage:string) => {
    pageName.value = aPage;
  };

  const src = ref('');
  const currentPathData = ref('');
  const fileName = ref('');
  const sourceHTML = ref('');

  const onSetPath = (aId:number): void => {
    currentPathData.value = pathData.value.get(aId);
    src.value = '/data/' + currentPathData.value.folderName + '/';
    if(fileName.value) {
      sourceHTML.value = '<video playsinline autoplay controls><source src="' + src.value + fileName.value + '" type="video/mp4"></video>';
    }
  };
  const onSetNum = (aNumber:number): void => {
    fileName.value = aNumber + '.mp3';
    if(src.value) {
      sourceHTML.value = '<video playsinline autoplay controls><source src="' + src.value + fileName.value + '" type="video/mp4"></video>';
    }
  };

</script>
<template>
  <nav class="playback__nav">
    <ul>
      <li @click="selectPage('playback')" :class="{active: pageName==='playback'}">
        設定を指定して再生
      </li>
      <li @click="selectPage('playback-history')" :class="{active: pageName==='playback-history'}">
        履歴から再生
      </li>
    </ul>
  </nav>
  <template v-if="pageName==='playback'">
    <PlaybackNormal @setPath="onSetPath" @setNum="onSetNum" />
  </template>
  <template v-else>
    <PlaybackHistory />
  </template>
  <section>
    <div>休止中：再開まで 1秒</div>
    <div v-html="sourceHTML"></div>
    <div class="button">
      <button>もう1回</button>
    </div>
    <p>「もう1回」を押すと、履歴にもう一度練習したい番号が残ります。何も押さなかった場合は番号の指定はありませんが、再生が最後まで終わらなかった（途中で止めた）場合は、履歴に未再生の番号も残ります。</p>
  </section>
</template>

<style lang="scss" scoped>
  @import '/src/assets/_color';
  .playback {
    &__nav {
      li {
        display: inline-block;
        cursor: pointer;
        padding: 10px 20px 20px;
        &.active {
          border-top: 2px solid $colorFont;
        }
      }
    }
    main {
      margin: 0 auto;
      dt, dd {
        display: inline-block;
      }
      .table {
        background: #ccc;
        padding: 16px 8px;
        margin: 16px;
        th, td {
          text-align: left;
          font-weight: normal;
        }
      }
    }
  }
</style>