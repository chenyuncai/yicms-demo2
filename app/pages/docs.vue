<template>
  <div>
    <div v-for="(item, index) in realPages" :key="item.path">
      <router-link :to="relativePath(item.path)">
        {{index + 1 }}. {{ item.title }}
        <div>{{ relativePath(item.path) }}</div>
        {{ item }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: pages } = await useAsyncData('pages', () => {
  return queryCollectionNavigation('doc')
});

console.log(pages.value)

const relativePath = (path: string) => {
  return path.replace(/^\/docs\//, '/doc/')
}

const realPages = computed(() => {
  // 默认返回的是docs目录以及其所有子目录和文件，所以直接取docs目录的children即可
  const doc = pages.value?.find((item) => item.path === '/docs')
  if (doc) {
    return doc.children
  }
  return []
})
</script>
