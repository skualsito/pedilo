import { h } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import * as mdi from "@mdi/js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("MdiIcon", {
    props: {
      name: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 24,
      },
      color: {
        type: String,
        default: "currentColor",
      },
    },
    render() {
      const iconName = `mdi${
        this.name.charAt(0).toUpperCase() + this.name.slice(1)
      }`;
      const path = mdi[iconName];

      if (!path) {
        console.warn(`Icon "${this.name}" not found in MDI library`);
        return null;
      }

      return h(SvgIcon, {
        type: "mdi",
        path: path,
        size: this.size,
        color: this.color,
      });
    },
  });
});
