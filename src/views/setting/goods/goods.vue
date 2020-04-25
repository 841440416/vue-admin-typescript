<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="8">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('GoodsName')"></Input>
                            </FormItem>
                        </Col>                 
                        <Col span="8">
                            
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-goods v-model="createModalShow" @save-success="getpage"></create-goods>
        <edit-goods v-model="editModalShow" @save-success="getpage"></edit-goods>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateGoods from './create-goods.vue'
    import EditGoods from './edit-goods.vue'
    
    class PageGoodsRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
    }
    
    @Component({
        components:{CreateGoods,EditGoods}
    })
    export default class Goodss extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageGoodsRequest=new PageGoodsRequest();
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.goods.list;
        };
        get loading(){
            return this.$store.state.goods.loading;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.pagerequest.isActive=true;
            }else if(val==='NoActive'){
                this.pagerequest.isActive=false;
            }else{
                this.pagerequest.isActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('goods/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('goods/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            await this.$store.dispatch({
                type:'goods/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.goods.pageSize;
        }
        get totalCount(){
            return this.$store.state.goods.totalCount;
        }
        get currentPage(){
            return this.$store.state.goods.currentPage;
        }
        columns=[{
            title:this.L('GoodsName'),
            key:'goodsName'
        },{
            title:this.L('Price'),
            key:'price'
        },{
            title:this.L('Describe'),
            key:'describe'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('goods/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteGoodsConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'goods/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
        }
    }
</script>