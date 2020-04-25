<template>
    <div>
        <Modal
         :title="L('CreateNewzhaopin')" width="700" height="700"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="zhaopinForm"  label-position="top" :rules="zhaopinRule" :model="zhaopin">
                <Row>
                <Col span="11">
                <FormItem :label="L('gwName')" prop="gwName">
                    <i-select not-found-text="请选择" v-model="zhaopin.gwName"  >

                                    <i-option v-for="item in GWList" :value="item">{{item}}</i-option>
                    </i-select>
                </FormItem>
                </Col>
                <Col span="11" style="margin-left:30px;">
                <FormItem :label="L('gzAdress')" prop="gzAdress">
                    <Input v-model="zhaopin.gzAdress" :maxlength="32" :minlength="2" ></Input>
                </FormItem>
                </Col>
                </Row>

                 <Row>
                <Col span="11">
                <FormItem :label="L('xlYaoQiu')" prop="xlYaoQiu">
                    <i-select not-found-text="请选择" v-model="zhaopin.xlYaoQiu"  >

                                    <i-option v-for="item in xlList" :value="item">{{item}}</i-option>
                    </i-select>
                </FormItem>
                </Col>
                <Col span="11" style="margin-left:30px;">
                <FormItem :label="L('gzJY')" prop="gzJY">
                     <i-select v-model="zhaopin.gzJY"  >
     
                                    <i-option v-for="item in jyList" :value="item">{{item}}</i-option>
                                </i-select>
                </FormItem>
                </Col>
                </Row>

                 <FormItem :label="L('gwZZ')" prop="gwZZ">

                    <i-input v-model="zhaopin.gwZZ" type="textarea" :rows="18" placeholder="请输入..."></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
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
    export default class Createzhaopin extends AbpBase{

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

        mounted() {
            this.zhaopin.gzAdress = '上海';
        }

        @Prop({type:Boolean,default:false}) value:boolean;
        zhaopin:zhaopin=new zhaopin();
        save(){
            (this.$refs.zhaopinForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'zhaopin/create',
                        data:this.zhaopin
                    });
                    (this.$refs.zhaopinForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                    this.zhaopin.gzAdress = '上海';
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
            }
        }
        zhaopinRule={
            gwName:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gwName')),trigger: 'blur'}],
            gzAdress:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gzAdress')),trigger: 'blur'}],
            xlYaoQiu:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('xlYaoQiu')),trigger: 'blur'}],
            gzJY:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gzJY')),trigger: 'blur'}],
            gwZZ:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('gwZZ')),trigger: 'blur'}],
            // tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
            // adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        }
    }
</script>