import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from './services/api.js';

function Buscador() {
  
  const [input, setInput] = useState ('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert('Preencha o CEP para buscar!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch{
      alert('Ops, erro ao buscar! Verifique o CEP digitado, por favor.');
      setInput('');
    }

  }

  return (

    <div className="container">
      <div className="header">

        <h1 className="title">BUSCADOR DE CEP</h1>

        <div className="searchCEP">
          <input className="busca" type="number" placeholder="Digite o CEP aqui..."
          maxLength={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className="btnSearch" onClick={handleSearch}>
            <FaSearch size={25} color="white"/>
          </button>
        </div>

      </div>


    {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <div className="item-cep">
            <span>Rua/Avenida</span>
            <p>{cep.logradouro}</p>
          </div>
          
          <div className="item-cep">
            <span>Bairro</span>
            <p>{cep.bairro}</p>
          </div>

          {Object.keys(cep.complemento).length > 0 && (
              <div className="item-cep">
                <span>Complemento</span>
                <p>{cep.complemento}</p>
              </div>
            )}

          <div className="item-cep">
            <span>Cidade</span>
            <p>{cep.localidade}/{cep.uf}</p>
          </div>
        </main>
      )}

    </div>

)};

export default Buscador;