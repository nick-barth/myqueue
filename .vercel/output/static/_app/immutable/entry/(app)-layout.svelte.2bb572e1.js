import{S as le,i as ne,s as ie,k as w,q as X,a as H,l as k,m as b,r as W,h as d,c as O,n as f,K as Me,b as B,I as _,u as we,J as G,L as ht,H as _e,M as re,N as j,O as Z,P as ue,Q as xe,R as fe,y as J,z as K,A as ee,T as R,U as mt,g as I,d as V,B as te,V as Ae,e as Se,v as ae,f as se,W as gt,X as _t,Y as pt,Z as vt,_ as bt,$ as pe,a0 as Ee,a1 as wt,p as Te,w as nt,a2 as kt,o as yt,C as Mt,E as xt,F as Et,G as Dt,a3 as ze}from"../chunks/index.485fcb8d.js";import{s as Ye,c as It,C as Tt,M as Q,P as it,a as ot}from"../chunks/pause-button.7045c10b.js";import{p as ut}from"../chunks/stores.68838911.js";import{b as ft,p as He,t as Nt,C as ct,a as Le,c as ge,d as Oe,u as St}from"../chunks/index.e036d59b.js";import{d as dt,b as $t}from"../chunks/db.a3b95309.js";import{q as Pe,f as $e,r as F,t as Y,a as me,g as Re,m as At,b as Vt,c as Ve}from"../chunks/index.73dd7c3f.js";import{f as Pt}from"../chunks/index.29fcc035.js";function Fe(a,e,t){const r=a.slice();return r[3]=e[t],r}function Ue(a){let e,t,r,s,l,n=a[3].title+"",i,u;return{c(){e=w("a"),t=w("img"),l=H(),i=X(n),u=H(),this.h()},l(o){e=k(o,"A",{href:!0,class:!0});var c=b(e);t=k(c,"IMG",{class:!0,src:!0,alt:!0}),l=O(c),i=W(c,n),u=O(c),c.forEach(d),this.h()},h(){f(t,"class",r="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(a[1].params.source===a[3].source&&"shadow-[0_0px_0px_2px_#c8c8c8]")),Me(t.src,s="/images/sources/"+a[3].source+".png")||f(t,"src",s),f(t,"alt",a[3].title),f(e,"href",`/discover/${a[3].source}`),f(e,"class","list-none px-1 flex flex-col items-center flex-shrink-0 text-xs")},m(o,c){B(o,e,c),_(e,t),_(e,l),_(e,i),_(e,u)},p(o,c){c&2&&r!==(r="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(o[1].params.source===o[3].source&&"shadow-[0_0px_0px_2px_#c8c8c8]"))&&f(t,"class",r)},d(o){o&&d(e)}}}function Ht(a){let e,t,r,s,l,n,i,u,o,c,h,v,g,m,p,A,T=Ye,y=[];for(let M=0;M<T.length;M+=1)y[M]=Ue(Fe(a,T,M));return{c(){e=w("aside"),t=w("a"),r=w("div"),s=X(a[0]),l=H(),n=w("img"),o=X(`
		My Queue`),c=H(),h=w("a"),v=w("img"),p=X(`
		Add`),A=H();for(let M=0;M<y.length;M+=1)y[M].c();this.h()},l(M){e=k(M,"ASIDE",{class:!0});var P=b(e);t=k(P,"A",{href:!0,class:!0});var E=b(t);r=k(E,"DIV",{class:!0});var C=b(r);s=W(C,a[0]),C.forEach(d),l=O(E),n=k(E,"IMG",{class:!0,src:!0,alt:!0}),o=W(E,`
		My Queue`),E.forEach(d),c=O(P),h=k(P,"A",{href:!0,class:!0});var L=b(h);v=k(L,"IMG",{class:!0,src:!0,alt:!0}),p=W(L,`
		Add`),L.forEach(d),A=O(P);for(let S=0;S<y.length;S+=1)y[S].l(P);P.forEach(d),this.h()},h(){f(r,"class","bg-primary rounded-full h-5 w-5 absolute top-0.5 right-2.5 flex items-center text-white justify-center text-[11px]"),f(n,"class",i="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(a[1].url.pathname==="/"&&"shadow-[0_0px_0px_2px_#c8c8c8]")),Me(n.src,u="/images/sources/my-queue.png")||f(n,"src",u),f(n,"alt","homepage"),f(t,"href","/"),f(t,"class","list-none px-1 flex flex-col items-center flex-shrink-0 text-xs relative"),f(v,"class",g="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(a[1].url.pathname==="/add"&&"shadow-[0_0px_0px_2px_#c8c8c8]")),Me(v.src,m="/images/sources/add-url.png")||f(v,"src",m),f(v,"alt","add url"),f(h,"href","/add"),f(h,"class","list-none px-1 flex flex-col items-center flex-shrink-0 text-xs"),f(e,"class","flex w-full overflow-scroll h-full items-center max-w-2xl m-auto md:justify-center no-scrollbar px-4")},m(M,P){B(M,e,P),_(e,t),_(t,r),_(r,s),_(t,l),_(t,n),_(t,o),_(e,c),_(e,h),_(h,v),_(h,p),_(e,A);for(let E=0;E<y.length;E+=1)y[E]&&y[E].m(e,null)},p(M,[P]){if(P&1&&we(s,M[0]),P&2&&i!==(i="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(M[1].url.pathname==="/"&&"shadow-[0_0px_0px_2px_#c8c8c8]"))&&f(n,"class",i),P&2&&g!==(g="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white "+(M[1].url.pathname==="/add"&&"shadow-[0_0px_0px_2px_#c8c8c8]"))&&f(v,"class",g),P&2){T=Ye;let E;for(E=0;E<T.length;E+=1){const C=Fe(M,T,E);y[E]?y[E].p(C,P):(y[E]=Ue(C),y[E].c(),y[E].m(e,null))}for(;E<y.length;E+=1)y[E].d(1);y.length=T.length}},i:G,o:G,d(M){M&&d(e),ht(y,M)}}}function Ot(a,e,t){let r,s,l;return _e(a,ft,n=>t(2,s=n)),_e(a,ut,n=>t(1,l=n)),a.$$.update=()=>{a.$$.dirty&4&&t(0,r=s?s.length:0)},[r,l,s]}class Bt extends le{constructor(e){super(),ne(this,e,Ot,Ht,ie,{})}}function Ct(a){let e,t,r,s=[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 22 22"},a[0]],l={};for(let n=0;n<s.length;n+=1)l=re(l,s[n]);return{c(){e=j("svg"),t=j("path"),r=j("path"),this.h()},l(n){e=Z(n,"svg",{xmlns:!0,fill:!0,viewBox:!0});var i=b(e);t=Z(i,"path",{stroke:!0,"stroke-width":!0,d:!0}),b(t).forEach(d),r=Z(i,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(r).forEach(d),i.forEach(d),this.h()},h(){f(t,"stroke","#332600"),f(t,"stroke-width","1.5"),f(t,"d","M9.264 1.152a10 10 0 1 0 3.472 19.696A10 10 0 0 0 9.264 1.152Z"),f(r,"stroke","#332600"),f(r,"stroke-linecap","square"),f(r,"stroke-width","1.5"),f(r,"d","M11 12V5M11 16v-.5"),ue(e,l)},m(n,i){B(n,e,i),_(e,t),_(e,r)},p(n,[i]){ue(e,l=xe(s,[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 22 22"},i&1&&n[0]]))},i:G,o:G,d(n){n&&d(e)}}}function zt(a,e,t){return a.$$set=r=>{t(0,e=re(re({},e),fe(r)))},e=fe(e),[e]}class Yt extends le{constructor(e){super(),ne(this,e,zt,Ct,ie,{})}}function Lt(a){let e,t,r,s,l,n,i,u,o,c,h,v,g,m,p,A,T,y,M,P,E,C,L;return l=new Yt({}),{c(){e=w("div"),t=w("div"),r=w("div"),s=w("div"),J(l.$$.fragment),n=H(),i=w("div"),u=w("div"),o=w("span"),c=X("You have reached the maximum of 5 articles you can add with your free account."),h=X(" Delete articles before you can add new ones."),v=H(),g=w("div"),m=X(`Or upgrade to
				`),p=w("span"),A=X("My Queue Plus"),T=X(` and add an unlimited number of articles in your
				queue.`),y=H(),M=w("button"),P=X("Subscribe for €8,99 / month"),this.h()},l(S){e=k(S,"DIV",{class:!0});var x=b(e);t=k(x,"DIV",{class:!0});var N=b(t);r=k(N,"DIV",{});var $=b(r);s=k($,"DIV",{class:!0});var z=b(s);K(l.$$.fragment,z),z.forEach(d),$.forEach(d),n=O(N),i=k(N,"DIV",{class:!0});var U=b(i);u=k(U,"DIV",{class:!0});var q=b(u);o=k(q,"SPAN",{class:!0});var oe=b(o);c=W(oe,"You have reached the maximum of 5 articles you can add with your free account."),oe.forEach(d),h=W(q," Delete articles before you can add new ones."),q.forEach(d),v=O(U),g=k(U,"DIV",{class:!0});var ce=b(g);m=W(ce,`Or upgrade to
				`),p=k(ce,"SPAN",{class:!0});var de=b(p);A=W(de,"My Queue Plus"),de.forEach(d),T=W(ce,` and add an unlimited number of articles in your
				queue.`),ce.forEach(d),y=O(U),M=k(U,"BUTTON",{class:!0});var he=b(M);P=W(he,"Subscribe for €8,99 / month"),he.forEach(d),U.forEach(d),N.forEach(d),x.forEach(d),this.h()},h(){f(s,"class","h-8 w-8"),f(o,"class","font-bold"),f(u,"class","px-2"),f(p,"class","font-bold"),f(g,"class","px-2"),f(M,"class","bg-primary text-center rounded-primary text-warning p-4"),f(i,"class","flex flex-col gap-4"),f(t,"class","bg-warning max-w-2xl fixed left-4 right-4 md:w-full md:left-1/2 md:-translate-x-1/2 rounded-md bottom-12 p-6 md:p-12 flex gap-4"),f(e,"class","w-full fixed top-0 bottom-0 z-50 backdrop-blur-sm")},m(S,x){B(S,e,x),_(e,t),_(t,r),_(r,s),ee(l,s,null),_(t,n),_(t,i),_(i,u),_(u,o),_(o,c),_(u,h),_(i,v),_(i,g),_(g,m),_(g,p),_(p,A),_(g,T),_(i,y),_(i,M),_(M,P),E=!0,C||(L=[R(M,"click",dt.billing.createCustomerId),mt(It.call(null,t,a[0]))],C=!0)},p:G,i(S){E||(I(l.$$.fragment,S),E=!0)},o(S){V(l.$$.fragment,S),E=!1},d(S){S&&d(e),te(l),C=!1,Ae(L)}}}function Rt(a){let e;He.subscribe(r=>{e=r});function t(){e&&(He.set(null),document.body.classList.remove("overflow-hidden"))}return document.body.classList.add("overflow-hidden"),[t]}class Ft extends le{constructor(e){super(),ne(this,e,Rt,Lt,ie,{})}}function qe(a,e,t){const r=a.slice();return r[2]=e[t],r}function Qe(a){let e,t=[],r=new Map,s,l,n=a[1];const i=u=>u[2].id;for(let u=0;u<n.length;u+=1){let o=qe(a,n,u),c=i(o);r.set(c,t[u]=Ze(c,o))}return{c(){e=w("section");for(let u=0;u<t.length;u+=1)t[u].c();this.h()},l(u){e=k(u,"SECTION",{class:!0});var o=b(e);for(let c=0;c<t.length;c+=1)t[c].l(o);o.forEach(d),this.h()},h(){f(e,"class",s=`fixed ${a[0]?"top-16":"top-8"} left-1/2 -translate-x-1/2 max-w-4xl z-50 w-full px-4`)},m(u,o){B(u,e,o);for(let c=0;c<t.length;c+=1)t[c]&&t[c].m(e,null);l=!0},p(u,o){if(o&2){n=u[1],ae();for(let c=0;c<t.length;c+=1)t[c].r();t=gt(t,o,i,1,u,n,r,e,_t,Ze,null,qe);for(let c=0;c<t.length;c+=1)t[c].a();se()}(!l||o&1&&s!==(s=`fixed ${u[0]?"top-16":"top-8"} left-1/2 -translate-x-1/2 max-w-4xl z-50 w-full px-4`))&&f(e,"class",s)},i(u){if(!l){for(let o=0;o<n.length;o+=1)I(t[o]);l=!0}},o(u){for(let o=0;o<t.length;o+=1)V(t[o]);l=!1},d(u){u&&d(e);for(let o=0;o<t.length;o+=1)t[o].d()}}}function je(a){let e,t,r;return t=new Tt({}),{c(){e=w("div"),J(t.$$.fragment),this.h()},l(s){e=k(s,"DIV",{class:!0});var l=b(e);K(t.$$.fragment,l),l.forEach(d),this.h()},h(){f(e,"class","h-6 w-6 align-top mr-2")},m(s,l){B(s,e,l),ee(t,e,null),r=!0},i(s){r||(I(t.$$.fragment,s),r=!0)},o(s){V(t.$$.fragment,s),r=!1},d(s){s&&d(e),te(t)}}}function Ze(a,e){let t,r,s=e[2].content+"",l,n,i,u,o,c,h=G,v,g=e[2].type=="success"&&je();return{key:a,first:null,c(){t=w("article"),g&&g.c(),r=H(),l=X(s),n=H(),this.h()},l(m){t=k(m,"ARTICLE",{class:!0,role:!0});var p=b(t);g&&g.l(p),r=O(p),l=W(p,s),n=O(p),p.forEach(d),this.h()},h(){f(t,"class",i="bg-accent2 py-2 pr-8 pl-4 mb-2 z-50 rounded-md flex flex-row "+(e[2].type==="error"&&"bg-warning")+" "+(e[2].type==="success"&&"bg-success")),f(t,"role","alert"),this.first=t},m(m,p){B(m,t,p),g&&g.m(t,null),_(t,r),_(t,l),_(t,n),v=!0},p(m,p){e=m,e[2].type=="success"?g?p&2&&I(g,1):(g=je(),g.c(),I(g,1),g.m(t,r)):g&&(ae(),V(g,1,1,()=>{g=null}),se()),(!v||p&2)&&s!==(s=e[2].content+"")&&we(l,s),(!v||p&2&&i!==(i="bg-accent2 py-2 pr-8 pl-4 mb-2 z-50 rounded-md flex flex-row "+(e[2].type==="error"&&"bg-warning")+" "+(e[2].type==="success"&&"bg-success")))&&f(t,"class",i)},r(){c=t.getBoundingClientRect()},f(){pt(t),h(),vt(t,c)},a(){h(),h=bt(t,c,Pt,{duration:300,easing:Pe})},i(m){v||(I(g),pe(()=>{v&&(o&&o.end(1),u=Ee(t,$e,{x:100,easing:Pe,duration:150}),u.start())}),v=!0)},o(m){V(g),u&&u.invalidate(),o=wt(t,$e,{x:100,easing:Pe,duration:150}),v=!1},d(m){m&&d(t),g&&g.d(),m&&o&&o.end()}}}function Ut(a){let e,t,r=a[1]&&Qe(a);return{c(){r&&r.c(),e=Se()},l(s){r&&r.l(s),e=Se()},m(s,l){r&&r.m(s,l),B(s,e,l),t=!0},p(s,[l]){s[1]?r?(r.p(s,l),l&2&&I(r,1)):(r=Qe(s),r.c(),I(r,1),r.m(e.parentNode,e)):r&&(ae(),V(r,1,1,()=>{r=null}),se())},i(s){t||(I(r),t=!0)},o(s){V(r),t=!1},d(s){r&&r.d(s),s&&d(e)}}}function qt(a,e,t){let r;_e(a,Nt,l=>t(1,r=l));let s=!1;return ct.getPlatform()==="ios"&&(s=!0),[s,r]}class Qt extends le{constructor(e){super(),ne(this,e,qt,Ut,ie,{})}}function jt(a,e){F(2,arguments);var t=Y(a),r=me(e);return isNaN(r)?new Date(NaN):(r&&t.setDate(t.getDate()+r),t)}function Zt(a,e){F(2,arguments);var t=Y(a),r=me(e);if(isNaN(r))return new Date(NaN);if(!r)return t;var s=t.getDate(),l=new Date(t.getTime());l.setMonth(t.getMonth()+r+1,0);var n=l.getDate();return s>=n?l:(t.setFullYear(l.getFullYear(),l.getMonth(),s),t)}function Ne(a){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ne=function(t){return typeof t}:Ne=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ne(a)}function ye(a,e){if(F(2,arguments),!e||Ne(e)!=="object")return new Date(NaN);var t=e.years?me(e.years):0,r=e.months?me(e.months):0,s=e.weeks?me(e.weeks):0,l=e.days?me(e.days):0,n=e.hours?me(e.hours):0,i=e.minutes?me(e.minutes):0,u=e.seconds?me(e.seconds):0,o=Y(a),c=r||t?Zt(o,r+t*12):o,h=l||s?jt(c,l+s*7):c,v=i+n*60,g=u+v*60,m=g*1e3,p=new Date(h.getTime()+m);return p}function Ge(a){F(1,arguments);var e=Y(a);return e.setHours(0,0,0,0),e}var Gt=864e5;function Xt(a,e){F(2,arguments);var t=Ge(a),r=Ge(e),s=t.getTime()-Re(t),l=r.getTime()-Re(r);return Math.round((s-l)/Gt)}function be(a,e){F(2,arguments);var t=Y(a),r=Y(e),s=t.getTime()-r.getTime();return s<0?-1:s>0?1:s}function Wt(a,e){F(2,arguments);var t=Y(a),r=Y(e),s=t.getFullYear()-r.getFullYear(),l=t.getMonth()-r.getMonth();return s*12+l}function Jt(a,e){F(2,arguments);var t=Y(a),r=Y(e);return t.getFullYear()-r.getFullYear()}function Xe(a,e){var t=a.getFullYear()-e.getFullYear()||a.getMonth()-e.getMonth()||a.getDate()-e.getDate()||a.getHours()-e.getHours()||a.getMinutes()-e.getMinutes()||a.getSeconds()-e.getSeconds()||a.getMilliseconds()-e.getMilliseconds();return t<0?-1:t>0?1:t}function Kt(a,e){F(2,arguments);var t=Y(a),r=Y(e),s=Xe(t,r),l=Math.abs(Xt(t,r));t.setDate(t.getDate()-s*l);var n=+(Xe(t,r)===-s),i=s*(l-n);return i===0?0:i}function Be(a,e){return F(2,arguments),Y(a).getTime()-Y(e).getTime()}var We={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},er="trunc";function Ce(a){return a?We[a]:We[er]}function tr(a,e,t){F(2,arguments);var r=Be(a,e)/At;return Ce(t==null?void 0:t.roundingMethod)(r)}function rr(a,e,t){F(2,arguments);var r=Be(a,e)/Vt;return Ce(t==null?void 0:t.roundingMethod)(r)}function ar(a){F(1,arguments);var e=Y(a);return e.setHours(23,59,59,999),e}function sr(a){F(1,arguments);var e=Y(a),t=e.getMonth();return e.setFullYear(e.getFullYear(),t+1,0),e.setHours(23,59,59,999),e}function lr(a){F(1,arguments);var e=Y(a);return ar(e).getTime()===sr(e).getTime()}function nr(a,e){F(2,arguments);var t=Y(a),r=Y(e),s=be(t,r),l=Math.abs(Wt(t,r)),n;if(l<1)n=0;else{t.getMonth()===1&&t.getDate()>27&&t.setDate(30),t.setMonth(t.getMonth()-s*l);var i=be(t,r)===-s;lr(Y(a))&&l===1&&be(a,r)===1&&(i=!1),n=s*(l-Number(i))}return n===0?0:n}function ir(a,e,t){F(2,arguments);var r=Be(a,e)/1e3;return Ce(t==null?void 0:t.roundingMethod)(r)}function or(a,e){F(2,arguments);var t=Y(a),r=Y(e),s=be(t,r),l=Math.abs(Jt(t,r));t.setFullYear(1584),r.setFullYear(1584);var n=be(t,r)===-s,i=s*(l-Number(n));return i===0?0:i}function ur(a){F(1,arguments);var e=Y(a.start),t=Y(a.end);if(isNaN(e.getTime()))throw new RangeError("Start Date is invalid");if(isNaN(t.getTime()))throw new RangeError("End Date is invalid");var r={};r.years=Math.abs(or(t,e));var s=be(t,e),l=ye(e,{years:s*r.years});r.months=Math.abs(nr(t,l));var n=ye(l,{months:s*r.months});r.days=Math.abs(Kt(t,n));var i=ye(n,{days:s*r.days});r.hours=Math.abs(tr(t,i));var u=ye(i,{hours:s*r.hours});r.minutes=Math.abs(rr(t,u));var o=ye(u,{minutes:s*r.minutes});return r.seconds=Math.abs(ir(t,o)),r}const fr=a=>String(a).padStart(2,"0"),Je=a=>{if(!a)return"0:00";const e=ur({start:0,end:a*1e3});return`${e.minutes}:${fr(e.seconds)}`};function cr(a){let e,t,r,s,l,n,i,u,o,c,h,v,g,m,p,A;return{c(){e=w("div"),t=w("div"),r=w("div"),s=H(),l=w("div"),n=H(),i=w("div"),u=H(),o=w("div"),c=w("div"),h=X(a[2]),v=H(),g=w("div"),m=X(a[1]),this.h()},l(T){e=k(T,"DIV",{class:!0});var y=b(e);t=k(y,"DIV",{class:!0});var M=b(t);r=k(M,"DIV",{class:!0}),b(r).forEach(d),s=O(M),l=k(M,"DIV",{style:!0,class:!0}),b(l).forEach(d),n=O(M),i=k(M,"DIV",{style:!0,class:!0}),b(i).forEach(d),M.forEach(d),u=O(y),o=k(y,"DIV",{class:!0});var P=b(o);c=k(P,"DIV",{});var E=b(c);h=W(E,a[2]),E.forEach(d),v=O(P),g=k(P,"DIV",{});var C=b(g);m=W(C,a[1]),C.forEach(d),P.forEach(d),y.forEach(d),this.h()},h(){f(r,"class","bg-gray-400 w-full h-1"),Te(l,"width",a[3]),f(l,"class","absolute h-1 left-0 rounded-full bg-primary transition-all ease-out duration-75"),Te(i,"left",a[3]),f(i,"class","absolute h-3 w-3 top-2 rounded-full bg-primary -translate-y-1/3 transition-all ease-out duration-75"),f(t,"class","w-full relative py-2 flex cursor-grab"),f(o,"class","w-full justify-between flex text-sm"),f(e,"class","w-full")},m(T,y){B(T,e,y),_(e,t),_(t,r),_(t,s),_(t,l),_(t,n),_(t,i),a[10](t),_(e,u),_(e,o),_(o,c),_(c,h),_(o,v),_(o,g),_(g,m),p||(A=[R(t,"click",a[4]),R(t,"mousemove",a[5]),R(t,"mousedown",a[6])],p=!0)},p(T,[y]){y&8&&Te(l,"width",T[3]),y&8&&Te(i,"left",T[3]),y&4&&we(h,T[2]),y&2&&we(m,T[1])},i:G,o:G,d(T){T&&d(e),a[10](null),p=!1,Ae(A)}}}function dr(a,e,t){let r,s,l,{duration:n}=e,{currentTime:i}=e,{setNewTime:u=()=>{}}=e,o;function c(m){const p=m.clientX,{left:A,right:T}=o.getBoundingClientRect(),y=n*(p-A)/(T-A);u(y)}function h(m){if(!n||m.type!=="touchmove"&&!(m.buttons&1))return;const p=m.clientX,{left:A,right:T}=o.getBoundingClientRect(),y=n*(p-A)/(T-A);u(y)}function v(m){}function g(m){nt[m?"unshift":"push"](()=>{o=m,t(0,o)})}return a.$$set=m=>{"duration"in m&&t(7,n=m.duration),"currentTime"in m&&t(8,i=m.currentTime),"setNewTime"in m&&t(9,u=m.setNewTime)},a.$$.update=()=>{a.$$.dirty&384&&t(3,r=`${100*i/n}%`),a.$$.dirty&256&&t(2,s=Je(i)),a.$$.dirty&128&&t(1,l=Je(n))},[o,l,s,r,c,h,v,n,i,u,g]}class hr extends le{constructor(e){super(),ne(this,e,dr,cr,ie,{duration:7,currentTime:8,setNewTime:9})}}function mr(a){let e,t,r=[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 24 24"},a[0]],s={};for(let l=0;l<r.length;l+=1)s=re(s,r[l]);return{c(){e=j("svg"),t=j("path"),this.h()},l(l){e=Z(l,"svg",{xmlns:!0,fill:!0,viewBox:!0});var n=b(e);t=Z(n,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(t).forEach(d),n.forEach(d),this.h()},h(){f(t,"stroke","#181818"),f(t,"stroke-linecap","round"),f(t,"stroke-width","1.5"),f(t,"d","m6 12 6-6 6 6M6 18l6-6 6 6"),ue(e,s)},m(l,n){B(l,e,n),_(e,t)},p(l,[n]){ue(e,s=xe(r,[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 24 24"},n&1&&l[0]]))},i:G,o:G,d(l){l&&d(e)}}}function gr(a,e,t){return a.$$set=r=>{t(0,e=re(re({},e),fe(r)))},e=fe(e),[e]}class _r extends le{constructor(e){super(),ne(this,e,gr,mr,ie,{})}}function pr(a){let e,t,r,s,l=[{xmlns:"http://www.w3.org/2000/svg"},{width:"25"},{height:"28"},{fill:"none"},a[0]],n={};for(let i=0;i<l.length;i+=1)n=re(n,l[i]);return{c(){e=j("svg"),t=j("path"),r=j("path"),s=j("path"),this.h()},l(i){e=Z(i,"svg",{xmlns:!0,width:!0,height:!0,fill:!0});var u=b(e);t=Z(u,"path",{fill:!0,d:!0}),b(t).forEach(d),r=Z(u,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(r).forEach(d),s=Z(u,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(s).forEach(d),u.forEach(d),this.h()},h(){f(t,"fill","#181818"),f(t,"d","M1.106 21v-.952H3.15v-6.58H1.526v-.742c.41-.075.765-.163 1.064-.266.308-.112.583-.243.826-.392h.882v7.98h1.848V21h-5.04Zm9.129.168c-.71 0-1.297-.126-1.764-.378a4.967 4.967 0 0 1-1.162-.84l.56-.756c.27.261.583.5.938.714.355.205.793.308 1.316.308.55 0 1.013-.182 1.386-.546.383-.373.574-.873.574-1.498 0-.616-.173-1.097-.518-1.442-.345-.345-.807-.518-1.386-.518-.308 0-.574.047-.798.14a5.002 5.002 0 0 0-.728.406l-.616-.392.294-4.298h4.466v.994H9.339l-.238 2.646c.215-.112.43-.2.644-.266a2.5 2.5 0 0 1 .728-.098c.513 0 .975.103 1.386.308.42.196.756.5 1.008.91.252.41.378.938.378 1.582 0 .644-.145 1.195-.434 1.652a2.77 2.77 0 0 1-1.106 1.022 3.19 3.19 0 0 1-1.47.35Z"),f(r,"stroke","#181818"),f(r,"stroke-linecap","round"),f(r,"stroke-width","1.5"),f(r,"d","M8.573 6.332H4V1.759"),f(s,"stroke","#181818"),f(s,"stroke-linecap","round"),f(s,"stroke-width","1.5"),f(s,"d","M4.186 6.17A10.664 10.664 0 0 1 13.332 1c5.892 0 10.67 4.777 10.67 10.67 0 3.95-2.146 7.397-5.335 9.242"),ue(e,n)},m(i,u){B(i,e,u),_(e,t),_(e,r),_(e,s)},p(i,[u]){ue(e,n=xe(l,[{xmlns:"http://www.w3.org/2000/svg"},{width:"25"},{height:"28"},{fill:"none"},u&1&&i[0]]))},i:G,o:G,d(i){i&&d(e)}}}function vr(a,e,t){return a.$$set=r=>{t(0,e=re(re({},e),fe(r)))},e=fe(e),[e]}class br extends le{constructor(e){super(),ne(this,e,vr,pr,ie,{})}}function wr(a){let e,t,r,s,l=[{xmlns:"http://www.w3.org/2000/svg"},{width:"25"},{height:"28"},{fill:"none"},a[0]],n={};for(let i=0;i<l.length;i+=1)n=re(n,l[i]);return{c(){e=j("svg"),t=j("path"),r=j("path"),s=j("path"),this.h()},l(i){e=Z(i,"svg",{xmlns:!0,width:!0,height:!0,fill:!0});var u=b(e);t=Z(u,"path",{fill:!0,d:!0}),b(t).forEach(d),r=Z(u,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(r).forEach(d),s=Z(u,"path",{stroke:!0,"stroke-linecap":!0,"stroke-width":!0,d:!0}),b(s).forEach(d),u.forEach(d),this.h()},h(){f(t,"fill","#181818"),f(t,"d","M11.11 21v-.952h2.044v-6.58H11.53v-.742c.41-.075.765-.163 1.064-.266.308-.112.583-.243.826-.392h.882v7.98h1.848V21h-5.04Zm9.129.168c-.71 0-1.297-.126-1.764-.378a4.967 4.967 0 0 1-1.162-.84l.56-.756c.27.261.583.5.938.714.355.205.793.308 1.316.308.55 0 1.013-.182 1.386-.546.383-.373.574-.873.574-1.498 0-.616-.173-1.097-.518-1.442-.345-.345-.807-.518-1.386-.518-.308 0-.574.047-.798.14a5.001 5.001 0 0 0-.728.406l-.616-.392.294-4.298H22.8v.994h-3.458l-.238 2.646c.215-.112.43-.2.644-.266a2.5 2.5 0 0 1 .728-.098c.513 0 .975.103 1.386.308.42.196.756.5 1.008.91.252.41.378.938.378 1.582 0 .644-.145 1.195-.434 1.652a2.77 2.77 0 0 1-1.106 1.022 3.19 3.19 0 0 1-1.47.35Z"),f(r,"stroke","#181818"),f(r,"stroke-linecap","round"),f(r,"stroke-width","1.5"),f(r,"d","M16.439 6.332h4.571V1.761"),f(s,"stroke","#181818"),f(s,"stroke-linecap","round"),f(s,"stroke-width","1.5"),f(s,"d","M20.82 6.17A10.66 10.66 0 0 0 11.679 1C5.788 1 1.012 5.776 1.012 11.666c0 3.948 2.145 7.396 5.333 9.24"),ue(e,n)},m(i,u){B(i,e,u),_(e,t),_(e,r),_(e,s)},p(i,[u]){ue(e,n=xe(l,[{xmlns:"http://www.w3.org/2000/svg"},{width:"25"},{height:"28"},{fill:"none"},u&1&&i[0]]))},i:G,o:G,d(i){i&&d(e)}}}function kr(a,e,t){return a.$$set=r=>{t(0,e=re(re({},e),fe(r)))},e=fe(e),[e]}class yr extends le{constructor(e){super(),ne(this,e,kr,wr,ie,{})}}function Mr(a){let e,t,r,s=[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 18 17"},a[0]],l={};for(let n=0;n<s.length;n+=1)l=re(l,s[n]);return{c(){e=j("svg"),t=j("path"),r=j("path"),this.h()},l(n){e=Z(n,"svg",{xmlns:!0,fill:!0,viewBox:!0});var i=b(e);t=Z(i,"path",{stroke:!0,"stroke-width":!0,d:!0}),b(t).forEach(d),r=Z(i,"path",{stroke:!0,"stroke-width":!0,d:!0}),b(r).forEach(d),i.forEach(d),this.h()},h(){f(t,"stroke","currentColor"),f(t,"stroke-width","1.5"),f(t,"d","m10.845 11.463-2.462 2.461 2.462 2.462"),f(r,"stroke","currentColor"),f(r,"stroke-width","1.5"),f(r,"d","M4.692 13.923S1 13.923 1 10.231V4.692S1 1 4.692 1h8.616S17 1 17 4.692v5.539s0 3.692-3.692 3.692H8.385"),ue(e,l)},m(n,i){B(n,e,i),_(e,t),_(e,r)},p(n,[i]){ue(e,l=xe(s,[{xmlns:"http://www.w3.org/2000/svg"},{fill:"none"},{viewBox:"0 0 18 17"},i&1&&n[0]]))},i:G,o:G,d(n){n&&d(e)}}}function xr(a,e,t){return a.$$set=r=>{t(0,e=re(re({},e),fe(r)))},e=fe(e),[e]}class Er extends le{constructor(e){super(),ne(this,e,xr,Mr,ie,{})}}function Ke(a){let e,t,r,s,l,n,i;const u=[Ir,Dr],o=[];function c(h,v){return h[11]?0:1}return t=c(a),r=o[t]=u[t](a),{c(){e=w("button"),r.c(),this.h()},l(h){e=k(h,"BUTTON",{title:!0,class:!0});var v=b(e);r.l(v),v.forEach(d),this.h()},h(){e.disabled=s=!a[0].audio,f(e,"title","Toggles play"),f(e,"class","bg-primary self-end flex-shrink-0 rounded-full h-10 w-10 flex items-center justify-center text-accent disabled:bg-backgroundDark")},m(h,v){B(h,e,v),o[t].m(e,null),l=!0,n||(i=R(e,"click",a[1]),n=!0)},p(h,v){let g=t;t=c(h),t!==g&&(ae(),V(o[g],1,1,()=>{o[g]=null}),se(),r=o[t],r||(r=o[t]=u[t](h),r.c()),I(r,1),r.m(e,null)),(!l||v[0]&1&&s!==(s=!h[0].audio))&&(e.disabled=s)},i(h){l||(I(r),l=!0)},o(h){V(r),l=!1},d(h){h&&d(e),o[t].d(),n=!1,i()}}}function Dr(a){let e,t,r,s;return t=new it({}),{c(){e=w("div"),J(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=b(e);K(t.$$.fragment,n),n.forEach(d),this.h()},h(){f(e,"class","w-4 h-4")},m(l,n){B(l,e,n),ee(t,e,null),s=!0},i(l){s||(I(t.$$.fragment,l),r||pe(()=>{r=Ee(e,Ve,{duration:100}),r.start()}),s=!0)},o(l){V(t.$$.fragment,l),s=!1},d(l){l&&d(e),te(t)}}}function Ir(a){let e,t,r,s;return t=new ot({}),{c(){e=w("div"),J(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=b(e);K(t.$$.fragment,n),n.forEach(d),this.h()},h(){f(e,"class","w-4 h-4")},m(l,n){B(l,e,n),ee(t,e,null),s=!0},i(l){s||(I(t.$$.fragment,l),r||pe(()=>{r=Ee(e,Ve,{duration:100}),r.start()}),s=!0)},o(l){V(t.$$.fragment,l),s=!1},d(l){l&&d(e),te(t)}}}function et(a){let e,t,r,s,l,n,i,u,o,c,h,v,g,m,p,A,T,y,M,P,E;n=new br({});const C=[Nr,Tr],L=[];function S(x,N){return x[11]?0:1}return o=S(a),c=L[o]=C[o](a),m=new yr({}),T=new Er({}),{c(){e=w("div"),t=w("button"),r=X(a[6]),s=H(),l=w("button"),J(n.$$.fragment),i=H(),u=w("button"),c.c(),v=H(),g=w("button"),J(m.$$.fragment),p=H(),A=w("button"),J(T.$$.fragment),this.h()},l(x){e=k(x,"DIV",{class:!0});var N=b(e);t=k(N,"BUTTON",{class:!0});var $=b(t);r=W($,a[6]),$.forEach(d),s=O(N),l=k(N,"BUTTON",{title:!0});var z=b(l);K(n.$$.fragment,z),z.forEach(d),i=O(N),u=k(N,"BUTTON",{title:!0,class:!0});var U=b(u);c.l(U),U.forEach(d),v=O(N),g=k(N,"BUTTON",{title:!0});var q=b(g);K(m.$$.fragment,q),q.forEach(d),p=O(N),A=k(N,"BUTTON",{class:!0});var oe=b(A);K(T.$$.fragment,oe),oe.forEach(d),N.forEach(d),this.h()},h(){f(t,"class","text-sm w-4"),f(l,"title","Skips backwards 15 seconds"),u.disabled=h=!a[0].audio,f(u,"title","Toggles play"),f(u,"class","bg-primary self-end flex-shrink-0 rounded-full h-14 w-14 flex items-center justify-center text-accent disabled:bg-backgroundDark"),f(g,"title","Skips forwards 15 seconds"),f(A,"class",y="h-4 w-4 "+(a[7]?"text-primary":"text-gray-500")),f(e,"class","w-full mb-10 flex items-center justify-between")},m(x,N){B(x,e,N),_(e,t),_(t,r),_(e,s),_(e,l),ee(n,l,null),_(e,i),_(e,u),L[o].m(u,null),_(e,v),_(e,g),ee(m,g,null),_(e,p),_(e,A),ee(T,A,null),M=!0,P||(E=[R(t,"click",a[16]),R(l,"click",a[13]),R(u,"click",a[1]),R(g,"click",a[14]),R(A,"click",a[20])],P=!0)},p(x,N){(!M||N[0]&64)&&we(r,x[6]);let $=o;o=S(x),o!==$&&(ae(),V(L[$],1,1,()=>{L[$]=null}),se(),c=L[o],c||(c=L[o]=C[o](x),c.c()),I(c,1),c.m(u,null)),(!M||N[0]&1&&h!==(h=!x[0].audio))&&(u.disabled=h),(!M||N[0]&128&&y!==(y="h-4 w-4 "+(x[7]?"text-primary":"text-gray-500")))&&f(A,"class",y)},i(x){M||(I(n.$$.fragment,x),I(c),I(m.$$.fragment,x),I(T.$$.fragment,x),M=!0)},o(x){V(n.$$.fragment,x),V(c),V(m.$$.fragment,x),V(T.$$.fragment,x),M=!1},d(x){x&&d(e),te(n),L[o].d(),te(m),te(T),P=!1,Ae(E)}}}function Tr(a){let e,t,r,s;return t=new it({}),{c(){e=w("div"),J(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=b(e);K(t.$$.fragment,n),n.forEach(d),this.h()},h(){f(e,"class","w-4 h-4")},m(l,n){B(l,e,n),ee(t,e,null),s=!0},i(l){s||(I(t.$$.fragment,l),r||pe(()=>{r=Ee(e,Ve,{duration:100}),r.start()}),s=!0)},o(l){V(t.$$.fragment,l),s=!1},d(l){l&&d(e),te(t)}}}function Nr(a){let e,t,r,s;return t=new ot({}),{c(){e=w("div"),J(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=b(e);K(t.$$.fragment,n),n.forEach(d),this.h()},h(){f(e,"class","w-4 h-4")},m(l,n){B(l,e,n),ee(t,e,null),s=!0},i(l){s||(I(t.$$.fragment,l),r||pe(()=>{r=Ee(e,Ve,{duration:100}),r.start()}),s=!0)},o(l){V(t.$$.fragment,l),s=!1},d(l){l&&d(e),te(t)}}}function tt(a){let e,t,r=!0,s=!1,l,n,i;function u(){cancelAnimationFrame(l),e.paused||(l=kt(u),s=!0),a[25].call(e)}return{c(){e=w("audio"),this.h()},l(o){e=k(o,"AUDIO",{class:!0,src:!0}),b(e).forEach(d),this.h()},h(){e.autoplay=!1,f(e,"class","hidden"),Me(e.src,t=a[9])||f(e,"src",t),a[3]===void 0&&pe(()=>a[22].call(e))},m(o,c){B(o,e,c),isNaN(a[4])||(e.volume=a[4]),isNaN(a[5])||(e.playbackRate=a[5]),a[26](e),n||(i=[R(e,"volumechange",a[21]),R(e,"durationchange",a[22]),R(e,"play",a[23]),R(e,"pause",a[23]),R(e,"ratechange",a[24]),R(e,"timeupdate",u),R(e,"ended",a[12]),R(e,"timeupdate",a[17]),R(e,"load",a[18])],n=!0)},p(o,c){c[0]&512&&!Me(e.src,t=o[9])&&f(e,"src",t),c[0]&16&&!isNaN(o[4])&&(e.volume=o[4]),c[0]&2048&&r!==(r=o[11])&&e[r?"pause":"play"](),c[0]&32&&!isNaN(o[5])&&(e.playbackRate=o[5]),!s&&c[0]&4&&!isNaN(o[2])&&(e.currentTime=o[2]),s=!1},d(o){o&&d(e),a[26](null),n=!1,Ae(i)}}}function Sr(a){let e,t,r,s,l,n,i,u,o,c,h,v,g,m=a[0].title+"",p,A,T,y,M,P,E,C,L;l=new _r({}),o=new hr({props:{currentTime:a[2],duration:a[3],setNewTime:a[15]}});let S=!a[8]&&Ke(a),x=a[8]&&et(a),N=a[0].audio&&tt(a);return{c(){e=w("div"),t=w("aside"),r=w("div"),s=w("button"),J(l.$$.fragment),i=H(),u=w("div"),J(o.$$.fragment),c=H(),h=w("div"),v=w("div"),g=w("h2"),p=X(m),T=H(),S&&S.c(),y=H(),x&&x.c(),M=H(),N&&N.c(),this.h()},l($){e=k($,"DIV",{class:!0});var z=b(e);t=k(z,"ASIDE",{class:!0});var U=b(t);r=k(U,"DIV",{class:!0});var q=b(r);s=k(q,"BUTTON",{class:!0});var oe=b(s);K(l.$$.fragment,oe),oe.forEach(d),i=O(q),u=k(q,"DIV",{class:!0});var ce=b(u);K(o.$$.fragment,ce),ce.forEach(d),c=O(q),h=k(q,"DIV",{class:!0});var de=b(h);v=k(de,"DIV",{class:!0});var he=b(v);g=k(he,"H2",{class:!0});var De=b(g);p=W(De,m),De.forEach(d),T=O(he),S&&S.l(he),he.forEach(d),y=O(de),x&&x.l(de),de.forEach(d),M=O(q),N&&N.l(q),q.forEach(d),U.forEach(d),z.forEach(d),this.h()},h(){f(s,"class",n=`h-6 w-6 absolute left-1/2 -translate-x-1/2 top-2 z-50 ${a[8]&&"rotate-180"}`),f(u,"class","absolute -top-2 w-full"),f(g,"class",A=`flex text-lg leading-6 font-semibold h-12 md:items-center line-clamp-2 w-full overflow-hidden font-frank ${a[8]&&"justify-center mt-4"}`),f(v,"class","flex mt-8 justify-between items-center gap-2"),f(h,"class","flex flex-col justify-between h-full"),f(r,"class","max-w-2xl relative m-auto w-full h-full"),f(t,"class","flex px-6 h-full"),f(e,"class",P=`left-0 fixed ${a[8]?"h-56":"h-28"} transition-all bottom-0 w-full bg-accent`)},m($,z){B($,e,z),_(e,t),_(t,r),_(r,s),ee(l,s,null),_(r,i),_(r,u),ee(o,u,null),_(r,c),_(r,h),_(h,v),_(v,g),_(g,p),_(v,T),S&&S.m(v,null),_(h,y),x&&x.m(h,null),_(r,M),N&&N.m(r,null),E=!0,C||(L=R(s,"click",a[19]),C=!0)},p($,z){(!E||z[0]&256&&n!==(n=`h-6 w-6 absolute left-1/2 -translate-x-1/2 top-2 z-50 ${$[8]&&"rotate-180"}`))&&f(s,"class",n);const U={};z[0]&4&&(U.currentTime=$[2]),z[0]&8&&(U.duration=$[3]),o.$set(U),(!E||z[0]&1)&&m!==(m=$[0].title+"")&&we(p,m),(!E||z[0]&256&&A!==(A=`flex text-lg leading-6 font-semibold h-12 md:items-center line-clamp-2 w-full overflow-hidden font-frank ${$[8]&&"justify-center mt-4"}`))&&f(g,"class",A),$[8]?S&&(ae(),V(S,1,1,()=>{S=null}),se()):S?(S.p($,z),z[0]&256&&I(S,1)):(S=Ke($),S.c(),I(S,1),S.m(v,null)),$[8]?x?(x.p($,z),z[0]&256&&I(x,1)):(x=et($),x.c(),I(x,1),x.m(h,null)):x&&(ae(),V(x,1,1,()=>{x=null}),se()),$[0].audio?N?N.p($,z):(N=tt($),N.c(),N.m(r,null)):N&&(N.d(1),N=null),(!E||z[0]&256&&P!==(P=`left-0 fixed ${$[8]?"h-56":"h-28"} transition-all bottom-0 w-full bg-accent`))&&f(e,"class",P)},i($){E||(I(l.$$.fragment,$),I(o.$$.fragment,$),I(S),I(x),E=!0)},o($){V(l.$$.fragment,$),V(o.$$.fragment,$),V(S),V(x),E=!1},d($){$&&d(e),te(l),te(o),S&&S.d(),x&&x.d(),N&&N.d(),C=!1,L()}}}function $r(a,e,t){let r,s,l;_e(a,ft,D=>t(27,r=D)),_e(a,Le,D=>t(10,s=D)),_e(a,ge,D=>t(11,l=D));let{bookmark:n}=e,i,u=0,o,c=1,h="1x",v=!0;function g(){l?(s==null||s.play(),ge.update(D=>!1),Q.setPlaybackState({playbackState:"playing"})):(s==null||s.pause(),ge.update(D=>!0),Q.setPlaybackState({playbackState:"paused"}))}const m=()=>({title:n.title||"My Queue",artist:n.domain||"My Queue",artwork:[{src:n.image||"",sizes:"96x96",type:"image/png"},{src:n.image||"",sizes:"128x128",type:"image/png"},{src:n.image||"",sizes:"192x192",type:"image/png"},{src:n.image||"",sizes:"256x256",type:"image/png"},{src:n.image||"",sizes:"384x384",type:"image/png"},{src:n.image||"",sizes:"512x512",type:"image/png"}]}),p=()=>{Q.setPositionState({position:i,duration:u,playbackRate:c})},A=()=>{if(r&&(r==null?void 0:r.length)>1){const D=r==null?void 0:r.findIndex(Ie=>Ie.id===n.id),ke=[...r].slice(D+1).find(Ie=>Ie.audio);ke&&v&&(Oe.update(Ie=>ke),g())}},T=()=>{i-15<0?t(2,i=0):t(2,i=i-15),p()},y=()=>{i+15>u?t(2,i=0):t(2,i=i+15),p()},M=D=>{t(2,i=D),p()},P=()=>{c===1?(t(5,c=1.25),t(6,h="1.25x")):c===1.25?(t(5,c=1.5),t(6,h="1.5x")):c===1.5&&(t(5,c=1),t(6,h="1x")),p()};if("mediaSession"in navigator){const D=new MediaMetadata(m());navigator.mediaSession.metadata=D,Q.setMetadata(m())}let E=!1;ct.getPlatform()==="android"?(Q.setActionHandler({action:"play"},()=>{ge.update(D=>!1),Q.setPlaybackState({playbackState:"playing"}),p()}),Q.setActionHandler({action:"pause"},()=>{ge.update(D=>!0),Q.setPlaybackState({playbackState:"paused"}),p()}),Q.setActionHandler({action:"seekto"},D=>{D!=null&&D.seekTime&&t(2,i=D==null?void 0:D.seekTime),p()}),Q.setActionHandler({action:"seekforward"},D=>{y(),p()}),Q.setActionHandler({action:"seekbackward"},D=>{T(),p()}),Q.setActionHandler({action:"nexttrack"},D=>{L(),p()}),Q.setActionHandler({action:"previoustrack"},D=>{S(),p()})):(navigator.mediaSession.setActionHandler("play",function(){ge.update(D=>!1),Q.setPlaybackState({playbackState:"playing"}),p()}),navigator.mediaSession.setActionHandler("pause",function(){ge.update(D=>!0),Q.setPlaybackState({playbackState:"paused"}),p()}),navigator.mediaSession.setActionHandler("previoustrack",function(){L(),p()}),navigator.mediaSession.setActionHandler("nexttrack",function(){L(),p()}));const C=D=>{const ve=r[D];Oe.update(ke=>ve),t(2,i=0),p(),setTimeout(()=>{s==null||s.play()},30)},L=()=>{const D=r==null?void 0:r.findIndex(ve=>n.id===ve.id);if(D===r.length-1){console.log("it does"),C(0);return}D>=0&&(console.log(r),r&&r.length>0&&C(D+1))},S=()=>{const D=r==null?void 0:r.findIndex(ke=>n.id===ke.id);if(D===0){C(r.length-1);return}const ve=(r==null?void 0:r.length)||0;D&&D<ve&&r&&r.length>0&&C(D-1)},x=D=>{p()};let N="";const $=()=>{t(2,i=0),p()},z=()=>t(8,E=!E),U=()=>t(7,v=!v);function q(){o=this.volume,t(4,o)}function oe(){u=this.duration,t(3,u)}function ce(){l=this.paused,ge.set(l)}function de(){c=this.playbackRate,t(5,c)}function he(){i=this.currentTime,t(2,i)}function De(D){nt[D?"unshift":"push"](()=>{s=D,Le.set(s)})}return a.$$set=D=>{"bookmark"in D&&t(0,n=D.bookmark)},a.$$.update=()=>{a.$$.dirty[0]&1&&(Q.setMetadata({title:n.title||"My Queue",artist:n.domain||"My Queue",artwork:[{src:n.image||"",sizes:"96x96",type:"image/png"},{src:n.image||"",sizes:"128x128",type:"image/png"},{src:n.image||"",sizes:"192x192",type:"image/png"},{src:n.image||"",sizes:"256x256",type:"image/png"},{src:n.image||"",sizes:"384x384",type:"image/png"},{src:n.image||"",sizes:"512x512",type:"image/png"}]}),p()),a.$$.dirty[0]&1&&n!=null&&n.audio&&t(9,N=n!=null&&n.audio.includes("/public_audio/")?n.audio:`${$t}${n.audio}`)},[n,g,i,u,o,c,h,v,E,N,s,l,A,T,y,M,P,x,$,z,U,q,oe,ce,de,he,De]}class Ar extends le{constructor(e){super(),ne(this,e,$r,Sr,ie,{bookmark:0,handleTogglePlay:1},null,[-1,-1])}get handleTogglePlay(){return this.$$.ctx[1]}}function rt(a){let e,t,r,s,l,n,i,u,o,c,h=a[2]&&at();t=new Qt({});let v=!a[0]&&st(a),g=a[4]&&lt(a);return{c(){h&&h.c(),e=H(),J(t.$$.fragment),r=H(),s=w("div"),l=w("div"),n=w("main"),v&&v.c(),i=H(),u=w("aside"),g&&g.c(),this.h()},l(m){h&&h.l(m),e=O(m),K(t.$$.fragment,m),r=O(m),s=k(m,"DIV",{class:!0});var p=b(s);l=k(p,"DIV",{class:!0});var A=b(l);n=k(A,"MAIN",{class:!0});var T=b(n);v&&v.l(T),T.forEach(d),i=O(A),u=k(A,"ASIDE",{class:!0});var y=b(u);g&&g.l(y),y.forEach(d),A.forEach(d),p.forEach(d),this.h()},h(){f(n,"class","max-w-2xl m-auto w-full"),f(u,"class","relative flex items-end p-4 col-span-2"),f(l,"class",""),f(s,"class",o=`pb-80 ${a[3]?"bg-white":"bg-background"}`)},m(m,p){h&&h.m(m,p),B(m,e,p),ee(t,m,p),B(m,r,p),B(m,s,p),_(s,l),_(l,n),v&&v.m(n,null),_(l,i),_(l,u),g&&g.m(u,null),c=!0},p(m,p){m[2]?h?p&4&&I(h,1):(h=at(),h.c(),I(h,1),h.m(e.parentNode,e)):h&&(ae(),V(h,1,1,()=>{h=null}),se()),m[0]?v&&(ae(),V(v,1,1,()=>{v=null}),se()):v?(v.p(m,p),p&1&&I(v,1)):(v=st(m),v.c(),I(v,1),v.m(n,null)),m[4]?g?(g.p(m,p),p&16&&I(g,1)):(g=lt(m),g.c(),I(g,1),g.m(u,null)):g&&(ae(),V(g,1,1,()=>{g=null}),se()),(!c||p&8&&o!==(o=`pb-80 ${m[3]?"bg-white":"bg-background"}`))&&f(s,"class",o)},i(m){c||(I(h),I(t.$$.fragment,m),I(v),I(g),c=!0)},o(m){V(h),V(t.$$.fragment,m),V(v),V(g),c=!1},d(m){h&&h.d(m),m&&d(e),te(t,m),m&&d(r),m&&d(s),v&&v.d(),g&&g.d()}}}function at(a){let e,t;return e=new Ft({}),{c(){J(e.$$.fragment)},l(r){K(e.$$.fragment,r)},m(r,s){ee(e,r,s),t=!0},i(r){t||(I(e.$$.fragment,r),t=!0)},o(r){V(e.$$.fragment,r),t=!1},d(r){te(e,r)}}}function st(a){let e;const t=a[7].default,r=Mt(t,a,a[6],null);return{c(){r&&r.c()},l(s){r&&r.l(s)},m(s,l){r&&r.m(s,l),e=!0},p(s,l){r&&r.p&&(!e||l&64)&&xt(r,t,s,s[6],e?Dt(t,s[6],l,null):Et(s[6]),null)},i(s){e||(I(r,s),e=!0)},o(s){V(r,s),e=!1},d(s){r&&r.d(s)}}}function lt(a){let e,t,r,s,l,n;return t=new Bt({}),l=new Ar({props:{bookmark:a[4]}}),{c(){e=w("div"),J(t.$$.fragment),s=H(),J(l.$$.fragment),this.h()},l(i){e=k(i,"DIV",{class:!0});var u=b(e);K(t.$$.fragment,u),u.forEach(d),s=O(i),K(l.$$.fragment,i),this.h()},h(){f(e,"class","left-0 fixed h-28 bottom-28 w-full bg-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]")},m(i,u){B(i,e,u),ee(t,e,null),B(i,s,u),ee(l,i,u),n=!0},p(i,u){const o={};u&16&&(o.bookmark=i[4]),l.$set(o)},i(i){n||(I(t.$$.fragment,i),pe(()=>{n&&(r||(r=ze(e,$e,{y:200,duration:300},!0)),r.run(1))}),I(l.$$.fragment,i),n=!0)},o(i){V(t.$$.fragment,i),r||(r=ze(e,$e,{y:200,duration:300},!1)),r.run(0),V(l.$$.fragment,i),n=!1},d(i){i&&d(e),te(t),i&&r&&r.end(),i&&d(s),te(l,i)}}}function Vr(a){let e,t,r=a[1]&&rt(a);return{c(){r&&r.c(),e=Se()},l(s){r&&r.l(s),e=Se()},m(s,l){r&&r.m(s,l),B(s,e,l),t=!0},p(s,[l]){s[1]?r?(r.p(s,l),l&2&&I(r,1)):(r=rt(s),r.c(),I(r,1),r.m(e.parentNode,e)):r&&(ae(),V(r,1,1,()=>{r=null}),se())},i(s){t||(I(r),t=!0)},o(s){V(r),t=!1},d(s){r&&r.d(s),s&&d(e)}}}function Pr(a,e,t){let r,s,l;_e(a,ut,h=>t(5,s=h)),_e(a,Oe,h=>t(4,l=h));let{$$slots:n={},$$scope:i}=e,u=!0,o=null;St.subscribe(h=>{t(1,o=h)});let c;return He.subscribe(h=>{t(2,c=h)}),yt(async()=>{await dt.bookmarks.get(),t(0,u=!1)}),a.$$set=h=>{"$$scope"in h&&t(6,i=h.$$scope)},a.$$.update=()=>{a.$$.dirty&32&&t(3,r=s.url.pathname.includes("/read"))},[u,o,c,r,l,s,i,n]}class Rr extends le{constructor(e){super(),ne(this,e,Pr,Vr,ie,{})}}export{Rr as default};
