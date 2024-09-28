import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup'
import ClienteTable from '../components/ClienteTable';

const ClienteYupFormik = () => {

  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(15).max(50).required('Nome é obrigatório'),
    email: Yup.string().email().required('E-mail é obrigatório'),
    dataNascimento: Yup.date().required('Data de nascimento é obrigatória'),
    cep: Yup.string().min(8).required('CEP é obrigatório')
  })

  let [clientes, setClientes] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formDataClientes = {
    nome: " ",
    email: " ",
    nascimento: " ",
    cep: " ",
  }

  useEffect(() => {
    fetch('http://localhost:3000/clientes')
      .then((res) => {
        res.json().then((data) => {
          setClientes([...data]);
        });
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    console.log('Novo cliente adicionado!');
  }, [clientes]);

  const handleSubmit = (values) => {
    let dadosNovoCliente = { ...values };

    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(dadosNovoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Cliente cadastrado feito com sucesso!');

        setClientes([...clientes, dadosNovoCliente]);

        setShow(false);
      })
      .catch((error) => {
        console.log('Não foi possível fazer o cadastro!');
      });
  };

  const formik = useFormik({
    initialValues: formDataClientes,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        Adicionar cliente
      </Button>

      <ClienteTable clientes={clientes}></ClienteTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o título"
                name="titulo"
              />
              <span>{formik.errors.nome}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite a descrição"
                name="descricao"
              />
              <span>{formik.errors.email}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o valor"
                name="valor"
                
              />
              <span>{formik.errors.nascimento}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o endereço da imagem."
                name="imagemUrl"
              />
              <span>{formik.errors.cep}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Cliente
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ClienteYupFormik;