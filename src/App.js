import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tel, setTel] = useState('');
  const [maskedTel, setMaskedTel] = useState('');

  useEffect(() => {
    setTel(maskedTel)
  }, [maskedTel]);

  function mask(number) {
    number.replace(/\D/g, "")
    try {
      //limita o numero de dígitos dentro do input
      if (number.length > 16) {
        const maxInputLength = number.slice(0, 16);;
        setTel(maxInputLength);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(function () {
        //faz a formatação do número digitado
        var v = mphone(tel);
        if (v !== tel) {
          setMaskedTel(v);
        }
      }, 1);
    }
  }

  const mphone = useCallback((v) => {
    // se não for numero o campo apaga o digito
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      // formatação para 9 dígitos
      r = r.replace(/^(\d\d)(\d{1})(\d{4})(\d{4}).*/, "($1) $2 $3-$4");
    }
    else if (r.length > 5) {
      // formatação para 8 dígitos
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }
    else if (r.length > 2) {
      // formatação inicial DDD +4 dígitos
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    return r;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <label>Telefone</label>
        <small style={{ fontSize: '10px' }}>*informe seu numero com DDD</small>

        <input
          type="tel"
          id="phone"
          name="phone"
          value={tel}
          onChange={e => setTel(e.target.value)}
          onKeyUp={(e) => mask(e.target.value)}
          onBlur={(e) => mask(e.target.value)}
        />
      </header>
    </div >
  );
}

export default App;
