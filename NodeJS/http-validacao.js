const fetch = require('node-fetch');

function manejaErros(erro) {
  throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise
      .all(arrayURLs
        .map(async url => {
          const res = await fetch(url)
          return res.status;
    }))
    return arrayStatus;
  } catch(erro) {
    manejaErros(erro);
  }
}

function geraArrayDeURLs(arrayLinks) {
  return arrayLinks
    .map(objetoLink => Object
      .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {
  const links = geraArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);
  
  const resultados = arrayLinks.map((objeto, indice) => ({
    ...objeto,
    status: statusLinks[indice]
  }))
  return resultados;
}

module.exports = validaURLs;