"use strict";(self["webpackChunkweb_admin"]=self["webpackChunkweb_admin"]||[]).push([[543],{6406:function(e,a,t){t.d(a,{Rm:function(){return d},Rq:function(){return u},YQ:function(){return r},Yu:function(){return s},fQ:function(){return n},od:function(){return l},uC:function(){return i}});var o=t(4429);let l=(e,a,t)=>(0,o.IK)(`goods?query=${e}&pagenum=${a}&pagesize=${t}`),n=()=>(0,o.IK)("categories"),i=(e,a)=>(0,o.IK)(`categories/${e}/attributes?sel=${a}`),r=e=>(0,o.ao)("upload",e),u=e=>(0,o.ao)("goods",e),d=(e,a,t)=>(0,o.br)(`categories/${e}/attributes/${a}`,t),s=()=>(0,o.IK)("reports/type/1")},9543:function(e,a,t){t.r(a),t.d(a,{default:function(){return k}});t(3069),t(6905),t(9007),t(172),t(6809);var o=t(4131),l=t(879),n=t(534),i=t(5791),r=t(3396),u=t(4870),d=t(9158),s=t(102),c=t(6406),p=t(678),m=t(65),g=t(8541),f=t(4876),v=t(547);const h={class:"seach"},_={class:"search_input"},b={class:"search_btn"},w=(0,r.Uk)("添加商品"),U=(0,r.Uk)("编辑 "),S=(0,r.Uk)("删除 "),W={class:"pageation"};var y={setup(e){let a=(0,p.tv)(),t=(0,m.oR)();t.commit("changeNavList",["商品管理","商品列表"]);let y=(0,u.iH)([]),C=(0,u.iH)(""),k=(0,u.iH)(1),z=(0,u.iH)(10),$=(0,u.iH)(0),Z=(0,u.iH)(null),H=async()=>{(0,r.Y3)((()=>{d.Z.showLoading(Z.value)}));let e=await(0,c.od)(C.value,k.value,z.value);console.log(e),200==e.data.meta.status?($.value=e.data.data.total,y.value=e.data.data.goods):(0,s.Z)(e.data.meta.msg,"error"),d.Z.hideLoading()};H();let I=e=>{k.value=e,H()},K=e=>{z.value=e,H()};return(e,t)=>{const d=i.mi,s=n.EZ,c=l.$Y,p=l.eI,m=o.R;return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",h,[(0,r._)("div",_,[(0,r.Wm)(s,{placeholder:"请输入内容",modelValue:(0,u.SU)(C),"onUpdate:modelValue":t[0]||(t[0]=e=>(0,u.dq)(C)?C.value=e:C=e)},{append:(0,r.w5)((()=>[(0,r.Wm)(d,{icon:(0,u.SU)(g.Z),onClick:(0,u.SU)(H)},null,8,["icon","onClick"])])),_:1},8,["modelValue"])]),(0,r._)("div",b,[(0,r.Wm)(d,{type:"primary",onClick:t[1]||(t[1]=e=>(0,u.SU)(a).push({path:"/addgoods"}))},{default:(0,r.w5)((()=>[w])),_:1})])]),(0,r._)("div",{class:"table",ref_key:"mytable",ref:Z},[(0,r.Wm)(p,{data:(0,u.SU)(y),border:"",style:{width:"100%"}},{default:(0,r.w5)((()=>[(0,r.Wm)(c,{prop:"goods_id",label:"商品id",width:"80"}),(0,r.Wm)(c,{prop:"goods_name",label:"商品名称",width:"600px"}),(0,r.Wm)(c,{prop:"goods_price",label:"商品价格"}),(0,r.Wm)(c,{prop:"goods_number",label:"商品数量"}),(0,r.Wm)(c,{prop:"goods_weight",label:"商品重量"}),(0,r.Wm)(c,{label:"操作",width:"300"},{default:(0,r.w5)((e=>[(0,r.Wm)(d,{type:"primary",icon:(0,u.SU)(f.Z),size:"small"},{default:(0,r.w5)((()=>[U])),_:1},8,["icon"]),(0,r.Wm)(d,{type:"danger",icon:(0,u.SU)(v.Z),size:"small"},{default:(0,r.w5)((()=>[S])),_:1},8,["icon"])])),_:1})])),_:1},8,["data"])],512),(0,r._)("div",W,[(0,r.Wm)(m,{"default-page-size":(0,u.SU)(z),"page-sizes":[10,20,30,40,50],layout:"total, sizes, prev, pager, next, jumper",total:(0,u.SU)($),onCurrentChange:(0,u.SU)(I),onSizeChange:(0,u.SU)(K)},null,8,["default-page-size","total","onCurrentChange","onSizeChange"])])])}}};const C=y;var k=C}}]);
//# sourceMappingURL=543.363b75c4.js.map