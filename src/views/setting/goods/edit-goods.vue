<template>
    <div>
        <Modal
         :title="L('EditGoods')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="goodsForm"  label-position="top" :rules="goodsRule" :model="goods">
                <FormItem :label="L('GoodsName')" prop="goodsName">
                    <Input v-model="goods.goodsName" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('Price')" prop="price">
                    <Input v-model="goods.price" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('Describe')" prop="describe">
                    <Input v-model="goods.describe" :maxlength="1024"></Input>
                </FormItem>
                <FormItem :label="L('Qty')" prop="surplusQty">
                    <Input v-model="goods.surplusQty"  :maxlength="18"></Input>
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
    import Goods from '@/store/entities/goods';
    @Component
    export default class EditGoods extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        goods:Goods=new Goods();
        save(){
            (this.$refs.goodsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'goods/update',
                        data:this.goods
                    });
                    (this.$refs.goodsForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.goodsForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.goods=Util.extend(true,{},this.$store.state.goods.editGoods);
            }
        }
        goodsRule={
            // name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('TenantName')),trigger: 'blur'}],
            // tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}]
        }
    }
</script>