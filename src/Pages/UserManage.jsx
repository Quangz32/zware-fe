import ManagerList from "../Componnents/Management/ManagerList"
import Sidebar from "../Componnents/Sidebar/Sidebar"

const profile = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto "><Sidebar></Sidebar></div>
            <div className="col"><ManagerList></ManagerList></div>
        </div>
    </>
    )
}

export default profile

