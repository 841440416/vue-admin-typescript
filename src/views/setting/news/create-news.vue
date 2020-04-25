<template>
    <div>
        <Modal
         :title="L('CreateNewnews')" width="1000"
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
                    <EditorBar v-model="detail" :requrlfwb="requrlfwb" :serverAdd="serverAdd" :headers="headers"  :isClear="isClear" @change="change"></EditorBar> 
                </FormItem>
                </Col>
                
                </Row>

                <Row>
                <Col span="24">
                <FormItem :label="L('nImgUrl')" prop="nImgUrl">
                    <el-upload
                        :action="requrl"
                        list-type="picture-card"
                        limit="1"
                        :headers = "headers"
                        :on-preview="handlePictureCardPreview"
                        :on-success="success"
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
    export default class Createnews extends AbpBase{

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
        dialogImageUrl:string= '';
        dialogVisible:boolean= false;
        requrl:string = appconst.remoteServiceBaseUrl+'/api/services/app/News/SaveImage';
        requrlfwb:string=appconst.remoteServiceBaseUrl+'/api/services/app/News/SaveImageFWB';
        serverAdd:string=appconst.remoteServiceBaseUrl;
        headers:any= {Authorization: "Bearer "+window.abp.auth.getToken() };
        change(val) {  


            this.news.nHtml = val;
                    console.log(val)  
        }
        save(){
            (this.$refs.newsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'news/create',
                        data:this.news
                    });
                    (this.$refs.newsForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                    this.news.gzAdress = '上海';
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
            }
        }
        newsRule={
            nTitle:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nTitle')),trigger: 'blur'}],
            nHtml:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nHtml')),trigger: 'blur'}],
            nImgUrl:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('nImgUrl')),trigger: 'blur'}],
            // tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
            // adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        }
    }
</script>