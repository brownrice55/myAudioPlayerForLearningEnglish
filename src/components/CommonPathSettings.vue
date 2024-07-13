<script setup lang="ts">
  import {ref, watch, inject} from "vue";
  import type{ PathDataType } from '/src/interfaces';

  const pathData = inject('pathData') as Map<number, PathDataType>;

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

  const onClickNext = () => {
    if(!settingsName.value) {
      alert.value = true;
      return;
    }
    let id = pathData.size + 1;
    pathData.set(id, {id:id, settingsName:settingsName.value, folderName:folderName.value, setDigit:setDigit.value, digit:digit.value, fileNoBefore:fileNoBefore.value, fileNoAfter:fileNoAfter.value});
    localStorage.setItem('pathData', JSON.stringify([...pathData]));
    emit('clickNext');
  };

  const settingsName = ref('');
  const folderName = ref('');
  const digit = ref(2);
  const fileNoBefore = ref('');
  const fileNoAfter = ref('');
  const fileNo = ref('1');
  const extension = ref('.mp3');
  const directoryPath = ref('data/');
  const path = ref(directoryPath.value + fileNo.value + '.mp3');
  const setDigit = ref(false);
  let option = [...Array(300)].map((_,cnt)=>cnt+1);
  const optionArray = ref(option);
  const alert = ref(false);

  watch([folderName,fileNoBefore,fileNoAfter,setDigit,digit], 
    (): void => {
      let digitZero = '';
      if(setDigit.value) {
        for(let cnt=0;cnt<digit.value;++cnt) {
          digitZero += '0';
        }
      }
      fileNo.value = (setDigit.value) ? (digitZero + '1').slice(-digit.value) : '1';
      let directoryPath2 = (folderName.value) ? folderName.value + '/' : '';
      directoryPath.value = '/data/' + directoryPath2;
      path.value = directoryPath.value + fileNoBefore.value + fileNo.value + fileNoAfter.value + '.mp3';

      for(let cnt=0; cnt<300; ++cnt) {
        optionArray.value[cnt] = (setDigit.value) ? (digitZero + String(cnt+1)).slice(-digit.value) : cnt+1;
      };
    }
  );

  const video = ref('');
  const onPlayback = ():void => {
   video.value = '<video controls v-if="path" id="video"><source src="' + path.value + '" type="video/mp4"></video>';
  };

</script>
<template>
  <div class="form">
    パス名<small v-if="alert" class="alert">※パス名を入力してください</small>
    <input type="text" v-model="settingsName"><br>
    <small>例）黒色の参考書のパス</small>
  </div>
  <div class="form">
    フォルダ名
    <input type="text" v-model="folderName">
  </div>
  <div class="form">
    ファイル名<br>
    <div>
      <small>※ファイル名の連番の前後に文字列がある場合は入力してください。</small>
      <div class="form__input">
        <input type="text" v-model="fileNoBefore">{{ fileNo }}<input type="text" v-model="fileNoAfter">
        <div class="form__select">
          <select v-model="extension">
            <option value=".mp3">.mp3</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form__checkbox">
      <input type="checkbox" id="checkboxDigit" v-model="setDigit">
      <label for="checkboxDigit">連番の桁数を揃える</label>
    </div>
    <div v-if="setDigit" class="form__input">
      連番の桁数 <input type="number" v-model="digit">
    </div>
  </div>
  <div class="form">
    <div class="form__input">
      {{ directoryPath }}{{ fileNoBefore }}
      <div class="form__select">
        <select>
          <template v-for="(n, i) in optionArray" :key="i">
            <option :value="n">{{ n }}</option>
          </template>
        </select>
      </div>{{ fileNoAfter }}
      {{ extension }}
    </div>
    <button @click="onPlayback">再生して、上記のパスが合っているか確認する</button>
    <div v-html="video"></div>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button @click="onClickNext">次へ</button>
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