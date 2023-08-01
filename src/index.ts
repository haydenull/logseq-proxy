type Config = {
  apiServer: string
  apiToken: string
}
/** logseq API Server config */
let config: Config = {
  apiServer: '',
  apiToken: '',
}

const fetchLogseqApi = async (method: string, args?: unknown[]) => {
  const res = await fetch(`${config.apiServer}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiToken}`,
    },
    body: JSON.stringify({
      method,
      args,
    }),
  })
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    return await res.json()
  }
  return res.text()
}

const LOGSEQ_METHODS_OBJECT = ['App', 'Editor', 'DB', 'Git', 'UI', 'Assets', 'FileStorage'] as const
const proxyLogseqMethodsObject = (key: (typeof LOGSEQ_METHODS_OBJECT)[number]) => {
  const proxy = new Proxy(
    {},
    {
      get(target, propKey) {
        return async (...args: unknown[]) => {
          const method = `logseq.${key}.${propKey.toString()}`
          console.warn('=== Proxy call to logseq: ', method)
          const data = await fetchLogseqApi(method, args)

          if (data?.error) {
            console.error(`=== Proxy ${method} error: `, data.error)
          }

          return data
        }
      },
    },
  )
  // @ts-expect-error use proxy to reset window.logseq[key]
  window.logseq[key] = proxy
}
const proxyLogseq = ({ settings, config: _config }: { settings: Record<string, unknown>; config: Config }) => {
  config = _config
  // @ts-expect-error reset window.logseq to plain object
  window.logseq = {}
  LOGSEQ_METHODS_OBJECT.forEach(proxyLogseqMethodsObject)
  // @ts-expect-error window.logseq is registered by @logseq/libs
  window.logseq.hideMainUI = () => alert('Proxy call to logseq.hideMainUI()')
  // @ts-expect-error window.logseq is registered by @logseq/libs
  window.logseq.settings = settings
}

export default proxyLogseq
