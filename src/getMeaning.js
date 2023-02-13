module.exports = async (word) => {
    const axios = require("axios")
    require("dotenv").config()
    return new Promise(async (resolve, reject) => {
        await axios
            .get(`https://sozluk.gov.tr/gts?ara=${word}`, {
                headers: {
                    "User-Agent": process.env.USER_AGENT,
                },
            })
            .then((res) => {
                if (res.data.error == "Sonuç bulunamadı") reject("Sonuç Bulunamadı")
                let result = {
                    anlam: res?.data[0]?.anlamlarListe[0]?.anlam,
                    ornek: res?.data[0]?.anlamlarListe[0]?.orneklerListe[0]?.ornek,
                }
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
