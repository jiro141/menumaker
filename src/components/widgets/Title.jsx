import { useState }  from "react";

export const Title = ({ name }) => {
  return (
    <div class="mr-40 ml-60 my-10 flex items-center before:flex-1 before:border-t before:border-orange-800 after:flex-1 after:border-t after:border-orange-800">
    <p class="mx-4 text-3xl mb-0 text-center font-bold dark:text-white">
      {" "}
      {name}
    </p>
  </div>
  );
};
