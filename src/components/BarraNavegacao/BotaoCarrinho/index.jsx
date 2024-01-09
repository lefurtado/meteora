import React from "react";

import imagemCarrinho from "/assets/cart.svg";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";

const BotaoCarrinho = ({ className }) => {
  const classesComuns = "btn ms-3";
  const { quantidade } = useCarrinhoContext();

  return (
    <button
      className={`${classesComuns} ${className}`}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#modalCarrinhoSuspenso"
      aria-controls="modalCarrinhoSuspenso"
    >
      <img src={imagemCarrinho} alt="ícone de um carrinho de supermercado" />
      {quantidade !== 0 && (
        <span className="badge verde-limao">{quantidade}</span>
      )}
    </button>
  );
};

export default BotaoCarrinho;
