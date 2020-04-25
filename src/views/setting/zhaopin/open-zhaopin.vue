<template>
    <div >
        <Modal
        id="ccc"
         :title="L('Openzhaopin')" width="820px" height="700"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >


            <div slot="header" style="width:820px;height:62px;background: #2DC896;padding 0px 0px;">
            <span style="display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 15px;
    color: #fff;">{{L('Openzhaopin')}}</span>
            </div>
            <div slot="close" style="color: rgb(255, 255, 255);
    height: 20px;
    width: 20px;
    margin-top: 10px;
    margin-right: 5px;
    font-size: 12px;">
                X
            </div>
<div style="height:450px;">


<Row style="text-align:left;margin-left:20px;">
    <Col span="15" >
        <span class="fontTitle">岗位名称：</span>
        <span class="fontContext">{{zhaopin.gwName}}</span>
    </Col>
    <Col span="9">
    <span class="fontTitle">工作地点：</span>
        <span class="fontContext">{{zhaopin.gzAdress}}</span>
    </Col>
</Row>
<Row style="margin-top:50px;margin-left:20px;">
    <Col span="15" >
        <span class="fontTitle">学历要求：</span>
        <span class="fontContext">{{zhaopin.xlYaoQiu}}</span>
    </Col>
    <Col span="9">
    <span class="fontTitle">工作经验：</span>
        <span class="fontContext">{{zhaopin.gzJY}}</span>
    </Col>
</Row>
<Row style="margin-top:50px;margin-left:20px;">
<span class="fontTitle">岗位职责：</span>

</Row>
<Row style="margin-top:20px;margin-left:20px;width:768px;">
    <span style="font-size: 14px;color: #666666;line-height: 21px;">
   {{zhaopin.gwZZ}}
    </span>
</Row>


</div>
             
            

        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import zhaopin from '@/store/entities/zhaopin';
    @Component
    export default class Openzhaopin extends AbpBase{
   GWList:string[]=[
            '前端工程师',
            '后端工程师',
            '逆向工程师'
        ]
        jyList:string[]=[
            '不限',
            '1-3年',
            '3-5年',
            '5-10年'
        ]
        xlList:string[]=[
            '不限',
            '大专',
            '本科',
            '研究生',
            '博士'
        ]

        @Prop({type:Boolean,default:false}) value:boolean;


        
        zhaopin:zhaopin=new zhaopin();
        save(){
            (this.$refs.zhaopinForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'zhaopin/update',
                        data:this.zhaopin
                    });
                    (this.$refs.zhaopinForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.zhaopinForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.zhaopin=Util.extend(true,{},this.$store.state.zhaopin.editzhaopin);
            }
        }
        zhaopinRule={
            gwName:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gwName')),trigger: 'blur'}],
            gzAdress:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gzAdress')),trigger: 'blur'}],
            xlYaoQiu:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('xlYaoQiu')),trigger: 'blur'}],
            gzJY:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gzJY')),trigger: 'blur'}],
            gwZZ:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gwZZ')),trigger: 'blur'}],
            // name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('TenantName')),trigger: 'blur'}],
            // tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}]
        }
    }
</script>
<style type="less">
.fontTitle{
        font-size: 17px;
    color: #333333;
    font-weight: bold;

}
.fontContext{

    font-size: 14px;
    color: #666666;
    margin-left: 8px;
}
#ccc .ivu-modal-header{
    padding: 0px 0px;
}
#ccc .ivu-icon-ios-close{
    cursor: pointer;
}
#ccc .ivu-modal-footer{
        display: none;
}
</style>