<script setup lang="ts">
  import {ref, inject, watch} from "vue";
  import CommonPlaybackSettings from '/src/components/CommonPlaybackSettings.vue';
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';
  import type{ PathDataType, PlaybackDataType } from '/src/interfaces';

  interface Props {
    settingsName: string;
  }
  const props = defineProps<Props>();

  const pathDataInject = inject('pathData') as Map<number, PathDataType>;
  const pathData = ref(pathDataInject);

  const playbackDataInject = inject('playbackData') as Map<number, PlaybackDataType>;
  const playbackData = ref(playbackDataInject);

  const settingsNameJp = ref((props.settingsName=='playbackSettings') ? '再生設定' : 'パス設定');
  const settingsData = (props.settingsName=='playbackSettings') ? playbackData : pathData;
  const settingsDataName = ref((props.settingsName=='playbackSettings') ? 'playbackData' : 'pathData');

  const settingsRadioId = ref(0);
  const alert = ref(false);

  // ** modal
  const isModalOpen = ref(false);
  const modalName = ref('');
  const onOpenModal = (aModalName:string): void => {
    if(!settingsRadioId.value && aModalName=='edit') {
      alert.value = true;
      return;
    }
    alert.value = false;
    isModalOpen.value = !isModalOpen.value;
    modalName.value = aModalName;
  };
  const onCloseModal = (aIsModal:boolean):void => {
    isModalOpen.value = aIsModal;
  };
  // ** modal

  const onDelete = (aModalName:string):void => {
    if(!settingsRadioId.value && aModalName=='delete') {
      alert.value = true;
      return;
    }
    alert.value = false;
    settingsData.value.delete(settingsRadioId.value);
    localStorage.setItem(settingsDataName.value, JSON.stringify([...settingsData.value]));
    settingsRadioId.value = 0;

    let tempData = (props.settingsName=='playbackSettings') ? new Map<number, PlaybackDataType>() : new Map<number, PathDataType>();
    let cnt = 0;
    settingsData.value.forEach((value) => {
      if(props.settingsName=='playbackSettings') {
        tempData.set((cnt+1), {id:(cnt+1), settingsNameType:value.settingsNameType, settingsNameAuto:value.settingsNameAuto, settingsNameCustom:value.settingsNameCustom, numType:value.numType, initialSpeed:value.initialSpeed, order:value.order, setRepetition:value.setRepetition, repetition:value.repetition, setAcceleration:value.setAcceleration, acceleration:value.acceleration, numberStart:value.numberStart, numberEnd:value.numberEnd, numberType2:value.numberType2Array});
      }
      else {
        tempData.set((cnt+1), {id:(cnt+1), settingsName:value.settingsName, folderName:value.folderName, setDigit:value.setDigit, digit:value.digit, fileNoBefore:value.fileNoBefore, fileNoAfter:value.fileNoAfter});
      }
      cnt++;
    });

    localStorage.setItem(settingsDataName.value, JSON.stringify([...tempData]));
  };

  watch([settingsRadioId], 
    (): void => {
      if(settingsRadioId.value) {
        alert.value = false;
      }
    }
  );

</script>
<template>
  <div class="settings">
    <div class="settings__title">
      {{ settingsNameJp }}
    </div>
    <p>使用する設定を選択して、編集、または追加を押してください。</p>
    <ul class="settings__list">
      <li v-for="[id, data] in settingsData" :key="id">
        <input type="radio" :id="'radio' + id" name="radio" v-model="settingsRadioId" :value="id">
        <label :for="'radio' + id">
          <template v-if="props.settingsName=='playbackSettings'">
            {{ data.settingsNameType=='auto' ? data.settingsNameAuto : data.settingsNameCustom }}
          </template>
          <template v-else>
            {{ data.settingsName }}
          </template>
        </label>
      </li>
    </ul>
    <p v-if="alert">選択してください。</p>

    <div class="settings__btn">
      <button @click="onOpenModal('edit')">編集</button>
      <div v-if="isModalOpen && modalName=='edit'" class="overlay">
        <div>{{ settingsNameJp }} 編集</div>
        <template v-if="settingsName=='playbackSettings'">
          <CommonPlaybackSettings pageName="edit" @closeModal="onCloseModal" :currentPlaybackData="settingsData.get(settingsRadioId)" />
        </template>
        <template v-else>
          <CommonPathSettings pageName="edit" @closeModal="onCloseModal" :currentPathData="settingsData.get(settingsRadioId)" />
        </template>
      </div>
      <button @click="onDelete('delete')">削除</button>
    </div>

    <div class="settings__btn">
      <button @click="onOpenModal('add')">新規追加</button>
      <div v-if="isModalOpen && modalName=='add'" class="overlay">
        <div>{{ settingsNameJp }} 新規追加</div>
        <template v-if="settingsName=='playbackSettings'">
          <CommonPlaybackSettings pageName="add" @closeModal="onCloseModal" />
        </template>
        <template v-else>
          <CommonPathSettings pageName="add" @closeModal="onCloseModal" />
        </template>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import '/src/assets/_common';
  .settings {
    &__title {
      padding: 10px;
      font-size: rem(18px);
    }
    &__list {
      margin: 40px 0;
      line-height: 2;
      text-align: left;
      li {
        display: flex;
        input {
          + label {
            display: flex;
            align-items: center;
            &:before {
              content: '';
              background: $colorWhite;
              border-radius: 100%;
              border: 2px solid $colorFont;
              display: block;
              width: 24px;
              height: 24px;
              margin: 0 8px 0 0;
              padding: 0;
              cursor: pointer;
            }
          }
          &:checked {
            + label {
              &:before {
                background: $colorFont;
                box-shadow: inset 0 0 0 4px $colorWhite;
              }
            }
          }
        }
      }
    }
    &__btn {
      @include btn;
    }
  }
</style>