(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{90:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return c}));var r=n(3),o=n(7),a=(n(0),n(97)),i={id:"customer-rows",title:"Example - Customer Rows",sidebar_label:"Row Data"},s={unversionedId:"examples/customer-rows",id:"examples/customer-rows",isDocsHomePage:!1,title:"Example - Customer Rows",description:"`svelte",source:"@site/docs/examples/customer-rows.md",slug:"/examples/customer-rows",permalink:"/svelte-formula/docs/examples/customer-rows",version:"current",sidebar_label:"Row Data",sidebar:"someSidebar",previous:{title:"Example - Signup Form",permalink:"/svelte-formula/docs/examples/signup"},next:{title:"Example - Custom Component Events",permalink:"/svelte-formula/docs/examples/custom-event"}},u=[],l={toc:u};function c(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-svelte"},"<script>\n  import { createEventDispatcher } from 'svelte';\n  import { get } from 'svelte/store';\n  import { beaker, formula } from 'svelte-formula@0.8.1';\n\n  const dispatch = createEventDispatcher();\n\n  const { form, formValues, updateForm } = formula();\n\n  // This creates a contact group - you can now bind `contacts.group` to the subgroup\n  const customers = beaker();\n  const customersValues = customers.formValues;\n\n  export let productData = {\n    productName: '',\n  };\n\n  // Set the store with any existing data\n  export let contactData = [{\n    firstName: 'Foo',\n    lastName: 'McBar',\n    email: 'foo@svelte.code',\n    subscriptionLevel: 'partial',\n    signups: ['daily', 'news'],\n  }];\n\n  customers.init(contactData);\n\n  // Add a row to the store\n  function addCustomer() {\n    customers.add({\n      firstName: '',\n      lastName: '',\n      email: '',\n      subscriptionLevel: 'none',\n      signups: [],\n    });\n  }\n\n  // Remove a row from the store\n  function deleteCustomer(index) {\n    customers.delete(index);\n  }\n\n  function submit() {\n    const mainForm = get(formValues);\n    const contactValues = get(customersValues);\n    //Do something with the data here\n\n    dispatch('signup', {\n      form: mainForm,\n      contacts: contactValues\n    });\n  }\n<\/script>\n\n\n<form use:form on:submit|preventDefault={submit}>\n  <label for='productName'>ProductName</label>\n  <input type='text' id='productName' name='productName' required bind:value={productData.productName} />\n\n  <button type='submit'>Submit Form</button>\n  <button on:click|preventDefault={addCustomer}>Add Customer</button>\n    <button on:click|preventDefault={() => customers.init(contactData)}>Reset Fields</button>\n    <button on:click|preventDefault={() => customers.clear()}>Clear Fields</button>\n\n  <table role=\"grid\">\n    <thead>\n    <tr>\n      <th colspan=3>Customer Data</th>\n      <th>Subscription Level</th>\n      <th>Subscriptions</th>\n      <th></th>\n    </tr>\n    </thead>\n    <tbody use:customers.group role=\"rowgroup\">\n    {#each $customersValues as row, i}\n      <tr role=\"row\">\n        <td>\n          <label for='firstName-{i}'>First Name</label>\n          <input type='text' id='firstName-{i}' name='firstName' required />\n        </td>\n        <td>\n          <label for='lastName-{i}'>Last Name</label>\n          <input type='text' id='lastName-{i}' name='lastName' required />\n        </td>\n        <td>\n          <label for='email-{i}'>Email Name</label>\n          <input type='email' id='email-{i}' name='email' required />\n        </td>\n        <td>\n          \x3c!-- In multi-group forms, radio groups require a unique name in the DOM - her you can provide 'data-formula-name' to specify the data key --\x3e\n          <label for='subscriptionLevel-{i}-1'>None\n            <input type='radio' id='subscriptionLevel-{i}-1'\n                   name='subscriptionLevel-{i}'\n                   data-formula-name='subscriptionLevel' value='none' />\n          </label>\n\n          <label for='subscriptionLevel-{i}-1'>Partial\n            <input type='radio' id='subscriptionLevel-{i}-2'\n                   name='subscriptionLevel-{i}'\n                   data-formula-name='subscriptionLevel' value='partial' />\n          </label>\n\n          <label for='subscriptionLevel-{i}-1'>Full\n            <input type='radio' id='subscriptionLevel-{i}-3'\n                   name='subscriptionLevel-{i}'\n                   data-formula-name='subscriptionLevel' value='full' />\n          </label>\n\n        </td>\n        <label for='signups-{i}-1'>Daily <input type='checkbox' id='signups-{i}-1' name='signups' value='daily' /></label>\n\n        <label for='signups-{i}-2'>Weekly\n          <input type='checkbox' id='signups-{i}-2' name='signups' value='weekly' />\n        </label>\n        <label for='signups-{i}-3'>News\n          <input type='checkbox' id='signups-{i}-3' name='signups' value='news'  />\n        </label>\n        <label for='signups-{i}-4'>Product\n          <input type='checkbox' id='signups-{i}-4' name='signups' value='product' />\n        </label>\n        <td>\n          <button on:click|preventDefault={() => deleteCustomer(i)}>X</button>\n        </td>\n      </tr>\n    {/each}\n    </tbody>\n  </table>\n</form>\n")))}c.isMDXComponent=!0},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),c=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=c(n),d=r,b=p["".concat(i,".").concat(d)]||p[d]||m[d]||a;return n?o.a.createElement(b,s(s({ref:t},l),{},{components:n})):o.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);