import { useEffect, useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
// Components
import Sidebar from "../../components/shared/Sidebar";
import Car from "../../components/shared/Car";
import Header from "../../components/shared/Header";
import Card from "../../components/shared/Card";
import { usePlatillos } from "../../components/widgets/Hooks/usePlatillos";

function Pedidos() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [idsPlatillos, setIdsPlatillos] = useState([]);
  const [selectedPlatilloIds, setSelectedPlatilloIds] = useState([]);
  const { namesPlatillos, setNamesPlatillos, getName, getPlatillos } =
    usePlatillos();
  // console.log(idsPlatillos, "cosas");
  console.log(idsPlatillos, "platillos");
  useEffect(() => {
    getPlatillos(idsPlatillos);
  }, [idsPlatillos]);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };
  const handlePlatilloClick = (platilloId) => {
    // Asegúrate de que el ID no esté duplicado antes de agregarlo
    if (!selectedPlatilloIds.includes(platilloId)) {
      setSelectedPlatilloIds([...selectedPlatilloIds, platilloId]);
    }
  };
  console.log(selectedPlatilloIds, "id de los seleccionados");

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        selectedPlatilloIds={selectedPlatilloIds}
        setSelectedPlatilloIds={setSelectedPlatilloIds}
      />
      {/* Menu movil */}
      <nav className="bg-[#1F1D2B] lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiUser3Line />
        </button>
        <button className="p-2">
          <RiAddLine />
        </button>
        <button onClick={toggleOrders} className="p-2">
          <RiPieChartLine />
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Header */}
          <Header
            setIdsPlatillos={setIdsPlatillos}
            idsPlatillos={idsPlatillos}
          />
          {/* Title content */}
          {/* <div className="flex items-center justify-between mb-16">
            <h2 className="text-xl text-gray-300">Choose Dishes</h2>
            <button className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg">
              <RiArrowDownSLine /> Dine in
            </button>
          </div> */}
          {/* Content */}
          <form>
            <div className="w-full relative mb-8">
              <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                className="bg-[#1F1D2B] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
                placeholder="Search"
              />
            </div>
          </form>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {namesPlatillos.map((platillo) => (
              <Link
                key={platillo.id}
                onClick={() => handlePlatilloClick(platillo.id)}
                className="cursor-pointer"
              >
                {" "}
                <Card
                  key={platillo.id} // Asegúrate de proporcionar un key único
                  img={platillo.foto}
                  description={platillo.nombre}
                  price="2.29"
                  inventory={platillo.inventario}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Pedidos;
