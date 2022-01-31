export default {

  encryptString: (text: string) => { 
    const privateKey = 'Ekart-storage-key'
    const textToChars = (text: string) => text.split('').map((c: string) => c.charCodeAt(0))
    const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2)
    const applyPrivateKeyToChar = (code: any) => textToChars(privateKey).reduce((a: any, b: any) => a ^ b, code)
    return text.split('')
      .map(textToChars)
      .map(applyPrivateKeyToChar)
      .map(byteHex)
      .join('')
  },
  decryptString: (encoded: any) => {
    const privateKey = 'Ekart-storage-key'
    const textToChars = (text: string) => text.split('').map((c: string) => c.charCodeAt(0))
    const applyPrivateKeyToChar = (code: any) => textToChars(privateKey).reduce((a: any, b: any) => a ^ b, code)
    return encoded.match(/.{1,2}/g)
      .map((hex: string) => parseInt(hex, 16))
      .map(applyPrivateKeyToChar)
      .map((charCode: number) => String.fromCharCode(charCode))
      .join('')
  },
  encryptAndStoreOnBrowser(key: string, value: string, storeOnSession?: true) {
    if (key) {
        const encryptedKey = this.encryptString(key)
        const encryptedValue = this.encryptString(value)
        if (storeOnSession) {
            sessionStorage.setItem(encryptedKey, encryptedValue)
        } else {
            localStorage.setItem(encryptedKey, encryptedValue)
        }
    }
  },
  decryptDataFromBrowser(key: string, fromSession?: true) {
    if (key) {
        const encryptedKey = this.encryptString(key)
        if (fromSession) {
            const sessionData = sessionStorage.getItem(encryptedKey)
            return sessionData ? this.decryptString(sessionData) : ''
        } else {
            const localStorageData = localStorage.getItem(encryptedKey)
            return localStorageData ? this.decryptString(localStorageData) : ''
        }
    }
  }
}