import { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArticleLine,
} from "react-icons/ri";
// Components
import Sidebar from "../components/shared/Sidebar";
import { ProgressBar } from "../components/shared/ProgressBar";
import { Title } from "../components/widgets/Title";
import { Menu } from "./menu/Menu";
import { Categorias } from "./menu/Categorias";
import { CheckMenu } from "./menu/CheckMenu";
function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      <Title name={"Crea tu menu"} />
      <div className="lg:mx-40 md:mx-5 sm:mx-5">
        <div className="mr-40 ml-60  max-w-6xl mx-auto mt-8 p-4 bg-[#1F1D2B]   rounded-lg">
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
          <form className="opacity-100">
            {step === 1 && (
              <div className="mb-4">
                <h2 className="text-xl text-center text-white font-bold mb-10 mt-5">
                  Datos de tu menu
                </h2>
                <Menu nextStep={nextStep} />
              </div>
            )}

            {step === 2 && (
              <div className="mb-4">
                <h2 className="text-xl text-center text-white font-bold mb-10 mt-5">
                  Datos de tus categorias
                </h2>
                <Categorias nextStep={nextStep} />
              </div>
            )}

            {step === 3 && (
              <div className="mb-4">
                <h2 className="text-xl text-center text-white font-bold mb-10 mt-5">
                  Chequea tu menu
                </h2>
                {/* Agrega aquí los campos del tercer paso */}
                <CheckMenu />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
