<template>
  <div class="video message-text__wrap">
    <video :src="url" muted playsInline @click="onClick" />
    <wooh-modal :show.sync="show" :on-close="onClose">
      <video :src="url" controls playsInline class="modal-video" />
    </wooh-modal>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onClose() {
      this.show = false;
    },
    onClick() {
      this.show = true;
    },
  },
};
</script>
