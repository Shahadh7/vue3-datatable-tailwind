<template>
<div class="w-full">
  <div class="grid grid-cols-1">
    <above-controls 
      :enable-data-per-page-count="props.dataPerPageOptionVisible" 
      :enable-search="props.searchVisible" 
      @data-per-page-count="toggleDataPerPageCount"
      @search-value-change="setSearchValue"
    />
    <table class="border-collapse border border-slate-400 ...">
      
      <thead>
        <tr 
          class="bg-gray-100 text-gray-500"
        >
          <th :class="['border border-slate-300 py-2', props.tableTextAlignment]" v-for="(head, index) in props.tableHeads" :key="index">
            {{ head.title }}
            <font-awesome-icon 
              :icon="['fa-solid', currentSort === 'desc' && currentSortField === head.name ? 'fa-sort-up' : 'fa-sort-down']" 
              class="ms-3" 
              v-show="head.sort" 
              @click="sort(head.name)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="table-data" :data="tableData" :css="['border text-slate-600 border-slate-300 py-2', props.tableTextAlignment]"   />
      </tbody>
    </table>
    <pagination
      :current-page="currentPage"
      :total-records="totalRecords"
      :total-pages="totalPages"
      :per-page="perPage"
      @paginate="setPageNo"
    />
  </div>
</div>
    
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import AboveControls from './AboveControls.vue'
import Pagination from './Pagination.vue'


const props = defineProps({
    tableHeads: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: false,
    },
    dataPerPageOptionVisible: {
        type: Boolean,
        required: true
    },
    searchVisible: {
        type: Boolean,
        required: true
    },
    tableTextAlignment: {
        type: String,
        required: false,
        defaault: 'text-center'
    },
})

const tableData = ref([])
const perPage = ref(5)
const search = ref("")
const currentPage = ref(1)
const totalRecords = ref(0)
const totalPages = ref(0)
const currentSort = ref('asc')
const currentSortField = ref('')

const sort = (name) => {
    currentSort.value = currentSort.value === 'asc' ? 'desc' : 'asc'
    currentSortField.value = name

    tableData.value = tableData.value.sort((a, b) => {
        if (a[name] < b[name]) {
            return currentSort.value === 'asc' ? -1 : 1
        }
        if (a[name] > b[name]) {
            return currentSort.value === 'asc' ? 1 : -1
        }
        return 0
    })
}

const fetchData = async () => {
    const response = await fetch(`${props.link}?search=${search.value}&page=${currentPage.value}&per_page=${perPage.value}`)
    const data = await response.json()
    tableData.value = data.data
    totalRecords.value = data.total
    totalPages.value = data.total_pages
    currentPage.value = data.page
}


const toggleDataPerPageCount = (value) => {
  perPage.value = value
  currentPage.value = 1
}

const setSearchValue = (value) => {
  search.value = value
}

const setPageNo = (value) => {
  if(currentPage.value !== value) {
    currentSort.value = 'asc'
    currentSortField.value = ''
  }
  currentPage.value = value
  
}

const newArr = ref([])

// find by id and set all status as processing in newArr 
const updateStatus = (id) => {
  newArr.value = newArr.value.map((item) => {
    if(item.id === id) {
      item.status = 'processing'
    }
    return item
  })
}



watchEffect(() => {
    fetchData()
})

</script>

<style scoped>
</style>
