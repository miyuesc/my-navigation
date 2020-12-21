<template>
  <transition name="opacity">
    <div class="navigation-model" v-show="visible" @click.self="closeModel">
      <transition name="trans">
        <div class="navigation-model__content" :style="{ width: `${width}px` }">
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
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        if (!this.closed) this.$emit('close');
      }
    }
  },
  methods: {
    closeModel() {
      this.$emit('update:visible', false);
      this.$emit("close");
    }
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
  }
}
</script>

<style scoped>
.navigation-model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(130,130,130,.5);
  z-index: 2000;
}
.navigation-model__content {
  height: max-content;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 140px);
}
.navigation-model__body {
  flex: 1;
  width: 100%;
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
.opacity-leave-active,
.opacity-enter-active {
  transition: all ease 0.32s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}
.trans-leave-active,
.trans-enter-active {
  transition: all ease 0.32s;
}
.trans-enter,
.trans-leave-to {
  transform: translateY(-10px);
}
.trans-enter-to,
.trans-leave {
  transform: translateY(0);
}
</style>