import DataTable from "./components/DataTable.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("data-table", DataTable);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

DataTable.install = install;

export default DataTable;