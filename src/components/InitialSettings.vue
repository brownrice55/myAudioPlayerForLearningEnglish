<script setup lang="ts">
  import {ref} from "vue";
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';
  import CommonPlaybackSettings from '/src/components/CommonPlaybackSettings.vue';

  //**data/
  //仮
  const initialSettings = ref(3);
  //**data/

</script>
<template>
  <nav>
    <ul class="nav">
      <li>音声データセット</li>
      <li>パス設定</li>
      <li>再生設定</li>
    </ul>
  </nav>
  <main>
    <section v-if="initialSettings===1">
      <p>音声データをフォルダに入れて、dataフォルダ以下に配置してください。</p>
      <div class="button">
        <button>次へ</button>
      </div>
    </section>
    <section v-else-if="initialSettings===2">
      <CommonPathSettings pageName="initial" />
    </section>
    <section v-else>
      <CommonPlaybackSettings pageName="initial" />
    </section>
  </main>
</template>
<style lang="scss" scoped>
  .nav {
    li {
      display: inline-block;
      padding: 0 0 20px;
    }
  }
</style>