<template>
  <div class="stepper-cliqx">
    <label v-for="(etapa, i) in steps" :class="i < props.modelValue
        ? 'status-ok'
        : i == props.modelValue
          ? 'status-current'
          : i > props.modelValue
            ? 'status-waiting'
            : null
      " :key="i">
      <div class="prefix-line"></div>
      <span class="bubble">
        <Transition name="slide-left">
          <div v-if="i >= props.modelValue">
            {{ (i + 1).toString().padStart(2, "0") }}
          </div>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </Transition>
      </span>
      <input type="radio" single :value="i" v-model="modelValue"
        @change="emit('update:modelValue', Number($event.target.value))" />
      <span class="text"><span class="inner-text">{{ etapa }}</span></span>
      <div class="sufix-line"></div>
    </label>
  </div>
</template>

<style lang="scss">
.stepper-cliqx {
  display: flex;
  gap: 0.5rem;

  label {
    position: relative;
    display: flex;
    flex-direction: row;

    &.status-ok {
      .bubble {
        @apply bg-success text-base-100;
        scale: 0.75;
      }

      .text {
        width: 0px;
        opacity: 0;
      }
    }

    &.status-current {
      @media screen and (max-width: 600px) {
        grid-template-columns: 5px 24px auto 1fr;
      }

      display: grid;
      align-items: center;
      grid-template-areas: "prefixline bubble input sufixline";
      grid-template-columns: 24px 24px auto 1fr;
      gap: 0.5rem;
      flex-grow: 1;

      .text {
        .inner-text {
          @apply text-primary;
          font-weight: 600;
        }
      }

      &:first-child {
        grid-template-areas: "bubble input sufixline";
        grid-template-columns: 24px auto 1fr;

        .prefix-line {
          display: none;
        }
      }

      &:last-child {
        grid-template-areas: "prefixline bubble input";
        grid-template-columns: 1fr auto auto;

        .sufix-line {
          display: none;
        }
      }

      .bubble {
        @apply bg-primary text-base-100;
        grid-area: bubble;
      }

      .input[type="radio"] {
        grid-area: input;
      }

      .prefix-line {
        display: block;
        @apply bg-success;
        height: 2px;
        grid-area: prefixline;
      }

      .sufix-line {
        display: block;
        @apply bg-base-300;
        height: 2px;
        grid-area: sufixline;
      }
    }

    &.status-waiting {
      @media screen and (max-width: 600px) {
        display: none;
      }

      display: grid;
      align-items: center;
      gap: 0.25rem;
      grid-template-areas: "prefixline bubble input sufixline";
      grid-template-columns: 0 24px 0.25rem 24px;

      &:last-child {
        grid-template-areas: "prefixline bubble input";
        grid-template-columns: 1fr auto auto;

        .sufix-line {
          display: none;
        }
      }

      .prefix-line {
        @apply bg-base-300;
        height: 2px;
        grid-area: prefixline;
      }

      .sufix-line {
        display: block;
        @apply bg-base-300;
        height: 2px;
        grid-area: sufixline;
      }

      .bubble {
        grid-area: bubble;
      }

      .input[type="radio"] {
        grid-area: input;
      }

      .text {
        width: 0;
        opacity: 0;
      }
    }

    .text {
      .inner-text {
        opacity: 1;
        transition: width, opacity 300ms ease-in-out;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      overflow: hidden;
    }

    .bubble {
      @apply bg-base-300 text-base-content;
      font-size: 0.8rem;
      font-family: Roboto;
      font-size: 12px;
      font-weight: 600;
      border-radius: 300px;
      display: inline-block;
      min-height: 24px;
      min-width: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: scale 1s ease-in-out;
      scale: 1;
      overflow: hidden;
    }

    input[type="radio"] {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  steps: {
    required: true,
    type: Array,
  },
  modelValue: {
    required: false,
    default: 0,
    type: Number,
  },
});
const modelValue = ref(props.modelValue);

watch(
  () => modelValue,
  (newValue, oldValue) => {
    emit("update:modelValue", newValue);
  }
);
</script>