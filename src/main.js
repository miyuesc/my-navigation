import Vue from "vue";
import App from "./App.vue";

import {
  Button,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Select,
  Option,
  Form,
  FormItem,
  Slider,
  Dialog,
  Drawer,
  Tree,
} from "element-ui";

Vue.prototype.$ELEMENT = { size: "mini" };
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Slider);
Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Tree);

import "element-ui/lib/theme-chalk/index.css";
import "./assets/overrider.css";

if (window) {
  Vue.prototype.$myEvent = new Event("NOSChange");
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
