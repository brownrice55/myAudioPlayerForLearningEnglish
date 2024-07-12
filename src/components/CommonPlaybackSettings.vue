<script setup lang="ts">
  import {ref, inject,watch} from "vue";
  import type{ PlaybackDataType } from '/src/interfaces';

  const playbackData = inject('playbackData') as Map<number, PlaybackDataType>;

  interface Props {
    pageName: string;
  }
  
  defineProps<Props>();

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

  const onClickNext = (aSettingsNameType, aSettingsNameAuto, aSettingsNameCustom, aNumType, aInitialSpeed, aOrder, aSetRepetition, aRepetition, aSetAcceleration, aAcceleration, aNumberStart, aNumberEnd) => {
    let id = playbackData.size + 1;
    playbackData.set(id, {id:id, settingsNameType: aSettingsNameType, settingsNameAuto: aSettingsNameAuto, settingsNameCustom: aSettingsNameCustom, numType: aNumType, initialSpeed: aInitialSpeed, order: aOrder, setRepetition: aSetRepetition, repetition: aRepetition, setAcceleration: aSetAcceleration, acceleration: aAcceleration, numberStart:aNumberStart, numberEnd:aNumberEnd});
    localStorage.setItem('playbackData', JSON.stringify([...playbackData]));
    emit('clickNext');
  };

  const settingsNameType = ref('auto');
  const settingsNameAuto = ref('1〜100番-開始0.75秒-昇順再生');
  const settingsNameCustom = ref('');
  const numType = ref('type1');
  const initialSpeed = ref(0.75);
  const order = ref(1);
  const orderJpArray = ['昇順再生','降順再生','ランダム再生'];
  const orderJpArray2 = ['最初から再生','後ろから再生',''];
  const setRepetition = ref(false);
  const repetition = ref(2);
  const setAcceleration = ref(false);
  const acceleration = ref(0.01);
  const numberStart = ref(1);
  const numberEnd = ref(100);
  const numberType2 = ref('1');
  const orderChecked = ref([true,false,false]);


  watch([numType,numberStart,numberEnd,initialSpeed,order,setRepetition,setAcceleration,numberType2], 
    (): void => {
      if(!setRepetition.value) {
        setAcceleration.value = false;
      }

      let number = (numType.value=='type1') ? numberStart.value + '〜' + numberEnd.value : numberType2.value;
      let repetitionText = (setRepetition.value) ? '-' + repetition.value + '回繰り返し' : '';
      let accelerationText = (setAcceleration.value) ? '-' + acceleration.value + '秒ずつ加速' : '';
      settingsNameAuto.value = number + '番-開始' + initialSpeed.value + '秒-' 
                            + orderJpArray[order.value-1] + repetitionText +  accelerationText;
    }
  );

</script>
<template>
  <div class="form">
    <div>設定名</div>
    <div class="form__radio">
      <input type="radio" name="settingsNameType" v-model="settingsNameType" id="radioNameType1" value="auto">
      <label for="radioNameType1">自動</label>
      <input type="radio" name="settingsNameType" v-model="settingsNameType" id="radioNameType2" value="custom">
      <label for="radioNameType2">カスタム</label>
    </div>
    <div class="form__cont">
      <div v-if="settingsNameType==='auto'">{{ settingsNameAuto }}</div>
      <div v-else><input type="text" v-model="settingsNameCustom"></div>
    </div>
  </div>
  <div class="form">
    <div class="form__radio">
      <input type="radio" name="numType" v-model="numType" id="radioType1" value="type1">
      <label for="radioType1">開始番号と終了番号を指定</label>
      <input type="radio" name="numType" v-model="numType" id="radioType2" value="type2">
      <label for="radioType2">音声ファイルの番号を指定</label>
    </div>
    <div v-if="numType==='type1'" class="form__input">
      <div>
        <small>開始番号</small>
        <input type="number" v-model="numberStart">
      </div>
      <div>
        〜
      </div>
      <div>
        <small>終了番号</small><br><input type="number" v-model="numberEnd">
      </div>
    </div>
    <div v-if="numType==='type2'">
      <input type="text" v-model="numberType2">
      <small>番号を「,」で区切ってください。</small>
    </div>
  </div>
  <div class="form">
    開始速度
    <div class="form__input">
      <div>
        <input type="number" v-model="initialSpeed" step="0.01"> 
      </div>
      <div>倍速</div>
    </div>
  </div>
  <div class="form">
    <ul>
      <template v-for="n in 3" :key="n">
      <li class="form__radio">
        <input type="radio" name="order" v-model="order" :id="'radioOrder' + n" :value="n" :checked="orderChecked[n-1]">
        <label :for="'radioOrder' + n">{{ orderJpArray[n-1] }}{{ (orderJpArray2[n-1]) ? '（' + orderJpArray2[n-1] + '）' : '' }}</label>
      </li>
      </template>
    </ul>
  </div>
  <div class="form">
    <div class="form__checkbox">
      <input type="checkbox" name="setRepetition" v-model="setRepetition" id="checkboxRepetition">
      <label for="checkboxRepetition">リピートする</label>
    </div>
    <template v-if="setRepetition">
      <div class="form__input">
        <div>
          <input type="number" v-model="repetition">
        </div>
        <div>回繰り返し</div>
      </div>
      <div class="form__checkbox">
        <input type="checkbox" name="setRepetition" v-model="setAcceleration" id="checkboxAcceleration">
        <label for="checkboxAcceleration">徐々に速度を上げる</label>
      </div>
      <template v-if="setAcceleration">
        <div class="form__input">
          <div>
            <input type="number" v-model="acceleration" step="0.01">
          </div>
          <div>秒ずつ加速</div>
        </div>
      </template>
    </template>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button @click="onClickNext(settingsNameType, settingsNameAuto, settingsNameCustom, numType, initialSpeed, order, setRepetition, repetition, setAcceleration, acceleration, numberStart, numberEnd)">完了</button>
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