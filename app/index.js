// Utilize templates on the client.  Get the main content template.
import Content from '../templates/_index-content.svelte.html';
import { Store } from 'svelte/store.js';

// Create global store for UI
const store = new Store({
  // No trailing slash
  civixEndpoint: '//static.startribune.com/elections/civix-test/mn-20180814'
});

// Create UI
const app = new Content({
  target: document.querySelector('.article-lcd-body-content'),
  hydrate: true,
  data: {},
  store
});

// Debug
window._store = store;
window._app = app;

// // Hacky, get share elements
// $(document).ready(() => {
//   let $share = $('.share-placeholder').size()
//     ? $('.share-placeholder')
//       .children()
//       .detach()
//     : undefined;
//   let attachShare = !$share
//     ? undefined
//     : () => {
//       $('.share-placeholder').append($share);
//     };

// });

// import Map from './map.js';

// (function() {
//   let map_dem = new Map('#d-gov-map');
//   map_dem.render();

//   let map_rep = new Map('#r-gov-map');
//   map_rep.render();
// })();
