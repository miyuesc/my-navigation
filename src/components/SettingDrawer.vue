<template>
  <transition name="opacity">
    <div
      class="my-setting-drawer__cover"
      v-show="visible"
      @click.self="closeModel"
    >
      <transition name="fade-right">
        <div class="my-setting-drawer" v-show="visible" :style="{ width: `${width}px` }">
          <div class="my-setting-item">
            <div class="my-setting-item__label">单行地址条数：</div>
            <div class="my-setting-item__content">
              <label for="radio-4" class="my-radio" :aria-checked="setting.lineLimit === '4'">
                <input class="radio-input" name="line-limit" type="radio" value="4" id="radio-4" @change="handleChange">
                <span>4</span>
              </label>
              <label for="radio-5" class="my-radio" :aria-checked="setting.lineLimit === '5'">
                <input class="radio-input" name="line-limit" type="radio" value="5" id="radio-5" @change="handleChange">
                <span>5</span>
              </label>
              <label for="radio-6" class="my-radio" :aria-checked="setting.lineLimit === '6'">
                <input class="radio-input" name="line-limit" type="radio" value="6" id="radio-6" @change="handleChange">
                <span>6</span>
              </label>
              <label for="radio-7" class="my-radio" :aria-checked="setting.lineLimit === '7'">
                <input class="radio-input" name="line-limit" type="radio" value="6" id="radio-7" @change="handleChange">
                <span>7</span>
              </label>
              <label for="radio-8" class="my-radio" :aria-checked="setting.lineLimit === '8'">
                <input class="radio-input" name="line-limit" type="radio" value="6" id="radio-8" @change="handleChange">
                <span>8</span>
              </label>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SettingDrawer",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 480
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return  {
      visibleS: false,
      setting: {
        lineLimit: "4"
      }
    }
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
    }
  },
  methods: {
    closeModel() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    handleChange(e) {
      console.log(e.target.value);
      this.setting.lineLimit = e.target.value;
    }
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  }
};
</script>

<style scoped>
.my-setting-drawer__cover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(130, 130, 130, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2001;
}
.my-setting-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-sizing: border-box;
  padding: 16px;
}
.my-setting-item {
  display: inline-flex;
  width: 100%;
}
.my-setting-item__content {
  flex: 1;
  display: inline-flex;
  justify-content: space-between;
}
.my-radio {
  width: 60px;
}
</style>
