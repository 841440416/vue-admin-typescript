<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" >
                    <Row :gutter="16">
                        <Col span="16">
                        <!--<FormItem :label="L('Keyword')+':'" style="width:100%">-->
                            <FormItem style="width:100%">
                           <!--      <Input v-model="pagerequest.gwName" :placeholder="L('cxgwName')" style="width:250px;"></Input>-->


 <i-input v-model="pagerequest.Name" :placeholder="L('Name')" style="width: 300px"></i-input>

 <i-input v-model="pagerequest.TDGW" :placeholder="L('TDGW')" style="width: 300px;margin-left:50px;"></i-input>
                                 <Date-picker v-model="pagerequest.fbTime" type="daterange" format="yyyy-MM-dd" placement="bottom-end" :placeholder="L('cxriqi')" style="width: 300px;margin-left:50px;"></Date-picker>
                            </FormItem>
                        </Col>                 
                        <Col span="8" style="text-align: right;">

                       
<div @click="getpage" style="display: inline-block;border: 1px solid #33ca99;margin-right: 10px;width: 85px;height: 32px;color: #33ca99;cursor: pointer;">

<img src="@/assets/searsh.png" style="cursor: pointer;width:14px;height:14px;padding: 0 auto;
    display: inline-block;
    position: relative;
    right: 24px;
    top: 7px;">


<span style="cursor: pointer;
    padding: 0 auto;
    display: inline-block;
    position: relative;
    right: 18px;
    top: 5px;
">{{L('Find')}}</span></div>





<div @click="Delete" style="display: inline-block;border: 1px solid #e12a2a;margin-right: 10px;width: 85px;height: 32px;color: #e12a2a;cursor: pointer;">

<img src="@/assets/delete.png" style="cursor: pointer;width:14px;height:14px;padding: 0 auto;
    display: inline-block;
    position: relative;
    right: 24px;
    top: 7px;">


<span style="cursor: pointer;
    padding: 0 auto;
    display: inline-block;
    position: relative;
    right: 18px;
    top: 5px;
">{{L('Delete')}}</span></div>

                     


                        </Col>
                    </Row>
                    <!--<Row>
                       
                    </Row>-->
                </Form>
                <div class="margin-top-10">
                    <Table  @on-select-all="selectAll" @on-select="select"  @on-selection-change="getSelection" :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <Openjl v-model="openModalShow" @save-success="getpage"></Openjl>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import Openjl from './open-jl.vue'
    import appconst from '../../../lib/appconst'
    class PagejlRequest extends PageRequest{
        TDGW:string='';
        Name:string='';
        fbTime:string='';
        isActive:boolean=null;
    }

   
    
    @Component({
        components:{Openjl}
    })
    export default class jl extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        open(){
            this.openModalShow = true;
        }
       getSelection (selection) {
           console.log(selection);
        // 通过返回的已选择数组的长度来进行一些判断
        // 处理已选择数组，将已选项中的某些值拼接成字符串，发送给后台
    }

    selectAll(selection){
        let i = 0;
        while(i<selection.length){
            if(this.ccID.indexOf(selection[i].id)==-1){
                this.ccID.push(selection[i].id);
            }
            i++;
        }

    }
    async Delete(){
        this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeletejlConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                            type:'jl/deleteAll',
                                            data:this.ccID.toString()
                                        });
                                            await this.getpage();
                                        }
                                })
         
    }
    select(selection,row){
        let i = 0;
        while(i<selection.length){
           
            if(this.ccID.indexOf(selection[i].id)==-1){
                this.ccID.push(selection[i].id);
            }
            i++;
        }
    }

        ccID:string[]=[]
      
        pagerequest:PagejlRequest=new PagejlRequest();
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        openModalShow:boolean=false;
        get list(){
            return this.$store.state.jl.list;
        };
        get loading(){
            return this.$store.state.jl.loading;
        }
        create(){
            this.createModalShow=true;
           
        }
        mounted() {
            window.localStorage["ip"] = appconst.remoteServiceBaseUrl+'/';
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
            this.$store.commit('jl/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('jl/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            debugger;
            // alert(this.$refs.ccc.value)
            //.split(',')[0]
            // console.log(this.pagerequest.fbTime);
            let i = 0;
            let dd = [];
            while(i<this.pagerequest.fbTime.length){
                let c=  this.toTime(this.pagerequest.fbTime[i]);
                dd[i] = c;
                // dd.join(c);
                i++;
            }
            let pagerequest2=new PagejlRequest();
            pagerequest2.fbTime = dd.toString();
            if (pagerequest2.fbTime=='NaN-NaN-NaN,NaN-NaN-NaN'){
                pagerequest2.fbTime = '';
            }
            pagerequest2.TDGW = this.pagerequest.TDGW;
            pagerequest2.Name = this.pagerequest.Name;

        //    this.pagerequest.fbTime = dd;
        //    console.log(this.pagerequest.fbTime);
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            await this.$store.dispatch({
                type:'jl/getAll',
                data:pagerequest2
            })
        }


         toTime(c){
            console.log(c);
        var d = new Date(c); 
        d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return d;
        }

        get pageSize(){
            return this.$store.state.jl.pageSize;
        }
        get totalCount(){
            return this.$store.state.jl.totalCount;
        }
        get currentPage(){
            return this.$store.state.jl.currentPage;
        }
        columns=[
             {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
            {
            title:this.L('Name'),
            key:'name'
        }
        ,
            {
            title:this.L('TDGW'),
            key:'tdgw'
        },
            {
            title:this.L('Phone'),
            key:'phone'
        },
            {
            title:this.L('Email'),
            key:'email'
        },
       {
            title:this.L('CreationTime'),
            key:'creationTime',
            sortable: true
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            render:(h:any,params:any)=>{
                debugger;
                return h('div',[
                     h('Button',{
                        props:{
                            type:'success',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('jl/edit',params.row);
                                this.open();
                            }
                        }
                    },this.L('OpenInfo')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeletejlConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'jl/delete',
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