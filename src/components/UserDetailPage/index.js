
import { useState ,useEffect} from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams,useNavigate  } from "react-router-dom";
import { FaUserCircle , FaPhone, FaBuilding, FaGlobe } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { LuEggFried } from "react-icons/lu";


const UserDetailPage =props=>{

 const [page, changePage] = useState("Loading");
 const [data,changeData]= useState();
 const {id}= useParams();
 const navigate = useNavigate();

 useEffect(() => {
    const getData = async () => {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
        const response = await fetch(url);
        const rawData = await response.json();
        console.log(rawData)
        if(!response.ok){
            changeData(response.status)
            changePage("Failure")
        }
        else{
            changePage("Success")
            changeData(rawData)
        }
    };
    getData();
  }, []);

 
const renderFailure=()=>(
    <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100vh" }} >
        <h1>Unable to fetch data</h1>
        <p>{data} error</p>
        <img src="https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg?semt=ais_hybrid"/>
        
    </div>
)


const getBack=()=>(
    navigate('/')
)

const renderSuccess=()=>{
    const{name,email,phone,company,website} = data
    return(
        <div>
    
        <div style={{display:"flex",flexDirection:"column", justifyContent: "center", alignItems: "center",borderWidth:"5px",boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",padding:"15px",margin:"15px",width:"100VW"}}>
                <FaUserCircle size={50} color="blue" />
                <h1>{name}</h1>
                <div  style={{display:"flex",alignItems:"center"}}>
                        <MdEmail  style={{margin:"10px"}}/>
                        <a href={`mailto:${email}`} >{email}</a> 
                </div>
                <div  style={{display:"flex",alignItems:"center"}}>
                        <FaPhone style={{margin:"10px",transform: "rotate(90deg)"}}/>
                        <p>{phone}</p>
                </div>
                <div  style={{display:"flex",alignItems:"center"}}>
                        <FaBuilding style={{margin:"10px"}}/>
                        <p>{company.name}</p>
                </div>
                <div  style={{display:"flex",alignItems:"center"}}>
                        <FaGlobe style={{margin:"10px"}}/>
                        <p>{website}</p>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginLeft:"60px"}}>
            <button onClick={getBack} style={{color:"white",backgroundColor:"blue",borderRadius:"5px",height:"30px"}}>Go Back</button>
            </div>
        </div>
    )
}

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


export default UserDetailPage