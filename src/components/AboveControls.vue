<template>
    <div class="flex flex-col-reverse md:flex-row md:justify-between py-2 mx-5">
      <div class="self-start my-2" v-show="enableDataPerPageCount">
            <label
                ><span class="md:mx-1 pe-6 md:pe-0 text-slate-600">Show:</span>
                <select
                class="text-slate-600 border-collapse border-2 border-cyan-500 border-solid rounded-md outline-blue-300"
                v-model="selectedOption"
                >
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
                <span class="text-slate-600 ms-2">entries</span></label
            >
      </div>
      <div class="self-start my-2" v-show="enableSearch">
          <label
              ><span class="md:mx-1 pe-3 md:pe-0 text-slate-600">Search:</span><input
              type="search"
              class="border-collapse border-2 border-solid rounded-md border-cyan-500 outline-cyan-300 text-slate-600"
              placeholder=""
              v-model="search"
          /></label>
      </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, watch } from 'vue'

defineProps({
  enableSearch: {
    type: Boolean,
    default: false,
  },
  enableDataPerPageCount: {
    type: Boolean,
    default: false,
  },
})

const selectedOption = ref("5");

const search = ref("")

const emits = defineEmits(['data-per-page-count', 'search-value-change'])

watch(
  () => selectedOption.value, (newValue) => {
    emits('data-per-page-count', newValue)
  }
)

watch(
  () => search.value, (newValue) => {
    newValue.length > 2 ? emits('search-value-change', newValue) : emits('search-value-change', '')
    
  }
)


</script>

<style scoped>

</style>