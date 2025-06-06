import { defineContentConfig, defineCollection, defineCollectionSource, z } from '@nuxt/content'

const hackerNewsSource = defineCollectionSource({
  getKeys: async () => {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const json = await res.json()
    const keys = json.slice(0, 10).map((key: string) => `${key}.json`)
    // console.log('hack keys:', keys)
    return keys
  },
  getItem: async (key: string) => {
    const id = key.split('.')[0]
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    const json = await res.json()
    // console.log(json)
    return json
  },
})
const mySource = defineCollectionSource({
  getKeys: async () => {
    // 注意：必须是json结尾
    const keys = ['a', 'b', 'c'].map(i => `${i}.json`)
    // console.log('my keys:', keys)
    return keys
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getItem: async (key: string) => {
    return Promise.resolve({title: key, path: key, navigation: 'a'})
  }
})

export default defineContentConfig({
  collections: {
    doc: defineCollection({
      // 解析的文件的path与文件所处路径一致，比如/docs/first
      type: 'page',
      source: 'docs/**/*.md'
    }),
    hackerNews: defineCollection({
      type: 'data',
      source: hackerNewsSource,
      schema: z.object({
        title: z.string(),
        path: z.string(), // this is the key of the dat
      })
    }),
    myDocs: defineCollection({
      type: 'data',
      source: mySource,
      schema: z.object({
        title: z.string(),
        // 有navigation字段才可以生成目录
        navigation: z.string(),
        path: z.string(), // this is the key of the dat
      })
    })
  }
})
