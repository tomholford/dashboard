import { autorun, set, toJS } from 'mobx';

export default function(_this, instance, storeId, defaultStore = null) {
  let firstRun = true;

  autorun(() => {
    if (firstRun) {
      const persisted = localStorage.getItem(storeId);
      const store = persisted ? JSON.parse(persisted) : defaultStore;

      set(instance, store);
    }

    localStorage.setItem(storeId, JSON.stringify(toJS(instance)));
  })

  firstRun = false;
}
