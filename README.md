# logseq-proxy
Proxy logseq SDK, providing a better development experience.

## Usage

1. Install dependencies
```bash
pnpm add @logseq/libs logseq-proxy
```
2. proxy

```ts
import '@logseq/libs'
import proxyLogseq from 'logseq-proxy'

proxyLogseq({
  settings: {
    // your plugin settings
  },
  config: {
    apiServer: 'http://127.0.0.1:12315', // your api server
    apiToken: 'your api token',          // your api token
  }
})
```

3. use logseq sdk

```ts
const getBlock = async () => {
  const block = await logseq.Editor.getBlock('blockUUID')
  console.log(block)
}
```
