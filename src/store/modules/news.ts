import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import news from '../entities/news'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface newsState extends ListState<news>{
    editnews:news;
}
class NewsModule extends ListModule<newsState,any,news>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<news>(),
        loading:false,
        editnews:new news()
    }
    actions={
        async getAll(context:ActionContext<newsState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/News/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<news>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<newsState,any>,payload:any){
            await Ajax.post('/api/services/app/News/Create',payload.data);
        },
        async update(context:ActionContext<newsState,any>,payload:any){
            await Ajax.put('/api/services/app/News/Update',payload.data);
        },
        async deleteAll(context:ActionContext<newsState,any>,payload:any){
            debugger;
            await Ajax.delete('/api/services/app/News/Deletenews?ids='+payload.data);
        },
        async delete(context:ActionContext<newsState,any>,payload:any){
            await Ajax.delete('/api/services/app/News/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<newsState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/News/Get?Id='+payload.id);
            return reponse.data.result as news;
        }
    };
    mutations={
        setCurrentPage(state:newsState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:newsState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:newsState,news:news){
            state.editnews=news;
        }
    }
}
const newsModule=new NewsModule();
export default newsModule;