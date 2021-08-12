import React from 'react';
import axios from 'axios';
import { Table, Input, Button, Label } from 'reactstrap';
import { useState, useEffect } from 'react';
import backend from '../Backend';
import style from '../styles/ConsultaVenda.css';

export default function ConsultaVenda() {
  const SELECT_SALES = '/sales';

  const [sale, setSale] = useState([]);
  const [sellerName, setSellerName] = useState(null);

  const getSaleList = () => {
    cleanInput();

    axios({
      method: 'get',
      url: backend + SELECT_SALES + (sellerName !== null || sellerName === '' ? ('/' + sellerName) : ''),
      headers: { 'content-type': 'application-json' },
    })
    .then(result => {
      setSale(result.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setSellerName(null);
    });
  }

  const resetList = () => {
    setSellerName(null);
    getSaleList();
  }

  const cleanInput = () => {
    document.getElementById('sellerName').value = '';
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return adicionaZero(date.getDate()) + '/' + adicionaZero(date.getMonth()) + '/' + date.getFullYear() + ' ' + adicionaZero(date.getHours()) + ':' + adicionaZero(date.getMinutes()) + ':' + adicionaZero(date.getSeconds());
  }

  const adicionaZero = (data) => {
    if (data <= 9) {
      return '0'+ data.toString();
    }
    return data;
  }

  useEffect(() => {
    getSaleList();
  }, []);

  const renderTable = () => {
    if (sale.length > 0) {
      return (
        <div>
          <Table striped bordered hover size="sm" className="seller-table">
            <thead>
              <tr>
                <td>Número da venda</td>
                <td>ID Vendedor</td>
                <td>Nome do vendedor</td>
                <td>E-mail</td>
                <td>Valor da Venda</td>
                <td>Valor da comissão</td>
                <td>Data</td>
              </tr>
            </thead>
            <tbody>
              {sale.map(item => {
                let element = (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.seller_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.sale_value != null ? `R$` + item.sale_value : ''}</td>
                    <td>{item.sale_commission != null ? `R$` + item.sale_commission : ''}</td>
                    <td>{item.sale_time != null ? formatDateTime(item.sale_time) : ''}</td>
                  </tr>
                );
                return element;
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <h4>Não foram realizadas vendas ainda!</h4>
      );
    }
  }

  return (
    <section>
      <h3>VENDAS REALIZADAS</h3>
        <section className="seller-search">
          <Label for="sellerName">buscar por nome do vendedor</Label>
          <section className="seller-filter">
            <Input name="sellerName" id="sellerName" type="text" placeholder="insira parte do nome desejado" onChange={(e) => setSellerName(e.target.value)} style={{width: "250px"}}></Input>
            <Button className="btn-filter" onClick={() => getSaleList()}>Buscar</Button>
            <Button className="btn-filter" onClick={() => resetList()}>Limpar</Button>

            {/* <Button className="btn-email">Enviar e-mail manual com relatório de vendas</Button> */}
          </section>
      </section>

      {renderTable()}
    </section>
    );

  // if (sale.length > 0) {
  //   return (
  //     <div>
  //       <h3>VENDAS REALIZADAS</h3>
  //       <Table striped bordered hover size="sm">
  //         <thead>
  //           <tr>
  //             <td>Número da venda</td>
  //             <td>ID Vendedor</td>
  //             <td>Valor da Venda</td>
  //             <td>Valor da comissão</td>
  //             <td>Data</td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {sale.map(item => {
  //             let element = (
  //               <tr key={item.id}>
  //                 <th>{item.id}</th>
  //                 <td>{item.seller_id}</td>
  //                 <td>{item.sale_value != null ? `R$` + item.sale_value : ''}</td>
  //                 <td>{item.sale_commission != null ? `R$` + item.sale_commission : ''}</td>
  //                 <td>{item.sale_time ?? ''}</td>
  //               </tr>
  //             );
  //             return element;
  //           })}
  //         </tbody>
  //       </Table>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <h4>Não foram realizadas vendas ainda!</h4>
  //   );
  // }
}