(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"3O7J":function(n,o,e){"use strict";e("mXGw");var t=e("UutA"),r=e("/rHV"),i=e("aD51");function a(){var n=function(n,o){o||(o=n.slice(0));return n.raw=o,n}(["\n  ","\n"]);return a=function(){return n},n}var c=t.b.header(a(),r.Text);o.a=function(n){var o=n.size,e=void 0===o?22:o,t=n.opacity,r=n.children,a=n.style,l=void 0===a?{}:a;return Object(i.c)(c,{size:e,opacity:t,bold:!0,style:l},r)}},"4aJ/":function(n,o,e){"use strict";var t=e("mXGw"),r=e.n(t),i=e("UutA"),a=e("3O7J"),c=e("U8Mu"),l=e("/rHV"),d=e("BxKb"),b=e("pnHO"),s=e.n(b),u=e("aD51");function g(){var n=O(["\n  margin-top: ",";\n  padding-top: ",";\n  border-top: 1px solid ",";\n  text-align: right;\n\n  margin-left: -",";\n  margin-right: -",";\n  padding-left: ",";\n  padding-right: ",";\n"]);return g=function(){return n},n}function p(){var n=O(["\n  border: 16px solid #63a3f3; /* Light grey */\n  border-top: 16px solid #d5e7fd; /* Blue */\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  animation: spin 2s linear infinite;\n\n  @keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -60px;\n  margin-top: -60px;\n"]);return p=function(){return n},n}function m(){var n=O(["\n"]);return m=function(){return n},n}function x(){var n=O(["\n  > div {\n    display: flex\n    alignItems: baseline;\n  }\n\n  margin-bottom: 30px\n  button {\n    line-height: 1\n  }\n"]);return x=function(){return n},n}function f(){var n=O(["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  min-width: ",";\n  border-radius: ",";\n  background-color: ",";\n  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);\n  z-index: ",";\n\n  padding: ",";\n"]);return f=function(){return n},n}function h(){var n=O(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ",";\n  z-index: ",";\n"]);return h=function(){return n},n}function O(n,o){return o||(o=n.slice(0)),n.raw=o,n}var j="30px",v="10px",y="24px",C="24px",_="480px",w=i.b.div(h(),Object(d.a)(c.color.$black,.6),(function(n){return n.isLoading?c.zIndex.$modalOverlayLoading:c.zIndex.$modalOverlay})),z=i.b.div(f(),_,v,c.color.$primary_white,c.zIndex.$modal,j),I=i.b.header(x()),k=Object(i.b)(l.TextTag).attrs({size:"18",bold:!1})(m()),B=i.b.div(p()),S=i.b.footer(g(),y,C,c.color.$line_graph_xy_grey,j,j,j,j);o.a=function(n){return void 0===n&&(n={}),Object(u.c)(r.a.Fragment,null,n.isOpen&&Object(u.c)(w,{isLoading:n.isLoading},n.isLoading&&Object(u.c)(B,null)),n.isOpen&&Object(u.c)(z,null,Object(u.c)(I,null,Object(u.c)("div",null,Object(u.c)(a.a,{size:"22",opacity:"8"},n.title),Object(u.c)("div",{style:{marginLeft:"auto",marginTop:"-10px",marginRight:"-10px"}},Object(u.c)("button",{onClick:n.closeModal},Object(u.c)("img",{src:s.a,width:"34x",height:"34px",alt:""})))),n.description&&Object(u.c)(l.TextTag,{as:"p",size:14,opacity:6,style:{marginTop:"6px"}},n.description)),Object(u.c)(k,{as:"article"},n.children),n.footer&&Object(u.c)(S,null,Object(u.c)("div",null,n.footer))))}},csXV:function(n,o,e){"use strict";e.r(o),e.d(o,"_frontmatter",(function(){return b})),e.d(o,"default",(function(){return g}));e("5hJT"),e("W1QL"),e("K/PF"),e("t91x"),e("75LO"),e("PJhk");var t=e("mXGw"),r=e("SAVP"),i=e("TjRS"),a=e("ZFoC"),c=(e("LCSQ"),e("Br6x"),e("4aJ/")),l=e("yWE3");e("aD51");function d(){return(d=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n}).apply(this,arguments)}var b={};void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docz/Modal.mdx"}});var s={_frontmatter:b},u=i.a;function g(n){var o=n.components,e=function(n,o){if(null==n)return{};var e,t,r={},i=Object.keys(n);for(t=0;t<i.length;t++)e=i[t],o.indexOf(e)>=0||(r[e]=n[e]);return r}(n,["components"]);return Object(r.b)(u,d({},s,e,{components:o,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"card"},"card"),Object(r.b)("h2",{id:"selectedcard"},"SelectedCard"),Object(r.b)("p",null,"isOpen 을 값을 제어해서 modal 를 open, close 할 수 있다\nfooter 값은 생략 가능하다\nisLoading 으로 overlay 의 z-index 를 모달보다 높게 하고 loading animation 을 보여준다"),Object(r.b)(a.c,{__position:0,__code:'<Modal\n  title="modal title"\n  description="11"\n  isOpen={true}\n  isLoading={true}\n  closeModal={() => alert(\'close\')}\n  footer={\n    <div>\n      <Button variant="basic_line" size="lg">\n        Cancel\n      </Button>\n      <Button variant="primary" size="lg">\n        Submit\n      </Button>\n    </div>\n  }\n>\n  Contents\n</Modal>',__scope:{props:e,DefaultLayout:i.a,Playground:a.c,Props:a.d,useState:t.useState,Modal:c.a,Button:l.c},mdxType:"Playground"},Object(r.b)(c.a,{title:"modal title",description:"11",isOpen:!0,isLoading:!0,closeModal:function(){return alert("close")},footer:Object(r.b)("div",null,Object(r.b)(l.c,{variant:"basic_line",size:"lg",mdxType:"Button"},"Cancel"),Object(r.b)(l.c,{variant:"primary",size:"lg",mdxType:"Button"},"Submit")),mdxType:"Modal"},"Contents")))}g&&g===Object(g)&&Object.isExtensible(g)&&!g.hasOwnProperty("__filemeta")&&Object.defineProperty(g,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docz/Modal.mdx"}}),g.isMDXComponent=!0},pnHO:function(n,o){n.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzQiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNCAzNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgzNHYzNEgweiIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHBhdGggZmlsbD0iIzU2NUI1RiIgZD0iTTE3LjE0MiA0LjE0MmExIDEgMCAwIDEgMSAxdjExaDExYTEgMSAwIDEgMSAwIDJoLTExdjExYTEgMSAwIDEgMS0yIDB2LTExaC0xMWExIDEgMCAxIDEgMC0yaDExdi0xMWExIDEgMCAwIDEgMS0xeiIgbWFzaz0idXJsKCNiKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE3LjE0MiAxNy4xNDIpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="},yWE3:function(n,o,e){"use strict";e.d(o,"a",(function(){return B})),e.d(o,"b",(function(){return S}));e("PJhk"),e("f9rF"),e("5hJT"),e("mXGw");var t=e("UutA"),r=e("/rHV"),i=e("U8Mu"),a=e("BxKb"),c=e("aD51");function l(){return(l=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n}).apply(this,arguments)}function d(){var n=f(["\n  color: hexToRGB(color.$black, 0.6);\n  text-decoration: underline;\n"]);return d=function(){return n},n}function b(){var n=f(["\n  ","\n  ","\n  min-width: auto;\n  padding-left: 8px;\n  padding-right: 8px;\n  display: inline-block;\n  box-sizing: border-box;\n\n  color: ",";\n  &:hover {\n    color: ",";\n  }\n\n  &:first-child {\n    padding-left: 0;\n  }\n"]);return b=function(){return n},n}function s(){var n=f(["\n  ","\n  ","\n  ","\n"]);return s=function(){return n},n}function u(){var n=f(["\n  ","\n  animation-delay: 0.3s\n"]);return u=function(){return n},n}function g(){var n=f(["\n  ","\n  animation-delay: 0.2s\n"]);return g=function(){return n},n}function p(){var n=f(["\n  ","\n  animation-delay: 0.0s\n"]);return p=function(){return n},n}function m(){var n=f(["\n  @keyframes dot {\n        0% { opacity: 0; }\n      50% { opacity: 0; }\n      100% { opacity: 1; }\n  }\n\n  opacity: 0;\n  animation: dot 1.3s infinite;\n"]);return m=function(){return n},n}function x(){var n=f(["\n  border:0 none;\n  background-color:transparent;\n  cursor:pointer\n  transition: background-color 0.3s, color 0.3s ease, border-color 0.3s ease;\n  line-height: 1.34em;\n  \n  img {\n    vertical-align: middle\n  }\n\n  &:hover {\n    text-decoration: none\n  }\n\n  &:disabled {\n    cursor: not-allowed\n  }\n"]);return x=function(){return n},n}function f(n,o){return o||(o=n.slice(0)),n.raw=o,n}var h=Object(t.a)(x()),O={xLarge:{minWidth:"100%",height:"60px",borderRadius:"10px",padding:"16px 20px",img:{margin:"8px"},marginRight:"0"},large:{minWidth:"100px",height:"42px",borderRadius:"21px",padding:"10px 20px",img:{margin:"8px"},marginRight:"8px"},middle:{minWidth:"90px",height:"34px",borderRadius:"17px",padding:"7px 18px",img:{margin:"6px"},marginRight:"8px"}},j=function(n){return"\n  height: "+n.BtnSizeObject.height+";\n  border-radius: "+n.BtnSizeObject.borderRadius+";\n  padding: "+n.BtnSizeObject.padding+";\n  min-width: "+n.BtnSizeObject.minWidth+";\n\n  &:not(:last-child) {\n    margin-right: "+n.BtnSizeObject.marginRight+";\n  }\n\n  img:first-child {\n    margin-right: "+n.BtnSizeObject.img.margin+";\n  }\n\n  img:last-child {\n    margin-left: "+n.BtnSizeObject.img.margin+";\n  }\n"},v={primary:{boxShasdow:"none",backgroundColor:i.color.$solid_default,color:i.color.$primary_white,hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:i.color.$solid_hover,color:i.color.$primary_white},disabled:{boxShasdow:"none",backgroundColor:Object(a.a)(i.color.$btn_lightshaded_default,.48),color:Object(a.a)(i.color.$black,.2)}},primary_line:{boxShasdow:"none",backgroundColor:i.color.$primary_white,color:i.color.$solid_default,border:"1px solid "+i.color.$solid_default,hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:i.color.$primary_white,color:i.color.$solid_hover,border:"1px solid "+i.color.$solid_default},disabled:{boxShasdow:"none",backgroundColor:Object(a.a)(i.color.$btn_lightshaded_default,.48),color:Object(a.a)(i.color.$black,.2),border:"1px solid "+Object(a.a)(i.color.$line_btn_grey,.48)}},basic:{boxShasdow:"none",backgroundColor:Object(a.a)(i.color.$black,.1),color:Object(a.a)(i.color.$black,.6),hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:Object(a.a)(i.color.$black,.18),color:Object(a.a)(i.color.$black,.6)},disabled:{boxShasdow:"none",backgroundColor:Object(a.a)(i.color.$btn_lightshaded_default,.48),color:Object(a.a)(i.color.$black,.2)}},basic_line:{boxShasdow:"none",backgroundColor:i.color.$primary_white,color:Object(a.a)(i.color.$black,.6),border:"1px solid "+Object(a.a)(i.color.$black,.1),hover:{boxShasdow:"0 4px 10px 0 rgba(0, 0, 0, 0.08)",backgroundColor:i.color.$primary_white,color:Object(a.a)(i.color.$black,.6),border:"1px solid "+Object(a.a)(i.color.$black,.1)},disabled:{boxShasdow:"none",backgroundColor:Object(a.a)(i.color.$btn_lightshaded_default,.48),color:Object(a.a)(i.color.$black,.2),border:"1px solid "+Object(a.a)(i.color.$line_btn_grey,.48)}}},y=Object(t.a)(m()),C=t.b.span(p(),y),_=t.b.span(g(),y),w=t.b.span(u(),y),z=Object(t.b)(r.TextTag).attrs((function(n){void 0===n&&(n={}),n.size=n.size||"md";var o="xlg"===n.size?O.xLarge:"md"===n.size?O.middle:O.large,e=n.variant;"secondary"===e&&(e="basic"),"light"===e&&(e="basic_line");var t="primary"===e?v.primary:"primary_line"===e?v.primary_line:"basic"===e?v.basic:v.basic_line;return{size:"xlg"===n.size?18:"md"===n.size?14:16,bold:n.bold||!0,BtnSizeObject:o,BtnColorObject:t}}))(s(),h,j,(function(n){return"\n  box-shadow: "+n.BtnColorObject.boxShasdow+";\n  background-color: "+n.BtnColorObject.backgroundColor+";\n  color: "+n.BtnColorObject.color+";\n\n  border: "+(n.BtnColorObject.border?n.BtnColorObject.border:"none")+";\n\n  &:hover:not(:disabled) {\n    box-shadow: "+n.BtnColorObject.hover.boxShasdow+";\n    background-color: "+n.BtnColorObject.hover.backgroundColor+";\n    color: "+n.BtnColorObject.hover.color+";\n    border: "+(n.BtnColorObject.hover.border?n.BtnColorObject.hover.border:"none")+";\n  }\n\n  &:disabled {\n    box-shadow: "+n.BtnColorObject.disabled.boxShasdow+";\n    background-color: "+n.BtnColorObject.disabled.backgroundColor+";\n    color: "+n.BtnColorObject.disabled.color+";\n    border: "+(n.BtnColorObject.disabled.border?n.BtnColorObject.disabled.border:"none")+";\n  }\n"})),I=Object(t.b)(r.TextTag).attrs((function(n){void 0===n&&(n={}),n.size=n.size||"md";var o="md"===n.size?O.middle:O.large;return{size:"md"===n.size?14:16,bold:n.bold||!0,BtnSizeObject:o}}))(b(),h,j,i.color.$solid_default,i.color.$solid_hover),k=Object(t.b)(r.TextTag).attrs((function(n){return void 0===n&&(n={}),{size:16,bold:!0}}))(d()),B=function(n){return Object(c.c)(I,l({as:"a"},n),n.children)};void 0!==B&&B&&B===Object(B)&&Object.isExtensible(B)&&!B.hasOwnProperty("__filemeta")&&Object.defineProperty(B,"__filemeta",{configurable:!0,value:{name:"ButtonLink",filename:"src/components/button/Button.js"}}),void 0!==B&&B&&B===Object(B)&&Object.isExtensible(B)&&!B.hasOwnProperty("__filemeta")&&Object.defineProperty(B,"__filemeta",{configurable:!0,value:{name:"ButtonLink",filename:"src/components/button/Button.js"}});var S=function(n){return Object(c.c)(k,l({as:n.as||"a"},n),n.children)};void 0!==S&&S&&S===Object(S)&&Object.isExtensible(S)&&!S.hasOwnProperty("__filemeta")&&Object.defineProperty(S,"__filemeta",{configurable:!0,value:{name:"ButtonTextLink",filename:"src/components/button/Button.js"}}),void 0!==S&&S&&S===Object(S)&&Object.isExtensible(S)&&!S.hasOwnProperty("__filemeta")&&Object.defineProperty(S,"__filemeta",{configurable:!0,value:{name:"ButtonTextLink",filename:"src/components/button/Button.js"}}),o.c=function(n){var o="true"===n.isLoading;return Object(c.c)(z,l({as:n.as||"button"},n,{disabled:n.disabled||o}),o?"loading":n.children,o&&Object(c.c)("span",null,Object(c.c)(C,null,"."),Object(c.c)(_,null,"."),Object(c.c)(w,null,".")))}}}]);
//# sourceMappingURL=component---src-docz-modal-mdx-56e0423ad575562a8724.js.map