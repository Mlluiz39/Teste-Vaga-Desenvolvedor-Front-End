document.addEventListener('DOMContentLoaded', () => {
  // Obtém os elementos
  const searchButton = document.getElementById('searchButton')
  const resultSection = document.getElementById('resultSection')
  const searchSection = document.getElementById('searchSection')
  const companyInfoContainer = document.getElementById('companyInfo')
  const partnersInfoContainer = document.getElementById('partnersInfo')
  const backButton = document.getElementById('backButton')

  searchButton.addEventListener('click', () => {
    searchSection.style.display = 'none'
    resultSection.style.display = 'block'
    const cnpj = document.getElementById('cnpj').value.replace(/[^\d]/g, '')

    if (cnpj.length !== 14) {
      alert('Por favor, insira um CNPJ válido com 14 dígitos.')
      return
    }

    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)

        resultSection.style.display = 'block'
        renderCompanyInfo(data)
        renderPartners(data.socios || [])
      })
      .catch(error => {
        console.log(error)
      })
  })

  backButton.addEventListener('click', () => {
    searchSection.style.display = 'block'
    resultSection.style.display = 'none'
    cnpj.value = ''
    companyInfoContainer.innerHTML = ''
    partnersInfoContainer.innerHTML = ''
  })

  function renderCompanyInfo(data) {
    const address = `
            ${data.descricao_tipo_de_logradouro || 'Não disponível'}: ${
      data.logradouro || 'Não disponível'
    }
            N: ${data.numero || 'Não disponível'}
            <br/>
            Bairro: ${data.bairro || 'Não disponível'}
            <br/>
            Cidade: ${data.municipio || 'Não disponível'}
            <br/>
            Estado: ${data.uf || 'Não disponível'}
        `

    const companyInfoHtml = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Informações da Empresa</h5>
                  <div class="form-group">
                      <label class="fw-bolder">Nome:</label>
                      <input type="text" value="${
                        data.nome || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">Razão Social:</label>
                      <input type="text" value="${
                        data.razao_social || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">Data de Abertura:</label>
                      <input type="text" value="${
                        data.data_inicio_atividade || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">Situação:</label>
                      <input type="text" value="${
                        data.situacao_cadastral || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
                  <div class="form-group">
                        <label class="fw-bolder">Atividade Principal:</label>
                        <input type="text" value="${
                          
                            data.cnae_fiscal_descricao
                          || 'Não disponível'
                        }" class="form-control text-center">
                    </div>
                  <div class="form-group">
                      <label class="fw-bolder">Endereço:</label>
                      <div class="form-control text-center">${address}</div>
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">Telefone:</label>
                      <input type="text" value="${
                        data.telefone || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">E-mail:</label>
                      <input type="text" value="${
                        data.email || 'Não disponível'
                      }" class="form-control text-center">
                  </div>
              </div>
          </div>
      `
    companyInfoContainer.innerHTML = companyInfoHtml
  }

  function renderPartners(partners) {
    if (partners.length === 0) {
      partnersInfoContainer.innerHTML =
        '<div class="alert alert-info" role="alert">Não há sócios disponíveis.</div>'
      return
    }

    const partnersHtml = partners
      .map(
        partner => `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title fw">${partner.nome}</h5>
                  <div class="form-group">
                      <label class="fw-bolder">Qualificação:</label>
                      <input type="text" value="${
                        partner.qualificacao || 'Não disponível'
                      }" class="form-control" readonly>
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">Data de Início:</label>
                      <input type="text" value="${
                        formatDate(partner.data_entrada) || 'Não disponível'
                      }" class="form-control" readonly>
                  </div>
                  <div class="form-group">
                      <label class="fw-bolder">CPF:</label>
                      <input type="text" value="${
                        partner.cpf || 'Não disponível'
                      }" class="form-control" readonly>
                  </div>
              </div>
          </div>
      `
      )
      .join('')

    partnersInfoContainer.innerHTML = partnersHtml
  }
})
