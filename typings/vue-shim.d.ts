import Vue from "vue";
declare module "*.vue" {
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $mp: any;
    $router: any;
    $city: any
  }
}
