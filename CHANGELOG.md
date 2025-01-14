# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.11.0] - 2021-04-13

### Changed

- Types for Formula now provide stronger typing

### Fixed

- Formula now won't apply `aria-role` on items that already have a role set
- Better handling of value and validation updates, store update is called less times

## [0.10.0] - 2021-03-12

### Added

- New `data-formula-bind` attribute for elements - allows the event bindings to be customised. If used the default
  bindings are not made (so they must be also passed) - more than one event type can be bound to by using the pipe (`|`)
  separator.

  ```html
  <!-- Use other browser event types to bind to -->
  <input type='text' name='myValue' data-formula-bind='mouseover' />
  <!-- Bind to more than one event type, such as including the original event  -->
  <input type='text' name='myValue' data-formula-bind='mouseover|keyup' />
  <!-- You can also emit your own custom events via elements inside custom components -->
  <input type='number' name='myValue' data-formula-bind='customEvent' bind:this='{el}' />
  <button on:click|preventDefault='{()' => el.dispatchEvent(new Event('customEvent'))}>Click Me</button>
  ```

- `options.preChanges` method that is called when a change has been detected, but before any values are read or stores
  updated
- `options.postChanges` method that is called after all changes have been made to the stores, with the most recent form
  values (this is functionally the same as `formValues.subscribe(values => {}))`)

### Fixed

- `options.formValidators` now correctly update `isFormValid` after other validity checks have been carried out instead
  of before
- `<input type="hidden">` fields now supported, both single and multi-value. Formula can only set the value of this
  field via default values and cannot set the value ( but for example it can be changed in something
  like `options.preChanges`) - hidden fields have no events, so these are a special case where the values are read with
  each update.
- Input types `number`, `date`, `time` and `week` now bind to both `keyup` and `change` handlers to handle both valid
  input cases on these elements

### Changed

- Existing attribute `data-beaker-key` has been renamed to `data-formula-name` - this allows a custom name to be used
  instead of the `<input name="...">` value

- Existing attributes `data-beaker-form` and `data-beaker-row` now correctly `data-formula-form` and `data-formula-row`

- All event handlers wrapped in a `setTimeout(()=> {}, 0)` to defer an update until after DOM tick, this allows elements
  to ensure value changes have completed before reading

## [0.9.3] - 2021-03-11

### Fixed

- Form validity check is not fired when `novalidate` it set on form and there is a submission

## [0.9.2] - 2021-03-09

### Changed

- Removed Beaker changes for `MutationObserver` - reverted code back to using a check for all rows and re-create forms
  each time as tracking changes becomes too complex. New code in place that handles subscription correctly to child
  stores for each form instance within the group and better extraction of values. This also fixes infinite loop bug
  caused by new code.

### Fixed

- Beaker stores now correctly showing store values in a group without requiring `bind:value`

## [0.9.1] - 2021-03-08

### Fixed

- Fix issue where updated mutation code expected default values

## [0.9.0] - 2021-03-08

### Removed

- Group `reset` method - instead to reset a group of form instances call `group.init` with the initial data that was
  used to create the group.

### Changed

- Beaker now accepts `defaultValues` as an array (`group.init` will always override this)
- Internal refactoring to improve group handling
- Removed global state stores for initial values, now only generated internally for reset methods
- Touched and Dirty and Invalid fields now have attributes set

### Fixed

- `formValidity` in Beaker stores is now an array
- Group stores no longer emit twice on changes
- Groups correctly now use `MutationRecord` added and removed nodes to be the reference to form instances when adding
  and removing data

## [0.8.7] - 2021-02-23

### Changed

- Group elements now have `data-in-group` attribute set which allows for better filtering of groups from form data

## [0.8.6] - 2021-02-23

### Fixed

- When a single value field is emptied after having values, correctly update the form state instead of leaving previous
  value
- Removed a stay console introduced in `0.8.5`, and fixed typo in `0.8.4`

## [0.8.3] - 2021-02-22

### Fixed

