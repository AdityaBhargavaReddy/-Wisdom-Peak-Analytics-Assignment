import { useState ,useEffect} from "react";
import { TailSpin } from "react-loader-spinner";
import { FaUserCircle ,FaSearch ,FaFilter} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import {Link} from "react-router-dom"



const Home = () => {
  const [page, changePage] = useState("Loading");
  const [data, changeData] = useState();
  const [newData,changeNewData]= useState();

  useEffect(() => {
    const getData = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        const rawData = await response.json();
        if(!response.ok){
            changeData(response.status)
            changePage("Failure")
        }
        else{
            changePage("Success")
            changeData(rawData)
            changeNewData(rawData)
        }
    };
    getData();
  }, []);


const inputChanged=event=>{

    const newData1= data.filter(each=>(
        each.name.toLowerCase().includes(event.target.value)
    ))
    changeNewData(newData1)
}


const filterChange = (event) => {
  const sortOrder = event.target.value;
  const sortedData = [...newData].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "Z-A") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  changeNewData(sortedData);
};







  const renderLoading = () => {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="loading-indicator"
    />
  </div>;
  };


const renderSuccess=()=>{
    return(
        <div>
            <div  style={{display:"flex",justifyContent:"space-around",alignItems:"center",marginTop:"20px"}}>
                <div  style={{display:"flex",alignItems:"center"}}>
                            <FaSearch style={{margin:"10px"}}/>
                            <input onChange={inputChanged} type="text"/>
                </div>

                
                <div  style={{display:"flex",alignItems:"center"}}>
                            <FaFilter style={{margin:"10px"}}/>
                    <select onChange={filterChange} >
                        <option> </option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                    </select>
                </div>
            </div>
        <div style={{margin:"opx",width:"100vw",boxSizing:"border-box"}}>
            {newData.map(each=>(
                <Link style={{color:"black"}} to={`${each.id}`}>
                    <div style={{display:"flex",flexDirection:"column", justifyContent: "center", alignItems: "center",borderWidth:"5px",boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",padding:"15px",margin:"15px",width:"100VW"}}>
                        <FaUserCircle size={50} color="blue" />
                        <h1> {each.name}</h1>
                        <div  style={{display:"flex",alignItems:"center"}}>
                        <MdEmail  style={{margin:"10px"}}/>
                        <p>{each.email}</p>
                        </div>
                        <div  style={{display:"flex",alignItems:"center"}}>
                        <MdLocationOn style={{margin:"10px"}}/>
                        <p>{each.address.city}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </div>
    )
}


const renderFailure=()=>(
    <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100vh" }} >
        <h1>Unable to fetch data</h1>
        <p>{data} error</p>
        <img src="https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg?semt=ais_hybrid"/>
        
    </div>
)

  const renderPage = () => {
    switch (page) {
      case "Loading":
        return renderLoading();
      case "Success":
        return renderSuccess();
      case "Failure":
        return renderFailure();
      default:
        return <div>Page Not Found</div>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Home;
