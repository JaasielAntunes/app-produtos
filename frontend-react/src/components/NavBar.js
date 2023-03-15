import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-ligth navbar-expand-lg bg-dark">
      <div className="container bg-dark">
        <div className="container-fluid bg-dark">
          <div className="collapse navbar-collapse bg-dark">
            <a className="navbar-brand bg-dark fw-bold mx-5 text-warning" href="/">Home</a>
            {/* <a className="navbar-brand bg-dark fw-bold text-warning" href="/produtos">Produtos Cadastrados</a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;