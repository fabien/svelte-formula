(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{94:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return i})),r.d(t,"default",(function(){return u}));var n=r(3),o=r(7),a=(r(0),r(97)),s={id:"stores",title:"Formula Stores",sidebar_label:"Formula Stores"},l={unversionedId:"stores/stores",id:"stores/stores",isDocsHomePage:!1,title:"Formula Stores",description:"Accessing Stores",source:"@site/docs/stores/stores.md",slug:"/stores/stores",permalink:"/svelte-formula/docs/stores/stores",version:"current",sidebar_label:"Formula Stores",sidebar:"someSidebar",previous:{title:"Data API",permalink:"/svelte-formula/docs/groups/data"},next:{title:"dirty",permalink:"/svelte-formula/docs/stores/stores-dirty"}},i=[{value:"Accessing Stores",id:"accessing-stores",children:[]},{value:"Global Store",id:"global-store",children:[]}],c={toc:i};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"accessing-stores"},"Accessing Stores"),Object(a.b)("p",null,"Formula and Beaker provides a set of Svelte ",Object(a.b)("a",{parentName:"p",href:"https://svelte.dev/docs#svelte_store"},"stores")," as part of each instance\ncreated. These stores provide different types of values at different lifecycles of your application."),Object(a.b)("p",null,"All the stores are listed in the sidebar."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"When using Formula, the stores contain a single ",Object(a.b)("inlineCode",{parentName:"li"},"Object")," instance of the form"),Object(a.b)("li",{parentName:"ul"},"When using Beaker, the stores contain an ",Object(a.b)("inlineCode",{parentName:"li"},"Array")," of ",Object(a.b)("inlineCode",{parentName:"li"},"Object")," values for each row instance")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-javascript"},"const { form, enrichement, formValdity, formValues, isFormValid, submitValues, touched, validity } = formula();\n")),Object(a.b)("p",null,"If you have multiple forms on the page you can also access stores via ",Object(a.b)("inlineCode",{parentName:"p"},"form.stores")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-svelte"},"\n<script>\n  import { formula } from 'svelte-formula';\n\n  const myForm = formula()\n\n  const myFormValues = myForm.formValues // (or myForm.stores.formValues)\n\n<\/script>\n<form use:myForm.form>\n\n</form>\n\n")),Object(a.b)("h2",{id:"global-store"},"Global Store"),Object(a.b)("p",null,"When attaching a form to an element, if you provide an ",Object(a.b)("inlineCode",{parentName:"p"},"id")," property the stores will be added to a global ",Object(a.b)("inlineCode",{parentName:"p"},"Map")," that can\nbe accessed from anywhere else in your application from via ",Object(a.b)("inlineCode",{parentName:"p"},"formulaStores")," or ",Object(a.b)("inlineCode",{parentName:"p"},"beakerStores")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-svelte"},"\n<script>\n  import { get } from 'svelte/store'\n  import { formula, formulaStores, beakerStores } from 'svelte-formula';\n\n  const { form } = formula();\n\n  function formSubmit() {\n    const otherForm = formulaStores.get('otherForm');\n    const otherValues = get(otherForm.formValues);\n  }\n\n<\/script>\n\n<form use:form id='myForm' on:submit={formSubmit}>\n\n</form>\n")))}u.isMDXComponent=!0},97:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},m=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(r),f=n,b=m["".concat(s,".").concat(f)]||m[f]||p[f]||a;return r?o.a.createElement(b,l(l({ref:t},c),{},{components:r})):o.a.createElement(b,l({ref:t},c))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,s=new Array(a);s[0]=f;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,s[1]=l;for(var c=2;c<a;c++)s[c]=r[c];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);