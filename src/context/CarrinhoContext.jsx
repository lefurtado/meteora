import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "@/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const { quantidadeTotal, precoTotal } = useMemo(() => {
    let quantidadeTotal = 0;
    let precoTotal = 0;

    carrinho.forEach((produto) => {
      quantidadeTotal += produto.quantidade;
      precoTotal += produto.preco * produto.quantidade;
    });

    return { quantidadeTotal, precoTotal };
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTotal);
    setValorTotal(precoTotal);
  }, [quantidadeTotal, precoTotal]);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
