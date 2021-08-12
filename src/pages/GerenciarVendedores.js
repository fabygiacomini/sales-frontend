import React from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import styles from '../styles/Vendedor.css';
import backend from '../Backend';
import ModalCadastroVendedor from './ModalCadastroVendedor';

 export default function GerenciarVendedores() {
  const SELLER_ENDPOINT = '/seller';

  const [sellerList, setSellerList] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [enableButtons, setEnableButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Cadastrar vendedor')
  const [sellerData, setsellerData] = useState({});
  const [isNewSeller, setIsNewSeller] = useState(false);
  // const [modalSellerId, setModalSellerId] = useState(null);

  const toggleModalVisibility = () => {
    setShowModal(!showModal);
  }

  const onSelectSeller = (seller) => {
    setSelectedSeller(seller.id);
    setsellerData({
      id: seller.id,
      name: seller.name,
      email: seller.email,
      commissionFee: seller.commission_fee
    });
    setEnableButtons(true);
  }

  const getSellerList = () => {
    axios({
      method: 'get',
      url: backend + SELLER_ENDPOINT,
      headers: { 'content-type': 'application-json' },
    })
    .then(response => {
      setSellerList(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const deleteSeller = () => {
    if (selectedSeller == null || selectedSeller === undefined) {
      alert('É necessário selecionar um vendedor primeiro!');
      return;
    }

    axios({
      method: 'delete',
      url: backend + SELLER_ENDPOINT + '/' + selectedSeller,
      headers: { 
        'content-type': 'application-json',
        'Access-Control-Allow-Origin': '*'
      },
    })
    .then(response => {
      console.log(response);
      alert(response.data.message);
      getSellerList();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const openModalCreateSeller = () => {
    setShowModal(true);
    setModalTitle('Cadastrar vendedor');
    setIsNewSeller(true);
  }

  const openModalEditSeller = () => {
    setShowModal(true);
    setModalTitle('Editar vendedor');
    setIsNewSeller(false);
  }

  useEffect(() => {
    getSellerList();
  }, []);

  if (sellerList.length > 0) {
    return (
      <div>
        <ModalCadastroVendedor title={modalTitle} open={showModal} toggleModal={toggleModalVisibility} sellerData={sellerData} isNewSeller={isNewSeller} onExit={getSellerList} />
        <div>
          <h3>GERENCIAR VENDEDORES</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td></td>
                <td>ID Vendedor</td>
                <td>Nome</td>
                <td>E-mail</td>
                <td>Valor da Comissão</td>
              </tr>
            </thead>
            <tbody>
              {sellerList.map((item) => {
                const element = (
                  <tr key={item.id}>
                    <td>
                      <input type="radio" name="sellerRow" onChange={() => onSelectSeller(item)} />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.commission_fee}%</td>
                  </tr>
                );
                return element;
              })}
            </tbody>
          </Table>

          <div className="buttonSection">
          <Button id="btnEdit" className="sellerButton" disabled={!enableButtons} onClick={(() => openModalEditSeller())}>Editar</Button>
          <Button id="btnDelete" className="sellerButton" disabled={!enableButtons} onClick={() => deleteSeller()}>Remover</Button>
          <Button id="btnNewSeller" className="sellerButton" disabled={false} onClick={() => openModalCreateSeller()}>Adicionar novo vendedor</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ModalCadastroVendedor title={modalTitle} open={showModal} toggleModal={toggleModalVisibility} isNewSeller={isNewSeller} onExit={getSellerList} />
        <div>
          <h4>Não foram encontrados vendedores cadastrados!</h4>
          <Button id="btnNewSeller" className="sellerButton" disabled={false} onClick={() => openModalCreateSeller()}>Adicionar novo vendedor</Button>
        </div>
      </div>
    );
  }
}