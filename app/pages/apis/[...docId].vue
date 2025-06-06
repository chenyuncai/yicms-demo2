<template>
  <div>
    <template v-if="page">
      <ContentRenderer :value="page" />
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const docPath = route.params.docId as string;
const { data: page } = await useAsyncData('page', () => {
  return queryCollection('docs').path('/docs/' + docPath).first()
})
</script>
