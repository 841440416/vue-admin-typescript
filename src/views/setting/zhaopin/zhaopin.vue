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

 <i-select not-found-text="请选择岗位" v-model="pagerequest.gwName" style="width:200px;" >
 <i-option value="">请选择</i-option>
                                    <i-option v-for="item in GWList" :value="item">{{item}}</i-option>
                                </i-select>

                                <i-select not-found-text="请选择学历" v-model="pagerequest.xlYaoQiu" style="width:200px;margin-left:20px;"  >
                                        <i-option  value="">请选择</i-option>
                                    <i-option v-for="item in xlList" :value="item">{{item}}</i-option>
                                </i-select>

           <i-select not-found-text="请选择工作经验" v-model="pagerequest.gzJY" style="width:200px;margin-left:20px;"  >
                  <i-option value="" >请选择</i-option>
                                    <i-option v-for="item in jyList" :value="item">{{item}}</i-option>
                                </i-select>

                                 <Date-picker v-model="pagerequest.fbTime" type="daterange" format="yyyy-MM-dd" placement="bottom-end" :placeholder="L('cxriqi')" style="width: 200px;margin-left:20px;"></Date-picker>
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



<div @click="create" style="display: inline-block;border: 1px solid #33ca99;margin-right: 10px;width: 85px;height: 32px;color: #33ca99;cursor: pointer;">

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
">{{L('Add')}}</span></div>


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
                    <Table @on-select-all="selectAll" @on-select="select"  @on-selection-change="getSelection" :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <Createzhaopin v-model="createModalShow" @save-success="getpage"></Createzhaopin>
        <Editzhaopin v-model="editModalShow" @save-success="getpage"></Editzhaopin>
        <Openzhaopin v-model="openModalShow" @save-success="getpage"></Openzhaopin>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import Createzhaopin from './create-zhaopin.vue'
    import Editzhaopin from './edit-zhaopin.vue'
    import Openzhaopin from './open-zhaopin.vue'
    
    class PagezhaopinRequest extends PageRequest{
        xlYaoQiu:string='';
        gzJY:string='';
        gwName:string='';
        fbTime:string='';
        isActive:boolean=null;
    }

   
    
    @Component({
        components:{Createzhaopin,Editzhaopin,Openzhaopin}
    })
    export default class zhaopin extends AbpBase{
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
                                        content:this.L('DeletezhaopinConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                            type:'zhaopin/deleteAll',
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

        pagerequest:PagezhaopinRequest=new PagezhaopinRequest();
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        openModalShow:boolean=false;
        get list(){
            return this.$store.state.zhaopin.list;
        };
        get loading(){
            return this.$store.state.zhaopin.loading;
        }
        create(){
            this.createModalShow=true;
            console.log('123123');
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
            this.$store.commit('zhaopin/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('zhaopin/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
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
           


            let pagerequest2=new PagezhaopinRequest();
            pagerequest2.fbTime = dd.toString();
            if (pagerequest2.fbTime=='NaN-NaN-NaN,NaN-NaN-NaN'){
                pagerequest2.fbTime = '';
            }
            pagerequest2.xlYaoQiu = this.pagerequest.xlYaoQiu;
            pagerequest2.gzJY = this.pagerequest.gzJY;
            pagerequest2.gwName = this.pagerequest.gwName;

        //    this.pagerequest.fbTime = dd;
        //    console.log(this.pagerequest.fbTime);
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            await this.$store.dispatch({
                type:'zhaopin/getAll',
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
            return this.$store.state.zhaopin.pageSize;
        }
        get totalCount(){
            return this.$store.state.zhaopin.totalCount;
        }
        get currentPage(){
            return this.$store.state.zhaopin.currentPage;
        }
        columns=[
             {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
            {
            title:this.L('gwName'),
            key:'gwName'
        },{
            title:this.L('gzAdress'),
            key:'gzAdress'
        },{
            title:this.L('xlYaoQiu'),
            key:'xlYaoQiu'
        },{
            title:this.L('gzJY'),
            key:'gzJY'
        },{
            title:this.L('CreationTime'),
            key:'creationTime',
            sortable: true
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:200,
            render:(h:any,params:any)=>{
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
                                this.$store.commit('zhaopin/edit',params.row);
                                this.open();
                            }
                        }
                    },this.L('OpenInfo')),
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
                                this.$store.commit('zhaopin/edit',params.row);
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
                                        content:this.L('DeletezhaopinConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'zhaopin/delete',
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