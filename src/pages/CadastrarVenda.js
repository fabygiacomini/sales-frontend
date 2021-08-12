import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../styles/Venda.css';
import MensagemErro from '../Util/MensagemErro';
import backend from '../Backend';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import Select from 'react-select';

export default function CadastrarVenda() {
  const ENDPOINT_SALE = '/sales';
  const SELLER_ENDPOINT = '/seller';

  const [sellerId, setSellerId] = useState(0);
  const [saleValue, setSaleValue] = useState(0);
  const [sellerList, setSellerList] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const insertNewSale = (e) => {
    e.preventDefault();

    if (!validateSale()) {
      return;
    }

    axios({
      method: 'post',
      url: backend + ENDPOINT_SALE,
      data: {
        'seller_id': parseInt(sellerId),
        'sale_value': saleValue
      }
    })
    .then(result => {
      alert(result.data.message);
    })
    .catch(error => {
      alert(MensagemErro.trataMensagemErro(error));
    })
    .finally(() => {
      setSellerId(0);
      setSaleValue(0);
    });
  }

  const validateSale = () => {
    if (sellerId === 0) {
      alert('Identificação do vendedor inválida!');
      return false;
    }

    if (saleValue === 0) {
      alert('O valor da venda está zerado!');
      return false;
    }

    return true;
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

  useEffect(() => {
    getSellerList();
  }, []);

  const createSellerSelect = () => {
    if (sellerList.length > 0) {
      let options = [];
      sellerList.forEach(seller => {
        options.push({value : seller.id, label: seller.name})
      });

      return (
        <Select options={options} onChange={(e) => setSellerId(e.value)} />
      );
    } else {
      return (
        <Label>É necessário cadastrar vendedores antes de lançar vendas</Label>
      );
    }
  }

  return (
    <section>
      <h3>CADASTRAR NOVA VENDA</h3>

      <section>
        <Form className="form-new-sale">
          <FormGroup className="form-group">
            <Label for="seller-id">Identificação do Vendedor</Label>
            {/* <Input type="number" name="seller-id" id="sellerId" value={sellerId} onChange={(e) => setSellerId(e.target.value)} /> */}
            {createSellerSelect()}
          </FormGroup>
          <FormGroup>
            <Label for="sale-value">Valor da Venda</Label>
            <Input type="number" name="sale-value" id="saleValue" value={saleValue} onChange={(e) => setSaleValue(e.target.value)} />
          </FormGroup>

          <Button id="btn-new-sale" onClick={(e) => insertNewSale(e)}>Cadastrar</Button>
        </Form>

      </section>
    </section>
  );
}