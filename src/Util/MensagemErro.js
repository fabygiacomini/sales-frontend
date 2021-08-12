class MensagemErro {

  static trataMensagemErro(error) {
    let message = 'Ocorreu um erro inesperado';
      if (error.response !== undefined && error.response.data.message !== undefined) {
        message = error.response.data.message; // exception thrown manually

        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          let messageValidation = '';
          let errorArray = Object.entries(errors)
          errorArray.map((field) => {
            messageValidation += (field[1][0] + '\n');
          });
          message = messageValidation;
        }
      }
      return message;
  }
}

export default MensagemErro;