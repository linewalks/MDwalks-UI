(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1014:function(n,o,e){"use strict";e.d(o,"a",(function(){return B})),e.d(o,"b",(function(){return S}));e(5),e(248),e(13);var t=e(10),r=(e(1),e(247)),i=e(982),a=e(981),c=e(984);function l(){return(l=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n}).apply(this,arguments)}function d(){var n=x(["\n  color: hexToRGB(color.$black, 0.6);\n  text-decoration: underline;\n"]);return d=function(){return n},n}function b(){var n=x(["\n  ","\n  ","\n  min-width: auto;\n  padding-left: 8px;\n  padding-right: 8px;\n  display: inline-block;\n  box-sizing: border-box;\n\n  color: ",";\n  &:hover {\n    color: ",";\n  }\n\n  &:first-child {\n    padding-left: 0;\n  }\n"]);return b=function(){return n},n}function s(){var n=x(["\n  ","\n  ","\n  ","\n"]);return s=function(){return n},n}function u(){var n=x(["\n  ","\n  animation-delay: 0.3s\n"]);return u=function(){return n},n}function g(){var n=x(["\n  ","\n  animation-delay: 0.2s\n"]);return g=function(){return n},n}function p(){var n=x(["\n  ","\n  animation-delay: 0.0s\n"]);return p=function(){return n},n}function m(){var n=x(["\n  @keyframes dot {\n        0% { opacity: 0; }\n      50% { opacity: 0; }\n      100% { opacity: 1; }\n  }\n\n  opacity: 0;\n  animation: dot 1.3s infinite;\n"]);return m=function(){return n},n}function f(){var n=x(["\n  border:0 none;\n  background-color:transparent;\n  cursor:pointer\n  transition: background-color 0.3s, color 0.3s ease, border-color 0.3s ease;\n  line-height: 1.34em;\n  \n  img {\n    vertical-align: middle\n  }\n\n  &:hover {\n    text-decoration: none\n  }\n\n  &:disabled {\n    cursor: not-allowed\n  }\n"]);return f=function(){return n},n}function x(n,o){return o||(o=n.slice(0)),n.raw=o,n}var j=Object(r.a)(f()),O={large:{minWidth:"100px",height:"42px",borderRadius:"21px",padding:"10px 20px",img:{margin:"8px"},marginRight:"8px"},middle:{minWidth:"90px",height:"34px",borderRadius:"17px",padding:"7px 18px",img:{margin:"6px"},marginRight:"8px"}},h=function(n){return"\n  height: "+n.BtnSizeObject.height+";\n  border-radius: "+n.BtnSizeObject.borderRadius+";\n  padding: "+n.BtnSizeObject.padding+";\n  min-width: "+n.BtnSizeObject.minWidth+";\n\n  &:not(:last-child) {\n    margin-right: "+n.BtnSizeObject.marginRight+";\n  }\n\n  img:first-child {\n    margin-right: "+n.BtnSizeObject.img.margin+";\n  }\n\n  img:last-child {\n    margin-left: "+n.BtnSizeObject.img.margin+";\n  }\n"},v={primary:{boxShasdow:"none",backgroundColor:a.color.$solid_default,color:a.color.$primary_white,hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:a.color.$solid_hover,color:a.color.$primary_white},disabled:{boxShasdow:"none",backgroundColor:Object(c.a)(a.color.$btn_lightshaded_default,.48),color:Object(c.a)(a.color.$black,.2)}},primary_line:{boxShasdow:"none",backgroundColor:a.color.$primary_white,color:a.color.$solid_default,border:"1px solid "+a.color.$solid_default,hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:a.color.$primary_white,color:a.color.$solid_hover,border:"1px solid "+a.color.$solid_default},disabled:{boxShasdow:"none",backgroundColor:Object(c.a)(a.color.$btn_lightshaded_default,.48),color:Object(c.a)(a.color.$black,.2),border:"1px solid "+Object(c.a)(a.color.$line_btn_grey,.48)}},basic:{boxShasdow:"none",backgroundColor:Object(c.a)(a.color.$black,.1),color:Object(c.a)(a.color.$black,.6),hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:Object(c.a)(a.color.$black,.18),color:Object(c.a)(a.color.$black,.6)},disabled:{boxShasdow:"none",backgroundColor:Object(c.a)(a.color.$btn_lightshaded_default,.48),color:Object(c.a)(a.color.$black,.2)}},basic_line:{boxShasdow:"none",backgroundColor:a.color.$primary_white,color:Object(c.a)(a.color.$black,.6),border:"1px solid "+Object(c.a)(a.color.$black,.1),hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:a.color.$primary_white,color:Object(c.a)(a.color.$black,.6),border:"1px solid "+Object(c.a)(a.color.$black,.1)},disabled:{boxShasdow:"none",backgroundColor:Object(c.a)(a.color.$btn_lightshaded_default,.48),color:Object(c.a)(a.color.$black,.2),border:"1px solid "+Object(c.a)(a.color.$line_btn_grey,.48)}}},C=Object(r.a)(m()),y=r.b.span(p(),C),_=r.b.span(g(),C),I=r.b.span(u(),C),z=Object(r.b)(i.TextTag).attrs((function(n){void 0===n&&(n={}),n.size=n.size||"md";var o="md"===n.size?O.middle:O.large,e=n.variant;"secondary"==e&&(e="basic"),"light"==e&&(e="basic_line");var t="primary"===e?v.primary:"primary_line"===e?v.primary_line:"basic"===e?v.basic:v.basic_line;return{size:"md"===n.size?14:16,bold:n.bold||!0,BtnSizeObject:o,BtnColorObject:t}}))(s(),j,h,(function(n){return"\n  box-shadow: "+n.BtnColorObject.boxShasdow+";\n  background-color: "+n.BtnColorObject.backgroundColor+";\n  color: "+n.BtnColorObject.color+";\n\n  border: "+(n.BtnColorObject.border?n.BtnColorObject.border:"none")+";\n\n  &:hover:not(:disabled) {\n    box-shadow: "+n.BtnColorObject.hover.boxShasdow+";\n    background-color: "+n.BtnColorObject.hover.backgroundColor+";\n    color: "+n.BtnColorObject.hover.color+";\n    border: "+(n.BtnColorObject.hover.border?n.BtnColorObject.hover.border:"none")+";\n  }\n\n  &:disabled {\n    box-shadow: "+n.BtnColorObject.disabled.boxShasdow+";\n    background-color: "+n.BtnColorObject.disabled.backgroundColor+";\n    color: "+n.BtnColorObject.disabled.color+";\n    border: "+(n.BtnColorObject.disabled.border?n.BtnColorObject.disabled.border:"none")+";\n  }\n"})),w=Object(r.b)(i.TextTag).attrs((function(n){void 0===n&&(n={}),n.size=n.size||"md";var o="md"===n.size?O.middle:O.large;return{size:"md"===n.size?14:16,bold:n.bold||!0,BtnSizeObject:o}}))(b(),j,h,a.color.$solid_default,a.color.$solid_hover),k=Object(r.b)(i.TextTag).attrs((function(n){return void 0===n&&(n={}),{size:16,bold:!0}}))(d()),B=function(n){return Object(t.c)(w,l({as:"a"},n),n.children)};void 0!==B&&B&&B===Object(B)&&Object.isExtensible(B)&&Object.defineProperty(B,"__filemeta",{configurable:!0,value:{name:"ButtonLink",filename:"src/components/button/Button.js"}}),void 0!==B&&B&&B===Object(B)&&Object.isExtensible(B)&&Object.defineProperty(B,"__filemeta",{configurable:!0,value:{name:"ButtonLink",filename:"src/components/button/Button.js"}});var S=function(n){return Object(t.c)(k,l({as:n.as||"a"},n),n.children)};void 0!==S&&S&&S===Object(S)&&Object.isExtensible(S)&&Object.defineProperty(S,"__filemeta",{configurable:!0,value:{name:"ButtonTextLink",filename:"src/components/button/Button.js"}}),void 0!==S&&S&&S===Object(S)&&Object.isExtensible(S)&&Object.defineProperty(S,"__filemeta",{configurable:!0,value:{name:"ButtonTextLink",filename:"src/components/button/Button.js"}}),o.c=function(n){var o="true"==n.isLoading;return Object(t.c)(z,l({as:n.as||"button"},n,{disabled:n.disabled||o}),o?"loading":n.children,o&&Object(t.c)("span",null,Object(t.c)(y,null,"."),Object(t.c)(_,null,"."),Object(t.c)(I,null,".")))}},1024:function(n,o,e){"use strict";var t=e(10),r=(e(1),e(247)),i=e(982);function a(){var n=function(n,o){o||(o=n.slice(0));return n.raw=o,n}(["\n  ","\n"]);return a=function(){return n},n}var c=r.b.header(a(),i.Text);o.a=function(n){var o=n.size,e=void 0===o?22:o,r=n.opacity,i=n.children,a=n.style,l=void 0===a?{}:a;return Object(t.c)(c,{size:e,opacity:r,bold:!0,style:l},i)}},1044:function(n,o,e){"use strict";var t=e(10),r=e(1),i=e.n(r),a=e(247),c=e(1024),l=e(981),d=e(982),b=e(984),s=e(1046),u=e.n(s);function g(){var n=j(["\n  margin-top: ",";\n  padding-top: ",";\n  border-top: 1px solid ",";\n  text-align: right;\n\n  margin-left: -",";\n  margin-right: -",";\n  padding-left: ",";\n  padding-right: ",";\n"]);return g=function(){return n},n}function p(){var n=j(["\n"]);return p=function(){return n},n}function m(){var n=j(["\n  > div {\n    display: flex\n    alignItems: baseline;\n  }\n\n  margin-bottom: 30px\n  button {\n    line-height: 1\n  }\n"]);return m=function(){return n},n}function f(){var n=j(["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  min-width: ",";\n  border-radius: ",";\n  background-color: ",";\n  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);\n  z-index: ",";\n\n  padding: ",";\n"]);return f=function(){return n},n}function x(){var n=j(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ",";\n  z-index: ",";\n"]);return x=function(){return n},n}function j(n,o){return o||(o=n.slice(0)),n.raw=o,n}var O="30px",h="10px",v="24px",C="24px",y="480px",_=a.b.div(x(),Object(b.a)(l.color.$black,.6),l.zIndex.$modalOverlay),I=a.b.div(f(),y,h,l.color.$primary_white,l.zIndex.$modal,O),z=a.b.header(m()),w=Object(a.b)(d.TextTag).attrs({size:"18",bold:!1})(p()),k=a.b.footer(g(),v,C,l.color.$line_graph_xy_grey,O,O,O,O);o.a=function(n){return void 0===n&&(n={}),Object(t.c)(i.a.Fragment,null,n.isOpen&&Object(t.c)(_,null),n.isOpen&&Object(t.c)(I,null,Object(t.c)(z,null,Object(t.c)("div",null,Object(t.c)(c.a,{size:"22",opacity:"8"},n.title),Object(t.c)("div",{style:{marginLeft:"auto",marginTop:"-10px",marginRight:"-10px"}},Object(t.c)("button",{onClick:n.closeModal},Object(t.c)("img",{src:u.a,width:"34x",height:"34px"})))),n.description&&Object(t.c)(d.TextTag,{as:"p",size:14,opacity:6,style:{marginTop:"6px"}},n.description)),Object(t.c)(w,{as:"article"},n.children),n.footer&&Object(t.c)(k,null,Object(t.c)("div",null,n.footer))))}},1046:function(n,o){n.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzQiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNCAzNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgzNHYzNEgweiIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHBhdGggZmlsbD0iIzU2NUI1RiIgZD0iTTE3LjE0MiA0LjE0MmExIDEgMCAwIDEgMSAxdjExaDExYTEgMSAwIDEgMSAwIDJoLTExdjExYTEgMSAwIDEgMS0yIDB2LTExaC0xMWExIDEgMCAxIDEgMC0yaDExdi0xMWExIDEgMCAwIDEgMS0xeiIgbWFzaz0idXJsKCNiKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE3LjE0MiAxNy4xNDIpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="},996:function(n,o,e){"use strict";e.r(o),e.d(o,"_frontmatter",(function(){return b})),e.d(o,"default",(function(){return g}));e(13),e(6),e(7),e(4),e(8),e(5),e(10);var t=e(1),r=e(83),i=e(983),a=e(33),c=(e(997),e(1044)),l=e(1014);function d(){return(d=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n}).apply(this,arguments)}var b={};void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docz/Modal.mdx"}});var s={_frontmatter:b},u=i.a;function g(n){var o=n.components,e=function(n,o){if(null==n)return{};var e,t,r={},i=Object.keys(n);for(t=0;t<i.length;t++)e=i[t],o.indexOf(e)>=0||(r[e]=n[e]);return r}(n,["components"]);return Object(r.b)(u,d({},s,e,{components:o,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"card"},"card"),Object(r.b)("h2",{id:"selectedcard"},"SelectedCard"),Object(r.b)("p",null,"isOpen 을 값을 제어해서 modal 를 open, close 할 수 있다\nfooter 값은 생략 가능하다"),Object(r.b)(a.c,{__position:0,__code:'<Modal\n  title="modal title"\n  description="11"\n  isOpen={true}\n  closeModal={() => alert(\'close\')}\n  footer={\n    <div>\n      <Button variant="basic_line" size="lg">\n        Cancel\n      </Button>\n      <Button variant="primary" size="lg">\n        Submit\n      </Button>\n    </div>\n  }\n>\n  Contents\n</Modal>',__scope:{props:e,DefaultLayout:i.a,Playground:a.c,Props:a.d,useState:t.useState,Modal:c.a,Button:l.c},mdxType:"Playground"},Object(r.b)(c.a,{title:"modal title",description:"11",isOpen:!0,closeModal:function(){return alert("close")},footer:Object(r.b)("div",null,Object(r.b)(l.c,{variant:"basic_line",size:"lg",mdxType:"Button"},"Cancel"),Object(r.b)(l.c,{variant:"primary",size:"lg",mdxType:"Button"},"Submit")),mdxType:"Modal"},"Contents")))}g&&g===Object(g)&&Object.isExtensible(g)&&Object.defineProperty(g,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docz/Modal.mdx"}}),g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docz-modal-mdx-13b8bde2ff8398ef8127.js.map