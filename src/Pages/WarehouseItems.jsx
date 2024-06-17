
import Sidebar from "../Componnents/Sidebar/Sidebar"
import WarehouseItems from "../Componnents/WarehouseItems/WarehouseItems"
const warehouseitems = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto "><Sidebar></Sidebar></div>
            <div className="col"><WarehouseItems></WarehouseItems></div>
        </div>
    </>
    )
}

export default warehouseitems

