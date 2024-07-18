<script setup lang="ts">
  import {ref, inject, watch, onMounted} from "vue";
  import type{ PlaybackDataType } from '/src/interfaces';

  const playbackData = inject('playbackData') as Map<number, PlaybackDataType>;

  interface Props {
    pageName: string;
    currentPlaybackData: any;
  }
  const props = defineProps<Props>();

//** modal
  interface Emits {
    (event: 'closeModal', isModalOpen:boolean): void;
    (event: 'clickNext'): void;
    (event: 'saveData', isModalOpen:boolean, id:number): void;
  }
  const emit = defineEmits<Emits>();
  const onCloseModal = ():void => {
    emit('closeModal', false);
  };
//** modal

  const saveData = (aId:number):void => {
    if(settingsNameType.value=='custom' && !settingsNameCustom.value || !numberStart.value || !numberEnd.value || !initialSpeed.value || initialSpeed.value<=0 || !repetition.value || repetition.value<2 || !Number.isInteger(repetition.value) || !acceleration.value || acceleration.value<=0) {
      showAlert();
      return;
    }
    let numberType2Array = (numberType2.value) ? numberType2.value.split(',').filter(Boolean) : [];
    playbackData.set(aId, {id:aId, settingsNameType:settingsNameType.value, settingsNameAuto:settingsNameAuto.value, settingsNameCustom:settingsNameCustom.value, numType:numType.value, initialSpeed:initialSpeed.value, order:order.value, setRepetition:setRepetition.value, repetition:repetition.value, setAcceleration:setAcceleration.value, acceleration:acceleration.value, numberStart:numberStart.value, numberEnd:numberEnd.value, numberType2:numberType2Array});
    localStorage.setItem('playbackData', JSON.stringify([...playbackData]));
  };

  const onClickNext = ():void => {
    let id = playbackData.size + 1;
    saveData(id);
    emit('clickNext');
  };

  const onSaveEditData = ():void => {
    saveData(props.currentPlaybackData.id);
    emit('saveData', false, props.currentPlaybackData.id);
    emit('closeModal', false);
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
  const alertArray = ref([false,false,false,false,false,false,false]);

  const showAlert = ():void => {
    if(settingsNameType.value=='custom') {
      alertArray.value[0] = (!settingsNameCustom.value) ? true : false;
    }
    alertArray.value[1] = ( !numberStart.value || numberStart.value<0 || !Number.isInteger(numberStart.value) ) ? true : false;
    alertArray.value[2] = ( !numberEnd.value || numberEnd.value<0 || !Number.isInteger(numberEnd.value) || numberEnd.value<=numberStart.value ) ? true : false;
    alertArray.value[3] = ( !numberType2.value ) ? true : false;
    alertArray.value[4] = ( !initialSpeed.value || initialSpeed.value<=0 ) ? true : false;

    if(setRepetition.value) {
      alertArray.value[5] = ( !repetition.value || repetition.value<2 || !Number.isInteger(repetition.value) ) ? true : false;
      if(setAcceleration.value) {
        alertArray.value[6] = ( !acceleration.value || acceleration.value<=0 ) ? true : false;
      }
    }
  };

  watch([settingsNameType,settingsNameCustom,numType,numberStart,numberEnd,initialSpeed,order,setRepetition,setAcceleration,numberType2,repetition,acceleration], 
    (): void => {
      if(!setRepetition.value) {
        setAcceleration.value = false;
      }
      showAlert();

      numberType2.value = numberType2.value.replace(/[^0-9]/g, ',');
      let number = (numType.value=='type1') ? numberStart.value + '〜' + numberEnd.value : numberType2.value.split(',').filter(Boolean).toString();

      let repetitionText = (setRepetition.value) ? '-' + repetition.value + '回繰り返し' : '';
      let accelerationText = (setAcceleration.value) ? '-' + acceleration.value + '秒ずつ加速' : '';
      settingsNameAuto.value = number + '番-開始' + initialSpeed.value + '秒-' 
                            + orderJpArray[order.value-1] + repetitionText +  accelerationText;
    }
  );

  onMounted(
    (): void => {
      if(props.pageName=='edit') {
        settingsNameType.value = props.currentPlaybackData.settingsNameType;
        settingsNameCustom.value = props.currentPlaybackData.settingsNameCustom;
        numType.value = props.currentPlaybackData.numType;
        initialSpeed.value = props.currentPlaybackData.initialSpeed;
        order.value = props.currentPlaybackData.order;
        setRepetition.value = props.currentPlaybackData.setRepetition;
        repetition.value = props.currentPlaybackData.repetition;
        setAcceleration.value = props.currentPlaybackData.setAcceleration;
        acceleration.value = props.currentPlaybackData.acceleration;
        numberStart.value = props.currentPlaybackData.numberStart;
        numberEnd.value = props.currentPlaybackData.numberEnd;
        numberType2.value = props.currentPlaybackData.numberType2.toString();
      }
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
      <template v-if="settingsNameType==='auto'">
        {{ settingsNameAuto }}
      </template>
      <template v-else>
        <div>
          <input type="text" v-model="settingsNameCustom">
        </div>
        <small v-if="alertArray[0]" class="alert">※設定名を入力してください</small>
      </template>
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
        <input type="number" v-model="numberStart" step="1" min="0">
        <small v-if="alertArray[1]" class="alert">※開始番号を正の整数で入力してください</small>
      </div>
      <div>
        〜
      </div>
      <div>
        <small>終了番号</small><br><input type="number" v-model="numberEnd" step="1" min="1">
        <small v-if="alertArray[2]" class="alert">※終了番号を開始番号より大きな整数で入力してください。</small>
      </div>
    </div>
    <div v-if="numType==='type2'">
      <input type="text" v-model="numberType2">
      <small>番号を「,」で区切ってください。</small>
      <small v-if="alertArray[3]" class="alert">※番号を入力してください</small>
    </div>
  </div>
  <div class="form">
    開始速度
    <div class="form__input">
      <div>
        <input type="number" v-model="initialSpeed" step="0.01" min="0.01">
        <small v-if="alertArray[4]" class="alert">※0より大きい数値を入力してください</small>
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
        <div>
          回繰り返し<br>
          <small v-if="alertArray[5]" class="alert">※2以上の整数を入力してください</small>
        </div>
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
          <div>
            秒ずつ加速<br>
            <small v-if="alertArray[6]" class="alert">※0より大きい数値を入力してください</small>
          </div>
        </div>
      </template>
    </template>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button @click="onClickNext">完了</button>
  </div>
  <!-- initial -->
  <!-- modalPathEdit -->
  <div v-else-if="pageName==='edit'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button @click="onSaveEditData">保存</button>
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