<script setup>
import DataTable from './components/DataTable.vue'
import { ref } from 'vue';

const tableHeads = ref([
    { name:'id', title: 'id', sort: true },
    { name:'fname', title: 'First name', sort: false },
    { name:'lname', title: 'Last name', sort: false },
    { name:'username', title: 'Username', sort: false },
]);

const link = ref("https://www.melivecode.com/api/users")
</script>

<template>
  <main>
    <DataTable 
      :table-text-alignment="'text-center'"
      :data-per-page-option-visible="true"
      :search-visible="true" 
      :table-heads="tableHeads"
      :link="link"
      >
        <template #table-data="slotProps">
          <tr v-if="slotProps.data.length === 0"> No data found</tr>
          <tr v-for="(user, index) in slotProps.data" :key="index">
              <td :class="slotProps.css">{{ user.id }}</td>
              <td :class="slotProps.css">{{ user.fname }}</td>
              <td :class="slotProps.css">{{ user.lname }}</td>
              <td :class="slotProps.css">{{ user.username }}</td>
          </tr>
        </template>
    </DataTable>
  </main>
</template>

<style scoped>
</style>
