(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1017:function(e,t,n){"use strict";var r=n(10),o=(n(1),n(173)),a=n(983);function i(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  ","\n"]);return i=function(){return e},e}var c=o.b.header(i(),a.Text);t.a=function(e){var t=e.size,n=void 0===t?22:t,o=e.opacity,a=e.children,i=e.style,s=void 0===i?{}:i;return Object(r.c)(c,{size:n,opacity:o,bold:!0,style:s},a)}},1035:function(e,t,n){"use strict";var r=n(10),o=(n(1),n(173)),a=n(982);function i(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  height: 70px\n  background-color: ","\n  padding: 0 30px\n  display: flex\n  align-items: center\n  margin-bottom: 40px\n\n  a:active, a:hover {\n    text-decoration: none\n  }\n  \n  border-bottom: 1px solid ","\n"]);return i=function(){return e},e}var c=o.b.nav(i(),a.color.$primary_white,a.color.$line_search_grey);t.a=function(e){var t=e.style,n=void 0===t?{}:t,o=e.children;return Object(r.c)(c,{style:n},o)}},1036:function(e,t,n){"use strict";var r=n(10),o=(n(1),n(173)),a=n(982),i=n(983);function c(){var e=l(["\n  ","\n  border-top: 1px solid ","\n  height: ","\n\n  display: flex\n  align-items: center\n\n  span {\n    padding-left: 30px\n  }\n"]);return c=function(){return e},e}function s(){var e=l(["\n  position: absolute\n  bottom: 0\n  height: ","\n  padding: 0 30px\n  width: 100%\n  box-sizing: border-box\n"]);return s=function(){return e},e}function l(e,t){return t||(t=e.slice(0)),e.raw=t,e}var u=o.b.footer(s(),a.size.$footer_height),d=o.b.div(c(),i.Text,a.color.$line_search_grey,a.size.$footer_height);t.a=function(e){var t=e.style,n=void 0===t?{}:t;return Object(r.c)(u,{style:n},Object(r.c)(d,{size:"12",opacity:"6"},Object(r.c)("span",null,"© 2019 linewalks. All rights reserved.")))}},1037:function(e,t,n){"use strict";n(21);var r=n(10);n(1);t.a=function(e){var t=e.logo,n=t.src.split("."),o=n[0],a=n[1];return Object(r.c)("img",{alt:t.alt,src:""+o+a,srcSet:o+"."+a+" 1x, "+o+"@2x."+a+" 2x"})}},994:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return d})),n.d(t,"default",(function(){return f}));n(12),n(7),n(6),n(4),n(8),n(5),n(10),n(1);var r=n(83),o=n(984),a=n(33),i=n(1035),c=n(1036),s=n(1037),l=n(1017);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var d={};void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docz/Layout.mdx"}});var p={_frontmatter:d},b=o.a;function f(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(r.b)(b,u({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"layout"},"Layout"),Object(r.b)("h2",{id:"heading"},"Heading"),Object(r.b)("p",null,"default fontsize is 22,\nsupport property style, size"),Object(r.b)(a.c,{__position:0,__code:"<Heading>MDwalks-UI Heading</Heading>\n<Heading size=\"15\" style={{ color: '#0B5FFF' }}>\n  MDwalks-UI Heading\n</Heading>",__scope:{props:n,DefaultLayout:o.a,Playground:a.c,Props:a.d,Navbar:i.a,Footer:c.a,Image:s.a,Heading:l.a},mdxType:"Playground"},Object(r.b)(l.a,{mdxType:"Heading"},"MDwalks-UI Heading"),Object(r.b)(l.a,{size:"15",style:{color:"#0B5FFF"},mdxType:"Heading"},"MDwalks-UI Heading")),Object(r.b)("h2",{id:"navbar"},"Navbar"),Object(r.b)("p",null,"support property style"),Object(r.b)(a.c,{__position:1,__code:"<Navbar></Navbar>",__scope:{props:n,DefaultLayout:o.a,Playground:a.c,Props:a.d,Navbar:i.a,Footer:c.a,Image:s.a,Heading:l.a},mdxType:"Playground"},Object(r.b)(i.a,{mdxType:"Navbar"})),Object(r.b)("h2",{id:"footer"},"Footer"),Object(r.b)("p",null,"support property style"),Object(r.b)(a.c,{__position:2,__code:"<div style={{ height: 100, position: 'relative' }}>\n  <Footer />\n</div>",__scope:{props:n,DefaultLayout:o.a,Playground:a.c,Props:a.d,Navbar:i.a,Footer:c.a,Image:s.a,Heading:l.a},mdxType:"Playground"},Object(r.b)("div",{style:{height:100,position:"relative"}},Object(r.b)(c.a,{mdxType:"Footer"}))))}f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docz/Layout.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docz-layout-mdx-07032f8781efbeb1472d.js.map