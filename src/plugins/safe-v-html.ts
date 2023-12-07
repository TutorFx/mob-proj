/* import DOMPurify from "isomorphic-dompurify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("safe-html", {
    beforeMount(el, binding) {
      el.innerHTML = DOMPurify.sanitize(binding.value);
    },
    updated(el, binding) {
      el.innerHTML = DOMPurify.sanitize(binding.value);
    },
    getSSRProps(binding) {
      // you can provide SSR-specific props here
      return {
        innerHtml: DOMPurify.sanitize(binding.value),
      };
    },
  });
});
 */

export default defineNuxtPlugin(() => {});
