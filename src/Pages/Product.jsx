
import Sidebar from "../Componnents/Sidebar/Sidebar"
import ProductList from "../Componnents/Product/ProductList"

const product = ()=>{
    return (
    <>
        <div className="d-flex">
            <div className="col-auto"><Sidebar></Sidebar></div>
            <div className="col"><ProductList></ProductList></div>
        </div>
    </>
    )
}

export default product