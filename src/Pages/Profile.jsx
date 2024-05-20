import Profile from "../Componnents/Profile/Profile"
import Sidebar from "../Componnents/Sidebar/Sidebar"

const profile = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><Profile></Profile></div>
        </div>
    </>
    )
}

export default profile