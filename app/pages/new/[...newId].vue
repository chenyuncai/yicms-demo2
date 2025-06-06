<template>
  <div>
    <NuxtLink to="/news">Go back news</NuxtLink>
    <h1>NewId: {{ id }}</h1>
    {{ page }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const id = route.params.newId as string[];
console.log(id[0])
const { data: page } = await useAsyncData('newId', () => {
  return queryCollection('hackerNews').path('/' + id[0]).first()
})
console.log(page.value)
</script>
