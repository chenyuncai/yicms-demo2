<template>
  <div>
    <NuxtLink to="/myDocs">Go back my docs</NuxtLink>
    {{ page }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const docPath = route.params.docId as string[];
console.log(docPath)
const { data: page } = await useAsyncData('page', () => {
  return queryCollection('myDocs').path(docPath[0] as string).first()
})
console.log(page.value)
</script>
