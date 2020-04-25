import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Goods from '../entities/goods'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface GoodsState extends ListState<Goods>{
    editGoods:Goods;
}
class GoodsModule extends ListModule<GoodsState,any,Goods>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Goods>(),
        loading:false,
        editGoods:new Goods()
    }
    actions={
        async getAll(context:ActionContext<GoodsState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/Goods/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Goods>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<GoodsState,any>,payload:any){
            await Ajax.post('/api/services/app/Goods/Create',payload.data);
        },
        async update(context:ActionContext<GoodsState,any>,payload:any){
            await Ajax.put('/api/services/app/Goods/Update',payload.data);
        },
        async delete(context:ActionContext<GoodsState,any>,payload:any){
            await Ajax.delete('/api/services/app/Goods/Delete?Id='+payload.data.id);
        },
        async get(context:ActionContext<GoodsState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/Goods/Get?Id='+payload.id);
            return reponse.data.result as Goods;
        }
    };
    mutations={
        setCurrentPage(state:GoodsState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:GoodsState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:GoodsState,goods:Goods){
            state.editGoods=goods;
        }
    }
}
const goodsModule=new GoodsModule();
export default goodsModule;