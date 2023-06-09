import React, { useState, useEffect } from "react";
import "./style.css";
import firebase from "../../services/firebase";
import { FiMenu } from "react-icons/fi";
import MenuMobile from "../MenuMobile";

export default function Header() {
  const [datauser, setDatauser] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || {};
    setDatauser(userdata?.user);
  }, []);

  const MenuReceita = () => {
    return (
      <div
        onMouseEnter={() => {
          document.querySelector(".menureceitas")?.classList.add("animationmenu");
        }}
        onMouseLeave={() => {
          document.querySelector(".menureceitas")?.classList.remove("animationmenu");
        }}
        className="menureceitas"
      >
        <div className="boxbtnsmenureceitas">
          <strong>Geral</strong>
          <a href={`/receitas/${"doce"}`}>Doces</a>
          <a href={`/receitas/${"salgado"}`}>salgados</a>
          <a href={`/receitas/${"massas"}`}>Massas</a>
          <a href={`/receitas/${"fitness"}`}>Fitness</a>
        </div>
        <div className="boxbtnsmenureceitas">
          <strong>Carnes</strong>
          <a href={`/receitas/${"bovino"}`}>Bovino</a>
          <a href={`/receitas/${"aves"}`}>Aves</a>
          <a href={`/receitas/${"peixes"}`}>Peixes</a>
        </div>
        <div className="boxbtnsmenureceitas">
          <strong>Sobremesas</strong>
          <a href={`/receitas/${"bolos"}`}>Bolos</a>
          <a href={`/receitas/${"tortas"}`}>Tortas</a>
        </div>
        <div className="boxbtnsmenureceitas">
          <strong>Bebidas</strong>
          <a href={`/receitas/${"drinks"}`}>Drinks</a>
          <a href={`/receitas/${"milkshakes"}`}>Milkshakes</a>
          <a href={`/receitas/${"sucos"}`}>Sucos</a>
        </div>
      </div>
    );
  };

  return (
    <header className="containerHeader">
      <MenuMobile visible={visible}></MenuMobile>
      <div onClick={()=>window.location.href='/'} className="logo-area"><p>Receitas</p> <strong>Web</strong></div>

      {!visible ? (
        <button id="btnmenumobile" onClick={() => setVisible(true)}>
          <FiMenu size={25} color="#fff">
            {" "}
          </FiMenu>
        </button>
      ) : (
        <button id="btnmenumobile" onClick={() => setVisible(false)}>
          <FiMenu size={25} color="#fff">
            {" "}
          </FiMenu>
        </button>
      )}

      <nav className="navbarbtns">
        <button type="button" onClick={() => (window.location.href = "/")}>
          Início
        </button>
        <button
          type="button"
          onMouseEnter={() => {
            document.querySelector(".menureceitas")?.classList.add("animationmenu");
          }}
        >
          Receitas
        </button>
        {<MenuReceita></MenuReceita>}
        <button type="button" onClick={() => (window.location.href = "/post")}>
          Postar receitas
        </button>
        <button onClick={() => (window.location.href = "/minhas_receitas")} type="button">
          Minhas receitas
        </button>
      </nav>
      <div className="user-area">
        {!datauser ? (
          <>
            <button onClick={() => (window.location.href = "/cadastro")}>Entrar</button>
            <button onClick={() => (window.location.href = "/cadastro")}>Cadastre-se</button>
          </>
        ) : (
          <div>
            <p>{datauser.email}</p>
            <button
              onClick={async () => {
                await firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    localStorage.removeItem("@receitasweb");
                    window.location.reload();
                  });
              }}
            >
              sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
