const apps = [
  {
    name: 'micro-app-vue3',
    entry: '//localhost:3001',
    // entry: '//localhost:5173',
    container: '#parameter-cache-app-container',
    activeRule: '/parameter-cache-app'
  },
  {
    name: 'micro-app-vue3-vite',
    entry: '//localhost:3002',
    container: '#gateway-app',
    activeRule: '/gateway-app'
  },
  {
    name: 'micro-app-vue2',
    entry: '//localhost:3333/',
    // entry: '//localhost:3003/',
    container: '#distributed-transactions-app',
    activeRule: '/distributed-transactions-app'
  },
  {
    name: 'micro-app-react',
    entry: '//localhost:4001',
    container: '#distributed-sequence-app',
    activeRule: '/distributed-sequence-app'
  }
]

export default apps
