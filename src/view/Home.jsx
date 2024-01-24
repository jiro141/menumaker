import { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArticleLine 
} from "react-icons/ri";
// Components
import Sidebar from "../components/shared/Sidebar";
import { Title } from "../components/widgets/Title";
function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      <Title name={"Bienvenido a MenuMaker"} />
      <div class="flex items-center mx-60  mb-12 md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="src\assets\hamburgesa.svg"
          class="w-3/12 lg:w-96 mx-60 py-20"
          alt="Sample image"
        />
      </div>
    </div>
  );
}

export default Home;
