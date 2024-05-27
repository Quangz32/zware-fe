
import Sidebar from "../Componnents/Sidebar/Sidebar"
import Outbound from "../Componnents/Transaction/Outbound/Outbound"

const outbound = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><Outbound></Outbound></div>
        </div>
    </>
    )
}

export default outbound