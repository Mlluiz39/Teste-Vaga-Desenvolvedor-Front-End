document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton')
  const resultSection = document.getElementById('resultSection')
  const searchSection = document.getElementById('searchSection')
  const companyInfoContainer = document.getElementById('companyInfo')
  const partnersInfoContainer = document.getElementById('partnersInfo')
  const backButton = document.getElementById('backButton')

  function loadSavedData() {
    const savedData = localStorage.getItem('companyData')
    if (savedData) {
      const data = JSON.parse(savedData)
      renderCompanyInfo(data.company || {})
      renderPartners(data.partners || [])
    }
  }

  loadSavedData()

  function performSearch() {
    searchSection.style.display = 'none'
    resultSection.style.display = 'block'
    const cnpj = document.getElementById('cnpj').value.replace(/[^\d]/g, '')

    if (cnpj.length !== 14) {
      Swal.fire({
        icon: 'error',
        title: 'CNPJ Inválido',
        text: 'Por favor, insira um CNPJ válido com 14 dígitos.',
        showConfirmButton: false,
        timer: 3000,
      })
    
      resultSection.style.display = 'none'
      searchSection.style.display = 'block'
      return
    }

    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .then(response => response.json())
      .then(data => {
        resultSection.style.display = 'block'
        renderCompanyInfo(data)
        renderPartners(data.qsa || [])
      })
      .catch(error => {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Houve um erro ao buscar as informações. Tente novamente.',
          showConfirmButton: false,
          timer: 3000,
        })
        resultSection.style.display = 'none'
        searchSection.style.display = 'block'
      })
  }

  searchButton.addEventListener('click', performSearch)

  document.getElementById('cnpj').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() 
      performSearch()
    }
  })

  backButton.addEventListener('click', () => {
    searchSection.style.display = 'block'
    resultSection.style.display = 'none'
    document.getElementById('cnpj').value = ''
    companyInfoContainer.innerHTML = ''
    partnersInfoContainer.innerHTML = ''
  })

  function renderCompanyInfo(data) {
    const companyInfoHtml = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Informações da Empresa</h5>
          <div class="form-group">
            <label class="fw-bolder">Nome:</label>
            <input type="text" id="nome" value="${
              data.nome || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">Razão Social:</label>
            <input type="text" id="razaoSocial" value="${
              data.razao_social || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">Data de Abertura:</label>
            <input type="text" id="dataAbertura" value="${
              formatDate(data.data_inicio_atividade) || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">Situação Cadastral:</label>
            <input type="text" id="situacaoCadastral" value="${
              data.descricao_situacao_cadastral || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">Atividade Principal:</label>
            <input type="text" id="atividadePrincipal" value="${
              data.cnae_fiscal_descricao || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">Endereço:</label>
            <div class="address-fields">
              <div class="form-group">
                <input type="text" id="logradouro" value="${
                  data.descricao_tipo_de_logradouro
                  || 'Não informado'
                }:" class="form-control text-center">
                <input type="text" id="logradouro" value="${
                  data.logradouro || 'Não informado'
                }" class="form-control text-center">
              </div>
              <div class="form-group">
                <label>Número:</label>
                <input type="text" id="numero" value="${
                  data.numero || 'Não informado'
                }" class="form-control text-center">
              </div>
              <div class="form-group">
                <label>Bairro:</label>
                <input type="text" id="bairro" value="${
                  data.bairro || 'Não informado'
                }" class="form-control text-center">
              </div>
              <div class="form-group">
                <label>Cidade:</label>
                <input type="text" id="municipio" value="${
                  data.municipio || 'Não informado'
                }" class="form-control text-center">
              </div>
              <div class="form-group">
                <label>CEP:</label>
                <input type="text" id="cep" value="${
                  data.cep || 'Não informado'
                }" class="form-control text-center">
              </div>
              <div class="form-group">
                <label>Estado:</label>
                <input type="text" id="uf" value="${
                  data.uf || 'Não informado'
                }" class="form-control text-center">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="fw-bolder">Telefone:</label>
            <input type="text" id="telefone" value="${
              data.ddd_telefone_1 || 'Não informado'
            }" class="form-control text-center">
          </div>
          <div class="form-group">
            <label class="fw-bolder">E-mail:</label>
            <input type="text" id="email" value="${
              data.email || 'Não informado'
            }" class="form-control text-center">
          </div>
          <button id="saveCompanyButton" class="btn btn-success save-button">Salvar Alterações</button>
        </div>
      </div>
    `
    companyInfoContainer.innerHTML = companyInfoHtml

    document
      .getElementById('saveCompanyButton')
      .addEventListener('click', () => {
        const companyData = getCompanyInfo()
        const savedData = localStorage.getItem('companyData')
        const existingData = savedData
          ? JSON.parse(savedData)
          : { partners: [] }
        localStorage.setItem(
          'companyData',
          JSON.stringify({
            company: companyData,
            partners: existingData.partners,
          })
        )
        Swal.fire({
          icon: 'success',
          title: 'Salvo com Sucesso!',
          text: 'Informações da empresa salvas com sucesso!',
          showConfirmButton: false,
          timer: 3000,
        })
      })
  }

  function renderPartners(data) {
    if (!data.length) {
      partnersInfoContainer.innerHTML =
        '<div class="alert alert-info" role="alert">Não há sócios disponíveis.</div>'
      return
    }

    const partnersHtml = data
      .map((partner, index) => {
        return `
        <div class="card shadow bg-body rounded">
          <div class="card-body">
            <h5 class="card-title">Informações do Sócio</h5>
            <div class="form-group">
              <label class="fw-bolder">Nome:</label>
              <input type="text" id="nomeSocio-${index}" value="${
          partner.nome_socio || 'Não informado'
        }" class="form-control text-center">
            </div>
            <div class="form-group">
              <label class="fw-bolder">CNPJ / CPF:</label>
              <input type="text" id="cnpjCpfSocio-${index}" value="${
          partner.cnpj_cpf_do_socio || 'Não informado'
        }" class="form-control text-center">
            </div>
            <div class="form-group">
              <label class="fw-bolder">Qualificação do Sócio:</label>
              <input type="text" id="qualificacaoSocio-${index}" value="${
          partner.qualificacao_socio || 'Não informado'
        }" class="form-control text-center">
            </div>
            <div class="form-group">
              <label class="fw-bolder">Data de Entrada na Sociedade:</label>
              <input type="text" id="dataEntradaSociedade-${index}" value="${
          formatDate(partner.data_entrada_sociedade) || 'Não informado'
        }" class="form-control text-center">
            </div>
          </div>
        </div>
      `
      })
      .join('')

    partnersInfoContainer.innerHTML = partnersHtml + `
      <button id="savePartnersButton" class="btn btn-success save-button">Salvar Alterações dos Sócios</button>
    `

    document
      .getElementById('savePartnersButton')
      .addEventListener('click', () => {
        const partnersData = getPartnersInfo()
        const savedData = localStorage.getItem('companyData')
        const existingData = savedData
          ? JSON.parse(savedData)
          : { company: {}, partners: [] }
        localStorage.setItem(
          'companyData',
          JSON.stringify({
            company: existingData.company,
            partners: partnersData,
          })
        )
        Swal.fire({
          icon: 'success',
          title: 'Salvo com Sucesso!',
          text: 'Informações do(s) sócio(s) salvas com sucesso!',
          showConfirmButton: false,
          timer: 3000,
        })
      })
  }

  function formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`
  }

  function getCompanyInfo() {
    return {
      nome: document.getElementById('nome').value,
      razao_social: document.getElementById('razaoSocial').value,
      data_inicio_atividade: document.getElementById('dataAbertura').value,
      descricao_situacao_cadastral: document.getElementById('situacaoCadastral').value,
      cnae_fiscal_descricao: document.getElementById('atividadePrincipal').value,
      logradouro: document.getElementById('logradouro').value,
      numero: document.getElementById('numero').value,
      bairro: document.getElementById('bairro').value,
      municipio: document.getElementById('municipio').value,
      cep: document.getElementById('cep').value,
      uf: document.getElementById('uf').value,
      ddd_telefone_1: document.getElementById('telefone').value,
      email: document.getElementById('email').value,
    }
  }

  function getPartnersInfo() {
    return Array.from(
      document.querySelectorAll('.card.shadow.bg-body.rounded')
    ).map((card, index) => {
      return {
        nome_socio: card.querySelector(`#nomeSocio-${index}`).value,
        cnpj_cpf_do_socio: card.querySelector(`#cnpjCpfSocio-${index}`).value,
        qualificacao_socio: card.querySelector(`#qualificacaoSocio-${index}`).value,
        data_entrada_sociedade: card.querySelector(`#dataEntradaSociedade-${index}`).value,
      }
    })
  }
})
