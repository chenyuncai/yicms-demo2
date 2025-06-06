<template>
  <div>
    <!-- <div v-for="(item, index) in realPages" :key="item.path">
      <router-link :to="relativePath(item.path)">
        {{index + 1 }}. {{ item.title }}
        <div>{{ relativePath(item.path) }}</div>
        <div>{{ item.path }}</div>
        {{ item }}
      </router-link>
    </div> -->
    <div v-for="item in pages">
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: pages } = await useAsyncData('api-pages', () => {
  // return queryCollection('apiDocs2').all()
  return queryCollectionNavigation('apiDocs2')
});

console.log(pages.value)

// const relativePath = (path: string) => {
//   return path.replace(/^\/docs\//, '/doc/')
// }

// const realPages = computed(() => {
//   const doc = pages.value?.find((item) => item.path === '/docs')
//   if (doc) {
//     return doc.children
//   }
//   return []
// })
</script>
