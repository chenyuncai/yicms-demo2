<template>
  <div>
    <div v-for="(item, index) in pages" :key="item.path">
      <div>{{index + 1}}. {{ item.title }}</div>
      <NuxtLink :to="'/new' + item.path">
        {{ item.path }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: pages } = await useAsyncData('pages', () => {
  return queryCollection('hackerNews').all()
});

console.log(pages.value)

</script>
