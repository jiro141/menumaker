import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useCategorias } from "../widgets/Hooks/useCategorias";
import { usePlatillos } from "../widgets/Hooks/usePlatillos";
import { Title } from "../widgets/Title";

const Header = ({ setIdsPlatillos, idsPlatillos }) => {
  const { setCategorias, categorias, consultaCategorias } = useCategorias();
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  useEffect(() => {
    consultaCategorias();
  }, []);
  if (categorias.length > 0 && categoriaActiva === null) {
    setCategoriaActiva(categorias[0]);
    var arreglo = JSON.parse(categorias[0].platillos);
    // console.log(arreglo);
    setIdsPlatillos(arreglo);
  }

  const handleClickCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    var arreglo = JSON.parse(categoria.platillos);
    // console.log(arreglo);
    setIdsPlatillos(arreglo);
  };

  return (
    <header>
      {/* Title and search */}
      <Title name="Pedidos" />
      {/* Tabs */}
      <nav className="text-gray-300 flex items-center justify-between md:justify-start md:gap-8 border-b mb-6">
        {categorias.map((categoria) => (
          <a
            key={categoria.id}
            href="#"
            onClick={() => handleClickCategoria(categoria)}
            className={
              categoria === categoriaActiva
                ? "relative py-2 pr-4 before:w-1/2 before:h-[2px] before:absolute before:bg-[#ec7c6a] before:left-0 before:rounded-full before:-bottom-[1px] text-[#ec7c6a]"
                : "py-2 pr-4"
            }
          >
            {categoria.nombre}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
