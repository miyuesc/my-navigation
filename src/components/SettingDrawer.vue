<template>
  <el-drawer :visible.sync="settingVisible" title="设置" append-to-body destroy-on-close @close="closeModel">
    <el-form :model="settingForm" label-width="100px">
      <el-form-item label="每行地址数：">
        <el-radio-group v-model="settingForm.lineLimit">
          <el-radio label="4">4</el-radio>
          <el-radio label="5">5</el-radio>
          <el-radio label="6">6</el-radio>
          <el-radio label="7">7</el-radio>
          <el-radio label="8">8</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="打开方式：">
        <el-radio-group v-model="settingForm.openMethod">
          <el-radio label="_self">当前标签页</el-radio>
          <el-radio label="_blank">新标签页</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类管理：">
        <el-tree
          :data="navigations"
          :props="{ label: 'name' }"
          :allow-drop="allowDropValidator"
          draggable
          @node-drop="updateNavigation"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { getSetting, setSetting } from "@/utils/setting";
import { getNavigationArray, resetNavigationWithArray } from "@/utils/bookmarks";

export default {
  name: "SettingDrawer",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settingForm: {
        lineLimit: "4",
        openMethod: "_self",
      },
      settingVisible: false,
      navigations: [],
    };
  },
  watch: {
    settingForm: {
      deep: true,
      handler: function(newVal) {
        setSetting(newVal);
        window.dispatchEvent(this.$myEvent);
      },
    },
    visible: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
          this.settingVisible = newVal;
          this.settingForm = getSetting() || {};
          this.navigations = getNavigationArray();
        }
      },
    },
  },
  created() {
    this.settingForm = getSetting() || {};
    this.navigations = getNavigationArray();
  },
  methods: {
    closeModel() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    allowDropValidator(draggingNode, dropNode, type) {
      // 拖拽节点是 子节点
      let draggingIsChild = !draggingNode.data.id;
      // 目标节点是 子节点
      let dropIsChild = !dropNode.data.id;
      if (type === "inner") {
        return draggingIsChild && !dropIsChild;
      } else {
        return (draggingIsChild && dropIsChild) || (!draggingIsChild && !dropIsChild);
      }
    },
    updateNavigation() {
      resetNavigationWithArray(this.navigations);
      window.dispatchEvent(this.$myEvent);
    },
  },
};
</script>

<style scoped></style>
