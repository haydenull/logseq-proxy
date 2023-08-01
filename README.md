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
import {logseqProxy} from 'logseq-proxy'

logseqProxy({
  settings: {
    // your plugin settings
  },
  config: {
    apiServer: 'http://127.0.0.1:12315', // your api server
    apiToken: 'your api token',          // your api token
  }
})
```
