<script setup lang="ts">
  import {ref} from "vue";
  import ModalPlaybackHistory from '/src/components/ModalPlaybackHistory.vue';
  import ModalPauseSettings from '/src/components/ModalPauseSettings.vue';
  import CommonPathSettings from '/src/components/CommonPathSettings.vue';
  import CommonPlaybackSettings from '/src/components/CommonPlaybackSettings.vue';

  const pageName = ref('playback');
  const pageNameFromSelect = ref('');

  const selectPage = (aPage:string) => {
    pageName.value = aPage;
  };

  const openModalFromSelect = (aName:string): void => {
    let target = event.target;
    if(target.value=='add') {
      pageNameFromSelect.value = aName;
      isModalOpen.value = !isModalOpen.value;
      target.childNodes[0].selected = true;//「選択して下さい」に戻す
    }
  };

  // ** modal
  const isModalOpen = ref(false);
  const onOpenModal = (): void => {
    isModalOpen.value = !isModalOpen.value;
  };
  const onCloseModal = (aIsModal:boolean) => {
    isModalOpen.value = aIsModal;
    if(pageNameFromSelect.value) {
      pageNameFromSelect.value = '';
    }
  };
  // ** modal

</script>
<template>
  <nav class="playback__nav">
    <ul>
      <li @click="selectPage('playback')" :class="{active: pageName==='playback'}">
        設定を指定して再生
      </li>
      <li @click="selectPage('playback-history')" :class="{active: pageName==='playback-history'}">
        履歴から再生
      </li>
    </ul>
  </nav>
  <template v-if="pageName==='playback'">
    <main class="playback__main">
      <dl>
        <dt>パス</dt>
        <dd>
          <select @change="openModalFromSelect('path')">
            <option value="">選択してください</option>
            <option value="黒色の参考書のパス">黒色の参考書のパス</option>
            <option value="add">パスを追加する</option>
          </select>
          <div v-if="isModalOpen && pageNameFromSelect==='path'" class="overlay">
            <CommonPathSettings pageName="add" @closeModal="onCloseModal" />
          </div>
        </dd>
      </dl>
      <dl>
        <dt>再生設定</dt>
        <dd>
          <select @change="openModalFromSelect('playback')">
            <option value="">選択してください</option>
            <option value="add">再生設定を追加する</option>
          </select>
          <div v-if="isModalOpen && pageNameFromSelect==='playback'" class="overlay">
            <CommonPlaybackSettings pageName="add" @closeModal="onCloseModal" />
          </div>
        </dd>
      </dl>
      <div class="table">
        <table>
          <tr>
            <th>再生番号</th>
            <td>1〜100</td>
          </tr>
          <tr>
            <th>現在再生中の問題の番号</th>
            <td>1</td>
          </tr>
          <tr>
            <th>リピート再生</th>
            <td>3/30回目</td>
          </tr>
          <tr>
            <th>スピード</th>
            <td>0.83倍速<br>0.01秒ずつ加速</td>
          </tr>
        </table>
        <div class="button--small">
          <button @click="onOpenModal()">編集</button>
        </div>
        <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
          <CommonPlaybackSettings pageName="edit" @closeModal="onCloseModal" />
        </div>
      </div>
      <div>
        <dl>
          <dt>
            休止設定
          </dt>
          <dd>
            <select @change="openModalFromSelect('pause')">
              <option value="">ちょっと休む/3秒</option>
              <option value="add">休止設定を設定する</option>
            </select>
            <div v-if="isModalOpen && pageNameFromSelect=='pause'" class="overlay">
              <ModalPauseSettings @closeModal="onCloseModal" />
            </div>
          </dd>
        </dl>
      </div>
    </main>
  </template>
  <template v-else>
    <main>
      <div>
        <span>前回（2/22）の履歴</span>
        <div class="button--small">
          <button @click="onOpenModal()">他の履歴を選択する</button>
        </div>
      </div>
      <div v-if="isModalOpen && !pageNameFromSelect" class="overlay">
        <ModalPlaybackHistory @closeModal="onCloseModal" />
      </div>
      <div class="table">
        <table>
          <tr>
            <th>再生番号</th>
            <td>2,13,30,41,50,61,65</td>
          </tr>
          <tr>
            <th>現在再生中の問題の番号</th>
            <td>1</td>
          </tr>
          <tr>
            <th>リピート再生</th>
            <td>3/3回目</td>
          </tr>
          <tr>
            <th>スピード</th>
            <td>1倍速</td>
          </tr>
        </table>
      </div>
    </main>
  </template>
  <section>
    <div>休止中：再開まで 1秒</div>
    <video playsinline autoplay controls>
      <source src="" type="video/mp4">
    </video>
    <div class="button">
      <button>もう1回</button>
    </div>
    <p>「もう1回」を押すと、履歴にもう一度練習したい番号が残ります。何も押さなかった場合は番号の指定はありませんが、再生が最後まで終わらなかった（途中で止めた）場合は、履歴に未再生の番号も残ります。</p>
  </section>
</template>

<style lang="scss" scoped>
  @import '/src/assets/_color';
  .playback {
    &__nav {
      li {
        display: inline-block;
        cursor: pointer;
        padding: 10px 20px 20px;
        &.active {
          border-top: 2px solid $colorFont;
        }
      }
    }
    main {
      margin: 0 auto;
      dt, dd {
        display: inline-block;
      }
      .table {
        background: #ccc;
        padding: 16px 8px;
        margin: 16px;
        th, td {
          text-align: left;
          font-weight: normal;
        }
      }
    }
  }
</style>