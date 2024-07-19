<script setup lang="ts">
  import {ref, watch, inject, onMounted} from "vue";
  import type{ PathDataType } from '/src/interfaces';

  const pathData = inject('pathData') as Map<number, PathDataType>;

  interface Props {
    pageName: string;
    currentPathData: any;
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
  let option = [...Array(300)].map((_,cnt)=>(cnt+1).toString());
  const optionArray = ref(option);
  const alertArray = ref([false,false]);

  const showAlert = ():void => {
    if(!settingsName.value) {
      alertArray.value[0] = true;
    }
    if(setDigit.value) {
      if(digit.value<0 || !digit.value) {
        alertArray.value[1] = true;
      }
    }
  };

  watch([settingsName,folderName,fileNoBefore,fileNoAfter,setDigit,digit], 
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

      alertArray.value = [false, false];
      showAlert();
      if(setDigit.value) {
        optionArray.value = [];
        let optionNum = '';
        for(let cnt=0,len=(10**digit.value); cnt<len-1; ++cnt) {
          optionNum = (setDigit.value) ? (digitZero + String(cnt+1)).slice(-digit.value) : (cnt+1).toString();
          optionArray.value.push(optionNum);
        };
      }
      else {
        optionArray.value = [...Array(300)].map((_,cnt)=>(cnt+1).toString());
      }
    }
  );

  const video = ref('');
  const onPlayback = ():void => {
   video.value = '<video controls v-if="path" id="video"><source src="' + path.value + '" type="video/mp4"></video>';
  };

  onMounted(
    (): void => {
      if(props.pageName=='edit') {
        settingsName.value = props.currentPathData.settingsName;
        folderName.value = props.currentPathData.folderName;
        setDigit.value = props.currentPathData.setDigit;
        digit.value = props.currentPathData.digit;
        extension.value = props.currentPathData.extension;
        fileNoBefore.value = props.currentPathData.fileNoBefore;
        fileNoAfter.value = props.currentPathData.fileNoAfter;
      }
    }
  );

  const saveData = (aId:number):void => {
    pathData.set(aId, {id:aId, settingsName:settingsName.value, folderName:folderName.value, setDigit:setDigit.value, digit:digit.value, fileNoBefore:fileNoBefore.value, fileNoAfter:fileNoAfter.value});
    localStorage.setItem('pathData', JSON.stringify([...pathData]));
  };

  const onClickNext = ():void => {
    if(!settingsName.value || setDigit.value && digit.value<0 || setDigit.value && !digit.value) {
      showAlert();
      return;
    }
    let id = pathData.size + 1;
    saveData(id);
    emit('clickNext');
  };

  const onSaveEditData = ():void => {
    saveData(props.currentPathData.id);
    emit('saveData', false, props.currentPathData.id);
    emit('closeModal', false);
  };

  const onSaveAddData = ():void => {
    let newId = pathData.size + 1;
    saveData(newId);
    emit('saveData', false, newId);
    emit('closeModal', false);
  };

</script>
<template>
  <div class="form">
    パス名<small v-if="alertArray[0]" class="alert">※パス名を入力してください</small>
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
      連番の桁数 <input type="number" v-model="digit" step="1" min="1" max="4">
    </div>
    <small v-if="alertArray[1]" class="alert">※自然数を入力してください</small>
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
    <button @click="onSaveEditData">保存</button>
  </div>
  <!-- modalPathEdit -->
  <!-- modalPathAdd -->
  <div v-else-if="pageName==='add'" class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button @click="onSaveAddData">保存</button>
  </div>
  <!-- modalPathAdd -->
</template>
<style lang="scss" scoped>
</style>