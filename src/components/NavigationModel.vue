<template>
  <transition name="opacity">
    <div class="navigation-model" v-if="visible" @click.self="closeModel">
      <transition name="trans">
        <div class="navigation-model__content" :style="bodyStyle">
          <div class="navigation-model__body">
            <slot />
          </div>
          <div class="navigation-model__footer">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NavigationModel",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 600,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    bodyStyle() {
      let left = this.width / 2;
      return { width: `${this.width}px`, left: `calc(50% - ${left}px)` };
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit("open");
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        if (!this.closed) this.$emit("close");
      }
    },
  },
  methods: {
    closeModel() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>

<style scoped>
.navigation-model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(130, 130, 130, 0.68);
  backdrop-filter: blur(2px);
  z-index: 2000;
}
.navigation-model__content {
  height: max-content;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.navigation-model__body {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}
.navigation-model__footer {
  height: 48px;
  display: inline-flex;
  justify-content: center;
}
.navigation-model__button {
  display: block;
  padding: 8px 16px;
  color: #ffffff;
  background: #333333;
  border-radius: 4px;
}
</style>
