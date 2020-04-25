import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import jl from '../entities/jl'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface jlState extends ListState<jl>{
    editjl:jl;
}
class JLModule extends ListModule<jlState,any,jl>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<jl>(),
        loading:false,
        editjl:new jl()
    }
    actions={
        async getAll(context:ActionContext<jlState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/jl/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<jl>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<jlState,any>,payload:any){
            await Ajax.post('/api/services/app/JL/Create',payload.data);
        },
        async update(context:ActionContext<jlState,any>,payload:any){
            await Ajax.put('/api/services/app/JL/Update',payload.data);
        },
        async deleteAll(context:ActionContext<jlState,any>,payload:any){
            debugger;
            await Ajax.delete('/api/services/app/JL/Deletejl?ids='+payload.data);
        },
        async delete(context:ActionContext<jlState,any>,payload:any){
            await Ajax.delete('/api/services/app/JL/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<jlState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/JL/Get?Id='+payload.id);
            return reponse.data.result as jl;
        }
    };
    mutations={
        setCurrentPage(state:jlState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:jlState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:jlState,jl:jl){
            state.editjl=jl;
        }
    }
}
const jlModule=new JLModule();
export default jlModule;