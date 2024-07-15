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

  const onClickNext = ():void => {
    if(initialNumber.value===3) {
      emit('setInitialNumber', 4);
    }
    ++initialNumber.value;
  }

  const initialNav = ref(['音声データ配置','パス設定','再生設定']);

</script>
<template>
  <nav>
    <ul class="nav">
      <template v-for="(nav,index) in initialNav" :key="index">
        <li :class="(index+1)==initialNumber?'nav--active':'nav--inactive'">
          <span>{{ nav }}</span>
        </li>
      </template>
    </ul>
  </nav>
  <main>
    <section v-if="initialNumber===1">
      <p>音声データをフォルダに入れて、dataフォルダ以下に配置してください。</p>
      <div class="button">
        <button @click="onClickNext">次へ</button>
      </div>
    </section>
    <section v-else-if="initialNumber===2">
      <CommonPathSettings pageName="initial" @clickNext="onClickNext" />
    </section>
    <section v-else>
      <CommonPlaybackSettings pageName="initial" @clickNext="onClickNext" />
    </section>
  </main>
</template>
<style lang="scss" scoped>
  @import '/src/assets/_common';
  .nav {
    display: flex;
    justify-content: space-between;
    li {
      position: relative;
      width: 100%;
      height: 40px;
      margin: 8px 20px 8px 0;
      font-size: 14px;
      line-height: 40px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -20px;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
      }
    }
    &--active {
      color: $colorWhite;
      background: $colorKey;
      &::after {
        border-left: 20px solid $colorKey;
      }
    }
    &--inactive {
      color: $colorFont;
      background: $colorLightGray;
      &::after {
        border-left: 20px solid $colorLightGray;
      }
    }
  }
</style>