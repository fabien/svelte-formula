import { BeakerStores } from 'packages/svelte/formula/src/types/groups';
import { FormulaOptions } from 'packages/svelte/formula/src/types';
import { createFormStores } from 'packages/svelte/formula/src/lib/shared/stores';
import { createForm } from 'packages/svelte/formula/src/lib/form/form';

export function createGroup(
  stores: BeakerStores,
  options: FormulaOptions,
  beakerStores: Map<string, BeakerStores>,
): {
  create: (node: HTMLElement) => { destroy: () => void };
  update: (updatedOpts: FormulaOptions) => void;
  destroy: () => void;
  reset: () => void;
} {
  let groupId;
  let groupParentNode: HTMLElement;
  let globalObserver: MutationObserver;

  const formSet = new Set<{ destroy: () => void }>();
  const subscriptions = new Map<string, (() => {})[]>();

  function resetGroup() {
    [...subscriptions].forEach(([key, subs]) => {
      if (key === 'isFormValid' || key === 'isFormReady') {
        stores[key].set(false);
      } else {
        stores[key].set([]);
      }
      subs.forEach((sub) => sub());
    });
    subscriptions.clear();
    formSet.forEach((form) => form.destroy());
    formSet.clear();
  }

  function groupHasChanged(rows: HTMLElement[]) {
    resetGroup();

    rows.forEach((row, i) => {
      let data = {};
      if (row.dataset.bindData) {
        try {
          data = JSON.parse(row.dataset.bindData);
        } catch {}
      }

      const formStore = createFormStores(options, data);
      const form = createForm(formStore, options);
      formSet.add(form.create(row as HTMLElement, true));

      Object.entries(formStore).forEach(([key, store]) => {
        const unsub = store.subscribe((value) => {
          stores[key].update((state) => {
            if (Array.isArray(state)) {
              state.splice(i, 1, value);
            } else {
              state = value;
            }
            return state;
          });
        });

        if (!subscriptions.has(key)) {
          subscriptions.set(key, [unsub]);
        } else {
          const subs = subscriptions.get(key);
          subs.push(unsub);
          subscriptions.set(key, subs);
        }
      });
    });
    stores.isFormReady.set(true);
  }

  function setupGroupContainer(node: HTMLElement) {
    node.setAttribute('data-beaker-group', 'true');
    node.setAttribute('role', 'beaker-group');

    globalObserver = new MutationObserver((mutations) => {
      const rows = node.querySelectorAll(':scope > *');
      groupHasChanged(Array.from(rows) as HTMLElement[]);
    });
    globalObserver.observe(node, { childList: true });

    const rows = node.querySelectorAll(':scope > *');
    groupHasChanged(Array.from(rows) as HTMLElement[]);
  }

  return {
    create: (node: HTMLElement) => {
      groupId = node.id;
      groupParentNode = node;
      setupGroupContainer(node);

      return {
        destroy: () => {
          resetGroup();
          globalObserver.disconnect();
        },
      };
    },
    update: (updatedOpts: FormulaOptions) => {},
    destroy: () => {
      resetGroup();
      globalObserver.disconnect();
    },
    reset: () => {
      resetGroup();
      globalObserver.disconnect();
      setupGroupContainer(groupParentNode);
    },
  };
}