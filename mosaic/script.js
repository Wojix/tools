const symbols = '!@#$%^&*()-_=+[]{};:,.<>?/\\|~＄％＆＃＠'
const generateBtn = document.getElementById('generate')
const copyBtn = document.getElementById('copy')
const resultDiv = document.getElementById('result')
const lengthInput = document.getElementById('length')

generateBtn.onclick = () => {
  const len = Math.max(1, parseInt(lengthInput.value) || 0)
  let str = ''
  for (let i = 0; i < len; i++) {
    str += symbols[Math.floor(Math.random() * symbols.length)]
  }
  resultDiv.textContent = str
}

copyBtn.onclick = () => {
  if (!resultDiv.textContent) return
  navigator.clipboard.writeText(resultDiv.textContent)
}
