(function(){"use strict";/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */const Md=4,kl=0,Bl=1,Sd=2;function pi(n){let e=n.length;for(;--e>=0;)n[e]=0}const Ed=0,zl=1,yd=2,bd=3,Td=258,ms=29,tr=256,nr=tr+1+ms,mi=30,gs=19,Hl=2*nr+1,zn=15,_s=16,wd=7,vs=256,Gl=16,Vl=17,Wl=18,xs=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),qr=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),Ad=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),Xl=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Rd=512,on=new Array((nr+2)*2);pi(on);const ir=new Array(mi*2);pi(ir);const rr=new Array(Rd);pi(rr);const ar=new Array(Td-bd+1);pi(ar);const Ms=new Array(ms);pi(Ms);const jr=new Array(mi);pi(jr);function Ss(n,e,t,i,r){this.static_tree=n,this.extra_bits=e,this.extra_base=t,this.elems=i,this.max_length=r,this.has_stree=n&&n.length}let Yl,ql,jl;function Es(n,e){this.dyn_tree=n,this.max_code=0,this.stat_desc=e}const Zl=n=>n<256?rr[n]:rr[256+(n>>>7)],sr=(n,e)=>{n.pending_buf[n.pending++]=e&255,n.pending_buf[n.pending++]=e>>>8&255},xt=(n,e,t)=>{n.bi_valid>_s-t?(n.bi_buf|=e<<n.bi_valid&65535,sr(n,n.bi_buf),n.bi_buf=e>>_s-n.bi_valid,n.bi_valid+=t-_s):(n.bi_buf|=e<<n.bi_valid&65535,n.bi_valid+=t)},Zt=(n,e,t)=>{xt(n,t[e*2],t[e*2+1])},Kl=(n,e)=>{let t=0;do t|=n&1,n>>>=1,t<<=1;while(--e>0);return t>>>1},Cd=n=>{n.bi_valid===16?(sr(n,n.bi_buf),n.bi_buf=0,n.bi_valid=0):n.bi_valid>=8&&(n.pending_buf[n.pending++]=n.bi_buf&255,n.bi_buf>>=8,n.bi_valid-=8)},Ld=(n,e)=>{const t=e.dyn_tree,i=e.max_code,r=e.stat_desc.static_tree,a=e.stat_desc.has_stree,s=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,c=e.stat_desc.max_length;let o,u,d,h,f,m,S=0;for(h=0;h<=zn;h++)n.bl_count[h]=0;for(t[n.heap[n.heap_max]*2+1]=0,o=n.heap_max+1;o<Hl;o++)u=n.heap[o],h=t[t[u*2+1]*2+1]+1,h>c&&(h=c,S++),t[u*2+1]=h,!(u>i)&&(n.bl_count[h]++,f=0,u>=l&&(f=s[u-l]),m=t[u*2],n.opt_len+=m*(h+f),a&&(n.static_len+=m*(r[u*2+1]+f)));if(S!==0){do{for(h=c-1;n.bl_count[h]===0;)h--;n.bl_count[h]--,n.bl_count[h+1]+=2,n.bl_count[c]--,S-=2}while(S>0);for(h=c;h!==0;h--)for(u=n.bl_count[h];u!==0;)d=n.heap[--o],!(d>i)&&(t[d*2+1]!==h&&(n.opt_len+=(h-t[d*2+1])*t[d*2],t[d*2+1]=h),u--)}},$l=(n,e,t)=>{const i=new Array(zn+1);let r=0,a,s;for(a=1;a<=zn;a++)r=r+t[a-1]<<1,i[a]=r;for(s=0;s<=e;s++){let l=n[s*2+1];l!==0&&(n[s*2]=Kl(i[l]++,l))}},Pd=()=>{let n,e,t,i,r;const a=new Array(zn+1);for(t=0,i=0;i<ms-1;i++)for(Ms[i]=t,n=0;n<1<<xs[i];n++)ar[t++]=i;for(ar[t-1]=i,r=0,i=0;i<16;i++)for(jr[i]=r,n=0;n<1<<qr[i];n++)rr[r++]=i;for(r>>=7;i<mi;i++)for(jr[i]=r<<7,n=0;n<1<<qr[i]-7;n++)rr[256+r++]=i;for(e=0;e<=zn;e++)a[e]=0;for(n=0;n<=143;)on[n*2+1]=8,n++,a[8]++;for(;n<=255;)on[n*2+1]=9,n++,a[9]++;for(;n<=279;)on[n*2+1]=7,n++,a[7]++;for(;n<=287;)on[n*2+1]=8,n++,a[8]++;for($l(on,nr+1,a),n=0;n<mi;n++)ir[n*2+1]=5,ir[n*2]=Kl(n,5);Yl=new Ss(on,xs,tr+1,nr,zn),ql=new Ss(ir,qr,0,mi,zn),jl=new Ss(new Array(0),Ad,0,gs,wd)},Jl=n=>{let e;for(e=0;e<nr;e++)n.dyn_ltree[e*2]=0;for(e=0;e<mi;e++)n.dyn_dtree[e*2]=0;for(e=0;e<gs;e++)n.bl_tree[e*2]=0;n.dyn_ltree[vs*2]=1,n.opt_len=n.static_len=0,n.sym_next=n.matches=0},Ql=n=>{n.bi_valid>8?sr(n,n.bi_buf):n.bi_valid>0&&(n.pending_buf[n.pending++]=n.bi_buf),n.bi_buf=0,n.bi_valid=0},ec=(n,e,t,i)=>{const r=e*2,a=t*2;return n[r]<n[a]||n[r]===n[a]&&i[e]<=i[t]},ys=(n,e,t)=>{const i=n.heap[t];let r=t<<1;for(;r<=n.heap_len&&(r<n.heap_len&&ec(e,n.heap[r+1],n.heap[r],n.depth)&&r++,!ec(e,i,n.heap[r],n.depth));)n.heap[t]=n.heap[r],t=r,r<<=1;n.heap[t]=i},tc=(n,e,t)=>{let i,r,a=0,s,l;if(n.sym_next!==0)do i=n.pending_buf[n.sym_buf+a++]&255,i+=(n.pending_buf[n.sym_buf+a++]&255)<<8,r=n.pending_buf[n.sym_buf+a++],i===0?Zt(n,r,e):(s=ar[r],Zt(n,s+tr+1,e),l=xs[s],l!==0&&(r-=Ms[s],xt(n,r,l)),i--,s=Zl(i),Zt(n,s,t),l=qr[s],l!==0&&(i-=jr[s],xt(n,i,l)));while(a<n.sym_next);Zt(n,vs,e)},bs=(n,e)=>{const t=e.dyn_tree,i=e.stat_desc.static_tree,r=e.stat_desc.has_stree,a=e.stat_desc.elems;let s,l,c=-1,o;for(n.heap_len=0,n.heap_max=Hl,s=0;s<a;s++)t[s*2]!==0?(n.heap[++n.heap_len]=c=s,n.depth[s]=0):t[s*2+1]=0;for(;n.heap_len<2;)o=n.heap[++n.heap_len]=c<2?++c:0,t[o*2]=1,n.depth[o]=0,n.opt_len--,r&&(n.static_len-=i[o*2+1]);for(e.max_code=c,s=n.heap_len>>1;s>=1;s--)ys(n,t,s);o=a;do s=n.heap[1],n.heap[1]=n.heap[n.heap_len--],ys(n,t,1),l=n.heap[1],n.heap[--n.heap_max]=s,n.heap[--n.heap_max]=l,t[o*2]=t[s*2]+t[l*2],n.depth[o]=(n.depth[s]>=n.depth[l]?n.depth[s]:n.depth[l])+1,t[s*2+1]=t[l*2+1]=o,n.heap[1]=o++,ys(n,t,1);while(n.heap_len>=2);n.heap[--n.heap_max]=n.heap[1],Ld(n,e),$l(t,c,n.bl_count)},nc=(n,e,t)=>{let i,r=-1,a,s=e[0*2+1],l=0,c=7,o=4;for(s===0&&(c=138,o=3),e[(t+1)*2+1]=65535,i=0;i<=t;i++)a=s,s=e[(i+1)*2+1],!(++l<c&&a===s)&&(l<o?n.bl_tree[a*2]+=l:a!==0?(a!==r&&n.bl_tree[a*2]++,n.bl_tree[Gl*2]++):l<=10?n.bl_tree[Vl*2]++:n.bl_tree[Wl*2]++,l=0,r=a,s===0?(c=138,o=3):a===s?(c=6,o=3):(c=7,o=4))},ic=(n,e,t)=>{let i,r=-1,a,s=e[0*2+1],l=0,c=7,o=4;for(s===0&&(c=138,o=3),i=0;i<=t;i++)if(a=s,s=e[(i+1)*2+1],!(++l<c&&a===s)){if(l<o)do Zt(n,a,n.bl_tree);while(--l!==0);else a!==0?(a!==r&&(Zt(n,a,n.bl_tree),l--),Zt(n,Gl,n.bl_tree),xt(n,l-3,2)):l<=10?(Zt(n,Vl,n.bl_tree),xt(n,l-3,3)):(Zt(n,Wl,n.bl_tree),xt(n,l-11,7));l=0,r=a,s===0?(c=138,o=3):a===s?(c=6,o=3):(c=7,o=4)}},Id=n=>{let e;for(nc(n,n.dyn_ltree,n.l_desc.max_code),nc(n,n.dyn_dtree,n.d_desc.max_code),bs(n,n.bl_desc),e=gs-1;e>=3&&n.bl_tree[Xl[e]*2+1]===0;e--);return n.opt_len+=3*(e+1)+5+5+4,e},Ud=(n,e,t,i)=>{let r;for(xt(n,e-257,5),xt(n,t-1,5),xt(n,i-4,4),r=0;r<i;r++)xt(n,n.bl_tree[Xl[r]*2+1],3);ic(n,n.dyn_ltree,e-1),ic(n,n.dyn_dtree,t-1)},Dd=n=>{let e=4093624447,t;for(t=0;t<=31;t++,e>>>=1)if(e&1&&n.dyn_ltree[t*2]!==0)return kl;if(n.dyn_ltree[9*2]!==0||n.dyn_ltree[10*2]!==0||n.dyn_ltree[13*2]!==0)return Bl;for(t=32;t<tr;t++)if(n.dyn_ltree[t*2]!==0)return Bl;return kl};let rc=!1;const Nd=n=>{rc||(Pd(),rc=!0),n.l_desc=new Es(n.dyn_ltree,Yl),n.d_desc=new Es(n.dyn_dtree,ql),n.bl_desc=new Es(n.bl_tree,jl),n.bi_buf=0,n.bi_valid=0,Jl(n)},ac=(n,e,t,i)=>{xt(n,(Ed<<1)+(i?1:0),3),Ql(n),sr(n,t),sr(n,~t),t&&n.pending_buf.set(n.window.subarray(e,e+t),n.pending),n.pending+=t},Od=n=>{xt(n,zl<<1,3),Zt(n,vs,on),Cd(n)},Fd=(n,e,t,i)=>{let r,a,s=0;n.level>0?(n.strm.data_type===Sd&&(n.strm.data_type=Dd(n)),bs(n,n.l_desc),bs(n,n.d_desc),s=Id(n),r=n.opt_len+3+7>>>3,a=n.static_len+3+7>>>3,a<=r&&(r=a)):r=a=t+5,t+4<=r&&e!==-1?ac(n,e,t,i):n.strategy===Md||a===r?(xt(n,(zl<<1)+(i?1:0),3),tc(n,on,ir)):(xt(n,(yd<<1)+(i?1:0),3),Ud(n,n.l_desc.max_code+1,n.d_desc.max_code+1,s+1),tc(n,n.dyn_ltree,n.dyn_dtree)),Jl(n),i&&Ql(n)},kd=(n,e,t)=>(n.pending_buf[n.sym_buf+n.sym_next++]=e,n.pending_buf[n.sym_buf+n.sym_next++]=e>>8,n.pending_buf[n.sym_buf+n.sym_next++]=t,e===0?n.dyn_ltree[t*2]++:(n.matches++,e--,n.dyn_ltree[(ar[t]+tr+1)*2]++,n.dyn_dtree[Zl(e)*2]++),n.sym_next===n.sym_end);var Bd=Nd,zd=ac,Hd=Fd,Gd=kd,Vd=Od,Wd={_tr_init:Bd,_tr_stored_block:zd,_tr_flush_block:Hd,_tr_tally:Gd,_tr_align:Vd},or=(n,e,t,i)=>{let r=n&65535|0,a=n>>>16&65535|0,s=0;for(;t!==0;){s=t>2e3?2e3:t,t-=s;do r=r+e[i++]|0,a=a+r|0;while(--s);r%=65521,a%=65521}return r|a<<16|0};const Xd=()=>{let n,e=[];for(var t=0;t<256;t++){n=t;for(var i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e},Yd=new Uint32Array(Xd());var at=(n,e,t,i)=>{const r=Yd,a=i+t;n^=-1;for(let s=i;s<a;s++)n=n>>>8^r[(n^e[s])&255];return n^-1},Hn={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},lr={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:qd,_tr_stored_block:Ts,_tr_flush_block:jd,_tr_tally:Mn,_tr_align:Zd}=Wd,{Z_NO_FLUSH:Sn,Z_PARTIAL_FLUSH:Kd,Z_FULL_FLUSH:$d,Z_FINISH:Pt,Z_BLOCK:sc,Z_OK:ut,Z_STREAM_END:oc,Z_STREAM_ERROR:Kt,Z_DATA_ERROR:Jd,Z_BUF_ERROR:ws,Z_DEFAULT_COMPRESSION:Qd,Z_FILTERED:ef,Z_HUFFMAN_ONLY:Zr,Z_RLE:tf,Z_FIXED:nf,Z_DEFAULT_STRATEGY:rf,Z_UNKNOWN:af,Z_DEFLATED:Kr}=lr,sf=9,of=15,lf=8,As=256+1+29,cf=30,uf=19,hf=2*As+1,df=15,Ue=3,En=258,$t=En+Ue+1,ff=32,gi=42,Rs=57,Cs=69,Ls=73,Ps=91,Is=103,Gn=113,cr=666,gt=1,_i=2,Vn=3,vi=4,pf=3,Wn=(n,e)=>(n.msg=Hn[e],e),lc=n=>n*2-(n>4?9:0),yn=n=>{let e=n.length;for(;--e>=0;)n[e]=0},mf=n=>{let e,t,i,r=n.w_size;e=n.hash_size,i=e;do t=n.head[--i],n.head[i]=t>=r?t-r:0;while(--e);e=r,i=e;do t=n.prev[--i],n.prev[i]=t>=r?t-r:0;while(--e)};let Us=(n,e,t)=>(e<<n.hash_shift^t)&n.hash_mask;const Xn=(n,e)=>{let t;if(n.legacy_hash)t=n.ins_h=Us(n,n.ins_h,n.window[e+Ue-1]);else{const r=n.window,a=r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24;t=n.ins_h=Math.imul(a,66521)+66521>>>16&n.hash_mask}const i=n.prev[e&n.w_mask]=n.head[t];return n.head[t]=e,i},Tt=n=>{const e=n.state;let t=e.pending;t>n.avail_out&&(t=n.avail_out),t!==0&&(n.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+t),n.next_out),n.next_out+=t,e.pending_out+=t,n.total_out+=t,n.avail_out-=t,e.pending-=t,e.pending===0&&(e.pending_out=0))},wt=(n,e)=>{jd(n,n.block_start>=0?n.block_start:-1,n.strstart-n.block_start,e),n.block_start=n.strstart,Tt(n.strm)},Oe=(n,e)=>{n.pending_buf[n.pending++]=e},ur=(n,e)=>{n.pending_buf[n.pending++]=e>>>8&255,n.pending_buf[n.pending++]=e&255},Ds=(n,e,t,i)=>{let r=n.avail_in;return r>i&&(r=i),r===0?0:(n.avail_in-=r,e.set(n.input.subarray(n.next_in,n.next_in+r),t),n.state.wrap===1?n.adler=or(n.adler,e,r,t):n.state.wrap===2&&(n.adler=at(n.adler,e,r,t)),n.next_in+=r,n.total_in+=r,r)},cc=(n,e)=>{let t=n.max_chain_length,i=n.strstart,r,a,s=n.prev_length,l=n.nice_match;const c=n.strstart>n.w_size-$t?n.strstart-(n.w_size-$t):0,o=n.window,u=n.w_mask,d=n.prev,h=n.strstart+En;let f=o[i+s-1],m=o[i+s];n.prev_length>=n.good_match&&(t>>=2),l>n.lookahead&&(l=n.lookahead);do if(r=e,!(o[r+s]!==m||o[r+s-1]!==f||o[r]!==o[i]||o[++r]!==o[i+1])){i+=2,r++;do;while(o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&o[++i]===o[++r]&&i<h);if(a=En-(h-i),i=h-En,a>s){if(n.match_start=e,s=a,a>=l)break;f=o[i+s-1],m=o[i+s]}}while((e=d[e&u])>c&&--t!==0);return s<=n.lookahead?s:n.lookahead},xi=n=>{const e=n.w_size;let t,i,r;do{if(i=n.window_size-n.lookahead-n.strstart,n.strstart>=e+(e-$t)&&(n.window.set(n.window.subarray(e,e+e-i),0),n.match_start-=e,n.strstart-=e,n.block_start-=e,n.insert>n.strstart&&(n.insert=n.strstart),mf(n),i+=e),n.strm.avail_in===0)break;if(t=Ds(n.strm,n.window,n.strstart+n.lookahead,i),n.lookahead+=t,n.legacy_hash){if(n.lookahead+n.insert>=Ue)for(r=n.strstart-n.insert,n.ins_h=n.window[r],n.ins_h=Us(n,n.ins_h,n.window[r+1]);n.insert&&(Xn(n,r),r++,n.insert--,!(n.lookahead+n.insert<Ue)););}else if(n.lookahead+n.insert>Ue)for(r=n.strstart-n.insert;n.insert&&(Xn(n,r),r++,n.insert--,!(n.lookahead+n.insert<=Ue)););}while(n.lookahead<$t&&n.strm.avail_in!==0)},uc=(n,e)=>{let t=n.pending_buf_size-5>n.w_size?n.w_size:n.pending_buf_size-5,i,r,a,s=0,l=n.strm.avail_in;do{if(i=65535,a=n.bi_valid+42>>3,n.strm.avail_out<a||(a=n.strm.avail_out-a,r=n.strstart-n.block_start,i>r+n.strm.avail_in&&(i=r+n.strm.avail_in),i>a&&(i=a),i<t&&(i===0&&e!==Pt||e===Sn||i!==r+n.strm.avail_in)))break;s=e===Pt&&i===r+n.strm.avail_in?1:0,Ts(n,0,0,s),n.pending_buf[n.pending-4]=i,n.pending_buf[n.pending-3]=i>>8,n.pending_buf[n.pending-2]=~i,n.pending_buf[n.pending-1]=~i>>8,Tt(n.strm),r&&(r>i&&(r=i),n.strm.output.set(n.window.subarray(n.block_start,n.block_start+r),n.strm.next_out),n.strm.next_out+=r,n.strm.avail_out-=r,n.strm.total_out+=r,n.block_start+=r,i-=r),i&&(Ds(n.strm,n.strm.output,n.strm.next_out,i),n.strm.next_out+=i,n.strm.avail_out-=i,n.strm.total_out+=i)}while(s===0);return l-=n.strm.avail_in,l&&(l>=n.w_size?(n.matches=2,n.window.set(n.strm.input.subarray(n.strm.next_in-n.w_size,n.strm.next_in),0),n.strstart=n.w_size,n.insert=n.strstart):(n.window_size-n.strstart<=l&&(n.strstart-=n.w_size,n.window.set(n.window.subarray(n.w_size,n.w_size+n.strstart),0),n.matches<2&&n.matches++,n.insert>n.strstart&&(n.insert=n.strstart)),n.window.set(n.strm.input.subarray(n.strm.next_in-l,n.strm.next_in),n.strstart),n.strstart+=l,n.insert+=l>n.w_size-n.insert?n.w_size-n.insert:l),n.block_start=n.strstart),n.high_water<n.strstart&&(n.high_water=n.strstart),s?vi:e!==Sn&&e!==Pt&&n.strm.avail_in===0&&n.strstart===n.block_start?_i:(a=n.window_size-n.strstart,n.strm.avail_in>a&&n.block_start>=n.w_size&&(n.block_start-=n.w_size,n.strstart-=n.w_size,n.window.set(n.window.subarray(n.w_size,n.w_size+n.strstart),0),n.matches<2&&n.matches++,a+=n.w_size,n.insert>n.strstart&&(n.insert=n.strstart)),a>n.strm.avail_in&&(a=n.strm.avail_in),a&&(Ds(n.strm,n.window,n.strstart,a),n.strstart+=a,n.insert+=a>n.w_size-n.insert?n.w_size-n.insert:a),n.high_water<n.strstart&&(n.high_water=n.strstart),a=n.bi_valid+42>>3,a=n.pending_buf_size-a>65535?65535:n.pending_buf_size-a,t=a>n.w_size?n.w_size:a,r=n.strstart-n.block_start,(r>=t||(r||e===Pt)&&e!==Sn&&n.strm.avail_in===0&&r<=a)&&(i=r>a?a:r,s=e===Pt&&n.strm.avail_in===0&&i===r?1:0,Ts(n,n.block_start,i,s),n.block_start+=i,Tt(n.strm)),s?Vn:gt)},Ns=(n,e)=>{let t,i;for(;;){if(n.lookahead<$t){if(xi(n),n.lookahead<$t&&e===Sn)return gt;if(n.lookahead===0)break}if(t=0,n.lookahead>=Ue&&(t=Xn(n,n.strstart)),t!==0&&n.strstart-t<=n.w_size-$t&&(n.match_length=cc(n,t)),n.match_length>=Ue)if(i=Mn(n,n.strstart-n.match_start,n.match_length-Ue),n.lookahead-=n.match_length,n.match_length<=n.max_lazy_match&&n.lookahead>=Ue){n.match_length--;do n.strstart++,t=Xn(n,n.strstart);while(--n.match_length!==0);n.strstart++}else n.strstart+=n.match_length,n.match_length=0,n.legacy_hash&&(n.ins_h=n.window[n.strstart],n.ins_h=Us(n,n.ins_h,n.window[n.strstart+1]));else i=Mn(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++;if(i&&(wt(n,!1),n.strm.avail_out===0))return gt}return n.insert=n.strstart<Ue-1?n.strstart:Ue-1,e===Pt?(wt(n,!0),n.strm.avail_out===0?Vn:vi):n.sym_next&&(wt(n,!1),n.strm.avail_out===0)?gt:_i},Mi=(n,e)=>{let t,i,r;for(;;){if(n.lookahead<$t){if(xi(n),n.lookahead<$t&&e===Sn)return gt;if(n.lookahead===0)break}if(t=0,n.lookahead>=Ue&&(t=Xn(n,n.strstart)),n.prev_length=n.match_length,n.prev_match=n.match_start,n.match_length=Ue-1,t!==0&&n.prev_length<n.max_lazy_match&&n.strstart-t<=n.w_size-$t&&(n.match_length=cc(n,t),n.match_length<=5&&(n.strategy===ef||n.match_length===Ue&&n.strstart-n.match_start>4096)&&(n.match_length=Ue-1)),n.prev_length>=Ue&&n.match_length<=n.prev_length){r=n.strstart+n.lookahead-Ue,i=Mn(n,n.strstart-1-n.prev_match,n.prev_length-Ue),n.lookahead-=n.prev_length-1,n.prev_length-=2;do++n.strstart<=r&&(t=Xn(n,n.strstart));while(--n.prev_length!==0);if(n.match_available=0,n.match_length=Ue-1,n.strstart++,i&&(wt(n,!1),n.strm.avail_out===0))return gt}else if(n.match_available){if(i=Mn(n,0,n.window[n.strstart-1]),i&&wt(n,!1),n.strstart++,n.lookahead--,n.strm.avail_out===0)return gt}else n.match_available=1,n.strstart++,n.lookahead--}return n.match_available&&(i=Mn(n,0,n.window[n.strstart-1]),n.match_available=0),n.insert=n.strstart<Ue-1?n.strstart:Ue-1,e===Pt?(wt(n,!0),n.strm.avail_out===0?Vn:vi):n.sym_next&&(wt(n,!1),n.strm.avail_out===0)?gt:_i},gf=(n,e)=>{let t,i,r,a;const s=n.window;for(;;){if(n.lookahead<=En){if(xi(n),n.lookahead<=En&&e===Sn)return gt;if(n.lookahead===0)break}if(n.match_length=0,n.lookahead>=Ue&&n.strstart>0&&(r=n.strstart-1,i=s[r],i===s[++r]&&i===s[++r]&&i===s[++r])){a=n.strstart+En;do;while(i===s[++r]&&i===s[++r]&&i===s[++r]&&i===s[++r]&&i===s[++r]&&i===s[++r]&&i===s[++r]&&i===s[++r]&&r<a);n.match_length=En-(a-r),n.match_length>n.lookahead&&(n.match_length=n.lookahead)}if(n.match_length>=Ue?(t=Mn(n,1,n.match_length-Ue),n.lookahead-=n.match_length,n.strstart+=n.match_length,n.match_length=0):(t=Mn(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++),t&&(wt(n,!1),n.strm.avail_out===0))return gt}return n.insert=0,e===Pt?(wt(n,!0),n.strm.avail_out===0?Vn:vi):n.sym_next&&(wt(n,!1),n.strm.avail_out===0)?gt:_i},_f=(n,e)=>{let t;for(;;){if(n.lookahead===0&&(xi(n),n.lookahead===0)){if(e===Sn)return gt;break}if(n.match_length=0,t=Mn(n,0,n.window[n.strstart]),n.lookahead--,n.strstart++,t&&(wt(n,!1),n.strm.avail_out===0))return gt}return n.insert=0,e===Pt?(wt(n,!0),n.strm.avail_out===0?Vn:vi):n.sym_next&&(wt(n,!1),n.strm.avail_out===0)?gt:_i};function Jt(n,e,t,i,r){this.good_length=n,this.max_lazy=e,this.nice_length=t,this.max_chain=i,this.func=r}const hr=[new Jt(0,0,0,0,uc),new Jt(4,4,8,4,Ns),new Jt(4,5,16,8,Ns),new Jt(4,6,32,32,Ns),new Jt(4,4,16,16,Mi),new Jt(8,16,32,32,Mi),new Jt(8,16,128,128,Mi),new Jt(8,32,128,256,Mi),new Jt(32,128,258,1024,Mi),new Jt(32,258,258,4096,Mi)],vf=n=>{n.window_size=2*n.w_size,yn(n.head),n.max_lazy_match=hr[n.level].max_lazy,n.good_match=hr[n.level].good_length,n.nice_match=hr[n.level].nice_length,n.max_chain_length=hr[n.level].max_chain,n.strstart=0,n.block_start=0,n.lookahead=0,n.insert=0,n.match_length=n.prev_length=Ue-1,n.match_available=0,n.ins_h=0};function xf(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=Kr,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.legacy_hash=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(hf*2),this.dyn_dtree=new Uint16Array((2*cf+1)*2),this.bl_tree=new Uint16Array((2*uf+1)*2),yn(this.dyn_ltree),yn(this.dyn_dtree),yn(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(df+1),this.heap=new Uint16Array(2*As+1),yn(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(2*As+1),yn(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const dr=n=>{if(!n)return 1;const e=n.state;return!e||e.strm!==n||e.status!==gi&&e.status!==Rs&&e.status!==Cs&&e.status!==Ls&&e.status!==Ps&&e.status!==Is&&e.status!==Gn&&e.status!==cr?1:0},hc=n=>{if(dr(n))return Wn(n,Kt);n.total_in=n.total_out=0,n.data_type=af;const e=n.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap===2?Rs:e.wrap?gi:Gn,n.adler=e.wrap===2?0:1,e.last_flush=-2,qd(e),ut},dc=n=>{const e=hc(n);return e===ut&&vf(n.state),e},Mf=(n,e)=>dr(n)||n.state.wrap!==2?Kt:(n.state.gzhead=e,ut),fc=(n,e,t,i,r,a,s)=>{if(!n)return Kt;let l=1;if(e===Qd&&(e=6),i<0?(l=0,i=-i):i>15&&(l=2,i-=16),r<1||r>sf||t!==Kr||i<8||i>15||e<0||e>9||a<0||a>nf||i===8&&l!==1)return Wn(n,Kt);i===8&&(i=9);const c=new xf;return n.state=c,c.strm=n,c.status=gi,c.wrap=l,c.gzhead=null,c.w_bits=i,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.legacy_hash=s?1:0,c.hash_bits=r+7,!c.legacy_hash&&c.hash_bits<15&&(c.hash_bits=15),c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+Ue-1)/Ue),c.window=new Uint8Array(c.w_size*2),c.head=new Uint16Array(c.hash_size),c.prev=new Uint16Array(c.w_size),c.lit_bufsize=1<<r+6,c.pending_buf_size=c.lit_bufsize*4,c.pending_buf=new Uint8Array(c.pending_buf_size),c.sym_buf=c.lit_bufsize,c.sym_end=(c.lit_bufsize-1)*3,c.level=e,c.strategy=a,c.method=t,dc(n)},Sf=(n,e)=>fc(n,e,Kr,of,lf,rf),Ef=(n,e)=>{if(dr(n)||e>sc||e<0)return n?Wn(n,Kt):Kt;const t=n.state;if(!n.output||n.avail_in!==0&&!n.input||t.status===cr&&e!==Pt)return Wn(n,n.avail_out===0?ws:Kt);const i=t.last_flush;if(t.last_flush=e,t.pending!==0){if(Tt(n),n.avail_out===0)return t.last_flush=-1,ut}else if(n.avail_in===0&&lc(e)<=lc(i)&&e!==Pt)return Wn(n,ws);if(t.status===cr&&n.avail_in!==0)return Wn(n,ws);if(t.status===gi&&t.wrap===0&&(t.status=Gn),t.status===gi){let r=Kr+(t.w_bits-8<<4)<<8,a=-1;if(t.strategy>=Zr||t.level<2?a=0:t.level<6?a=1:t.level===6?a=2:a=3,r|=a<<6,t.strstart!==0&&(r|=ff),r+=31-r%31,ur(t,r),t.strstart!==0&&(ur(t,n.adler>>>16),ur(t,n.adler&65535)),n.adler=1,t.status=Gn,Tt(n),t.pending!==0)return t.last_flush=-1,ut}if(t.status===Rs){if(n.adler=0,Oe(t,31),Oe(t,139),Oe(t,8),t.gzhead)Oe(t,(t.gzhead.text?1:0)+(t.gzhead.hcrc?2:0)+(t.gzhead.extra?4:0)+(t.gzhead.name?8:0)+(t.gzhead.comment?16:0)),Oe(t,t.gzhead.time&255),Oe(t,t.gzhead.time>>8&255),Oe(t,t.gzhead.time>>16&255),Oe(t,t.gzhead.time>>24&255),Oe(t,t.level===9?2:t.strategy>=Zr||t.level<2?4:0),Oe(t,t.gzhead.os&255),t.gzhead.extra&&t.gzhead.extra.length&&(Oe(t,t.gzhead.extra.length&255),Oe(t,t.gzhead.extra.length>>8&255)),t.gzhead.hcrc&&(n.adler=at(n.adler,t.pending_buf,t.pending,0)),t.gzindex=0,t.status=Cs;else if(Oe(t,0),Oe(t,0),Oe(t,0),Oe(t,0),Oe(t,0),Oe(t,t.level===9?2:t.strategy>=Zr||t.level<2?4:0),Oe(t,pf),t.status=Gn,Tt(n),t.pending!==0)return t.last_flush=-1,ut}if(t.status===Cs){if(t.gzhead.extra){let r=t.pending,a=(t.gzhead.extra.length&65535)-t.gzindex;for(;t.pending+a>t.pending_buf_size;){let l=t.pending_buf_size-t.pending;if(t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex,t.gzindex+l),t.pending),t.pending=t.pending_buf_size,t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r)),t.gzindex+=l,Tt(n),t.pending!==0)return t.last_flush=-1,ut;r=0,a-=l}let s=new Uint8Array(t.gzhead.extra);t.pending_buf.set(s.subarray(t.gzindex,t.gzindex+a),t.pending),t.pending+=a,t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r)),t.gzindex=0}t.status=Ls}if(t.status===Ls){if(t.gzhead.name){let r=t.pending,a;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r)),Tt(n),t.pending!==0)return t.last_flush=-1,ut;r=0}t.gzindex<t.gzhead.name.length?a=t.gzhead.name.charCodeAt(t.gzindex++)&255:a=0,Oe(t,a)}while(a!==0);t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r)),t.gzindex=0}t.status=Ps}if(t.status===Ps){if(t.gzhead.comment){let r=t.pending,a;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r)),Tt(n),t.pending!==0)return t.last_flush=-1,ut;r=0}t.gzindex<t.gzhead.comment.length?a=t.gzhead.comment.charCodeAt(t.gzindex++)&255:a=0,Oe(t,a)}while(a!==0);t.gzhead.hcrc&&t.pending>r&&(n.adler=at(n.adler,t.pending_buf,t.pending-r,r))}t.status=Is}if(t.status===Is){if(t.gzhead.hcrc){if(t.pending+2>t.pending_buf_size&&(Tt(n),t.pending!==0))return t.last_flush=-1,ut;Oe(t,n.adler&255),Oe(t,n.adler>>8&255),n.adler=0}if(t.status=Gn,Tt(n),t.pending!==0)return t.last_flush=-1,ut}if(n.avail_in!==0||t.lookahead!==0||e!==Sn&&t.status!==cr){let r=t.level===0?uc(t,e):t.strategy===Zr?_f(t,e):t.strategy===tf?gf(t,e):hr[t.level].func(t,e);if((r===Vn||r===vi)&&(t.status=cr),r===gt||r===Vn)return n.avail_out===0&&(t.last_flush=-1),ut;if(r===_i&&(e===Kd?Zd(t):e!==sc&&(Ts(t,0,0,!1),e===$d&&(yn(t.head),t.lookahead===0&&(t.strstart=0,t.block_start=0,t.insert=0))),Tt(n),n.avail_out===0))return t.last_flush=-1,ut}return e!==Pt?ut:t.wrap<=0?oc:(t.wrap===2?(Oe(t,n.adler&255),Oe(t,n.adler>>8&255),Oe(t,n.adler>>16&255),Oe(t,n.adler>>24&255),Oe(t,n.total_in&255),Oe(t,n.total_in>>8&255),Oe(t,n.total_in>>16&255),Oe(t,n.total_in>>24&255)):(ur(t,n.adler>>>16),ur(t,n.adler&65535)),Tt(n),t.wrap>0&&(t.wrap=-t.wrap),t.pending!==0?ut:oc)},yf=n=>{if(dr(n))return Kt;const e=n.state.status;return n.state=null,e===Gn?Wn(n,Jd):ut},bf=(n,e)=>{let t=e.length;if(dr(n))return Kt;const i=n.state,r=i.wrap;if(r===2||r===1&&i.status!==gi||i.lookahead)return Kt;if(r===1&&(n.adler=or(n.adler,e,t,0)),i.wrap=0,t>=i.w_size){r===0&&(yn(i.head),i.strstart=0,i.block_start=0,i.insert=0);let c=new Uint8Array(i.w_size);c.set(e.subarray(t-i.w_size,t),0),e=c,t=i.w_size}const a=n.avail_in,s=n.next_in,l=n.input;for(n.avail_in=t,n.next_in=0,n.input=e,xi(i);i.lookahead>=Ue;){let c=i.strstart,o=i.lookahead-(Ue-1);do Xn(i,c),c++;while(--o);i.strstart=c,i.lookahead=Ue-1,xi(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=Ue-1,i.match_available=0,n.next_in=s,n.input=l,n.avail_in=a,i.wrap=r,ut};var Tf=Sf,wf=fc,Af=dc,Rf=hc,Cf=Mf,Lf=Ef,Pf=yf,If=bf,Uf="pako deflate (from Nodeca project)",fr={deflateInit:Tf,deflateInit2:wf,deflateReset:Af,deflateResetKeep:Rf,deflateSetHeader:Cf,deflate:Lf,deflateEnd:Pf,deflateSetDictionary:If,deflateInfo:Uf};const Df=(n,e)=>Object.prototype.hasOwnProperty.call(n,e);var Nf=function(n){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const t=e.shift();if(t){if(typeof t!="object")throw new TypeError(t+"must be non-object");for(const i in t)Df(t,i)&&(n[i]=t[i])}}return n},Of=n=>{let e=0;for(let i=0,r=n.length;i<r;i++)e+=n[i].length;const t=new Uint8Array(e);for(let i=0,r=0,a=n.length;i<a;i++){let s=n[i];t.set(s,r),r+=s.length}return t},$r={assign:Nf,flattenChunks:Of};let pc=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{pc=!1}const pr=new Uint8Array(256);for(let n=0;n<256;n++)pr[n]=n>=252?6:n>=248?5:n>=240?4:n>=224?3:n>=192?2:1;pr[254]=pr[255]=1;var Ff=n=>{if(typeof TextEncoder=="function"&&TextEncoder.prototype.encode)return new TextEncoder().encode(n);let e,t,i,r,a,s=n.length,l=0;for(r=0;r<s;r++)t=n.charCodeAt(r),(t&64512)===55296&&r+1<s&&(i=n.charCodeAt(r+1),(i&64512)===56320&&(t=65536+(t-55296<<10)+(i-56320),r++)),l+=t<128?1:t<2048?2:t<65536?3:4;for(e=new Uint8Array(l),a=0,r=0;a<l;r++)t=n.charCodeAt(r),(t&64512)===55296&&r+1<s&&(i=n.charCodeAt(r+1),(i&64512)===56320&&(t=65536+(t-55296<<10)+(i-56320),r++)),t<128?e[a++]=t:t<2048?(e[a++]=192|t>>>6,e[a++]=128|t&63):t<65536?(e[a++]=224|t>>>12,e[a++]=128|t>>>6&63,e[a++]=128|t&63):(e[a++]=240|t>>>18,e[a++]=128|t>>>12&63,e[a++]=128|t>>>6&63,e[a++]=128|t&63);return e};const kf=(n,e)=>{if(e<65534&&n.subarray&&pc)return String.fromCharCode.apply(null,n.length===e?n:n.subarray(0,e));let t="";for(let i=0;i<e;i++)t+=String.fromCharCode(n[i]);return t};var Bf=(n,e)=>{const t=e||n.length;if(typeof TextDecoder=="function"&&TextDecoder.prototype.decode)return new TextDecoder().decode(n.subarray(0,e));let i,r;const a=new Array(t*2);for(r=0,i=0;i<t;){let s=n[i++];if(s<128){a[r++]=s;continue}let l=pr[s];if(l>4){a[r++]=65533,i+=l-1;continue}for(s&=l===2?31:l===3?15:7;l>1&&i<t;)s=s<<6|n[i++]&63,l--;if(l>1){a[r++]=65533;continue}s<65536?a[r++]=s:(s-=65536,a[r++]=55296|s>>10&1023,a[r++]=56320|s&1023)}return kf(a,r)},zf=(n,e)=>{e=e||n.length,e>n.length&&(e=n.length);let t=e-1;for(;t>=0&&(n[t]&192)===128;)t--;return t<0||t===0?e:t+pr[n[t]]>e?t:e},mr={string2buf:Ff,buf2string:Bf,utf8border:zf};function Hf(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}var mc=Hf;const gc=Object.prototype.toString,{Z_NO_FLUSH:Gf,Z_SYNC_FLUSH:Vf,Z_FULL_FLUSH:Wf,Z_FINISH:Xf,Z_OK:Jr,Z_STREAM_END:Yf,Z_DEFAULT_COMPRESSION:qf,Z_DEFAULT_STRATEGY:jf,Z_DEFLATED:Zf}=lr,Kf={level:qf,method:Zf,chunkSize:16384,windowBits:15,memLevel:8,strategy:jf,legacyHash:!0};function gr(n){this.options=$r.assign({},Kf,n||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new mc,this.strm.avail_out=0;let t=fr.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy,e.legacyHash);if(t!==Jr)throw new Error(Hn[t]);if(e.header&&fr.deflateSetHeader(this.strm,e.header),e.dictionary){let i;if(typeof e.dictionary=="string"?i=mr.string2buf(e.dictionary):gc.call(e.dictionary)==="[object ArrayBuffer]"?i=new Uint8Array(e.dictionary):i=e.dictionary,t=fr.deflateSetDictionary(this.strm,i),t!==Jr)throw new Error(Hn[t]);this._dict_set=!0}}gr.prototype.push=function(n,e){const t=this.strm,i=this.options.chunkSize;let r,a;if(this.ended)return!1;for(e===~~e?a=e:a=e===!0?Xf:Gf,typeof n=="string"?t.input=mr.string2buf(n):gc.call(n)==="[object ArrayBuffer]"?t.input=new Uint8Array(n):t.input=n,t.next_in=0,t.avail_in=t.input.length;;){if(t.avail_out===0&&(t.output=new Uint8Array(i),t.next_out=0,t.avail_out=i),(a===Vf||a===Wf)&&t.avail_out<=6){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(r=fr.deflate(t,a),r===Yf)return t.next_out>0&&this.onData(t.output.subarray(0,t.next_out)),r=fr.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===Jr;if(t.avail_out===0){this.onData(t.output);continue}if(a>0&&t.next_out>0){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(t.avail_in===0)break}return!0},gr.prototype.onData=function(n){this.chunks.push(n)},gr.prototype.onEnd=function(n){n===Jr&&(this.result=$r.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg};function Os(n,e){const t=new gr(e);if(t.push(n,!0),t.err)throw t.msg||Hn[t.err];return t.result}function $f(n,e){return e=e||{},e.raw=!0,Os(n,e)}function Jf(n,e){return e=e||{},e.gzip=!0,Os(n,e)}var Qf=gr,ep=Os,tp=$f,np=Jf,ip={Deflate:Qf,deflate:ep,deflateRaw:tp,gzip:np};const Qr=16209,rp=16191;var ap=function(e,t){let i,r,a,s,l,c,o,u,d,h,f,m,S,v,p,x,g,_,A,R,T,D,w,C;const F=e.state;i=e.next_in,w=e.input,r=i+(e.avail_in-5),a=e.next_out,C=e.output,s=a-(t-e.avail_out),l=a+(e.avail_out-257),c=F.dmax,o=F.wsize,u=F.whave,d=F.wnext,h=F.window,f=F.hold,m=F.bits,S=F.lencode,v=F.distcode,p=(1<<F.lenbits)-1,x=(1<<F.distbits)-1;e:do{m<15&&(f+=w[i++]<<m,m+=8,f+=w[i++]<<m,m+=8),g=S[f&p];t:for(;;){if(_=g>>>24,f>>>=_,m-=_,_=g>>>16&255,_===0)C[a++]=g&65535;else if(_&16){A=g&65535,_&=15,_&&(m<_&&(f+=w[i++]<<m,m+=8),A+=f&(1<<_)-1,f>>>=_,m-=_),m<15&&(f+=w[i++]<<m,m+=8,f+=w[i++]<<m,m+=8),g=v[f&x];n:for(;;){if(_=g>>>24,f>>>=_,m-=_,_=g>>>16&255,_&16){if(R=g&65535,_&=15,m<_&&(f+=w[i++]<<m,m+=8,m<_&&(f+=w[i++]<<m,m+=8)),R+=f&(1<<_)-1,R>c){e.msg="invalid distance too far back",F.mode=Qr;break e}if(f>>>=_,m-=_,_=a-s,R>_){if(_=R-_,_>u&&F.sane){e.msg="invalid distance too far back",F.mode=Qr;break e}if(T=0,D=h,d===0){if(T+=o-_,_<A){A-=_;do C[a++]=h[T++];while(--_);T=a-R,D=C}}else if(d<_){if(T+=o+d-_,_-=d,_<A){A-=_;do C[a++]=h[T++];while(--_);if(T=0,d<A){_=d,A-=_;do C[a++]=h[T++];while(--_);T=a-R,D=C}}}else if(T+=d-_,_<A){A-=_;do C[a++]=h[T++];while(--_);T=a-R,D=C}for(;A>2;)C[a++]=D[T++],C[a++]=D[T++],C[a++]=D[T++],A-=3;A&&(C[a++]=D[T++],A>1&&(C[a++]=D[T++]))}else{T=a-R;do C[a++]=C[T++],C[a++]=C[T++],C[a++]=C[T++],A-=3;while(A>2);A&&(C[a++]=C[T++],A>1&&(C[a++]=C[T++]))}}else if(_&64){e.msg="invalid distance code",F.mode=Qr;break e}else{g=v[(g&65535)+(f&(1<<_)-1)];continue n}break}}else if(_&64)if(_&32){F.mode=rp;break e}else{e.msg="invalid literal/length code",F.mode=Qr;break e}else{g=S[(g&65535)+(f&(1<<_)-1)];continue t}break}}while(i<r&&a<l);A=m>>3,i-=A,m-=A<<3,f&=(1<<m)-1,e.next_in=i,e.next_out=a,e.avail_in=i<r?5+(r-i):5-(i-r),e.avail_out=a<l?257+(l-a):257-(a-l),F.hold=f,F.bits=m};const Si=15,_c=852,vc=592,xc=0,Fs=1,Mc=2,sp=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),op=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,199,75]),lp=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),cp=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var _r=(n,e,t,i,r,a,s,l)=>{const c=l.bits;let o=0,u=0,d=0,h=0,f=0,m=0,S=0,v=0,p=0,x=0,g,_,A,R,T,D=null,w;const C=new Uint16Array(Si+1),F=new Uint16Array(Si+1);let N=null,q,B,X;for(o=0;o<=Si;o++)C[o]=0;for(u=0;u<i;u++)C[e[t+u]]++;for(f=c,h=Si;h>=1&&C[h]===0;h--);if(f>h&&(f=h),h===0)return r[a++]=1<<24|64<<16|0,r[a++]=1<<24|64<<16|0,l.bits=1,0;for(d=1;d<h&&C[d]===0;d++);for(f<d&&(f=d),v=1,o=1;o<=Si;o++)if(v<<=1,v-=C[o],v<0)return-1;if(v>0&&(n===xc||h!==1))return-1;for(F[1]=0,o=1;o<Si;o++)F[o+1]=F[o]+C[o];for(u=0;u<i;u++)e[t+u]!==0&&(s[F[e[t+u]]++]=u);if(n===xc?(D=N=s,w=20):n===Fs?(D=sp,N=op,w=257):(D=lp,N=cp,w=0),x=0,u=0,o=d,T=a,m=f,S=0,A=-1,p=1<<f,R=p-1,n===Fs&&p>_c||n===Mc&&p>vc)return 1;for(;;){q=o-S,s[u]+1<w?(B=0,X=s[u]):s[u]>=w?(B=N[s[u]-w],X=D[s[u]-w]):(B=96,X=0),g=1<<o-S,_=1<<m,d=_;do _-=g,r[T+(x>>S)+_]=q<<24|B<<16|X|0;while(_!==0);for(g=1<<o-1;x&g;)g>>=1;if(g!==0?(x&=g-1,x+=g):x=0,u++,--C[o]===0){if(o===h)break;o=e[t+s[u]]}if(o>f&&(x&R)!==A){for(S===0&&(S=f),T+=d,m=o-S,v=1<<m;m+S<h&&(v-=C[m+S],!(v<=0));)m++,v<<=1;if(p+=1<<m,n===Fs&&p>_c||n===Mc&&p>vc)return 1;A=x&R,r[A]=f<<24|m<<16|T-a|0}}return x!==0&&(r[T+x]=o-S<<24|64<<16|0),l.bits=f,0};const up=0,Sc=1,Ec=2,{Z_FINISH:yc,Z_BLOCK:hp,Z_TREES:ea,Z_OK:Yn,Z_STREAM_END:dp,Z_NEED_DICT:fp,Z_STREAM_ERROR:It,Z_DATA_ERROR:bc,Z_MEM_ERROR:Tc,Z_BUF_ERROR:pp,Z_DEFLATED:wc}=lr,ta=16180,Ac=16181,Rc=16182,Cc=16183,Lc=16184,Pc=16185,Ic=16186,Uc=16187,Dc=16188,Nc=16189,na=16190,ln=16191,ks=16192,Oc=16193,Bs=16194,Fc=16195,kc=16196,Bc=16197,zc=16198,ia=16199,ra=16200,Hc=16201,Gc=16202,Vc=16203,Wc=16204,Xc=16205,zs=16206,Yc=16207,qc=16208,qe=16209,jc=16210,Zc=16211,mp=852,gp=592,_p=15,Kc=n=>(n>>>24&255)+(n>>>8&65280)+((n&65280)<<8)+((n&255)<<24);function vp(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const qn=n=>{if(!n)return 1;const e=n.state;return!e||e.strm!==n||e.mode<ta||e.mode>Zc?1:0},$c=n=>{if(qn(n))return It;const e=n.state;return n.total_in=n.total_out=e.total=0,n.msg="",e.wrap&&(n.adler=e.wrap&1),e.mode=ta,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(mp),e.distcode=e.distdyn=new Int32Array(gp),e.sane=1,e.back=-1,Yn},Jc=n=>{if(qn(n))return It;const e=n.state;return e.wsize=0,e.whave=0,e.wnext=0,$c(n)},Qc=(n,e)=>{let t;if(qn(n))return It;const i=n.state;return e<0?(t=0,e=-e):(t=(e>>4)+5,e<48&&(e&=15)),e&&(e<8||e>15)?It:(i.window!==null&&i.wbits!==e&&(i.window=null),i.wrap=t,i.wbits=e,Jc(n))},eu=(n,e)=>{if(!n)return It;const t=new vp;n.state=t,t.strm=n,t.window=null,t.mode=ta;const i=Qc(n,e);return i!==Yn&&(n.state=null),i},xp=n=>eu(n,_p);let tu=!0,Hs,Gs;const Mp=n=>{if(tu){Hs=new Int32Array(512),Gs=new Int32Array(32);let e=0;for(;e<144;)n.lens[e++]=8;for(;e<256;)n.lens[e++]=9;for(;e<280;)n.lens[e++]=7;for(;e<288;)n.lens[e++]=8;for(_r(Sc,n.lens,0,288,Hs,0,n.work,{bits:9}),e=0;e<32;)n.lens[e++]=5;_r(Ec,n.lens,0,32,Gs,0,n.work,{bits:5}),tu=!1}n.lencode=Hs,n.lenbits=9,n.distcode=Gs,n.distbits=5},nu=(n,e,t,i)=>{let r;const a=n.state;return a.window===null&&(a.window=new Uint8Array(1<<a.wbits)),a.wsize===0&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0),i>=a.wsize?(a.window.set(e.subarray(t-a.wsize,t),0),a.wnext=0,a.whave=a.wsize):(r=a.wsize-a.wnext,r>i&&(r=i),a.window.set(e.subarray(t-i,t-i+r),a.wnext),i-=r,i?(a.window.set(e.subarray(t-i,t),0),a.wnext=i,a.whave=a.wsize):(a.wnext+=r,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=r))),0},Sp=(n,e)=>{let t,i,r,a,s,l,c,o,u,d,h,f,m,S,v=0,p,x,g,_,A,R,T,D;const w=new Uint8Array(4);let C,F;const N=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(qn(n)||!n.output||!n.input&&n.avail_in!==0)return It;t=n.state,t.mode===ln&&(t.mode=ks),s=n.next_out,r=n.output,c=n.avail_out,a=n.next_in,i=n.input,l=n.avail_in,o=t.hold,u=t.bits,d=l,h=c,D=Yn;e:for(;;)switch(t.mode){case ta:if(t.wrap===0){t.mode=ks;break}for(;u<16;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(t.wrap&2&&o===35615){t.wbits===0&&(t.wbits=15),t.check=0,w[0]=o&255,w[1]=o>>>8&255,t.check=at(t.check,w,2,0),o=0,u=0,t.mode=Ac;break}if(t.head&&(t.head.done=!1),!(t.wrap&1)||(((o&255)<<8)+(o>>8))%31){n.msg="incorrect header check",t.mode=qe;break}if((o&15)!==wc){n.msg="unknown compression method",t.mode=qe;break}if(o>>>=4,u-=4,T=(o&15)+8,t.wbits===0&&(t.wbits=T),T>15||T>t.wbits){n.msg="invalid window size",t.mode=qe;break}t.dmax=1<<t.wbits,t.flags=0,n.adler=t.check=1,t.mode=o&512?Nc:ln,o=0,u=0;break;case Ac:for(;u<16;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(t.flags=o,(t.flags&255)!==wc){n.msg="unknown compression method",t.mode=qe;break}if(t.flags&57344){n.msg="unknown header flags set",t.mode=qe;break}t.head&&(t.head.text=o>>8&1),t.flags&512&&t.wrap&4&&(w[0]=o&255,w[1]=o>>>8&255,t.check=at(t.check,w,2,0)),o=0,u=0,t.mode=Rc;case Rc:for(;u<32;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.head&&(t.head.time=o),t.flags&512&&t.wrap&4&&(w[0]=o&255,w[1]=o>>>8&255,w[2]=o>>>16&255,w[3]=o>>>24&255,t.check=at(t.check,w,4,0)),o=0,u=0,t.mode=Cc;case Cc:for(;u<16;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.head&&(t.head.xflags=o&255,t.head.os=o>>8),t.flags&512&&t.wrap&4&&(w[0]=o&255,w[1]=o>>>8&255,t.check=at(t.check,w,2,0)),o=0,u=0,t.mode=Lc;case Lc:if(t.flags&1024){for(;u<16;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.length=o,t.head&&(t.head.extra_len=o),t.flags&512&&t.wrap&4&&(w[0]=o&255,w[1]=o>>>8&255,t.check=at(t.check,w,2,0)),o=0,u=0}else t.head&&(t.head.extra=null);t.mode=Pc;case Pc:if(t.flags&1024&&(f=t.length,f>l&&(f=l),f&&(t.head&&(T=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(i.subarray(a,a+f),T)),t.flags&512&&t.wrap&4&&(t.check=at(t.check,i,f,a)),l-=f,a+=f,t.length-=f),t.length))break e;t.length=0,t.mode=Ic;case Ic:if(t.flags&2048){if(l===0)break e;f=0;do T=i[a+f++],t.head&&T&&t.length<65536&&(t.head.name+=String.fromCharCode(T));while(T&&f<l);if(t.flags&512&&t.wrap&4&&(t.check=at(t.check,i,f,a)),l-=f,a+=f,T)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=Uc;case Uc:if(t.flags&4096){if(l===0)break e;f=0;do T=i[a+f++],t.head&&T&&t.length<65536&&(t.head.comment+=String.fromCharCode(T));while(T&&f<l);if(t.flags&512&&t.wrap&4&&(t.check=at(t.check,i,f,a)),l-=f,a+=f,T)break e}else t.head&&(t.head.comment=null);t.mode=Dc;case Dc:if(t.flags&512){for(;u<16;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(t.wrap&4&&o!==(t.check&65535)){n.msg="header crc mismatch",t.mode=qe;break}o=0,u=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),n.adler=t.check=0,t.mode=ln;break;case Nc:for(;u<32;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}n.adler=t.check=Kc(o),o=0,u=0,t.mode=na;case na:if(t.havedict===0)return n.next_out=s,n.avail_out=c,n.next_in=a,n.avail_in=l,t.hold=o,t.bits=u,fp;n.adler=t.check=1,t.mode=ln;case ln:if(e===hp||e===ea)break e;case ks:if(t.last){o>>>=u&7,u-=u&7,t.mode=zs;break}for(;u<3;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}switch(t.last=o&1,o>>>=1,u-=1,o&3){case 0:t.mode=Oc;break;case 1:if(Mp(t),t.mode=ia,e===ea){o>>>=2,u-=2;break e}break;case 2:t.mode=kc;break;case 3:n.msg="invalid block type",t.mode=qe}o>>>=2,u-=2;break;case Oc:for(o>>>=u&7,u-=u&7;u<32;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if((o&65535)!==(o>>>16^65535)){n.msg="invalid stored block lengths",t.mode=qe;break}if(t.length=o&65535,o=0,u=0,t.mode=Bs,e===ea)break e;case Bs:t.mode=Fc;case Fc:if(f=t.length,f){if(f>l&&(f=l),f>c&&(f=c),f===0)break e;r.set(i.subarray(a,a+f),s),l-=f,a+=f,c-=f,s+=f,t.length-=f;break}t.mode=ln;break;case kc:for(;u<14;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(t.nlen=(o&31)+257,o>>>=5,u-=5,t.ndist=(o&31)+1,o>>>=5,u-=5,t.ncode=(o&15)+4,o>>>=4,u-=4,t.nlen>286||t.ndist>30){n.msg="too many length or distance symbols",t.mode=qe;break}t.have=0,t.mode=Bc;case Bc:for(;t.have<t.ncode;){for(;u<3;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.lens[N[t.have++]]=o&7,o>>>=3,u-=3}for(;t.have<19;)t.lens[N[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,C={bits:t.lenbits},D=_r(up,t.lens,0,19,t.lencode,0,t.work,C),t.lenbits=C.bits,D){n.msg="invalid code lengths set",t.mode=qe;break}t.have=0,t.mode=zc;case zc:for(;t.have<t.nlen+t.ndist;){for(;v=t.lencode[o&(1<<t.lenbits)-1],p=v>>>24,x=v>>>16&255,g=v&65535,!(p<=u);){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(g<16)o>>>=p,u-=p,t.lens[t.have++]=g;else{if(g===16){for(F=p+2;u<F;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(o>>>=p,u-=p,t.have===0){n.msg="invalid bit length repeat",t.mode=qe;break}T=t.lens[t.have-1],f=3+(o&3),o>>>=2,u-=2}else if(g===17){for(F=p+3;u<F;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}o>>>=p,u-=p,T=0,f=3+(o&7),o>>>=3,u-=3}else{for(F=p+7;u<F;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}o>>>=p,u-=p,T=0,f=11+(o&127),o>>>=7,u-=7}if(t.have+f>t.nlen+t.ndist){n.msg="invalid bit length repeat",t.mode=qe;break}for(;f--;)t.lens[t.have++]=T}}if(t.mode===qe)break;if(t.lens[256]===0){n.msg="invalid code -- missing end-of-block",t.mode=qe;break}if(t.lenbits=9,C={bits:t.lenbits},D=_r(Sc,t.lens,0,t.nlen,t.lencode,0,t.work,C),t.lenbits=C.bits,D){n.msg="invalid literal/lengths set",t.mode=qe;break}if(t.distbits=6,t.distcode=t.distdyn,C={bits:t.distbits},D=_r(Ec,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,C),t.distbits=C.bits,D){n.msg="invalid distances set",t.mode=qe;break}if(t.mode=ia,e===ea)break e;case ia:t.mode=ra;case ra:if(l>=6&&c>=258){n.next_out=s,n.avail_out=c,n.next_in=a,n.avail_in=l,t.hold=o,t.bits=u,ap(n,h),s=n.next_out,r=n.output,c=n.avail_out,a=n.next_in,i=n.input,l=n.avail_in,o=t.hold,u=t.bits,t.mode===ln&&(t.back=-1);break}for(t.back=0;v=t.lencode[o&(1<<t.lenbits)-1],p=v>>>24,x=v>>>16&255,g=v&65535,!(p<=u);){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(x&&!(x&240)){for(_=p,A=x,R=g;v=t.lencode[R+((o&(1<<_+A)-1)>>_)],p=v>>>24,x=v>>>16&255,g=v&65535,!(_+p<=u);){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}o>>>=_,u-=_,t.back+=_}if(o>>>=p,u-=p,t.back+=p,t.length=g,x===0){t.mode=Xc;break}if(x&32){t.back=-1,t.mode=ln;break}if(x&64){n.msg="invalid literal/length code",t.mode=qe;break}t.extra=x&15,t.mode=Hc;case Hc:if(t.extra){for(F=t.extra;u<F;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.length+=o&(1<<t.extra)-1,o>>>=t.extra,u-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=Gc;case Gc:for(;v=t.distcode[o&(1<<t.distbits)-1],p=v>>>24,x=v>>>16&255,g=v&65535,!(p<=u);){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(!(x&240)){for(_=p,A=x,R=g;v=t.distcode[R+((o&(1<<_+A)-1)>>_)],p=v>>>24,x=v>>>16&255,g=v&65535,!(_+p<=u);){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}o>>>=_,u-=_,t.back+=_}if(o>>>=p,u-=p,t.back+=p,x&64){n.msg="invalid distance code",t.mode=qe;break}t.offset=g,t.extra=x&15,t.mode=Vc;case Vc:if(t.extra){for(F=t.extra;u<F;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}t.offset+=o&(1<<t.extra)-1,o>>>=t.extra,u-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){n.msg="invalid distance too far back",t.mode=qe;break}t.mode=Wc;case Wc:if(c===0)break e;if(f=h-c,t.offset>f){if(f=t.offset-f,f>t.whave&&t.sane){n.msg="invalid distance too far back",t.mode=qe;break}f>t.wnext?(f-=t.wnext,m=t.wsize-f):m=t.wnext-f,f>t.length&&(f=t.length),S=t.window}else S=r,m=s-t.offset,f=t.length;f>c&&(f=c),c-=f,t.length-=f;do r[s++]=S[m++];while(--f);t.length===0&&(t.mode=ra);break;case Xc:if(c===0)break e;r[s++]=t.length,c--,t.mode=ra;break;case zs:if(t.wrap){for(;u<32;){if(l===0)break e;l--,o|=i[a++]<<u,u+=8}if(h-=c,n.total_out+=h,t.total+=h,t.wrap&4&&h&&(n.adler=t.check=t.flags?at(t.check,r,h,s-h):or(t.check,r,h,s-h)),h=c,t.wrap&4&&(t.flags?o:Kc(o))!==t.check){n.msg="incorrect data check",t.mode=qe;break}o=0,u=0}t.mode=Yc;case Yc:if(t.wrap&&t.flags){for(;u<32;){if(l===0)break e;l--,o+=i[a++]<<u,u+=8}if(t.wrap&4&&o!==(t.total&4294967295)){n.msg="incorrect length check",t.mode=qe;break}o=0,u=0}t.mode=qc;case qc:D=dp;break e;case qe:D=bc;break e;case jc:return Tc;case Zc:default:return It}return n.next_out=s,n.avail_out=c,n.next_in=a,n.avail_in=l,t.hold=o,t.bits=u,(t.wsize||h!==n.avail_out&&t.mode<qe&&(t.mode<zs||e!==yc))&&nu(n,n.output,n.next_out,h-n.avail_out),d-=n.avail_in,h-=n.avail_out,n.total_in+=d,n.total_out+=h,t.total+=h,t.wrap&4&&h&&(n.adler=t.check=t.flags?at(t.check,r,h,n.next_out-h):or(t.check,r,h,n.next_out-h)),n.data_type=t.bits+(t.last?64:0)+(t.mode===ln?128:0)+(t.mode===ia||t.mode===Bs?256:0),(d===0&&h===0||e===yc)&&D===Yn&&(D=pp),D},Ep=n=>{if(qn(n))return It;let e=n.state;return e.window&&(e.window=null),n.state=null,Yn},yp=(n,e)=>{if(qn(n))return It;const t=n.state;return t.wrap&2?(t.head=e,e.done=!1,Yn):It},bp=(n,e)=>{const t=e.length;let i,r,a;return qn(n)||(i=n.state,i.wrap!==0&&i.mode!==na)?It:i.mode===na&&(r=1,r=or(r,e,t,0),r!==i.check)?bc:(a=nu(n,e,t,t),a?(i.mode=jc,Tc):(i.havedict=1,Yn))};var Tp=Jc,wp=Qc,Ap=$c,Rp=xp,Cp=eu,Lp=Sp,Pp=Ep,Ip=yp,Up=bp,Dp="pako inflate (from Nodeca project)",Qt={inflateReset:Tp,inflateReset2:wp,inflateResetKeep:Ap,inflateInit:Rp,inflateInit2:Cp,inflate:Lp,inflateEnd:Pp,inflateGetHeader:Ip,inflateSetDictionary:Up,inflateInfo:Dp};function Np(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}var Op=Np;const iu=Object.prototype.toString,{Z_NO_FLUSH:Fp,Z_FINISH:ru,Z_OK:Ei,Z_STREAM_END:Vs,Z_NEED_DICT:Ws,Z_STREAM_ERROR:kp,Z_DATA_ERROR:au,Z_MEM_ERROR:Bp,Z_BUF_ERROR:su}=lr,zp={chunkSize:1024*64,windowBits:15,to:""};function vr(n){this.options=$r.assign({},zp,n||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,e.windowBits===0&&(e.windowBits=-15)),e.windowBits>=0&&e.windowBits<16&&!(n&&n.windowBits)&&(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&(e.windowBits&15||(e.windowBits|=15)),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new mc,this.strm.avail_out=0;let t=Qt.inflateInit2(this.strm,e.windowBits);if(t!==Ei)throw new Error(Hn[t]);if(this.header=new Op,Qt.inflateGetHeader(this.strm,this.header),e.dictionary&&(typeof e.dictionary=="string"?e.dictionary=mr.string2buf(e.dictionary):iu.call(e.dictionary)==="[object ArrayBuffer]"&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(t=Qt.inflateSetDictionary(this.strm,e.dictionary),t!==Ei)))throw new Error(Hn[t])}vr.prototype.push=function(n,e){const t=this.strm,i=this.options.chunkSize,r=this.options.dictionary;let a,s,l;if(this.ended)return!1;for(e===~~e?s=e:s=e===!0?ru:Fp,iu.call(n)==="[object ArrayBuffer]"?t.input=new Uint8Array(n):t.input=n,t.next_in=0,t.avail_in=t.input.length;;){for(t.avail_out===0&&(t.output=new Uint8Array(i),t.next_out=0,t.avail_out=i),a=Qt.inflate(t,s),a===Ws&&r&&(a=Qt.inflateSetDictionary(t,r),a===Ei?a=Qt.inflate(t,s):a===au&&(a=Ws));t.avail_in>0&&a===Vs&&t.state.wrap&2&&t.state.flags!==0&&t.input[t.next_in]!==0;)Qt.inflateReset(t),a=Qt.inflate(t,s);switch(a){case kp:case au:case Ws:case Bp:return this.onEnd(a),this.ended=!0,!1}if(l=t.avail_out,t.next_out&&(t.avail_out===0||a===Vs||s>0))if(this.options.to==="string"){let c=mr.utf8border(t.output,t.next_out),o=t.next_out-c,u=mr.buf2string(t.output,c);t.next_out=o,t.avail_out=i-o,o&&t.output.set(t.output.subarray(c,c+o),0),this.onData(u)}else this.onData(t.output.length===t.next_out?t.output:t.output.subarray(0,t.next_out)),t.avail_out=0,t.next_out=0;if(!((a===Ei||a===su)&&l===0)){if(a===Vs)return a=Qt.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,!0;if(t.avail_in===0){if(s===ru)return a=Qt.inflateEnd(this.strm),this.onEnd(a===Ei?su:a),this.ended=!0,!1;break}}}return!0},vr.prototype.onData=function(n){this.chunks.push(n)},vr.prototype.onEnd=function(n){n===Ei&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=$r.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg};function Xs(n,e){const t=new vr(e);if(t.push(n,!0),t.err)throw t.msg||Hn[t.err];return t.result}function Hp(n,e){return e=e||{},e.raw=!0,Xs(n,e)}var Gp=vr,Vp=Xs,Wp=Hp,Xp=Xs,Yp={Inflate:Gp,inflate:Vp,inflateRaw:Wp,ungzip:Xp};const{Deflate:qp,deflate:jp,deflateRaw:Zp,gzip:Kp}=ip,{Inflate:$p,inflate:Jp,inflateRaw:Qp,ungzip:em}=Yp;var tm=qp,nm=jp,im=Zp,rm=Kp,am=$p,sm=Jp,om=Qp,lm=em,cm=lr,um={Deflate:tm,deflate:nm,deflateRaw:im,gzip:rm,Inflate:am,inflate:sm,inflateRaw:om,ungzip:lm,constants:cm};const aa=" .`'\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",sa=aa.length,hm=aa.split("");function dm(n,e){const t=Math.pow(n/255,e),i=Math.floor(t*(sa-1));return i<0?0:i>sa-1?sa-1:i}function ou(n){let e=n>>>0||2654435769;return function(){return e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296}}function oa(n,e){let t=Math.imul(n|0,374761393)+Math.imul(e|0,668265263)|0;return t=Math.imul(t^t>>>13,1274126177),((t^t>>>16)>>>0)/4294967296}function Mt(n,e,t){return n<e?e:n>t?t:n}const St={welcomeDone:!1,fxEnabled:!0,read:null};function fm(){let n=null,e=-1,t=0;return function(r,a){r!==n&&(n=r,e=-1);const s=r.currentTime;s!==e&&(e=s,t=a);const l=Math.max(0,Math.min(100,a-t));return s*1e3+l}}const lu=["kick","bass","mid","hi"],cu="assets/beatmaps/",pm=1,uu=250,mm=20;function gm(n){return String(n||"").replace(/^.*\//,"").replace(/\.[^.]+$/,"")}const la=new Map;function ca(n,e){const t=Array.isArray(n)?Math.floor(n.length/e):0,i=new Int32Array(t),r=new Uint8Array(t),a=e===3?new Uint16Array(t):null;for(let s=0;s<t;s++)i[s]=n[s*e],r[s]=n[s*e+1],a&&(a[s]=n[s*e+2]);return{t:i,s:r,d:a,n:t}}function _m(n){return!n||n.v!==pm?null:{dur:n.dur|0,kick:ca(n.kick,2),bass:ca(n.bass,3),mid:ca(n.mid,2),hi:ca(n.hi,2)}}function Ys(n){let e=la.get(n);return e||(e={map:void 0,error:null,promise:null},e.promise=fetch(cu+encodeURIComponent(n)+".json").then(t=>{if(!t.ok)throw new Error("HTTP "+t.status);return t.json()}).then(t=>{if(e.map=_m(t),!e.map)throw new Error("formato de mapa no valido");return e.error=null,e.map}).catch(t=>(e.map=null,e.error=String(t&&t.message||t),console.warn('[beat-fx] sin mapa de ritmo para "'+n+'" ('+e.error+"): "+cu+n+".json. Sin el no hay efectos."),null)),la.set(n,e)),e.promise}function vm(n){const e=la.get(n);return e?e.map?"ok":e.error?"sin mapa ("+e.error+")":"cargando":"sin pedir"}function xm(n){const e=la.get(n);return e?e.map:void 0}function Mm(n,e,t){let i=0,r=e;for(;i<r;){const a=i+r>>1;n[a]<t?i=a+1:r=a}return i}class Sm{constructor(e){this.emit=e,this.key=null,this.map=null,this.cursor=[0,0,0,0],this.lastMs=-1,this.fired=[0,0,0,0]}reset(){this.key=null,this.map=null,this.lastMs=-1}update(e){if(!e){this.reset();return}if(e.key!==this.key&&(this.key=e.key,this.map=null,this.lastMs=-1),!this.map){const i=xm(e.key);if(i===void 0&&Ys(e.key),!i)return;this.map=i,this.lastMs=-1}const t=e.ms+mm;if(this.lastMs<0||t<this.lastMs-120||t>this.lastMs+800)for(let i=0;i<4;i++){const r=this.map[lu[i]];this.cursor[i]=Mm(r.t,r.n,t-uu)}this.lastMs=t;for(let i=0;i<4;i++){const r=this.map[lu[i]];let a=this.cursor[i];for(;a<r.n&&r.t[a]<=t;){const s=t-r.t[a];s<=uu&&(this.fired[i]++,this.emit(i,r.s[a]/100,r.d?r.d[a]:0,s)),a++}this.cursor[i]=a}}}const nt={KICK:1,BASS:2,MID:3,HI:4},Bt={base:[232,232,230],baseAlpha:.62,color:{[nt.KICK]:[255,150,118],[nt.BASS]:[236,112,74],[nt.MID]:[255,236,208],[nt.HI]:[255,255,255]},density:{[nt.KICK]:9,[nt.BASS]:14,[nt.MID]:7,[nt.HI]:0},levels:4,kickLifeMs:950,bassLifeMs:[700,1700],midLifeMs:480,hiLifeMs:[140,240]},hu=5,du=3,fu=3,xr=160,ua=5,Em=aa.indexOf("*"),ha=aa.indexOf("+");function ym(){const n=Bt.levels,[e,t,i]=Bt.base,r=new Array(5*(n+1));r[0]=`rgba(${e},${t},${i},${Bt.baseAlpha})`;for(let a=1;a<=4;a++){const[s,l,c]=Bt.color[a];for(let o=1;o<=n;o++){const u=o/n,d=.35+.65*u,h=.7+.3*u;r[a*(n+1)+o]=`rgba(${Math.round(e+(s-e)*d)},${Math.round(t+(l-t)*d)},${Math.round(i+(c-i)*d)},${h.toFixed(2)})`}}return r}function qs(n){const e=Bt.levels,t=1+(n*e|0);return t>e?e:t<1?1:t}class bm{constructor(){this.rng=ou(48807),this.enabled=!0,this.calm=!1,this.ripples=[],this.tides=[],this.sweeps=[],this.sparks=[],this.sweepDir=1,this.W=0,this.H=0,this.cellPx=0,this.now=0,this.cx=0,this.cy=0,this.R=1,this.nR=0,this.nT=0,this.nS=0,this.rp=new Float32Array(hu*4),this.tp=new Float32Array(du*3),this.sp=new Float32Array(fu*5),this.tidePhase=0,this.boost=0,this.lane=0,this.ghost=0,this.dx=0,this.dy=0,this.scr=0,this.nSparkOps=0,this.spX=new Float32Array(xr*ua),this.spY=new Float32Array(xr*ua),this.spCh=new Uint8Array(xr*ua),this.spLv=new Uint8Array(xr*ua)}get active(){return this.ripples.length+this.tides.length+this.sweeps.length+this.sparks.length>0}clear(){this.ripples.length=this.tides.length=this.sweeps.length=this.sparks.length=0,this.nR=this.nT=this.nS=this.nSparkOps=0}spawn(e,t,i,r){if(!this.enabled)return;const a=Mt(t,.05,1);if(e===nt.KICK)da(this.ripples,hu,{t0:r,s:a,life:Bt.kickLifeMs});else if(e===nt.BASS){const[s,l]=Bt.bassLifeMs;da(this.tides,du,{t0:r,s:a,life:Mt(s+i*.8,s,l)})}else if(e===nt.MID)this.sweepDir=-this.sweepDir,da(this.sweeps,fu,{t0:r,s:a,life:Bt.midLifeMs,dir:this.sweepDir});else if(e===nt.HI){const[s,l]=Bt.hiLifeMs,c=Math.round((8+26*a)*(this.calm?.5:1));for(let o=0;o<c;o++)da(this.sparks,xr,{t0:r,s:a,life:s+this.rng()*(l-s),u:this.rng(),v:this.rng()})}}frame(e,t,i,r){this.now=e,this.W=t,this.H=i,this.cellPx=r,this.cx=t/2,this.cy=i/2,this.R=Math.max(1,Math.hypot(t,i)/2);const a=this.R;fa(this.ripples,e),fa(this.tides,e),fa(this.sweeps,e),fa(this.sparks,e),this.nR=this.ripples.length;for(let l=0;l<this.nR;l++){const c=this.ripples[l],o=Mt((e-c.t0)/c.life,0,1),u=1-Math.pow(1-o,3),d=l*4;this.rp[d]=a*1.12*u,this.rp[d+1]=Math.max(r*3,a*(.045+.02*o)),this.rp[d+2]=Math.max(r*6,a*(.2+.1*o)),this.rp[d+3]=Math.pow(1-o,1.3)*(.5+.5*c.s)}this.nT=this.tides.length,this.tidePhase=e*.006;for(let l=0;l<this.nT;l++){const c=this.tides[l],o=Mt((e-c.t0)/c.life,0,1),u=i*.14*(.8+.4*c.s),d=.5-.5*Math.cos(Math.PI*o),h=l*3;this.tp[h]=i+u-(i+2*u)*d,this.tp[h+1]=u,this.tp[h+2]=Math.pow(Math.sin(Math.PI*o),.8)*(.55+.45*c.s)}this.nS=this.sweeps.length;for(let l=0;l<this.nS;l++){const c=this.sweeps[l],o=Mt((e-c.t0)/c.life,0,1),u=Math.pow(o,.85),d=l*5;this.sp[d]=c.dir>0?-.1*t+1.2*t*u:1.1*t-1.2*t*u,this.sp[d+1]=c.dir,this.sp[d+2]=Math.max(r*2,t*.012),this.sp[d+3]=Math.max(r*6,t*.13),this.sp[d+4]=(1-o*.6)*(.55+.45*c.s)}let s=0;for(let l=0;l<this.sparks.length;l++){const c=this.sparks[l],o=(e-c.t0)/c.life;if(o<0||o>=1)continue;const u=1-o,d=Math.floor(c.u*t/r)*r,h=Math.floor(c.v*i/r)*r,f=qs(u*(.6+.4*c.s));if(this.spX[s]=d,this.spY[s]=h,this.spCh[s]=Em,this.spLv[s]=f,s++,u>.5){const m=Math.max(1,f-1);this.spX[s]=d-r,this.spY[s]=h,this.spCh[s]=ha,this.spLv[s]=m,s++,this.spX[s]=d+r,this.spY[s]=h,this.spCh[s]=ha,this.spLv[s]=m,s++,this.spX[s]=d,this.spY[s]=h-r,this.spCh[s]=ha,this.spLv[s]=m,s++,this.spX[s]=d,this.spY[s]=h+r,this.spCh[s]=ha,this.spLv[s]=m,s++}}this.nSparkOps=s}cell(e,t,i,r){this.boost=0,this.lane=0,this.ghost=0,this.dx=0,this.dy=0,this.scr=0;const a=this.cellPx*.5,s=e+a,l=t+a;let c=0,o=0,u=0;if(this.nR){const d=s-this.cx,h=l-this.cy,f=Math.sqrt(d*d+h*h);let m=0;for(let v=0;v<this.nR;v++){const p=v*4,x=f-this.rp[p],g=x>0?1-x/this.rp[p+1]:1+x/this.rp[p+2];if(g>0){const _=g*this.rp[p+3];_>m&&(m=_)}}const S=.28+.72*m;m>.02&&(this.calm?oa(i,r):this.rng())<S&&(c=m,o=nt.KICK)}if(this.nT){let d=0;for(let h=0;h<this.nT;h++){const f=h*3,m=l-this.tp[f],S=this.tp[f+1];if(m>-S&&m<S){const v=(.5+.5*Math.cos(Math.PI*m/S))*this.tp[f+2];v>d&&(d=v)}}d>.02&&(this.dx+=Math.sin(l*.045+this.tidePhase)*this.cellPx*.6*d,this.dy-=this.cellPx*.35*d,u=d,d>c&&(c=d,o=nt.BASS))}if(this.nS){let d=0;for(let h=0;h<this.nS;h++){const f=h*5,m=(s-this.sp[f])*this.sp[f+1],S=m>0?1-m/this.sp[f+2]:1+m/this.sp[f+3];if(S>0){const v=S*this.sp[f+4];v>d&&(d=v)}}d>.03&&(this.calm?oa(i+31,r):this.rng())<.35+.65*d&&(this.scr=1,this.dy+=(i&1?1:-1)*this.cellPx*.45*d,d>c&&(c=d,o=nt.MID))}this.boost=c,this.lane=o,o===nt.KICK||o===nt.MID?this.ghost=(this.calm?oa(i+7,r):this.rng())<.42?c:0:o===nt.BASS&&(this.ghost=oa(i,r)<u*.45?u:0)}}function da(n,e,t){n.length>=e&&n.shift(),n.push(t)}function fa(n,e){let t=0;for(let i=0;i<n.length;i++){const r=n[i];e-r.t0<r.life&&(n[t++]=r)}n.length=t}const pu="DouxSommeil",mu="1550490712",Tm=8,gu=20,bn=5,wm=[64,64,68,.95],Am=[176,176,180,.38],Rm=2,Cm=2,Lm=1500,js=40,Pm="'Cormorant Garamond', Georgia, serif",Im="'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";function Um(){try{return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}catch{return!1}}function _u(n,e,t,i){const r=document.createElement("canvas");r.width=n.width,r.height=n.height;const a=r.getContext("2d");if(a.drawImage(n,0,0),a.globalCompositeOperation="source-in",a.fillStyle=`rgba(${e[0]},${e[1]},${e[2]},${e[3]})`,a.fillRect(0,0,r.width,r.height),!t&&!i)return r;const s=document.createElement("canvas");return s.width=n.width,s.height=n.height,s.getContext("2d").drawImage(r,t,i),s}class Dm{constructor(){this.dx=0,this.dy=0,this.invalidate()}invalidate(){this.box=null,this.grid=null,this.inkLayer=null,this.lightLayer=null,this.mixLayer=null,this.revealT0=-1e9}release(){this.invalidate()}get active(){return this.grid!==null}ensure(e,t,i){this.box&&this.box.w===e&&this.box.h===t||this.layout(e,t,i)}layout(e,t,i){this.invalidate(),this.box={w:e,h:t};try{const r=Math.round(Math.max(34,Math.min(e*.075,t*.16))),a=Math.round(r*.42),s=Math.round(r*.2),l=Math.round(t*.16),c=document.createElement("canvas");c.width=e,c.height=t;const o=c.getContext("2d",{willReadFrequently:!0});o.textBaseline="top",o.fillStyle="#fff",o.font="italic 500 "+r+"px "+Pm;const u=Math.round((e-o.measureText(pu).width)/2);o.fillText(pu,u,l);const d=l+Math.round(r*.95)+s;o.font=a+"px "+Im;const h=Math.round((e-o.measureText(mu).width)/2);o.fillText(mu,h,d);const f=Math.ceil(e/bn),m=Math.ceil(t/bn),S=o.getImageData(0,0,e,t).data,v=new Uint8Array(f*m);let p=0;for(let w=0;w<t;w++){const C=(w/bn|0)*f,F=w*e;for(let N=0;N<e;N++)if(S[(F+N)*4+3]>40){const q=C+(N/bn|0);v[q]||(v[q]=1,p++)}}if(p===0)return;const g=new Float64Array(f*m).fill(1e9),_=new Float64Array(f*m),A=new Float64Array(f*m);for(let w=0;w<f*m;w++)v[w]&&(g[w]=0);const R=(w,C,F)=>{const N=C*f+w;if(g[N]!==0)for(let q=0;q<F.length;q++){const B=w+F[q][0],X=C+F[q][1];if(B<0||X<0||B>=f||X>=m)continue;const j=g[X*f+B]+F[q][2];if(j<g[N]){g[N]=j;const Q=1/F[q][2];_[N]=F[q][0]*Q,A[N]=F[q][1]*Q}}},T=[[-1,0,1],[0,-1,1],[-1,-1,1.4142],[1,-1,1.4142]];for(let w=0;w<m;w++)for(let C=0;C<f;C++)R(C,w,T);const D=[[1,0,1],[0,1,1],[1,1,1.4142],[-1,1,1.4142]];for(let w=m-1;w>=0;w--)for(let C=f-1;C>=0;C--)R(C,w,D);this.lightLayer=_u(c,Am,Rm,Cm),this.inkLayer=_u(c,wm,0,0),this.mixLayer=document.createElement("canvas"),this.mixLayer.width=e,this.mixLayer.height=t,this.grid={gw:f,gh:m,dist:g,dirX:_,dirY:A},this.revealT0=Um()?-1e9:i}catch{this.grid=null,this.inkLayer=this.lightLayer=this.mixLayer=null}}revealX(e,t){return this.grid?t*Mt((e-this.revealT0)/Lm,0,1):null}_index(e,t){const i=this.grid,r=Mt(e/bn|0,0,i.gw-1);return Mt(t/bn|0,0,i.gh-1)*i.gw+r}test(e,t,i,r,a){this.dx=0,this.dy=0;const s=this.grid;if(!s)return!0;let l=1;if(r!==null&&(l=Mt((r+js-e)/js,0,1)),!(l>0&&(l>=1||a()<l)))return!0;const c=this._index(e,t),o=s.dist[c]*bn;if(o<=Tm)return!1;const u=Math.abs(s.dirX[c])+Math.abs(s.dirY[c]),d=gu+Math.ceil(i*1.3*u)-o;if(d>0){const h=e-s.dirX[c]*d,f=t-s.dirY[c]*d,m=this._index(h,f),S=Math.abs(s.dirX[m])+Math.abs(s.dirY[m]);if(s.dist[m]*bn<gu+Math.ceil(i*1.3*S))return!1;this.dx=(h-e)*l,this.dy=(f-t)*l}return!0}drawFill(e,t,i,r){if(!this.inkLayer||!this.lightLayer||r===null)return;if(r>=t-1){e.drawImage(this.lightLayer,0,0),e.drawImage(this.inkLayer,0,0);return}const a=this.mixLayer;if(!a)return;const s=a.getContext("2d");s.globalCompositeOperation="source-over",s.clearRect(0,0,t,i),s.drawImage(this.lightLayer,0,0),s.drawImage(this.inkLayer,0,0);const l=Math.max(1,r+js),c=s.createLinearGradient(0,0,l,0);c.addColorStop(0,"rgba(0,0,0,1)"),c.addColorStop(Mt(r/l,0,1),"rgba(0,0,0,1)"),c.addColorStop(1,"rgba(0,0,0,0)"),s.globalCompositeOperation="destination-in",s.fillStyle=c,s.fillRect(0,0,l,i),s.globalCompositeOperation="source-over",e.drawImage(a,0,0)}}const vu=12;let pa=[];function Nm(n,e,t){if(n<t.x||n>t.x+t.w||e<t.y||e>t.y+t.h)return!1;const i=Math.min(t.r,t.w/2,t.h/2);if(n>=t.x+i&&n<=t.x+t.w-i||e>=t.y+i&&e<=t.y+t.h-i)return!0;const r=n<t.x+i?t.x+i:t.x+t.w-i,a=e<t.y+i?t.y+i:t.y+t.h-i,s=n-r,l=e-a;return s*s+l*l<=i*i}function Om(n,e,t){const i=vu,r=t.x-i,a=t.y-i,s=t.w+i*2,l=t.h+i*2;if(n<r||n>r+s||e<a||e>a+l)return!1;if(Nm(n,e,t))return!0;const c=Math.min(t.r+i,s/2,l/2);if(n>=r+c&&n<=r+s-c||e>=a+c&&e<=a+l-c)return!0;const o=n<r+c?r+c:r+s-c,u=e<a+c?a+c:a+l-c,d=n-o,h=e-u;return d*d+h*h<=c*c}function xu(n,e){const t=vu;for(let i=0;i<pa.length;i++){const r=pa[i];if(!(n<r.x-t||n>r.x+r.w+t||e<r.y-t||e>r.y+r.h+t)&&Om(n,e,r))return!0}return!1}function Fm(){return pa.length>0}function ma(){const n=[];try{const e=document.getElementById("ascii");if(e){const t=e.getBoundingClientRect(),i=(c,o)=>{if(!c)return;const u=window.getComputedStyle(c);if(u.display==="none"||u.visibility==="hidden"||u.opacity==="0")return;const d=c.getBoundingClientRect();d.width<4||d.height<4||n.push({x:d.left-t.left,y:d.top-t.top,w:d.width,h:d.height,r:o})},r=document.getElementById("dock");r&&(!r.classList.contains("show")||r.classList.contains("idle")||r.classList.contains("reveal-hidden"))||i(document.querySelector(".card"),16);const s=document.getElementById("spotifyPanel");s&&s.classList.contains("show")&&!s.classList.contains("idle")&&i(s.querySelector(".spotify-frame-wrap"),12);const l=document.getElementById("playGate");l&&!l.classList.contains("hidden")&&i(document.getElementById("playBtn"),48)}}catch{}pa=n}function yi(n){ma(),n>0&&setTimeout(ma,n)}const Mu="assets/ascii_data.bin.gz",km=2,Bm=30,zm=1,Hm=.38,Gm=14,Vm=250,ga=Bt.levels+1,_a=5*ga,Su=nt.HI*ga,Wm=ym(),Tn={nFrames:0,gridW:0,gridH:0,frames:null};let bi=null,zt=null,Ti=0,wi=0,st=10,Zs=0,Ks=0,va=0;const Ai=ou(12345),wn=new Dm,ze=new bm;let Eu=0;const jn=new Sm((n,e,t,i)=>{ze.spawn(n+1,e,t,Eu-i)}),We={cap:0,x:new Float32Array(0),y:new Float32Array(0),ch:new Uint8Array(0),style:new Uint8Array(0),order:new Uint32Array(0)},Zn=new Uint32Array(_a+1);function Xm(n,e){const t=n*e+800+64;t<=We.cap||(We.cap=t,We.x=new Float32Array(t),We.y=new Float32Array(t),We.ch=new Uint8Array(t),We.style=new Uint8Array(t),We.order=new Uint32Array(t))}async function Ym(n){n(.02);const e=await fetch(Mu);if(!e.ok)throw new Error("No se pudo cargar "+Mu+" (HTTP "+e.status+")");const t=Number(e.headers.get("content-length")||0);let i;if(e.body&&typeof e.body.getReader=="function"&&t>0){const u=e.body.getReader(),d=[];let h=0;for(;;){const m=await u.read();if(m.done)break;d.push(m.value),h+=m.value.length,n(.02+.7*Math.min(1,h/t))}i=new Uint8Array(h);let f=0;for(const m of d)i.set(m,f),f+=m.length}else i=new Uint8Array(await e.arrayBuffer()),n(.72);let r;if(typeof DecompressionStream!="undefined"){const u=new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"));r=await new Response(u).arrayBuffer()}else{const u=um.inflate(i);r=u.buffer.slice(u.byteOffset,u.byteOffset+u.byteLength)}n(.92);const a=new DataView(r);if(String.fromCharCode(a.getUint8(0),a.getUint8(1),a.getUint8(2),a.getUint8(3))!=="ASCV")throw new Error("Formato de datos invalido");const l=a.getUint32(4,!0),c=a.getUint32(8,!0),o=a.getUint32(12,!0);Tn.frames=new Uint8Array(r,16,l*c*o),Tn.nFrames=l,Tn.gridW=c,Tn.gridH=o,n(1)}function yu(){Ti=Math.max(1,window.innerWidth),wi=Math.max(1,window.innerHeight);const n=Math.min(window.devicePixelRatio||1,km);bi.width=Math.round(Ti*n),bi.height=Math.round(wi*n),bi.style.width=Ti+"px",bi.style.height=wi+"px",zt.setTransform(n,0,0,n,0,0),st=Math.max(Ti,wi)/Tn.gridW,Xm(Math.ceil(Ti/st)+2,Math.ceil(wi/st)+2),zt.font=`${Math.ceil(st*1.28)}px 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`,zt.textBaseline="top",ma()}function qm(n){const e=Ti,t=wi;zt.fillStyle="#000",zt.fillRect(0,0,e,t),St.welcomeDone?wn.release():wn.ensure(e,t,n);const i=wn.active,r=wn.revealX(n,e);let a=!1;try{Eu=n,St.fxEnabled?(jn.update(St.read?St.read(n):null),ze.frame(n,e,t,st),a=ze.active):ze.active&&(ze.clear(),jn.reset())}catch{ze.clear(),jn.reset()}const{gridW:s,gridH:l,frames:c}=Tn,o=Zs*s*l,u=Math.max(e,t),d=(e-u)/2,h=(t-u)/2,f=Math.floor(-d/st),m=Math.ceil((e-d)/st),S=Math.floor(-h/st),v=Math.ceil((t-h)/st),p=Fm(),x=sa-1;let g=0;for(let A=S;A<v;A++){const R=h+A*st;if(R<-st||R>t)continue;const T=Mt(A,0,l-1);for(let D=f;D<m;D++){const w=d+D*st;if(w<-st||w>e)continue;const C=Mt(D,0,s-1),F=c[o+T*s+C],N=F>=Gm;if(a&&ze.cell(w,R,D,A),!N&&!(a&&ze.ghost>0)||p&&xu(w,R))continue;let q=0,B=0;if(i){if(!wn.test(w,R,st,r,Ai))continue;q=wn.dx,B=wn.dy}let X,j;if(N){if(X=dm(F,zm),Ai()<Hm){const Q=(Ai()<.5?-1:1)*(1+Math.floor(Ai()*3));X=Mt(X+Q,1,x)}if(j=0,a&&ze.boost>0){const Q=ze.lane;ze.scr&&(X=Mt(X+Math.floor(Ai()*13)-6,1,x)),X=Math.min(x,X+Math.round(ze.boost*Bt.density[Q])),j=Q*ga+qs(ze.boost)}}else{const Q=ze.ghost;X=Math.min(x,6+Math.floor(Q*14)+Math.floor(Ai()*3)),j=ze.lane*ga+qs(Q*.85)}X<=0||(We.x[g]=w+q+(a?ze.dx:0),We.y[g]=R+B+(a?ze.dy:0),We.ch[g]=X,We.style[g]=j,g++)}}const _=g;if(a)for(let A=0;A<ze.nSparkOps&&g<We.cap;A++){const R=ze.spX[A],T=ze.spY[A];R<-st||R>e||T<-st||T>t||p&&xu(R,T)||(We.x[g]=R,We.y[g]=T,We.ch[g]=ze.spCh[A],We.style[g]=Su+ze.spLv[A],g++)}jm(g,_),i&&wn.drawFill(zt,e,t,r)}function jm(n,e){Zn.fill(0);for(let r=0;r<n;r++)Zn[We.style[r]+1]++;for(let r=0;r<_a;r++)Zn[r+1]+=Zn[r];const t=Zn.slice(0,_a);for(let r=0;r<n;r++)We.order[t[We.style[r]]++]=r;let i=!1;for(let r=0;r<_a;r++){const a=Zn[r],s=Zn[r+1];if(a!==s){if(r>=Su&&!i&&n>e){i=!0,zt.fillStyle="#000";for(let l=e;l<n;l++)zt.fillRect(We.x[l],We.y[l],st,st*1.3)}zt.fillStyle=Wm[r];for(let l=a;l<s;l++){const c=We.order[l];zt.fillText(hm[We.ch[c]],We.x[c],We.y[c])}}}}let $s=null,bu=0;function Zm(){const n=document.createElement("pre");return n.style.cssText="position:fixed;left:8px;bottom:8px;z-index:99999;margin:0;padding:6px 8px;font:11px/1.35 monospace;color:#9f9;background:rgba(0,0,0,.75);pointer-events:none;white-space:pre",document.body.appendChild(n),n}function Km(n){if(!$s||n<bu)return;bu=n+250;const e=St.read?St.read(n):null;$s.textContent="beat-fx  boton: "+(St.fxEnabled?"ON":"OFF")+"  modo: "+(ze.calm?"calmo (reduced-motion)":"completo")+`
audio:   `+(e?e.key+"  "+Math.round(e.ms)+" ms":"sin reproducir / pausado")+`
mapa:    `+(e?vm(e.key):"-")+`
disparados  kick `+jn.fired[0]+"  bass "+jn.fired[1]+"  mid "+jn.fired[2]+"  hi "+jn.fired[3]+`
activos     kick `+ze.ripples.length+"  bass "+ze.tides.length+"  mid "+ze.sweeps.length+"  hi "+ze.sparks.length}function Tu(n){if(requestAnimationFrame(Tu),!Tn.frames)return;va||(va=n);const e=Math.min(Vm,Math.max(0,n-va));va=n,Ks+=e;const t=1e3/Bm;for(;Ks>=t;)Ks-=t,Zs=(Zs+1)%Tn.nFrames;qm(n),Km(n)}async function $m(){bi=document.getElementById("ascii"),zt=bi.getContext("2d",{alpha:!1});const n=document.getElementById("loader"),e=document.getElementById("loaderFill");try{await Ym(t=>{e.style.width=Math.floor(t*100)+"%"})}catch(t){n.innerHTML='<div style="color:#c66">ERROR AL DECODIFICAR LOS DATOS</div>',console.error(t);return}try{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),i=/[?&]fx=full\b/.test(location.search),r=()=>{ze.calm=t.matches&&!i};r(),t.addEventListener?t.addEventListener("change",r):t.addListener&&t.addListener(r)}catch{}/[?&]fxdebug\b/.test(location.search)&&($s=Zm()),yu(),window.addEventListener("resize",yu),setInterval(ma,2e3),requestAnimationFrame(Tu),setTimeout(()=>n.classList.add("hidden"),220)}window.addEventListener("DOMContentLoaded",$m);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Js="169",wu=1,Jm=2,cn=3,An=0,Et=1,Kn=100,Qs=204,eo=205,Au=0,Qm=1,eg=2,Rn=0,tg=1,ng=2,ig=3,rg=4,ag=5,sg=6,og=7,Ru=300,Ri=301,Ci=302,to=303,no=304,xa=306,io=1e3,Mr=1001,ro=1002,Ut=1003,lg=1004,Ma=1005,Dt=1006,ao=1007,Li=1008,un=1009,Cu=1010,Lu=1011,Sr=1012,so=1013,$n=1014,hn=1015,Er=1016,oo=1017,lo=1018,Pi=1020,Pu=35902,Iu=1021,Uu=1022,Ht=1023,Du=1024,Nu=1025,yr=1026,Ii=1027,Ou=1028,co=1029,Fu=1030,uo=1031,ho=1033,Sa=33776,Ea=33777,ya=33778,ba=33779,fo=35840,po=35841,mo=35842,go=35843,_o=36196,vo=37492,xo=37496,Mo=37808,So=37809,Eo=37810,yo=37811,bo=37812,To=37813,wo=37814,Ao=37815,Ro=37816,Co=37817,Lo=37818,Po=37819,Io=37820,Uo=37821,Ta=36492,Do=36494,No=36495,ku=36283,Oo=36284,Fo=36285,ko=36286,Ui="",en="srgb",Cn="srgb-linear",Bo="display-p3",wa="display-p3-linear",Aa="linear",Xe="srgb",Ra="rec709",Ca="p3",Di=7680,Bu=515,zu=35044,Hu="300 es",Ni=2e3,La=2001;class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zo=Math.PI/180,Ho=180/Math.PI;function br(){const n=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return(ft[255&n]+ft[n>>8&255]+ft[n>>16&255]+ft[n>>24&255]+"-"+ft[255&e]+ft[e>>8&255]+"-"+ft[e>>16&15|64]+ft[e>>24&255]+"-"+ft[63&t|128]+ft[t>>8&255]+"-"+ft[t>>16&255]+ft[t>>24&255]+ft[255&i]+ft[i>>8&255]+ft[i>>16&255]+ft[i>>24&255]).toLowerCase()}function yt(n,e,t){return Math.max(e,Math.min(t,n))}function cg(n,e){return(n%e+e)%e}function Go(n,e,t){return(1-t)*n+t*e}function Tr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(4294967295*n);case Uint16Array:return Math.round(65535*n);case Uint8Array:return Math.round(255*n);case Int32Array:return Math.round(2147483647*n);case Int16Array:return Math.round(32767*n);case Int8Array:return Math.round(127*n);default:throw new Error("Invalid component type.")}}class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class be{constructor(e,t,i,r,a,s,l,c,o){be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,l,c,o)}set(e,t,i,r,a,s,l,c,o){const u=this.elements;return u[0]=e,u[1]=r,u[2]=l,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=s,u[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],l=i[3],c=i[6],o=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],S=r[0],v=r[3],p=r[6],x=r[1],g=r[4],_=r[7],A=r[2],R=r[5],T=r[8];return a[0]=s*S+l*x+c*A,a[3]=s*v+l*g+c*R,a[6]=s*p+l*_+c*T,a[1]=o*S+u*x+d*A,a[4]=o*v+u*g+d*R,a[7]=o*p+u*_+d*T,a[2]=h*S+f*x+m*A,a[5]=h*v+f*g+m*R,a[8]=h*p+f*_+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],l=e[5],c=e[6],o=e[7],u=e[8];return t*s*u-t*l*o-i*a*u+i*l*c+r*a*o-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],l=e[5],c=e[6],o=e[7],u=e[8],d=u*s-l*o,h=l*c-u*a,f=o*a-s*c,m=t*d+i*h+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/m;return e[0]=d*S,e[1]=(r*o-u*i)*S,e[2]=(l*i-r*s)*S,e[3]=h*S,e[4]=(u*t-r*c)*S,e[5]=(r*a-l*t)*S,e[6]=f*S,e[7]=(i*c-o*t)*S,e[8]=(s*t-i*a)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,l){const c=Math.cos(a),o=Math.sin(a);return this.set(i*c,i*o,-i*(c*s+o*l)+s+e,-r*o,r*c,-r*(-o*s+c*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Vo.makeScale(e,t)),this}rotate(e){return this.premultiply(Vo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vo=new be;function Gu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Pa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ug(){const n=Pa("canvas");return n.style.display="block",n}const Vu={};function Ia(n){n in Vu||(Vu[n]=!0,console.warn(n))}const Wu=new be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xu=new be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),wr={[Cn]:{transfer:Aa,primaries:Ra,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[en]:{transfer:Xe,primaries:Ra,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[wa]:{transfer:Aa,primaries:Ca,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Xu),fromReference:n=>n.applyMatrix3(Wu)},[Bo]:{transfer:Xe,primaries:Ca,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Xu),fromReference:n=>n.applyMatrix3(Wu).convertLinearToSRGB()}},hg=new Set([Cn,wa]),ke={enabled:!0,_workingColorSpace:Cn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!hg.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=wr[e].toReference;return(0,wr[t].fromReference)(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return wr[n].primaries},getTransfer:function(n){return n===Ui?Aa:wr[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(wr[e].luminanceCoefficients)}};function Fi(n){return n<.04045?.0773993808*n:Math.pow(.9478672986*n+.0521327014,2.4)}function Wo(n){return n<.0031308?12.92*n:1.055*Math.pow(n,.41666)-.055}let ki;class dg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ki===void 0&&(ki=Pa("canvas")),ki.width=e.width,ki.height=e.height;const i=ki.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ki}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=Pa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=255*Fi(a[s]/255);return i.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(255*Fi(t[i]/255)):t[i]=Fi(t[i]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fg=0;class Yu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=br(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,l=r.length;s<l;s++)r[s].isDataTexture?a.push(Xo(r[s].image)):a.push(Xo(r[s]))}else a=Xo(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Xo(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?dg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pg=0;class _t extends Oi{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,i=1001,r=1001,a=1006,s=1008,l=Ht,c=un,o=_t.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=br(),this.name="",this.source=new Yu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=o,this.format=l,this.internalFormat=null,this.type=c,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ru)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case Mr:e.x=e.x<0?0:1;break;case ro:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case Mr:e.y=e.y<0?0:1;break;case ro:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null,_t.DEFAULT_MAPPING=Ru,_t.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,i=0,r=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,o=c[0],u=c[4],d=c[8],h=c[1],f=c[5],m=c[9],S=c[2],v=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-S)<.01&&Math.abs(m-v)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+S)<.1&&Math.abs(m+v)<.1&&Math.abs(o+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(o+1)/2,_=(f+1)/2,A=(p+1)/2,R=(u+h)/4,T=(d+S)/4,D=(m+v)/4;return g>_&&g>A?g<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(g),r=R/i,a=T/i):_>A?_<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(_),i=R/r,a=D/r):A<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(A),i=T/a,r=D/a),this.set(i,r,a,t),this}let x=Math.sqrt((v-m)*(v-m)+(d-S)*(d-S)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(v-m)/x,this.y=(d-S)/x,this.z=(h-u)/x,this.w=Math.acos((o+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mg extends Oi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new _t(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let l=0;l<s;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Yu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends mg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class qu extends _t{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gg extends _t{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ar{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,l){let c=i[r+0],o=i[r+1],u=i[r+2],d=i[r+3];const h=a[s+0],f=a[s+1],m=a[s+2],S=a[s+3];if(l===0)return e[t+0]=c,e[t+1]=o,e[t+2]=u,void(e[t+3]=d);if(l===1)return e[t+0]=h,e[t+1]=f,e[t+2]=m,void(e[t+3]=S);if(d!==S||c!==h||o!==f||u!==m){let v=1-l;const p=c*h+o*f+u*m+d*S,x=p>=0?1:-1,g=1-p*p;if(g>Number.EPSILON){const A=Math.sqrt(g),R=Math.atan2(A,p*x);v=Math.sin(v*R)/A,l=Math.sin(l*R)/A}const _=l*x;if(c=c*v+h*_,o=o*v+f*_,u=u*v+m*_,d=d*v+S*_,v===1-l){const A=1/Math.sqrt(c*c+o*o+u*u+d*d);c*=A,o*=A,u*=A,d*=A}}e[t]=c,e[t+1]=o,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){const l=i[r],c=i[r+1],o=i[r+2],u=i[r+3],d=a[s],h=a[s+1],f=a[s+2],m=a[s+3];return e[t]=l*m+u*d+c*f-o*h,e[t+1]=c*m+u*h+o*d-l*f,e[t+2]=o*m+u*f+l*h-c*d,e[t+3]=u*m-l*d-c*h-o*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,l=Math.cos,c=Math.sin,o=l(i/2),u=l(r/2),d=l(a/2),h=c(i/2),f=c(r/2),m=c(a/2);switch(s){case"XYZ":this._x=h*u*d+o*f*m,this._y=o*f*d-h*u*m,this._z=o*u*m+h*f*d,this._w=o*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+o*f*m,this._y=o*f*d-h*u*m,this._z=o*u*m-h*f*d,this._w=o*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-o*f*m,this._y=o*f*d+h*u*m,this._z=o*u*m+h*f*d,this._w=o*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-o*f*m,this._y=o*f*d+h*u*m,this._z=o*u*m-h*f*d,this._w=o*u*d+h*f*m;break;case"YZX":this._x=h*u*d+o*f*m,this._y=o*f*d+h*u*m,this._z=o*u*m-h*f*d,this._w=o*u*d-h*f*m;break;case"XZY":this._x=h*u*d-o*f*m,this._y=o*f*d-h*u*m,this._z=o*u*m+h*f*d,this._w=o*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],l=t[5],c=t[9],o=t[2],u=t[6],d=t[10],h=i+l+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(a-o)*f,this._z=(s-r)*f}else if(i>l&&i>d){const f=2*Math.sqrt(1+i-l-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(a+o)/f}else if(l>d){const f=2*Math.sqrt(1+l-i-d);this._w=(a-o)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-i-l);this._w=(s-r)/f,this._x=(a+o)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,l=t._x,c=t._y,o=t._z,u=t._w;return this._x=i*u+s*l+r*o-a*c,this._y=r*u+s*c+a*l-i*o,this._z=a*u+s*o+i*c-r*l,this._w=s*u-i*l-r*c-a*o,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,a=this._z,s=this._w;let l=s*e._w+i*e._x+r*e._y+a*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=s,this._x=i,this._y=r,this._z=a,this;const c=1-l*l;if(c<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const o=Math.sqrt(c),u=Math.atan2(o,l),d=Math.sin((1-t)*u)/o,h=Math.sin(t*u)/o;return this._w=s*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ju.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,l=e.z,c=e.w,o=2*(s*r-l*i),u=2*(l*t-a*r),d=2*(a*i-s*t);return this.x=t+c*o+s*d-l*u,this.y=i+c*u+l*o-a*d,this.z=r+c*d+a*u-s*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,l=t.y,c=t.z;return this.x=r*c-a*l,this.y=a*s-i*c,this.z=i*l-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Yo.copy(this).projectOnVector(e),this.sub(Yo)}reflect(e){return this.sub(Yo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yo=new L,ju=new Ar;class Ln{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,l=a.count;s<l;s++)e.isMesh===!0?e.getVertexPosition(s,Gt):Gt.fromBufferAttribute(a,s),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ua.copy(i.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),Da.subVectors(this.max,Rr),Bi.subVectors(e.a,Rr),zi.subVectors(e.b,Rr),Hi.subVectors(e.c,Rr),Pn.subVectors(zi,Bi),In.subVectors(Hi,zi),Qn.subVectors(Bi,Hi);let t=[0,-Pn.z,Pn.y,0,-In.z,In.y,0,-Qn.z,Qn.y,Pn.z,0,-Pn.x,In.z,0,-In.x,Qn.z,0,-Qn.x,-Pn.y,Pn.x,0,-In.y,In.x,0,-Qn.y,Qn.x,0];return!!qo(t,Bi,zi,Hi,Da)&&(t=[1,0,0,0,1,0,0,0,1],!!qo(t,Bi,zi,Hi,Da)&&(Na.crossVectors(Pn,In),t=[Na.x,Na.y,Na.z],qo(t,Bi,zi,Hi,Da)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Gt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new L,new L,new L,new L,new L,new L,new L,new L],Gt=new L,Ua=new Ln,Bi=new L,zi=new L,Hi=new L,Pn=new L,In=new L,Qn=new L,Rr=new L,Da=new L,Na=new L,ei=new L;function qo(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){ei.fromArray(n,a);const l=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),c=e.dot(ei),o=t.dot(ei),u=i.dot(ei);if(Math.max(-Math.max(c,o,u),Math.min(c,o,u))>l)return!1}return!0}const _g=new Ln,Cr=new L,jo=new L;class Un{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):_g.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);const t=Cr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=.5*(i-this.radius);this.center.addScaledVector(Cr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(jo)),this.expandByPoint(Cr.copy(e.center).sub(jo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new L,Zo=new L,Oa=new L,Dn=new L,Ko=new L,Fa=new L,$o=new L;class ka{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Zo.copy(e).add(t).multiplyScalar(.5),Oa.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(Zo);const a=.5*e.distanceTo(t),s=-this.direction.dot(Oa),l=Dn.dot(this.direction),c=-Dn.dot(Oa),o=Dn.lengthSq(),u=Math.abs(1-s*s);let d,h,f,m;if(u>0)if(d=s*c-l,h=s*l-c,m=a*u,d>=0)if(h>=-m)if(h<=m){const S=1/u;d*=S,h*=S,f=d*(d+s*h+2*l)+h*(s*d+h+2*c)+o}else h=a,d=Math.max(0,-(s*h+l)),f=-d*d+h*(h+2*c)+o;else h=-a,d=Math.max(0,-(s*h+l)),f=-d*d+h*(h+2*c)+o;else h<=-m?(d=Math.max(0,-(-s*a+l)),h=d>0?-a:Math.min(Math.max(-a,-c),a),f=-d*d+h*(h+2*c)+o):h<=m?(d=0,h=Math.min(Math.max(-a,-c),a),f=h*(h+2*c)+o):(d=Math.max(0,-(s*a+l)),h=d>0?a:Math.min(Math.max(-a,-c),a),f=-d*d+h*(h+2*c)+o);else h=s>0?-a:a,d=Math.max(0,-(s*h+l)),f=-d*d+h*(h+2*c)+o;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Zo).addScaledVector(Oa,h),f}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const i=fn.dot(this.direction),r=fn.dot(fn)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),l=i-s,c=i+s;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,l,c;const o=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return o>=0?(i=(e.min.x-h.x)*o,r=(e.max.x-h.x)*o):(i=(e.max.x-h.x)*o,r=(e.min.x-h.x)*o),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),i>s||a>r?null:((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(l=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(l=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||l>r?null:((l>i||i!=i)&&(i=l),(c<r||r!=r)&&(r=c),r<0?null:this.at(i>=0?i:r,t)))}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,i,r,a){Ko.subVectors(t,e),Fa.subVectors(i,e),$o.crossVectors(Ko,Fa);let s,l=this.direction.dot($o);if(l>0){if(r)return null;s=1}else{if(!(l<0))return null;s=-1,l=-l}Dn.subVectors(this.origin,e);const c=s*this.direction.dot(Fa.crossVectors(Dn,Fa));if(c<0)return null;const o=s*this.direction.dot(Ko.cross(Dn));if(o<0||c+o>l)return null;const u=-s*Dn.dot($o);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ee{constructor(e,t,i,r,a,s,l,c,o,u,d,h,f,m,S,v){Ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,l,c,o,u,d,h,f,m,S,v)}set(e,t,i,r,a,s,l,c,o,u,d,h,f,m,S,v){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=s,p[9]=l,p[13]=c,p[2]=o,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=S,p[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),a=1/Gi.setFromMatrixColumn(e,1).length(),s=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),l=Math.sin(i),c=Math.cos(r),o=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,f=s*d,m=l*u,S=l*d;t[0]=c*u,t[4]=-c*d,t[8]=o,t[1]=f+m*o,t[5]=h-S*o,t[9]=-l*c,t[2]=S-h*o,t[6]=m+f*o,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,m=o*u,S=o*d;t[0]=h+S*l,t[4]=m*l-f,t[8]=s*o,t[1]=s*d,t[5]=s*u,t[9]=-l,t[2]=f*l-m,t[6]=S+h*l,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,m=o*u,S=o*d;t[0]=h-S*l,t[4]=-s*d,t[8]=m+f*l,t[1]=f+m*l,t[5]=s*u,t[9]=S-h*l,t[2]=-s*o,t[6]=l,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,f=s*d,m=l*u,S=l*d;t[0]=c*u,t[4]=m*o-f,t[8]=h*o+S,t[1]=c*d,t[5]=S*o+h,t[9]=f*o-m,t[2]=-o,t[6]=l*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,f=s*o,m=l*c,S=l*o;t[0]=c*u,t[4]=S-h*d,t[8]=m*d+f,t[1]=d,t[5]=s*u,t[9]=-l*u,t[2]=-o*u,t[6]=f*d+m,t[10]=h-S*d}else if(e.order==="XZY"){const h=s*c,f=s*o,m=l*c,S=l*o;t[0]=c*u,t[4]=-d,t[8]=o*u,t[1]=h*d+S,t[5]=s*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=l*u,t[10]=S*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vg,e,xg)}lookAt(e,t,i){const r=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),Nn.crossVectors(i,At),Nn.lengthSq()===0&&(Math.abs(i.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),Nn.crossVectors(i,At)),Nn.normalize(),Ba.crossVectors(At,Nn),r[0]=Nn.x,r[4]=Ba.x,r[8]=At.x,r[1]=Nn.y,r[5]=Ba.y,r[9]=At.y,r[2]=Nn.z,r[6]=Ba.z,r[10]=At.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],l=i[4],c=i[8],o=i[12],u=i[1],d=i[5],h=i[9],f=i[13],m=i[2],S=i[6],v=i[10],p=i[14],x=i[3],g=i[7],_=i[11],A=i[15],R=r[0],T=r[4],D=r[8],w=r[12],C=r[1],F=r[5],N=r[9],q=r[13],B=r[2],X=r[6],j=r[10],Q=r[14],J=r[3],ae=r[7],he=r[11],K=r[15];return a[0]=s*R+l*C+c*B+o*J,a[4]=s*T+l*F+c*X+o*ae,a[8]=s*D+l*N+c*j+o*he,a[12]=s*w+l*q+c*Q+o*K,a[1]=u*R+d*C+h*B+f*J,a[5]=u*T+d*F+h*X+f*ae,a[9]=u*D+d*N+h*j+f*he,a[13]=u*w+d*q+h*Q+f*K,a[2]=m*R+S*C+v*B+p*J,a[6]=m*T+S*F+v*X+p*ae,a[10]=m*D+S*N+v*j+p*he,a[14]=m*w+S*q+v*Q+p*K,a[3]=x*R+g*C+_*B+A*J,a[7]=x*T+g*F+_*X+A*ae,a[11]=x*D+g*N+_*j+A*he,a[15]=x*w+g*q+_*Q+A*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],l=e[5],c=e[9],o=e[13],u=e[2],d=e[6],h=e[10],f=e[14];return e[3]*(+a*c*d-r*o*d-a*l*h+i*o*h+r*l*f-i*c*f)+e[7]*(+t*c*f-t*o*h+a*s*h-r*s*f+r*o*u-a*c*u)+e[11]*(+t*o*d-t*l*f-a*s*d+i*s*f+a*l*u-i*o*u)+e[15]*(-r*l*u-t*c*d+t*l*h+r*s*d-i*s*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],l=e[5],c=e[6],o=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],S=e[13],v=e[14],p=e[15],x=d*v*o-S*h*o+S*c*f-l*v*f-d*c*p+l*h*p,g=m*h*o-u*v*o-m*c*f+s*v*f+u*c*p-s*h*p,_=u*S*o-m*d*o+m*l*f-s*S*f-u*l*p+s*d*p,A=m*d*c-u*S*c-m*l*h+s*S*h+u*l*v-s*d*v,R=t*x+i*g+r*_+a*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=x*T,e[1]=(S*h*a-d*v*a-S*r*f+i*v*f+d*r*p-i*h*p)*T,e[2]=(l*v*a-S*c*a+S*r*o-i*v*o-l*r*p+i*c*p)*T,e[3]=(d*c*a-l*h*a-d*r*o+i*h*o+l*r*f-i*c*f)*T,e[4]=g*T,e[5]=(u*v*a-m*h*a+m*r*f-t*v*f-u*r*p+t*h*p)*T,e[6]=(m*c*a-s*v*a-m*r*o+t*v*o+s*r*p-t*c*p)*T,e[7]=(s*h*a-u*c*a+u*r*o-t*h*o-s*r*f+t*c*f)*T,e[8]=_*T,e[9]=(m*d*a-u*S*a-m*i*f+t*S*f+u*i*p-t*d*p)*T,e[10]=(s*S*a-m*l*a+m*i*o-t*S*o-s*i*p+t*l*p)*T,e[11]=(u*l*a-s*d*a-u*i*o+t*d*o+s*i*f-t*l*f)*T,e[12]=A*T,e[13]=(u*S*r-m*d*r+m*i*h-t*S*h-u*i*v+t*d*v)*T,e[14]=(m*l*r-s*S*r-m*i*c+t*S*c+s*i*v-t*l*v)*T,e[15]=(s*d*r-u*l*r+u*i*c-t*d*c-s*i*h+t*l*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,l=e.y,c=e.z,o=a*s,u=a*l;return this.set(o*s+i,o*l-r*c,o*c+r*l,0,o*l+r*c,u*l+i,u*c-r*s,0,o*c-r*l,u*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,l=t._z,c=t._w,o=a+a,u=s+s,d=l+l,h=a*o,f=a*u,m=a*d,S=s*u,v=s*d,p=l*d,x=c*o,g=c*u,_=c*d,A=i.x,R=i.y,T=i.z;return r[0]=(1-(S+p))*A,r[1]=(f+_)*A,r[2]=(m-g)*A,r[3]=0,r[4]=(f-_)*R,r[5]=(1-(h+p))*R,r[6]=(v+x)*R,r[7]=0,r[8]=(m+g)*T,r[9]=(v-x)*T,r[10]=(1-(h+S))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let a=Gi.set(r[0],r[1],r[2]).length();const s=Gi.set(r[4],r[5],r[6]).length(),l=Gi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Vt.copy(this);const c=1/a,o=1/s,u=1/l;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=o,Vt.elements[5]*=o,Vt.elements[6]*=o,Vt.elements[8]*=u,Vt.elements[9]*=u,Vt.elements[10]*=u,t.setFromRotationMatrix(Vt),i.x=a,i.y=s,i.z=l,this}makePerspective(e,t,i,r,a,s,l=2e3){const c=this.elements,o=2*a/(t-e),u=2*a/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let f,m;if(l===Ni)f=-(s+a)/(s-a),m=-2*s*a/(s-a);else{if(l!==La)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);f=-s/(s-a),m=-s*a/(s-a)}return c[0]=o,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,a,s,l=2e3){const c=this.elements,o=1/(t-e),u=1/(i-r),d=1/(s-a),h=(t+e)*o,f=(i+r)*u;let m,S;if(l===Ni)m=(s+a)*d,S=-2*d;else{if(l!==La)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);m=a*d,S=-1*d}return c[0]=2*o,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=S,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Gi=new L,Vt=new Ee,vg=new L(0,0,0),xg=new L(1,1,1),Nn=new L,Ba=new L,At=new L,Zu=new Ee,Ku=new Ar;class pn{constructor(e=0,t=0,i=0,r=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],l=r[8],c=r[1],o=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,o),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,f),this._z=Math.atan2(c,o)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-s,o)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,o));break;case"YZX":this._z=Math.asin(yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,o),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(l,f));break;case"XZY":this._z=Math.asin(-yt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,o),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ku.setFromEuler(this),this.setFromQuaternion(Ku,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class $u{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let Mg=0;const Ju=new L,Vi=new Ar,mn=new Ee,za=new L,Lr=new L,Sg=new L,Eg=new Ar,Qu=new L(1,0,0),eh=new L(0,1,0),th=new L(0,0,1),nh={type:"added"},yg={type:"removed"},Wi={type:"childadded",child:null},Jo={type:"childremoved",child:null};class Rt extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new L,t=new pn,i=new Ar,r=new L(1,1,1);t._onChange(function(){i.setFromEuler(t,!1)}),i._onChange(function(){t.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ee},normalMatrix:{value:new be}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $u,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Qu,e)}rotateY(e){return this.rotateOnAxis(eh,e)}rotateZ(e){return this.rotateOnAxis(th,e)}translateOnAxis(e,t){return Ju.copy(e).applyQuaternion(this.quaternion),this.position.add(Ju.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qu,e)}translateY(e){return this.translateOnAxis(eh,e)}translateZ(e){return this.translateOnAxis(th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?za.copy(e):za.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(Lr,za,this.up):mn.lookAt(za,Lr,this.up),this.quaternion.setFromRotationMatrix(mn),r&&(mn.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(mn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nh),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yg),Jo.child=e,this.dispatchEvent(Jo),Jo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nh),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,Sg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,Eg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};function a(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let o=0,u=c.length;o<u;o++){const d=c[o];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,o=this.material.length;c<o;c++)l.push(a(e.materials,this.material[c]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];r.animations.push(a(e.animations,c))}}if(t){const l=s(e.geometries),c=s(e.materials),o=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),f=s(e.animations),m=s(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),o.length>0&&(i.textures=o),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function s(l){const c=[];for(const o in l){const u=l[o];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new L(0,1,0),Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new L,gn=new L,Qo=new L,_n=new L,Xi=new L,Yi=new L,ih=new L,el=new L,tl=new L,nl=new L,il=new Ze,rl=new Ze,al=new Ze;class Nt{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wt.subVectors(e,t),r.cross(Wt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Wt.subVectors(r,t),gn.subVectors(i,t),Qo.subVectors(e,t);const s=Wt.dot(Wt),l=Wt.dot(gn),c=Wt.dot(Qo),o=gn.dot(gn),u=gn.dot(Qo),d=s*o-l*l;if(d===0)return a.set(0,0,0),null;const h=1/d,f=(o*c-l*u)*h,m=(s*u-l*c)*h;return a.set(1-f-m,m,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,_n)!==null&&_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,i,r,a,s,l,c){return this.getBarycoord(e,t,i,r,_n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,_n.x),c.addScaledVector(s,_n.y),c.addScaledVector(l,_n.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return il.setScalar(0),rl.setScalar(0),al.setScalar(0),il.fromBufferAttribute(e,t),rl.fromBufferAttribute(e,i),al.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(il,a.x),s.addScaledVector(rl,a.y),s.addScaledVector(al,a.z),s}static isFrontFacing(e,t,i,r){return Wt.subVectors(i,t),gn.subVectors(e,t),Wt.cross(gn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),.5*Wt.cross(gn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Nt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return Nt.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return Nt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,l;Xi.subVectors(r,i),Yi.subVectors(a,i),el.subVectors(e,i);const c=Xi.dot(el),o=Yi.dot(el);if(c<=0&&o<=0)return t.copy(i);tl.subVectors(e,r);const u=Xi.dot(tl),d=Yi.dot(tl);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*o;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(Xi,s);nl.subVectors(e,a);const f=Xi.dot(nl),m=Yi.dot(nl);if(m>=0&&f<=m)return t.copy(a);const S=f*o-c*m;if(S<=0&&o>=0&&m<=0)return l=o/(o-m),t.copy(i).addScaledVector(Yi,l);const v=u*m-f*d;if(v<=0&&d-u>=0&&f-m>=0)return ih.subVectors(a,r),l=(d-u)/(d-u+(f-m)),t.copy(r).addScaledVector(ih,l);const p=1/(v+S+h);return s=S*p,l=h*p,t.copy(i).addScaledVector(Xi,s).addScaledVector(Yi,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function sl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+6*(e-n)*t:t<.5?e:t<2/3?n+6*(e-n)*(2/3-t):n}class Ne{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,ke.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=ke.workingColorSpace){if(e=cg(e,1),t=yt(t,0,1),i=yt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=sl(s,a,e+1/3),this.g=sl(s,a,e),this.b=sl(s,a,e-1/3)}return ke.toWorkingColorSpace(this,r),this}setStyle(e,t=en){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],l=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const i=rh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=Wo(e.r),this.g=Wo(e.g),this.b=Wo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return ke.fromWorkingColorSpace(pt.copy(this),e),65536*Math.round(yt(255*pt.r,0,255))+256*Math.round(yt(255*pt.g,0,255))+Math.round(yt(255*pt.b,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ke.workingColorSpace){ke.fromWorkingColorSpace(pt.copy(this),t);const i=pt.r,r=pt.g,a=pt.b,s=Math.max(i,r,a),l=Math.min(i,r,a);let c,o;const u=(l+s)/2;if(l===s)c=0,o=0;else{const d=s-l;switch(o=u<=.5?d/(s+l):d/(2-s-l),s){case i:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-i)/d+2;break;case a:c=(i-r)/d+4}c/=6}return e.h=c,e.s=o,e.l=u,e}getRGB(e,t=ke.workingColorSpace){return ke.fromWorkingColorSpace(pt.copy(this),t),e.r=pt.r,e.g=pt.g,e.b=pt.b,e}getStyle(e=en){ke.fromWorkingColorSpace(pt.copy(this),e);const t=pt.r,i=pt.g,r=pt.b;return e!==en?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*i)},${Math.round(255*r)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Ha);const i=Go(On.h,Ha.h,t),r=Go(On.s,Ha.s,t),a=Go(On.l,Ha.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pt=new Ne;Ne.NAMES=rh;let bg=0;class Ga extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=br(),this.name="",this.type="Material",this.blending=1,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qs,this.blendDst=eo,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){const s=[];for(const l in a){const c=a[l];delete c.metadata,s.push(c)}return s}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==An&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qs&&(i.blendSrc=this.blendSrc),this.blendDst!==eo&&(i.blendDst=this.blendDst),this.blendEquation!==Kn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ah extends Ga{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=Au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}Tg();function Tg(){const n=new ArrayBuffer(4),e=new Float32Array(n),t=new Uint32Array(n),i=new Uint32Array(512),r=new Uint32Array(512);for(let c=0;c<256;++c){const o=c-127;o<-27?(i[c]=0,i[256|c]=32768,r[c]=24,r[256|c]=24):o<-14?(i[c]=1024>>-o-14,i[256|c]=1024>>-o-14|32768,r[c]=-o-1,r[256|c]=-o-1):o<=15?(i[c]=o+15<<10,i[256|c]=o+15<<10|32768,r[c]=13,r[256|c]=13):o<128?(i[c]=31744,i[256|c]=64512,r[c]=24,r[256|c]=24):(i[c]=31744,i[256|c]=64512,r[c]=13,r[256|c]=13)}const a=new Uint32Array(2048),s=new Uint32Array(64),l=new Uint32Array(64);for(let c=1;c<1024;++c){let o=c<<13,u=0;for(;!(8388608&o);)o<<=1,u-=8388608;o&=-8388609,u+=947912704,a[c]=o|u}for(let c=1024;c<2048;++c)a[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)s[c]=c<<23;s[31]=1199570944,s[32]=2147483648;for(let c=33;c<63;++c)s[c]=2147483648+(c-32<<23);s[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(l[c]=1024);return{floatView:e,uint32View:t,baseTable:i,shiftTable:r,mantissaTable:a,exponentTable:s,offsetTable:l}}const tt=new L,Va=new De;class tn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zu,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Va.fromBufferAttribute(this,t),Va.applyMatrix3(e),this.setXY(t,Va.x,Va.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix3(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix4(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyNormalMatrix(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.transformDirection(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Tr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),a=bt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zu&&(e.usage=this.usage),e}}class sh extends tn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class oh extends tn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ti extends tn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let wg=0;const Ot=new Ee,ol=new Rt,qi=new L,Ct=new Ln,Pr=new Ln,ot=new L;class ni extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=br(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gu(e)?oh:sh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new be().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ot.makeRotationFromQuaternion(e),this.applyMatrix4(Ot),this}rotateX(e){return Ot.makeRotationX(e),this.applyMatrix4(Ot),this}rotateY(e){return Ot.makeRotationY(e),this.applyMatrix4(Ot),this}rotateZ(e){return Ot.makeRotationZ(e),this.applyMatrix4(Ot),this}translate(e,t,i){return Ot.makeTranslation(e,t,i),this.applyMatrix4(Ot),this}scale(e,t,i){return Ot.makeScale(e,t,i),this.applyMatrix4(Ot),this}lookAt(e){return ol.lookAt(e),ol.updateMatrix(),this.applyMatrix4(ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ti(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];Ct.setFromBufferAttribute(a),this.morphTargetsRelative?(ot.addVectors(this.boundingBox.min,Ct.min),this.boundingBox.expandByPoint(ot),ot.addVectors(this.boundingBox.max,Ct.max),this.boundingBox.expandByPoint(ot)):(this.boundingBox.expandByPoint(Ct.min),this.boundingBox.expandByPoint(Ct.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new L,1/0);if(e){const i=this.boundingSphere.center;if(Ct.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const l=t[a];Pr.setFromBufferAttribute(l),this.morphTargetsRelative?(ot.addVectors(Ct.min,Pr.min),Ct.expandByPoint(ot),ot.addVectors(Ct.max,Pr.max),Ct.expandByPoint(ot)):(Ct.expandByPoint(Pr.min),Ct.expandByPoint(Pr.max))}Ct.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)ot.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(ot));if(t)for(let a=0,s=t.length;a<s;a++){const l=t[a],c=this.morphTargetsRelative;for(let o=0,u=l.count;o<u;o++)ot.fromBufferAttribute(l,o),c&&(qi.fromBufferAttribute(e,o),ot.add(qi)),r=Math.max(r,i.distanceToSquared(ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const i=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),l=[],c=[];for(let D=0;D<i.count;D++)l[D]=new L,c[D]=new L;const o=new L,u=new L,d=new L,h=new De,f=new De,m=new De,S=new L,v=new L;function p(D,w,C){o.fromBufferAttribute(i,D),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,C),h.fromBufferAttribute(a,D),f.fromBufferAttribute(a,w),m.fromBufferAttribute(a,C),u.sub(o),d.sub(o),f.sub(h),m.sub(h);const F=1/(f.x*m.y-m.x*f.y);isFinite(F)&&(S.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(F),v.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(F),l[D].add(S),l[w].add(S),l[C].add(S),c[D].add(v),c[w].add(v),c[C].add(v))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let D=0,w=x.length;D<w;++D){const C=x[D],F=C.start;for(let N=F,q=F+C.count;N<q;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const g=new L,_=new L,A=new L,R=new L;function T(D){A.fromBufferAttribute(r,D),R.copy(A);const w=l[D];g.copy(w),g.sub(A.multiplyScalar(A.dot(w))).normalize(),_.crossVectors(R,w);const C=_.dot(c[D])<0?-1:1;s.setXYZW(D,g.x,g.y,g.z,C)}for(let D=0,w=x.length;D<w;++D){const C=x[D],F=C.start;for(let N=F,q=F+C.count;N<q;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new tn(new Float32Array(3*t.count),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new L,a=new L,s=new L,l=new L,c=new L,o=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const m=e.getX(h+0),S=e.getX(h+1),v=e.getX(h+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,S),s.fromBufferAttribute(t,v),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),l.fromBufferAttribute(i,m),c.fromBufferAttribute(i,S),o.fromBufferAttribute(i,v),l.add(u),c.add(u),o.add(u),i.setXYZ(m,l.x,l.y,l.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(v,o.x,o.y,o.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ot.fromBufferAttribute(e,t),ot.normalize(),e.setXYZ(t,ot.x,ot.y,ot.z)}toNonIndexed(){function e(l,c){const o=l.array,u=l.itemSize,d=l.normalized,h=new o.constructor(c.length*u);let f=0,m=0;for(let S=0,v=c.length;S<v;S++){f=l.isInterleavedBufferAttribute?c[S]*l.data.stride+l.offset:c[S]*u;for(let p=0;p<u;p++)h[m++]=o[f++]}return new tn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,i=this.index.array,r=this.attributes;for(const l in r){const c=e(r[l],i);t.setAttribute(l,c)}const a=this.morphAttributes;for(const l in a){const c=[],o=a[l];for(let u=0,d=o.length;u<d;u++){const h=e(o[u],i);c.push(h)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let l=0,c=s.length;l<c;l++){const o=s[l];t.addGroup(o.start,o.count,o.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const o in c)c[o]!==void 0&&(e[o]=c[o]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const o=i[c];e.data.attributes[c]=o.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const o=this.morphAttributes[c],u=[];for(let d=0,h=o.length;d<h;d++){const f=o[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const o in r){const u=r[o];this.setAttribute(o,u.clone(t))}const a=e.morphAttributes;for(const o in a){const u=[],d=a[o];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[o]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let o=0,u=s.length;o<u;o++){const d=s[o];this.addGroup(d.start,d.count,d.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lh=new Ee,ii=new ka,Wa=new Un,ch=new L,Xa=new L,Ya=new L,qa=new L,ll=new L,ja=new L,uh=new L,Za=new L;class Ft extends Rt{constructor(e=new ni,t=new ah){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const s=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){ja.set(0,0,0);for(let c=0,o=a.length;c<o;c++){const u=l[c],d=a[c];u!==0&&(ll.fromBufferAttribute(d,e),s?ja.addScaledVector(ll,u):ja.addScaledVector(ll.sub(t),u))}t.add(ja)}return t}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(a),ii.copy(e.ray).recast(e.near),Wa.containsPoint(ii.origin)===!1&&(ii.intersectSphere(Wa,ch)===null||ii.origin.distanceToSquared(ch)>(e.far-e.near)**2))return;lh.copy(a).invert(),ii.copy(e.ray).applyMatrix4(lh),i.boundingBox!==null&&ii.intersectsBox(i.boundingBox)===!1||this._computeIntersections(e,t,ii)}}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,l=a.index,c=a.attributes.position,o=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,f=a.drawRange;if(l!==null)if(Array.isArray(s))for(let m=0,S=h.length;m<S;m++){const v=h[m],p=s[v.materialIndex];for(let x=Math.max(v.start,f.start),g=Math.min(l.count,Math.min(v.start+v.count,f.start+f.count));x<g;x+=3)r=Ka(this,p,e,i,o,u,d,l.getX(x),l.getX(x+1),l.getX(x+2)),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);m<S;m+=3)r=Ka(this,s,e,i,o,u,d,l.getX(m),l.getX(m+1),l.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(c!==void 0)if(Array.isArray(s))for(let m=0,S=h.length;m<S;m++){const v=h[m],p=s[v.materialIndex];for(let x=Math.max(v.start,f.start),g=Math.min(c.count,Math.min(v.start+v.count,f.start+f.count));x<g;x+=3)r=Ka(this,p,e,i,o,u,d,x,x+1,x+2),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=v.materialIndex,t.push(r))}else for(let m=Math.max(0,f.start),S=Math.min(c.count,f.start+f.count);m<S;m+=3)r=Ka(this,s,e,i,o,u,d,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}function Ka(n,e,t,i,r,a,s,l,c,o){n.getVertexPosition(l,Xa),n.getVertexPosition(c,Ya),n.getVertexPosition(o,qa);const u=function(d,h,f,m,S,v,p,x){let g;if(g=h.side===Et?m.intersectTriangle(p,v,S,!0,x):m.intersectTriangle(S,v,p,h.side===An,x),g===null)return null;Za.copy(x),Za.applyMatrix4(d.matrixWorld);const _=f.ray.origin.distanceTo(Za);return _<f.near||_>f.far?null:{distance:_,point:Za.clone(),object:d}}(n,e,t,i,Xa,Ya,qa,uh);if(u){const d=new L;Nt.getBarycoord(uh,Xa,Ya,qa,d),r&&(u.uv=Nt.getInterpolatedAttribute(r,l,c,o,d,new De)),a&&(u.uv1=Nt.getInterpolatedAttribute(a,l,c,o,d,new De)),s&&(u.normal=Nt.getInterpolatedAttribute(s,l,c,o,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:l,b:c,c:o,normal:new L,materialIndex:0};Nt.getNormal(Xa,Ya,qa,h.normal),u.face=h,u.barycoord=d}return u}class Ir extends ni{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const l=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],o=[],u=[],d=[];let h=0,f=0;function m(S,v,p,x,g,_,A,R,T,D,w){const C=_/T,F=A/D,N=_/2,q=A/2,B=R/2,X=T+1,j=D+1;let Q=0,J=0;const ae=new L;for(let he=0;he<j;he++){const K=he*F-q;for(let $=0;$<X;$++){const oe=$*C-N;ae[S]=oe*x,ae[v]=K*g,ae[p]=B,o.push(ae.x,ae.y,ae.z),ae[S]=0,ae[v]=0,ae[p]=R>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push($/T),d.push(1-he/D),Q+=1}}for(let he=0;he<D;he++)for(let K=0;K<T;K++){const $=h+K+X*he,oe=h+K+X*(he+1),fe=h+(K+1)+X*(he+1),y=h+(K+1)+X*he;c.push($,oe,y),c.push(oe,fe,y),J+=6}l.addGroup(f,J,w),f+=J,h+=Q}m("z","y","x",-1,-1,i,t,e,s,a,0),m("z","y","x",1,-1,i,t,-e,s,a,1),m("x","z","y",1,1,e,i,t,r,s,2),m("x","z","y",1,-1,e,i,-t,r,s,3),m("x","y","z",1,-1,e,t,i,r,a,4),m("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new ti(o,3)),this.setAttribute("normal",new ti(u,3)),this.setAttribute("uv",new ti(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ji(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function vt(n){const e={};for(let t=0;t<n.length;t++){const i=ji(n[t]);for(const r in i)e[r]=i[r]}return e}function hh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ke.workingColorSpace}const Ag={clone:ji,merge:vt};class vn extends Ga{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=function(t){const i=[];for(let r=0;r<t.length;r++)i.push(t[r].clone());return i}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class cl extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=Ni}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new L,dh=new De,fh=new De;class Xt extends cl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*Ho*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*zo*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Ho*Math.atan(Math.tan(.5*zo*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,dh,fh),t.subVectors(fh,dh)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*zo*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,o=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/o,r*=s.width/c,i*=s.height/o}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zi=-90;class Rg extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Xt(Zi,1,e,t);r.layers=this.layers,this.add(r);const a=new Xt(Zi,1,e,t);a.layers=this.layers,this.add(a);const s=new Xt(Zi,1,e,t);s.layers=this.layers,this.add(s);const l=new Xt(Zi,1,e,t);l.layers=this.layers,this.add(l);const c=new Xt(Zi,1,e,t);c.layers=this.layers,this.add(c);const o=new Xt(Zi,1,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,l,c]=t;for(const o of t)this.remove(o);if(e===Ni)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==La)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(const o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,l,c,o,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,l),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,o),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class ph extends _t{constructor(e,t,i,r,a,s,l,c,o,u){super(e=e!==void 0?e:[],t=t!==void 0?t:Ri,i,r,a,s,l,c,o,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cg extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ph(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ir(5,5,5),a=new vn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Et,blending:0});a.uniforms.tEquirect.value=t;const s=new Ft(r,a),l=t.minFilter;return t.minFilter===Li&&(t.minFilter=Dt),new Rg(1,10,this).update(e,s),t.minFilter=l,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,r){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}const ul=new L,Lg=new L,Pg=new be;class ri{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ul.subVectors(i,t).cross(Lg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ul),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Pg.getNormalMatrix(e),r=this.coplanarPoint(ul).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Un,$a=new L;class hl{constructor(e=new ri,t=new ri,i=new ri,r=new ri,a=new ri,s=new ri){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(r),l[4].copy(a),l[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3){const i=this.planes,r=e.elements,a=r[0],s=r[1],l=r[2],c=r[3],o=r[4],u=r[5],d=r[6],h=r[7],f=r[8],m=r[9],S=r[10],v=r[11],p=r[12],x=r[13],g=r[14],_=r[15];if(i[0].setComponents(c-a,h-o,v-f,_-p).normalize(),i[1].setComponents(c+a,h+o,v+f,_+p).normalize(),i[2].setComponents(c+s,h+u,v+m,_+x).normalize(),i[3].setComponents(c-s,h-u,v-m,_-x).normalize(),i[4].setComponents(c-l,h-d,v-S,_-g).normalize(),t===Ni)i[5].setComponents(c+l,h+d,v+S,_+g).normalize();else{if(t!==La)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(l,d,S,g).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if($a.x=r.normal.x>0?e.max.x:e.min.x,$a.y=r.normal.y>0?e.max.y:e.min.y,$a.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint($a)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function mh(){let n=null,e=!1,t=null,i=null;function r(a,s){t(a,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Ig(n){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const i=e.get(t);i&&(n.deleteBuffer(i.buffer),e.delete(t))},update:function(t,i){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,function(a,s){const l=a.array,c=a.usage,o=l.byteLength,u=n.createBuffer();let d;if(n.bindBuffer(s,u),n.bufferData(s,l,c),a.onUploadCallback(),l instanceof Float32Array)d=n.FLOAT;else if(l instanceof Uint16Array)d=a.isFloat16BufferAttribute?n.HALF_FLOAT:n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else{if(!(l instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);d=n.UNSIGNED_BYTE}return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:o}}(t,i));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,s,l){const c=s.array,o=s.updateRanges;if(n.bindBuffer(l,a),o.length===0)n.bufferSubData(l,0,c);else{o.sort((d,h)=>d.start-h.start);let u=0;for(let d=1;d<o.length;d++){const h=o[u],f=o[d];f.start<=h.start+h.count+1?h.count=Math.max(h.count,f.start+f.count-h.start):(++u,o[u]=f)}o.length=u+1;for(let d=0,h=o.length;d<h;d++){const f=o[d];n.bufferSubData(l,f.start*c.BYTES_PER_ELEMENT,c,f.start,f.count)}s.clearUpdateRanges()}s.onUploadCallback()})(r.buffer,t,i),r.version=t.version}}}}class Ur extends ni{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,l=Math.floor(i),c=Math.floor(r),o=l+1,u=c+1,d=e/l,h=t/c,f=[],m=[],S=[],v=[];for(let p=0;p<u;p++){const x=p*h-s;for(let g=0;g<o;g++){const _=g*d-a;m.push(_,-x,0),S.push(0,0,1),v.push(g/l),v.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<l;x++){const g=x+o*p,_=x+o*(p+1),A=x+1+o*(p+1),R=x+1+o*p;f.push(g,_,R),f.push(_,A,R)}this.setIndex(f),this.setAttribute("position",new ti(m,3)),this.setAttribute("normal",new ti(S,3)),this.setAttribute("uv",new ti(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.width,e.height,e.widthSegments,e.heightSegments)}}const Te={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},se={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new be},alphaMap:{value:null},alphaMapTransform:{value:new be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new be}},envmap:{envMap:{value:null},envMapRotation:{value:new be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new be},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new be},alphaTest:{value:0},uvTransform:{value:new be}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new be},alphaMap:{value:null},alphaMapTransform:{value:new be},alphaTest:{value:0}}},nn={basic:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Te.meshbasic_vert,fragmentShader:Te.meshbasic_frag},lambert:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Te.meshlambert_vert,fragmentShader:Te.meshlambert_frag},phong:{uniforms:vt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Te.meshphong_vert,fragmentShader:Te.meshphong_frag},standard:{uniforms:vt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag},toon:{uniforms:vt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Te.meshtoon_vert,fragmentShader:Te.meshtoon_frag},matcap:{uniforms:vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Te.meshmatcap_vert,fragmentShader:Te.meshmatcap_frag},points:{uniforms:vt([se.points,se.fog]),vertexShader:Te.points_vert,fragmentShader:Te.points_frag},dashed:{uniforms:vt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Te.linedashed_vert,fragmentShader:Te.linedashed_frag},depth:{uniforms:vt([se.common,se.displacementmap]),vertexShader:Te.depth_vert,fragmentShader:Te.depth_frag},normal:{uniforms:vt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Te.meshnormal_vert,fragmentShader:Te.meshnormal_frag},sprite:{uniforms:vt([se.sprite,se.fog]),vertexShader:Te.sprite_vert,fragmentShader:Te.sprite_frag},background:{uniforms:{uvTransform:{value:new be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Te.background_vert,fragmentShader:Te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new be}},vertexShader:Te.backgroundCube_vert,fragmentShader:Te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Te.cube_vert,fragmentShader:Te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Te.equirect_vert,fragmentShader:Te.equirect_frag},distanceRGBA:{uniforms:vt([se.common,se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Te.distanceRGBA_vert,fragmentShader:Te.distanceRGBA_frag},shadow:{uniforms:vt([se.lights,se.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Te.shadow_vert,fragmentShader:Te.shadow_frag}};nn.physical={uniforms:vt([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new be},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new be},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new be},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new be},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new be},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new be}}]),vertexShader:Te.meshphysical_vert,fragmentShader:Te.meshphysical_frag};const Ja={r:0,b:0,g:0},si=new pn,Ug=new Ee;function Dg(n,e,t,i,r,a,s){const l=new Ne(0);let c,o,u=a===!0?0:1,d=null,h=0,f=null;function m(v){let p=v.isScene===!0?v.background:null;return p&&p.isTexture&&(p=(v.backgroundBlurriness>0?t:e).get(p)),p}function S(v,p){v.getRGB(Ja,hh(n)),i.buffers.color.setClear(Ja.r,Ja.g,Ja.b,p,s)}return{getClearColor:function(){return l},setClearColor:function(v,p=1){l.set(v),u=p,S(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(v){u=v,S(l,u)},render:function(v){let p=!1;const x=m(v);x===null?S(l,u):x&&x.isColor&&(S(x,1),p=!0);const g=n.xr.getEnvironmentBlendMode();g==="additive"?i.buffers.color.setClear(0,0,0,1,s):g==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||p)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))},addToRenderList:function(v,p){const x=m(p);x&&(x.isCubeTexture||x.mapping===xa)?(o===void 0&&(o=new Ft(new Ir(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:ji(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Et,depthTest:!1,depthWrite:!1,fog:!1})),o.geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(g,_,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(o)),si.copy(p.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),o.material.uniforms.envMap.value=x,o.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,o.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,o.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,o.material.uniforms.backgroundRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(si)),o.material.toneMapped=ke.getTransfer(x.colorSpace)!==Xe,d===x&&h===x.version&&f===n.toneMapping||(o.material.needsUpdate=!0,d=x,h=x.version,f=n.toneMapping),o.layers.enableAll(),v.unshift(o,o.geometry,o.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ft(new Ur(2,2),new vn({name:"BackgroundMaterial",uniforms:ji(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ke.getTransfer(x.colorSpace)!==Xe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),d===x&&h===x.version&&f===n.toneMapping||(c.material.needsUpdate=!0,d=x,h=x.version,f=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}}}function Ng(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=o(null);let a=r,s=!1;function l(p){return n.bindVertexArray(p)}function c(p){return n.deleteVertexArray(p)}function o(p){const x=[],g=[],_=[];for(let A=0;A<t;A++)x[A]=0,g[A]=0,_[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:g,attributeDivisors:_,object:p,attributes:{},index:null}}function u(){const p=a.newAttributes;for(let x=0,g=p.length;x<g;x++)p[x]=0}function d(p){h(p,0)}function h(p,x){const g=a.newAttributes,_=a.enabledAttributes,A=a.attributeDivisors;g[p]=1,_[p]===0&&(n.enableVertexAttribArray(p),_[p]=1),A[p]!==x&&(n.vertexAttribDivisor(p,x),A[p]=x)}function f(){const p=a.newAttributes,x=a.enabledAttributes;for(let g=0,_=x.length;g<_;g++)x[g]!==p[g]&&(n.disableVertexAttribArray(g),x[g]=0)}function m(p,x,g,_,A,R,T){T===!0?n.vertexAttribIPointer(p,x,g,A,R):n.vertexAttribPointer(p,x,g,_,A,R)}function S(){v(),s=!0,a!==r&&(a=r,l(a.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(p,x,g,_,A){let R=!1;const T=function(D,w,C){const F=C.wireframe===!0;let N=i[D.id];N===void 0&&(N={},i[D.id]=N);let q=N[w.id];q===void 0&&(q={},N[w.id]=q);let B=q[F];return B===void 0&&(B=o(n.createVertexArray()),q[F]=B),B}(_,g,x);a!==T&&(a=T,l(a.object)),R=function(D,w,C,F){const N=a.attributes,q=w.attributes;let B=0;const X=C.getAttributes();for(const j in X)if(X[j].location>=0){const Q=N[j];let J=q[j];if(J===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),Q===void 0||Q.attribute!==J||J&&Q.data!==J.data)return!0;B++}return a.attributesNum!==B||a.index!==F}(p,_,g,A),R&&function(D,w,C,F){const N={},q=w.attributes;let B=0;const X=C.getAttributes();for(const j in X)if(X[j].location>=0){let Q=q[j];Q===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor));const J={};J.attribute=Q,Q&&Q.data&&(J.data=Q.data),N[j]=J,B++}a.attributes=N,a.attributesNum=B,a.index=F}(p,_,g,A),A!==null&&e.update(A,n.ELEMENT_ARRAY_BUFFER),(R||s)&&(s=!1,function(D,w,C,F){u();const N=F.attributes,q=C.getAttributes(),B=w.defaultAttributeValues;for(const X in q){const j=q[X];if(j.location>=0){let Q=N[X];if(Q===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor)),Q!==void 0){const J=Q.normalized,ae=Q.itemSize,he=e.get(Q);if(he===void 0)continue;const K=he.buffer,$=he.type,oe=he.bytesPerElement,fe=$===n.INT||$===n.UNSIGNED_INT||Q.gpuType===so;if(Q.isInterleavedBufferAttribute){const y=Q.data,M=y.stride,I=Q.offset;if(y.isInstancedInterleavedBuffer){for(let Y=0;Y<j.locationSize;Y++)h(j.location+Y,y.meshPerAttribute);D.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=y.meshPerAttribute*y.count)}else for(let Y=0;Y<j.locationSize;Y++)d(j.location+Y);n.bindBuffer(n.ARRAY_BUFFER,K);for(let Y=0;Y<j.locationSize;Y++)m(j.location+Y,ae/j.locationSize,$,J,M*oe,(I+ae/j.locationSize*Y)*oe,fe)}else{if(Q.isInstancedBufferAttribute){for(let y=0;y<j.locationSize;y++)h(j.location+y,Q.meshPerAttribute);D.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let y=0;y<j.locationSize;y++)d(j.location+y);n.bindBuffer(n.ARRAY_BUFFER,K);for(let y=0;y<j.locationSize;y++)m(j.location+y,ae/j.locationSize,$,J,ae*oe,ae/j.locationSize*y*oe,fe)}}else if(B!==void 0){const J=B[X];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(j.location,J);break;case 3:n.vertexAttrib3fv(j.location,J);break;case 4:n.vertexAttrib4fv(j.location,J);break;default:n.vertexAttrib1fv(j.location,J)}}}}f()}(p,x,g,_),A!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(A).buffer))},reset:S,resetDefaultState:v,dispose:function(){S();for(const p in i){const x=i[p];for(const g in x){const _=x[g];for(const A in _)c(_[A].object),delete _[A];delete x[g]}delete i[p]}},releaseStatesOfGeometry:function(p){if(i[p.id]===void 0)return;const x=i[p.id];for(const g in x){const _=x[g];for(const A in _)c(_[A].object),delete _[A];delete x[g]}delete i[p.id]},releaseStatesOfProgram:function(p){for(const x in i){const g=i[x];if(g[p.id]===void 0)continue;const _=g[p.id];for(const A in _)c(_[A].object),delete _[A];delete g[p.id]}},initAttributes:u,enableAttribute:d,disableUnusedAttributes:f}}function Og(n,e,t){let i;function r(a,s,l){l!==0&&(n.drawArraysInstanced(i,a,s,l),t.update(s,i,l))}this.setMode=function(a){i=a},this.render=function(a,s){n.drawArrays(i,a,s),t.update(s,i,1)},this.renderInstances=r,this.renderMultiDraw=function(a,s,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,a,0,s,0,l);let c=0;for(let o=0;o<l;o++)c+=s[o];t.update(c,i,1)},this.renderMultiDrawInstances=function(a,s,l,c){if(l===0)return;const o=e.get("WEBGL_multi_draw");if(o===null)for(let u=0;u<a.length;u++)r(a[u],s[u],c[u]);else{o.multiDrawArraysInstancedWEBGL(i,a,0,s,0,c,0,l);let u=0;for(let d=0;d<l;d++)u+=s[d];for(let d=0;d<c.length;d++)t.update(u,i,c[d])}}}function Fg(n,e,t,i){let r;function a(h){if(h==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=t.precision!==void 0?t.precision:"highp";const l=a(s);l!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",l,"instead."),s=l);const c=t.logarithmicDepthBuffer===!0,o=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(o===!0){const h=e.get("EXT_clip_control");h.clipControlEXT(h.LOWER_LEFT_EXT,h.ZERO_TO_ONE_EXT)}const u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const h=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(h){return h===Ht||i.convert(h)===n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){const f=h===Er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==un&&i.convert(h)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&h!==hn&&!f)},precision:s,logarithmicDepthBuffer:c,reverseDepthBuffer:o,maxTextures:u,maxVertexTextures:d,maxTextureSize:n.getParameter(n.MAX_TEXTURE_SIZE),maxCubemapSize:n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:n.getParameter(n.MAX_VERTEX_ATTRIBS),maxVertexUniforms:n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:n.getParameter(n.MAX_VARYING_VECTORS),maxFragmentUniforms:n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:d>0,maxSamples:n.getParameter(n.MAX_SAMPLES)}}function kg(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new ri,l=new be,c={value:null,needsUpdate:!1};function o(u,d,h,f){const m=u!==null?u.length:0;let S=null;if(m!==0){if(S=c.value,f!==!0||S===null){const v=h+4*m,p=d.matrixWorldInverse;l.getNormalMatrix(p),(S===null||S.length<v)&&(S=new Float32Array(v));for(let x=0,g=h;x!==m;++x,g+=4)s.copy(u[x]).applyMatrix4(p,l),s.normal.toArray(S,g),S[g+3]=s.constant}c.value=S,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,S}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const h=u.length!==0||d||i!==0||r;return r=d,i=u.length,h},this.beginShadows=function(){a=!0,o(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){t=o(u,d,0)},this.setState=function(u,d,h){const f=u.clippingPlanes,m=u.clipIntersection,S=u.clipShadows,v=n.get(u);if(!r||f===null||f.length===0||a&&!S)a?o(null):function(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}();else{const p=a?0:i,x=4*p;let g=v.clippingState||null;c.value=g,g=o(f,d,x,h);for(let _=0;_!==x;++_)g[_]=t[_];v.clippingState=g,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=p}}}function Bg(n){let e=new WeakMap;function t(r,a){return a===to?r.mapping=Ri:a===no&&(r.mapping=Ci),r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const s=e.get(a);s!==void 0&&(e.delete(a),s.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===to||a===no){if(e.has(r))return t(e.get(r).texture,r.mapping);{const s=r.image;if(s&&s.height>0){const l=new Cg(s.height);return l.fromEquirectangularTexture(n,r),e.set(r,l),r.addEventListener("dispose",i),t(l.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}class gh extends cl{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,l=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const o=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=o*this.view.offsetX,s=a+o*this.view.width,l-=u*this.view.offsetY,c=l-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,l,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const _h=[.125,.215,.35,.446,.526,.582],Dr=20,dl=new gh,vh=new Ne;let fl=null,pl=0,ml=0,gl=!1;const oi=(1+Math.sqrt(5))/2,Ki=1/oi,xh=[new L(-oi,Ki,0),new L(oi,Ki,0),new L(-Ki,0,oi),new L(Ki,0,oi),new L(0,oi,-Ki),new L(0,oi,Ki),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Mh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,e.scissorTest=!1,Qa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===Ci?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Er,format:Ht,colorSpace:Cn,depthBuffer:!1},r=Sh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sh(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(s){const l=[],c=[],o=[];let u=s;const d=s-4+1+_h.length;for(let h=0;h<d;h++){const f=Math.pow(2,u);c.push(f);let m=1/f;h>s-4?m=_h[h-s+4-1]:h===0&&(m=0),o.push(m);const S=1/(f-2),v=-S,p=1+S,x=[v,v,p,v,p,p,v,v,p,p,v,p],g=6,_=6,A=3,R=2,T=1,D=new Float32Array(A*_*g),w=new Float32Array(R*_*g),C=new Float32Array(T*_*g);for(let N=0;N<g;N++){const q=N%3*2/3-1,B=N>2?0:-1,X=[q,B,0,q+2/3,B,0,q+2/3,B+1,0,q,B,0,q+2/3,B+1,0,q,B+1,0];D.set(X,A*_*N),w.set(x,R*_*N);const j=[N,N,N,N,N,N];C.set(j,T*_*N)}const F=new ni;F.setAttribute("position",new tn(D,A)),F.setAttribute("uv",new tn(w,R)),F.setAttribute("faceIndex",new tn(C,T)),l.push(F),u>4&&u--}return{lodPlanes:l,sizeLods:c,sigmas:o}}(a)),this._blurMaterial=function(s,l,c){const o=new Float32Array(Dr),u=new L(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/l,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:o},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}(a,e,t)}return r}_compileMaterial(e){const t=new Ft(this._lodPlanes[0],e);this._renderer.compile(t,dl)}_sceneToCubeUV(e,t,i,r){const a=new Xt(90,1,t,i),s=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,o=c.autoClear,u=c.toneMapping;c.getClearColor(vh),c.toneMapping=Rn,c.autoClear=!1;const d=new ah({name:"PMREM.Background",side:Et,depthWrite:!1,depthTest:!1}),h=new Ft(new Ir,d);let f=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,f=!0):(d.color.copy(vh),f=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(a.up.set(0,s[S],0),a.lookAt(l[S],0,0)):v===1?(a.up.set(0,0,s[S]),a.lookAt(0,l[S],0)):(a.up.set(0,s[S],0),a.lookAt(0,0,l[S]));const p=this._cubeSize;Qa(r,v*p,S>2?p:0,p,p),c.setRenderTarget(r),f&&c.render(h,a),c.render(e,a)}h.geometry.dispose(),h.material.dispose(),c.toneMapping=u,c.autoClear=o,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ri||e.mapping===Ci;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eh());const a=r?this._cubemapMaterial:this._equirectMaterial,s=new Ft(this._lodPlanes[0],a);a.uniforms.envMap.value=e;const l=this._cubeSize;Qa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(s,dl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=xh[(r-a-1)%xh.length];this._blur(e,a-1,a,s,l)}t.autoClear=i}_blur(e,t,i,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",a),this._halfBlur(s,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,s,l){const c=this._renderer,o=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=new Ft(this._lodPlanes[r],o),d=o.uniforms,h=this._sizeLods[i]-1,f=isFinite(a)?Math.PI/(2*h):2*Math.PI/39,m=a/f,S=isFinite(a)?1+Math.floor(3*m):Dr;S>Dr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${S} samples when the maximum is set to 20`);const v=[];let p=0;for(let _=0;_<Dr;++_){const A=_/m,R=Math.exp(-A*A/2);v.push(R),_===0?p+=R:_<S&&(p+=2*R)}for(let _=0;_<v.length;_++)v[_]=v[_]/p;d.envMap.value=e.texture,d.samples.value=S,d.weights.value=v,d.latitudinal.value=s==="latitudinal",l&&(d.poleAxis.value=l);const{_lodMax:x}=this;d.dTheta.value=f,d.mipInt.value=x-i;const g=this._sizeLods[r];Qa(t,3*g*(r>x-4?r-x+4:0),4*(this._cubeSize-g),3*g,2*g),c.setRenderTarget(t),c.render(u,dl)}}function Sh(n,e,t){const i=new Jn(n,e,t);return i.texture.mapping=xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Eh(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function yh(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function _l(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zg(n){let e=new WeakMap,t=null;function i(r){const a=r.target;a.removeEventListener("dispose",i);const s=e.get(a);s!==void 0&&(e.delete(a),s.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,s=a===to||a===no,l=a===Ri||a===Ci;if(s||l){let c=e.get(r);const o=c!==void 0?c.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==o)return t===null&&(t=new Mh(n)),c=s?t.fromEquirectangular(r,c):t.fromCubemap(r,c),c.texture.pmremVersion=r.pmremVersion,e.set(r,c),c.texture;if(c!==void 0)return c.texture;{const u=r.image;return s&&u&&u.height>0||l&&u&&function(d){let h=0;const f=6;for(let m=0;m<f;m++)d[m]!==void 0&&h++;return h===f}(u)?(t===null&&(t=new Mh(n)),c=s?t.fromEquirectangular(r):t.fromCubemap(r),c.texture.pmremVersion=r.pmremVersion,e.set(r,c),r.addEventListener("dispose",i),c.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Hg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ia("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Gg(n,e,t,i){const r={},a=new WeakMap;function s(c){const o=c.target;o.index!==null&&e.remove(o.index);for(const d in o.attributes)e.remove(o.attributes[d]);for(const d in o.morphAttributes){const h=o.morphAttributes[d];for(let f=0,m=h.length;f<m;f++)e.remove(h[f])}o.removeEventListener("dispose",s),delete r[o.id];const u=a.get(o);u&&(e.remove(u),a.delete(o)),i.releaseStatesOfGeometry(o),o.isInstancedBufferGeometry===!0&&delete o._maxInstanceCount,t.memory.geometries--}function l(c){const o=[],u=c.index,d=c.attributes.position;let h=0;if(u!==null){const S=u.array;h=u.version;for(let v=0,p=S.length;v<p;v+=3){const x=S[v+0],g=S[v+1],_=S[v+2];o.push(x,g,g,_,_,x)}}else{if(d===void 0)return;{const S=d.array;h=d.version;for(let v=0,p=S.length/3-1;v<p;v+=3){const x=v+0,g=v+1,_=v+2;o.push(x,g,g,_,_,x)}}}const f=new(Gu(o)?oh:sh)(o,1);f.version=h;const m=a.get(c);m&&e.remove(m),a.set(c,f)}return{get:function(c,o){return r[o.id]===!0||(o.addEventListener("dispose",s),r[o.id]=!0,t.memory.geometries++),o},update:function(c){const o=c.attributes;for(const d in o)e.update(o[d],n.ARRAY_BUFFER);const u=c.morphAttributes;for(const d in u){const h=u[d];for(let f=0,m=h.length;f<m;f++)e.update(h[f],n.ARRAY_BUFFER)}},getWireframeAttribute:function(c){const o=a.get(c);if(o){const u=c.index;u!==null&&o.version<u.version&&l(c)}else l(c);return a.get(c)}}}function Vg(n,e,t){let i,r,a;function s(l,c,o){o!==0&&(n.drawElementsInstanced(i,c,r,l*a,o),t.update(c,i,o))}this.setMode=function(l){i=l},this.setIndex=function(l){r=l.type,a=l.bytesPerElement},this.render=function(l,c){n.drawElements(i,c,r,l*a),t.update(c,i,1)},this.renderInstances=s,this.renderMultiDraw=function(l,c,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,c,0,r,l,0,o);let u=0;for(let d=0;d<o;d++)u+=c[d];t.update(u,i,1)},this.renderMultiDrawInstances=function(l,c,o,u){if(o===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let h=0;h<l.length;h++)s(l[h]/a,c[h],u[h]);else{d.multiDrawElementsInstancedWEBGL(i,c,0,r,l,0,u,0,o);let h=0;for(let f=0;f<o;f++)h+=c[f];for(let f=0;f<u.length;f++)t.update(h,i,u[f])}}}function Wg(n){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,i,r){switch(e.calls++,i){case n.TRIANGLES:e.triangles+=r*(t/3);break;case n.LINES:e.lines+=r*(t/2);break;case n.LINE_STRIP:e.lines+=r*(t-1);break;case n.LINE_LOOP:e.lines+=r*t;break;case n.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",i)}}}}function Xg(n,e,t){const i=new WeakMap,r=new Ze;return{update:function(a,s,l){const c=a.morphTargetInfluences,o=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=o!==void 0?o.length:0;let d=i.get(s);if(d===void 0||d.count!==u){let D=function(){R.dispose(),i.delete(s),s.removeEventListener("dispose",D)};d!==void 0&&d.texture.dispose();const h=s.morphAttributes.position!==void 0,f=s.morphAttributes.normal!==void 0,m=s.morphAttributes.color!==void 0,S=s.morphAttributes.position||[],v=s.morphAttributes.normal||[],p=s.morphAttributes.color||[];let x=0;h===!0&&(x=1),f===!0&&(x=2),m===!0&&(x=3);let g=s.attributes.position.count*x,_=1;g>e.maxTextureSize&&(_=Math.ceil(g/e.maxTextureSize),g=e.maxTextureSize);const A=new Float32Array(g*_*4*u),R=new qu(A,g,_,u);R.type=hn,R.needsUpdate=!0;const T=4*x;for(let w=0;w<u;w++){const C=S[w],F=v[w],N=p[w],q=g*_*4*w;for(let B=0;B<C.count;B++){const X=B*T;h===!0&&(r.fromBufferAttribute(C,B),A[q+X+0]=r.x,A[q+X+1]=r.y,A[q+X+2]=r.z,A[q+X+3]=0),f===!0&&(r.fromBufferAttribute(F,B),A[q+X+4]=r.x,A[q+X+5]=r.y,A[q+X+6]=r.z,A[q+X+7]=0),m===!0&&(r.fromBufferAttribute(N,B),A[q+X+8]=r.x,A[q+X+9]=r.y,A[q+X+10]=r.z,A[q+X+11]=N.itemSize===4?r.w:1)}}d={count:u,texture:R,size:new De(g,_)},i.set(s,d),s.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let h=0;for(let m=0;m<c.length;m++)h+=c[m];const f=s.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",f),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}}}function Yg(n,e,t,i){let r=new WeakMap;function a(s){const l=s.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(s){const l=i.render.frame,c=s.geometry,o=e.get(s,c);if(r.get(o)!==l&&(e.update(o),r.set(o,l)),s.isInstancedMesh&&(s.hasEventListener("dispose",a)===!1&&s.addEventListener("dispose",a),r.get(s)!==l&&(t.update(s.instanceMatrix,n.ARRAY_BUFFER),s.instanceColor!==null&&t.update(s.instanceColor,n.ARRAY_BUFFER),r.set(s,l))),s.isSkinnedMesh){const u=s.skeleton;r.get(u)!==l&&(u.update(),r.set(u,l))}return o},dispose:function(){r=new WeakMap}}}class bh extends _t{constructor(e,t,i,r,a,s,l,c,o,u=1026){if(u!==yr&&u!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===yr&&(i=$n),i===void 0&&u===Ii&&(i=Pi),super(null,r,a,s,l,c,u,i,o),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Ut,this.minFilter=c!==void 0?c:Ut,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Th=new _t,wh=new bh(1,1),Ah=new qu,Rh=new gg,Ch=new ph,Lh=[],Ph=[],Ih=new Float32Array(16),Uh=new Float32Array(9),Dh=new Float32Array(4);function $i(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=Lh[r];if(a===void 0&&(a=new Float32Array(r),Lh[r]=a),e!==0){i.toArray(a,0);for(let s=1,l=0;s!==e;++s)l+=t,n[s].toArray(a,l)}return a}function it(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function es(n,e){let t=Ph[e];t===void 0&&(t=new Int32Array(e),Ph[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function qg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function jg(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(it(t,e))return;n.uniform2fv(this.addr,e),rt(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(it(t,e))return;n.uniform3fv(this.addr,e),rt(t,e)}}function Kg(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(it(t,e))return;n.uniform4fv(this.addr,e),rt(t,e)}}function $g(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(it(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),rt(t,e)}else{if(it(t,i))return;Dh.set(i),n.uniformMatrix2fv(this.addr,!1,Dh),rt(t,i)}}function Jg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(it(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),rt(t,e)}else{if(it(t,i))return;Uh.set(i),n.uniformMatrix3fv(this.addr,!1,Uh),rt(t,i)}}function Qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(it(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),rt(t,e)}else{if(it(t,i))return;Ih.set(i),n.uniformMatrix4fv(this.addr,!1,Ih),rt(t,i)}}function e_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function t_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(it(t,e))return;n.uniform2iv(this.addr,e),rt(t,e)}}function n_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(it(t,e))return;n.uniform3iv(this.addr,e),rt(t,e)}}function i_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(it(t,e))return;n.uniform4iv(this.addr,e),rt(t,e)}}function r_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function a_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(it(t,e))return;n.uniform2uiv(this.addr,e),rt(t,e)}}function s_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(it(t,e))return;n.uniform3uiv(this.addr,e),rt(t,e)}}function o_(n,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(it(t,e))return;n.uniform4uiv(this.addr,e),rt(t,e)}}function l_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();let a;i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),this.type===n.SAMPLER_2D_SHADOW?(wh.compareFunction=Bu,a=wh):a=Th,t.setTexture2D(e||a,r)}function c_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Rh,r)}function u_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ch,r)}function h_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ah,r)}function d_(n,e){n.uniform1fv(this.addr,e)}function f_(n,e){const t=$i(e,this.size,2);n.uniform2fv(this.addr,t)}function p_(n,e){const t=$i(e,this.size,3);n.uniform3fv(this.addr,t)}function m_(n,e){const t=$i(e,this.size,4);n.uniform4fv(this.addr,t)}function g_(n,e){const t=$i(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function __(n,e){const t=$i(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function v_(n,e){const t=$i(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function x_(n,e){n.uniform1iv(this.addr,e)}function M_(n,e){n.uniform2iv(this.addr,e)}function S_(n,e){n.uniform3iv(this.addr,e)}function E_(n,e){n.uniform4iv(this.addr,e)}function y_(n,e){n.uniform1uiv(this.addr,e)}function b_(n,e){n.uniform2uiv(this.addr,e)}function T_(n,e){n.uniform3uiv(this.addr,e)}function w_(n,e){n.uniform4uiv(this.addr,e)}function A_(n,e,t){const i=this.cache,r=e.length,a=es(t,r);it(i,a)||(n.uniform1iv(this.addr,a),rt(i,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||Th,a[s])}function R_(n,e,t){const i=this.cache,r=e.length,a=es(t,r);it(i,a)||(n.uniform1iv(this.addr,a),rt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Rh,a[s])}function C_(n,e,t){const i=this.cache,r=e.length,a=es(t,r);it(i,a)||(n.uniform1iv(this.addr,a),rt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Ch,a[s])}function L_(n,e,t){const i=this.cache,r=e.length,a=es(t,r);it(i,a)||(n.uniform1iv(this.addr,a),rt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Ah,a[s])}class P_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=function(r){switch(r){case 5126:return qg;case 35664:return jg;case 35665:return Zg;case 35666:return Kg;case 35674:return $g;case 35675:return Jg;case 35676:return Qg;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return r_;case 36294:return a_;case 36295:return s_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return h_}}(t.type)}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(r){switch(r){case 5126:return d_;case 35664:return f_;case 35665:return p_;case 35666:return m_;case 35674:return g_;case 35675:return __;case 35676:return v_;case 5124:case 35670:return x_;case 35667:case 35671:return M_;case 35668:case 35672:return S_;case 35669:case 35673:return E_;case 5125:return y_;case 36294:return b_;case 36295:return T_;case 36296:return w_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return C_;case 36289:case 36303:case 36311:case 36292:return L_}}(t.type)}}class U_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const l=r[a];l.setValue(e,t[l.id],i)}}}const vl=/(\w+)(\])?(\[|\.)?/g;function Nh(n,e){n.seq.push(e),n.map[e.id]=e}function D_(n,e,t){const i=n.name,r=i.length;for(vl.lastIndex=0;;){const a=vl.exec(i),s=vl.lastIndex;let l=a[1];const c=a[2]==="]",o=a[3];if(c&&(l|=0),o===void 0||o==="["&&s+2===r){Nh(t,o===void 0?new P_(l,n,e):new I_(l,n,e));break}{let u=t.map[l];u===void 0&&(u=new U_(l),Nh(t,u)),t=u}}}class ts{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(t,r);D_(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const l=t[a],c=i[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function Oh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const N_=37297;let O_=0;function Fh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+function(l,c){const o=l.split(`
`),u=[],d=Math.max(c-6,0),h=Math.min(c+6,o.length);for(let f=d;f<h;f++){const m=f+1;u.push(`${m===c?">":" "} ${m}: ${o[f]}`)}return u.join(`
`)}(n.getShaderSource(e),s)}return r}function F_(n,e){const t=function(i){const r=ke.getPrimaries(ke.workingColorSpace),a=ke.getPrimaries(i);let s;switch(r===a?s="":r===Ca&&a===Ra?s="LinearDisplayP3ToLinearSRGB":r===Ra&&a===Ca&&(s="LinearSRGBToLinearDisplayP3"),i){case Cn:case wa:return[s,"LinearTransferOETF"];case en:case Bo:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[s,"LinearTransferOETF"]}}(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function k_(n,e){let t;switch(e){case tg:t="Linear";break;case ng:t="Reinhard";break;case ig:t="Cineon";break;case rg:t="ACESFilmic";break;case sg:t="AgX";break;case og:t="Neutral";break;case ag:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ns=new L;function B_(){return ke.getLuminanceCoefficients(ns),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ns.x.toFixed(4)}, ${ns.y.toFixed(4)}, ${ns.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Nr(n){return n!==""}function kh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const z_=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(n){return n.replace(z_,G_)}const H_=new Map;function G_(n,e){let t=Te[e];if(t===void 0){const i=H_.get(e);if(i===void 0)throw new Error("Can not resolve #include <"+e+">");t=Te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i)}return xl(t)}const V_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zh(n){return n.replace(V_,W_)}function W_(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Hh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function X_(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,l=t.fragmentShader;const c=function(F){let N="SHADOWMAP_TYPE_BASIC";return F.shadowMapType===wu?N="SHADOWMAP_TYPE_PCF":F.shadowMapType===Jm?N="SHADOWMAP_TYPE_PCF_SOFT":F.shadowMapType===cn&&(N="SHADOWMAP_TYPE_VSM"),N}(t),o=function(F){let N="ENVMAP_TYPE_CUBE";if(F.envMap)switch(F.envMapMode){case Ri:case Ci:N="ENVMAP_TYPE_CUBE";break;case xa:N="ENVMAP_TYPE_CUBE_UV"}return N}(t),u=function(F){let N="ENVMAP_MODE_REFLECTION";return F.envMap&&F.envMapMode===Ci&&(N="ENVMAP_MODE_REFRACTION"),N}(t),d=function(F){let N="ENVMAP_BLENDING_NONE";if(F.envMap)switch(F.combine){case Au:N="ENVMAP_BLENDING_MULTIPLY";break;case Qm:N="ENVMAP_BLENDING_MIX";break;case eg:N="ENVMAP_BLENDING_ADD"}return N}(t),h=function(F){const N=F.envMapCubeUVHeight;if(N===null)return null;const q=Math.log2(N)-2,B=1/N;return{texelWidth:1/(3*Math.max(Math.pow(2,q),112)),texelHeight:B,maxMip:q}}(t),f=function(F){return[F.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",F.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}(t),m=function(F){const N=[];for(const q in F){const B=F[q];B!==!1&&N.push("#define "+q+" "+B)}return N.join(`
`)}(a),S=r.createProgram();let v,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Nr).join(`
`),v.length>0&&(v+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Nr).join(`
`),p.length>0&&(p+=`
`)):(v=[Hh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),p=[Hh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+o:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?Te.tonemapping_pars_fragment:"",t.toneMapping!==Rn?k_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Te.colorspace_pars_fragment,F_("linearToOutputTexel",t.outputColorSpace),B_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Nr).join(`
`)),s=xl(s),s=kh(s,t),s=Bh(s,t),l=xl(l),l=kh(l,t),l=Bh(l,t),s=zh(s),l=zh(l),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,v=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,p=["#define varying in",t.glslVersion===Hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const g=x+v+s,_=x+p+l,A=Oh(r,r.VERTEX_SHADER,g),R=Oh(r,r.FRAGMENT_SHADER,_);function T(F){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(S).trim(),q=r.getShaderInfoLog(A).trim(),B=r.getShaderInfoLog(R).trim();let X=!0,j=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,S,A,R);else{const Q=Fh(r,A,"vertex"),J=Fh(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+N+`
`+Q+`
`+J)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):q!==""&&B!==""||(j=!1);j&&(F.diagnostics={runnable:X,programLog:N,vertexShader:{log:q,prefix:v},fragmentShader:{log:B,prefix:p}})}r.deleteShader(A),r.deleteShader(R),D=new ts(r,S),w=function(N,q){const B={},X=N.getProgramParameter(q,N.ACTIVE_ATTRIBUTES);for(let j=0;j<X;j++){const Q=N.getActiveAttrib(q,j),J=Q.name;let ae=1;Q.type===N.FLOAT_MAT2&&(ae=2),Q.type===N.FLOAT_MAT3&&(ae=3),Q.type===N.FLOAT_MAT4&&(ae=4),B[J]={type:Q.type,location:N.getAttribLocation(q,J),locationSize:ae}}return B}(r,S)}let D,w;r.attachShader(S,A),r.attachShader(S,R),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S),this.getUniforms=function(){return D===void 0&&T(this),D},this.getAttributes=function(){return w===void 0&&T(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(S,N_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=O_++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=A,this.fragmentShader=R,this}let Y_=0;class q_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new j_(e),t.set(e,i)),i}}class j_{constructor(e){this.id=Y_++,this.code=e,this.usedTimes=0}}function Z_(n,e,t,i,r,a,s){const l=new $u,c=new q_,o=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,f=r.vertexTextures;let m=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(p){return o.add(p),p===0?"uv":`uv${p}`}return{getParameters:function(p,x,g,_,A){const R=_.fog,T=A.geometry,D=p.isMeshStandardMaterial?_.environment:null,w=(p.isMeshStandardMaterial?t:e).get(p.envMap||D),C=w&&w.mapping===xa?w.image.height:null,F=S[p.type];p.precision!==null&&(m=r.getMaxPrecision(p.precision),m!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",m,"instead."));const N=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,q=N!==void 0?N.length:0;let B,X,j,Q,J=0;if(T.morphAttributes.position!==void 0&&(J=1),T.morphAttributes.normal!==void 0&&(J=2),T.morphAttributes.color!==void 0&&(J=3),F){const Xr=nn[F];B=Xr.vertexShader,X=Xr.fragmentShader}else B=p.vertexShader,X=p.fragmentShader,c.update(p),j=c.getVertexShaderID(p),Q=c.getFragmentShaderID(p);const ae=n.getRenderTarget(),he=A.isInstancedMesh===!0,K=A.isBatchedMesh===!0,$=!!p.map,oe=!!p.matcap,fe=!!w,y=!!p.aoMap,M=!!p.lightMap,I=!!p.bumpMap,Y=!!p.normalMap,U=!!p.displacementMap,k=!!p.emissiveMap,b=!!p.metalnessMap,z=!!p.roughnessMap,G=p.anisotropy>0,ie=p.clearcoat>0,V=p.dispersion>0,te=p.iridescence>0,re=p.sheen>0,ee=p.transmission>0,ce=G&&!!p.anisotropyMap,ue=ie&&!!p.clearcoatMap,me=ie&&!!p.clearcoatNormalMap,ye=ie&&!!p.clearcoatRoughnessMap,Ie=te&&!!p.iridescenceMap,Ce=te&&!!p.iridescenceThicknessMap,ge=re&&!!p.sheenColorMap,Fe=re&&!!p.sheenRoughnessMap,Ge=!!p.specularMap,Ke=!!p.specularColorMap,pe=!!p.specularIntensityMap,Ae=ee&&!!p.transmissionMap,Ve=ee&&!!p.thicknessMap,hs=!!p.gradientMap,er=!!p.alphaMap,Lt=p.alphaTest>0,xn=!!p.alphaHash,ci=!!p.extensions;let P=Rn;p.toneMapped&&(ae!==null&&ae.isXRRenderTarget!==!0||(P=n.toneMapping));const ui={shaderID:F,shaderType:p.type,shaderName:p.name,vertexShader:B,fragmentShader:X,defines:p.defines,customVertexShaderID:j,customFragmentShaderID:Q,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:m,batching:K,batchingColor:K&&A._colorsTexture!==null,instancing:he,instancingColor:he&&A.instanceColor!==null,instancingMorph:he&&A.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Cn,alphaToCoverage:!!p.alphaToCoverage,map:$,matcap:oe,envMap:fe,envMapMode:fe&&w.mapping,envMapCubeUVHeight:C,aoMap:y,lightMap:M,bumpMap:I,normalMap:Y,displacementMap:f&&U,emissiveMap:k,normalMapObjectSpace:Y&&p.normalMapType===1,normalMapTangentSpace:Y&&p.normalMapType===0,metalnessMap:b,roughnessMap:z,anisotropy:G,anisotropyMap:ce,clearcoat:ie,clearcoatMap:ue,clearcoatNormalMap:me,clearcoatRoughnessMap:ye,dispersion:V,iridescence:te,iridescenceMap:Ie,iridescenceThicknessMap:Ce,sheen:re,sheenColorMap:ge,sheenRoughnessMap:Fe,specularMap:Ge,specularColorMap:Ke,specularIntensityMap:pe,transmission:ee,transmissionMap:Ae,thicknessMap:Ve,gradientMap:hs,opaque:p.transparent===!1&&p.blending===1&&p.alphaToCoverage===!1,alphaMap:er,alphaTest:Lt,alphaHash:xn,combine:p.combine,mapUv:$&&v(p.map.channel),aoMapUv:y&&v(p.aoMap.channel),lightMapUv:M&&v(p.lightMap.channel),bumpMapUv:I&&v(p.bumpMap.channel),normalMapUv:Y&&v(p.normalMap.channel),displacementMapUv:U&&v(p.displacementMap.channel),emissiveMapUv:k&&v(p.emissiveMap.channel),metalnessMapUv:b&&v(p.metalnessMap.channel),roughnessMapUv:z&&v(p.roughnessMap.channel),anisotropyMapUv:ce&&v(p.anisotropyMap.channel),clearcoatMapUv:ue&&v(p.clearcoatMap.channel),clearcoatNormalMapUv:me&&v(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&v(p.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&v(p.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&v(p.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&v(p.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&v(p.sheenRoughnessMap.channel),specularMapUv:Ge&&v(p.specularMap.channel),specularColorMapUv:Ke&&v(p.specularColorMap.channel),specularIntensityMapUv:pe&&v(p.specularIntensityMap.channel),transmissionMapUv:Ae&&v(p.transmissionMap.channel),thicknessMapUv:Ve&&v(p.thicknessMap.channel),alphaMapUv:er&&v(p.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(Y||G),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!T.attributes.uv&&($||er),fog:!!R,useFog:p.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:p.flatShading===!0,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:A.isSkinnedMesh===!0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:J,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:p.dithering,shadowMapEnabled:n.shadowMap.enabled&&g.length>0,shadowMapType:n.shadowMap.type,toneMapping:P,decodeVideoTexture:$&&p.map.isVideoTexture===!0&&ke.getTransfer(p.map.colorSpace)===Xe,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===2,flipSided:p.side===Et,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:ci&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ci&&p.extensions.multiDraw===!0||K)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return ui.vertexUv1s=o.has(1),ui.vertexUv2s=o.has(2),ui.vertexUv3s=o.has(3),o.clear(),ui},getProgramCacheKey:function(p){const x=[];if(p.shaderID?x.push(p.shaderID):(x.push(p.customVertexShaderID),x.push(p.customFragmentShaderID)),p.defines!==void 0)for(const g in p.defines)x.push(g),x.push(p.defines[g]);return p.isRawShaderMaterial===!1&&(function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)}(x,p),function(g,_){l.disableAll(),_.supportsVertexTextures&&l.enable(0),_.instancing&&l.enable(1),_.instancingColor&&l.enable(2),_.instancingMorph&&l.enable(3),_.matcap&&l.enable(4),_.envMap&&l.enable(5),_.normalMapObjectSpace&&l.enable(6),_.normalMapTangentSpace&&l.enable(7),_.clearcoat&&l.enable(8),_.iridescence&&l.enable(9),_.alphaTest&&l.enable(10),_.vertexColors&&l.enable(11),_.vertexAlphas&&l.enable(12),_.vertexUv1s&&l.enable(13),_.vertexUv2s&&l.enable(14),_.vertexUv3s&&l.enable(15),_.vertexTangents&&l.enable(16),_.anisotropy&&l.enable(17),_.alphaHash&&l.enable(18),_.batching&&l.enable(19),_.dispersion&&l.enable(20),_.batchingColor&&l.enable(21),g.push(l.mask),l.disableAll(),_.fog&&l.enable(0),_.useFog&&l.enable(1),_.flatShading&&l.enable(2),_.logarithmicDepthBuffer&&l.enable(3),_.reverseDepthBuffer&&l.enable(4),_.skinning&&l.enable(5),_.morphTargets&&l.enable(6),_.morphNormals&&l.enable(7),_.morphColors&&l.enable(8),_.premultipliedAlpha&&l.enable(9),_.shadowMapEnabled&&l.enable(10),_.doubleSided&&l.enable(11),_.flipSided&&l.enable(12),_.useDepthPacking&&l.enable(13),_.dithering&&l.enable(14),_.transmission&&l.enable(15),_.sheen&&l.enable(16),_.opaque&&l.enable(17),_.pointsUvs&&l.enable(18),_.decodeVideoTexture&&l.enable(19),_.alphaToCoverage&&l.enable(20),g.push(l.mask)}(x,p),x.push(n.outputColorSpace)),x.push(p.customProgramCacheKey),x.join()},getUniforms:function(p){const x=S[p.type];let g;if(x){const _=nn[x];g=Ag.clone(_.uniforms)}else g=p.uniforms;return g},acquireProgram:function(p,x){let g;for(let _=0,A=u.length;_<A;_++){const R=u[_];if(R.cacheKey===x){g=R,++g.usedTimes;break}}return g===void 0&&(g=new X_(n,x,p,a),u.push(g)),g},releaseProgram:function(p){if(--p.usedTimes==0){const x=u.indexOf(p);u[x]=u[u.length-1],u.pop(),p.destroy()}},releaseShaderCache:function(p){c.remove(p)},programs:u,dispose:function(){c.dispose()}}}function K_(){let n=new WeakMap;return{has:function(e){return n.has(e)},get:function(e){let t=n.get(e);return t===void 0&&(t={},n.set(e,t)),t},remove:function(e){n.delete(e)},update:function(e,t,i){n.get(e)[t]=i},dispose:function(){n=new WeakMap}}}function $_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Gh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Vh(){const n=[];let e=0;const t=[],i=[],r=[];function a(s,l,c,o,u,d){let h=n[e];return h===void 0?(h={id:s.id,object:s,geometry:l,material:c,groupOrder:o,renderOrder:s.renderOrder,z:u,group:d},n[e]=h):(h.id=s.id,h.object=s,h.geometry=l,h.material=c,h.groupOrder=o,h.renderOrder=s.renderOrder,h.z=u,h.group=d),e++,h}return{opaque:t,transmissive:i,transparent:r,init:function(){e=0,t.length=0,i.length=0,r.length=0},push:function(s,l,c,o,u,d){const h=a(s,l,c,o,u,d);c.transmission>0?i.push(h):c.transparent===!0?r.push(h):t.push(h)},unshift:function(s,l,c,o,u,d){const h=a(s,l,c,o,u,d);c.transmission>0?i.unshift(h):c.transparent===!0?r.unshift(h):t.unshift(h)},finish:function(){for(let s=e,l=n.length;s<l;s++){const c=n[s];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(s,l){t.length>1&&t.sort(s||$_),i.length>1&&i.sort(l||Gh),r.length>1&&r.sort(l||Gh)}}}function J_(){let n=new WeakMap;return{get:function(e,t){const i=n.get(e);let r;return i===void 0?(r=new Vh,n.set(e,[r])):t>=i.length?(r=new Vh,i.push(r)):r=i[t],r},dispose:function(){n=new WeakMap}}}function Q_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ne};break;case"SpotLight":t={position:new L,direction:new L,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new L,halfWidth:new L,halfHeight:new L}}return n[e.id]=t,t}}}let e0=0;function t0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function n0(n){const e=new Q_,t=function(){const l={};return{get:function(c){if(l[c.id]!==void 0)return l[c.id];let o;switch(c.type){case"DirectionalLight":case"SpotLight":o={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":o={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3}}return l[c.id]=o,o}}}(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const r=new L,a=new Ee,s=new Ee;return{setup:function(l){let c=0,o=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,h=0,f=0,m=0,S=0,v=0,p=0,x=0,g=0,_=0,A=0;l.sort(t0);for(let T=0,D=l.length;T<D;T++){const w=l[T],C=w.color,F=w.intensity,N=w.distance,q=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)c+=C.r*F,o+=C.g*F,u+=C.b*F;else if(w.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(w.sh.coefficients[B],F);A++}else if(w.isDirectionalLight){const B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const X=w.shadow,j=t.get(w);j.shadowIntensity=X.intensity,j.shadowBias=X.bias,j.shadowNormalBias=X.normalBias,j.shadowRadius=X.radius,j.shadowMapSize=X.mapSize,i.directionalShadow[d]=j,i.directionalShadowMap[d]=q,i.directionalShadowMatrix[d]=w.shadow.matrix,v++}i.directional[d]=B,d++}else if(w.isSpotLight){const B=e.get(w);B.position.setFromMatrixPosition(w.matrixWorld),B.color.copy(C).multiplyScalar(F),B.distance=N,B.coneCos=Math.cos(w.angle),B.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),B.decay=w.decay,i.spot[f]=B;const X=w.shadow;if(w.map&&(i.spotLightMap[g]=w.map,g++,X.updateMatrices(w),w.castShadow&&_++),i.spotLightMatrix[f]=X.matrix,w.castShadow){const j=t.get(w);j.shadowIntensity=X.intensity,j.shadowBias=X.bias,j.shadowNormalBias=X.normalBias,j.shadowRadius=X.radius,j.shadowMapSize=X.mapSize,i.spotShadow[f]=j,i.spotShadowMap[f]=q,x++}f++}else if(w.isRectAreaLight){const B=e.get(w);B.color.copy(C).multiplyScalar(F),B.halfWidth.set(.5*w.width,0,0),B.halfHeight.set(0,.5*w.height,0),i.rectArea[m]=B,m++}else if(w.isPointLight){const B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),B.distance=w.distance,B.decay=w.decay,w.castShadow){const X=w.shadow,j=t.get(w);j.shadowIntensity=X.intensity,j.shadowBias=X.bias,j.shadowNormalBias=X.normalBias,j.shadowRadius=X.radius,j.shadowMapSize=X.mapSize,j.shadowCameraNear=X.camera.near,j.shadowCameraFar=X.camera.far,i.pointShadow[h]=j,i.pointShadowMap[h]=q,i.pointShadowMatrix[h]=w.shadow.matrix,p++}i.point[h]=B,h++}else if(w.isHemisphereLight){const B=e.get(w);B.skyColor.copy(w.color).multiplyScalar(F),B.groundColor.copy(w.groundColor).multiplyScalar(F),i.hemi[S]=B,S++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=o,i.ambient[2]=u;const R=i.hash;R.directionalLength===d&&R.pointLength===h&&R.spotLength===f&&R.rectAreaLength===m&&R.hemiLength===S&&R.numDirectionalShadows===v&&R.numPointShadows===p&&R.numSpotShadows===x&&R.numSpotMaps===g&&R.numLightProbes===A||(i.directional.length=d,i.spot.length=f,i.rectArea.length=m,i.point.length=h,i.hemi.length=S,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=p,i.pointShadowMap.length=p,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=p,i.spotLightMatrix.length=x+g-_,i.spotLightMap.length=g,i.numSpotLightShadowsWithMaps=_,i.numLightProbes=A,R.directionalLength=d,R.pointLength=h,R.spotLength=f,R.rectAreaLength=m,R.hemiLength=S,R.numDirectionalShadows=v,R.numPointShadows=p,R.numSpotShadows=x,R.numSpotMaps=g,R.numLightProbes=A,i.version=e0++)},setupView:function(l,c){let o=0,u=0,d=0,h=0,f=0;const m=c.matrixWorldInverse;for(let S=0,v=l.length;S<v;S++){const p=l[S];if(p.isDirectionalLight){const x=i.directional[o];x.direction.setFromMatrixPosition(p.matrixWorld),r.setFromMatrixPosition(p.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),o++}else if(p.isSpotLight){const x=i.spot[d];x.position.setFromMatrixPosition(p.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(p.matrixWorld),r.setFromMatrixPosition(p.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(p.isRectAreaLight){const x=i.rectArea[h];x.position.setFromMatrixPosition(p.matrixWorld),x.position.applyMatrix4(m),s.identity(),a.copy(p.matrixWorld),a.premultiply(m),s.extractRotation(a),x.halfWidth.set(.5*p.width,0,0),x.halfHeight.set(0,.5*p.height,0),x.halfWidth.applyMatrix4(s),x.halfHeight.applyMatrix4(s),h++}else if(p.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(p.matrixWorld),x.position.applyMatrix4(m),u++}else if(p.isHemisphereLight){const x=i.hemi[f];x.direction.setFromMatrixPosition(p.matrixWorld),x.direction.transformDirection(m),f++}}},state:i}}function Wh(n){const e=new n0(n),t=[],i=[],r={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,i.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){i.push(a)}}}function i0(n){let e=new WeakMap;return{get:function(t,i=0){const r=e.get(t);let a;return r===void 0?(a=new Wh(n),e.set(t,[a])):i>=r.length?(a=new Wh(n),r.push(a)):a=r[i],a},dispose:function(){e=new WeakMap}}}class r0 extends Ga{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class a0 extends Ga{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function s0(n,e,t){let i=new hl;const r=new De,a=new De,s=new Ze,l=new r0({depthPacking:3201}),c=new a0,o={},u=t.maxTextureSize,d={[An]:Et,[Et]:An,2:2},h=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new ni;m.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Ft(m,h),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wu;let p=this.type;function x(R,T){const D=e.update(S);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Jn(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(T,null,D,h,S,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(T,null,D,f,S,null)}function g(R,T,D,w){let C=null;const F=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(F!==void 0)C=F;else if(C=D.isPointLight===!0?c:l,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const N=C.uuid,q=T.uuid;let B=o[N];B===void 0&&(B={},o[N]=B);let X=B[q];X===void 0&&(X=C.clone(),B[q]=X,T.addEventListener("dispose",A)),C=X}return C.visible=T.visible,C.wireframe=T.wireframe,C.side=w===cn?T.shadowSide!==null?T.shadowSide:T.side:T.shadowSide!==null?T.shadowSide:d[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,D.isPointLight===!0&&C.isMeshDistanceMaterial===!0&&(n.properties.get(C).light=D),C}function _(R,T,D,w,C){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&C===cn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);const N=e.update(R),q=R.material;if(Array.isArray(q)){const B=N.groups;for(let X=0,j=B.length;X<j;X++){const Q=B[X],J=q[Q.materialIndex];if(J&&J.visible){const ae=g(R,J,w,C);R.onBeforeShadow(n,R,T,D,N,ae,Q),n.renderBufferDirect(D,null,N,ae,R,Q),R.onAfterShadow(n,R,T,D,N,ae,Q)}}}else if(q.visible){const B=g(R,q,w,C);R.onBeforeShadow(n,R,T,D,N,B,null),n.renderBufferDirect(D,null,N,B,R,null),R.onAfterShadow(n,R,T,D,N,B,null)}}const F=R.children;for(let N=0,q=F.length;N<q;N++)_(F[N],T,D,w,C)}function A(R){R.target.removeEventListener("dispose",A);for(const T in o){const D=o[T],w=R.target.uuid;w in D&&(D[w].dispose(),delete D[w])}}this.render=function(R,T,D){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||R.length===0)return;const w=n.getRenderTarget(),C=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),N=n.state;N.setBlending(0),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const q=p!==cn&&this.type===cn,B=p===cn&&this.type!==cn;for(let X=0,j=R.length;X<j;X++){const Q=R[X],J=Q.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;r.copy(J.mapSize);const ae=J.getFrameExtents();if(r.multiply(ae),a.copy(J.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ae.x),r.x=a.x*ae.x,J.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ae.y),r.y=a.y*ae.y,J.mapSize.y=a.y)),J.map===null||q===!0||B===!0){const K=this.type!==cn?{minFilter:Ut,magFilter:Ut}:{};J.map!==null&&J.map.dispose(),J.map=new Jn(r.x,r.y,K),J.map.texture.name=Q.name+".shadowMap",J.camera.updateProjectionMatrix()}n.setRenderTarget(J.map),n.clear();const he=J.getViewportCount();for(let K=0;K<he;K++){const $=J.getViewport(K);s.set(a.x*$.x,a.y*$.y,a.x*$.z,a.y*$.w),N.viewport(s),J.updateMatrices(Q,K),i=J.getFrustum(),_(T,D,J.camera,Q,this.type)}J.isPointLightShadow!==!0&&this.type===cn&&x(J,D),J.needsUpdate=!1}p=this.type,v.needsUpdate=!1,n.setRenderTarget(w,C,F)}}const o0={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function l0(n){const e=new function(){let b=!1;const z=new Ze;let G=null;const ie=new Ze(0,0,0,0);return{setMask:function(V){G===V||b||(n.colorMask(V,V,V,V),G=V)},setLocked:function(V){b=V},setClear:function(V,te,re,ee,ce){ce===!0&&(V*=ee,te*=ee,re*=ee),z.set(V,te,re,ee),ie.equals(z)===!1&&(n.clearColor(V,te,re,ee),ie.copy(z))},reset:function(){b=!1,G=null,ie.set(-1,0,0,0)}}},t=new function(){let b=!1,z=!1,G=null,ie=null,V=null;return{setReversed:function(te){z=te},setTest:function(te){te?oe(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(te){G===te||b||(n.depthMask(te),G=te)},setFunc:function(te){if(z&&(te=o0[te]),ie!==te){switch(te){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:default:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL)}ie=te}},setLocked:function(te){b=te},setClear:function(te){V!==te&&(n.clearDepth(te),V=te)},reset:function(){b=!1,G=null,ie=null,V=null}}},i=new function(){let b=!1,z=null,G=null,ie=null,V=null,te=null,re=null,ee=null,ce=null;return{setTest:function(ue){b||(ue?oe(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(ue){z===ue||b||(n.stencilMask(ue),z=ue)},setFunc:function(ue,me,ye){G===ue&&ie===me&&V===ye||(n.stencilFunc(ue,me,ye),G=ue,ie=me,V=ye)},setOp:function(ue,me,ye){te===ue&&re===me&&ee===ye||(n.stencilOp(ue,me,ye),te=ue,re=me,ee=ye)},setLocked:function(ue){b=ue},setClear:function(ue){ce!==ue&&(n.clearStencil(ue),ce=ue)},reset:function(){b=!1,z=null,G=null,ie=null,V=null,te=null,re=null,ee=null,ce=null}}},r=new WeakMap,a=new WeakMap;let s={},l={},c=new WeakMap,o=[],u=null,d=!1,h=null,f=null,m=null,S=null,v=null,p=null,x=null,g=new Ne(0,0,0),_=0,A=!1,R=null,T=null,D=null,w=null,C=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,q=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(B)[1]),N=q>=1):B.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),N=q>=2);let X=null,j={};const Q=n.getParameter(n.SCISSOR_BOX),J=n.getParameter(n.VIEWPORT),ae=new Ze().fromArray(Q),he=new Ze().fromArray(J);function K(b,z,G,ie){const V=new Uint8Array(4),te=n.createTexture();n.bindTexture(b,te),n.texParameteri(b,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(b,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let re=0;re<G;re++)b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY?n.texImage3D(z,0,n.RGBA,1,1,ie,0,n.RGBA,n.UNSIGNED_BYTE,V):n.texImage2D(z+re,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,V);return te}const $={};function oe(b){s[b]!==!0&&(n.enable(b),s[b]=!0)}function fe(b){s[b]!==!1&&(n.disable(b),s[b]=!1)}$[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),i.setClear(0),oe(n.DEPTH_TEST),t.setFunc(3),Y(!1),U(1),oe(n.CULL_FACE),I(0);const y={[Kn]:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};y[103]=n.MIN,y[104]=n.MAX;const M={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,[Qs]:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,[eo]:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function I(b,z,G,ie,V,te,re,ee,ce,ue){if(b!==0){if(d===!1&&(oe(n.BLEND),d=!0),b===5)V=V||z,te=te||G,re=re||ie,z===f&&V===v||(n.blendEquationSeparate(y[z],y[V]),f=z,v=V),G===m&&ie===S&&te===p&&re===x||(n.blendFuncSeparate(M[G],M[ie],M[te],M[re]),m=G,S=ie,p=te,x=re),ee.equals(g)!==!1&&ce===_||(n.blendColor(ee.r,ee.g,ee.b,ce),g.copy(ee),_=ce),h=b,A=!1;else if(b!==h||ue!==A){if(f===Kn&&v===Kn||(n.blendEquation(n.FUNC_ADD),f=Kn,v=Kn),ue)switch(b){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}m=null,S=null,p=null,x=null,g.set(0,0,0),_=0,h=b,A=ue}}else d===!0&&(fe(n.BLEND),d=!1)}function Y(b){R!==b&&(b?n.frontFace(n.CW):n.frontFace(n.CCW),R=b)}function U(b){b!==0?(oe(n.CULL_FACE),b!==T&&(b===1?n.cullFace(n.BACK):b===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),T=b}function k(b,z,G){b?(oe(n.POLYGON_OFFSET_FILL),w===z&&C===G||(n.polygonOffset(z,G),w=z,C=G)):fe(n.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:i},enable:oe,disable:fe,bindFramebuffer:function(b,z){return l[b]!==z&&(n.bindFramebuffer(b,z),l[b]=z,b===n.DRAW_FRAMEBUFFER&&(l[n.FRAMEBUFFER]=z),b===n.FRAMEBUFFER&&(l[n.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(b,z){let G=o,ie=!1;if(b){G=c.get(z),G===void 0&&(G=[],c.set(z,G));const V=b.textures;if(G.length!==V.length||G[0]!==n.COLOR_ATTACHMENT0){for(let te=0,re=V.length;te<re;te++)G[te]=n.COLOR_ATTACHMENT0+te;G.length=V.length,ie=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,ie=!0);ie&&n.drawBuffers(G)},useProgram:function(b){return u!==b&&(n.useProgram(b),u=b,!0)},setBlending:I,setMaterial:function(b,z){b.side===2?fe(n.CULL_FACE):oe(n.CULL_FACE);let G=b.side===Et;z&&(G=!G),Y(G),b.blending===1&&b.transparent===!1?I(0):I(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),t.setFunc(b.depthFunc),t.setTest(b.depthTest),t.setMask(b.depthWrite),e.setMask(b.colorWrite);const ie=b.stencilWrite;i.setTest(ie),ie&&(i.setMask(b.stencilWriteMask),i.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),i.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),k(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:Y,setCullFace:U,setLineWidth:function(b){b!==D&&(N&&n.lineWidth(b),D=b)},setPolygonOffset:k,setScissorTest:function(b){b?oe(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)},activeTexture:function(b){b===void 0&&(b=n.TEXTURE0+F-1),X!==b&&(n.activeTexture(b),X=b)},bindTexture:function(b,z,G){G===void 0&&(G=X===null?n.TEXTURE0+F-1:X);let ie=j[G];ie===void 0&&(ie={type:void 0,texture:void 0},j[G]=ie),ie.type===b&&ie.texture===z||(X!==G&&(n.activeTexture(G),X=G),n.bindTexture(b,z||$[b]),ie.type=b,ie.texture=z)},unbindTexture:function(){const b=j[X];b!==void 0&&b.type!==void 0&&(n.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)},compressedTexImage2D:function(){try{n.compressedTexImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexImage3D:function(){try{n.compressedTexImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{n.texImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage3D:function(){try{n.texImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},updateUBOMapping:function(b,z){let G=a.get(z);G===void 0&&(G=new WeakMap,a.set(z,G));let ie=G.get(b);ie===void 0&&(ie=n.getUniformBlockIndex(z,b.name),G.set(b,ie))},uniformBlockBinding:function(b,z){const G=a.get(z).get(b);r.get(z)!==G&&(n.uniformBlockBinding(z,G,b.__bindingPointIndex),r.set(z,G))},texStorage2D:function(){try{n.texStorage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texStorage3D:function(){try{n.texStorage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage2D:function(){try{n.texSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage3D:function(){try{n.texSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage2D:function(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage3D:function(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){ae.equals(b)===!1&&(n.scissor(b.x,b.y,b.z,b.w),ae.copy(b))},viewport:function(b){he.equals(b)===!1&&(n.viewport(b.x,b.y,b.z,b.w),he.copy(b))},reset:function(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),s={},X=null,j={},l={},c=new WeakMap,o=[],u=null,d=!1,h=null,f=null,m=null,S=null,v=null,p=null,x=null,g=new Ne(0,0,0),_=0,A=!1,R=null,T=null,D=null,w=null,C=null,ae.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),e.reset(),t.reset(),i.reset()}}}function Xh(n,e,t,i){const r=function(a){switch(a){case un:case Cu:return{byteLength:1,components:1};case Sr:case Lu:case Er:return{byteLength:2,components:1};case oo:case lo:return{byteLength:2,components:4};case $n:case so:case hn:return{byteLength:4,components:1};case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}(i);switch(t){case Iu:case Du:return n*e;case Nu:return n*e*2;case Ou:case co:return n*e/r.components*r.byteLength;case Fu:case uo:return n*e*2/r.components*r.byteLength;case Uu:return n*e*3/r.components*r.byteLength;case Ht:case ho:return n*e*4/r.components*r.byteLength;case Sa:case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ya:case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case po:case go:return Math.max(n,16)*Math.max(e,8)/4;case fo:case mo:return Math.max(n,8)*Math.max(e,8)/2;case _o:case vo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xo:case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case So:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case yo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case To:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Co:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Po:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Uo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ta:case Do:case No:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ku:case Oo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Fo:case ko:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function c0(n,e,t,i,r,a,s){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator!="undefined"&&/OculusBrowser/g.test(navigator.userAgent),o=new De,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(y,M){return f?new OffscreenCanvas(y,M):Pa("canvas")}function S(y,M,I){let Y=1;const U=fe(y);if((U.width>I||U.height>I)&&(Y=I/Math.max(U.width,U.height)),Y<1){if(typeof HTMLImageElement!="undefined"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&y instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&y instanceof ImageBitmap||typeof VideoFrame!="undefined"&&y instanceof VideoFrame){const k=Math.floor(Y*U.width),b=Math.floor(Y*U.height);d===void 0&&(d=m(k,b));const z=M?m(k,b):d;return z.width=k,z.height=b,z.getContext("2d").drawImage(y,0,0,k,b),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+k+"x"+b+")."),z}return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),y}return y}function v(y){return y.generateMipmaps&&y.minFilter!==Ut&&y.minFilter!==Dt}function p(y){n.generateMipmap(y)}function x(y,M,I,Y,U=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let k=M;if(M===n.RED&&(I===n.FLOAT&&(k=n.R32F),I===n.HALF_FLOAT&&(k=n.R16F),I===n.UNSIGNED_BYTE&&(k=n.R8)),M===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(k=n.R8UI),I===n.UNSIGNED_SHORT&&(k=n.R16UI),I===n.UNSIGNED_INT&&(k=n.R32UI),I===n.BYTE&&(k=n.R8I),I===n.SHORT&&(k=n.R16I),I===n.INT&&(k=n.R32I)),M===n.RG&&(I===n.FLOAT&&(k=n.RG32F),I===n.HALF_FLOAT&&(k=n.RG16F),I===n.UNSIGNED_BYTE&&(k=n.RG8)),M===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(k=n.RG8UI),I===n.UNSIGNED_SHORT&&(k=n.RG16UI),I===n.UNSIGNED_INT&&(k=n.RG32UI),I===n.BYTE&&(k=n.RG8I),I===n.SHORT&&(k=n.RG16I),I===n.INT&&(k=n.RG32I)),M===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(k=n.RGB8UI),I===n.UNSIGNED_SHORT&&(k=n.RGB16UI),I===n.UNSIGNED_INT&&(k=n.RGB32UI),I===n.BYTE&&(k=n.RGB8I),I===n.SHORT&&(k=n.RGB16I),I===n.INT&&(k=n.RGB32I)),M===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(k=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(k=n.RGBA16UI),I===n.UNSIGNED_INT&&(k=n.RGBA32UI),I===n.BYTE&&(k=n.RGBA8I),I===n.SHORT&&(k=n.RGBA16I),I===n.INT&&(k=n.RGBA32I)),M===n.RGB&&I===n.UNSIGNED_INT_5_9_9_9_REV&&(k=n.RGB9_E5),M===n.RGBA){const b=U?Aa:ke.getTransfer(Y);I===n.FLOAT&&(k=n.RGBA32F),I===n.HALF_FLOAT&&(k=n.RGBA16F),I===n.UNSIGNED_BYTE&&(k=b===Xe?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(k=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(k=n.RGB5_A1)}return k!==n.R16F&&k!==n.R32F&&k!==n.RG16F&&k!==n.RG32F&&k!==n.RGBA16F&&k!==n.RGBA32F||e.get("EXT_color_buffer_float"),k}function g(y,M){let I;return y?M===null||M===$n||M===Pi?I=n.DEPTH24_STENCIL8:M===hn?I=n.DEPTH32F_STENCIL8:M===Sr&&(I=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===$n||M===Pi?I=n.DEPTH_COMPONENT24:M===hn?I=n.DEPTH_COMPONENT32F:M===Sr&&(I=n.DEPTH_COMPONENT16),I}function _(y,M){return v(y)===!0||y.isFramebufferTexture&&y.minFilter!==Ut&&y.minFilter!==Dt?Math.log2(Math.max(M.width,M.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?M.mipmaps.length:1}function A(y){const M=y.target;M.removeEventListener("dispose",A),function(I){const Y=i.get(I);if(Y.__webglInit===void 0)return;const U=I.source,k=h.get(U);if(k){const b=k[Y.__cacheKey];b.usedTimes--,b.usedTimes===0&&T(I),Object.keys(k).length===0&&h.delete(U)}i.remove(I)}(M),M.isVideoTexture&&u.delete(M)}function R(y){const M=y.target;M.removeEventListener("dispose",R),function(I){const Y=i.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(Y.__webglFramebuffer[k]))for(let b=0;b<Y.__webglFramebuffer[k].length;b++)n.deleteFramebuffer(Y.__webglFramebuffer[k][b]);else n.deleteFramebuffer(Y.__webglFramebuffer[k]);Y.__webglDepthbuffer&&n.deleteRenderbuffer(Y.__webglDepthbuffer[k])}else{if(Array.isArray(Y.__webglFramebuffer))for(let k=0;k<Y.__webglFramebuffer.length;k++)n.deleteFramebuffer(Y.__webglFramebuffer[k]);else n.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&n.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let k=0;k<Y.__webglColorRenderbuffer.length;k++)Y.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(Y.__webglColorRenderbuffer[k]);Y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}const U=I.textures;for(let k=0,b=U.length;k<b;k++){const z=i.get(U[k]);z.__webglTexture&&(n.deleteTexture(z.__webglTexture),s.memory.textures--),i.remove(U[k])}i.remove(I)}(M)}function T(y){const M=i.get(y);n.deleteTexture(M.__webglTexture);const I=y.source;delete h.get(I)[M.__cacheKey],s.memory.textures--}let D=0;function w(y,M){const I=i.get(y);if(y.isVideoTexture&&function(Y){const U=s.render.frame;u.get(Y)!==U&&(u.set(Y,U),Y.update())}(y),y.isRenderTargetTexture===!1&&y.version>0&&I.__version!==y.version){const Y=y.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(Y.complete!==!1)return void X(I,y,M);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+M)}const C={[io]:n.REPEAT,[Mr]:n.CLAMP_TO_EDGE,[ro]:n.MIRRORED_REPEAT},F={[Ut]:n.NEAREST,[lg]:n.NEAREST_MIPMAP_NEAREST,[Ma]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[ao]:n.LINEAR_MIPMAP_NEAREST,[Li]:n.LINEAR_MIPMAP_LINEAR},N={512:n.NEVER,519:n.ALWAYS,513:n.LESS,[Bu]:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function q(y,M){if(M.type!==hn||e.has("OES_texture_float_linear")!==!1||M.magFilter!==Dt&&M.magFilter!==ao&&M.magFilter!==Ma&&M.magFilter!==Li&&M.minFilter!==Dt&&M.minFilter!==ao&&M.minFilter!==Ma&&M.minFilter!==Li||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,C[M.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,C[M.wrapT]),y!==n.TEXTURE_3D&&y!==n.TEXTURE_2D_ARRAY||n.texParameteri(y,n.TEXTURE_WRAP_R,C[M.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,F[M.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,F[M.minFilter]),M.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,N[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ut||M.minFilter!==Ma&&M.minFilter!==Li||M.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function B(y,M){let I=!1;y.__webglInit===void 0&&(y.__webglInit=!0,M.addEventListener("dispose",A));const Y=M.source;let U=h.get(Y);U===void 0&&(U={},h.set(Y,U));const k=function(b){const z=[];return z.push(b.wrapS),z.push(b.wrapT),z.push(b.wrapR||0),z.push(b.magFilter),z.push(b.minFilter),z.push(b.anisotropy),z.push(b.internalFormat),z.push(b.format),z.push(b.type),z.push(b.generateMipmaps),z.push(b.premultiplyAlpha),z.push(b.flipY),z.push(b.unpackAlignment),z.push(b.colorSpace),z.join()}(M);if(k!==y.__cacheKey){U[k]===void 0&&(U[k]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,I=!0),U[k].usedTimes++;const b=U[y.__cacheKey];b!==void 0&&(U[y.__cacheKey].usedTimes--,b.usedTimes===0&&T(M)),y.__cacheKey=k,y.__webglTexture=U[k].texture}return I}function X(y,M,I){let Y=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=n.TEXTURE_3D);const U=B(y,M),k=M.source;t.bindTexture(Y,y.__webglTexture,n.TEXTURE0+I);const b=i.get(k);if(k.version!==b.__version||U===!0){t.activeTexture(n.TEXTURE0+I);const z=ke.getPrimaries(ke.workingColorSpace),G=M.colorSpace===Ui?null:ke.getPrimaries(M.colorSpace),ie=M.colorSpace===Ui||z===G?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let V=S(M.image,!1,r.maxTextureSize);V=oe(M,V);const te=a.convert(M.format,M.colorSpace),re=a.convert(M.type);let ee,ce=x(M.internalFormat,te,re,M.colorSpace,M.isVideoTexture);q(Y,M);const ue=M.mipmaps,me=M.isVideoTexture!==!0,ye=b.__version===void 0||U===!0,Ie=k.dataReady,Ce=_(M,V);if(M.isDepthTexture)ce=g(M.format===Ii,M.type),ye&&(me?t.texStorage2D(n.TEXTURE_2D,1,ce,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,ce,V.width,V.height,0,te,re,null));else if(M.isDataTexture)if(ue.length>0){me&&ye&&t.texStorage2D(n.TEXTURE_2D,Ce,ce,ue[0].width,ue[0].height);for(let ge=0,Fe=ue.length;ge<Fe;ge++)ee=ue[ge],me?Ie&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,ee.width,ee.height,te,re,ee.data):t.texImage2D(n.TEXTURE_2D,ge,ce,ee.width,ee.height,0,te,re,ee.data);M.generateMipmaps=!1}else me?(ye&&t.texStorage2D(n.TEXTURE_2D,Ce,ce,V.width,V.height),Ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,V.width,V.height,te,re,V.data)):t.texImage2D(n.TEXTURE_2D,0,ce,V.width,V.height,0,te,re,V.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){me&&ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,ce,ue[0].width,ue[0].height,V.depth);for(let ge=0,Fe=ue.length;ge<Fe;ge++)if(ee=ue[ge],M.format!==Ht)if(te!==null)if(me){if(Ie)if(M.layerUpdates.size>0){const Ge=Xh(ee.width,ee.height,M.format,M.type);for(const Ke of M.layerUpdates){const pe=ee.data.subarray(Ke*Ge/ee.data.BYTES_PER_ELEMENT,(Ke+1)*Ge/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,Ke,ee.width,ee.height,1,te,pe,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,0,ee.width,ee.height,V.depth,te,ee.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ge,ce,ee.width,ee.height,V.depth,0,ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else me?Ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ge,0,0,0,ee.width,ee.height,V.depth,te,re,ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ge,ce,ee.width,ee.height,V.depth,0,te,re,ee.data)}else{me&&ye&&t.texStorage2D(n.TEXTURE_2D,Ce,ce,ue[0].width,ue[0].height);for(let ge=0,Fe=ue.length;ge<Fe;ge++)ee=ue[ge],M.format!==Ht?te!==null?me?Ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,ge,0,0,ee.width,ee.height,te,ee.data):t.compressedTexImage2D(n.TEXTURE_2D,ge,ce,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):me?Ie&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,ee.width,ee.height,te,re,ee.data):t.texImage2D(n.TEXTURE_2D,ge,ce,ee.width,ee.height,0,te,re,ee.data)}else if(M.isDataArrayTexture)if(me){if(ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ce,ce,V.width,V.height,V.depth),Ie)if(M.layerUpdates.size>0){const ge=Xh(V.width,V.height,M.format,M.type);for(const Fe of M.layerUpdates){const Ge=V.data.subarray(Fe*ge/V.data.BYTES_PER_ELEMENT,(Fe+1)*ge/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Fe,V.width,V.height,1,te,re,Ge)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,te,re,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,V.width,V.height,V.depth,0,te,re,V.data);else if(M.isData3DTexture)me?(ye&&t.texStorage3D(n.TEXTURE_3D,Ce,ce,V.width,V.height,V.depth),Ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,te,re,V.data)):t.texImage3D(n.TEXTURE_3D,0,ce,V.width,V.height,V.depth,0,te,re,V.data);else if(M.isFramebufferTexture){if(ye)if(me)t.texStorage2D(n.TEXTURE_2D,Ce,ce,V.width,V.height);else{let ge=V.width,Fe=V.height;for(let Ge=0;Ge<Ce;Ge++)t.texImage2D(n.TEXTURE_2D,Ge,ce,ge,Fe,0,te,re,null),ge>>=1,Fe>>=1}}else if(ue.length>0){if(me&&ye){const ge=fe(ue[0]);t.texStorage2D(n.TEXTURE_2D,Ce,ce,ge.width,ge.height)}for(let ge=0,Fe=ue.length;ge<Fe;ge++)ee=ue[ge],me?Ie&&t.texSubImage2D(n.TEXTURE_2D,ge,0,0,te,re,ee):t.texImage2D(n.TEXTURE_2D,ge,ce,te,re,ee);M.generateMipmaps=!1}else if(me){if(ye){const ge=fe(V);t.texStorage2D(n.TEXTURE_2D,Ce,ce,ge.width,ge.height)}Ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,re,V)}else t.texImage2D(n.TEXTURE_2D,0,ce,te,re,V);v(M)&&p(Y),b.__version=k.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function j(y,M,I,Y,U,k){const b=a.convert(I.format,I.colorSpace),z=a.convert(I.type),G=x(I.internalFormat,b,z,I.colorSpace);if(!i.get(M).__hasExternalTextures){const ie=Math.max(1,M.width>>k),V=Math.max(1,M.height>>k);U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?t.texImage3D(U,k,G,ie,V,M.depth,0,b,z,null):t.texImage2D(U,k,G,ie,V,0,b,z,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),$(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,U,i.get(I).__webglTexture,0,K(M)):(U===n.TEXTURE_2D||U>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&U<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,U,i.get(I).__webglTexture,k),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Q(y,M,I){if(n.bindRenderbuffer(n.RENDERBUFFER,y),M.depthBuffer){const Y=M.depthTexture,U=Y&&Y.isDepthTexture?Y.type:null,k=g(M.stencilBuffer,U),b=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,z=K(M);$(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,z,k,M.width,M.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,z,k,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,k,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,b,n.RENDERBUFFER,y)}else{const Y=M.textures;for(let U=0;U<Y.length;U++){const k=Y[U],b=a.convert(k.format,k.colorSpace),z=a.convert(k.type),G=x(k.internalFormat,b,z,k.colorSpace),ie=K(M);I&&$(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,G,M.width,M.height):$(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,G,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,G,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function J(y){const M=i.get(y),I=y.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==y.depthTexture){const Y=y.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const U=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",U)};Y.addEventListener("dispose",U),M.__depthDisposeCallback=U}M.__boundDepthTexture=Y}if(y.depthTexture&&!M.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");(function(Y,U){if(U&&U.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,Y),!U.depthTexture||!U.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");i.get(U.depthTexture).__webglTexture&&U.depthTexture.image.width===U.width&&U.depthTexture.image.height===U.height||(U.depthTexture.image.width=U.width,U.depthTexture.image.height=U.height,U.depthTexture.needsUpdate=!0),w(U.depthTexture,0);const k=i.get(U.depthTexture).__webglTexture,b=K(U);if(U.depthTexture.format===yr)$(U)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,b):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else{if(U.depthTexture.format!==Ii)throw new Error("Unknown depthTexture format");$(U)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,b):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0)}})(M.__webglFramebuffer,y)}else if(I){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=n.createRenderbuffer(),Q(M.__webglDepthbuffer[Y],y,!1);else{const U=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=M.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,U,n.RENDERBUFFER,k)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Q(M.__webglDepthbuffer,y,!1);else{const Y=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,U=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,U),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,U)}t.bindFramebuffer(n.FRAMEBUFFER,null)}const ae=[],he=[];function K(y){return Math.min(r.maxSamples,y.samples)}function $(y){const M=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function oe(y,M){const I=y.colorSpace,Y=y.format,U=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||I!==Cn&&I!==Ui&&(ke.getTransfer(I)===Xe?Y===Ht&&U===un||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),M}function fe(y){return typeof HTMLImageElement!="undefined"&&y instanceof HTMLImageElement?(o.width=y.naturalWidth||y.width,o.height=y.naturalHeight||y.height):typeof VideoFrame!="undefined"&&y instanceof VideoFrame?(o.width=y.displayWidth,o.height=y.displayHeight):(o.width=y.width,o.height=y.height),o}this.allocateTextureUnit=function(){const y=D;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),D+=1,y},this.resetTextureUnits=function(){D=0},this.setTexture2D=w,this.setTexture2DArray=function(y,M){const I=i.get(y);y.version>0&&I.__version!==y.version?X(I,y,M):t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+M)},this.setTexture3D=function(y,M){const I=i.get(y);y.version>0&&I.__version!==y.version?X(I,y,M):t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+M)},this.setTextureCube=function(y,M){const I=i.get(y);y.version>0&&I.__version!==y.version?function(Y,U,k){if(U.image.length!==6)return;const b=B(Y,U),z=U.source;t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+k);const G=i.get(z);if(z.version!==G.__version||b===!0){t.activeTexture(n.TEXTURE0+k);const ie=ke.getPrimaries(ke.workingColorSpace),V=U.colorSpace===Ui?null:ke.getPrimaries(U.colorSpace),te=U.colorSpace===Ui||ie===V?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,U.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,U.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const re=U.isCompressedTexture||U.image[0].isCompressedTexture,ee=U.image[0]&&U.image[0].isDataTexture,ce=[];for(let pe=0;pe<6;pe++)ce[pe]=re||ee?ee?U.image[pe].image:U.image[pe]:S(U.image[pe],!0,r.maxCubemapSize),ce[pe]=oe(U,ce[pe]);const ue=ce[0],me=a.convert(U.format,U.colorSpace),ye=a.convert(U.type),Ie=x(U.internalFormat,me,ye,U.colorSpace),Ce=U.isVideoTexture!==!0,ge=G.__version===void 0||b===!0,Fe=z.dataReady;let Ge,Ke=_(U,ue);if(q(n.TEXTURE_CUBE_MAP,U),re){Ce&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,Ie,ue.width,ue.height);for(let pe=0;pe<6;pe++){Ge=ce[pe].mipmaps;for(let Ae=0;Ae<Ge.length;Ae++){const Ve=Ge[Ae];U.format!==Ht?me!==null?Ce?Fe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae,0,0,Ve.width,Ve.height,me,Ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae,Ie,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae,0,0,Ve.width,Ve.height,me,ye,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae,Ie,Ve.width,Ve.height,0,me,ye,Ve.data)}}}else{if(Ge=U.mipmaps,Ce&&ge){Ge.length>0&&Ke++;const pe=fe(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,Ie,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(ee){Ce?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ce[pe].width,ce[pe].height,me,ye,ce[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Ie,ce[pe].width,ce[pe].height,0,me,ye,ce[pe].data);for(let Ae=0;Ae<Ge.length;Ae++){const Ve=Ge[Ae].image[pe].image;Ce?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae+1,0,0,Ve.width,Ve.height,me,ye,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae+1,Ie,Ve.width,Ve.height,0,me,ye,Ve.data)}}else{Ce?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,me,ye,ce[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Ie,me,ye,ce[pe]);for(let Ae=0;Ae<Ge.length;Ae++){const Ve=Ge[Ae];Ce?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae+1,0,0,me,ye,Ve.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ae+1,Ie,me,ye,Ve.image[pe])}}}v(U)&&p(n.TEXTURE_CUBE_MAP),G.__version=z.version,U.onUpdate&&U.onUpdate(U)}Y.__version=U.version}(I,y,M):t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+M)},this.rebindTextures=function(y,M,I){const Y=i.get(y);M!==void 0&&j(Y.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&J(y)},this.setupRenderTarget=function(y){const M=y.texture,I=i.get(y),Y=i.get(M);y.addEventListener("dispose",R);const U=y.textures,k=y.isWebGLCubeRenderTarget===!0,b=U.length>1;if(b||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=M.version,s.memory.textures++),k){I.__webglFramebuffer=[];for(let z=0;z<6;z++)if(M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer[z]=[];for(let G=0;G<M.mipmaps.length;G++)I.__webglFramebuffer[z][G]=n.createFramebuffer()}else I.__webglFramebuffer[z]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer=[];for(let z=0;z<M.mipmaps.length;z++)I.__webglFramebuffer[z]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(b)for(let z=0,G=U.length;z<G;z++){const ie=i.get(U[z]);ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture(),s.memory.textures++)}if(y.samples>0&&$(y)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let z=0;z<U.length;z++){const G=U[z];I.__webglColorRenderbuffer[z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[z]);const ie=a.convert(G.format,G.colorSpace),V=a.convert(G.type),te=x(G.internalFormat,ie,V,G.colorSpace,y.isXRRenderTarget===!0),re=K(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,re,te,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+z,n.RENDERBUFFER,I.__webglColorRenderbuffer[z])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),Q(I.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(k){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),q(n.TEXTURE_CUBE_MAP,M);for(let z=0;z<6;z++)if(M.mipmaps&&M.mipmaps.length>0)for(let G=0;G<M.mipmaps.length;G++)j(I.__webglFramebuffer[z][G],y,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+z,G);else j(I.__webglFramebuffer[z],y,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);v(M)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(b){for(let z=0,G=U.length;z<G;z++){const ie=U[z],V=i.get(ie);t.bindTexture(n.TEXTURE_2D,V.__webglTexture),q(n.TEXTURE_2D,ie),j(I.__webglFramebuffer,y,ie,n.COLOR_ATTACHMENT0+z,n.TEXTURE_2D,0),v(ie)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let z=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(z=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(z,Y.__webglTexture),q(z,M),M.mipmaps&&M.mipmaps.length>0)for(let G=0;G<M.mipmaps.length;G++)j(I.__webglFramebuffer[G],y,M,n.COLOR_ATTACHMENT0,z,G);else j(I.__webglFramebuffer,y,M,n.COLOR_ATTACHMENT0,z,0);v(M)&&p(z),t.unbindTexture()}y.depthBuffer&&J(y)},this.updateRenderTargetMipmap=function(y){const M=y.textures;for(let I=0,Y=M.length;I<Y;I++){const U=M[I];if(v(U)){const k=y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,b=i.get(U).__webglTexture;t.bindTexture(k,b),p(k),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(y){if(y.samples>0){if($(y)===!1){const M=y.textures,I=y.width,Y=y.height;let U=n.COLOR_BUFFER_BIT;const k=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,b=i.get(y),z=M.length>1;if(z)for(let G=0;G<M.length;G++)t.bindFramebuffer(n.FRAMEBUFFER,b.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,b.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,b.__webglFramebuffer);for(let G=0;G<M.length;G++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(U|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(U|=n.STENCIL_BUFFER_BIT)),z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,b.__webglColorRenderbuffer[G]);const ie=i.get(M[G]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,I,Y,0,0,I,Y,U,n.NEAREST),c===!0&&(ae.length=0,he.length=0,ae.push(n.COLOR_ATTACHMENT0+G),y.depthBuffer&&y.resolveDepthBuffer===!1&&(ae.push(k),he.push(k),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,he)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ae))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),z)for(let G=0;G<M.length;G++){t.bindFramebuffer(n.FRAMEBUFFER,b.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.RENDERBUFFER,b.__webglColorRenderbuffer[G]);const ie=i.get(M[G]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.TEXTURE_2D,ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,b.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const M=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}},this.setupDepthRenderbuffer=J,this.setupFrameBufferTexture=j,this.useMultisampledRTT=$}function u0(n,e){return{convert:function(t,i=""){let r;const a=ke.getTransfer(i);if(t===un)return n.UNSIGNED_BYTE;if(t===oo)return n.UNSIGNED_SHORT_4_4_4_4;if(t===lo)return n.UNSIGNED_SHORT_5_5_5_1;if(t===Pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(t===Cu)return n.BYTE;if(t===Lu)return n.SHORT;if(t===Sr)return n.UNSIGNED_SHORT;if(t===so)return n.INT;if(t===$n)return n.UNSIGNED_INT;if(t===hn)return n.FLOAT;if(t===Er)return n.HALF_FLOAT;if(t===Iu)return n.ALPHA;if(t===Uu)return n.RGB;if(t===Ht)return n.RGBA;if(t===Du)return n.LUMINANCE;if(t===Nu)return n.LUMINANCE_ALPHA;if(t===yr)return n.DEPTH_COMPONENT;if(t===Ii)return n.DEPTH_STENCIL;if(t===Ou)return n.RED;if(t===co)return n.RED_INTEGER;if(t===Fu)return n.RG;if(t===uo)return n.RG_INTEGER;if(t===ho)return n.RGBA_INTEGER;if(t===Sa||t===Ea||t===ya||t===ba)if(a===Xe){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===fo||t===po||t===mo||t===go){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===_o||t===vo||t===xo){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===_o||t===vo)return a===Xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===xo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Mo||t===So||t===Eo||t===yo||t===bo||t===To||t===wo||t===Ao||t===Ro||t===Co||t===Lo||t===Po||t===Io||t===Uo){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Mo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===So)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Eo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===yo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===bo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===To)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===wo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ao)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Ro)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Co)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Lo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Po)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Io)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Uo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ta||t===Do||t===No){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ta)return a===Xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Do)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===ku||t===Oo||t===Fo||t===ko){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Ta)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Pi?n.UNSIGNED_INT_24_8:n[t]!==void 0?n[t]:null}}}class h0 extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class is extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const d0={type:"move"};class Ml{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new is,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new is,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new is,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const l=this._targetRay,c=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){s=!0;for(const S of e.hand.values()){const v=t.getJointPose(S,i),p=this._getHandJoint(o,S);v!==null&&(p.matrix.fromArray(v.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=v.radius),p.visible=v!==null}const u=o.joints["index-finger-tip"],d=o.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;o.inputState.pinching&&h>f+m?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&h<=f-m&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(d0)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),o!==null&&(o.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new is;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class f0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new _t;e.properties.get(r).__webglTexture=t.texture,t.depthNear==i.depthNear&&t.depthFar==i.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vn({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new Ur(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class p0 extends Oi{constructor(e,t){super();const i=this;let r=null,a=1,s=null,l="local-floor",c=1,o=null,u=null,d=null,h=null,f=null,m=null;const S=new f0,v=t.getContextAttributes();let p=null,x=null;const g=[],_=[],A=new De;let R=null;const T=new Xt;T.layers.enable(1),T.viewport=new Ze;const D=new Xt;D.layers.enable(2),D.viewport=new Ze;const w=[T,D],C=new h0;C.layers.enable(1),C.layers.enable(2);let F=null,N=null;function q(K){const $=_.indexOf(K.inputSource);if($===-1)return;const oe=g[$];oe!==void 0&&(oe.update(K.inputSource,K.frame,o||s),oe.dispatchEvent({type:K.type,data:K.inputSource}))}function B(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",X);for(let K=0;K<g.length;K++){const $=_[K];$!==null&&(_[K]=null,g[K].disconnect($))}F=null,N=null,S.reset(),e.setRenderTarget(p),f=null,h=null,d=null,r=null,x=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}function X(K){for(let $=0;$<K.removed.length;$++){const oe=K.removed[$],fe=_.indexOf(oe);fe>=0&&(_[fe]=null,g[fe].disconnect(oe))}for(let $=0;$<K.added.length;$++){const oe=K.added[$];let fe=_.indexOf(oe);if(fe===-1){for(let M=0;M<g.length;M++){if(M>=_.length){_.push(oe),fe=M;break}if(_[M]===null){_[M]=oe,fe=M;break}}if(fe===-1)break}const y=g[fe];y&&y.connect(oe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let $=g[K];return $===void 0&&($=new Ml,g[K]=$),$.getTargetRaySpace()},this.getControllerGrip=function(K){let $=g[K];return $===void 0&&($=new Ml,g[K]=$),$.getGripSpace()},this.getHand=function(K){let $=g[K];return $===void 0&&($=new Ml,g[K]=$),$.getHandSpace()},this.setFramebufferScaleFactor=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){l=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||s},this.setReferenceSpace=function(K){o=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",B),r.addEventListener("inputsourceschange",X),v.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(A),r.renderState.layers===void 0){const $={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(r,t,$),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Jn(f.framebufferWidth,f.framebufferHeight,{format:Ht,type:un,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let $=null,oe=null,fe=null;v.depth&&(fe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=v.stencil?Ii:yr,oe=v.stencil?Pi:$n);const y={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:a};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(y),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Jn(h.textureWidth,h.textureHeight,{format:Ht,type:un,depthTexture:new bh(h.textureWidth,h.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),o=null,s=await r.requestReferenceSpace(l),he.setContext(r),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};const j=new L,Q=new L;function J(K,$){$===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices($.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let $=K.near,oe=K.far;S.texture!==null&&(S.depthNear>0&&($=S.depthNear),S.depthFar>0&&(oe=S.depthFar)),C.near=D.near=T.near=$,C.far=D.far=T.far=oe,F===C.near&&N===C.far||(r.updateRenderState({depthNear:C.near,depthFar:C.far}),F=C.near,N=C.far);const fe=K.parent,y=C.cameras;J(C,fe);for(let M=0;M<y.length;M++)J(y[M],fe);y.length===2?function(M,I,Y){j.setFromMatrixPosition(I.matrixWorld),Q.setFromMatrixPosition(Y.matrixWorld);const U=j.distanceTo(Q),k=I.projectionMatrix.elements,b=Y.projectionMatrix.elements,z=k[14]/(k[10]-1),G=k[14]/(k[10]+1),ie=(k[9]+1)/k[5],V=(k[9]-1)/k[5],te=(k[8]-1)/k[0],re=(b[8]+1)/b[0],ee=z*te,ce=z*re,ue=U/(-te+re),me=ue*-te;if(I.matrixWorld.decompose(M.position,M.quaternion,M.scale),M.translateX(me),M.translateZ(ue),M.matrixWorld.compose(M.position,M.quaternion,M.scale),M.matrixWorldInverse.copy(M.matrixWorld).invert(),k[10]===-1)M.projectionMatrix.copy(I.projectionMatrix),M.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const ye=z+ue,Ie=G+ue,Ce=ee-me,ge=ce+(U-me),Fe=ie*G/Ie*ye,Ge=V*G/Ie*ye;M.projectionMatrix.makePerspective(Ce,ge,Fe,Ge,ye,Ie),M.projectionMatrixInverse.copy(M.projectionMatrix).invert()}}(C,T,D):C.projectionMatrix.copy(T.projectionMatrix),function(M,I,Y){Y===null?M.matrix.copy(I.matrixWorld):(M.matrix.copy(Y.matrixWorld),M.matrix.invert(),M.matrix.multiply(I.matrixWorld)),M.matrix.decompose(M.position,M.quaternion,M.scale),M.updateMatrixWorld(!0),M.projectionMatrix.copy(I.projectionMatrix),M.projectionMatrixInverse.copy(I.projectionMatrixInverse),M.isPerspectiveCamera&&(M.fov=2*Ho*Math.atan(1/M.projectionMatrix.elements[5]),M.zoom=1)}(K,C,fe)},this.getCamera=function(){return C},this.getFoveation=function(){if(h!==null||f!==null)return c},this.setFoveation=function(K){c=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(C)};let ae=null;const he=new mh;he.setAnimationLoop(function(K,$){if(u=$.getViewerPose(o||s),m=$,u!==null){const oe=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let fe=!1;oe.length!==C.cameras.length&&(C.cameras.length=0,fe=!0);for(let M=0;M<oe.length;M++){const I=oe[M];let Y=null;if(f!==null)Y=f.getViewport(I);else{const k=d.getViewSubImage(h,I);Y=k.viewport,M===0&&(e.setRenderTargetTextures(x,k.colorTexture,h.ignoreDepthValues?void 0:k.depthStencilTexture),e.setRenderTarget(x))}let U=w[M];U===void 0&&(U=new Xt,U.layers.enable(M),U.viewport=new Ze,w[M]=U),U.matrix.fromArray(I.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(I.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(Y.x,Y.y,Y.width,Y.height),M===0&&(C.matrix.copy(U.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),fe===!0&&C.cameras.push(U)}const y=r.enabledFeatures;if(y&&y.includes("depth-sensing")){const M=d.getDepthInformation(oe[0]);M&&M.isValid&&M.texture&&S.init(e,M,r.renderState)}}for(let oe=0;oe<g.length;oe++){const fe=_[oe],y=g[oe];fe!==null&&y!==void 0&&y.update(fe,$,o||s)}ae&&ae(K,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),m=null}),this.setAnimationLoop=function(K){ae=K},this.dispose=function(){}}}const li=new pn,m0=new Ee;function g0(n,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function i(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===Et&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===Et&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const s=e.get(a),l=s.envMap,c=s.envMapRotation;l&&(r.envMap.value=l,li.copy(c),li.x*=-1,li.y*=-1,li.z*=-1,l.isCubeTexture&&l.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),r.envMapRotation.value.setFromMatrix4(m0.makeRotationFromEuler(li)),r.flipEnvMap.value=l.isCubeTexture&&l.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,hh(n)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,s,l,c){a.isMeshBasicMaterial||a.isMeshLambertMaterial?i(r,a):a.isMeshToonMaterial?(i(r,a),function(o,u){u.gradientMap&&(o.gradientMap.value=u.gradientMap)}(r,a)):a.isMeshPhongMaterial?(i(r,a),function(o,u){o.specular.value.copy(u.specular),o.shininess.value=Math.max(u.shininess,1e-4)}(r,a)):a.isMeshStandardMaterial?(i(r,a),function(o,u){o.metalness.value=u.metalness,u.metalnessMap&&(o.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,o.metalnessMapTransform)),o.roughness.value=u.roughness,u.roughnessMap&&(o.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,o.roughnessMapTransform)),u.envMap&&(o.envMapIntensity.value=u.envMapIntensity)}(r,a),a.isMeshPhysicalMaterial&&function(o,u,d){o.ior.value=u.ior,u.sheen>0&&(o.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),o.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(o.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,o.sheenColorMapTransform)),u.sheenRoughnessMap&&(o.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,o.sheenRoughnessMapTransform))),u.clearcoat>0&&(o.clearcoat.value=u.clearcoat,o.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(o.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,o.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(o.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,o.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(o.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,o.clearcoatNormalMapTransform),o.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Et&&o.clearcoatNormalScale.value.negate())),u.dispersion>0&&(o.dispersion.value=u.dispersion),u.iridescence>0&&(o.iridescence.value=u.iridescence,o.iridescenceIOR.value=u.iridescenceIOR,o.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(o.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,o.iridescenceMapTransform)),u.iridescenceThicknessMap&&(o.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,o.iridescenceThicknessMapTransform))),u.transmission>0&&(o.transmission.value=u.transmission,o.transmissionSamplerMap.value=d.texture,o.transmissionSamplerSize.value.set(d.width,d.height),u.transmissionMap&&(o.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,o.transmissionMapTransform)),o.thickness.value=u.thickness,u.thicknessMap&&(o.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,o.thicknessMapTransform)),o.attenuationDistance.value=u.attenuationDistance,o.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(o.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(o.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,o.anisotropyMapTransform))),o.specularIntensity.value=u.specularIntensity,o.specularColor.value.copy(u.specularColor),u.specularColorMap&&(o.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,o.specularColorMapTransform)),u.specularIntensityMap&&(o.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,o.specularIntensityMapTransform))}(r,a,c)):a.isMeshMatcapMaterial?(i(r,a),function(o,u){u.matcap&&(o.matcap.value=u.matcap)}(r,a)):a.isMeshDepthMaterial?i(r,a):a.isMeshDistanceMaterial?(i(r,a),function(o,u){const d=e.get(u).light;o.referencePosition.value.setFromMatrixPosition(d.matrixWorld),o.nearDistance.value=d.shadow.camera.near,o.farDistance.value=d.shadow.camera.far}(r,a)):a.isMeshNormalMaterial?i(r,a):a.isLineBasicMaterial?(function(o,u){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,u.map&&(o.map.value=u.map,t(u.map,o.mapTransform))}(r,a),a.isLineDashedMaterial&&function(o,u){o.dashSize.value=u.dashSize,o.totalSize.value=u.dashSize+u.gapSize,o.scale.value=u.scale}(r,a)):a.isPointsMaterial?function(o,u,d,h){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,o.size.value=u.size*d,o.scale.value=.5*h,u.map&&(o.map.value=u.map,t(u.map,o.uvTransform)),u.alphaMap&&(o.alphaMap.value=u.alphaMap,t(u.alphaMap,o.alphaMapTransform)),u.alphaTest>0&&(o.alphaTest.value=u.alphaTest)}(r,a,s,l):a.isSpriteMaterial?function(o,u){o.diffuse.value.copy(u.color),o.opacity.value=u.opacity,o.rotation.value=u.rotation,u.map&&(o.map.value=u.map,t(u.map,o.mapTransform)),u.alphaMap&&(o.alphaMap.value=u.alphaMap,t(u.alphaMap,o.alphaMapTransform)),u.alphaTest>0&&(o.alphaTest.value=u.alphaTest)}(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function _0(n,e,t,i){let r={},a={},s=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(d,h,f,m){const S=d.value,v=h+"_"+f;if(m[v]===void 0)return m[v]=typeof S=="number"||typeof S=="boolean"?S:S.clone(),!0;{const p=m[v];if(typeof S=="number"||typeof S=="boolean"){if(p!==S)return m[v]=S,!0}else if(p.equals(S)===!1)return p.copy(S),!0}return!1}function o(d){const h={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(h.boundary=4,h.storage=4):d.isVector2?(h.boundary=8,h.storage=8):d.isVector3||d.isColor?(h.boundary=16,h.storage=12):d.isVector4?(h.boundary=16,h.storage=16):d.isMatrix3?(h.boundary=48,h.storage=48):d.isMatrix4?(h.boundary=64,h.storage=64):d.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",d),h}function u(d){const h=d.target;h.removeEventListener("dispose",u);const f=s.indexOf(h.__bindingPointIndex);s.splice(f,1),n.deleteBuffer(r[h.id]),delete r[h.id],delete a[h.id]}return{bind:function(d,h){const f=h.program;i.uniformBlockBinding(d,f)},update:function(d,h){let f=r[d.id];f===void 0&&(function(v){const p=v.uniforms;let x=0;const g=16;for(let A=0,R=p.length;A<R;A++){const T=Array.isArray(p[A])?p[A]:[p[A]];for(let D=0,w=T.length;D<w;D++){const C=T[D],F=Array.isArray(C.value)?C.value:[C.value];for(let N=0,q=F.length;N<q;N++){const B=o(F[N]),X=x%g,j=X%B.boundary,Q=X+j;x+=j,Q!==0&&g-Q<B.storage&&(x+=g-Q),C.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=x,x+=B.storage}}}const _=x%g;_>0&&(x+=g-_),v.__size=x,v.__cache={}}(d),f=function(v){const p=function(){for(let A=0;A<l;A++)if(s.indexOf(A)===-1)return s.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();v.__bindingPointIndex=p;const x=n.createBuffer(),g=v.__size,_=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,g,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,p,x),x}(d),r[d.id]=f,d.addEventListener("dispose",u));const m=h.program;i.updateUBOMapping(d,m);const S=e.render.frame;a[d.id]!==S&&(function(v){const p=r[v.id],x=v.uniforms,g=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,p);for(let _=0,A=x.length;_<A;_++){const R=Array.isArray(x[_])?x[_]:[x[_]];for(let T=0,D=R.length;T<D;T++){const w=R[T];if(c(w,_,T,g)===!0){const C=w.__offset,F=Array.isArray(w.value)?w.value:[w.value];let N=0;for(let q=0;q<F.length;q++){const B=F[q],X=o(B);typeof B=="number"||typeof B=="boolean"?(w.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,C+N,w.__data)):B.isMatrix3?(w.__data[0]=B.elements[0],w.__data[1]=B.elements[1],w.__data[2]=B.elements[2],w.__data[3]=0,w.__data[4]=B.elements[3],w.__data[5]=B.elements[4],w.__data[6]=B.elements[5],w.__data[7]=0,w.__data[8]=B.elements[6],w.__data[9]=B.elements[7],w.__data[10]=B.elements[8],w.__data[11]=0):(B.toArray(w.__data,N),N+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,C,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}(d),a[d.id]=S)},dispose:function(){for(const d in r)n.deleteBuffer(r[d]);s=[],r={},a={}}}}class v0{constructor(e={}){const{canvas:t=ug(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:o=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;let h;if(this.isWebGLRenderer=!0,i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=s;const f=new Uint32Array(4),m=new Int32Array(4);let S=null,v=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=en,this.toneMapping=Rn,this.toneMappingExposure=1;const g=this;let _=!1,A=0,R=0,T=null,D=-1,w=null;const C=new Ze,F=new Ze;let N=null;const q=new Ne(0);let B=0,X=t.width,j=t.height,Q=1,J=null,ae=null;const he=new Ze(0,0,X,j),K=new Ze(0,0,X,j);let $=!1;const oe=new hl;let fe=!1,y=!1;const M=new Ee,I=new Ee,Y=new L,U=new Ze,k={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let b=!1;function z(){return T===null?Q:1}let G,ie,V,te,re,ee,ce,ue,me,ye,Ie,Ce,ge,Fe,Ge,Ke,pe,Ae,Ve,hs,er,Lt,xn,ci,P=i;function ui(E,O){return t.getContext(E,O)}try{const E={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:o,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Js}`),t.addEventListener("webglcontextlost",rd,!1),t.addEventListener("webglcontextrestored",ad,!1),t.addEventListener("webglcontextcreationerror",sd,!1),P===null){const O="webgl2";if(P=ui(O,E),P===null)throw ui(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}function Xr(){G=new Hg(P),G.init(),Lt=new u0(P,G),ie=new Fg(P,G,e,Lt),V=new l0(P),ie.reverseDepthBuffer&&V.buffers.depth.setReversed(!0),te=new Wg(P),re=new K_,ee=new c0(P,G,V,re,ie,Lt,te),ce=new Bg(g),ue=new zg(g),me=new Ig(P),xn=new Ng(P,me),ye=new Gg(P,me,te,xn),Ie=new Yg(P,ye,me,te),Ve=new Xg(P,ie,ee),Ke=new kg(re),Ce=new Z_(g,ce,ue,G,ie,xn,Ke),ge=new g0(g,re),Fe=new J_,Ge=new i0(G),Ae=new Dg(g,ce,ue,V,Ie,h,c),pe=new s0(g,Ie,ie),ci=new _0(P,te,ie,V),hs=new Og(P,G,te),er=new Vg(P,G,te),te.programs=Ce.programs,g.capabilities=ie,g.extensions=G,g.properties=re,g.renderLists=Fe,g.shadowMap=pe,g.state=V,g.info=te}Xr();const lt=new p0(g,P);function rd(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function ad(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const E=te.autoReset,O=pe.enabled,W=pe.autoUpdate,Z=pe.needsUpdate,H=pe.type;Xr(),te.autoReset=E,pe.enabled=O,pe.autoUpdate=W,pe.needsUpdate=Z,pe.type=H}function sd(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function od(E){const O=E.target;O.removeEventListener("dispose",od),function(W){(function(Z){const H=re.get(Z).programs;H!==void 0&&(H.forEach(function(ne){Ce.releaseProgram(ne)}),Z.isShaderMaterial&&Ce.releaseShaderCache(Z))})(W),re.remove(W)}(O)}function ld(E,O,W){E.transparent===!0&&E.side===2&&E.forceSinglePass===!1?(E.side=Et,E.needsUpdate=!0,fs(E,O,W),E.side=An,E.needsUpdate=!0,fs(E,O,W),E.side=2):fs(E,O,W)}this.xr=lt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=G.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=G.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(E){E!==void 0&&(Q=E,this.setSize(X,j,!1))},this.getSize=function(E){return E.set(X,j)},this.setSize=function(E,O,W=!0){lt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(X=E,j=O,t.width=Math.floor(E*Q),t.height=Math.floor(O*Q),W===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O))},this.getDrawingBufferSize=function(E){return E.set(X*Q,j*Q).floor()},this.setDrawingBufferSize=function(E,O,W){X=E,j=O,Q=W,t.width=Math.floor(E*W),t.height=Math.floor(O*W),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(he)},this.setViewport=function(E,O,W,Z){E.isVector4?he.set(E.x,E.y,E.z,E.w):he.set(E,O,W,Z),V.viewport(C.copy(he).multiplyScalar(Q).round())},this.getScissor=function(E){return E.copy(K)},this.setScissor=function(E,O,W,Z){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,O,W,Z),V.scissor(F.copy(K).multiplyScalar(Q).round())},this.getScissorTest=function(){return $},this.setScissorTest=function(E){V.setScissorTest($=E)},this.setOpaqueSort=function(E){J=E},this.setTransparentSort=function(E){ae=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor.apply(Ae,arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha.apply(Ae,arguments)},this.clear=function(E=!0,O=!0,W=!0){let Z=0;if(E){let H=!1;if(T!==null){const ne=T.texture.format;H=ne===ho||ne===uo||ne===co}if(H){const ne=T.texture.type,le=ne===un||ne===$n||ne===Sr||ne===Pi||ne===oo||ne===lo,de=Ae.getClearColor(),_e=Ae.getClearAlpha(),Me=de.r,xe=de.g,ve=de.b;le?(f[0]=Me,f[1]=xe,f[2]=ve,f[3]=_e,P.clearBufferuiv(P.COLOR,0,f)):(m[0]=Me,m[1]=xe,m[2]=ve,m[3]=_e,P.clearBufferiv(P.COLOR,0,m))}else Z|=P.COLOR_BUFFER_BIT}O&&(Z|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),W&&(Z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",rd,!1),t.removeEventListener("webglcontextrestored",ad,!1),t.removeEventListener("webglcontextcreationerror",sd,!1),Fe.dispose(),Ge.dispose(),re.dispose(),ce.dispose(),ue.dispose(),Ie.dispose(),xn.dispose(),ci.dispose(),Ce.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",cd),lt.removeEventListener("sessionend",ud),hi.stop()},this.renderBufferDirect=function(E,O,W,Z,H,ne){O===null&&(O=k);const le=H.isMesh&&H.matrixWorld.determinant()<0,de=function(Pe,Je,dt,we,Se){Je.isScene!==!0&&(Je=k),ee.resetTextureUnits();const Yt=Je.fog,$0=we.isMeshStandardMaterial?Je.environment:null,J0=T===null?g.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Cn,ps=(we.isMeshStandardMaterial?ue:ce).get(we.envMap||$0),Q0=we.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,ev=!!dt.attributes.tangent&&(!!we.normalMap||we.anisotropy>0),tv=!!dt.morphAttributes.position,nv=!!dt.morphAttributes.normal,iv=!!dt.morphAttributes.color;let gd=Rn;we.toneMapped&&(T!==null&&T.isXRRenderTarget!==!0||(gd=g.toneMapping));const _d=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,rv=_d!==void 0?_d.length:0,Re=re.get(we),av=v.state.lights;if(fe===!0&&(y===!0||Pe!==w)){const kt=Pe===w&&we.id===D;Ke.setState(we,Pe,kt)}let qt=!1;we.version===Re.__version?Re.needsLights&&Re.lightsStateVersion!==av.state.version||Re.outputColorSpace!==J0||Se.isBatchedMesh&&Re.batching===!1?qt=!0:Se.isBatchedMesh||Re.batching!==!0?Se.isBatchedMesh&&Re.batchingColor===!0&&Se.colorTexture===null||Se.isBatchedMesh&&Re.batchingColor===!1&&Se.colorTexture!==null||Se.isInstancedMesh&&Re.instancing===!1?qt=!0:Se.isInstancedMesh||Re.instancing!==!0?Se.isSkinnedMesh&&Re.skinning===!1?qt=!0:Se.isSkinnedMesh||Re.skinning!==!0?Se.isInstancedMesh&&Re.instancingColor===!0&&Se.instanceColor===null||Se.isInstancedMesh&&Re.instancingColor===!1&&Se.instanceColor!==null||Se.isInstancedMesh&&Re.instancingMorph===!0&&Se.morphTexture===null||Se.isInstancedMesh&&Re.instancingMorph===!1&&Se.morphTexture!==null||Re.envMap!==ps||we.fog===!0&&Re.fog!==Yt?qt=!0:Re.numClippingPlanes===void 0||Re.numClippingPlanes===Ke.numPlanes&&Re.numIntersection===Ke.numIntersection?(Re.vertexAlphas!==Q0||Re.vertexTangents!==ev||Re.morphTargets!==tv||Re.morphNormals!==nv||Re.morphColors!==iv||Re.toneMapping!==gd||Re.morphTargetsCount!==rv)&&(qt=!0):qt=!0:qt=!0:qt=!0:qt=!0:(qt=!0,Re.__version=we.version);let di=Re.currentProgram;qt===!0&&(di=fs(we,Je,Se));let vd=!1,Yr=!1,Ol=!1;const et=di.getUniforms(),Bn=Re.uniforms;if(V.useProgram(di.program)&&(vd=!0,Yr=!0,Ol=!0),we.id!==D&&(D=we.id,Yr=!0),vd||w!==Pe){ie.reverseDepthBuffer?(M.copy(Pe.projectionMatrix),function(fi){const je=fi.elements;je[2]=.5*je[2]+.5*je[3],je[6]=.5*je[6]+.5*je[7],je[10]=.5*je[10]+.5*je[11],je[14]=.5*je[14]+.5*je[15]}(M),function(fi){const je=fi.elements;je[11]===-1?(je[10]=-je[10]-1,je[14]=-je[14]):(je[10]=-je[10],je[14]=1-je[14])}(M),et.setValue(P,"projectionMatrix",M)):et.setValue(P,"projectionMatrix",Pe.projectionMatrix),et.setValue(P,"viewMatrix",Pe.matrixWorldInverse);const kt=et.map.cameraPosition;kt!==void 0&&kt.setValue(P,Y.setFromMatrixPosition(Pe.matrixWorld)),ie.logarithmicDepthBuffer&&et.setValue(P,"logDepthBufFC",2/(Math.log(Pe.far+1)/Math.LN2)),(we.isMeshPhongMaterial||we.isMeshToonMaterial||we.isMeshLambertMaterial||we.isMeshBasicMaterial||we.isMeshStandardMaterial||we.isShaderMaterial)&&et.setValue(P,"isOrthographic",Pe.isOrthographicCamera===!0),w!==Pe&&(w=Pe,Yr=!0,Ol=!0)}if(Se.isSkinnedMesh){et.setOptional(P,Se,"bindMatrix"),et.setOptional(P,Se,"bindMatrixInverse");const kt=Se.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),et.setValue(P,"boneTexture",kt.boneTexture,ee))}Se.isBatchedMesh&&(et.setOptional(P,Se,"batchingTexture"),et.setValue(P,"batchingTexture",Se._matricesTexture,ee),et.setOptional(P,Se,"batchingIdTexture"),et.setValue(P,"batchingIdTexture",Se._indirectTexture,ee),et.setOptional(P,Se,"batchingColorTexture"),Se._colorsTexture!==null&&et.setValue(P,"batchingColorTexture",Se._colorsTexture,ee));const Fl=dt.morphAttributes;Fl.position===void 0&&Fl.normal===void 0&&Fl.color===void 0||Ve.update(Se,dt,di),(Yr||Re.receiveShadow!==Se.receiveShadow)&&(Re.receiveShadow=Se.receiveShadow,et.setValue(P,"receiveShadow",Se.receiveShadow)),we.isMeshGouraudMaterial&&we.envMap!==null&&(Bn.envMap.value=ps,Bn.flipEnvMap.value=ps.isCubeTexture&&ps.isRenderTargetTexture===!1?-1:1),we.isMeshStandardMaterial&&we.envMap===null&&Je.environment!==null&&(Bn.envMapIntensity.value=Je.environmentIntensity),Yr&&(et.setValue(P,"toneMappingExposure",g.toneMappingExposure),Re.needsLights&&(jt=Ol,(sn=Bn).ambientLightColor.needsUpdate=jt,sn.lightProbe.needsUpdate=jt,sn.directionalLights.needsUpdate=jt,sn.directionalLightShadows.needsUpdate=jt,sn.pointLights.needsUpdate=jt,sn.pointLightShadows.needsUpdate=jt,sn.spotLights.needsUpdate=jt,sn.spotLightShadows.needsUpdate=jt,sn.rectAreaLights.needsUpdate=jt,sn.hemisphereLights.needsUpdate=jt),Yt&&we.fog===!0&&ge.refreshFogUniforms(Bn,Yt),ge.refreshMaterialUniforms(Bn,we,Q,j,v.state.transmissionRenderTarget[Pe.id]),ts.upload(P,pd(Re),Bn,ee));var sn,jt;if(we.isShaderMaterial&&we.uniformsNeedUpdate===!0&&(ts.upload(P,pd(Re),Bn,ee),we.uniformsNeedUpdate=!1),we.isSpriteMaterial&&et.setValue(P,"center",Se.center),et.setValue(P,"modelViewMatrix",Se.modelViewMatrix),et.setValue(P,"normalMatrix",Se.normalMatrix),et.setValue(P,"modelMatrix",Se.matrixWorld),we.isShaderMaterial||we.isRawShaderMaterial){const kt=we.uniformsGroups;for(let fi=0,je=kt.length;fi<je;fi++){const xd=kt[fi];ci.update(xd,di),ci.bind(xd,di)}}return di}(E,O,W,Z,H);V.setMaterial(Z,le);let _e=W.index,Me=1;if(Z.wireframe===!0){if(_e=ye.getWireframeAttribute(W),_e===void 0)return;Me=2}const xe=W.drawRange,ve=W.attributes.position;let Le=xe.start*Me,Qe=(xe.start+xe.count)*Me;ne!==null&&(Le=Math.max(Le,ne.start*Me),Qe=Math.min(Qe,(ne.start+ne.count)*Me)),_e!==null?(Le=Math.max(Le,0),Qe=Math.min(Qe,_e.count)):ve!=null&&(Le=Math.max(Le,0),Qe=Math.min(Qe,ve.count));const $e=Qe-Le;if($e<0||$e===1/0)return;let ct;xn.setup(H,Z,de,W,_e);let Ye=hs;if(_e!==null&&(ct=me.get(_e),Ye=er,Ye.setIndex(ct)),H.isMesh)Z.wireframe===!0?(V.setLineWidth(Z.wireframeLinewidth*z()),Ye.setMode(P.LINES)):Ye.setMode(P.TRIANGLES);else if(H.isLine){let Pe=Z.linewidth;Pe===void 0&&(Pe=1),V.setLineWidth(Pe*z()),H.isLineSegments?Ye.setMode(P.LINES):H.isLineLoop?Ye.setMode(P.LINE_LOOP):Ye.setMode(P.LINE_STRIP)}else H.isPoints?Ye.setMode(P.POINTS):H.isSprite&&Ye.setMode(P.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Ye.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(G.get("WEBGL_multi_draw"))Ye.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pe=H._multiDrawStarts,Je=H._multiDrawCounts,dt=H._multiDrawCount,we=_e?me.get(_e).bytesPerElement:1,Se=re.get(Z).currentProgram.getUniforms();for(let Yt=0;Yt<dt;Yt++)Se.setValue(P,"_gl_DrawID",Yt),Ye.render(Pe[Yt]/we,Je[Yt])}else if(H.isInstancedMesh)Ye.renderInstances(Le,$e,H.count);else if(W.isInstancedBufferGeometry){const Pe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Je=Math.min(W.instanceCount,Pe);Ye.renderInstances(Le,$e,Je)}else Ye.render(Le,$e)},this.compile=function(E,O,W=null){W===null&&(W=E),v=Ge.get(W),v.init(O),x.push(v),W.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(v.pushLight(H),H.castShadow&&v.pushShadow(H))}),E!==W&&E.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(v.pushLight(H),H.castShadow&&v.pushShadow(H))}),v.setupLights();const Z=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ne=H.material;if(ne)if(Array.isArray(ne))for(let le=0;le<ne.length;le++){const de=ne[le];ld(de,W,H),Z.add(de)}else ld(ne,W,H),Z.add(ne)}),x.pop(),v=null,Z},this.compileAsync=function(E,O,W=null){const Z=this.compile(E,O,W);return new Promise(H=>{function ne(){Z.forEach(function(le){re.get(le).currentProgram.isReady()&&Z.delete(le)}),Z.size!==0?setTimeout(ne,10):H(E)}G.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Dl=null;function cd(){hi.stop()}function ud(){hi.start()}const hi=new mh;function Nl(E,O,W,Z){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)v.pushLight(E),E.castShadow&&v.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||oe.intersectsSprite(E)){Z&&U.setFromMatrixPosition(E.matrixWorld).applyMatrix4(I);const ne=Ie.update(E),le=E.material;le.visible&&S.push(E,ne,le,W,U.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||oe.intersectsObject(E))){const ne=Ie.update(E),le=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),U.copy(E.boundingSphere.center)):(ne.boundingSphere===null&&ne.computeBoundingSphere(),U.copy(ne.boundingSphere.center)),U.applyMatrix4(E.matrixWorld).applyMatrix4(I)),Array.isArray(le)){const de=ne.groups;for(let _e=0,Me=de.length;_e<Me;_e++){const xe=de[_e],ve=le[xe.materialIndex];ve&&ve.visible&&S.push(E,ne,ve,W,U.z,xe)}}else le.visible&&S.push(E,ne,le,W,U.z,null)}}const H=E.children;for(let ne=0,le=H.length;ne<le;ne++)Nl(H[ne],O,W,Z)}function hd(E,O,W,Z){const H=E.opaque,ne=E.transmissive,le=E.transparent;v.setupLightsView(W),fe===!0&&Ke.setGlobalState(g.clippingPlanes,W),Z&&V.viewport(C.copy(Z)),H.length>0&&ds(H,O,W),ne.length>0&&ds(ne,O,W),le.length>0&&ds(le,O,W),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function dd(E,O,W,Z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[Z.id]===void 0&&(v.state.transmissionRenderTarget[Z.id]=new Jn(1,1,{generateMipmaps:!0,type:G.has("EXT_color_buffer_half_float")||G.has("EXT_color_buffer_float")?Er:un,minFilter:Li,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));const H=v.state.transmissionRenderTarget[Z.id],ne=Z.viewport||C;H.setSize(ne.z,ne.w);const le=g.getRenderTarget();g.setRenderTarget(H),g.getClearColor(q),B=g.getClearAlpha(),B<1&&g.setClearColor(16777215,.5),g.clear(),b&&Ae.render(W);const de=g.toneMapping;g.toneMapping=Rn;const _e=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),v.setupLightsView(Z),fe===!0&&Ke.setGlobalState(g.clippingPlanes,Z),ds(E,W,Z),ee.updateMultisampleRenderTarget(H),ee.updateRenderTargetMipmap(H),G.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let xe=0,ve=O.length;xe<ve;xe++){const Le=O[xe],Qe=Le.object,$e=Le.geometry,ct=Le.material,Ye=Le.group;if(ct.side===2&&Qe.layers.test(Z.layers)){const Pe=ct.side;ct.side=Et,ct.needsUpdate=!0,fd(Qe,W,Z,$e,ct,Ye),ct.side=Pe,ct.needsUpdate=!0,Me=!0}}Me===!0&&(ee.updateMultisampleRenderTarget(H),ee.updateRenderTargetMipmap(H))}g.setRenderTarget(le),g.setClearColor(q,B),_e!==void 0&&(Z.viewport=_e),g.toneMapping=de}function ds(E,O,W){const Z=O.isScene===!0?O.overrideMaterial:null;for(let H=0,ne=E.length;H<ne;H++){const le=E[H],de=le.object,_e=le.geometry,Me=Z===null?le.material:Z,xe=le.group;de.layers.test(W.layers)&&fd(de,O,W,_e,Me,xe)}}function fd(E,O,W,Z,H,ne){E.onBeforeRender(g,O,W,Z,H,ne),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(g,O,W,Z,E,ne),H.transparent===!0&&H.side===2&&H.forceSinglePass===!1?(H.side=Et,H.needsUpdate=!0,g.renderBufferDirect(W,O,Z,H,E,ne),H.side=An,H.needsUpdate=!0,g.renderBufferDirect(W,O,Z,H,E,ne),H.side=2):g.renderBufferDirect(W,O,Z,H,E,ne),E.onAfterRender(g,O,W,Z,H,ne)}function fs(E,O,W){O.isScene!==!0&&(O=k);const Z=re.get(E),H=v.state.lights,ne=v.state.shadowsArray,le=H.state.version,de=Ce.getParameters(E,H.state,ne,O,W),_e=Ce.getProgramCacheKey(de);let Me=Z.programs;Z.environment=E.isMeshStandardMaterial?O.environment:null,Z.fog=O.fog,Z.envMap=(E.isMeshStandardMaterial?ue:ce).get(E.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Me===void 0&&(E.addEventListener("dispose",od),Me=new Map,Z.programs=Me);let xe=Me.get(_e);if(xe!==void 0){if(Z.currentProgram===xe&&Z.lightsStateVersion===le)return md(E,de),xe}else de.uniforms=Ce.getUniforms(E),E.onBeforeCompile(de,g),xe=Ce.acquireProgram(de,_e),Me.set(_e,xe),Z.uniforms=de.uniforms;const ve=Z.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(ve.clippingPlanes=Ke.uniform),md(E,de),Z.needsLights=function(Le){return Le.isMeshLambertMaterial||Le.isMeshToonMaterial||Le.isMeshPhongMaterial||Le.isMeshStandardMaterial||Le.isShadowMaterial||Le.isShaderMaterial&&Le.lights===!0}(E),Z.lightsStateVersion=le,Z.needsLights&&(ve.ambientLightColor.value=H.state.ambient,ve.lightProbe.value=H.state.probe,ve.directionalLights.value=H.state.directional,ve.directionalLightShadows.value=H.state.directionalShadow,ve.spotLights.value=H.state.spot,ve.spotLightShadows.value=H.state.spotShadow,ve.rectAreaLights.value=H.state.rectArea,ve.ltc_1.value=H.state.rectAreaLTC1,ve.ltc_2.value=H.state.rectAreaLTC2,ve.pointLights.value=H.state.point,ve.pointLightShadows.value=H.state.pointShadow,ve.hemisphereLights.value=H.state.hemi,ve.directionalShadowMap.value=H.state.directionalShadowMap,ve.directionalShadowMatrix.value=H.state.directionalShadowMatrix,ve.spotShadowMap.value=H.state.spotShadowMap,ve.spotLightMatrix.value=H.state.spotLightMatrix,ve.spotLightMap.value=H.state.spotLightMap,ve.pointShadowMap.value=H.state.pointShadowMap,ve.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=xe,Z.uniformsList=null,xe}function pd(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=ts.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function md(E,O){const W=re.get(E);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}hi.setAnimationLoop(function(E){Dl&&Dl(E)}),typeof self!="undefined"&&hi.setContext(self),this.setAnimationLoop=function(E){Dl=E,lt.setAnimationLoop(E),E===null?hi.stop():hi.start()},lt.addEventListener("sessionstart",cd),lt.addEventListener("sessionend",ud),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(_===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(O),O=lt.getCamera()),E.isScene===!0&&E.onBeforeRender(g,E,O,T),v=Ge.get(E,x.length),v.init(O),x.push(v),I.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),oe.setFromProjectionMatrix(I),y=this.localClippingEnabled,fe=Ke.init(this.clippingPlanes,y),S=Fe.get(E,p.length),S.init(),p.push(S),lt.enabled===!0&&lt.isPresenting===!0){const ne=g.xr.getDepthSensingMesh();ne!==null&&Nl(ne,O,-1/0,g.sortObjects)}Nl(E,O,0,g.sortObjects),S.finish(),g.sortObjects===!0&&S.sort(J,ae),b=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,b&&Ae.addToRenderList(S,E),this.info.render.frame++,fe===!0&&Ke.beginShadows();const W=v.state.shadowsArray;pe.render(W,E,O),fe===!0&&Ke.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=S.opaque,H=S.transmissive;if(v.setupLights(),O.isArrayCamera){const ne=O.cameras;if(H.length>0)for(let le=0,de=ne.length;le<de;le++)dd(Z,H,E,ne[le]);b&&Ae.render(E);for(let le=0,de=ne.length;le<de;le++){const _e=ne[le];hd(S,E,_e,_e.viewport)}}else H.length>0&&dd(Z,H,E,O),b&&Ae.render(E),hd(S,E,O);T!==null&&(ee.updateMultisampleRenderTarget(T),ee.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(g,E,O),xn.resetDefaultState(),D=-1,w=null,x.pop(),x.length>0?(v=x[x.length-1],fe===!0&&Ke.setGlobalState(g.clippingPlanes,v.state.camera)):v=null,p.pop(),S=p.length>0?p[p.length-1]:null},this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,O,W){re.get(E.texture).__webglTexture=O,re.get(E.depthTexture).__webglTexture=W;const Z=re.get(E);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=W===void 0,Z.__autoAllocateDepthBuffer||G.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const W=re.get(E);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,W=0){T=E,A=O,R=W;let Z=!0,H=null,ne=!1,le=!1;if(E){const de=re.get(E);if(de.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(P.FRAMEBUFFER,null),Z=!1;else if(de.__webglFramebuffer===void 0)ee.setupRenderTarget(E);else if(de.__hasExternalTextures)ee.rebindTextures(E,re.get(E.texture).__webglTexture,re.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const xe=E.depthTexture;if(de.__boundDepthTexture!==xe){if(xe!==null&&re.has(xe)&&(E.width!==xe.image.width||E.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(E)}}const _e=E.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(le=!0);const Me=re.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(H=Array.isArray(Me[O])?Me[O][W]:Me[O],ne=!0):H=E.samples>0&&ee.useMultisampledRTT(E)===!1?re.get(E).__webglMultisampledFramebuffer:Array.isArray(Me)?Me[W]:Me,C.copy(E.viewport),F.copy(E.scissor),N=E.scissorTest}else C.copy(he).multiplyScalar(Q).floor(),F.copy(K).multiplyScalar(Q).floor(),N=$;if(V.bindFramebuffer(P.FRAMEBUFFER,H)&&Z&&V.drawBuffers(E,H),V.viewport(C),V.scissor(F),V.setScissorTest(N),ne){const de=re.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,de.__webglTexture,W)}else if(le){const de=re.get(E.texture),_e=O||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,de.__webglTexture,W||0,_e)}D=-1},this.readRenderTargetPixels=function(E,O,W,Z,H,ne,le){if(!E||!E.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=re.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){V.bindFramebuffer(P.FRAMEBUFFER,de);try{const _e=E.texture,Me=_e.format,xe=_e.type;if(!ie.textureFormatReadable(Me))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(xe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");O>=0&&O<=E.width-Z&&W>=0&&W<=E.height-H&&P.readPixels(O,W,Z,H,Lt.convert(Me),Lt.convert(xe),ne)}finally{const _e=T!==null?re.get(T).__webglFramebuffer:null;V.bindFramebuffer(P.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(E,O,W,Z,H,ne,le){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=re.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){const _e=E.texture,Me=_e.format,xe=_e.type;if(!ie.textureFormatReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-Z&&W>=0&&W<=E.height-H){V.bindFramebuffer(P.FRAMEBUFFER,de);const ve=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,ve),P.bufferData(P.PIXEL_PACK_BUFFER,ne.byteLength,P.STREAM_READ),P.readPixels(O,W,Z,H,Lt.convert(Me),Lt.convert(xe),0);const Le=T!==null?re.get(T).__webglFramebuffer:null;V.bindFramebuffer(P.FRAMEBUFFER,Le);const Qe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await function($e,ct,Ye){return new Promise(function(Pe,Je){setTimeout(function dt(){switch($e.clientWaitSync(ct,$e.SYNC_FLUSH_COMMANDS_BIT,0)){case $e.WAIT_FAILED:Je();break;case $e.TIMEOUT_EXPIRED:setTimeout(dt,Ye);break;default:Pe()}},Ye)})}(P,Qe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,ve),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ne),P.deleteBuffer(ve),P.deleteSync(Qe),ne}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,W=0){E.isTexture!==!0&&(Ia("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const Z=Math.pow(2,-W),H=Math.floor(E.image.width*Z),ne=Math.floor(E.image.height*Z),le=O!==null?O.x:0,de=O!==null?O.y:0;ee.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,le,de,H,ne),V.unbindTexture()},this.copyTextureToTexture=function(E,O,W=null,Z=null,H=0){let ne,le,de,_e,Me,xe;E.isTexture!==!0&&(Ia("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,E=arguments[1],O=arguments[2],H=arguments[3]||0,W=null),W!==null?(ne=W.max.x-W.min.x,le=W.max.y-W.min.y,de=W.min.x,_e=W.min.y):(ne=E.image.width,le=E.image.height,de=0,_e=0),Z!==null?(Me=Z.x,xe=Z.y):(Me=0,xe=0);const ve=Lt.convert(O.format),Le=Lt.convert(O.type);ee.setTexture2D(O,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const Qe=P.getParameter(P.UNPACK_ROW_LENGTH),$e=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ct=P.getParameter(P.UNPACK_SKIP_PIXELS),Ye=P.getParameter(P.UNPACK_SKIP_ROWS),Pe=P.getParameter(P.UNPACK_SKIP_IMAGES),Je=E.isCompressedTexture?E.mipmaps[H]:E.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Je.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Je.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,de),P.pixelStorei(P.UNPACK_SKIP_ROWS,_e),E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,H,Me,xe,ne,le,ve,Le,Je.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,H,Me,xe,Je.width,Je.height,ve,Je.data):P.texSubImage2D(P.TEXTURE_2D,H,Me,xe,ne,le,ve,Le,Je),P.pixelStorei(P.UNPACK_ROW_LENGTH,Qe),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,$e),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ct),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ye),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pe),H===0&&O.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),V.unbindTexture()},this.copyTextureToTexture3D=function(E,O,W=null,Z=null,H=0){let ne,le,de,_e,Me,xe,ve,Le,Qe;E.isTexture!==!0&&(Ia("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,Z=arguments[1]||null,E=arguments[2],O=arguments[3],H=arguments[4]||0);const $e=E.isCompressedTexture?E.mipmaps[H]:E.image;W!==null?(ne=W.max.x-W.min.x,le=W.max.y-W.min.y,de=W.max.z-W.min.z,_e=W.min.x,Me=W.min.y,xe=W.min.z):(ne=$e.width,le=$e.height,de=$e.depth,_e=0,Me=0,xe=0),Z!==null?(ve=Z.x,Le=Z.y,Qe=Z.z):(ve=0,Le=0,Qe=0);const ct=Lt.convert(O.format),Ye=Lt.convert(O.type);let Pe;if(O.isData3DTexture)ee.setTexture3D(O,0),Pe=P.TEXTURE_3D;else{if(!O.isDataArrayTexture&&!O.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");ee.setTexture2DArray(O,0),Pe=P.TEXTURE_2D_ARRAY}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const Je=P.getParameter(P.UNPACK_ROW_LENGTH),dt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),we=P.getParameter(P.UNPACK_SKIP_PIXELS),Se=P.getParameter(P.UNPACK_SKIP_ROWS),Yt=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,$e.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,$e.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_e),P.pixelStorei(P.UNPACK_SKIP_ROWS,Me),P.pixelStorei(P.UNPACK_SKIP_IMAGES,xe),E.isDataTexture||E.isData3DTexture?P.texSubImage3D(Pe,H,ve,Le,Qe,ne,le,de,ct,Ye,$e.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(Pe,H,ve,Le,Qe,ne,le,de,ct,$e.data):P.texSubImage3D(Pe,H,ve,Le,Qe,ne,le,de,ct,Ye,$e),P.pixelStorei(P.UNPACK_ROW_LENGTH,Je),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,we),P.pixelStorei(P.UNPACK_SKIP_ROWS,Se),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt),H===0&&O.generateMipmaps&&P.generateMipmap(Pe),V.unbindTexture()},this.initRenderTarget=function(E){re.get(E).__webglFramebuffer===void 0&&ee.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ee.setTextureCube(E,0):E.isData3DTexture?ee.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ee.setTexture2DArray(E,0):ee.setTexture2D(E,0),V.unbindTexture()},this.resetState=function(){A=0,R=0,T=null,V.reset(),xn.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bo?"display-p3":"srgb",t.unpackColorSpace=ke.workingColorSpace===wa?"display-p3":"srgb"}}class x0 extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}new L,new L,new L,new L,new De,new De,new Ee,new L,new L,new L,new De,new De,new De,new L,new L,new L,new Ze,new Ze,new L,new Ee,new L,new Un,new Ee,new ka,new Ee,new Ee,new Ee,new Ee,new Ln,new Ee,new Ft,new Un,new Ee,new Ee,new Ee,new Ne(1,1,1),new Ee,new hl,new Ln,new Un,new L,new L,new L,new Ft,new L,new L,new Ee,new ka,new Un,new L,new L,new L,new L,new Ee,new ka,new Un,new L;class M0 extends _t{constructor(e,t,i,r,a,s,l,c,o){super(e,t,i,r,a,s,l,c,o),this.isCanvasTexture=!0,this.needsUpdate=!0}}new L,new L,new L,new L,new Nt,new Ee,new L,new L,new Ee,new L,new L,new Ee,new Ee,new Ee,new L,new L,new L,new L,new L,new L;const Yh="\\[\\]\\.:\\/",Sl="[^"+Yh+"]",S0="[^"+Yh.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Sl)+/(WCOD+)?/.source.replace("WCOD",S0)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sl)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sl)+"$"),new Ee,new De,new L,new L,new L,new L,new Ee,new Ee,new L,new Ne,new Ne,new L,new L,new L,new L,new cl,new Ln,new L,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Js}})),typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Js);const Or=120,Ji=192,E0=380,rs=.97,y0=1.1,b0=1.2,as=1.2,T0=2.6,w0=4.2,A0=5200,R0=1300,C0=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,L0=`
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uK;        // zoom relativo de la imagen interior
  uniform float uAmp;      // refraccion del canto
  uniform float uTheta;    // angulo del especular
  uniform float uPan;      // centro optico (sigue al puntero)
  uniform float uPanY;
  uniform float uI;        // intensidad (hover / foco)
  uniform float uClick;    // profundizacion del clic
  uniform vec3  uTint;     // color de portada
  const float PI = 3.14159265;

  vec2 mapUV(vec2 p, vec2 dir, float r, float scale, float ca) {
    return vec2(uPan, uPanY) + (p * scale * (1.0 + ca)
                                + dir * (r * r) * uAmp * 0.055) * 0.5;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    vec2 dir = r > 0.0001 ? p / r : vec2(0.0);

    // Campo comprimido dentro, con dispersion cromatica que crece al canto.
    float ca = (0.0015 + 0.0075 * r * r) * (0.5 + 0.9 * uI);
    float cr = texture2D(uTex, mapUV(p, dir, r, uK,  ca)).r;
    float cg = texture2D(uTex, mapUV(p, dir, r, uK, 0.0)).g;
    float cb = texture2D(uTex, mapUV(p, dir, r, uK, -ca)).b;
    vec3 col = vec3(cr, cg, cb);

    // Volumen: la esfera se hunde hacia el borde (si no, parece una foto),
    // pero sin comerse las letras del centro: el campo tiene que leerse.
    col *= 1.22 * (1.0 - 0.58 * pow(r, 2.8));
    col += vec3(0.055, 0.050, 0.047) * (1.0 - r);   // velo calido en el centro

    // Especular que recorre el canto: arco ancho + punto de luz.
    float ang = atan(p.y, p.x);
    float da = abs(mod(ang - uTheta + PI, 2.0 * PI) - PI);
    float arc = exp(-da * da * 13.0) * smoothstep(0.30, 0.97, r);
    col += vec3(1.0) * arc * (0.22 + 0.26 * uI);
    vec2 lp = vec2(cos(uTheta), sin(uTheta)) * 0.66;
    float dl = length(p - lp);
    col += vec3(1.0) * exp(-dl * dl * 300.0) * (0.60 + 0.35 * uI);

    // Canto: banda cromatica de portada + un filo de luz blanco arriba del
    // todo, que es lo que delata el vidrio.
    float rim = smoothstep(0.86, 0.99, r);
    col = mix(col, uTint, rim * (0.20 + 0.30 * uI + 0.22 * uClick));
    col += uTint * rim * 0.26;
    float edge = smoothstep(0.955, 1.0, r);
    col += vec3(1.0) * edge * (0.22 + 0.18 * uI + 0.15 * uClick);

    // El borde final se apaga para que no haya un corte circular.
    float a = 0.95 * smoothstep(1.0, 0.955, r);
    gl_FragColor = vec4(col, a);
  }`;function P0(n,e){const t=document.querySelector(".play-lens");if(!t)return null;const i=document.getElementById("ascii");let r=!1;try{r=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}let a=null,s=null,l=null,c=null,o=null,u=null,d=null,h=null,f=0,m=0,S=0,v=0,p=0,x=0,g=0,_=-1e9,A=!0,R=!1,T=0,D=-1,w=0;function C(J,ae){if(J-f<42)return;f=J;const he=n.getBoundingClientRect(),K=i.getBoundingClientRect(),$=i.width/Math.max(1,K.width);if(!($>0))return;const oe=(he.left+he.width/2-K.left)*$,fe=(he.top+he.height/2-K.top)*$,y=E0/2*$;!(y>.5)||!isFinite(oe)||!isFinite(fe)||(h.fillStyle="#000",h.fillRect(0,0,Ji,Ji),h.drawImage(i,oe-y,fe-y,y*2,y*2,0,0,Ji,Ji),u.needsUpdate=!0)}function F(J){let ae=16.7;typeof J=="number"&&isFinite(J)&&(D>=0&&(ae=J-D,ae>0?ae>100&&(ae=100):ae=0),D=J),T+=ae,m+=(v-m)*.12,S+=(p-S)*.12,x+=(g-x)*.1;const he=r?0:.5+.5*Math.sin(T/R0),K=T-_,$=K<700?Math.sin(Math.PI*K/700):0,oe=rs+(y0-rs)*x+he*.05*(1-x)+(b0-rs)*$,fe=as+(T0-as)*x+he*.45*(1-x)+(w0-as)*$,y=r?2.1:T/A0*Math.PI*2,M=o.uniforms;M.uK.value=oe,M.uAmp.value=fe,M.uTheta.value=y,M.uI.value=x,M.uClick.value=$,M.uPan.value=.5+(v-m)/Or*-.22,M.uPanY.value=.5+(p-S)/Or*-.22,C(T),a.render(s,l)}function N(J){if(!(!A||R||!a)){try{F(J),w=0}catch(ae){if(String(ae&&ae.message||ae),++w>8){try{q()}catch{}return}}if(r){A=!1;return}requestAnimationFrame(N)}}function q(){A=!1,n.classList.add("no-gl3d");try{a&&a.dispose()}catch{}a=null}function B(){a=new v0({canvas:t,antialias:!1,alpha:!0,premultipliedAlpha:!1,powerPreference:"low-power",preserveDrawingBuffer:!1}),a.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),a.setSize(Or,Or,!1),a.setClearColor(0,0),s=new x0,l=new gh(-1,1,1,-1,.1,10),l.position.z=2,d=document.createElement("canvas"),d.width=Ji,d.height=Ji,h=d.getContext("2d",{alpha:!1}),u=new M0(d),u.minFilter=Dt,u.magFilter=Dt,u.generateMipmaps=!1,o=new vn({vertexShader:C0,fragmentShader:L0,uniforms:{uTex:{value:u},uK:{value:rs},uAmp:{value:as},uTheta:{value:2.1},uI:{value:0},uClick:{value:0},uPan:{value:.5},uPanY:{value:.5},uTint:{value:new Ne(191/255,112/255,96/255)}},transparent:!0,depthWrite:!1,depthTest:!1}),c=new Ft(new Ur(2,2),o),c.frustumCulled=!1,s.add(c),t.addEventListener("webglcontextlost",J=>{J.preventDefault(),A=!1,n.classList.add("no-gl3d")},!1)}try{B(),requestAnimationFrame(N)}catch{n.classList.add("no-gl3d")}const X=J=>{if(e.classList.contains("hidden"))return;const ae=t.getBoundingClientRect(),he=J.clientX-ae.left-ae.width/2,K=J.clientY-ae.top-ae.height/2;g=Math.max(0,Math.min(1,1-Math.hypot(he,K)/150));const $=Or*.22;Math.hypot(he,K)>150?(v=0,p=0):(v=Math.max(-$,Math.min($,he)),p=Math.max(-$,Math.min($,K)))},j=()=>{g=1},Q=()=>{g=0,v=0,p=0};return window.addEventListener("pointermove",X,{passive:!0}),n.addEventListener("pointerenter",j,{passive:!0}),n.addEventListener("pointerleave",Q,{passive:!0}),n.addEventListener("focus",j),n.addEventListener("blur",Q),{boost:function(){_=T},stop:function(){R=!0,A=!1;try{if(c&&(s.remove(c),c.geometry.dispose()),o&&o.dispose(),u&&u.dispose(),a){a.dispose();const J=a.getContext(),ae=J&&J.getExtension("WEBGL_lose_context");ae&&ae.loseContext()}}catch{}a=null,c=null,o=null,u=null}}}const Be={title:"After Hours (Live At SoFi Stadium)",artist:"The Weeknd",cover:"assets/cover.jpg",tracks:[{n:1,id:"PEy-6nzfuis",file:"assets/tracks/2427823cc686.mp3",title:"Intro (Live At SoFi Stadium)",artist:"The Weeknd",duration:96},{n:2,id:"OaNd22q_Ej4",file:"assets/tracks/dbd8eaa1ea19.mp3",title:"Alone Again (Live At SoFi Stadium)",artist:"The Weeknd",duration:167},{n:3,id:"4ujIFFMY4V4",file:"assets/tracks/e669296e1a03.mp3",title:"Gasoline (Live At SoFi Stadium)",artist:"The Weeknd",duration:196},{n:4,id:"8HqneWmke6Y",file:"assets/tracks/04058c946d28.mp3",title:"Sacrifice (Live At SoFi Stadium)",artist:"The Weeknd",duration:263},{n:5,id:"RxIrj_CBi1M",file:"assets/tracks/4b904cdf0770.mp3",title:"How Do I Make You Love Me? (Live At SoFi Stadium)",artist:"The Weeknd",duration:209},{n:6,id:"G-vdOGua2Ng",file:"assets/tracks/0e323ec569f9.mp3",title:"Can't Feel My Face (Live At SoFi Stadium)",artist:"The Weeknd",duration:184},{n:7,id:"6-7JZMJc1Ck",file:"assets/tracks/b4b8e4419837.mp3",title:"Take My Breath (Live At SoFi Stadium)",artist:"The Weeknd",duration:236},{n:8,id:"YqS3zSetGNE",file:"assets/tracks/7f2527815b49.mp3",title:"Hurricane (Live At SoFi Stadium)",artist:"The Weeknd",duration:128},{n:9,id:"lSF_SCLi9Pk",file:"assets/tracks/0fe75c3d1c8f.mp3",title:"The Hills (Live At SoFi Stadium)",artist:"The Weeknd",duration:185},{n:10,id:"4kmItvIAceQ",file:"assets/tracks/8afde4d4dc40.mp3",title:"Often (Live At SoFi Stadium)",artist:"The Weeknd",duration:149},{n:11,id:"kNC9E3m_u14",file:"assets/tracks/32fe6921b5a5.mp3",title:"Crew (Live At SoFi Stadium)",artist:"The Weeknd",duration:114},{n:12,id:"AYF3AmntvvE",file:"assets/tracks/714e9a7aa7f3.mp3",title:"Starboy (Live At SoFi Stadium)",artist:"The Weeknd",duration:246},{n:13,id:"tnvNDkdOZHA",file:"assets/tracks/ab9701c1c2cc.mp3",title:"Heartless (Live At SoFi Stadium)",artist:"The Weeknd",duration:124},{n:14,id:"cBMNJk3sGWo",file:"assets/tracks/c9b6cd8dfb8a.mp3",title:"Low Life (Live At SoFi Stadium)",artist:"The Weeknd",duration:107},{n:15,id:"rlAXQ4rYpFA",file:"assets/tracks/4443f316e705.mp3",title:"Or Nah (Live At SoFi Stadium)",artist:"The Weeknd, Ty Dolla $ign",duration:102},{n:16,id:"4STR7nslVu0",file:"assets/tracks/afcf022004f6.mp3",title:"Kiss Land (Live At SoFi Stadium)",artist:"The Weeknd",duration:110},{n:17,id:"0wqA16EhFsY",file:"assets/tracks/386d5e4f9922.mp3",title:"Party Monster (Live At SoFi Stadium)",artist:"The Weeknd",duration:190},{n:18,id:"io4Vw5oT18k",file:"assets/tracks/c4d0be127bb1.mp3",title:"Faith (Live At SoFi Stadium)",artist:"The Weeknd",duration:185},{n:19,id:"5P89RDW71q4",file:"assets/tracks/c1e0aac60f14.mp3",title:"After Hours (Live At SoFi Stadium)",artist:"The Weeknd",duration:268},{n:20,id:"xLeMvXEiNhw",file:"assets/tracks/f5b1fdebc663.mp3",title:"Call Out My Name (Live At SoFi Stadium)",artist:"The Weeknd",duration:243},{n:21,id:"WbzSLuEfUAI",file:"assets/tracks/7401ba71dae9.mp3",title:"I Feel It Coming (Live At SoFi Stadium)",artist:"The Weeknd",duration:234},{n:22,id:"HRa30JXI7Qg",file:"assets/tracks/1653c2e67b7c.mp3",title:"Die For You (Live At SoFi Stadium)",artist:"The Weeknd",duration:194},{n:23,id:"EwAvtt9Rc3A",file:"assets/tracks/25191b59d15d.mp3",title:"Is There Someone Else? (Live At SoFi Stadium)",artist:"The Weeknd",duration:238},{n:24,id:"PZPhrc9s82Y",file:"assets/tracks/9b43535ea744.mp3",title:"I Was Never There (Live At SoFi Stadium)",artist:"The Weeknd",duration:137},{n:25,id:"DUvLKU03uNA",file:"assets/tracks/f0108adb9c95.mp3",title:"Wicked Games (Live At SoFi Stadium)",artist:"The Weeknd",duration:143},{n:26,id:"rWwIKXfg3xw",file:"assets/tracks/c3422b7356af.mp3",title:"Out of Time (Live At SoFi Stadium)",artist:"The Weeknd",duration:201},{n:27,id:"V5tVUL5ykHQ",file:"assets/tracks/20840a595a93.mp3",title:"The Morning (Live At SoFi Stadium)",artist:"The Weeknd",duration:200},{n:28,id:"KTR6PIWOp_Q",file:"assets/tracks/1a412e33bb01.mp3",title:"Save Your Tears (Live At SoFi Stadium)",artist:"The Weeknd",duration:178},{n:29,id:"-zv5IVoamr4",file:"assets/tracks/3b3c7cdcb207.mp3",title:"Less Than Zero (Live At SoFi Stadium)",artist:"The Weeknd",duration:245},{n:30,id:"YKh1Diq0ohM",file:"assets/tracks/ebb9396b627f.mp3",title:"Blinding Lights (Live At SoFi Stadium)",artist:"The Weeknd",duration:254},{n:31,id:"O6ex76x3FQI",file:"assets/tracks/134a68f1ec05.mp3",title:"Outro (Live At SoFi Stadium)",artist:"The Weeknd",duration:200}]};window.__PLAYLIST__=Be;let mt=-1,rn=!1,El=!1;const yl=450,I0=4e3;let an=null,Fr=null,bl=null,kr=-1,kn=!1;const Br=new Audio,zr=new Audio;let He=Br,ht=zr;function Tl(n){(!isFinite(n)||n<0)&&(n=0);const e=Math.floor(n/60),t=Math.floor(n%60);return e+":"+(t<10?"0":"")+t}function U0(n){return Be&&Be.tracks&&Be.tracks[n]||null}function Hr(){return U0(mt)}function qh(){const n=document.getElementById("nowPlaying"),e=Hr();if(!n||!e)return;document.getElementById("npTitle").textContent=e.title||"";const t=document.getElementById("npArtist");if(t){const r=Be&&Be.artist;t.textContent=e.artist&&e.artist!==r?e.artist+" · "+(r||""):e.artist||r||""}const i=document.getElementById("npCover");Be&&Be.cover?(i.style.display="",i.src=Be.cover,i.onerror=()=>{i.style.display="none"}):i.style.display="none",n.classList.add("show"),clearTimeout(bl),bl=setTimeout(()=>n.classList.remove("show"),4e3),n.onclick=()=>{clearTimeout(bl),n.classList.remove("show")}}function D0(){const n=document.getElementById("plList");if(!n||!Be||!Be.tracks)return;const e=document.getElementById("plCover");e&&(e.src=Be.cover||"");const t=document.getElementById("plTitle");t&&(t.textContent=Be.title||"");const i=document.getElementById("plArtist");i&&(i.textContent=Be.artist||""),n.textContent="",Be.tracks.forEach((r,a)=>{const s=document.createElement("li");s.dataset.i=a,a===mt&&s.classList.add("active");const l=document.createElement("span");l.className="pl-num",l.textContent=String(a+1);const c=document.createElement("span");c.className="pl-tit",c.textContent=r.title||"";const o=document.createElement("span");o.className="pl-dur",o.textContent=Tl(r.duration||0),s.append(l,c,o),s.addEventListener("click",u=>{u.stopPropagation(),Gr(a)}),n.appendChild(s)})}function wl(){document.querySelectorAll("#plList li").forEach(n=>{n.classList.toggle("active",Number(n.dataset.i)===mt)})}function ss(){const n=document.getElementById("plBarTitle"),e=Hr();n&&(n.textContent=e?e.title||"":"Pulsa play para empezar"),Al()}function Al(){const n=document.getElementById("plBarTime");if(!n)return;if(mt<0||!He.src){n.textContent="0:00";return}const e=He.duration&&isFinite(He.duration)?He.duration:Hr()?Hr().duration:0;n.textContent=Tl(He.currentTime)+" / "+Tl(e)}function os(n){const e=document.getElementById("plPlayIcon");e&&(e.innerHTML=n?'<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>':'<path d="M8 5v14l11-7z"/>');const t=document.getElementById("plPlayBtn");t&&t.setAttribute("aria-label",n?"Pausar":"Reproducir")}function jh(){const n=document.getElementById("spotifyPanel"),e=document.getElementById("spotifyToggle");El=!0,e&&e.classList.add("on"),n&&(n.classList.add("show"),n.classList.add("compact"),n.classList.remove("idle")),yi(550)}function N0(){const n=document.getElementById("spotifyPanel"),e=document.getElementById("spotifyToggle");El=!1,e&&e.classList.remove("on"),n&&(n.classList.remove("show"),n.classList.remove("expanded"),Qi(!1)),yi(550)}let Rl=null;function Qi(n){const e=document.getElementById("spotifyPanel");e&&(n?(clearTimeout(Rl),e.classList.contains("pinned")||e.classList.add("pinned"),e.classList.remove("idle")):(clearTimeout(Rl),Rl=setTimeout(()=>e.classList.remove("pinned"),300)))}function Zh(n){n.pause(),n.removeAttribute("src"),n.load(),n.volume=1}Br.addEventListener("timeupdate",()=>Ll()),zr.addEventListener("timeupdate",()=>Ll());const Kh=n=>{!rn||an!==null||n.target!==He||(Be.tracks[mt+1]?Gr(mt+1):O0())};Br.addEventListener("ended",Kh),zr.addEventListener("ended",Kh);function O0(){clearInterval(an),an=null,clearInterval(Fr),Fr=null,kn=!1,Zh(Br),Zh(zr),mt=-1,rn=!1,kr=-1,os(!1),wl(),ss()}function $h(n){[Br,zr].forEach(e=>{if(e!==n)try{e.pause(),e.removeAttribute("src"),e.load(),e.volume=1}catch{}})}function F0(){rn&&(He.pause(),ht&&ht!==He&&ht.pause(),rn=!1,os(!1))}function k0(){if(mt<0){Gr(0);return}if(!He.src){Gr(mt);return}He.volume=1;const n=He.play();if(n&&n.catch&&n.catch(()=>{}),an!==null&&ht&&ht.src){const e=ht.play();e&&e.catch&&e.catch(()=>{})}rn=!0,os(!0)}function B0(){rn?F0():k0()}function Cl(){if(!Be||!Be.tracks)return;const n=mt+1;n>=Be.tracks.length||kr===n&&ht.src||(kr=n,ht.volume=0,ht.src=Be.tracks[n].file,ht.load(),Ys(Pl(n)))}function z0(){if(!Be||!Be.tracks)return;const n=mt+1;if(n>=Be.tracks.length||kn)return;kn=!0;const e=He,t=ht;(kr!==n||!t.src)&&Cl(),mt=n,rn=!0,t.volume=0;const i=t.play();i&&i.catch&&i.catch(()=>{});const r=performance.now();let a=!1;const s=()=>{if(a||!kn)return;a=!0,clearInterval(an),an=null,kn=!1;try{e.removeEventListener("ended",s)}catch{}e.pause(),e.volume=1,e.removeAttribute("src"),e.load();const l=He;He=ht,ht=l,kr=-1,qh(),wl(),ss()};try{e.addEventListener("ended",s)}catch{}clearInterval(an),an=setInterval(()=>{const l=Math.min(1,(performance.now()-r)/yl);e.volume=1-l,t.volume=l,Al(),l>=1&&s()},32)}function Ll(){if(mt<0||!He.src||!rn)return;!kn&&ht&&ht!==He&&!ht.paused&&$h(He);const n=Hr();if(!n)return;const t=(He.duration&&isFinite(He.duration)?He.duration:n.duration||0)-He.currentTime;Al(),t<=I0/1e3+.3&&t>yl/1e3+.2&&Cl(),t<=yl/1e3+.1&&z0()}function Gr(n){if(!Be||!Be.tracks||!Be.tracks[n])return;clearInterval(an),an=null,clearInterval(Fr),Fr=null,kn=!1,mt=n,Ys(Pl(n)),$h(He),He.pause(),He.volume=1,He.src=Be.tracks[n].file,He.currentTime=0;const e=He.play();e&&e.catch&&e.catch(()=>{}),rn=!0,os(!0),jh(),qh(),wl(),ss(),Cl(),Fr=setInterval(Ll,1e3),yi(550)}function H0(){Gr(0)}function G0(){const n=document.getElementById("spotifyPanel"),e=n?n.querySelector(".spotify-frame-wrap"):null,t=document.getElementById("spotifyToggle");t&&t.addEventListener("click",()=>{El?N0():jh()}),e&&(e.addEventListener("click",r=>{r.target.closest(".pl-list li")||n.classList.contains("compact")&&(n.classList.toggle("expanded"),yi(500))}),e.addEventListener("mouseenter",()=>Qi(!0)),e.addEventListener("mouseleave",()=>Qi(!1)),e.addEventListener("focusin",()=>Qi(!0)),e.addEventListener("focusout",()=>Qi(!1)),e.addEventListener("wheel",()=>Qi(!0),{passive:!0}));const i=document.getElementById("plPlayBtn");i&&i.addEventListener("click",r=>{r.stopPropagation(),B0()}),D0(),ss()}const V0=fm(),Pl=n=>gm(Be.tracks[n]&&Be.tracks[n].file);St.read=function(n){if(mt<0||!rn)return null;const e=kn?ht:He;return!e.src||e.paused||e.seeking?null:{key:Pl(mt),ms:V0(e,n)}};const Jh="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+-<>/\\|~^ᛝᚱᛟ§Ω✕✦",Il="Thony",ls=document.getElementById("nameGlitch"),cs=document.getElementById("nameRow");let us=!1,Qh=null;const ed=()=>Jh[Math.floor(Math.random()*Jh.length)];function td(n){ls.innerHTML="";for(const e of n){const t=document.createElement("span");t.className="ch",t.textContent=e,ls.appendChild(t)}return Array.from(ls.children)}let Vr=0,Wr=0;function nd(){Wr++,cancelAnimationFrame(Vr)}function Ul(){nd();const n=Wr,e=td(Il),t=260,i=70,r=performance.now();function a(s){if(n!==Wr)return;const l=s-r;let c=!0;e.forEach((o,u)=>{l-u*i<t?(o.textContent=ed(),c=!1):o.textContent=Il[u]}),c||(Vr=requestAnimationFrame(a))}Vr=requestAnimationFrame(a)}function W0(){nd();const n=Wr,e=ls.querySelectorAll(".ch"),t=55;let i=0;function r(a){!us||n!==Wr||(a-i>=t&&(e.forEach(s=>{s.textContent=ed()}),i=a),Vr=requestAnimationFrame(r))}Vr=requestAnimationFrame(r)}function X0(){const n=()=>{us=!0,W0()},e=()=>{us=!1,Ul()};cs.addEventListener("mouseenter",n),cs.addEventListener("mouseleave",e),cs.addEventListener("touchstart",n,{passive:!0}),cs.addEventListener("touchend",e)}function Y0(){clearInterval(Qh),Qh=setInterval(()=>{us||Ul()},6e4)}function q0(){document.getElementById("avatarImg").src="assets/avatar.png"}const id="xatspace.musicFx";function j0(){const n=document.getElementById("fxToggle");if(!n)return;try{localStorage.getItem(id)==="0"&&(St.fxEnabled=!1)}catch{}const e=()=>{const t=St.fxEnabled;n.classList.toggle("on",t),n.setAttribute("aria-pressed",String(t));const i=t?"Desactivar animaciones de la música":"Activar animaciones de la música";n.setAttribute("aria-label",i),n.title="Animaciones de la música: "+(t?"activadas":"desactivadas")};e(),n.addEventListener("click",()=>{St.fxEnabled=!St.fxEnabled;try{localStorage.setItem(id,St.fxEnabled?"1":"0")}catch{}e()})}function Z0(){const n=document.getElementById("playGate"),e=document.getElementById("playBtn"),t=document.getElementById("dock"),i=P0(e,n);let r=!1;e.addEventListener("click",()=>{r||n.classList.contains("hidden")||(r=!0,i&&(i.boost(),i.stop()),St.welcomeDone=!0,n.classList.add("hidden"),t.classList.add("show"),Ul(),Y0(),H0(),yi(400))}),document.addEventListener("keydown",a=>{a.key!=="Enter"||a.repeat||n.classList.contains("hidden")||e.click()})}function K0(){const n=document.getElementById("dock"),e=document.getElementById("spotifyPanel"),t=document.querySelector(".card"),i=e.querySelector(".spotify-frame-wrap"),r=document.getElementById("stage"),a=2400,s=300;let l=null,c=null,o=!1;const u=()=>yi(0);function d(){n.classList.remove("idle"),n.classList.remove("reveal-hidden"),e.classList.contains("pinned")||e.classList.remove("idle"),clearTimeout(c),u()}function h(){clearTimeout(l),l=setTimeout(()=>{o||(n.classList.add("idle"),e.classList.contains("pinned")||e.classList.add("idle"),u())},a)}function f(){clearTimeout(c),c=setTimeout(()=>{!o&&n.classList.contains("show")&&(n.classList.add("reveal-hidden"),u())},s)}["mousemove","pointermove"].forEach(m=>{window.addEventListener(m,()=>{d(),h()},{passive:!0})}),r.addEventListener("mousemove",()=>{o||f()},{passive:!0}),r.addEventListener("mouseleave",()=>clearTimeout(c)),window.addEventListener("touchstart",()=>{d(),h()},{passive:!0}),[t,e].forEach(m=>{m&&(m.addEventListener("mouseenter",()=>{o=!0,clearTimeout(l),clearTimeout(c),d(),u()}),m.addEventListener("mouseleave",()=>{o=!1,i.classList.remove("halo-near"),h(),u()}))}),window.addEventListener("mousemove",m=>{if(!e.classList.contains("show"))return;const S=i.getBoundingClientRect(),v=S.left+S.width/2,p=S.top+S.height/2,x=Math.hypot(m.clientX-v,m.clientY-p);i.classList.toggle("halo-near",x<320)},{passive:!0}),h()}window.addEventListener("DOMContentLoaded",()=>{q0(),X0(),Z0(),G0(),j0(),K0(),td(Il)})})();
