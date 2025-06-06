<template>
  <div>
    <div v-for="(item, index) in pages" :key="item.path" class="m-10">
      <router-link :to="relativePath(item.path)">
        {{index + 1 }}. {{ item.title }}
        <div>{{ relativePath(item.path) }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: pages } = await useAsyncData('pages', () => {
  // @ts-expect-error 1111111111111111111111111111111
  return queryCollectionNavigation('myDocs')
});

console.log(pages.value)

const relativePath = (path: string) => {
  return '/myDoc/' + path
}
</script>
