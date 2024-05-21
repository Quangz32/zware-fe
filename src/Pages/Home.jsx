import Home from "../Componnents/Home/Home"
import Sidebar from "../Componnents/Sidebar/Sidebar"

const profile = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><Home></Home></div>
        </div>
    </>
    )
}

export default profile