<template>
    <div class="my-3 mx-5 flex justify-between text-slate-600" v-show="totalRecords > 0">
          <div class="col-sm-12 col-md-5">
            <p
              class="dataTables_info mb-0"
              id="dataTable1_info"
              role="status"
              aria-live="polite"
            >
              Showing {{ showingStart }} to {{ showingEnd }} of {{totalRecords}} entries
            </p>
          </div>
          <div v-show="totalPages > 1">
              <ul class="mb-0 flex items-center  gap-3">
                <li
                  class=" border-2 hover:border-none  hover:bg-cyan-400 hover:text-white border-cyan-500 text-slate-500 rounded-md text-center px-3 py-1"               
                >
                  <a
                    href="#"
                    @click="paginate(currentPage - 1)"
                    >Previous</a
                  >
                </li>
                <li class="" v-for="(page, index) in totalPages" :key="index" @click="paginate(index+1)">
                  <a
                    href="#"
                    :class="{'border-2 border-cyan-500 text-slate-500 px-3 rounded-lg py-1': currentPage === index+1, ' px-3 rounded-lg py-1 hover:bg-cyan-400 hover:text-white': currentPage !== index+1}"
                    >{{index +1 }}</a
                  >
                </li>
                <li class="border-2 hover:border-none border-cyan-500 hover:bg-cyan-400 hover:text-white text-slate-500 rounded-md text-center px-3 py-1" id="dataTable1_next">
                  <a
                    href="#"
                    @click="paginate(currentPage + 1)"
                    >Next</a
                  >
                </li>
              </ul>
          </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        default: 0
    },
    totalRecords: {
        type: Number,
        default: 0
    },
    perPage: {
        type: Number,
        default: 5
    },
});

const showingStart = ref(1)
const showingEnd = ref(5)

const calculateShowingStart = () => {
    showingStart.value = (props.currentPage - 1) * props.perPage + 1
}

const calculateShowingEnd = () => {
    let calcValue = props.currentPage * props.perPage
    showingEnd.value = calcValue > props.totalRecords ? props.totalRecords : calcValue
}

watchEffect(() => {
    calculateShowingStart()
    calculateShowingEnd()
})


const emit = defineEmits(['paginate'])

const paginate = (page) => {
    if (page < 1 || page > props.totalPages) {
        return
    }
    emit('paginate', page)
}
</script>

<style scoped>

</style>