!function(){"use strict";var e,n={393:function(e,n,t){var r,a=t(294),l=t(745),o=t(426),c=t(974),i=t(788);var u,s,f=i.ZP.div(r||(u=["\n  display: flex;\n  justify-content: center;\n  padding: 1rem;\n  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);\n  border-radius: 0.5rem;\n"],s||(s=u.slice(0)),r=Object.freeze(Object.defineProperties(u,{raw:{value:Object.freeze(s)}})))),m=function(e){var n=e.children;return a.createElement(f,null,n)},d=t(245);function p(){return p=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},p.apply(this,arguments)}function b(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,a,l=[],o=!0,c=!1;try{for(t=t.call(e);!(o=(r=t.next()).done)&&(l.push(r.value),!n||l.length!==n);o=!0);}catch(e){c=!0,a=e}finally{try{o||null==t.return||t.return()}finally{if(c)throw a}}return l}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return g(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function v(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?v(Object(t),!0).forEach((function(n){y(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function y(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var O={user:null};if(localStorage.getItem("token")){var E=(0,d.Z)(localStorage.getItem("token"));E.sub;1e3*E.exp<Date.now()?localStorage.removeItem("token"):O.user=E}var j,x,k,w,P=(0,a.createContext)({user:null,login:function(e){},logout:function(){}}),A=function(e,n){switch(n.type){case"LOGIN":return h(h({},e),{},{user:n.payload});case"LOGOUT":return h(h({},e),{},{user:null});default:return e}},S=function(e){var n=b((0,a.useReducer)(A,O),2),t=n[0],r=n[1];return a.createElement(P.Provider,p({value:{user:t.user,login:function(e){localStorage.setItem("token",e),r({type:"LOGIN",payload:e}),window.location.reload()},logout:function(){localStorage.removeItem("token"),r({type:"LOGOUT"})}}},e))};function Z(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var B,I=i.ZP.div(j||(j=Z(["\n  display: flex;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  justify-items: center;\n  justify-content: center;\n  position: relative;\n"]))),z=i.ZP.div(x||(x=Z(["\n  position: absolute;\n  top: 40vh;\n  display: flex;\n  flex-direction: column;\n"]))),N=i.ZP.div(k||(k=Z(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]))),C=i.ZP.h4(w||(w=Z(["\n  display: flex;\n  justify-content: center;\n"]))),_=function(){var e=(0,a.useContext)(P).login,n=(0,c.s0)();return a.createElement(I,null,a.createElement(z,null,a.createElement(m,null,a.createElement(N,null,a.createElement(C,null,"Welcome to mampionona task tracker"),a.createElement(o.kZ,{onSuccess:function(t){e(t.credential),n("/dashboard",{replace:!0})},onError:function(e){console.log(e)}})))))};var T,W,D,F=i.ZP.div(B||(B=function(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n  display: flex;\n"]))),G=function(e){var n=e.children,t=e.title,r=e.className,l=e.onClick;return a.createElement(F,{className:r,onClick:l},n,t)};function U(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var L=i.ZP.div(T||(T=U(["\n  display: flex;\n  color: white;\n  height: 2rem;\n  align-items: center;\n  justify-content: space-between;\n"]))),R=i.ZP.div(W||(W=U(["\n  display: flex;\n  gap: 0.1rem;\n"]))),K=i.ZP.img(D||(D=U(["\n  height: 1.8rem;\n  width: 1.8rem;\n  border-radius: 50%;\n"]))),M=function(){var e=(0,a.useContext)(P),n=e.user,t=e.logout;return a.createElement(L,{className:"canonicalAubergine"},a.createElement("span",{className:"material-icons-round navBarBtn","data-testid":"btn-menu"},"menu"),a.createElement(R,null,a.createElement(G,{title:"PENDING TASK",className:"navBarBtn"},a.createElement("span",{className:"material-icons-round"},"pending_actions")),a.createElement(G,{title:"CREATE NEW TASK",className:"navBarBtn"},a.createElement("span",{className:"material-icons-round"},"add_circle_outline")),a.createElement(G,{title:"LOGOUT",className:"navBarBtn",onClick:function(e){e.preventDefault(),t()}},a.createElement(K,{src:n.picture,alt:n.given_name,referrerPolicy:"no-referrer"}))))},q=function(e){var n=e.children;return(0,a.useContext)(P).user?a.createElement(a.Fragment,null,a.createElement(M,null),n||a.createElement(c.j3,null)):a.createElement(c.Fg,{to:"/login",replace:!0})};function J(e){return a.createElement(a.Fragment,null,a.createElement("p",null,"placeholder Dashboard"))}var V,$=function(){var e=(0,a.useContext)(P).user;return a.createElement(c.Z5,null,a.createElement(c.AW,{path:"/*",element:e?a.createElement(c.Fg,{to:"/dashboard",replace:!0}):a.createElement(c.Fg,{to:"/login"})}),a.createElement(c.AW,{path:"*",element:"/index.html"}),a.createElement(c.AW,{path:"/login",element:e?a.createElement(c.Fg,{to:"/dashboard",replace:!0}):a.createElement(_,null)}),a.createElement(c.AW,{element:a.createElement(q,null)},a.createElement(c.AW,{path:"/dashboard",element:a.createElement(J,null)}),a.createElement(c.AW,{path:"test",element:a.createElement("div",null,"test")}),a.createElement(c.AW,{path:"/",element:a.createElement(c.Fg,{to:"/dashboard",replace:!0})})))},H=t(711);var Q=(0,i.vJ)(V||(V=function(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n    body{\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n        font-family: Ubuntu;\n        height: 100vh;\n    }\n    .cursPointer{\n        cursor: pointer;\n    }\n    .darkAubergine{\n       background-color : #2c001e;\n    }\n    .canonicalAubergine{        \n        background-color : #772953;\n    }\n    .midAubergine{        \n        background-color : #5e2750;\n    }\n    .lightAubergine{        \n        background-color : #77216f;\n    }\n    .coolGrey{\n        background-color : #333333;\n    }\n    .navBarBtn{\n        background-color : #2c001e;\n        cursor: pointer;\n        height: 2rem;\n        display: flex;\n        align-items: center;\n        gap: 0.3rem;\n        padding: 0 0.2rem;\n        :hover{\n            background-color : #5e2750;\n        }\n    }\n\n\n    @media screen and (max-width: 445px ) { \n        .navBarBtn{\n            font-size: small;\n        }\n    }\n    @media screen and (max-width: 315px ) { \n        .navBarBtn{\n            font-size: x-small;\n        }\n    }\n"]))),X=Q,Y=t(379),ee=t.n(Y),ne=t(795),te=t.n(ne),re=t(569),ae=t.n(re),le=t(565),oe=t.n(le),ce=t(216),ie=t.n(ce),ue=t(589),se=t.n(ue),fe=t(424),me={};me.styleTagTransform=se(),me.setAttributes=oe(),me.insert=ae().bind(null,"head"),me.domAPI=te(),me.insertStyleElement=ie();ee()(fe.Z,me),fe.Z&&fe.Z.locals&&fe.Z.locals;var de=document.getElementById("root");l.s(de).render(a.createElement(a.StrictMode,null,a.createElement(H.VK,null,a.createElement(S,null,a.createElement(o.rg,{clientId:"498868729809-sqv8at247oi30ldgt0se55j5397u71br.apps.googleusercontent.com"},a.createElement(X,null),a.createElement($,null))))))},424:function(e,n,t){var r=t(81),a=t.n(r),l=t(645),o=t.n(l),c=t(667),i=t.n(c),u=new URL(t(392),t.b),s=o()(a()),f=i()(u);s.push([e.id,"body {\r\n  background-image: url("+f+");\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n",""]),n.Z=s},392:function(e,n,t){e.exports=t.p+"2885a66dde22cb774916.svg"}},t={};function r(e){var a=t[e];if(void 0!==a)return a.exports;var l=t[e]={id:e,exports:{}};return n[e](l,l.exports,r),l.exports}r.m=n,e=[],r.O=function(n,t,a,l){if(!t){var o=1/0;for(s=0;s<e.length;s++){t=e[s][0],a=e[s][1],l=e[s][2];for(var c=!0,i=0;i<t.length;i++)(!1&l||o>=l)&&Object.keys(r.O).every((function(e){return r.O[e](t[i])}))?t.splice(i--,1):(c=!1,l<o&&(o=l));if(c){e.splice(s--,1);var u=a();void 0!==u&&(n=u)}}return n}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[t,a,l]},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,{a:n}),n},r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/",function(){r.b=document.baseURI||self.location.href;var e={143:0};r.O.j=function(n){return 0===e[n]};var n=function(n,t){var a,l,o=t[0],c=t[1],i=t[2],u=0;if(o.some((function(n){return 0!==e[n]}))){for(a in c)r.o(c,a)&&(r.m[a]=c[a]);if(i)var s=i(r)}for(n&&n(t);u<o.length;u++)l=o[u],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(s)},t=self.webpackChunkmampionona_task_tracker=self.webpackChunkmampionona_task_tracker||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}(),r.nc=void 0;var a=r.O(void 0,[736],(function(){return r(393)}));a=r.O(a)}();