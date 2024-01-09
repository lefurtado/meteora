import { useContext, useEffect } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) {
        itemDoCarrinho.quantidade += quantidade;
      }

      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      return itemDoCarrinho.id === novoProduto.id;
    });

    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);

    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => {
      return itemDoCarrinho.id === id;
    });

    const ultimoProduto = produto.quantidade === 1;

    if (ultimoProduto) {
      return setCarrinho((carrinhoAnterior) => {
        return carrinhoAnterior.filter((itemDoCarrinho) => {
          return itemDoCarrinho.id !== id;
        });
      });
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1);

    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProdutoCarrinho(id) {
    const produto = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    );
    setCarrinho(produto);
  }

  useEffect(() => {
    let quantidadeTotal = 0;
    let precoTotal = 0;

    carrinho.forEach((produto) => {
      quantidadeTotal += produto.quantidade;
      precoTotal += produto.preco * produto.quantidade;
    });

    setQuantidade(quantidadeTotal);
    setValorTotal(precoTotal);
  }, [carrinho]);

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade,
  };
};
