(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1002:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return s});n(978),n(999);var r=n(979);function i(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  ","\n"]);return i=function(){return e},e}var a={size:14},o=function(e){return"\n  font-size: "+(e.size?e.size+"px":a.size+"px")+";\n\n  font-weight: "+(e.bold?"bold":"normal")+";\n  letter-spacing: -0.5px;\n  color: rgba(0, 0, 0, "+(e.opacity?(.1*e.opacity).toFixed(2):1)+");\n"};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"Text",filename:"src/assets/styles/font.js"}}),void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"Text",filename:"src/assets/styles/font.js"}});var s=r.a.span(i(),o);void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"TextTag",filename:"src/assets/styles/font.js"}}),void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"TextTag",filename:"src/assets/styles/font.js"}})},1003:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i});n(978);var r={$black:"#000000",$primary_white:"#ffffff",$primary_navy:"#002d4f",$secondary_blue:"#eff8ff",$secondary_bg_blue:"#f7fafb",$menu_grey:"#565b5f",$icn_grey:"#979797",$line_btn_grey:"#c4c4c4",$line_dashboard_edge_grey:"#d4d4d4",$line_search_grey:"#e2e2e2",$line_graph_xy_grey:"#e8e8e8",$table_grey:"#f2f2f2",$bg_grey:"#f8f8f8",$table_cell_grey:"#fafafa",$legend_timeline_green_01:"#a5e2d7",$legend_timeline_green_02:"#27b097",$legend_timeline_green_03:"#00745e",$legend_timeline_red_01:"#fa6b57",$legend_timeline_red_02:"#faafa5",$alert_red:"#ff3c3c",$azure:"#189bff",$pathway_link_blue:"rgba(24, 155, 255, 0.4)",$pathway_link_red:"rgba(255, 58, 31, 0.4)",$solid_default:"#189bff",$solid_hover:"#0070c6",$btn_solid_disable:"#d1e7f7",$btn_lightshaded_disable:"#efefef",$btn_lightshaded_hover:"#d1d1d1",$btn_lightshaded_default:"#e5e5e5",$txt_solid_disable:"#ebf6fe",$txt_solid_disable_02:"#b7ddf9"};void 0!==r&&r&&r===Object(r)&&Object.isExtensible(r)&&Object.defineProperty(r,"__filemeta",{configurable:!0,value:{name:"color",filename:"src/assets/styles/variables.js"}}),void 0!==r&&r&&r===Object(r)&&Object.isExtensible(r)&&Object.defineProperty(r,"__filemeta",{configurable:!0,value:{name:"color",filename:"src/assets/styles/variables.js"}});var i={$footer_height:"60px",$footer_margin_top:"80px"};void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"size",filename:"src/assets/styles/variables.js"}}),void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"size",filename:"src/assets/styles/variables.js"}})},987:function(e,t,n){"use strict";n.r(t);n(11),n(5),n(6),n(4),n(7),n(978);var r=n(8),i=(n(1),n(82)),a=n(980),o=n(32),s=n(979),l=n(1003);function c(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  height: 70px\n  background-color: ","\n  padding: 0 30px\n  display: flex\n  align-items: center\n  margin-bottom: 40px\n\n  a:active, a:hover {\n    text-decoration: none\n  }\n  \n  border-bottom: 1px solid ","\n"]);return c=function(){return e},e}var b=s.a.nav(c(),l.a.$primary_white,l.a.$line_search_grey),d=function(e){var t=e.style,n=void 0===t?{}:t,i=e.children;return Object(r.c)(b,{style:n},i)},f=n(1002);function u(){var e=p(["\n  ","\n  border-top: 1px solid ","\n  height: ","\n\n  display: flex\n  align-items: center\n\n  span {\n    padding-left: 30px\n  }\n"]);return u=function(){return e},e}function _(){var e=p(["\n  position: absolute\n  bottom: 0\n  height: ","\n  padding: 0 30px\n  width: 100%\n  box-sizing: border-box\n"]);return _=function(){return e},e}function p(e,t){return t||(t=e.slice(0)),e.raw=t,e}var g=s.a.footer(_(),l.b.$footer_height),y=s.a.div(u(),f.a,l.a.$line_search_grey,l.b.$footer_height),v=function(e){var t=e.style,n=void 0===t?{}:t;return Object(r.c)(g,{style:n},Object(r.c)(y,{size:"12",opacity:"6"},Object(r.c)("span",null,"© 2019 linewalks. All rights reserved.")))},m=(n(21),function(e){var t=e.logo,n=t.src.split("."),i=n[0],a=n[1];return Object(r.c)("img",{alt:t.alt,src:""+i+a,srcSet:i+"."+a+" 1x, "+i+"@2x."+a+" 2x"})});function j(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  ","\n"]);return j=function(){return e},e}var O=s.a.header(j(),f.a),h=function(e){var t=e.size,n=void 0===t?22:t,i=e.children,a=e.style,o=void 0===a?{}:a;return Object(r.c)(O,{size:n,bold:!0,style:o},i)};function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.d(t,"_frontmatter",function(){return $}),n.d(t,"default",function(){return z});var $={};void 0!==$&&$&&$===Object($)&&Object.isExtensible($)&&Object.defineProperty($,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docz/Layout.mdx"}});var w={_frontmatter:$},P=a.a;function z(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,["components"]);return Object(i.b)(P,x({},w,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"layout"},"Layout"),Object(i.b)("h2",{id:"heading"},"Heading"),Object(i.b)("p",null,"default fontsize is 22,\nsupport property style, size"),Object(i.b)(o.c,{__position:0,__code:"<Heading>MDwalks-UI Heading</Heading>\n<Heading size=\"15\" style={{ color: '#0B5FFF' }}>\n  MDwalks-UI Heading\n</Heading>",__scope:{props:n,DefaultLayout:a.a,Playground:o.c,Props:o.d,Navbar:d,Footer:v,Image:m,Heading:h},mdxType:"Playground"},Object(i.b)(h,{mdxType:"Heading"},"MDwalks-UI Heading"),Object(i.b)(h,{size:"15",style:{color:"#0B5FFF"},mdxType:"Heading"},"MDwalks-UI Heading")),Object(i.b)("h2",{id:"navbar"},"Navbar"),Object(i.b)("p",null,"support property style"),Object(i.b)(o.c,{__position:1,__code:"<Navbar></Navbar>",__scope:{props:n,DefaultLayout:a.a,Playground:o.c,Props:o.d,Navbar:d,Footer:v,Image:m,Heading:h},mdxType:"Playground"},Object(i.b)(d,{mdxType:"Navbar"})),Object(i.b)("h2",{id:"footer"},"Footer"),Object(i.b)("p",null,"support property style"),Object(i.b)(o.c,{__position:2,__code:"<div style={{ height: 100, position: 'relative' }}>\n  <Footer />\n</div>",__scope:{props:n,DefaultLayout:a.a,Playground:o.c,Props:o.d,Navbar:d,Footer:v,Image:m,Heading:h},mdxType:"Playground"},Object(i.b)("div",{style:{height:100,position:"relative"}},Object(i.b)(v,{mdxType:"Footer"}))))}z&&z===Object(z)&&Object.isExtensible(z)&&Object.defineProperty(z,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docz/Layout.mdx"}}),z.isMDXComponent=!0},999:function(e,t,n){"use strict";n(245)("bold",function(e){return function(){return e(this,"b","","")}})}}]);
//# sourceMappingURL=component---src-docz-layout-mdx-e2376660dd2794995b7f.js.map