import {useNavigate} from "react-router-dom"
import Button from "../components/Button";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center" >
       <div className="pt-8 max-w-screen-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2"  >
             <div className="flex justify-center" >
              <img src={'/Screenshot 2025-05-13 200321.png'} className="max-w-96" />
             </div>
             <div className="pt-15 ml-16" >
              <div className="flex justify-center" >
              <h1 className="text-center text-4xl font-bold text-white">
                 Play chess online on the #2 site
              </h1>
              </div>
              <div></div>
              <div className="mt-8 flex justify-center">
                <Button onClick={() => navigate('/game')}>
                    Play Online
                 </Button>
              </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Landing;
