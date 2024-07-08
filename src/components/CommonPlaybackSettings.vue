<script setup lang="ts">
  import {ref, inject} from "vue";
  import type{ PlaybackDataType } from '/src/interfaces';

  const playbackData = inject('playbackData') as Map<number, PlaybackDataType>;

  interface Props {
    pageName: string;
    initialNumber: number;
  }
  
  const props = defineProps<Props>();

//** modal
  interface Emits {
    (event: 'closeModal', isModalOpen:boolean): void;
    (event: 'clickNext'): void;
  }
  const emit = defineEmits<Emits>();
  const onCloseModal = () => {
    emit('closeModal', false);
  };
//** modal

  const onClickNext = (aSettingsNameType, aSettingsNameAuto, aSettingsNameCustom, aSettingsType, aSettingsSpeed, aSettingsOrder, aSettingsRepetition, aNumber1, aNumber2) => {
    let id = playbackData.size + 1;
    playbackData.set(id, {id:id, settingsNameType: aSettingsNameType, settingsNameAuto: aSettingsNameAuto, settingsNameCustom: aSettingsNameCustom, settingsType: aSettingsType, settingsSpeed: aSettingsSpeed, settingsOrder: aSettingsOrder, settingsRepetition: aSettingsRepetition, number1:aNumber1, number2:aNumber2});
    localStorage.setItem('playbackData', JSON.stringify([...playbackData]));
    emit('clickNext');
  };

  const settingsNameType = ref('auto');
  const settingsNameAuto = ref('デフォルト');
  const settingsNameCustom = ref('');
  const settingsType = ref('type1');
  const settingsSpeed = ref(0.75);
  const settingsOrder = ref(1);
  const settingsRepetition = ref(false);
  const number1 = ref(1);
  const number2 = ref(100);

</script>
<template>
  <div class="form">
    設定名
    <label><input type="radio" name="settingsNameType" v-model="settingsNameType" value="auto">自動</label>
    <label><input type="radio" name="settingsNameType" v-model="settingsNameType" value="custom">カスタム</label>
  </div>
  <div class="form">
    <div v-if="settingsNameType==='auto'">{{ settingsNameAuto }}</div>
    <div v-else><input type="text" v-model="settingsNameCustom"></div>
  </div>
  <div class="form">
    <div>
      <label><input type="radio" name="settingsType" v-model="settingsType" value="type1">開始番号と終了番号を指定</label>
      <div v-if="settingsType==='type1'">
        開始番号 <input type="number" v-model="number1"> 〜 終了番号<input type="number" v-model="number2">
      </div>
    </div>
    <div>
      <label><input type="radio" name="settingsType" v-model="settingsType" value="type2">音声ファイルの番号を指定</label>
      <div v-if="settingsType==='type2'">
        <input type="text">
        <p>番号を「,」で区切ってください。</p>
      </div>
    </div>
  </div>
  <div class="form">
    開始速度 <input type="number" v-model="settingsSpeed"> 倍速
  </div>
  <ul>
    <li><input type="radio" name="settingsOrder" v-model="settingsOrder" value="1">昇順再生（最初から再生）</li>
    <li><input type="radio" name="settingsOrder" v-model="settingsOrder" value="2">降順再生（後ろから再生）</li>
    <li><input type="radio" name="settingsOrder" v-model="settingsOrder" value="3">ランダム再生</li>
  </ul>
  <div class="form">
    <label><input type="checkbox" name="settingsRepetition" v-model="settingsRepetition">リピートする</label>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button @click="onClickNext(settingsNameType, settingsNameAuto, settingsNameCustom, settingsType, settingsSpeed, settingsOrder, settingsRepetition, number1, number2)">完了</button>
  </div>
  <!-- initial -->
  <!-- modalPathEdit -->
  <div v-else-if="pageName==='edit'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
  <!-- modalPathEdit -->
  <!-- modalPathAdd -->
  <div v-else-if="pageName==='add'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
  <!-- modalPathAdd -->
</template>
<style lang="scss" scoped>
</style>