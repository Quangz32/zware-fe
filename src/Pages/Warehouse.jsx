
import Sidebar from "../Componnents/Sidebar/Sidebar"
import WarehouseManagement from "../Componnents/WarehouseManagement/WarehouseManagement"

const warehouse = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto "><Sidebar></Sidebar></div>
            <div className="col"><WarehouseManagement></WarehouseManagement></div>
        </div>
    </>
    )
}

export default warehouse