- Example in readme fixed with link to demo on [Svelte Repl](https://svelte.dev/repl/3c3fe78a258a45779bd122d399560f19)

## [0.8.2] - 2021-02-22

### Added

- `update` method on groups, takes a `FormulaOptions` object and applies it to all forms in the group

- Formula and Beaker now set ARIA properties for some form and field states
  - Form, Group and Row are applied to containers
  - Sets radio elements and attempts to discover the `radiogroup` root element
  - Set properties like required and checked for value types and attributes

### Changed

- Performance improvements and some internal refactoring
- Documentation improvements

## [0.8.1] - 2021-02-21

### Added

- Added `clear` method to `beaker` - this will empty the store of any group data
- Group forms now available on `forms` property

### Fixed

- Fixed `reset` method of group, now correctly calls reset on the forms
- Fixed lifecycle issues with group

## [0.8.0] - 2021-02-21

### Added

- New `beaker` API that provides functionality for working with groups of data as multi-line forms.
  See [documentation](https://tanepiper.github.io/svelte-formula/docs/beaker) for more details on use

  ```sveltehtml
  import { beaker } from 'svelte-formula'
  const contacts = beaker();

  export let loadedContacts = [];

  const contactValues = contacts.formValues;
  contacts.init(loadedContacts) // Set initial values

  // Easily add items to the group
  function addRow(item) {
    contacts.add({...item});
  }
  //... or remove them
  function removeRow(index) {
    contacts.delete(index);
  }

  ....
  <div use:contacts.group>
  {#each $contactValues as contact, i}
    <!-- Template for each row -->
  {/each}
  </div>
  ```

### Fixed

- Some internal API fixes and refactoring

## [0.7.2] 2021-02-19

### Fixed

- Fixed single checkbox not setting correctly

## [0.7.1] 2021-02-19

### Fixed

- Correctly rebind touch and dirty handlers after resetting
- Remove stray `console.log`

## [0.7.0] 2021-02-19

### Added

- `defaultValues` option that allows default values to be set on fields - supports single and multi-value properties -
  these values are only applied if there is no value already bound to the field.

  ```sveltehtml
  <script>
    import {formula} from 'svelte-formula';
    const { form } = formula({
      defaultValues: {
        textField: 'Initial Value',
        numberField: 42,
        checkBox: true,
        multiValue: ['option1', 'option3']
      }
    })
  </script>
  ```

- Added `isFormReady` store - Formula stores are created immediately when using the `formula` method, previously they
  were always empty objects filled with keys from parsing the form. This meant early binding would cause an error and
  forced the use of `?.` operators in the templates. This store can now be used as `{#if $isFormReady}`, reducing the
  need for the number of conditionals in templates

- `initialValues` store that contains the values at form initialisation, this is generated from merging any initial
  element values merged with any potential default values

- `formReset` function that when called will reset the form to the pristine state at setup time

## [0.6.0] 2021-02-18

### Added

- Formula now returns an `updateForm` method that takes an updated `FormulaOptions` object - this function destroys all
  existing handlers on the forms and rebinds them with the new options - this allows for dynamically adding and removing
  of validations and messages

  ```sveltehtml
    <script>
    import { formula } from 'svelte-formula';

    const formValidators = {
      passwordsMatch: (values) => values.password === values.passwordMatch ? null : 'Your passwords do not match',
    };

    const { form, updateForm } = formula({
      formValidators,
    });

    function addDomainValidation() {
      const options = {
        formValidators,
        validators: {
          username: {
            inDomain: (value) => value.includes('@svete.codes') ? null : 'You in the svelte codes?',
          },
        },
      };
      updateForm(options);
    }

    function removeDomainValidation() {
      updateForm({ formValidators });
    }
    </script>
  ```

- Formula now returns a `destoryForm` method that allows the form to be destroyed early - when using the `use` directive
  this is called automatically on component destroy, but this allows for early form unbinding.

- New `enrich` option added to `FormulaOptions` and a new `enrichment` store. Enrichment allow methods to be added to
  fields to return computed values (e.g. password score) that can be used to drive other parts of the UI

  ```sveltehtml
    <script>
      import { formula } from 'svelte-formula';
      import {passwordScore} from '../libs/password'
      const { form, enrichment } = formula({
        enrich: {
          password: {
            passwordStrength: (value) => passwordScore(value)
          }
        }
      })
    </script>

  <label for='password'>Password</label>
  <input type='password' id='password' name='password' />
  <meter value={$enrichment?.password?.passwordStrength || 0} min='0' max='100' low='33' high='66' optimum='80' />
  ```

- New `globalStore` Map object - if Formula is used with an element with an `id` property, the instances stores will be
  added to the global store and can be accessed via `globalStore.get(name)` - allowing sharing of data across multiple
  forms.

## [0.5.1] 2021-02-17

### Fixed

- Correct URL for docs site: https://tanepiper.github.io/svelte-formula

## [0.5.0] 2021-02-17

### Added

- New [Documentation Site](https://tanepiper.github.io/svelte-formula) (still WIP)
- Added `messages` option to FormulaOptions, this is a key/value `Object` for setting custom validation messages per
  error:

  ```sveltehtml
  <script>
  import { formula } from 'svelte-formula'
  const { form } = formula({
    messages: {
      valueMissing: 'Debes ingresar un nombre de usuario'
    }
  })
  </script>
  ```

- Add support for validation messages via HTML `data-*` attributes - these will always take presidency over items in
  the `messages` object if both exist. The format of the name should be a hyphen before any characters that are
  uppercase (e.g `valueMissing` becomes `data-value-missing`)

  ```html
  <input type="text" name="postcode" required data-value-missing="Bitte geben Sie Ihre Postleitzahl ein" />
  ```

### Changed

- More internal performance improvements

## [0.4.0] 2021-02-16

### Changed

- Large Internal refactoring of the code

## [0.3.0] 2021-02-15

### Added

- Support for `range`, `color`, `date`, `time`, `week` inputs
- Support for `file` input

### Changed

- `number` input type returns a number value, or `undefined` if not set

## [0.2.0] 2021-02-15

### Changed

- `formValid` now `isFormValid`

### Added

- Support for custom field-level validators via the `validators` property of the `formula` options. Validators are
  provided as an object - the key is the `name` of the fields, and the value is another object containing the
  validators. Each validator is has a key that is the name of the validation and a function that returns a string if the
  validation fails or
  `null` if it passes. The string message is used to display the message, the key is added to the `errors` object
  in `validity`

  ```sveltehtml
  <script>
  import { formula } from 'svelte-formula'
  import { calculateStrong } from '../libs/password'
   const { form, formValues, submitValues, validity, touched, dirty, formValid } = formula({
        validators: {
            password: {
              isStrong: (value: string) => calculateStrong(value) ? null : 'Your password is too weak'
            },
            'invoice-ids': {
              invoicePrefix: (values: string[]) => values.every(value => value.startsWith('INV-')) ? null : 'Your invoice IDs must all begin with INV-'
            }
        }
  });
  </script>

  ...
  <input type='password' name='password' required minlength='8' class:error={$touched?.password && $validity?.username?.invalid}/>
  <div hidden={$validity?.password?.valid}>{$validity?.password?.message}</div>
  <div hidden={$validity?.password?.errors?.isStrong}>You have a strong password!</div>
  ...

  <input type='text' id='invoice-1' name='invoice-ids' />
  <input type='text' id='invoice-2' name='invoice-ids' />
  <input type='text' id='invoice-3' name='invoice-ids' />
   <div hidden={$validity?.['invoice-ids']?.valid}>{$validity?.['invoice-ids']?.message}</div>
  ```

- Support for custom form-level validators via the `formValidators` property of the `formula` options. Validators are
  provided as an object - Each validator has a key that is the name of the validation, and a function that returns a
  string if the validation fails or
  `null` if it passes. The error message are available via the `formValidity` store.

  ```sveltehtml
  <script>
  import { formula } from 'svelte-formula'
  const { form, submitValues, submitValidity, formValid } = formula({
    formValidators: {
      passwordsMatch: (values) => values.password === values.passwordMatch ? null : 'Your passwords must match'
    }
  })
  </script>

  <input type='password' name='password' required minlength='8'>
  <input type='password' name='passwordMatch' required minlength='8'>
  <div hidden='{!$submitValidity?.passwordsMatch}'>{$submitValidity?.passwordsMatch}</div>
  ```

### Fixed

- Correctly pass options to form creation

## [0.1.1] 2021-02-15

### Added

- First config option for `formula` - allowing the locale for sorting to be overridden if you don't want to use the
  users own locale

- Support for multiple input types that are not checkboxes (e.g `text`, `number`, etc) - when using this each input with
  the same name REQUIRES and `id` property. Returns an array sorted on the `id` property alphabetically in the users'
  locale if detected (and always falls back to `en` if not), if this needs to be overridden it can be passed to the
  formula constructor (e.g `formula({ locale: 'de' });`)

## [0.1.0] 2021-02-15

### Added

- Add support for `<input type="radio">` - allows multiple radios of the same name and returns a string of the currently
  selected value
- Add support for `<select>` fields for both single and multi-value select fields - if a single value returns a string,
  if set to `multiple` returns an array of strings
- Added support for `<input type="checkbox">` - if a single value returns a boolean value for the checked state, if
  there are multiple checkboxes of the same name it returns an array of the selected values
- Added `dirty` store that fires when a value is changed, and the selected field is blurred away from

### Changed

- Internal refactor of code to clean up and make it easier to add features

## [0.0.4] 2021-02-13

### Added

- Added support for `touched` elements

### Changed

- `values` becomes `formValues`
- `submit` becomes `submitValues`

## [0.0.1] 2021-02-12

### Added

- Initial release
