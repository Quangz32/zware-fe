import Sidebar from "../Componnents/Sidebar/Sidebar"
import DisposedGoods from "../Componnents/DisposedGoods/DisposedGoods"
const disposedGoods = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><DisposedGoods></DisposedGoods></div>
        </div>
    </>
    )
}

export default disposedGoods