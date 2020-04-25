import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import zhaopin from '../entities/zhaopin'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface zhaopinState extends ListState<zhaopin>{
    editzhaopin:zhaopin;
}
class ZhaoPinModule extends ListModule<zhaopinState,any,zhaopin>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<zhaopin>(),
        loading:false,
        editzhaopin:new zhaopin()
    }
    actions={
        async getAll(context:ActionContext<zhaopinState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/ZhaoPin/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<zhaopin>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<zhaopinState,any>,payload:any){
            await Ajax.post('/api/services/app/ZhaoPin/Create',payload.data);
        },
        async update(context:ActionContext<zhaopinState,any>,payload:any){
            await Ajax.put('/api/services/app/ZhaoPin/Update',payload.data);
        },
        async deleteAll(context:ActionContext<zhaopinState,any>,payload:any){
            debugger;
            await Ajax.delete('/api/services/app/ZhaoPin/DeleteZhaoPin?ids='+payload.data);
        },
        async delete(context:ActionContext<zhaopinState,any>,payload:any){
            await Ajax.delete('/api/services/app/ZhaoPin/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<zhaopinState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/ZhaoPin/Get?Id='+payload.id);
            return reponse.data.result as zhaopin;
        }
    };
    mutations={
        setCurrentPage(state:zhaopinState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:zhaopinState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:zhaopinState,zhaopin:zhaopin){
            state.editzhaopin=zhaopin;
        }
    }
}
const zhaopinModule=new ZhaoPinModule();
export default zhaopinModule;