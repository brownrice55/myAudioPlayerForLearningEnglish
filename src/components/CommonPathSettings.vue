<script setup lang="ts">
  import {ref, watch, inject} from "vue";
  import type{ PathDataType } from '/src/interfaces';

  const pathData = inject('pathData') as Map<number, PathDataType>;

  interface Props {
    pageName: string;
    initialNumber: number;
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

  const onClickNext = (aName, aFolder, aSetDigit, aDigit, aFilename1, aFilename2) => {
    let id = pathData.size + 1;
    pathData.set(id, {id:id, name:aName, folder:aFolder, setDigit: aSetDigit, digit: aDigit, filename1:aFilename1, filename2:aFilename2});
    localStorage.setItem('pathData', JSON.stringify([...pathData]));
    emit('clickNext');
  };

  const pathName = ref('');
  const folder = ref('');
  const digit = ref(2);
  const filename1 = ref('');
  const filename2 = ref('');
  const filename = ref('1');
  const path = ref('data/1.mp3');
  const setDigit = ref(false);

  watch([folder,filename1,filename2,setDigit,digit], 
    (): void => {
      let digitZero = '';
      if(setDigit.value) {
        for(let cnt=0;cnt<digit.value;++cnt) {
          digitZero += '0';
        }
      }
      filename.value = (setDigit.value) ? (digitZero + '1').slice(-digit.value) : '1';
      let folderName = (folder.value) ? folder.value + '/' : '';
      path.value = '/data/' + folderName + filename1.value + filename.value + filename2.value + '.mp3';
    }
  )
</script>
<template>
  <div class="form">
    <label for="">パス名</label>
    <input type="text" v-model="pathName"><br>
    <small>例）黒色の参考書のパス</small>
  </div>
  <div class="form">
    拡張子
    <select>
      <option value=".mp3">.mp3</option>
    </select>
    フォルダ名
    <input type="text" v-model="folder">
  </div>
  <div class="form">
    ファイル名<br>
    <label><input type="checkbox" v-model="setDigit">桁数を揃える</label>
    <div v-if="setDigit">
      連番の桁数 <input type="number" v-model="digit">
    </div>
    <div>
      連番の前後の文字列
      <input type="text" v-model="filename1">
      {{ filename }}
      <input type="text" v-model="filename2">
    </div>
  </div>
  <div class="form">
    {{ path }}
  </div>
  <div class="form">
    <p>再生して、パスが合っているか確認する</p>
  </div>
  <div class="form">
    <video controls v-if="path" id="video">
      <source :src="path" type="video/mp4">
    </video>
  </div>
  <!-- initial -->
  <div v-if="pageName==='initial'" class="button">
    <button @click="onClickNext(pathName, folder, setDigit, digit, filename1, filename2)">次へ</button>
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