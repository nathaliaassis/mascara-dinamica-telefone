import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [tel, setTel] = useState('');

  const mphone = useCallback((v) => {
    // se não for numero o campo apaga o digito
    var r = v.replace(/\D/g, "");
    r = r.replace(/[A-Za-z\s]/, "");
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

  // const handleChangePhone = useCallback((value) => {
  //   let numberMasked;
  //   try {
  //     setTel(value);
  //     numberMasked = mphone(value);
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     if (numberMasked.length > 16) {
  //       const maxInputLength = numberMasked.slice(0, 16);
  //       setTel(maxInputLength);
  //     }
  //     setTel(numberMasked)
  //   }
  // }, []);

  const handleChangePhone = useCallback((value) => {
    try {
      setTel(value);
    } catch (error) {
      console.log(error)
    } finally {
      if (value.length > 11) {
        setTel(mphone(value.slice(0, 11)));
      }
      setTel(mphone(value))
    }
  }, []);
  console.log(tel);
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
          onChange={e => handleChangePhone(e.target.value.replace(/\D/g, ""))}
        />
      </header>
    </div >
  );
}

export default App;
