# vue3-datatable-tailwind

Datatable component for Vue3 composition API and tailwind with the basic functionalities such as Pagination, Sort, Search and more


## Project setup
```
npm install --save shady-vue3-datatable
```


## Basic Usage
```
<template>
  <DataTable 
        :data-per-page-option-visible="true"
        :search-visible="true" 
        :table-heads="tableHeads"
        :link="link"
        :table-text-alignment="'text-center'"
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
</template>
<script script>

import { DataTable } from 'shady-vue3-datatable';
import { ref } from 'vue';

const tableHeads = ref([
    { name:'id', title: 'id', sort: true, class: '' },
    { name:'fname', title: 'First name', sort: false, class: '' },
    { name:'lname', title: 'Last name', sort: false, class: '' },
    { name:'username', title: 'Username', sort: false, class: '' },
]);

const link = ref("https://www.myapi.com/api/users")

</script>
```


## LICENSE

[MIT](https://choosealicense.com/licenses/mit/) © Shahadh