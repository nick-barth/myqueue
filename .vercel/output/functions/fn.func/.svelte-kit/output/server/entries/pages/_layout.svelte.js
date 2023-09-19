import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute } from "../../chunks/index2.js";
import { u as userStore } from "../../chunks/store.js";
import { p as page } from "../../chunks/stores.js";
import { P as PUBLIC_MIXPANEL_KEY, a as PUBLIC_TITLE } from "../../chunks/db.js";
import mixpanel from "mixpanel-browser";
import "@capacitor/app";
import { Capacitor } from "@capacitor/core";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  mixpanel.init(PUBLIC_MIXPANEL_KEY);
  userStore.subscribe((v) => {
  });
  let isIos = false;
  if (Capacitor.getPlatform() === "ios") {
    isIos = true;
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-mg3ozw_START -->${$$result.title = `<title>${escape(PUBLIC_TITLE)}</title>`, ""}<!-- HEAD_svelte-mg3ozw_END -->`, ""}

<main${add_attribute("class", `bg-background ${isIos ? "pt-20" : "pt-10"}`, 0)}>${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
