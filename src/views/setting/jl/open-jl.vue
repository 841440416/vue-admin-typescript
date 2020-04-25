<template>
    <div >
        <Modal
        id="ccc"
         :title="L('Openjl')" width="820px" height="900"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <div slot="header" style="width:820px;height:62px;background: #2DC896;padding 0px 0px;">
            <span style="display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 15px;
    color: #fff;">{{L('Openjl')}}</span>
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
        <span class="fontTitle">姓名：</span>
        <span class="fontContext">{{jl.name}}</span>
    </Col>
    <Col span="9">
    <span class="fontTitle">投递岗位：</span>
        <span class="fontContext">{{jl.tdgw}}</span>
    </Col>
</Row>
<Row style="margin-top:50px;margin-left:20px;">
    <Col span="15" >
        <span class="fontTitle">手机：</span>
        <span class="fontContext">{{jl.phone}}</span>
    </Col>
    <Col span="9">
    <span class="fontTitle">邮箱：</span>
        <span class="fontContext">{{jl.email}}</span>
    </Col>
</Row>
<Row style="margin-top:50px;margin-left:20px;">
<span class="fontTitle">工作经历:</span>

</Row>
<Row style="margin-top:20px;margin-left:20px;width:768px;">
    <span style="font-size: 14px;color: #666666;line-height: 21px;">
   {{jl.gzjl}}
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
    import jl from '@/store/entities/jl';
    @Component
    export default class Openjl extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        
        jl:jl=new jl();
        save(){
            (this.$refs.jlForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'jl/update',
                        data:this.jl
                    });
                    (this.$refs.jlForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.jlForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.jl=Util.extend(true,{},this.$store.state.jl.editjl);
            }
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