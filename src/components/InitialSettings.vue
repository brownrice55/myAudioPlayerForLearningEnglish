<script setup lang="ts">
  import {ref} from "vue";
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';
  import CommonPlaybackSettings from '/src/components/CommonPlaybackSettings.vue';

  interface Props {
    initialNumber: number;
  }
  const props = defineProps<Props>();
  const initialNumber = ref(props.initialNumber);

  interface Emits {
    (event: 'setInitialNumber', initialNumber:number): void;
  }
  const emit = defineEmits<Emits>();

  const onClickNext = (aInitialNumber:number) => {
    if(aInitialNumber===3) {
      emit('setInitialNumber', 4);
    }
    initialNumber.value = aInitialNumber + 1;
  }

  const initialNav = ref(['音声データセット','パス設定','再生設定']);

</script>
<template>
  <nav>
    <ul class="nav">
      <template v-for="(nav,index) in initialNav">
        <li :class="(index+1)==initialNumber?'nav--active':''">{{ nav }}</li>
      </template>
    </ul>
  </nav>
  <main>
    <section v-if="initialNumber===1">
      <p>音声データをフォルダに入れて、dataフォルダ以下に配置してください。</p>
      <div class="button">
        <button @click="onClickNext(initialNumber)">次へ</button>
      </div>
    </section>
    <section v-else-if="initialNumber===2">
      <CommonPathSettings pageName="initial" initialNumber="2" @clickNext="onClickNext(initialNumber)" />
    </section>
    <section v-else>
      <CommonPlaybackSettings pageName="initial" initialNumber="3" @clickNext="onClickNext(initialNumber)" />
    </section>
  </main>
</template>
<style lang="scss" scoped>
  @import '/src/assets/_color';
  .nav {
    li {
      display: inline-block;
      padding: 0 0 20px;
    }
    &--active {
      background: $colorKey;
    }
  }
</style>