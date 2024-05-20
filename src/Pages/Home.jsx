import { Link } from "react-router-dom";

const Home = () =>{
    return (
        <>
        <div className="text-white">
            This is Home
            <br></br>
            <Link to="/profile">Back to /profile</Link>
        </div>
        </>
    )
}

export default Home;