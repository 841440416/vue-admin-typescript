<template>
    <div>
        <Modal
         :title="L('Editnews')"  width="1000"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
             <Form ref="newsForm"  label-position="top" :rules="newsRule" :model="news">
                <Row>
                <Col span="24">
                <FormItem :label="L('nTitle')" prop="nTitle">
                    <i-input size="large" placeholder="请输入标题" v-model="news.nTitle"></i-input>
                </FormItem>
                </Col>
                </Row>
                 <Row>
                <Col span="24">
                <FormItem :label="L('nHtml')" prop="nHtml">
                    <EditorBar ref="eb"  v-model="detail" :requrlfwb="requrlfwb" :serverAdd="serverAdd" :headers="headers"  :isClear="isClear" @change="change"></EditorBar> 
                </FormItem>
                </Col>
                
                </Row>

                <Row>
                <Col span="24">
                <FormItem :label="L('nImgUrl')" prop="nImgUrl">
                    <el-upload
                        :action="requrl"
                        list-type="picture-card"
                        ref="up"
                        limit="1"
                        :headers = "headers"
                        :on-preview="handlePictureCardPreview"
                        :on-success="success"
                        :file-list="fileList"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>

                </FormItem>
                </Col>
                </Row>
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
    import news from '@/store/entities/news';
    import EditorBar from '../../../components/wangEnduit'  
    import appconst from '../../../lib/appconst'
    @Component({
        components:{EditorBar}
    })
    export default class Editnews extends AbpBase{

        @Prop({type:Boolean,default:false}) value:boolean;
        

        mounted() {
           
        }
        handleRemove(file, fileList) {
            this.news.nImgUrl = '';
        }
        success(response, file, fileList){
            this.news.nImgUrl =  response.result.fileUrl;
        }
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
        @Prop({type:Boolean,default:false}) value:boolean;
        news:news=new news();
        test:string='';
        isClear:boolean=false;
        detail:string='';
        fileList:any=[];
        dialogImageUrl:string= '';
        dialogVisible:boolean= false;
        requrl:string = appconst.remoteServiceBaseUrl+'/api/services/app/News/SaveImage';
        requrlfwb:string=appconst.remoteServiceBaseUrl+'/api/services/app/News/SaveImageFWB';
        serverAdd:string=appconst.remoteServiceBaseUrl;
        headers:any= {Authorization: "Bearer "+window.abp.auth.getToken() };
        change(val) {  
            this.news.nHtml = val;
        }

        news:news=new news();
        save(){
            (this.$refs.newsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'news/update',
                        data:this.news
                    });
                    (this.$refs.newsForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.newsForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.news=Util.extend(true,{},this.$store.state.news.editnews);
                this.$refs.eb.setval(this.news.nHtml);
                if(''!=this.news.nImgUrl&&undefined!+this.news.nImgUrl&&this.$refs.up.fileList.length<1){
                this.fileList.push({name:'1.jpg',url:appconst.remoteServiceBaseUrl+'/'+this.news.nImgUrl});
            }
            }
        }
        newsRule={
            nTitle:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nTitle')),trigger: 'blur'}],
            nHtml:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nHtml')),trigger: 'blur'}],
            nImgUrl:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nImgUrl')),trigger: 'blur'}],
        }
    }
</script>