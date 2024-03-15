<script setup lang="ts">

//** modal
interface Emits {
    (event: 'closeModal', isModalOpen:boolean): void;
  }
  const emit = defineEmits<Emits>();
  const onCloseModal = () => {
    emit('closeModal', false);
  };
//** modal

</script>
<template>
  <h1>休止設定</h1>
  <div>
    <ul>
      <li>
        <input type="radio" id="pause1" name="pause">
        <label for="pause1">無し</label>
      </li>
      <li>
        <input type="radio" id="pause2" name="pause">
        <label for="pause2">ちょっと休む <input type="text" value="3">秒</label>
      </li>
      <li>
        <input type="radio" id="pause3" name="pause">
        <label for="pause3">音声を全部聞いてから読む/ 音声の後にもう一度読む <input type="text" value="20">秒</label>
      </li>
      <li>
        <input type="radio" id="pause_other1" name="pause">
        <label for="pause_other1">
          <input type="text" value="その他1">
          <input type="number" value="60">秒
        </label>
      </li>
      <li>
        <input type="radio" id="pause_other2" name="pause">
        <label for="pause_other2">
          <input type="text" value="その他2">
          <input type="number" value="120">秒
        </label>
      </li>
      <li>
        <input type="radio" id="pause_other3" name="pause">
        <label for="pause_other3">
          <input type="text" value="その他3">
          <input type="number" value="240">秒
        </label>
      </li>
      <li>
        <input type="radio" id="pause_other4" name="pause">
        <label for="pause_other4">
          <input type="text" value="その他4">
          <input type="number" value="480">秒
        </label>
      </li>
      <li>
        <input type="radio" id="pause_other5" name="pause">
        <label for="pause_other5">
          <input type="text" value="その他1">
          <input type="number" value="600">秒
        </label>
      </li>
    </ul>
  </div>
  <div class="button">
    <button @click="onCloseModal">キャンセル</button>
    <button>保存</button>
  </div>
  <div>
    <p>「保存」を押すと、「ちょっと休む」「音声を全部聞いてから読む/音声の後にもう一度読む」の秒数はパス設定にも反映されます。</p>
    <p>その他にも、単語の意味を確認したい時などにもう少し時間が必要な場合や、飽きないように合間に何か繰り返しの作業ができる時間を入れたり（例えば「腹筋3回ずつ」や「ストレッチ1分ずつ」等）、再生の途中でもプルダウンで設定を変更できるので、予め設定しておくと、繰り返しではなくても、途中でお茶を入れたり、トイレに行ったりする際に流れを止めたくない場合に使えます。</p>
  </div>
</template>