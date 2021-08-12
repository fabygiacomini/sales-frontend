import { React, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, } from 'reactstrap';
import axios from 'axios';
import backend from '../Backend';
import MensagemErro from '../Util/MensagemErro';

export default function ModalCadastroVendedor({ title, open, sellerData, toggleModal, isNewSeller, onExit }) {
  const SELLER_ENDPOINT = '/seller';
  const DEFAULT_COMMISSION = 8.5;

  const [sellerId, setSellerId] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerCommissionFee, setSellerCommissionFee] = useState(DEFAULT_COMMISSION);

  const loadSellerData = () => {
    if (!isNewSeller) {
      setSellerId(sellerData && sellerData.id ? sellerData.id : null);
      setSellerName(sellerData && sellerData.name ? sellerData.name : '');
      setSellerEmail(sellerData && sellerData.email ? sellerData.email : '');
      setSellerCommissionFee(sellerData && sellerData.commissionFee ? sellerData.commissionFee : '');
    }
  }

  const resetFields = () => {
    setSellerId(null);
    setSellerName('');
    setSellerEmail('');
    setSellerCommissionFee(DEFAULT_COMMISSION);
    onExit(); // callback function to load the data outside this component
  }

  const editCreateSeller = () => {

    axios({
      method: 'post',
      url: backend + SELLER_ENDPOINT,
      data: {
        id: sellerId,
        name: sellerName,
        email: sellerEmail,
        commission_fee: 8.5 // valor fixo, para alterar: colocar a variável de useState (sellerCommissionFee) e tirar o readOnly/disable do Input
      }
    })
    .then(result => {
      alert(result.data.message);
      toggleModal();
    })
    .catch(error => {
      alert(MensagemErro.trataMensagemErro(error));
    })
  }

  useEffect(() => {
  }, [open])

  return (
    <section>
      <Modal isOpen={open} fade={false} onOpened={() => loadSellerData()} onClosed={() => resetFields()}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <div>
            <Label for="seller-name">Nome do Vendedor</Label>
            <Input type="text" name="seller-name" value={sellerName} onChange={(e) => setSellerName(e.target.value)}></Input>

            <Label for="seller-email">Email</Label>
            <Input type="email" name="seller-email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)}></Input>

            <Label for="commission-fee">Porcentagem de comissão</Label>
            <Input type="number" name="commission-fee" value={sellerCommissionFee} readOnly={true} onChange={(e) => setSellerCommissionFee(e.target.value)} disable={true} ></Input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(() => editCreateSeller())}>Salvar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}