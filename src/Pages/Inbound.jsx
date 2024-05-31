
import Sidebar from "../Componnents/Sidebar/Sidebar"
import Inbound from "../Componnents/Transaction/Inbound/Inbound"


const inbound = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><Inbound></Inbound></div>
        </div>
    </>
    )
}

export default inbound