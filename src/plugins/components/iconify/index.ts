import { addAPIProvider, enableCache, disableCache } from '@iconify/vue';

enableCache('session');

addAPIProvider('local', {
    resources: ['http://localhost:3000'],
})

disableCache('local');

// if (!import.meta.env.PROD) {
//   disableCache('all')
//   sessionStorage.removeItem('iconify-count')
//   sessionStorage.removeItem('iconify-version')
//   localStorage.removeItem('iconify-count')
//   localStorage.removeItem('iconify-version')
// }

export {}